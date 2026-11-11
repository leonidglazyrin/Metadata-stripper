import { renderToStaticMarkup } from 'react-dom/server';
import Landing from './Landing';
import { SITE_NAME } from './content';
import { DEFAULT_LANG, getDict, getLang, langPath, LANGS } from './i18n';

export { LANGS, langPath };

const S = '__SITE_URL__';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const fill = (s: string) => s.replaceAll('{site}', SITE_NAME);

/**
 * Static HTML for one language of the landing page: the <head> tags that
 * differ per language (title, description, canonical, hreflang, Open Graph)
 * and the page body. The server swaps __SITE_URL__ for the real origin.
 */
export function render(lang: string = DEFAULT_LANG) {
  const t = getDict(lang);
  const { ogLocale } = getLang(lang);
  const url = `${S}${langPath(lang)}`;
  const title = esc(fill(t.meta.title));
  const head = [
    `<title>${title}</title>`,
    `<meta name="description" content="${esc(fill(t.meta.description))}">`,
    `<link rel="canonical" href="${url}">`,
    ...LANGS.map((l) => `<link rel="alternate" hreflang="${l.code}" href="${S}${langPath(l.code)}">`),
    `<link rel="alternate" hreflang="x-default" href="${S}${langPath(DEFAULT_LANG)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:locale" content="${ogLocale}">`,
    ...LANGS.filter((l) => l.code !== lang).map((l) => `<meta property="og:locale:alternate" content="${l.ogLocale}">`),
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${esc(fill(t.meta.ogDescription))}">`,
    `<meta property="og:image:alt" content="${esc(fill(t.meta.ogImageAlt))}">`,
    `<meta name="twitter:title" content="${title}">`,
    `<meta name="twitter:description" content="${esc(fill(t.meta.twitterDescription))}">`,
  ].join('\n');
  return { lang, head, body: renderToStaticMarkup(<Landing siteUrl={S} lang={lang} />) };
}
