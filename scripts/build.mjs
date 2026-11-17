#!/usr/bin/env node
// Static site generator for growbase.agency — zero dependencies.
//   node scripts/build.mjs        → writes ./dist
import { readFile, writeFile, mkdir, rm, readdir, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { SITE, LANGS, ROUTES, NOINDEX } from '../src/site.mjs';
import en from '../src/content/en.mjs';
import sq from '../src/content/sq.mjs';
import { PAGES, notFound } from '../src/pages.mjs';
import { renderDocument, BOOT } from '../src/layout.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const dict = { en, sq };

const sha = (buf, enc = 'hex') => createHash('sha1').update(buf).digest(enc).slice(0, 10);

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

async function write(rel, data) {
  const file = path.join(DIST, rel);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, data);
}

// Conservative CSS minifier: strips comments/whitespace, leaves quoted strings untouched.
// Comments and strings are handled in ONE pass, so quotes inside comments can't confuse it.
function stripComments(css) {
  let out = '';
  let i = 0;
  while (i < css.length) {
    const c = css[i];
    if (c === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2);
      i = end < 0 ? css.length : end + 2;
    } else if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < css.length && css[j] !== c) j += css[j] === '\\' ? 2 : 1;
      out += css.slice(i, j + 1);
      i = j + 1;
    } else {
      out += c;
      i++;
    }
  }
  return out;
}

function minifyCss(css) {
  css = stripComments(css);
  const saved = [];
  css = css.replace(/("([^"\\]|\\.)*"|'([^'\\]|\\.)*')/g, (m) => {
    saved.push(m);
    return `\u0000${saved.length - 1}\u0000`;
  });
  css = css
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};,>~])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
  css = css.replace(/\u0000(\d+)\u0000/g, (_, i) => saved[i]);
  // Guard: a broken minify must fail the build, never ship.
  const open = (css.match(/{/g) || []).length;
  const close = (css.match(/}/g) || []).length;
  if (open !== close || !css.includes(':root{') || (css.match(/@font-face/g) || []).length !== 4) {
    throw new Error(`CSS minification produced invalid output (braces ${open}/${close})`);
  }
  return css;
}

const t0 = Date.now();
await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });

// ───────────── assets (content-hashed → immutable caching) ─────────────
const manifest = new Map(); // 'img/foo.avif' -> '/assets/img/foo.1a2b3c4d5e.avif'
const HASHED = new Set(['img', 'fonts']);
const SKIP = new Set(['logo-path.json', 'art-sizes.json']); // build-time data only

for (const file of await walk(path.join(SRC, 'public'))) {
  const rel = path.relative(path.join(SRC, 'public'), file).split(path.sep).join('/');
  const base = path.basename(rel);
  if (SKIP.has(base)) continue;
  const parts = rel.split('/');
  if (parts[0] === 'assets' && HASHED.has(parts[1]) && !/\.txt$/i.test(base)) {
    const buf = await readFile(file);
    const ext = path.extname(base);
    const hashed = `${parts.slice(0, -1).join('/')}/${base.slice(0, -ext.length)}.${sha(buf)}${ext}`;
    manifest.set(parts.slice(1).join('/'), '/' + hashed);
    await write(hashed, buf);
  } else {
    await mkdir(path.dirname(path.join(DIST, rel)), { recursive: true });
    await copyFile(file, path.join(DIST, rel));
  }
}

const asset = (p) => {
  const hit = manifest.get(p);
  if (!hit) throw new Error(`Unknown asset: ${p}`);
  return hit;
};

// CSS: resolve {{asset:…}} tokens, minify, hash
let css = await readFile(path.join(SRC, 'styles/main.css'), 'utf8');
css = css.replace(/\{\{asset:([^}]+)\}\}/g, (_, p) => asset(p.trim()));
css = minifyCss(css);
const cssName = `assets/css/main.${sha(css)}.css`;
manifest.set('css/main.css', '/' + cssName);
await write(cssName, css);

