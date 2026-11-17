import { esc, md, plain, icon, picture, preloadArt, logoSvg } from './lib.mjs';
import { SITE } from './site.mjs';

// ───────────── small building blocks ─────────────
const eyebrow = (text, cls = '') => `<p class="eyebrow ${cls}">${esc(text)}</p>`;

const btn = (ctx, href, label, variant = 'primary', arrow = true) =>
  `<a class="btn btn--${variant}" href="${href}">${esc(label)}${arrow ? icon('arrow', 'i btn__i') : ''}</a>`;

const linkArrow = (href, label) => `<a class="link-arrow" href="${href}"><span>${esc(label)}</span>${icon('arrow', 'i')}</a>`;

function pageHero(ctx, { eyebrow: eb, title, lead, id = 'page-title', tall = false }) {
  return `
<section class="page-hero s-dark${tall ? ' page-hero--tall' : ''}" aria-labelledby="${id}">
  <div class="page-hero__art" aria-hidden="true"><span class="arc arc--1"></span><span class="arc arc--2"></span><span class="arc arc--3"></span></div>
  <div class="wrap">
    ${eyebrow(eb, 'reveal')}
    <h1 id="${id}" class="display display--md reveal d1">${md(title, ctx)}</h1>
    ${lead ? `<p class="lead reveal d2">${md(lead, ctx)}</p>` : ''}
  </div>
</section>`;
}

function ctaBand(ctx, c) {
  return `
<section class="cta s-copper" aria-labelledby="cta-title">
  <div class="cta__mark" aria-hidden="true">${logoSvg('cta__logo')}</div>
  <div class="wrap cta__in">
    <h2 id="cta-title" class="display display--md reveal">${md(c.title, ctx)}</h2>
    <p class="lead reveal d1">${md(c.p, ctx)}</p>
    <div class="btn-row reveal d2">
      ${btn(ctx, ctx.href('contact'), c.primary, 'ink')}
      <a class="cta__mail" href="mailto:${SITE.email}">${esc(SITE.email)}</a>
    </div>
  </div>
</section>`;
}

const sectionHead = (ctx, { id, eyebrow: eb, title, intro }, cls = '') => `
<header class="section-head ${cls}">
  ${eyebrow(eb, 'reveal')}
  <h2 id="${id}" class="display display--sm reveal d1">${md(title, ctx)}</h2>
  ${intro ? `<p class="lead reveal d2">${md(intro, ctx)}</p>` : ''}
</header>`;

