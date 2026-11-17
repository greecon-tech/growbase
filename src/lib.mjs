import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { ROUTES } from './site.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const logo = JSON.parse(readFileSync(path.join(here, 'public/assets/img/logo-path.json'), 'utf8'));
export const ART = JSON.parse(readFileSync(path.join(here, 'public/assets/img/art-sizes.json'), 'utf8'));

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Tiny inline-markup renderer for content strings.
 *   *italic*  **bold**  [text](https://…)  [text](@routeKey)  [text](mailto:…)
 * Everything else is HTML-escaped, so content files can never inject markup.
 */
export function md(str, ctx) {
  let out = esc(str);
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text, href) => {
    if (href.startsWith('@')) {
      const [key, hash] = href.slice(1).split('#');
      return `<a href="${ctx.href(key)}${hash ? '#' + hash : ''}">${text}</a>`;
    }
    const external = /^https?:/.test(href);
    return `<a href="${href}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>`;
  });
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return out;
}

/** Plain-text version (for meta tags / aria labels): strips the inline markup. */
export const plain = (str) =>
  String(str)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1');

export const logoSvg = (cls = 'logo') =>
  `<svg class="${cls}" viewBox="0 0 ${logo.w} ${logo.h}" aria-hidden="true" focusable="false"><path fill="currentColor" fill-rule="evenodd" d="${logo.d}"/></svg>`;

const ICONS = {
  arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  'arrow-up-right': '<path d="M7 17 17 7M8 7h9v9"/>',
  mail: '<path d="M3.5 6h17v12h-17zM3.5 7l8.5 6.5L20.5 7"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  pin: '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V16M12 16v-5.5M12 12.8c0-1.5 1-2.3 2.3-2.3 1.5 0 2.2 1 2.2 2.4V16"/><circle cx="8" cy="7.8" r=".9" fill="currentColor"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
};

export const icon = (name, cls = 'i') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;

/** Responsive <picture> with AVIF + WebP from the generated art set. */
export function picture(ctx, { set, sizes, alt, cls = '', eager = false, role }) {
  const widths = Object.keys(ART[set]).map(Number).sort((a, b) => a - b);
  const [fw, fh] = ART[set][String(widths.at(-1))];
  const srcset = (ext) => widths.map((w) => `${ctx.asset(`img/art-${set}-${w}.${ext}`)} ${w}w`).join(', ');
  const fallback = ctx.asset(`img/art-${set}-${widths[Math.min(1, widths.length - 1)]}.webp`);
  return (
    `<picture>` +
    `<source type="image/avif" srcset="${srcset('avif')}" sizes="${sizes}">` +
    `<source type="image/webp" srcset="${srcset('webp')}" sizes="${sizes}">` +
    `<img class="${cls}" src="${fallback}" width="${fw}" height="${fh}" alt="${esc(alt)}"` +
    `${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"${role ? ` role="${role}"` : ''}>` +
    `</picture>`
  );
}

/** Preload hints for an art set (used for the above-the-fold hero image). */
export function preloadArt(ctx, set, sizes) {
  const widths = Object.keys(ART[set]).map(Number).sort((a, b) => a - b);
  const srcset = widths.map((w) => `${ctx.asset(`img/art-${set}-${w}.avif`)} ${w}w`).join(', ');
  return `<link rel="preload" as="image" type="image/avif" imagesrcset="${srcset}" imagesizes="${sizes}" fetchpriority="high">`;
}

export const href = (lang, key) => ROUTES[key][lang];
export const abs = (site, p) => site.url + p;
