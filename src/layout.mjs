import { SITE, LANGS, DEFAULT_LANG, ROUTES, NAV, LEGAL, NOINDEX } from './site.mjs';
import { esc, md, plain, logoSvg, icon } from './lib.mjs';

// Tiny inline script: flips no-js → js before first paint. Its sha256 is added to the CSP by the build.
export const BOOT = `document.documentElement.className=document.documentElement.className.replace('no-js','js')`;

const OG_LOCALE_ALT = { en: 'sq_AL', sq: 'en_US' };

function jsonLd(ctx, page) {
  const { site, lang } = ctx;
  const orgId = `${site.url}/#organization`;
  const siteId = `${site.url}/#website`;
  const pageUrl = ctx.abs(page.path);
  const graph = [
    {
      '@type': ['ProfessionalService', 'Organization'],
      '@id': orgId,
      name: site.name,
      url: site.url + '/',
      logo: { '@type': 'ImageObject', url: `${site.url}/icon-512.png`, width: 512, height: 512 },
      image: `${site.url}/og/og-en.jpg`,
      email: site.email,
      telephone: site.phone,
      slogan: 'Strategy, creativity, and calm execution.',
      description: ctx.dict.en.seo.home.description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.street,
        addressLocality: site.city,
        addressCountry: site.country,
      },
      areaServed: 'Worldwide',
      knowsLanguage: ['en', 'sq'],
      sameAs: [site.instagram, site.linkedin],
    },
    {
      '@type': 'WebSite',
      '@id': siteId,
      url: site.url + '/',
      name: site.name,
      inLanguage: LANGS,
      publisher: { '@id': orgId },
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: page.title,
      description: page.description,
      inLanguage: lang,
      isPartOf: { '@id': siteId },
      about: { '@id': orgId },
    },
  ];
  if (page.key !== 'home' && page.key !== 'notfound') {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: ctx.t.ui.breadcrumbHome, item: ctx.abs(ROUTES.home[lang]) },
        { '@type': 'ListItem', position: 2, name: plain(page.crumb || page.title), item: pageUrl },
      ],
    });
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

function header(ctx, page) {
  const { t, lang } = ctx;
  const links = NAV.map((key) => {
    const current = page.key === key ? ' aria-current="page"' : '';
    return `<li><a href="${ctx.href(key)}"${current}>${esc(t.ui.nav[key])}</a></li>`;
  }).join('');
  // One switcher: the current language is plain text, the other is a link whose label is
  // written in the target language (t.ui.switchToLabel).
  const switcher = LANGS.map((l) => {
    const here = l === lang;
    return here
      ? `<span class="lang__item" aria-current="true" lang="${l}">${ctx.dict[l].short}</span>`
      : `<a class="lang__item" href="${ctx.alt(page, l)}" hreflang="${l}" lang="${l}" aria-label="${ctx.dict[l].short} — ${esc(t.ui.switchToLabel)}">${ctx.dict[l].short}</a>`;
  }).join('<span class="lang__sep" aria-hidden="true"></span>');
  return `
<a class="skip" href="#main">${esc(t.ui.skip)}</a>
<header class="site-header" data-header>
  <div class="wrap header__in">
    <a class="brand" href="${ctx.href('home')}" aria-label="${esc(t.ui.homeLabel)}">
      ${logoSvg('brand__logo')}<span class="brand__name">Grow <b>Base</b></span>
    </a>
    <nav class="nav" id="site-nav" aria-label="${esc(t.ui.primaryNav)}" data-nav>
      <ul class="nav__list">${links}</ul>
      <a class="btn btn--primary nav__cta" href="${ctx.href('contact')}">${esc(t.ui.cta)}${icon('arrow', 'i btn__i')}</a>
    </nav>
    <div class="header__tools">
      <div class="lang" role="group" aria-label="${esc(t.ui.languageNav)}">${switcher}</div>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav" data-menu-btn data-label-open="${esc(t.ui.menu)}" data-label-close="${esc(t.ui.closeMenu)}">
        <span class="sr">${esc(t.ui.menu)}</span><span class="menu-btn__bars" aria-hidden="true"></span>
      </button>
    </div>
  </div>
</header>`;
}

