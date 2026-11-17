#!/usr/bin/env node
// Quality gate — runs after the build (also on Netlify). Exit code 1 fails the deploy.
//   node scripts/check.mjs
import { readFile, readdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import en from '../src/content/en.mjs';
import sq from '../src/content/sq.mjs';
import { ROUTES, NOINDEX, LANGS } from '../src/site.mjs';
import { BOOT } from '../src/layout.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

// ───────────── 1. translation parity ─────────────
// paths whose text is legitimately identical in both languages (platform names, street address)
const SAME_OK = /(^|\.)(facts\[3\]\.v|address)$/;
function compare(a, b, p = '') {
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return err(`i18n: array mismatch at ${p} (en ${a?.length} vs sq ${b?.length})`);
    a.forEach((x, i) => compare(x, b[i], `${p}[${i}]`));
  } else if (a && typeof a === 'object') {
    for (const k of new Set([...Object.keys(a), ...Object.keys(b || {})])) {
      if (!(k in a)) err(`i18n: key "${p}.${k}" missing in en`);
      else if (!b || !(k in b)) err(`i18n: key "${p}.${k}" missing in sq`);
      else compare(a[k], b[k], p ? `${p}.${k}` : k);
    }
  } else {
    if (typeof a !== typeof b) err(`i18n: type mismatch at ${p}`);
    if (typeof a === 'string') {
      if (!a.trim() || !b.trim()) err(`i18n: empty string at ${p}`);
      // untranslated-looking strings (identical text, longer than a brand word)
      if (a === b && a.length > 24 && !/^(https?:|mailto:)/.test(a) && !SAME_OK.test(p) && !/^Email: /.test(a)) warn(`i18n: identical en/sq text at ${p}: "${a.slice(0, 50)}"`);
      // inline-markup balance (contact.form.required deliberately contains a literal "*")
      if (p !== 'contact.form.required') {
        for (const [lang, s] of [['en', a], ['sq', b]]) {
          if ((s.match(/\*\*/g) || []).length % 2 || ((s.replace(/\*\*/g, '').match(/\*/g) || []).length % 2)) err(`i18n: unbalanced * markup in ${lang} at ${p}`);
        }
      }
    }
  }
}
compare(en, sq);

// ───────────── 2. built HTML ─────────────
async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    out.push(...(e.isDirectory() ? await walk(p) : [p]));
  }
  return out;
}
const files = await walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const rel = (f) => '/' + path.relative(DIST, f).split(path.sep).join('/');
const fileSet = new Set(files.map(rel));
const pages = new Map(); // url path -> {html, ids}

for (const f of htmlFiles) {
  const html = await readFile(f, 'utf8');
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const r = rel(f);
  const url = r.endsWith('/index.html') ? r.slice(0, -'index.html'.length) : r;
  pages.set(url, { html, ids, file: r });
}

const resolve = (u) => {
  if (u.endsWith('/')) return u + 'index.html';
  if (fileSet.has(u)) return u;
  return u + '/index.html';
};

