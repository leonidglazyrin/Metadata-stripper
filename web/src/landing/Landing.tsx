// The public landing page. It is rendered to static HTML at build time
// (see vite.config.mts) and ships with no JavaScript, so it loads fast and
// search engines see the full text.

import type { ReactNode } from 'react';
import { HeroArt, Tile, ToolIcon } from '../components/Icons';
import { AI_SOURCES, PRICE, PRICES, SITE_NAME } from './content';
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
              <NavLinks t={t} />
            </nav>
            <LangSwitch lang={lang} label={t.nav.language} />
            <a className="pill-btn head-cta" href={APP}>{t.nav.openTools}</a>
            {/* Mobile: the links fold into a burger menu. <details> needs no JS. */}
            <details className="menu">
              <summary aria-label={t.nav.menu}>
                <span className="burger" aria-hidden="true"><i /><i /><i /></span>
              </summary>
              <nav className="menu-panel" aria-label={t.nav.mobileLabel}>
                <NavLinks t={t} />
                <div className="menu-langs" aria-label={t.nav.language} role="group">
                  {LANGS.map((l) => (
                    <a key={l.code} href={langPath(l.code)} hrefLang={l.code} lang={l.code} title={l.name}
                       aria-current={l.code === lang ? 'page' : undefined}>
                      {l.code.toUpperCase()}
                    </a>
                  ))}
                </div>
              </nav>
            </details>
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
          <div className="sources">
            <h3>{t.synthid.sourcesTitle}</h3>
            <ul className="tags" aria-label={t.synthid.sourcesLabel}>
              {AI_SOURCES.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
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
            <Mark s={fill(t.metadata.lede)} />
          </SectionHead>
          <div className="split">
            <div>
              <h3>{t.metadata.photosTitle}</h3>
              <ul className="tags">
                <li className="tag-hi">{t.metadata.synthidTag}</li>
                {t.metadata.photoTags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
              <p className="small">{t.metadata.photoFormats}</p>
            </div>
            <div>
              <h3>{t.metadata.videosTitle}</h3>
              <ul className="tags">
                <li className="tag-hi">{t.metadata.synthidTag}</li>
                {t.metadata.videoTags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
              <p className="small">{t.metadata.videoFormats}</p>
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
          <ProcessAnimation f={t.how.flow} />
          <ol className="steps flow-steps">
            {t.how.steps.map(([lead, rest]) => (
              <li key={lead}><b>{fill(lead)}</b> {fill(rest)}</li>
            ))}
          </ol>
          <a className="cta" href={`${APP}#strip`}>{t.how.cta}</a>
        </section>

        <section id="pricing" className="card" aria-labelledby="pricing-h">
          <h2 id="pricing-h" className="display sm">
            <Pair p={[fill(t.pricing.title[0]), fill(t.pricing.title[1])]} />
          </h2>
          <p className="price-free">{t.pricing.free}</p>
          <div className="price-plans">
            {(['basic', 'pro'] as const).map((id) => {
              const plan = t.pricing[id];
              return (
                <div key={id} className={`price${id === 'pro' ? ' price-best' : ''}`}>
                  <p className="price-name">
                    {plan.name}
                    {'badge' in plan && plan.badge && <span className="price-badge">{plan.badge}</span>}
                  </p>
                  <p className="price-tag"><b>{PRICES[id]}</b> {t.pricing.perMonth}</p>
                  <ul className="price-list">
                    {plan.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                  <a className={id === 'pro' ? 'cta' : 'cta ghost'} href={APP}>{t.pricing.cta}</a>
                </div>
              );
            })}
          </div>
          <p className="price-foot">
            {t.pricing.billing}
            <StripeBadge label={t.pricing.stripeLabel} />
          </p>
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
      {/* Close the mobile menu once a link in it is tapped. */}
      <script
        dangerouslySetInnerHTML={{
          __html: "document.querySelectorAll('.menu-panel a').forEach(function(a){a.addEventListener('click',function(){a.closest('details').open=false})})",
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(siteUrl, lang, t) }} />
    </>
  );
}

function NavLinks({ t }: { t: Dict }) {
  return (
    <>
      <a href="#synthid">{t.nav.synthid}</a>
      <a href="#metadata">{t.nav.metadata}</a>
      <a href="#downloaders">{t.nav.downloaders}</a>
      <a href="#pricing">{t.nav.pricing}</a>
      <a href="#faq">{t.nav.faq}</a>
    </>
  );
}

/** Draws the word "SynthID" in a string with the highlight mark. */
function Mark({ s }: { s: string }) {
  const parts = s.split('SynthID');
  return <>{parts.map((p, i) => (i === 0 ? p : <span key={i}><b className="synth-mark">SynthID</b>{p}</span>))}</>;
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

// A CSS-only loop of the three steps: a file is uploaded, its tags are
// stripped while a scan line weakens the watermark pattern, and a clean copy
// is offered for download. The base styles are the finished state, so with
// reduced motion (which turns animations off) it shows the end result.
function ProcessAnimation({ f }: { f: Dict['how']['flow'] }) {
  return (
    <div className="flow" aria-hidden="true">
      <div className="flow-file">
        <div className="flow-thumb">
          <span className="flow-wm" />
          <svg className="flow-play" width="44" height="44" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="30" fill="rgba(255,255,255,0.22)" />
            <path d="M26 20.5v23l18-11.5z" fill="#fff" />
          </svg>
          <span className="flow-scan" />
          <span className="flow-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
        </div>
        <div className="flow-meta">
          <p className="flow-name">
            <span className="n1">veo-clip.mp4</span>
            <span className="n2">veo-clip-clean.mp4</span>
          </p>
          <p className="flow-status">
            <span className="s1">{f.uploading}</span>
            <span className="s2">{f.stripping}</span>
            <span className="s3">{f.clean}</span>
          </p>
          <div className="flow-bar"><i /></div>
          <ul className="flow-tags">
            <li>EXIF</li>
            <li>GPS</li>
            <li>C2PA</li>
            <li>SynthID</li>
          </ul>
        </div>
        <span className="flow-dl">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4v12m0 0-5-5m5 5 5-5M5 20h14" />
          </svg>
          {f.download}
        </span>
      </div>
    </div>
  );
}

// A small, quiet "Stripe" mark (16px) next to the billing line: a trust cue.
const StripeBadge = ({ label }: { label: string }) => (
  <span className="stripe-badge" aria-label={label} title={label}>
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#635BFF" />
      <path
        fill="#fff"
        transform="translate(4.2 4.2) scale(0.65)"
        d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"
      />
    </svg>
    <span>Stripe</span>
  </span>
);

const PhotoGlyph = () => (
  <g>
    <circle cx="25" cy="25" r="5" fill="#ffd34d" />
    <path d="M14 46 27 32l8 8 6-6 9 12z" fill="#fff" />
  </g>
);

// "$20" -> "20.00" for structured data.
const priceNumber = (p: string) => Number(p.replace(/[^0-9.]/g, '')).toFixed(2);

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
        keywords: t.jsonLd.keywords,
        featureList: t.jsonLd.featureList,
        offers: (['basic', 'pro'] as const).map((id) => ({
          '@type': 'Offer',
          name: t.pricing[id].name,
          price: priceNumber(PRICES[id]),
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: priceNumber(PRICES[id]),
            priceCurrency: 'USD',
            unitCode: 'MON',
            referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
          },
        })),
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
