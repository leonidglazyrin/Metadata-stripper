import { useEffect, useRef, useState } from 'react';
import { TOOLS, toolById, type ToolId } from './tools';
import { load, save } from './lib/storage';
import { ToolIcon } from './components/Icons';
import StripTool from './components/StripTool';
import DownloadTool from './components/DownloadTool';
import { AccountBar, AccountNotice, PaywallDialog, SignInGate, ToolSignIn, UpgradeBanner, useToolAccess } from './components/Account';
import { initAccount } from './lib/account';

function initialTool(): ToolId {
  const fromHash = toolById(location.hash.slice(1));
  if (fromHash) return fromHash.id;
  return toolById(load('tool', 'strip'))?.id ?? 'strip';
}

export default function App() {
  const [active, setActive] = useState<ToolId>(initialTool);
  // Signed out: the tool area is a sign-in card, with no drop zone or link
  // field until sign-in. Pending: the account check hasn't answered yet.
  const access = useToolAccess();

  useEffect(() => {
    void initAccount();
  }, []);

  // On a phone the tabs scroll sideways: keep the open one in view.
  const tabs = useRef<HTMLElement>(null);
  useEffect(() => {
    const bar = tabs.current;
    const chip = document.getElementById(`chip-${active}`);
    if (!bar || !chip || bar.scrollWidth <= bar.clientWidth) return;
    const left = chip.offsetLeft; // .tabs is position: relative
    if (left < bar.scrollLeft || left + chip.offsetWidth > bar.scrollLeft + bar.clientWidth) {
      bar.scrollTo({ left: left - 12, behavior: 'smooth' });
    }
  }, [active]);

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
      {/* The app's only chrome: home, the tools and the account. No pitch here;
          lower plans get one slim banner under it, Pro gets nothing. */}
      <header className="topbar">
        <Wordmark />
        <nav className="tabs" ref={tabs} role="tablist" aria-label="Tools">
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
              <ToolIcon tool={t.id} size={22} />
              {t.chip}
            </button>
          ))}
        </nav>
        <div className="topbar-acct">
          <AccountBar />
        </div>
      </header>
      <AccountNotice />
      <UpgradeBanner downloads={active !== 'strip'} />

      {TOOLS.map((t) => (
        // All tools stay mounted so switching chips never drops work in flight.
        <section
          key={t.id}
          id={`panel-${t.id}`}
          role="tabpanel"
          aria-labelledby={`chip-${t.id}`}
          className="card tool"
          hidden={t.id !== active}
          // Until sign-in, a file dropped on the tool must not open in the
          // browser tab. It is never read or sent.
          onDragOver={access !== 'open' ? (e) => e.preventDefault() : undefined}
          onDrop={access !== 'open' ? (e) => e.preventDefault() : undefined}
        >
          <div className="tool-head">
            <ToolIcon tool={t.id} size={44} />
            <div>
              <h1 className="tool-title">
                {t.title[0]} <span className="accent">{t.title[1]}</span>
              </h1>
              <p className="lede">{t.blurb}</p>
            </div>
          </div>

          {access === 'open' ? (
            t.id === 'strip' ? <StripTool /> : <DownloadTool tool={t} />
          ) : access === 'signin' ? (
            <ToolSignIn downloads={t.id !== 'strip'} toolName={t.chip} />
          ) : (
            <div className="tool-pending" aria-busy="true" />
          )}
        </section>
      ))}

      <SignInGate downloads={active !== 'strip'} />

      <PaywallDialog />

      <footer className="foot">
        <p>
          <b>Private by default:</b> files are processed and deleted right away. Nothing is stored.
        </p>
        <p>
          Only download content you own or have permission to use. Downloading may break a platform&rsquo;s terms of service.
        </p>
        <p>
          <a href="/guides/what-is-synthid/">What is SynthID?</a> · <a href="/guides/">All guides</a>
        </p>
      </footer>
    </div>
  );
}

function Wordmark() {
  return (
    <a className="wordmark" href="/" aria-label="SynthIDStripper home" title="Home">
      SynthIDStripper
    </a>
  );
}
