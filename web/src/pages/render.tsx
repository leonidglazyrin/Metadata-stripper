import { renderToStaticMarkup } from 'react-dom/server';
import type { ReactElement } from 'react';
import { SITE_NAME } from '../landing/content';
import { GUIDES, guidePath } from './guides';
import { LEGAL_DOCS } from './legal';
import { fill, GuidePage, GuidesIndex, LegalPage, plain } from './Pages';

const S = '__SITE_URL__';
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

type Page = {
  path: string;
  title: string;
  description: string;
  priority: string;
  ogType: 'article' | 'website';
  element: () => ReactElement;
  jsonLd: () => object[];
};

const crumbs = (items: [string, string][]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${S}${path}` })),
});

const publisher = { '@type': 'Organization', name: SITE_NAME, url: `${S}/` };

/** Every content page, in sitemap order. */
export const PAGES: Page[] = [
  {
    path: '/guides/',
    title: `Guides: Remove Metadata & Download Videos · ${SITE_NAME}`,
    description: 'Step-by-step guides to remove GPS, EXIF and C2PA data from photos and videos, and to download YouTube, TikTok, X and Instagram videos.',
    priority: '0.8',
    ogType: 'website',
    element: () => <GuidesIndex />,
    jsonLd: () => [
      {
        '@type': 'CollectionPage',
        name: `${SITE_NAME} guides`,
        url: `${S}/guides/`,
        inLanguage: 'en',
        hasPart: GUIDES.map((g) => ({ '@type': 'Article', headline: fill(g.title), url: `${S}${guidePath(g.slug)}` })),
      },
      crumbs([['Home', '/'], ['Guides', '/guides/']]),
    ],
  },
  ...GUIDES.map<Page>((g) => ({
    path: guidePath(g.slug),
    title: `${fill(g.metaTitle)} · ${SITE_NAME}`,
    description: fill(g.description),
    priority: '0.7',
    ogType: 'article',
    element: () => <GuidePage guide={g} />,
    jsonLd: () => {
      const url = `${S}${guidePath(g.slug)}`;
      return [
        {
          '@type': 'Article',
          headline: fill(g.title),
          description: fill(g.description),
          url,
          mainEntityOfPage: url,
          inLanguage: 'en',
          datePublished: g.updated,
          dateModified: g.updated,
          author: publisher,
          publisher,
          image: `${S}/og-image.png`,
        },
        {
          '@type': 'HowTo',
          name: fill(g.title),
          description: fill(g.description),
          url,
          tool: { '@type': 'HowToTool', name: SITE_NAME },
          step: g.steps.map((s, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: fill(s.name),
            text: plain(s.text),
            url: `${url}#steps`,
          })),
        },
        ...(g.faq.length
          ? [{
              '@type': 'FAQPage',
              url,
              mainEntity: g.faq.map((f) => ({ '@type': 'Question', name: fill(f.q), acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })),
            }]
          : []),
        crumbs([['Home', '/'], ['Guides', '/guides/'], [g.short, guidePath(g.slug)]]),
      ];
    },
  })),
  ...LEGAL_DOCS.map<Page>((d) => ({
    path: d.path,
    title: fill(d.metaTitle),
    description: fill(d.description),
    priority: '0.3',
    ogType: 'website',
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
  const head = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}">`,
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:locale" content="en_US">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:image:alt" content="${title}">`,
    ...(page.ogType === 'article' ? ['<meta property="article:section" content="Guides">'] : []),
    `<meta name="twitter:title" content="${title}">`,
    `<meta name="twitter:description" content="${description}">`,
  ].join('\n');
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@graph': page.jsonLd() }).replace(/</g, '\\u003c');
  const body = renderToStaticMarkup(page.element()) + `<script type="application/ld+json">${ld}</script>`;
  return { lang: 'en', head, body };
}
