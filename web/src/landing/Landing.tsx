// The public landing page. It is rendered to static HTML at build time
// (see vite.config.mts) and ships with no JavaScript, so it loads fast and
// search engines see the full text.

import type { ReactNode } from 'react';
import { HeroArt, Tile, ToolIcon } from '../components/Icons';
import { PRICE, SITE_NAME } from './content';
import { getDict, langPath, LANGS, type Dict } from './i18n';
import type { Faq } from './i18n/en';

const APP = '/app/';

export default function Landing({ siteUrl, lang }: { siteUrl: string; lang: string }) {
  const t = getDict(lang);
  return (
    <>
      <div className="page">
        <section className="card hero" aria-labelledby="top">
          <header className="card-head">
            <a className="wordmark" href={langPath(lang)} aria-label={fill(t.nav.home)}>
              sharona
            </a>
            <nav className="nav" aria-label={t.nav.label}>
              <a href="#synthid">{t.nav.synthid}</a>
              <a href="#metadata">{t.nav.metadata}</a>
              <a href="#downloaders">{t.nav.downloaders}</a>
              <a href="#pricing">{t.nav.pricing}</a>
              <a href="#faq">{t.nav.faq}</a>
              <a className="pill-btn" href={APP}>{t.nav.openTools}</a>
            </nav>
            <LangSwitch lang={lang} label={t.nav.language} />
          </header>

          <div className="hero-body">
            <div className="hero-copy">
              <p className="eyebrow">{t.hero.eyebrow}</p>
              <h1 id="top" className="display">
                <Pair p={t.hero.title} />
              </h1>
              <p className="lede">{fill(t.hero.lede)}</p>
              <div className="cta-row">
                <a className="cta" href={`${APP}#strip`}>{t.hero.ctaStrip}</a>
                <a className="cta ghost" href={`${APP}#youtube`}>{t.hero.ctaDownload}</a>
              </div>
              <ul className="chips" aria-label={t.hero.toolsLabel}>
                <ToolChip href="#strip" tool="strip">{t.hero.chipStrip}</ToolChip>
                <ToolChip href="#youtube" tool="youtube">YouTube</ToolChip>
                <ToolChip href="#tiktok" tool="tiktok">TikTok</ToolChip>
                <ToolChip href="#x" tool="x">X</ToolChip>
                <ToolChip href="#instagram" tool="instagram">Instagram</ToolChip>
              </ul>
            </div>
            <HeroArt />
          </div>
        </section>

        <section id="synthid" className="card" aria-labelledby="synthid-h">
          <SectionHead icon={<ToolIcon tool="strip" size={56} />} id="synthid-h" title={t.synthid.title}>
            {fill(t.synthid.lede)}
          </SectionHead>
          <div className="grid3">
            <Feature title={t.synthid.photos.title}>{fill(t.synthid.photos.text)}</Feature>
            <Feature title={t.synthid.videos.title}>{fill(t.synthid.videos.text)}</Feature>
            <Feature title={t.synthid.caveat.title}>{fill(t.synthid.caveat.text)}</Feature>
          </div>
          <div className="card-cta">
            <a className="cta" href={`${APP}#strip`}>{t.synthid.cta}</a>
          </div>
        </section>

        <section id="metadata" className="card" aria-labelledby="metadata-h">
          <SectionHead icon={<Tile from="#60a5fa" to="#1d4ed8" size={56}><PhotoGlyph /></Tile>} id="metadata-h" title={t.metadata.title}>
            {fill(t.metadata.lede)}
          </SectionHead>
          <div className="split">
            <div>
              <h3>{t.metadata.photosTitle}</h3>
              <ul className="tags">
                {t.metadata.photoTags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
              <p className="small">{t.metadata.photoFormats}</p>
            </div>
            <div>
              <h3>{t.metadata.videosTitle}</h3>
              <ul className="tags">
                {t.metadata.videoTags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
              <p className="small">{t.metadata.videoFormats}</p>
            </div>
          </div>
        </section>

        <section className="card" aria-labelledby="where-h">
          <h2 id="where-h" className="display sm">
            <Pair p={t.where.title} />
          </h2>
          <p className="lede">{t.where.lede}</p>
          <div className="split modes">
            <div className="mode">
              <h3>{t.where.server.title}</h3>
              <p>{fill(t.where.server.text)}</p>
            </div>
            <div className="mode">
              <h3>{t.where.device.title}</h3>
              <p>{fill(t.where.device.text)}</p>
            </div>
          </div>
        </section>

        <section id="downloaders" className="dl-grid" aria-label={t.downloaders.label}>
          {(['youtube', 'x', 'tiktok', 'instagram'] as const).map((tool) => (
            <Downloader key={tool} tool={tool} {...t.downloaders[tool]} />
          ))}
        </section>

        <section className="card" aria-labelledby="how-h">
          <h2 id="how-h" className="display sm">
            <Pair p={t.how.title} />
          </h2>
          <ol className="steps">
            {t.how.steps.map(([lead, rest]) => (
              <li key={lead}><b>{lead}</b> {rest}</li>
            ))}
          </ol>
          <a className="cta" href={`${APP}#strip`}>{t.how.cta}</a>
        </section>

        <section id="pricing" className="card" aria-labelledby="pricing-h">
          <h2 id="pricing-h" className="display sm">
            <Pair p={[fill(t.pricing.title[0]), fill(t.pricing.title[1])]} />
          </h2>
          <div className="price">
            <div>
              <p className="price-tag"><b>{PRICE}</b> {t.pricing.perMonth}</p>
              <ul className="price-list">
                {t.pricing.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </div>
            <div className="price-side">
              <p>{t.pricing.billing}</p>
              <a className="cta" href={APP}>{t.pricing.cta}</a>
            </div>
          </div>
        </section>

        <FaqSection id="faq" title={t.faq.title} items={t.faq.items} />
        <FaqSection id="downloaders-faq" title={t.downloaderFaq.title} items={t.downloaderFaq.items} />

        <footer className="foot">
          <p>
            <b>{SITE_NAME}</b> · {t.footer.tagline}{' '}
            <a href={APP}>{t.footer.open}</a>
          </p>
          <p>{fill(t.footer.disclaimer)}</p>
        </footer>

        <aside className="badges" aria-label={t.footer.badges}>
          <a href="https://macbase.app/apps/ghosthand?ref=badge" target="_blank" rel="noopener">
            <img src="https://macbase.app/badge/featured-on-macbase-dark.svg"
                 alt="Ghosthand is featured on MacBase"
                 height="72" style={{ height: '72px', width: 'auto' }} />
          </a>
          <a href="https://www.trymacapps.com" target="_blank" rel="noopener">
            <img
              src="https://www.trymacapps.com/badge.png"
              alt="Featured on TryMacApps"
              width="200"
              height="67"
            />
          </a>
          <a href="https://daniellaunches.com" target="_blank">
            <img src="https://daniellaunches.com/badge-light.svg" alt="Featured on DanielLaunches" width="220" height="48" />
          </a>
          <a href="https://macpip.com/apps/ghosthand?ref=badge">
            <img src="https://macpip.com/badge-listed.svg" width="190" height="52" alt="Listed on MacPip" />
          </a>
        </aside>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(siteUrl, lang, t) }} />
    </>
  );
}

// Japanese runs words together, so a heading split across the accent colour
// gets no space there; every other language gets one.
const NO_SPACE = /[\u3000-\u30ff\u4e00-\u9fff\uff00-\uffef]/;
function Pair({ p: [a, b] }: { p: [string, string] }) {
  const gap = NO_SPACE.test(a.slice(-1)) || NO_SPACE.test(b[0]) ? '' : ' ';
  return <>{a}{gap}<span className="accent">{b}</span></>;
}

/** Fills {site} and {price} in a dictionary string. */
const fill = (s: string) => s.replaceAll('{site}', SITE_NAME).replaceAll('{price}', PRICE);

// A plain <details> menu, so the page still ships no JavaScript.
function LangSwitch({ lang, label }: { lang: string; label: string }) {
  return (
    <details className="lang">
      <summary aria-label={label} title={label}>
        <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
        </svg>
        {lang.toUpperCase()}
      </summary>
      <ul className="lang-menu">
        {LANGS.map((l) => (
          <li key={l.code}>
            <a href={langPath(l.code)} hrefLang={l.code} lang={l.code} aria-current={l.code === lang ? 'page' : undefined}>
              {l.name}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

function ToolChip({ href, tool, children }: { href: string; tool: Parameters<typeof ToolIcon>[0]['tool']; children: ReactNode }) {
  return (
    <li>
      <a className="chip" href={`${APP}${href}`}>
        <ToolIcon tool={tool} size={24} />
        {children}
      </a>
    </li>
  );
}

function SectionHead({ icon, id, title, children }: { icon: ReactNode; id: string; title: [string, string]; children: ReactNode }) {
  return (
    <div className="tool-head">
      {icon}
      <div>
        <h2 id={id} className="display sm">
          <Pair p={title} />
        </h2>
        <p className="lede">{children}</p>
      </div>
    </div>
  );
}

function Feature({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="feature">
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

function FaqSection({ id, title, items }: { id: string; title: [string, string]; items: Faq[] }) {
  return (
    <section id={id} className="card" aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`} className="display sm">
        <Pair p={title} />
      </h2>
      <div className="faq">
        {items.map((f) => (
          <details key={f.q}>
            <summary><h3>{fill(f.q)}</h3></summary>
            <p>{fill(f.a)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Downloader({ tool, title, text, cta }: { tool: 'youtube' | 'x' | 'tiktok' | 'instagram'; title: [string, string]; text: string; cta: string }) {
  return (
    <div className="card dl" aria-labelledby={`${tool}-h`}>
      <ToolIcon tool={tool} size={56} />
      <h2 id={`${tool}-h`} className="display xs">
        <Pair p={title} />
      </h2>
      <p>{text}</p>
      <a className="cta" href={`${APP}#${tool}`}>{cta}</a>
    </div>
  );
}

const PhotoGlyph = () => (
  <g>
    <circle cx="25" cy="25" r="5" fill="#ffd34d" />
    <path d="M14 46 27 32l8 8 6-6 9 12z" fill="#fff" />
  </g>
);

function jsonLd(siteUrl: string, lang: string, t: Dict) {
  const url = `${siteUrl}${langPath(lang)}`;
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: fill(t.jsonLd.name),
        alternateName: t.jsonLd.alternateName,
        url,
        inLanguage: lang,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: t.jsonLd.operatingSystem,
        browserRequirements: t.jsonLd.browserRequirements,
        description: fill(t.jsonLd.description),
        featureList: t.jsonLd.featureList,
      },
      {
        '@type': 'FAQPage',
        url,
        inLanguage: lang,
        // Google expects one FAQPage per page, so both lists go in it.
        mainEntity: [...t.faq.items, ...t.downloaderFaq.items].map((f) => ({
          '@type': 'Question',
          name: fill(f.q),
          acceptedAnswer: { '@type': 'Answer', text: fill(f.a) },
        })),
      },
    ],
  };
  // Keep "</script>" and friends from ending the tag early.
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
