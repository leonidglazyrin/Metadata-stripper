// The public landing page. It is rendered to static HTML at build time
// (see vite.config.mts) and ships with no JavaScript, so it loads fast and
// search engines see the full text.

import type { ReactNode } from 'react';
import { HeroArt, Tile, ToolIcon } from '../components/Icons';
import { AI_SOURCES, DOWNLOADER_FAQ, FAQ, SITE_NAME, type Faq } from './content';

const APP = '/app/';

export default function Landing({ siteUrl }: { siteUrl: string }) {
  return (
    <>
      <div className="page">
        <section className="card hero" aria-labelledby="top">
          <header className="card-head">
            <a className="wordmark" href="/" aria-label={`${SITE_NAME} home`}>
              sharona
            </a>
            <nav className="nav" aria-label="Main">
              <NavLinks />
            </nav>
            <a className="pill-btn head-cta" href={APP}>Open tools</a>
            {/* Mobile: the links fold into a burger menu. <details> needs no JS. */}
            <details className="menu">
              <summary aria-label="Menu">
                <span className="burger" aria-hidden="true"><i /><i /><i /></span>
              </summary>
              <nav className="menu-panel" aria-label="Main (mobile)">
                <NavLinks />
              </nav>
            </details>
          </header>

          <div className="hero-body">
            <div className="hero-copy">
              <p className="eyebrow">Remove SynthID &amp; metadata from AI videos and photos</p>
              <h1 id="top" className="display">
                SynthID Stripper <span className="accent">&amp; Metadata Remover.</span>
              </h1>
              <p className="lede">
                Drop in a video or photo from Google Veo, Gemini, Sora, ChatGPT, Higgsfield or any other AI generator.
                Download a copy with EXIF, GPS and C2PA Content Credentials removed and the SynthID watermark disrupted.
                It runs on our server or in your browser.
              </p>
              <div className="cta-row">
                <a className="cta" href={`${APP}#strip`}>Strip a file</a>
                <a className="cta ghost" href={`${APP}#youtube`}>Download a video</a>
              </div>
              <ul className="chips" aria-label="Tools">
                <ToolChip href="#strip" tool="strip">SynthID &amp; metadata</ToolChip>
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
          <SectionHead icon={<ToolIcon tool="strip" size={56} />} id="synthid-h" title={['Remove SynthID from AI videos', 'and keep the look.']}>
            SynthID is an invisible watermark Google adds to the pixels of images and videos made with Veo, Gemini and
            Imagen. Sharona changes those pixels slightly to weaken the pattern, and the file looks and plays the same.
          </SectionHead>
          <div className="sources">
            <h3>Clean files from</h3>
            <ul className="tags" aria-label="AI generators">
              {AI_SOURCES.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <div className="grid3">
            <Feature title="Photos">
              A slight resample and sharpen changes every pixel, then the image is saved again at high quality.
            </Feature>
            <Feature title="Videos">
              A high-quality re-encode (CRF 18) with a light blur, a matching sharpen and a little noise between frames.
            </Feature>
            <Feature title="No guarantees">
              SynthID is built to survive edits, so no tool can promise a detector will miss it. Sharona weakens the
              watermark; it can’t guarantee it’s gone, or that a platform won’t label the file as AI.
            </Feature>
          </div>
          <div className="card-cta">
            <a className="cta" href={`${APP}#strip`}>Open the SynthID stripper</a>
          </div>
        </section>

        <section id="metadata" className="card" aria-labelledby="metadata-h">
          <SectionHead icon={<Tile from="#60a5fa" to="#1d4ed8" size={56}><PhotoGlyph /></Tile>} id="metadata-h" title={['Metadata Remover', 'for photos and videos.']}>
            Photos and videos store where they were taken, the device, its serial number and the editing history.
            The metadata remover deletes all of it, strips the <b className="synth-mark">SynthID</b> watermark, and
            lists what it removed.
          </SectionHead>
          <div className="split">
            <div>
              <h3>Removed from photos</h3>
              <ul className="tags">
                <li className="tag-hi">SynthID watermark</li>
                {['EXIF', 'GPS location', 'XMP', 'IPTC', 'ICC profiles', 'C2PA / Content Credentials', 'Maker notes', 'Thumbnails', 'Text comments'].map((t) => <li key={t}>{t}</li>)}
              </ul>
              <p className="small">JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF, GIF. HEIC comes back as JPEG.</p>
            </div>
            <div>
              <h3>Removed from videos</h3>
              <ul className="tags">
                <li className="tag-hi">SynthID watermark</li>
                {['Global & stream tags', 'Chapter tags', 'GPS & telemetry tracks', 'Timecode', 'Cover art', 'C2PA boxes', 'Encoder strings'].map((t) => <li key={t}>{t}</li>)}
              </ul>
              <p className="small">MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV, FLV. Streams are copied without re-encoding.</p>
            </div>
          </div>
        </section>

        <section id="downloaders" className="dl-grid" aria-label="Video downloaders">
          <Downloader
            tool="youtube"
            title={['YouTube', 'Downloader']}
            text="Paste YouTube video or Shorts links. Get an MP4 up to 1080p, or the audio as M4A."
          />
          <Downloader
            tool="x"
            title={['X', 'Downloader']}
            text="Paste an x.com or twitter.com post link and get the video from that post as MP4."
          />
          <Downloader
            tool="tiktok"
            title={['TikTok', 'Downloader']}
            text="Paste tiktok.com links, including vm. and vt. short links. Get the video as MP4 or the sound as M4A."
          />
          <Downloader
            tool="instagram"
            title={['Instagram', 'Downloader']}
            text="Paste a Reel or video post link. Public posts work; private ones need a logged-in session."
          />
        </section>

        <section className="card" aria-labelledby="how-h">
          <h2 id="how-h" className="display sm">
            How to remove SynthID <span className="accent">and metadata.</span>
          </h2>
          <ProcessAnimation />
          <ol className="steps flow-steps">
            <li><b>Upload your file.</b> AI videos or photos, as many as you like. Server or this device.</li>
            <li><b>Sharona strips it.</b> EXIF, GPS and C2PA tags are removed and the SynthID watermark is weakened.</li>
            <li><b>Download the clean copy.</b> Each file lists what was removed.</li>
          </ol>
          <a className="cta" href={`${APP}#strip`}>Open the SynthID stripper</a>
        </section>

        <section id="pricing" className="card" aria-labelledby="pricing-h">
          <h2 id="pricing-h" className="display sm">
            One plan. <span className="accent">$20 a month.</span>
          </h2>
          <div className="price">
            <div>
              <p className="price-tag"><b>$20</b> / month</p>
              <ul className="price-list">
                <li><span className="synth-mark">SynthID</span> stripper and metadata remover</li>
                <li>YouTube, X, TikTok and Instagram downloaders</li>
                <li>Photos and videos in every common format</li>
              </ul>
            </div>
            <div className="price-side">
              <p className="stripe-line">
                <StripeBadge />
                Billed monthly through Stripe. Cancel anytime.
              </p>
              <a className="cta" href={APP}>Open the tools</a>
            </div>
          </div>
        </section>

        <FaqSection id="faq" title={['SynthID stripping', 'FAQ.']} items={FAQ} />
        <FaqSection id="downloaders-faq" title={['Downloaders', 'FAQ.']} items={DOWNLOADER_FAQ} />

        <footer className="foot">
          <p>
            <b>{SITE_NAME}</b> · SynthID stripper, metadata remover, and YouTube, X, TikTok and Instagram downloaders.{' '}
            <a href={APP}>Open the tools</a>
          </p>
          <p>
            Only process and download content you own or have permission to use, and label AI-generated content where
            the rules require it. {SITE_NAME} is not affiliated with Google, YouTube, TikTok, X or Instagram.
          </p>
        </footer>

        <aside className="badges" aria-label="Featured on">
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(siteUrl) }} />
    </>
  );
}

