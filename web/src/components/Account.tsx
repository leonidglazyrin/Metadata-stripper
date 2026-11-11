import { useEffect, useRef, useState } from 'react';
import {
  buyStripPack,
  closePaywall,
  openBillingPortal,
  openPaywall,
  remaining,
  setNotice,
  signIn,
  signOut,
  startCheckout,
  stripCredits,
  useAccountState,
  type Account,
  type Kind,
  type Plan,
  type PlanId,
} from '../lib/account';

export function GoogleLogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

/** Small "Secure payments by Stripe" line: Stripe's mark (simple-icons, CC0) and name. */
export function StripeBadge() {
  return (
    <span className="stripe-badge">
      <span>Secure payments by</span>
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" className="stripe-mark">
        <rect width="24" height="24" rx="5" fill="#635BFF" />
        <path
          fill="#fff"
          transform="translate(4.2 4.2) scale(0.65)"
          d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"
        />
      </svg>
      <b className="stripe-word">Stripe</b>
    </span>
  );
}

const SHORT: Record<Kind, string> = { strip: 'on-device', server_strip: 'server', download: 'download' };
const left = (a: Account, k: Kind) => {
  const n = remaining(a, k);
  return n == null ? null : `${n} ${SHORT[k]} left`;
};

/** "12 pack strips", or null with none left. */
const packLeft = (a: Account) => {
  const c = stripCredits(a);
  return c ? `${c} pack strip${c === 1 ? '' : 's'}` : null;
};

function usageLine(a: Account) {
  if (a.plan === 'pro') return 'Pro · unlimited';
  const parts = [...(['strip', 'server_strip', 'download'] as const).map((k) => left(a, k)), a.plan === 'free' ? packLeft(a) : null].filter(Boolean);
  return a.plan === 'basic' ? ['Basic · unlimited on-device', ...parts].join(' · ') : parts.join(' · ');
}

const planOf = (a: Account | null, id: PlanId): Plan =>
  a?.plans?.find((p) => p.id === id) ?? { id, name: id === 'pro' ? 'Pro' : 'Basic', label: id === 'pro' ? '$20' : '$10', interval: 'month', available: true };

function useAction() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setBusy(false);
    }
  };
  return { busy, error, run };
}

