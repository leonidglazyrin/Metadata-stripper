'use strict';

// The bits of page serving shared by the Express server (server/index.js) and
// the Cloudflare Worker (worker/app.mjs), which serves the pages in
// production so a visit never wakes the container.

/** The pages carry __SITE_URL__ and __CONTACT_EMAIL__ placeholders. */
function fillPage(html, site, contactEmail) {
  return html.replaceAll('__SITE_URL__', site).replaceAll('__CONTACT_EMAIL__', contactEmail);
}

/** CONTACT_EMAIL when it looks like an address, else support@<site host>. */
function contactEmailFor(configured, site) {
  if (/^[^\s@<>"]+@[^\s@<>"]+$/.test(configured || '')) return configured;
  return `support@${new URL(site).hostname.replace(/^www\./, '')}`;
}

const robotsTxt = (base) => `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${base}/sitemap.xml\n`;

const altLinks = (base, alts) =>
  [
    ...alts.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.code}" href="${base}${a.path}"/>`),
    ...alts.filter((a) => a.code === 'en').map((a) => `    <xhtml:link rel="alternate" hreflang="x-default" href="${base}${a.path}"/>`),
  ].join('\n');

/**
 * langs: [{ code, path }] from landing-langs.json; pages: [{ path, priority, alternates? }]
 * from pages.json, where alternates lists the same page in each language it exists in.
 */
function sitemapXml(base, langs, pages) {
  // Each language version lists every other one (and x-default) as an alternate.
  const alternates = [
    ...langs.map((l) => `    <xhtml:link rel="alternate" hreflang="${l.code}" href="${base}${l.path}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${base}/"/>`,
  ].join('\n');
  const urls = [
    ...langs.map((l) => `  <url>\n    <loc>${base}${l.path}</loc>\n    <priority>${l.path === '/' ? '1.0' : '0.9'}</priority>\n${alternates}\n  </url>`),
    `  <url>\n    <loc>${base}/app/</loc>\n    <priority>0.8</priority>\n  </url>`,
    ...pages.map((p) => `  <url>\n    <loc>${base}${p.path}</loc>\n    <priority>${p.priority}</priority>\n${p.alternates ? `${altLinks(base, p.alternates)}\n` : ''}  </url>`),
  ].join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
}

const NOT_FOUND_HTML = '<!doctype html><meta charset="utf-8"><title>Not found · SynthIDStripper</title><meta name="robots" content="noindex"><p style="font:16px system-ui;padding:40px">Page not found. <a href="/">Go to Sharona</a></p>';

// Guides also exist under a language prefix: /es/guides/…
const CONTENT_PAGE = /^\/(?:[a-z]{2}\/)?(guides|privacy|terms)(\/[a-z0-9-]*)*\/?$/;
const LANG_PAGE = /^\/([a-z]{2})(\/?)$/;

module.exports = { fillPage, contactEmailFor, robotsTxt, sitemapXml, NOT_FOUND_HTML, CONTENT_PAGE, LANG_PAGE };