function NavLinks() {
  return (
    <>
      <a href="#synthid">SynthID</a>
      <a href="#metadata">Metadata</a>
      <a href="#downloaders">Downloaders</a>
      <a href="#pricing">Pricing</a>
      <a href="#faq">FAQ</a>
    </>
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
          {title[0]} <span className="accent">{title[1]}</span>
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
        {title[0]} <span className="accent">{title[1]}</span>
      </h2>
      <div className="faq">
        {items.map((f) => (
          <details key={f.q}>
            <summary><h3>{f.q}</h3></summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Downloader({ tool, title, text }: { tool: 'youtube' | 'x' | 'tiktok' | 'instagram'; title: [string, string]; text: string }) {
  const href = `${APP}#${tool}`;
  return (
    <div className="card dl" aria-labelledby={`${tool}-h`}>
      <ToolIcon tool={tool} size={56} />
      <h2 id={`${tool}-h`} className="display xs">
        {title[0]} <span className="accent">{title[1]}</span>
      </h2>
      <p>{text}</p>
      <a className="cta" href={href}>Open the {title.join(' ')}</a>
    </div>
  );
}

// A CSS-only loop of the three steps: a file is uploaded, its tags are
// stripped while a scan line weakens the watermark pattern, and a clean copy
// is offered for download. The base styles are the finished state, so with
// reduced motion (which turns animations off) it shows the end result.
function ProcessAnimation() {
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
            <span className="s1">Uploading…</span>
            <span className="s2">Removing metadata · weakening SynthID…</span>
            <span className="s3">Clean · 4 items removed</span>
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
          Download
        </span>
      </div>
    </div>
  );
}

const PhotoGlyph = () => (
  <g>
    <circle cx="25" cy="25" r="5" fill="#ffd34d" />
    <path d="M14 46 27 32l8 8 6-6 9 12z" fill="#fff" />
  </g>
);

// Stripe's "S" mark in its brand colour, with the name beside it.
const StripeBadge = () => (
  <span className="stripe-badge" aria-label="Payments by Stripe">
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#fff"
        d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"
      />
    </svg>
    <span>Stripe</span>
  </span>
);

function jsonLd(siteUrl: string) {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: `${SITE_NAME}: SynthID Stripper & Metadata Remover`,
        alternateName: ['SynthID Remover', 'SynthID Remover for AI Videos', 'Metadata Remover', 'YouTube Downloader', 'X Video Downloader', 'TikTok Downloader', 'Instagram Downloader'],
        url: `${siteUrl}/`,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any (web browser)',
        browserRequirements: 'Requires a modern web browser with JavaScript.',
        description:
          'Remove EXIF, GPS, XMP, IPTC and C2PA metadata from AI videos and photos (Google Veo, Gemini, Sora, ChatGPT, Higgsfield and more) and disrupt SynthID watermarks, on a server or on your device. Results are not guaranteed. Includes YouTube, TikTok, X and Instagram downloaders.',
        keywords: 'remove SynthID, SynthID remover, remove SynthID from AI videos, SynthID stripper, remove C2PA, metadata remover, Veo, Gemini, Sora, ChatGPT, Higgsfield',
        featureList: [
          'SynthID stripping for photos and videos',
          'Metadata remover for EXIF, GPS, XMP, IPTC, ICC and C2PA',
          'On-device processing option',
          'YouTube downloader (MP4 up to 1080p or M4A audio)',
          'TikTok downloader',
          'X and Instagram video downloaders',
        ],
        offers: {
          '@type': 'Offer',
          price: '20.00',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '20.00',
            priceCurrency: 'USD',
            unitCode: 'MON',
            referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
          },
        },
      },
      {
        '@type': 'FAQPage',
        // Google expects one FAQPage per page, so both lists go in it.
        mainEntity: [...FAQ, ...DOWNLOADER_FAQ].map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
  // Keep "</script>" and friends from ending the tag early.
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
