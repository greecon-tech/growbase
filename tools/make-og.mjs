#!/usr/bin/env node
// Renders the 1200×630 social-share images (one per language) with Playwright.
//   node tools/make-og.mjs      (Playwright must be installed: npm i -D playwright, or globally)
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync } from 'node:fs';
import os from 'node:os';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import en from '../src/content/en.mjs';
import sq from '../src/content/sq.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUB = path.join(ROOT, 'src/public');
const logo = JSON.parse(readFileSync(path.join(PUB, 'assets/img/logo-path.json'), 'utf8'));
const font = (f) => pathToFileURL(path.join(PUB, 'assets/fonts', f)).href;
const art = pathToFileURL(path.join(PUB, 'assets/img/art-lorrain-arch-1095.webp')).href;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const em = (s) => esc(s).replace(/\*([^*]+)\*/g, '<em>$1</em>');

const html = (t) => `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:T;src:url(${font('tinos-latin-400-normal.woff2')});font-weight:400}
@font-face{font-family:T;src:url(${font('tinos-latin-400-italic.woff2')});font-style:italic}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#3a3530;color:#f2ede4;font-family:T,serif;position:relative;overflow:hidden}
.glow{position:absolute;inset:0;background:radial-gradient(55% 70% at 82% 40%,rgba(201,122,42,.38),transparent 70%),radial-gradient(40% 50% at 0% 100%,rgba(138,79,10,.4),transparent 70%)}
.brand{position:absolute;left:72px;top:60px;display:flex;align-items:center;gap:18px;font-size:34px}
.brand svg{width:78px;color:#c17c3a}.brand b{font-weight:400;font-style:italic;color:#e3a05a}
.copy{position:absolute;left:72px;top:176px;width:640px}
.eyebrow{font-size:20px;letter-spacing:.24em;text-transform:uppercase;color:#e3a05a;margin-bottom:26px;display:flex;align-items:center;gap:16px}
.eyebrow:before{content:"";width:44px;height:1px;background:#e3a05a}
h1{font-weight:400;font-size:84px;line-height:1;letter-spacing:-.025em;text-wrap:balance}
h1 em{color:#e3a05a}
.url{position:absolute;left:72px;bottom:52px;font-size:26px;color:#cdc4b6;letter-spacing:.02em}
.arch{position:absolute;right:92px;top:78px;width:372px;height:496px;border-radius:186px 186px 0 0;overflow:hidden;background:#1a1612}
.arch img{width:100%;height:100%;object-fit:cover}
.ring{position:absolute;right:74px;top:60px;width:372px;height:496px;border:1.5px solid #c97a2a;border-bottom:0;border-radius:186px 186px 0 0;opacity:.8}
</style>
<div class="glow"></div>
<div class="brand"><svg viewBox="0 0 ${logo.w} ${logo.h}"><path fill="currentColor" fill-rule="evenodd" d="${logo.d}"/></svg><span>Grow <b>Base</b></span></div>
<div class="copy"><p class="eyebrow">${esc(t.home.hero.eyebrow)}</p><h1>${em(t.home.hero.title)}</h1></div>
<div class="url">growbase.agency</div>
<div class="ring"></div><div class="arch"><img src="${art}"></div>`;

mkdirSync(path.join(PUB, 'og'), { recursive: true });
const browser = await chromium.launch();
for (const [code, t] of [['en', en], ['sq', sq]]) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  // load from a real file:// page so local fonts/images are allowed (about:blank can't read file URLs)
  const file = path.join(mkdtempSync(path.join(os.tmpdir(), 'og-')), `${code}.html`);
  writeFileSync(file, html(t));
  await page.goto(pathToFileURL(file).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(PUB, `og/og-${code}.jpg`), type: 'jpeg', quality: 86 });
  console.log('og-' + code + '.jpg');
  await page.close();
}
await browser.close();