// JS
const js = await readFile(path.join(SRC, 'scripts/main.js'), 'utf8');
const jsName = `assets/js/main.${sha(js)}.js`;
manifest.set('js/main.js', '/' + jsName);
await write(jsName, js);

// ───────────── pages ─────────────
const abs = (p) => SITE.url + p;
const altPath = (page, lang) => (page.key === 'notfound' ? ROUTES.home[lang] : ROUTES[page.key]?.[lang] ?? ROUTES.home[lang]);

let pageCount = 0;
for (const lang of LANGS) {
  const t = dict[lang];
  const ctx = {
    lang,
    t,
    dict,
    site: SITE,
    asset,
    abs,
    href: (key) => ROUTES[key][lang],
    alt: altPath,
  };

  const render = async (key, builder, outPath, urlPath) => {
    const page = builder(ctx);
    const seo = t.seo[key] || { title: `${t.notFound.eyebrow} | Grow Base`, description: t.notFound.p };
    page.title = seo.title;
    page.description = seo.description;
    page.path = urlPath;
    await write(outPath, renderDocument(ctx, page));
    pageCount++;
  };

  for (const [key, builder] of Object.entries(PAGES)) {
    const urlPath = ROUTES[key][lang];
    await render(key, builder, path.posix.join(urlPath.slice(1), 'index.html'), urlPath);
  }
  // Language-specific 404 pages (served via _redirects for /sq/*)
  await render('notfound', notFound, lang === 'en' ? '404.html' : 'sq/404.html', lang === 'en' ? '/404.html' : '/sq/404.html');
}

// ───────────── sitemap / robots / manifest ─────────────
const urls = Object.keys(ROUTES)
  .filter((k) => !NOINDEX.has(k))
  .flatMap((k) =>
    LANGS.map((lang) => {
      const alts = [...LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(ROUTES[k][l])}"/>`), `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(ROUTES[k].en)}"/>`].join('\n');
      const priority = k === 'home' ? '1.0' : ['services', 'process', 'about', 'contact'].includes(k) ? '0.8' : '0.3';
      return `  <url>\n    <loc>${abs(ROUTES[k][lang])}</loc>\n    <lastmod>${SITE.buildDate}</lastmod>\n    <priority>${priority}</priority>\n${alts}\n  </url>`;
    }),
  );
await write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`);

await write(
  'robots.txt',
  SITE.isProduction
    ? `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`
    : `# Non-production build (CONTEXT=${process.env.CONTEXT}) — keep out of search engines\nUser-agent: *\nDisallow: /\n`,
);

await write(
  'site.webmanifest',
  JSON.stringify(
    {
      name: 'Grow Base',
      short_name: 'Grow Base',
      description: en.seo.home.description,
      start_url: '/',
      display: 'browser',
      background_color: SITE.themeColor,
      theme_color: SITE.themeColor,
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
      ],
    },
    null,
    2,
  ),
);

// ───────────── Netlify: headers + redirects ─────────────
const bootHash = createHash('sha256').update(BOOT).digest('base64');
const csp = [
  "default-src 'self'",
  `script-src 'self' 'sha256-${bootHash}'`,
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

await write(
  '_headers',
  `/*
  Content-Security-Policy: ${csp}
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()
  Cross-Origin-Opener-Policy: same-origin
  Strict-Transport-Security: max-age=31536000; includeSubDomains

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/og/*
  Cache-Control: public, max-age=86400

/favicon.*
  Cache-Control: public, max-age=86400
/apple-touch-icon.png
  Cache-Control: public, max-age=86400
`,
);

await write(
  '_redirects',
  `# Tidy aliases
/index.html            /          301
/en                    /          301
/en/*                  /:splat    301
/sq                    /sq/       301
/privacy-policy        /privacy/  301
/sq/politika-e-privatesise /sq/privatesia/ 301

# Language-specific 404 for the Albanian section (real files always win)
/sq/*                  /sq/404.html  404
`,
);

console.log(`✓ built ${pageCount} pages, ${manifest.size} hashed assets in ${Date.now() - t0}ms → dist/`);
