import { renderToStaticMarkup } from 'react-dom/server';
import type { ReactElement } from 'react';
import { SITE_NAME } from '../landing/content';
import { DEFAULT_LANG, getLang } from '../landing/i18n';
import { GUIDES, guidePath, type Guide } from './guides';
import { guideLangs, guidesIn, langPrefix, localGuide, pagesUi, PAGE_LANGS } from './i18n';
import { LEGAL_DOCS } from './legal';
import { fill, GuidePage, GuidesIndex, LegalPage, plain } from './Pages';

const S = '__SITE_URL__';
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

type Alternate = { code: string; path: string };

type Page = {
  path: string;
  lang: string;
  title: string;
  description: string;
  priority: string;
  ogType: 'article' | 'website';
  /** The same page in every language it exists in (this one included). */
  alternates: Alternate[];
  element: () => ReactElement;
  jsonLd: () => object[];
};

const crumbs = (items: [string, string][]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${S}${path}` })),
});

const publisher = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: `${S}/`,
  logo: { '@type': 'ImageObject', url: `${S}/icon-512.png` },
};

const indexPath = (lang: string) => `${langPrefix(lang)}/guides/`;
const homePath = (lang: string) => `${langPrefix(lang)}/`;

function guidePage(base: Guide, lang: string): Page {
  const g = localGuide(base, lang)!;
  const ui = pagesUi(lang);
  const path = guidePath(g.slug, lang);
  const url = `${S}${path}`;
  return {
    path,
    lang,
    title: `${fill(g.metaTitle)} · ${SITE_NAME}`,
    description: fill(g.description),
    // The explainer is the hub the other SynthID guides link to.
    priority: g.explainer ? '0.8' : '0.7',
    ogType: 'article',
    alternates: guideLangs(base).map((code) => ({ code, path: guidePath(g.slug, code) })),
    element: () => <GuidePage guide={g} lang={lang} />,
    jsonLd: () => [
      {
        '@type': 'Article',
        headline: fill(g.title),
        description: fill(g.description),
        url,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        inLanguage: lang,
        datePublished: g.updated,
        dateModified: g.updated,
        author: publisher,
        publisher,
        image: `${S}/og-image.png?v=2`,
        articleSection: ui.kind[g.kind],
        ...(g.explainer ? { about: { '@type': 'Thing', name: 'SynthID' } } : {}),
      },
      ...(g.explainer
        ? []
        : [{
            '@type': 'HowTo',
            name: fill(g.title),
            description: fill(g.description),
            url,
            inLanguage: lang,
            tool: { '@type': 'HowToTool', name: SITE_NAME },
            step: g.steps.map((s, i) => ({
              '@type': 'HowToStep',
              position: i + 1,
              name: fill(s.name),
              text: plain(s.text),
              url: `${url}#steps`,
            })),
          }]),
      ...(g.faq.length
        ? [{
            '@type': 'FAQPage',
            url,
            inLanguage: lang,
            mainEntity: g.faq.map((f) => ({ '@type': 'Question', name: fill(f.q), acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })),
          }]
        : []),
      crumbs([[ui.home, homePath(lang)], [ui.guides, indexPath(lang)], [fill(g.short), path]]),
    ],
  };
}

function indexPage(lang: string): Page {
  const ui = pagesUi(lang);
  return {
    path: indexPath(lang),
    lang,
    title: `${fill(ui.index.metaTitle)} · ${SITE_NAME}`,
    description: fill(ui.index.description),
    priority: '0.8',
    ogType: 'website',
    alternates: PAGE_LANGS.map((code) => ({ code, path: indexPath(code) })),
    element: () => <GuidesIndex lang={lang} />,
    jsonLd: () => [
      {
        '@type': 'CollectionPage',
        name: `${SITE_NAME} ${ui.guides}`,
        url: `${S}${indexPath(lang)}`,
        inLanguage: lang,
        hasPart: guidesIn(lang).map((g) => ({ '@type': 'Article', headline: fill(g.title), url: `${S}${guidePath(g.slug, lang)}` })),
      },
      crumbs([[ui.home, homePath(lang)], [ui.guides, indexPath(lang)]]),
    ],
  };
}

/** Every content page, in sitemap order: each guide in every language, then the legal pages. */
export const PAGES: Page[] = [
  ...PAGE_LANGS.map(indexPage),
  ...GUIDES.flatMap((g) => guideLangs(g).map((lang) => guidePage(g, lang))),
  ...LEGAL_DOCS.map<Page>((d) => ({
    path: d.path,
    lang: DEFAULT_LANG,
    title: fill(d.metaTitle),
    description: fill(d.description),
    priority: '0.3',
    ogType: 'website',
    alternates: [],
    element: () => <LegalPage doc={d} />,
    jsonLd: () => [
      { '@type': 'WebPage', name: d.title, url: `${S}${d.path}`, inLanguage: 'en', dateModified: d.updated },
      crumbs([['Home', '/'], [d.title, d.path]]),
    ],
  })),
];

export const pageFor = (urlPath: string) => {
  const p = urlPath.split(/[?#]/)[0].replace(/\/?$/, '/');
  return PAGES.find((x) => x.path === p);
};

/** Static HTML (head tags and body) for one content page. */
export function renderPage(path: string) {
  const page = pageFor(path);
  if (!page) throw new Error(`Unknown page: ${path}`);
  const url = `${S}${page.path}`;
  const title = esc(page.title);
  const description = esc(page.description);
  const { ogLocale } = getLang(page.lang);
  const en = page.alternates.find((a) => a.code === DEFAULT_LANG);
  const head = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}">`,
    `<link rel="canonical" href="${url}">`,
    ...(page.alternates.length > 1
      ? [
          ...page.alternates.map((a) => `<link rel="alternate" hreflang="${a.code}" href="${S}${a.path}">`),
          ...(en ? [`<link rel="alternate" hreflang="x-default" href="${S}${en.path}">`] : []),
        ]
      : []),
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:locale" content="${ogLocale}">`,
    ...page.alternates.filter((a) => a.code !== page.lang).map((a) => `<meta property="og:locale:alternate" content="${getLang(a.code).ogLocale}">`),
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:image:alt" content="${title}">`,
    ...(page.ogType === 'article' ? [`<meta property="article:section" content="${esc(pagesUi(page.lang).guides)}">`] : []),
    `<meta name="twitter:title" content="${title}">`,
    `<meta name="twitter:description" content="${description}">`,
  ].join('\n');
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@graph': page.jsonLd() }).replace(/</g, '\\u003c');
  const body = renderToStaticMarkup(page.element()) + `<script type="application/ld+json">${ld}</script>`;
  return { lang: page.lang, head, body };
}