for (const [url, { html, ids, file }] of pages) {
  const at = `[${file}]`;
  const is404 = file.endsWith('404.html');
  const lang = /<html lang="(\w+)"/.exec(html)?.[1];
  const expected = url.startsWith('/sq/') ? 'sq' : 'en';
  if (lang !== expected) err(`${at} lang="${lang}" but path implies "${expected}"`);

  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) err(`${at} has ${h1s} <h1> (expected 1)`);

  const title = /<title>([^<]*)<\/title>/.exec(html)?.[1] ?? '';
  const desc = /<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? '';
  if (!title) err(`${at} missing <title>`);
  if (title.length > 70) warn(`${at} title is ${title.length} chars (>70): "${title}"`);
  if (!is404 && !/noindex/.test(html) && (desc.length < 60 || desc.length > 165)) warn(`${at} meta description is ${desc.length} chars`);

  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length) err(`${at} duplicate ids: ${[...new Set(dupes)].join(', ')}`);

  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="/.test(m[0])) err(`${at} <img> without alt: ${m[0].slice(0, 80)}`);
    if (!/\swidth="\d+"/.test(m[0]) || !/\sheight="\d+"/.test(m[0])) err(`${at} <img> without width/height (layout shift)`);
  }

  if (/\{\{|undefined|\[object |NaN/.test(html.replace(/<script[\s\S]*?<\/script>/g, ''))) err(`${at} contains template debris (undefined / {{ / [object)`);

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      err(`${at} invalid JSON-LD: ${e.message}`);
    }
  }

  // internal links and assets
  const refs = [...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  for (const m of html.matchAll(/\s(?:srcset|imagesrcset)="([^"]+)"/g)) refs.push(...m[1].split(',').map((s) => s.trim().split(/\s+/)[0]));
  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|data:)/.test(ref)) continue;
    const [p0, hash] = ref.split('#');
    const p = p0 || url;
    if (p0 === '' && hash) {
      if (!ids.includes(hash) && hash !== 'main') err(`${at} broken in-page anchor #${hash}`);
      continue;
    }
    const target = resolve(p.split('?')[0]);
    if (!fileSet.has(target)) {
      err(`${at} broken link/asset: ${ref}`);
      continue;
    }
    if (hash) {
      const tpage = [...pages.values()].find((x) => x.file === target);
      if (tpage && !tpage.ids.includes(hash)) err(`${at} link ${ref} → anchor "#${hash}" not found on target page`);
    }
  }

  // canonical + hreflang
  const canon = /<link rel="canonical" href="([^"]+)"/.exec(html)?.[1];
  if (!canon) err(`${at} missing canonical`);
  if (!is404 && !NOINDEX.has(Object.keys(ROUTES).find((k) => ROUTES[k][expected] === url) || '')) {
    const alts = [...html.matchAll(/<link rel="alternate" hreflang="([\w-]+)" href="([^"]+)"/g)].map((m) => [m[1], new URL(m[2]).pathname]);
    for (const l of LANGS) if (!alts.find(([h]) => h === l)) err(`${at} missing hreflang="${l}"`);
    if (!alts.find(([h]) => h === 'x-default')) err(`${at} missing hreflang x-default`);
    for (const [, p] of alts) {
      const back = pages.get(p);
      if (!back) err(`${at} hreflang target does not exist: ${p}`);
      else if (!back.html.includes(`hreflang="${expected}" href="${new URL(canon).origin}${url}"`)) err(`${at} hreflang not reciprocal with ${p}`);
    }
  }
}

// ───────────── 3. contact form (Netlify Forms) ─────────────
const fieldsOf = (html) => [...(/<form[\s\S]*?<\/form>/.exec(html)?.[0] ?? '').matchAll(/\sname="([^"]+)"/g)].map((m) => m[1]).sort().join(',');
const cEn = pages.get(ROUTES.contact.en)?.html ?? '';
const cSq = pages.get(ROUTES.contact.sq)?.html ?? '';
if (!/data-netlify="true"/.test(cEn) || !/name="form-name" value="contact"/.test(cEn)) err('contact (en): Netlify form markup missing');
if (fieldsOf(cEn) !== fieldsOf(cSq)) err(`contact form fields differ between languages:\n  en ${fieldsOf(cEn)}\n  sq ${fieldsOf(cSq)}`);
for (const l of LANGS) {
  const action = new RegExp(`<form[^>]*action="([^"]+)"`).exec(l === 'en' ? cEn : cSq)?.[1];
  if (action !== ROUTES.thanks[l]) err(`contact (${l}): form action "${action}" ≠ thank-you route`);
}

