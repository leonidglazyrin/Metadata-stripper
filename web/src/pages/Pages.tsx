// Static content pages: guides, the guides index, and the legal pages. Like
// the landing page they are rendered to HTML at build time and ship with no
// JavaScript. English only for now.

import type { ReactNode } from 'react';
import { ToolIcon } from '../components/Icons';
import { SITE_NAME } from '../landing/content';
import { GUIDES, guideBySlug, guidePath, type Block, type Guide, type Section } from './guides';
import type { LegalDoc } from './legal';

const APP = '/app/';

export const fill = (s: string) => s.replaceAll('{site}', SITE_NAME);

/** Inline markup: `code`, **bold** and [text](href). */
export function Rich({ s }: { s: string }) {
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
        <a key={m.index} href={m[4]} {...(external ? { rel: 'noopener', target: '_blank' } : {})}>
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

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if ('p' in b) return <p key={i}><Rich s={b.p} /></p>;
        if ('note' in b) return <p key={i} className="doc-note"><Rich s={b.note} /></p>;
        if ('code' in b) return <pre key={i}><code>{b.code}</code></pre>;
        const items = 'ul' in b ? b.ul : b.ol;
        const List = 'ul' in b ? 'ul' : 'ol';
        return <List key={i}>{items.map((it) => <li key={it}><Rich s={it} /></li>)}</List>;
      })}
    </>
  );
}

function Sections({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((s) => (
        <section key={s.h} aria-labelledby={slugify(s.h)}>
          <h2 id={slugify(s.h)}>{fill(s.h)}</h2>
          <Blocks blocks={s.blocks} />
        </section>
      ))}
    </>
  );
}

