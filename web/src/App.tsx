import { useEffect, useState } from 'react';
import { TOOLS, toolById, type ToolId } from './tools';
import { load, save } from './lib/storage';
import { HeroArt, ToolIcon } from './components/Icons';
import StripTool from './components/StripTool';
import DownloadTool from './components/DownloadTool';
import { AccountBar, AccountNotice, PaywallDialog } from './components/Account';
import { initAccount } from './lib/account';

function initialTool(): ToolId {
  const fromHash = toolById(location.hash.slice(1));
  if (fromHash) return fromHash.id;
  return toolById(load('tool', 'strip'))?.id ?? 'strip';
}

export default function App() {
  const [active, setActive] = useState<ToolId>(initialTool);

  useEffect(() => {
    void initAccount();
  }, []);

  useEffect(() => {
    save('tool', active);
    history.replaceState(null, '', `#${active}`);
  }, [active]);

  useEffect(() => {
    const onHash = () => {
      const t = toolById(location.hash.slice(1));
      if (t) setActive(t.id);
    };
    addEventListener('hashchange', onHash);
    return () => removeEventListener('hashchange', onHash);
  }, []);

  const onChipKey = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    const next = TOOLS[(i + d + TOOLS.length) % TOOLS.length];
    setActive(next.id);
    document.getElementById(`chip-${next.id}`)?.focus();
  };

  return (
    <div className="page">
      <section className="card hero">
        <header className="card-head">
          <Wordmark />
          <AccountBar />
        </header>
        <AccountNotice />

        <div className="hero-body">
          <div className="hero-copy">
            <h1 className="display">
              Clean files. <span className="accent">Save clips.</span> Post&nbsp;faster.
            </h1>
            <p className="lede">Strip SynthID watermarks and hidden metadata from your photos and videos, and grab clips from YouTube, X, Instagram and TikTok.</p>

            <div className="chips" role="tablist" aria-label="Tools">
              {TOOLS.map((t, i) => (
                <button
                  key={t.id}
                  id={`chip-${t.id}`}
                  type="button"
                  role="tab"
                  className="chip"
                  aria-selected={t.id === active}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={t.id === active ? 0 : -1}
                  onClick={() => setActive(t.id)}
                  onKeyDown={(e) => onChipKey(e, i)}
                >
                  <ToolIcon tool={t.id} size={24} />
                  {t.chip}
                </button>
              ))}
            </div>
          </div>
          <HeroArt />
        </div>
      </section>

      {TOOLS.map((t) => (
        // All tools stay mounted so switching chips never drops work in flight.
        <section
          key={t.id}
          id={`panel-${t.id}`}
          role="tabpanel"
          aria-labelledby={`chip-${t.id}`}
          className="card tool"
          hidden={t.id !== active}
        >
          <div className="tool-head">
            <ToolIcon tool={t.id} size={56} />
            <div>
              <h2 className="display sm">
                {t.title[0]} <span className="accent">{t.title[1]}</span>
              </h2>
              <p className="lede">{t.blurb}</p>
            </div>
          </div>

          {t.id === 'strip' ? <StripTool /> : <DownloadTool tool={t} />}
        </section>
      ))}

      <PaywallDialog />

      <footer className="foot">
        <p>
          <b>Private by default:</b> files are processed and deleted right away. Nothing is stored.
        </p>
        <p>
          Only download content you own or have permission to use. Downloading may break a platform&rsquo;s terms of service.
        </p>
      </footer>
    </div>
  );
}

function Wordmark() {
  return (
    <a className="wordmark" href="/" aria-label="Sharona home">
      sharona
    </a>
  );
}