// ───────────── 4. CSP / headers / sitemap ─────────────
const headers = await readFile(path.join(DIST, '_headers'), 'utf8');
const bootHash = createHash('sha256').update(BOOT).digest('base64');
if (!headers.includes(`'sha256-${bootHash}'`)) err('CSP does not contain the hash of the inline boot script');
for (const [url, { html, file }] of pages) {
  if (!html.includes(`<script>${BOOT}</script>`)) err(`[${file}] boot script differs from the hashed one`);
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    const [, attrs, body] = m;
    const external = /\ssrc="/.test(attrs);
    const jsonld = /type="application\/ld\+json"/.test(attrs);
    if (!external && !jsonld && body !== BOOT) err(`[${file}] unexpected inline <script> (blocked by CSP)`);
  }
  if (/\sstyle="/.test(html) || /<style[\s>]/.test(html)) err(`[${file}] inline style (blocked by CSP style-src 'self')`);
  if (/\son\w+="/.test(html)) err(`[${file}] inline event handler (blocked by CSP)`);
}
const sitemap = await readFile(path.join(DIST, 'sitemap.xml'), 'utf8');
for (const m of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const p = new URL(m[1]).pathname;
  if (!pages.has(p)) err(`sitemap lists a page that doesn't exist: ${p}`);
}
for (const k of Object.keys(ROUTES)) for (const l of LANGS) if (!NOINDEX.has(k) && !sitemap.includes(`>${new URL(ROUTES[k][l], 'https://x').pathname}<`) && !sitemap.includes(ROUTES[k][l] + '<')) err(`sitemap is missing ${ROUTES[k][l]}`);

// ───────────── 5. WCAG contrast of the brand palette ─────────────
const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};
const PAIRS = [
  ['cream text on charcoal', '#f2ede4', '#3a3530', 4.5],
  ['muted text on charcoal', '#cdc4b6', '#3a3530', 4.5],
  ['copper-hi (small text) on charcoal', '#e3a05a', '#3a3530', 4.5],
  ['copper-hi on ink', '#e3a05a', '#1a1612', 4.5],
  ['muted text on ink', '#cdc4b6', '#1a1612', 4.5],
  ['ink on cream', '#1a1612', '#f2ede4', 4.5],
  ['muted-light on cream', '#5b5348', '#f2ede4', 4.5],
  ['muted-light on parchment', '#5b5348', '#e8dcc8', 4.5],
  ['bronze (accent text) on cream', '#8a4f0a', '#f2ede4', 4.5],
  ['bronze (accent text) on parchment', '#8a4f0a', '#e8dcc8', 4.5],
  ['ink on copper (buttons, CTA band)', '#1a1612', '#c97a2a', 4.5],
  ['CTA muted on copper', '#2a2018', '#c97a2a', 4.5],
  ['cream on bronze (success icon)', '#f2ede4', '#8a4f0a', 4.5],
  ['form error on cream', '#9b2c1a', '#f2ede4', 4.5],
  ['placeholder on field', '#6b6256', '#fffdf8', 4.5],
  ['copper-deep numerals on parchment (large)', '#a85f15', '#e8dcc8', 3],
  ['copper-deep numerals on cream (large)', '#a85f15', '#f2ede4', 3],
  ['copper on charcoal (large/decorative only)', '#c97a2a', '#3a3530', 3],
];
const contrastLines = [];
for (const [name, fg, bg, min] of PAIRS) {
  const r = ratio(fg, bg);
  contrastLines.push(`  ${r >= min ? '✓' : '✗'} ${r.toFixed(2)}:1  ${name}`);
  if (r < min) err(`contrast: ${name} is ${r.toFixed(2)}:1 (< ${min}:1)`);
}

// ───────────── 6. budgets ─────────────
const size = async (f) => (await stat(f)).size;
for (const f of files) {
  const r = rel(f);
  const s = await size(f);
  if (r.endsWith('.css') && s > 60_000) err(`${r} is ${(s / 1024).toFixed(0)} KB (CSS budget 60 KB)`);
  if (r.endsWith('.js') && s > 20_000) err(`${r} is ${(s / 1024).toFixed(0)} KB (JS budget 20 KB)`);
  if (/\.(html)$/.test(r) && s > 60_000) warn(`${r} is ${(s / 1024).toFixed(0)} KB`);
  if (/\.(jpe?g|png|webp|avif)$/.test(r) && s > 700_000) warn(`${r} is ${(s / 1024).toFixed(0)} KB — consider recompressing`);
}

// ───────────── report ─────────────
console.log('Contrast (WCAG 2.2 AA):\n' + contrastLines.join('\n'));
console.log(`\nChecked ${pages.size} pages, ${files.length} files.`);
if (warnings.length) console.log(`\n⚠ ${warnings.length} warning(s):\n` + warnings.map((w) => '  - ' + w).join('\n'));
if (errors.length) {
  console.error(`\n✗ ${errors.length} error(s):\n` + errors.map((e) => '  - ' + e).join('\n'));
  process.exit(1);
}
console.log('\n✓ all checks passed');