const slugify = (s: string) => fill(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const longDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

/** Header and footer shared by every content page. */
export function Shell({ crumbs, children }: { crumbs: { name: string; href?: string }[]; children: ReactNode }) {
  return (
    <div className="page doc-page">
      <header className="card doc-head">
        <a className="wordmark" href="/" aria-label={`${SITE_NAME} home`}>sharona</a>
        <nav className="nav" aria-label="Main">
          <a href="/guides/">Guides</a>
          <a href="/#pricing">Pricing</a>
        </nav>
        <a className="pill-btn head-cta" href={APP}>Open tools</a>
      </header>
      {crumbs.length > 1 && (
        <nav className="crumbs" aria-label="Breadcrumb">
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
      <SiteFooter />
    </div>
  );
}

/** Footer with links to every guide and the legal pages. Also used on the landing page. */
export function SiteFooter({ tagline, disclaimer, openLabel = 'Open the tools' }: { tagline?: ReactNode; disclaimer?: ReactNode; openLabel?: string }) {
  const group = (kind: Guide['kind']) => GUIDES.filter((g) => g.kind === kind);
  return (
    <footer className="site-foot">
      <div className="foot-cols">
        <div>
          <p className="foot-brand"><b>{SITE_NAME}</b></p>
          <p>{tagline ?? 'Metadata, C2PA and SynthID remover, plus YouTube, TikTok, X and Instagram downloaders.'}</p>
          <p><a href={APP}>{openLabel}</a></p>
        </div>
        <nav aria-label="Privacy guides">
          <h2>Privacy guides</h2>
          <ul>{group('privacy').map((g) => <li key={g.slug}><a href={guidePath(g.slug)}>{g.short}</a></li>)}</ul>
        </nav>
        <nav aria-label="Download guides">
          <h2>Download guides</h2>
          <ul>{group('download').map((g) => <li key={g.slug}><a href={guidePath(g.slug)}>{g.short}</a></li>)}</ul>
        </nav>
        <nav aria-label="Legal">
          <h2>{SITE_NAME}</h2>
          <ul>
            <li><a href="/guides/">All guides</a></li>
            <li><a href="/privacy/">Privacy Policy</a></li>
            <li><a href="/terms/">Terms of Service</a></li>
          </ul>
        </nav>
      </div>
      <p className="foot-fine">
        {disclaimer ??
          `Only process and download content you own or have permission to use, and label AI-generated content where the rules require it. ${SITE_NAME} is not affiliated with Google, YouTube, TikTok, X, Instagram or Meta.`}
      </p>
    </footer>
  );
}

export function GuidePage({ guide: g }: { guide: Guide }) {
  const related = g.related.map(guideBySlug).filter((r): r is Guide => Boolean(r));
  return (
    <Shell crumbs={[{ name: 'Home', href: '/' }, { name: 'Guides', href: '/guides/' }, { name: g.short }]}>
      <article className="card doc">
        <div className="doc-top">
          <ToolIcon tool={g.tool} size={56} />
          <div>
            <p className="eyebrow">{g.kind === 'download' ? 'Download guide' : 'Privacy guide'}</p>
            <h1 className="display sm">{fill(g.title)}</h1>
            <p className="doc-date">Updated <time dateTime={g.updated}>{longDate(g.updated)}</time></p>
          </div>
        </div>
        {g.intro.map((p) => <p key={p} className="lede doc-lede"><Rich s={p} /></p>)}

        <section className="doc-steps" aria-labelledby="steps">
          <h2 id="steps">Step by step with {SITE_NAME}</h2>
          <ol className="steps">
            {g.steps.map((s) => (
              <li key={s.name}><b>{fill(s.name)}</b> <Rich s={s.text} /></li>
            ))}
          </ol>
          <a className="cta" href={`${APP}#${g.tool}`}>{g.cta}</a>
        </section>

        <div className="doc-body">
          <Sections sections={g.sections} />
          {g.faq.length > 0 && (
            <section aria-labelledby="faq">
              <h2 id="faq">Questions</h2>
              <div className="faq">
                {g.faq.map((f) => (
                  <details key={f.q}>
                    <summary><h3>{fill(f.q)}</h3></summary>
                    <p><Rich s={f.a} /></p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <nav className="card doc-related" aria-labelledby="related">
          <h2 id="related" className="display xs">Related guides</h2>
          <ul className="guide-list">
            {related.map((r) => <GuideCard key={r.slug} g={r} />)}
          </ul>
        </nav>
      )}
    </Shell>
  );
}

function GuideCard({ g }: { g: Guide }) {
  return (
    <li>
      <a href={guidePath(g.slug)}>
        <ToolIcon tool={g.tool} size={36} />
        <span>
          <b>{fill(g.title)}</b>
          <span>{fill(g.description)}</span>
        </span>
      </a>
    </li>
  );
}

export function GuidesIndex() {
  const groups: [Guide['kind'], string, string][] = [
    ['privacy', 'Privacy and metadata', 'Remove the hidden data in photos and videos: location, device details, dates, editing history and C2PA Content Credentials.'],
    ['download', 'Video downloads', 'Save public videos from YouTube, TikTok, X and Instagram as MP4, or keep only the sound as M4A.'],
  ];
  return (
    <Shell crumbs={[{ name: 'Home', href: '/' }, { name: 'Guides' }]}>
      <section className="card doc">
        <h1 className="display sm">{SITE_NAME} <span className="accent">guides.</span></h1>
        <p className="lede">Step-by-step guides for cleaning metadata out of your files and downloading videos, with the built-in options on your phone or computer and the {SITE_NAME} tools.</p>
      </section>
      {groups.map(([kind, title, text]) => (
        <section key={kind} className="card" aria-labelledby={`g-${kind}`}>
          <h2 id={`g-${kind}`} className="display xs">{title}</h2>
          <p className="lede">{text}</p>
          <ul className="guide-list">
            {GUIDES.filter((g) => g.kind === kind).map((g) => <GuideCard key={g.slug} g={g} />)}
          </ul>
        </section>
      ))}
    </Shell>
  );
}

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <Shell crumbs={[{ name: 'Home', href: '/' }, { name: doc.title }]}>
      <article className="card doc legal">
        <h1 className="display sm">{doc.title}</h1>
        <p className="doc-date">Last updated <time dateTime={doc.updated}>{longDate(doc.updated)}</time></p>
        {doc.intro.map((p) => <p key={p} className="lede doc-lede"><Rich s={p} /></p>)}
        <nav className="toc" aria-label="Contents">
          <ol>{doc.sections.map((s) => <li key={s.h}><a href={`#${slugify(s.h)}`}>{fill(s.h).replace(/^\d+\.\s*/, '')}</a></li>)}</ol>
        </nav>
        <div className="doc-body">
          <Sections sections={doc.sections} />
        </div>
      </article>
    </Shell>
  );
}