// ───────────── home ─────────────
export function home(ctx) {
  const c = ctx.t.home;
  const h = c.hero;
  const heroSizes = '100vw';
  const marqueeItems = c.marquee.map((x) => `<span class="marquee__item">${esc(x)}</span>`).join('').repeat(3);
  const svcAnchors = ctx.t.services.items.map((i) => i.id);

  const body = `
<section class="hero s-dark" aria-labelledby="hero-title">
  <div class="hero__bg">
    ${picture(ctx, { set: 'lorrain-wide', sizes: heroSizes, alt: h.art.alt, eager: true, cls: 'hero__img' })}
  </div>
  <div class="hero__veil" aria-hidden="true"></div>
  <div class="wrap hero__center">
    ${eyebrow(h.eyebrow, 'reveal')}
    <h1 id="hero-title" class="display reveal d1">${md(h.title, ctx)}</h1>
    <p class="lead reveal d2">${md(h.lead, ctx)}</p>
    <div class="btn-row reveal d3">
      ${btn(ctx, ctx.href('contact'), h.primary, 'primary')}
      <a class="btn btn--ghost" href="#process">${esc(h.secondary)}</a>
    </div>
  </div>
  <div class="wrap">
    <ul class="facts reveal d3">
      ${h.facts.map((f) => `<li><strong>${esc(f.k)}</strong><span>${esc(f.v)}</span></li>`).join('')}
    </ul>
  </div>
  <p class="hero__credit"><span class="plate__title">${md(h.art.caption, ctx)}</span><span class="plate__credit">${esc(h.art.credit)}</span></p>
</section>

<div class="marquee" aria-hidden="true">
  <div class="marquee__track"><div class="marquee__group">${marqueeItems}</div><div class="marquee__group">${marqueeItems}</div></div>
</div>

<section id="work" class="section s-parch" aria-labelledby="work-title">
  <div class="wrap">
    <div class="split">
      <div>
        ${eyebrow(c.work.eyebrow, 'reveal')}
        <h2 id="work-title" class="display display--sm reveal d1">${md(c.work.title, ctx)}</h2>
      </div>
      <p class="lead reveal d2">${md(c.work.intro, ctx)}</p>
    </div>
    <ul class="niches">
      ${c.work.cards
        .map(
          (k, i) => `<li class="niche reveal d${i}">
        <span class="niche__n" aria-hidden="true">${esc(k.n)}</span>
        <p class="niche__k">${esc(k.k)}</p>
        <h3 class="niche__t">${esc(k.t)}</h3>
        <p>${esc(k.p)}</p>
      </li>`,
        )
        .join('')}
    </ul>
    <p class="outro reveal">${md(c.work.outro, ctx)}</p>
  </div>
</section>

<section id="services" class="section s-dark s-glow" aria-labelledby="services-title">
  <div class="wrap">
    ${sectionHead(ctx, { id: 'services-title', eyebrow: c.services.eyebrow, title: c.services.title, intro: c.services.intro })}
    <ol class="svc-list">
      ${c.services.items
        .map(
          (s, i) => `<li>
        <a class="svc reveal" href="${ctx.href('services')}#${svcAnchors[i]}">
          <span class="svc__n">${esc(s.n)}</span>
          <h3 class="svc__t">${esc(s.t)}</h3>
          <p class="svc__p">${esc(s.p)}</p>
          <ul class="tags">${s.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          <span class="svc__go" aria-hidden="true">${icon('arrow')}</span>
        </a>
      </li>`,
        )
        .join('')}
    </ol>
    <p class="section-link reveal">${linkArrow(ctx.href('services'), c.services.link)}</p>
  </div>
</section>

<section id="process" class="section s-cream" aria-labelledby="process-title">
  <div class="wrap">
    ${sectionHead(ctx, { id: 'process-title', eyebrow: c.process.eyebrow, title: c.process.title, intro: c.process.intro })}
    <ol class="steps">
      ${c.process.steps
        .map(
          (s, i) => `<li class="step reveal d${i}">
        <span class="step__node" aria-hidden="true"><span>${esc(s.n)}</span></span>
        <h3 class="step__t">${esc(s.t)}</h3>
        <p>${esc(s.p)}</p>
      </li>`,
        )
        .join('')}
    </ol>
    <p class="outro reveal">${md(c.process.outro, ctx)}</p>
    <p class="section-link reveal">${linkArrow(ctx.href('process'), c.process.link)}</p>
  </div>
</section>

<section class="s-art" aria-labelledby="phil-title">
  <div class="s-art__bg" aria-hidden="true">
    ${picture(ctx, { set: 'lemoyne-wide', sizes: '100vw', alt: '', cls: 's-art__img' })}
  </div>
  <div class="wrap s-art__in">
    ${eyebrow(c.philosophy.eyebrow, 'reveal')}
    <h2 id="phil-title" class="statements">
      ${c.philosophy.lines.map((l, i) => `<span class="statement reveal d${i}">${md(l, ctx)}</span>`).join('')}
    </h2>
    <div class="s-art__panel reveal">
      <p class="lead">${md(c.philosophy.intro, ctx)}</p>
      <div class="btn-row">${btn(ctx, ctx.href('about'), c.philosophy.link, 'ghost')}</div>
    </div>
  </div>
  <p class="art-credit"><span class="art-credit__t">${md(c.philosophy.art.caption, ctx)}</span> ${esc(c.philosophy.art.credit)}</p>
  <span class="sr">${esc(c.philosophy.art.alt)}</span>
</section>

${ctaBand(ctx, c.cta)}`;

  return {
    key: 'home',
    bodyClass: 'page-home',
    body,
    preloads: [preloadArt(ctx, 'lorrain-wide', heroSizes)],
  };
}

// ───────────── services ─────────────
export function services(ctx) {
  const c = ctx.t.services;
  const platforms = ctx.t.home.services.items[1].tags;
  const blocks = c.items
    .map(
      (s, i) => `
<section id="${s.id}" class="section svc-block ${i % 2 ? 's-cream' : 's-parch'}" aria-labelledby="${s.id}-title">
  <div class="wrap svc-block__grid">
    <div class="svc-block__head reveal">
      <span class="svc-block__n" aria-hidden="true">${esc(s.n)}</span>
      <h2 id="${s.id}-title" class="display display--sm">${esc(s.t)}</h2>
    </div>
    <div class="svc-block__body">
      ${s.p.map((p, j) => `<p class="lead reveal d${j}">${esc(p)}</p>`).join('')}
      ${s.id === 'advertising' ? `<ul class="chips reveal d1" aria-label="${esc(platforms.join(', '))}">${platforms.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
      <h3 class="includes reveal d1">${esc(c.includes)}</h3>
      <ul class="checks reveal d2">${s.list.map((l) => `<li>${icon('check')}<span>${esc(l)}</span></li>`).join('')}</ul>
    </div>
  </div>
</section>`,
    )
    .join('');

  const body = `
${pageHero(ctx, c.hero)}
${blocks}
<section class="section s-ink closing" aria-labelledby="closing-title">
  <div class="wrap wrap--narrow closing__in">
    <h2 id="closing-title" class="display display--md reveal">${esc(c.closing.title)}</h2>
    <p class="lead reveal d1">${esc(c.closing.p)}</p>
  </div>
</section>
${ctaBand(ctx, c.cta)}`;
  return { key: 'services', bodyClass: 'page-services', body, crumb: ctx.t.ui.nav.services };
}

// ───────────── process ─────────────
export function processPage(ctx) {
  const c = ctx.t.process;
  const steps = c.steps
    .map(
      (s, i) => `
<section class="section pstep ${i % 2 ? 's-ink' : 's-dark'}" aria-labelledby="step-${i + 1}-title">
  <div class="wrap pstep__grid">
    <div class="pstep__num reveal" aria-hidden="true"><span>${esc(s.n)}</span></div>
    <div class="pstep__body">
      <p class="eyebrow reveal">${String(i + 1).padStart(2, '0')} / 04</p>
      <h2 id="step-${i + 1}-title" class="display display--md reveal d1">${esc(s.t)}</h2>
      <p class="pstep__tag reveal d1">${esc(s.tagline)}</p>
      ${s.p.map((p, j) => `<p class="reveal d${Math.min(j + 2, 4)}">${esc(p)}</p>`).join('')}
    </div>
  </div>
</section>`,
    )
    .join('');

  const body = `
${pageHero(ctx, c.hero)}
${steps}
<section class="section s-cream" aria-labelledby="rhythm-title">
  <div class="wrap">
    ${sectionHead(ctx, { id: 'rhythm-title', eyebrow: c.rhythm.eyebrow, title: c.rhythm.title })}
    <ul class="trio">
      ${c.rhythm.items.map((r, i) => `<li class="reveal d${i}"><span class="trio__n" aria-hidden="true">${i + 1}</span><h3>${esc(r.t)}</h3><p>${esc(r.p)}</p></li>`).join('')}
    </ul>
  </div>
</section>
${ctaBand(ctx, c.cta)}`;
  return { key: 'process', bodyClass: 'page-process', body, crumb: ctx.t.ui.nav.process };
}

// ───────────── about ─────────────
export function about(ctx) {
  const c = ctx.t.about;
  const gallerySizes = '(min-width: 900px) 380px, 72vw';
  const body = `
${pageHero(ctx, c.hero)}

<section class="section s-parch" aria-labelledby="story-title">
  <div class="wrap about-story">
    <div>
      <h2 id="story-title" class="display display--sm reveal">${esc(c.story.title)}</h2>
      ${c.story.p.map((p, i) => `<p class="lead reveal d${i + 1}">${esc(p)}</p>`).join('')}
    </div>
    <dl class="facts-list reveal d2">
      ${c.story.facts.map((f) => `<div><dt>${esc(f.k)}</dt><dd>${esc(f.v)}</dd></div>`).join('')}
    </dl>
  </div>
</section>

<section class="section s-dark" aria-labelledby="principles-title">
  <div class="wrap">
    ${sectionHead(ctx, { id: 'principles-title', eyebrow: c.principles.eyebrow, title: c.principles.title })}
    <ul class="niches niches--light">
      ${c.principles.items
        .map(
          (k, i) => `<li class="niche reveal d${i}">
        <span class="niche__n" aria-hidden="true">${esc(k.n)}</span>
        <h3 class="niche__t">${esc(k.t)}</h3>
        <p>${esc(k.p)}</p>
      </li>`,
        )
        .join('')}
    </ul>
  </div>
</section>

<section class="section s-cream" aria-labelledby="values-title">
  <div class="wrap">
    <h2 id="values-title" class="display display--sm reveal">${esc(c.values.title)}</h2>
    <ul class="trio">
      ${c.values.items.map((v, i) => `<li class="reveal d${i}"><span class="trio__n" aria-hidden="true">${['I', 'II', 'III'][i]}</span><h3>${esc(v.t)}</h3><p>${esc(v.p)}</p></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section s-ink gallery" aria-labelledby="gallery-title">
  <div class="wrap">
    ${sectionHead(ctx, { id: 'gallery-title', eyebrow: c.gallery.eyebrow, title: c.gallery.title, intro: c.gallery.lead })}
    <div class="gallery__row">
      ${c.gallery.items
        .map(
          (g, i) => `<figure class="gal reveal d${i}">
        <div class="arch arch--gal">${picture(ctx, { set: g.set, sizes: gallerySizes, alt: g.alt, cls: 'arch__img' })}</div>
        <figcaption>
          <span class="plate__title">${md(g.t, ctx)}</span>
          <span class="plate__credit">${esc(g.credit)}</span>
          <span class="gal__p">${esc(g.p)}</span>
        </figcaption>
      </figure>`,
        )
        .join('')}
    </div>
    <p class="outro reveal">${esc(c.gallery.outro)} <a href="${ctx.href('terms')}#credits">${esc(ctx.t.ui.footer.artLink)}</a></p>
  </div>
</section>

${ctaBand(ctx, c.cta)}`;
  return { key: 'about', bodyClass: 'page-about', body, crumb: ctx.t.ui.nav.about };
}

// ───────────── contact ─────────────
export function contact(ctx) {
  const c = ctx.t.contact;
  const d = c.details;
  const f = c.form;
  const thanks = ctx.href('thanks');
  const body = `
${pageHero(ctx, c.hero)}
<section class="section s-parch contact" aria-labelledby="form-title">
  <div class="wrap contact__grid">
    <aside class="contact__details reveal" aria-labelledby="details-title">
      <h2 id="details-title" class="contact__h">${esc(d.title)}</h2>
      <ul class="contact__list">
        <li>${icon('mail')}<div><span class="contact__k">${esc(d.email)}</span><a href="mailto:${SITE.email}">${esc(SITE.email)}</a></div></li>
        <li>${icon('phone')}<div><span class="contact__k">${esc(d.phone)}</span><a href="${SITE.phoneHref}">${esc(SITE.phone)}</a></div></li>
        <li>${icon('pin')}<div><span class="contact__k">${esc(d.location)}</span><address>${esc(d.address)}<br>${esc(d.city)}</address><a class="contact__map" href="${SITE.mapsUrl}" target="_blank" rel="noopener noreferrer">${esc(d.map)} ${icon('arrow-up-right', 'i i--sm')}</a></div></li>
        <li>${icon('instagram')}<div><span class="contact__k">Instagram</span><a href="${SITE.instagram}" target="_blank" rel="noopener noreferrer">${esc(SITE.instagramHandle)}</a></div></li>
        <li>${icon('linkedin')}<div><span class="contact__k">LinkedIn</span><a href="${SITE.linkedin}" target="_blank" rel="noopener noreferrer">linkedin.com/company/growbaseagency</a></div></li>
      </ul>
    </aside>

    <div class="contact__form reveal d1">
      <h2 id="form-title" class="contact__h">${esc(f.title)}</h2>
      <p class="form__note">${esc(f.required)}</p>
      <form class="form" name="contact" method="POST" action="${thanks}" data-netlify="true" netlify-honeypot="bot-field" data-form
        data-msg-required="${esc(f.errorRequired)}" data-msg-email="${esc(f.errorEmail)}" data-msg-consent="${esc(f.errorConsent)}"
        data-msg-send="${esc(f.errorSend)}" data-msg-sending="${esc(f.sending)}">
        <input type="hidden" name="form-name" value="contact">
        <input type="hidden" name="language" value="${ctx.lang}">
        <p class="hp" aria-hidden="true"><label>Leave this empty: <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>

        <div class="field">
          <label for="f-name">${esc(f.name)} <span aria-hidden="true">*</span></label>
          <input id="f-name" name="name" type="text" autocomplete="name" required>
          <p class="field__error" id="f-name-err" hidden></p>
        </div>
        <div class="field">
          <label for="f-email">${esc(f.email)} <span aria-hidden="true">*</span></label>
          <input id="f-email" name="email" type="email" autocomplete="email" inputmode="email" required>
          <p class="field__error" id="f-email-err" hidden></p>
        </div>
        <div class="field">
          <label for="f-site">${esc(f.website)}</label>
          <input id="f-site" name="website" type="text" inputmode="url" autocomplete="url" placeholder="https://" aria-describedby="f-site-hint">
          <p class="field__hint" id="f-site-hint">${esc(f.websiteHint)}</p>
        </div>
        <div class="field">
          <label for="f-goals">${esc(f.goals)} <span aria-hidden="true">*</span></label>
          <textarea id="f-goals" name="goals" rows="5" placeholder="${esc(f.goalsPlaceholder)}" required></textarea>
          <p class="field__error" id="f-goals-err" hidden></p>
        </div>
        <div class="field field--check">
          <input id="f-consent" name="consent" type="checkbox" value="yes" required>
          <label for="f-consent">${md(f.consent, ctx)}</label>
          <p class="field__error" id="f-consent-err" hidden></p>
        </div>
        <button class="btn btn--primary btn--lg" type="submit" data-label="${esc(f.submit)}">${esc(f.submit)}${icon('arrow', 'i btn__i')}</button>
        <p class="form__status" role="status" aria-live="polite" data-status></p>
      </form>
      <div class="form-success" data-success hidden tabindex="-1">
        <span class="form-success__icon">${icon('check')}</span>
        <h3>${esc(f.successTitle)}</h3>
        <p>${esc(f.successText)}</p>
      </div>
    </div>
  </div>
</section>`;
  return { key: 'contact', bodyClass: 'page-contact', body, crumb: ctx.t.ui.nav.contact };
}

// ───────────── legal (privacy / cookies / terms) ─────────────
function legalBlocks(ctx, blocks) {
  return blocks
    .map((b) => (Array.isArray(b) ? `<ul>${b.map((li) => `<li>${md(li, ctx)}</li>`).join('')}</ul>` : `<p>${md(b, ctx)}</p>`))
    .join('');
}

export function legal(ctx, key) {
  const L = ctx.t.legal;
  const c = L[key];
  const toc = c.sections.map((s) => `<li><a href="#${s.id}">${esc(s.h)}</a></li>`).join('');
  const sections = c.sections
    .map((s, i) => `<section id="${s.id}" class="prose__sec"><h2><span class="prose__n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>${esc(s.h)}</h2>${legalBlocks(ctx, s.blocks)}</section>`)
    .join('');
  const body = `
${pageHero(ctx, { eyebrow: c.eyebrow, title: c.title, lead: c.lead })}
<section class="section s-cream prose">
  <div class="wrap prose__grid">
    <nav class="toc" aria-label="${esc(L.tocLabel)}">
      <p class="toc__h">${esc(L.tocLabel)}</p>
      <ol>${toc}</ol>
      <p class="toc__date">${esc(L.updatedLabel)}: <time datetime="2026-11-17">${esc(L.updated)}</time></p>
    </nav>
    <article class="prose__body">${sections}</article>
  </div>
</section>`;
  return { key, bodyClass: 'page-legal', body, crumb: c.title };
}

// ───────────── thank you ─────────────
export function thanks(ctx) {
  const c = ctx.t.thanks;
  const body = `
<section class="page-hero page-hero--tall s-dark center" aria-labelledby="page-title">
  <div class="page-hero__art" aria-hidden="true"><span class="arc arc--1"></span><span class="arc arc--2"></span><span class="arc arc--3"></span></div>
  <div class="wrap wrap--narrow">
    ${eyebrow(c.eyebrow, 'reveal')}
    <h1 id="page-title" class="display reveal d1">${md(c.title, ctx)}</h1>
    <p class="lead reveal d2">${esc(c.p)}</p>
    <div class="btn-row btn-row--center reveal d3">
      ${btn(ctx, ctx.href('home'), c.back, 'primary')}
      ${btn(ctx, ctx.href('process'), c.explore, 'ghost')}
    </div>
  </div>
</section>`;
  return { key: 'thanks', bodyClass: 'page-thanks', body, noindex: true, crumb: c.eyebrow };
}

// ───────────── 404 ─────────────
export function notFound(ctx) {
  const c = ctx.t.notFound;
  const body = `
<section class="page-hero page-hero--tall s-dark center" aria-labelledby="page-title">
  <div class="page-hero__art" aria-hidden="true"><span class="arc arc--1"></span><span class="arc arc--2"></span><span class="arc arc--3"></span></div>
  <div class="wrap wrap--narrow">
    ${eyebrow(c.eyebrow, 'reveal')}
    <h1 id="page-title" class="display reveal d1">${md(c.title, ctx)}</h1>
    <p class="lead reveal d2">${esc(c.p)}</p>
    <div class="btn-row btn-row--center reveal d3">${btn(ctx, ctx.href('home'), c.back, 'primary')}</div>
  </div>
</section>`;
  return { key: 'notfound', bodyClass: 'page-404', body, noindex: true, alternates: false };
}

export const PAGES = {
  home,
  services,
  process: processPage,
  about,
  contact,
  privacy: (ctx) => legal(ctx, 'privacy'),
  cookies: (ctx) => legal(ctx, 'cookies'),
  terms: (ctx) => legal(ctx, 'terms'),
  thanks,
};
