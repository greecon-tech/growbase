// Site-wide constants: identity, contact details, routes.
// Edit contact details here and they update everywhere (both languages, JSON-LD, footer).

export const SITE = {
  name: 'Grow Base',
  // Canonical production origin. Override with SITE_URL when the domain changes.
  url: (process.env.SITE_URL || 'https://growbase.agency').replace(/\/$/, ''),
  email: 'info@growbase.agency',
  phone: '+355 69 829 8980',
  phoneHref: 'tel:+355698298980',
  street: 'Bulevardi Dëshmorët e Kombit',
  city: 'Tirana',
  country: 'AL',
  instagram: 'https://www.instagram.com/growbase.agency/',
  instagramHandle: '@growbase.agency',
  linkedin: 'https://www.linkedin.com/company/growbaseagency/',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bulevardi+D%C3%ABshmor%C3%ABt+e+Kombit+Tirana+Albania',
  themeColor: '#3a3530',
  // Netlify sets CONTEXT=production|deploy-preview|branch-deploy. Non-production builds are kept out of search.
  isProduction: !process.env.CONTEXT || process.env.CONTEXT === 'production',
  year: new Date().getFullYear(),
  buildDate: new Date().toISOString().slice(0, 10),
};

export const LANGS = ['en', 'sq'];
export const DEFAULT_LANG = 'en';

// key -> localized path. Albanian slugs are ASCII-folded for clean, shareable URLs.
export const ROUTES = {
  home: { en: '/', sq: '/sq/' },
  services: { en: '/services/', sq: '/sq/sherbimet/' },
  process: { en: '/process/', sq: '/sq/procesi/' },
  about: { en: '/about/', sq: '/sq/rreth-nesh/' },
  contact: { en: '/contact/', sq: '/sq/kontakt/' },
  privacy: { en: '/privacy/', sq: '/sq/privatesia/' },
  cookies: { en: '/cookies/', sq: '/sq/cookies/' },
  terms: { en: '/terms/', sq: '/sq/kushtet/' },
  thanks: { en: '/thank-you/', sq: '/sq/faleminderit/' },
};

// Pages that should not be indexed or listed in the sitemap.
export const NOINDEX = new Set(['thanks']);

export const NAV = ['services', 'process', 'about', 'contact'];
export const LEGAL = ['privacy', 'cookies', 'terms'];
