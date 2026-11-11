import { useEffect, useRef, useState } from 'react';
import {
  closePaywall,
  openBillingPortal,
  openPaywall,
  remaining,
  setNotice,
  signIn,
  signOut,
  startCheckout,
  useAccountState,
  type Account,
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

/** "Payments by Stripe" badge: Stripe's mark (simple-icons, CC0) and name. */
export function StripeBadge() {
  return (
    <span className="stripe-badge">
      <span>Secure payments by</span>
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="stripe-mark">
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

const left = (n: number | null, word: string) => (n == null ? null : `${n} ${word}${n === 1 ? '' : 's'} left`);

function usageLine(a: Account) {
  if (a.plan === 'pro') return 'Pro · unlimited';
  return [left(remaining(a, 'strip'), 'strip'), left(remaining(a, 'download'), 'download')].filter(Boolean).join(' · ');
}

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
          Go Pro
        </button>
      ) : (
        <span className="acct-pro">PRO</span>
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
          {a.plan === 'pro' && a.subscription?.renewsAt && (
            <small className="acct-renew">
              {a.subscription.cancelAtPeriodEnd ? 'Ends' : 'Renews'} {new Date(a.subscription.renewsAt).toLocaleDateString()}
            </small>
          )}
          {a.plan === 'free' ? (
            <button type="button" role="menuitem" onClick={() => { setOpen(false); openPaywall({ reason: 'upgrade' }); }}>
              Upgrade to Pro · {a.price.label}/{a.price.interval}
            </button>
          ) : (
            a.subscription?.manageable && (
              <button type="button" role="menuitem" disabled={portal.busy} onClick={() => portal.run(openBillingPortal)}>
                {portal.busy ? 'Opening…' : a.dev.billing ? 'Cancel Pro (dev)' : 'Manage subscription'}
              </button>
            )
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

/** The sign-in / upgrade dialog, opened by a tool that hit the quota. */
export function PaywallDialog() {
  const { account: a, paywall } = useAccountState();
  const ref = useRef<HTMLDialogElement>(null);
  const checkout = useAction();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (paywall && !d.open) d.showModal();
    if (!paywall && d.open) d.close();
  }, [paywall]);

  // Signed in on another tab, or the quota changed: show the right step.
  const reason = paywall?.reason === 'auth' && a?.signedIn ? 'upgrade' : paywall?.reason;
  const price = a?.price ?? { label: '$20', interval: 'month' };

  return (
    <dialog ref={ref} className="paywall" onClose={closePaywall} onClick={(e) => e.target === ref.current && closePaywall()}>
      {paywall && (
        <div className="paywall-body">
          <button type="button" className="paywall-x" aria-label="Close" onClick={closePaywall}>×</button>
          {reason === 'auth' ? (
            <>
              <h2 className="display sm">Sign in to <span className="accent">start free</span></h2>
              <p className="lede">Every account gets <b>1 free strip</b> and <b>1 free download</b>. No card needed.</p>
              {paywall.message && <p className="paywall-error">{paywall.message}</p>}
              <button type="button" className="paywall-google" onClick={signIn} disabled={!a?.signIn}>
                <GoogleLogo />
                {a?.signIn === 'dev' ? 'Continue (dev account)' : 'Continue with Google'}
              </button>
              {a && !a.signIn && <p className="paywall-error">Sign-in isn’t set up on this server yet.</p>}
            </>
          ) : (
            <>
              <h2 className="display sm">Go <span className="accent">Pro</span></h2>
              <p className="lede">
                {paywall.kind ? `You’ve used your free ${paywall.kind}. ` : ''}Keep going with no limits.
              </p>
              <div className="paywall-price">
                <b>{price.label}</b>
                <span>/ {price.interval}</span>
              </div>
              <ul className="paywall-perks">
                <li>Unlimited metadata and SynthID stripping, photos and videos</li>
                <li>Unlimited downloads from YouTube, X, Instagram and TikTok</li>
                <li>Cancel anytime from your account</li>
              </ul>
              <button type="button" className="paywall-cta" disabled={checkout.busy} onClick={() => checkout.run(startCheckout)}>
                {checkout.busy ? 'Opening checkout…' : a?.dev.billing ? 'Upgrade (dev, free)' : `Upgrade for ${price.label}/${price.interval}`}
              </button>
              {checkout.error && <p className="paywall-error">{checkout.error}</p>}
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
