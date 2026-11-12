// Static content pages: guides, the guides index, and the legal pages. Like
// the landing page they are rendered to HTML at build time and ship with no
// JavaScript. Guides and the index exist in every language of the landing
// page (see ./i18n); the legal pages are English only.

import type { ReactNode } from 'react';
import { ToolIcon } from '../components/Icons';
import { PRICES, SITE_NAME, YEARLY_PRICES } from '../landing/content';
import { DEFAULT_LANG, getDict, LANGS, langPath } from '../landing/i18n';
import { guideBySlug, guidePath, type Block, type Guide, type Section } from './guides';
import { guidesIn, langPrefix, localGuide, pagesUi, PAGE_LANGS } from './i18n';
import type { LegalDoc } from './legal';

const APP = '/app/';

export const fill = (s: string) => s.replaceAll('{site}', SITE_NAME);

/** Internal links in guide text are written for English; point them at the same page in `lang` when it exists. */
export function localHref(href: string, lang: string) {
  if (lang === DEFAULT_LANG || !href.startsWith('/')) return href;
  const guide = href.match(/^\/guides\/([a-z0-9-]+)\/(#.*)?$/);
  if (guide) {
    const g = guideBySlug(guide[1]);
    return g && localGuide(g, lang) ? guidePath(g.slug, lang) + (guide[2] ?? '') : href;
  }
  if (href === '/guides/') return `${langPrefix(lang)}/guides/`;
  if (href === '/' || href.startsWith('/#')) return langPath(lang) + href.slice(1);
  return href;
}

/** Inline markup: `code`, **bold** and [text](href). */
export function Rich({ s, lang = DEFAULT_LANG }: { s: string; lang?: string }) {
  const out: ReactNode[] = [];
  const re = /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  const text = fill(s);
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) out.push(<code key={m.index}>{m[1]}</code>);
    else if (m[2] !== undefined) out.push(<b key={m.index}>{m[2]}</b>);
    else {
      const external = /^https?:/.test(m[4]);
      out.push(
        <a key={m.index} href={localHref(m[4], lang)} {...(external ? { rel: 'noopener', target: '_blank' } : {})}>
          {m[3]}
        </a>,
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/** Plain text of a string with inline markup, for meta tags and JSON-LD. */
export const plain = (s: string) =>
  fill(s).replace(/`([^`]+)`/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

function Blocks({ blocks, lang }: { blocks: Block[]; lang: string }) {
  return (
    <>
      {blocks.map((b, i) => {
        if ('p' in b) return <p key={i}><Rich s={b.p} lang={lang} /></p>;
        if ('note' in b) return <p key={i} className="doc-note"><Rich s={b.note} lang={lang} /></p>;
        if ('code' in b) return <pre key={i}><code>{b.code}</code></pre>;
        const items = 'ul' in b ? b.ul : b.ol;
        const List = 'ul' in b ? 'ul' : 'ol';
        return <List key={i}>{items.map((it) => <li key={it}><Rich s={it} lang={lang} /></li>)}</List>;
      })}
    </>
  );
}

function Sections({ sections, lang }: { sections: Section[]; lang: string }) {
  return (
    <>
      {sections.map((s) => (
        <section key={s.h} aria-labelledby={slugify(s.h)}>
          <h2 id={slugify(s.h)}>{fill(s.h)}</h2>
          <Blocks blocks={s.blocks} lang={lang} />
        </section>
      ))}
    </>
  );
}

// Unicode-aware, so headings in Russian, Japanese or Korean still get ids.
const slugify = (s: string) =>
  fill(s).toLowerCase().normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');

const longDate = (iso: string, locale: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

// Japanese runs words together, so a heading split across the accent colour
// gets no space there; every other language gets one.
const NO_SPACE = /[　-ヿ一-鿿＀-￯]/;
export function Pair({ p: [a, b] }: { p: [string, string] }) {
  const gap = NO_SPACE.test(a.slice(-1)) || NO_SPACE.test(b[0]) ? '' : ' ';
  return <>{a}{gap}<span className="accent">{b}</span></>;
}

/** The language menu. `hrefFor` gives the same page in another language, or undefined when it has none. */
export function LangSwitch({ lang, label, hrefFor }: { lang: string; label: string; hrefFor: (code: string) => string | undefined }) {
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
        {LANGS.map((l) => {
          const href = hrefFor(l.code);
          return href ? (
            <li key={l.code}>
              <a href={href} hrefLang={l.code} lang={l.code} aria-current={l.code === lang ? 'page' : undefined}>
                {l.name}
              </a>
            </li>
          ) : null;
        })}
      </ul>
    </details>
  );
}

/** Header and footer shared by every content page. */
export function Shell({
  lang,
  crumbs,
  hrefFor,
  children,
}: {
  lang: string;
  crumbs: { name: string; href?: string }[];
  hrefFor?: (code: string) => string | undefined;
  children: ReactNode;
}) {
  const ui = pagesUi(lang);
  return (
    <div className="page doc-page">
      <header className="card doc-head">
        <a className="wordmark" href={langPath(lang)} aria-label={`${SITE_NAME} ${ui.home}`}>sharona</a>
        <nav className="nav" aria-label={ui.navLabel}>
          <a href={`${langPrefix(lang)}/guides/`}>{ui.guides}</a>
          <a href={`${langPath(lang)}#pricing`}>{ui.pricing}</a>
        </nav>
        {hrefFor && <LangSwitch lang={lang} label={ui.language} hrefFor={hrefFor} />}
        <a className="pill-btn head-cta" href={APP}>{ui.openTools}</a>
      </header>
      {crumbs.length > 1 && (
        <nav className="crumbs" aria-label={ui.breadcrumb}>
          <ol>
            {crumbs.map((c, i) => (
              <li key={c.name}>
                {c.href && i < crumbs.length - 1 ? <a href={c.href}>{c.name}</a> : <span aria-current="page">{c.name}</span>}
              </li>
            ))}
          </ol>
        </nav>
      )}
      {children}
      <SiteFooter lang={lang} />
    </div>
  );
}

/** Footer with links to every guide and the legal pages. Also used on the landing page. */
export function SiteFooter({ lang = DEFAULT_LANG, tagline, disclaimer, openLabel }: { lang?: string; tagline?: ReactNode; disclaimer?: ReactNode; openLabel?: string }) {
  const ui = pagesUi(lang);
  const guides = guidesIn(lang);
  const group = (kind: Guide['kind']) => guides.filter((g) => g.kind === kind);
  const cols: [Guide['kind'], string][] = [
    ['synthid', ui.footer.synthidGuides],
    ['privacy', ui.footer.privacyGuides],
    ['download', ui.footer.downloadGuides],
  ];
  return (
    <footer className="site-foot">
      <div className="foot-cols">
        <div>
          <p className="foot-brand"><b>{SITE_NAME}</b></p>
          <p>{tagline ?? ui.footer.tagline}</p>
          <p><a href={APP}>{openLabel ?? ui.footer.open}</a></p>
        </div>
        {cols.map(([kind, title]) => (
          <nav key={kind} aria-label={title}>
            <h2>{title}</h2>
            <ul>{group(kind).map((g) => <li key={g.slug}><a href={guidePath(g.slug, lang)}>{fill(g.short)}</a></li>)}</ul>
          </nav>
        ))}
        <nav aria-label={SITE_NAME}>
          <h2>{SITE_NAME}</h2>
          <ul>
            <li><a href={`${langPrefix(lang)}/guides/`}>{ui.footer.allGuides}</a></li>
            <li><a href="/privacy/">{ui.footer.privacyPolicy}</a></li>
            <li><a href="/terms/">{ui.footer.terms}</a></li>
          </ul>
        </nav>
      </div>
      <p className="foot-fine">{disclaimer ?? fill(ui.footer.disclaimer)}</p>
    </footer>
  );
}

// A small, quiet "Stripe" mark next to the billing line: a trust cue.
export const StripeBadge = ({ label }: { label: string }) => (
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

/**
 * The highlighted $2 strip pack, styled like the one on the home page. Shown
 * near the top of every guide and content page, and again in the plans promo.
 */
export function PackCard({ lang, top }: { lang: string; top?: boolean }) {
  const p = getDict(lang).pricing;
  return (
    <div className={`price-pack${top ? ' pack-top' : ''}`}>
      <span className="price-pack-badge">{p.pack.badge}</span>
      <div>
        <p className="price-name">{p.pack.name}</p>
        <p className="price-pack-text">{p.pack.text}</p>
      </div>
      <p className="price-tag"><b>{PRICES.pack}</b> {p.pack.once}</p>
      <a className="cta" href={`${APP}#strip`}>{p.pack.cta}</a>
    </div>
  );
}

/**
 * The plans promo (the $2 strip pack, Basic and Pro) shown on every guide and
 * content page. Copy comes from the landing page's pricing strings, so it
 * matches the pricing section in every language.
 */
export function PlansPromo({ lang }: { lang: string }) {
  const ui = pagesUi(lang);
  const p = getDict(lang).pricing;
  return (
    <aside className="card promo" aria-labelledby="promo-h">
      <p className="eyebrow">{ui.promo.eyebrow}</p>
      <h2 id="promo-h" className="display xs"><Pair p={[fill(ui.promo.title[0]), fill(ui.promo.title[1])]} /></h2>
      <p className="lede">{fill(ui.promo.text)}</p>
      <PackCard lang={lang} />
      <div className="price-plans">
        {(['basic', 'pro'] as const).map((id) => {
          const plan = p[id];
          return (
            <div key={id} className={`price${id === 'pro' ? ' price-best' : ''}`}>
              <p className="price-name">
                {plan.name}
                {'badge' in plan && plan.badge && <span className="price-badge">{plan.badge}</span>}
              </p>
              <p className="price-tag"><b>{PRICES[id]}</b> {p.perMonth}</p>
              <p className="promo-year">
                {ui.promo.orYearly.replace('{price}', YEARLY_PRICES[id])} <span className="price-save">{p.yearlySave}</span>
              </p>
              <ul className="price-list">
                {plan.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <a className={id === 'pro' ? 'cta' : 'cta ghost'} href={APP}>{p.cta}</a>
            </div>
          );
        })}
      </div>
      <p className="price-foot">
        {p.billing}
        <StripeBadge label={p.stripeLabel} />
        <a className="promo-more" href={`${langPath(lang)}#pricing`}>{ui.promo.seePlans}</a>
      </p>
    </aside>
  );
}

const guideHrefs = (g: Guide) => (code: string) => (localGuide(g, code) ? guidePath(g.slug, code) : undefined);

export function GuidePage({ guide: g, lang = DEFAULT_LANG }: { guide: Guide; lang?: string }) {
  const ui = pagesUi(lang);
  const related = g.related
    .map(guideBySlug)
    .map((r) => r && localGuide(r, lang))
    .filter((r): r is Guide => Boolean(r));
  const showToc = g.sections.length >= 4;
  return (
    <Shell
      lang={lang}
      hrefFor={guideHrefs(g)}
      crumbs={[{ name: ui.home, href: langPath(lang) }, { name: ui.guides, href: `${langPrefix(lang)}/guides/` }, { name: fill(g.short) }]}
    >
      <article className="card doc" lang={lang}>
        <div className="doc-top">
          <ToolIcon tool={g.tool} size={56} />
          <div>
            <p className="eyebrow">{ui.kind[g.kind]}</p>
            <h1 className="display sm">{fill(g.title)}</h1>
            <p className="doc-date">{ui.updated} <time dateTime={g.updated}>{longDate(g.updated, ui.locale)}</time></p>
          </div>
        </div>
        {g.intro.map((p) => <p key={p} className="lede doc-lede"><Rich s={p} lang={lang} /></p>)}
        <PackCard lang={lang} top />

        {showToc && (
          <nav className="toc" aria-label={ui.contents}>
            <ol>
              {g.sections.map((s) => <li key={s.h}><a href={`#${slugify(s.h)}`}>{fill(s.h)}</a></li>)}
              {g.faq.length > 0 && <li><a href="#faq">{ui.questions}</a></li>}
            </ol>
          </nav>
        )}

        {/* Explainers lead with the content and put the how-to after it. */}
        {!g.explainer && <Steps g={g} lang={lang} />}

        <div className="doc-body">
          <Sections sections={g.sections} lang={lang} />
        </div>

        {g.explainer && <Steps g={g} lang={lang} />}

        {g.faq.length > 0 && (
          <div className="doc-body">
            <section aria-labelledby="faq">
              <h2 id="faq">{ui.questions}</h2>
              <div className="faq">
                {g.faq.map((f) => (
                  <details key={f.q}>
                    <summary><h3>{fill(f.q)}</h3></summary>
                    <p><Rich s={f.a} lang={lang} /></p>
                  </details>
                ))}
              </div>
            </section>
          </div>
        )}
      </article>

      <PlansPromo lang={lang} />

      {related.length > 0 && (
        <nav className="card doc-related" aria-labelledby="related">
          <h2 id="related" className="display xs">{ui.related}</h2>
          <ul className="guide-list">
            {related.map((r) => <GuideCard key={r.slug} g={r} lang={lang} />)}
          </ul>
        </nav>
      )}
    </Shell>
  );
}

function Steps({ g, lang }: { g: Guide; lang: string }) {
  const ui = pagesUi(lang);
  return (
    <section className="doc-steps" aria-labelledby="steps">
      <h2 id="steps">{fill(g.stepsTitle ?? ui.stepsTitle)}</h2>
      <ol className="steps">
        {g.steps.map((s) => (
          <li key={s.name}><b>{fill(s.name)}</b> <Rich s={s.text} lang={lang} /></li>
        ))}
      </ol>
      <a className="cta" href={`${APP}#${g.tool}`}>{fill(g.cta)}</a>
    </section>
  );
}

function GuideCard({ g, lang }: { g: Guide; lang: string }) {
  return (
    <li>
      <a href={guidePath(g.slug, lang)}>
        <ToolIcon tool={g.tool} size={36} />
        <span>
          <b>{fill(g.title)}</b>
          <span>{fill(g.description)}</span>
        </span>
      </a>
    </li>
  );
}

export function GuidesIndex({ lang = DEFAULT_LANG }: { lang?: string }) {
  const ui = pagesUi(lang);
  const guides = guidesIn(lang);
  const kinds: Guide['kind'][] = ['synthid', 'privacy', 'download'];
  return (
    <Shell
      lang={lang}
      hrefFor={(code) => (PAGE_LANGS.includes(code) ? `${langPrefix(code)}/guides/` : undefined)}
      crumbs={[{ name: ui.home, href: langPath(lang) }, { name: ui.guides }]}
    >
      <section className="card doc" lang={lang}>
        <h1 className="display sm"><Pair p={[fill(ui.index.title[0]), fill(ui.index.title[1])]} /></h1>
        <p className="lede">{fill(ui.index.lede)}</p>
        <PackCard lang={lang} top />
      </section>
      {kinds.map((kind) => (
        <section key={kind} className="card" aria-labelledby={`g-${kind}`}>
          <h2 id={`g-${kind}`} className="display xs">{ui.index.groups[kind].title}</h2>
          <p className="lede">{fill(ui.index.groups[kind].text)}</p>
          <ul className="guide-list">
            {guides.filter((g) => g.kind === kind).map((g) => <GuideCard key={g.slug} g={g} lang={lang} />)}
          </ul>
        </section>
      ))}
      <PlansPromo lang={lang} />
    </Shell>
  );
}

export function LegalPage({ doc }: { doc: LegalDoc }) {
  const lang = DEFAULT_LANG;
  return (
    <Shell lang={lang} crumbs={[{ name: pagesUi(lang).home, href: '/' }, { name: doc.title }]}>
      <article className="card doc legal">
        <h1 className="display sm">{doc.title}</h1>
        <p className="doc-date">Last updated <time dateTime={doc.updated}>{longDate(doc.updated, 'en-US')}</time></p>
        {doc.intro.map((p) => <p key={p} className="lede doc-lede"><Rich s={p} /></p>)}
        <PackCard lang={lang} top />
        <nav className="toc" aria-label="Contents">
          <ol>{doc.sections.map((s) => <li key={s.h}><a href={`#${slugify(s.h)}`}>{fill(s.h).replace(/^\d+\.\s*/, '')}</a></li>)}</ol>
        </nav>
        <div className="doc-body">
          <Sections sections={doc.sections} lang={lang} />
        </div>
      </article>
      <PlansPromo lang={lang} />
    </Shell>
  );
}