function footer(ctx) {
  const { t, site } = ctx;
  const f = t.ui.footer;
  const explore = ['home', ...NAV.filter((k) => k !== 'contact'), 'contact']
    .map((k) => `<li><a href="${ctx.href(k)}">${esc(k === 'home' ? t.ui.breadcrumbHome : t.ui.nav[k])}</a></li>`)
    .join('');
  const legal = LEGAL.map((k) => `<li><a href="${ctx.href(k)}">${esc(f.legal[k])}</a></li>`).join('');
  return `
<footer class="site-footer s-ink">
  <div class="wrap">
    <div class="footer__top">
      <div class="footer__brand">
        <a class="brand brand--lg" href="${ctx.href('home')}" aria-label="${esc(t.ui.homeLabel)}">${logoSvg('brand__logo')}<span class="brand__name">Grow <b>Base</b></span></a>
        <p>${esc(f.tagline)}</p>
      </div>
      <nav class="footer__col" aria-label="${esc(t.ui.footerNav)}">
        <h2 class="footer__h">${esc(f.explore)}</h2>
        <ul>${explore}</ul>
      </nav>
      <div class="footer__col">
        <h2 class="footer__h">${esc(f.contact)}</h2>
        <ul>
          <li><a href="mailto:${site.email}">${esc(site.email)}</a></li>
          <li><a href="${site.phoneHref}">${esc(site.phone)}</a></li>
          <li><address>${esc(site.street)}<br>${esc(t.contact.details.city)}</address></li>
        </ul>
      </div>
      <div class="footer__col">
        <h2 class="footer__h">${esc(f.follow)}</h2>
        <ul class="footer__social">
          <li><a href="${site.instagram}" target="_blank" rel="noopener noreferrer">${icon('instagram')}<span>Instagram</span></a></li>
          <li><a href="${site.linkedin}" target="_blank" rel="noopener noreferrer">${icon('linkedin')}<span>LinkedIn</span></a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <p>© ${site.year} Grow Base — ${esc(f.rights)}</p>
      <nav aria-label="${esc(t.ui.legalNav)}"><ul class="footer__legal">${legal}</ul></nav>
      <p class="footer__art">${esc(f.art)} <a href="${ctx.href('terms')}#credits">${esc(f.artLink)}</a></p>
    </div>
  </div>
</footer>`;
}

export function renderDocument(ctx, page) {
  const { lang, t, site } = ctx;
  const title = esc(page.title);
  const description = esc(page.description);
  const canonical = ctx.abs(page.path);
  const robots = page.noindex || !site.isProduction ? 'noindex, follow' : 'index, follow, max-image-preview:large';
  const ogImage = `${site.url}/og/og-${lang}.jpg`;
  const alternates = page.alternates === false ? '' : LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${ctx.abs(ctx.alt(page, l))}">`).join('\n') +
    `\n<link rel="alternate" hreflang="x-default" href="${ctx.abs(ctx.alt(page, DEFAULT_LANG))}">`;
  return `<!doctype html>
<html lang="${lang}" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="robots" content="${robots}">
<link rel="canonical" href="${canonical}">
${alternates}
<meta name="theme-color" content="${site.themeColor}">
<meta name="format-detection" content="telephone=no">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta property="og:locale" content="${t.locale}">
<meta property="og:locale:alternate" content="${OG_LOCALE_ALT[lang]}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(plain(ctx.t.home.hero.title))} — Grow Base">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${ogImage}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
${(page.preloads || []).join('\n')}
<link rel="stylesheet" href="${ctx.asset('css/main.css')}">
<script>${BOOT}</script>
<script src="${ctx.asset('js/main.js')}" defer></script>
<script type="application/ld+json">${jsonLd(ctx, page)}</script>
</head>
<body class="${page.bodyClass || ''}">
${header(ctx, page)}
<main id="main" tabindex="-1">
${page.body}
</main>
${footer(ctx)}
</body>
</html>
`;
}
