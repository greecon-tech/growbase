// Contrast probe for text that sits on top of imagery/glass (which static checks can't judge).
// Hides all text, screenshots what is behind it, and reports the real WCAG contrast of every text
// element against the brightest 5% of pixels under it. Re-run whenever the hero painting or veil changes.
//
//   npm run build && npm run serve &            # preview on :4173
//   node tools/contrast-probe/measure.js / 1440 900 /tmp/probe 0
//   python3 tools/contrast-probe/contrast.py /tmp/probe
//   # optional scroll target:  "#services@-120"  (CSS selector @ pixel offset)
// Captures the page with all text made transparent + records each text element's box/colour/size.
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const [,, url, w, h, out, scrollY] = process.argv;
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: +w, height: +h }, bypassCSP: true }); const p = await ctx.newPage();
  await p.goto('http://localhost:4173' + url, { waitUntil: 'networkidle' });
  if (scrollY && scrollY.includes('@')) { const [sel, off] = scrollY.split('@'); const found = await p.evaluate(([sel, off]) => { const el = document.querySelector(sel); if (!el) return false; window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + (+off || 0)); return true; }, [sel, off]); if (!found) throw new Error('selector not found: ' + sel); }
  else await p.evaluate(y => window.scrollTo(0, y), +(scrollY || 0));
  await p.waitForTimeout(1600);
  const sel = ['.hero .display', '.hero__center .lead', '.hero .eyebrow', '.facts strong', '.facts span', '.hero__credit', '.nav__list a', '.lang__item', '.brand__name', '.btn--ghost', '.statement', '.s-art__panel .lead', '.art-credit', '.svc__p', '.svc__t'];
  const rects = await p.evaluate(sel => {
    const res = [];
    for (const s of sel) for (const el of document.querySelectorAll(s)) {
      const r = el.getBoundingClientRect(); if (r.width < 4 || r.height < 4 || r.bottom < 0 || r.top > innerHeight) continue;
      const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || (el.closest('[data-nav]') && getComputedStyle(el.closest('[data-nav]')).visibility === 'hidden')) continue;
      res.push({ s, x: r.left, y: r.top, w: r.width, h: r.height, color: cs.color, fs: parseFloat(cs.fontSize), fw: cs.fontWeight, text: (el.textContent || '').trim().slice(0, 28) });
    }
    return res;
  }, sel);
  await p.addStyleTag({ content: '*{color:transparent!important;text-shadow:none!important;-webkit-text-fill-color:transparent!important} svg{opacity:0!important}' });
  await p.waitForTimeout(300);
  await p.screenshot({ path: out + '.png' });
  fs.writeFileSync(out + '.json', JSON.stringify(rects));
  await b.close();
})();