/** Top-right of the hero: sign in, or the account menu with usage. */
export function AccountBar() {
  const { account: a } = useAccountState();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const portal = useAction();
  const pack = useAction();

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !box.current?.contains(e.target as Node)) setOpen(false);
    };
    addEventListener('mousedown', close);
    addEventListener('keydown', close);
    return () => {
      removeEventListener('mousedown', close);
      removeEventListener('keydown', close);
    };
  }, [open]);

  if (!a || !a.paywall) return null;

  if (!a.signedIn) {
    return (
      <button type="button" className="acct-signin" onClick={signIn}>
        <GoogleLogo size={16} />
        Sign in
      </button>
    );
  }

  const initial = (a.user?.name || a.user?.email || '?').trim()[0]?.toUpperCase();
  return (
    <div className="acct" ref={box}>
      {a.plan === 'free' && <span className="acct-left">{usageLine(a)}</span>}
      {a.plan === 'free' ? (
        <button type="button" className="acct-upgrade" onClick={() => openPaywall({ reason: 'upgrade' })}>
          Upgrade
        </button>
      ) : (
        <span className="acct-pro">{a.plan === 'pro' ? 'PRO' : 'BASIC'}</span>
      )}
      <button type="button" className="acct-avatar" aria-haspopup="menu" aria-expanded={open} aria-label="Account" onClick={() => setOpen(!open)}>
        {a.user?.picture ? <img src={a.user.picture} alt="" referrerPolicy="no-referrer" /> : initial}
      </button>
      {open && (
        <div className="acct-menu" role="menu">
          <div className="acct-who">
            <b>{a.user?.name || 'Signed in'}</b>
            {a.user?.email && <small>{a.user.email}</small>}
          </div>
          <div className="acct-usage">{usageLine(a)}</div>
          {a.plan !== 'free' && stripCredits(a) > 0 && (
            <small className="acct-renew">
              {stripCredits(a)} pack strip{stripCredits(a) === 1 ? '' : 's'} saved for after your plan
            </small>
          )}
          {a.plan !== 'free' && a.subscription?.renewsAt && (
            <small className="acct-renew">
              {a.subscription.cancelAtPeriodEnd ? 'Ends' : 'Renews'} {new Date(a.subscription.renewsAt).toLocaleDateString()}
            </small>
          )}
          {a.plan !== 'pro' && (
            <button type="button" role="menuitem" onClick={() => { setOpen(false); openPaywall({ reason: 'upgrade', plan: 'pro' }); }}>
              {a.plan === 'free' ? 'See plans' : `Upgrade to Pro · ${planOf(a, 'pro').label}/month`}
            </button>
          )}
          {a.plan === 'free' && a.pack?.available && (
            <button type="button" role="menuitem" disabled={pack.busy} onClick={() => pack.run(buyStripPack)}>
              {pack.busy ? 'Opening…' : `Buy ${a.pack.strips} on-device strips · ${a.pack.label}`}
            </button>
          )}
          {pack.error && <small className="acct-error">{pack.error}</small>}
          {a.plan !== 'free' && a.subscription?.manageable && (
            <button type="button" role="menuitem" disabled={portal.busy} onClick={() => portal.run(openBillingPortal)}>
              {portal.busy ? 'Opening…' : a.dev.billing ? 'Cancel plan (dev)' : 'Manage subscription'}
            </button>
          )}
          {portal.error && <small className="acct-error">{portal.error}</small>}
          <button type="button" role="menuitem" onClick={() => { setOpen(false); void signOut(); }}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

const PERKS: Record<PlanId, string[]> = {
  basic: ['Unlimited on-device stripping', 'Files never leave your device', 'Metadata, C2PA and SynthID removed'],
  pro: [
    'Everything in Basic',
    'Unlimited server stripping, about 4x faster',
    'Unlimited video downloads from YouTube, X, TikTok and Instagram',
  ],
};

const n = (v: number | undefined) => v ?? 1;

/** The sign-in / upgrade dialog, opened by a tool that hit the quota. */
export function PaywallDialog() {
  const { account: a, paywall } = useAccountState();
  const ref = useRef<HTMLDialogElement>(null);
  const checkout = useAction();
  const [picked, setPicked] = useState<PlanId | 'pack' | null>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (paywall && !d.open) d.showModal();
    if (!paywall && d.open) d.close();
    if (!paywall) setPicked(null);
  }, [paywall]);

  // Signed in on another tab, or the quota changed: show the right step.
  const reason = paywall?.reason === 'auth' && a?.signedIn ? 'upgrade' : paywall?.reason;
  const current = a?.plan ?? 'free';
  const free = a?.free;
  // Highlight the plan that lifts the limit just hit (Pro by default).
  const best: PlanId = paywall?.plan === 'basic' && current === 'free' ? 'basic' : 'pro';
  const hit = paywall?.kind === 'strip' && (a?.credits?.packs ?? 0) > 0
    ? 'You’ve used your free and pack on-device strips. '
    : paywall?.kind
    ? `You’ve used your free ${paywall.kind === 'strip' ? 'on-device strip' : paywall.kind === 'server_strip' ? 'server strip' : 'download'}. `
    : '';

  const buy = (id: PlanId) => {
    setPicked(id);
    void checkout.run(() => startCheckout(id));
  };
  const buyPack = () => {
    setPicked('pack');
    void checkout.run(buyStripPack);
  };
  // The pack only adds on-device strips, so offer it for that limit (or when
  // the dialog was opened from the account bar) and only without a plan.
  const pk = a?.pack;
  const showPack = Boolean(pk) && current === 'free' && (!paywall?.kind || paywall.kind === 'strip');
  const credits = stripCredits(a);

  return (
    <dialog ref={ref} className="paywall" onClose={closePaywall} onClick={(e) => e.target === ref.current && closePaywall()}>
      {paywall && (
        <div className="paywall-body">
          <button type="button" className="paywall-x" aria-label="Close" onClick={closePaywall}>×</button>
          {reason === 'auth' ? (
            <>
              <h2 className="display sm">Sign in to <span className="accent">start free</span></h2>
              <p className="lede">
                Every account gets <b>{n(free?.strip)} free on-device strip</b>, <b>{n(free?.server_strip)} free server strip</b> and{' '}
                <b>{n(free?.download)} free video download</b>. No card needed.
              </p>
              {paywall.message && <p className="paywall-error">{paywall.message}</p>}
              <button type="button" className="paywall-google" onClick={signIn} disabled={!a?.signIn}>
                <GoogleLogo />
                {a?.signIn === 'dev' ? 'Continue (dev account)' : 'Continue with Google'}
              </button>
              {a && !a.signIn && <p className="paywall-error">Sign-in isn’t set up on this server yet.</p>}
            </>
          ) : (
            <>
              <h2 className="display sm">Pick a <span className="accent">plan</span></h2>
              {hit && <p className="lede">{hit}</p>}
              <div className="plans">
                {(['basic', 'pro'] as const).map((id) => {
                  const p = planOf(a, id);
                  const isCurrent = current === id;
                  const busy = checkout.busy && picked === id;
                  return (
                    <div key={id} className={`plan${id === best ? ' plan-best' : ''}`}>
                      <div className="plan-head">
                        <b>{p.name}</b>
                        <span className="plan-price"><b>{p.label}</b> / {p.interval}</span>
                      </div>
                      <ul className="paywall-perks">
                        {PERKS[id].map((perk) => <li key={perk}>{perk}</li>)}
                      </ul>
                      <button
                        type="button"
                        className={id === best ? 'paywall-cta' : 'paywall-cta alt'}
                        disabled={isCurrent || !p.available || checkout.busy}
                        onClick={() => buy(id)}
                      >
                        {isCurrent
                          ? 'Your plan'
                          : busy
                            ? 'Opening…'
                            : a?.dev.billing
                              ? `Get ${p.name} (dev, free)`
                              : current === 'free'
                                ? `Get ${p.name}`
                                : `Switch to ${p.name}`}
                      </button>
                      {!p.available && <small className="plan-off">Not available yet</small>}
                    </div>
                  );
                })}
              </div>
              {showPack && pk && (
                <div className="pack">
                  <div className="pack-text">
                    <b>Just a few files? Strip pack</b>
                    <span>
                      {pk.strips} more on-device strips for <b>{pk.label}</b>, paid once. Buy as many as you like, they add up.
                      {credits > 0 && ` You have ${credits} left.`}
                    </span>
                  </div>
                  <button type="button" className="paywall-cta alt" disabled={!pk.available || checkout.busy} onClick={buyPack}>
                    {checkout.busy && picked === 'pack'
                      ? 'Opening…'
                      : a?.dev.billing
                        ? `Get ${pk.strips} strips (dev, free)`
                        : `Buy ${pk.strips} strips · ${pk.label}`}
                  </button>
                  {!pk.available && <small className="plan-off">Not available yet</small>}
                </div>
              )}
              {checkout.error && <p className="paywall-error">{checkout.error}</p>}
              <p className="paywall-fine">
                Plans are billed monthly. Cancel or change plan anytime.{showPack ? ' Strip packs are a one-time payment.' : ''}
              </p>
              <StripeBadge />
            </>
          )}
        </div>
      )}
    </dialog>
  );
}

/** One-line message after checkout, dismissed by a click. */
export function AccountNotice() {
  const { notice } = useAccountState();
  if (!notice) return null;
  return (
    <button type="button" className="acct-notice" onClick={() => setNotice(null)}>
      {notice}
    </button>
  );
}
