// The signed-in account, its free quota and the paywall, shared by every
// tool. A tiny external store so any component can read it with useAccount().

import { useSyncExternalStore } from 'react';
import { apiUrl, RequestError, requestJson } from './request';

/** strip = on-device strip, server_strip = strip on our server. */
export type Kind = 'strip' | 'server_strip' | 'download';
export type PlanId = 'basic' | 'pro';
export type Interval = 'month' | 'year';

export interface Plan {
  id: PlanId;
  name: string;
  label: string;
  interval: string;
  /** False when the server has no Stripe price for it. */
  available: boolean;
  /** The yearly price; null (or missing on older servers) when it isn't sold yearly. */
  yearly?: { label: string; interval: string; available: boolean } | null;
}

export interface StripPack {
  label: string;
  strips: number;
  /** False when the server has no Stripe price for it. */
  available: boolean;
}

export interface Account {
  paywall: boolean;
  signedIn: boolean;
  user: { email: string | null; name: string | null; picture: string | null } | null;
  plan: 'free' | PlanId;
  usage: Record<Kind, { used: number; limit: number | null }> | null;
  subscription: {
    status: string;
    renewsAt: number | null;
    cancelAtPeriodEnd: boolean;
    /** How the current plan is billed. */
    interval?: Interval;
    manageable: boolean;
  } | null;
  /** On-device strips left from strip packs, and packs bought; null signed out. */
  credits: { strip: number; packs: number } | null;
  /** The one-time strip pack: `strips` on-device strips for `label`. */
  pack: StripPack;
  /** Today's site-wide free server strips and downloads are all taken; null when it doesn't apply. */
  trialsFull?: boolean | null;
  /** Free uses every account starts with; null on Pro or with no paywall. */
  free: Record<Kind, number> | null;
  plans: Plan[];
  price: { label: string; interval: string };
  signIn: 'google' | 'dev' | null;
  dev: { auth: boolean; billing: boolean };
}

export interface Paywall {
  /** auth: sign in first. upgrade: the free use is spent. */
  reason: 'auth' | 'upgrade';
  kind?: Kind;
  /** The cheapest plan that removes the limit that was hit. */
  plan?: PlanId;
  /** The server offers the strip pack for this limit. */
  pack?: boolean;
  /** Today's free server strips / downloads are all taken (site-wide cap). */
  full?: boolean;
  message?: string;
}

interface State {
  account: Account | null;
  /** The first /api/me attempt has finished (answered or given up). */
  loaded: boolean;
  paywall: Paywall | null;
  notice: string | null;
}

let state: State = { account: null, loaded: false, paywall: null, notice: null };
const listeners = new Set<() => void>();
const set = (patch: Partial<State>) => {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
};
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const useAccountState = () => useSyncExternalStore(subscribe, () => state);

/** No answer, or a 5xx / 429: worth asking again in a moment. */
const transient = (e: unknown) => !(e instanceof RequestError) || e.status === 0 || e.status === 429 || e.status >= 500;

/**
 * Re-read the account. A failed request never changes what is shown: the
 * last known account stays (a hiccup must not look like being signed out).
 * Before anything is known (the page load), a transient failure is retried
 * a few times so the header settles on the real state.
 */
export async function refreshAccount() {
  const tries = state.account ? 1 : 4;
  for (let i = 0; i < tries; i++) {
    try {
      set({ account: await requestJson<Account>('GET', '/api/me') });
      break;
    } catch (e) {
      /* server unreachable: the tools report that themselves */
      if (!transient(e) || i === tries - 1) break;
      await new Promise((ok) => setTimeout(ok, 500 * 2 ** i));
    }
  }
  if (!state.loaded) set({ loaded: true });
  return state.account;
}

export const openPaywall = (p: Paywall) => set({ paywall: p });
export const closePaywall = () => set({ paywall: null });
export const setNotice = (notice: string | null) => set({ notice });

/** Where to come back to after sign-in or checkout: this page and tool. */
const here = () => location.pathname + location.hash;

export function signIn() {
  location.href = apiUrl(`/api/auth/google?next=${encodeURIComponent(here())}`);
}

export async function signOut() {
  await requestJson('POST', '/api/auth/logout').catch(() => {});
  await refreshAccount();
}

/** Subscribe to a plan, or switch an existing subscription to it (or to its other billing interval). */
export async function startCheckout(plan: PlanId, interval: Interval = 'month') {
  const { url } = await requestJson<{ url: string }>('POST', '/api/billing/checkout', { plan, interval, next: here() });
  location.href = url;
}

/** Buy one strip pack (one-time). Can be bought again; the strips add up. */
export async function buyStripPack() {
  const { url } = await requestJson<{ url: string }>('POST', '/api/billing/pack', { next: here() });
  location.href = url;
}

/** On-device strips left from packs (0 when none or signed out). */
export const stripCredits = (a: Account | null) => Math.max(0, a?.credits?.strip ?? 0);

export async function openBillingPortal() {
  const { url } = await requestJson<{ url: string }>('POST', '/api/billing/portal', { next: here() });
  location.href = url;
}

export const KIND_WORD: Record<Kind, string> = { strip: 'on-device strip', server_strip: 'server strip', download: 'download' };

/**
 * Call with an error from a strip or download request. A sign-in or upgrade
 * answer opens the paywall and becomes a short message for the row; any
 * other error passes through unchanged.
 */
export function gateError(e: unknown, kind: Kind): unknown {
  if (!(e instanceof RequestError) || (e.status !== 401 && e.status !== 402)) return e;
  // The server says which quota was hit (on-device vs server strip).
  const data = (e.data ?? {}) as { kind?: Kind; plan?: PlanId; pack?: boolean; code?: string; error?: string };
  const k = data.kind && data.kind in KIND_WORD ? data.kind : kind;
  const plan = data.plan ?? (k === 'strip' ? 'basic' : 'pro');
  const pack = Boolean(data.pack);
  // The site-wide daily cap on free server strips and downloads is reached.
  const full = data.code === 'free_trials_full';
  if (e.status === 401 && state.account?.signedIn) {
    // We think we're signed in: check before asking to sign in again, so a
    // one-off refusal doesn't look like being signed out.
    void refreshAccount().then((a) => {
      if (a?.paywall && !a.signedIn) openPaywall({ reason: 'auth', kind: k });
    });
    return new Error('Couldn’t confirm your sign-in, please try again');
  }
  openPaywall({ reason: e.status === 401 ? 'auth' : 'upgrade', kind: k, plan, pack, full, message: full ? data.error : undefined });
  void refreshAccount();
  if (e.status === 401) return new Error('Sign in to keep going');
  if (full) return new Error(`Today’s free ${KIND_WORD[k]}s are taken, try tomorrow or upgrade to Pro`);
  return new Error(`Free ${KIND_WORD[k]} used, upgrade to ${plan === 'basic' ? 'Basic' : 'Pro'}${pack ? ` or try ${state.account?.pack?.label ?? '$2'} strips` : ''}`);
}

/**
 * Before a file is queued or a byte uploaded: may this account run `kind`?
 * Signed out, out of free uses, or today's free trials taken: opens the
 * sign-in / plans dialog right away and answers false. The server checks
 * again either way; this only saves an upload that would be refused.
 */
export async function preflight(kind: Kind): Promise<boolean> {
  // Signed out is known from the page load: no request needed to say so.
  let a = state.account;
  if (a?.paywall && !a.signedIn) {
    openPaywall({ reason: 'auth', kind });
    return false;
  }
  // Fresh usage from /api/me (no file data). Unreachable: let the tool try and report it.
  a = (await refreshAccount()) ?? a;
  if (!a || !a.paywall) return true;
  if (!a.signedIn) {
    openPaywall({ reason: 'auth', kind });
    return false;
  }
  const left = remaining(a, kind);
  if (left === null) return true;
  if (kind === 'strip') {
    if (left > 0 || stripCredits(a) > 0) return true;
    openPaywall({ reason: 'upgrade', kind, plan: 'basic', pack: Boolean(a.pack?.available) });
    return false;
  }
  if (left === 0) {
    openPaywall({ reason: 'upgrade', kind, plan: 'pro' });
    return false;
  }
  if (a.trialsFull) {
    openPaywall({ reason: 'upgrade', kind, plan: 'pro', full: true });
    return false;
  }
  return true;
}

/** Free uses left, or null when unlimited (Pro, or no paywall). */
export function remaining(a: Account | null, kind: Kind): number | null {
  const u = a?.usage?.[kind];
  if (!a?.paywall || !u || u.limit == null) return null;
  return Math.max(0, u.limit - u.used);
}

// Coming back from Google or Stripe: tidy the URL and say what happened.
export async function initAccount() {
  const params = new URLSearchParams(location.search);
  const upgraded = params.has('upgraded');
  const upgradedTo = params.get('upgraded');
  // ?pack=N: back from buying a strip pack; the account should have N packs.
  const packs = Number(params.get('pack')) || 0;
  const failed = params.get('signin') === 'failed';
  if (upgraded || failed || params.has('pack')) {
    params.delete('upgraded');
    params.delete('pack');
    params.delete('signin');
    const q = params.toString();
    history.replaceState(null, '', location.pathname + (q ? `?${q}` : '') + location.hash);
  }
  if (failed) openPaywall({ reason: 'auth', message: 'Google sign-in didn’t go through. Please try again.' });
  let a = await refreshAccount();
  if (packs) {
    // The webhook that adds the strips can land a moment after the redirect.
    for (let i = 0; i < 10 && a && (a.credits?.packs ?? 0) < packs; i++) {
      await new Promise((ok) => setTimeout(ok, 1500));
      a = await refreshAccount();
    }
    setNotice(
      a && (a.credits?.packs ?? 0) >= packs
        ? `${a.pack.strips} on-device strips added. You have ${stripCredits(a)} left.`
        : 'Payment received. Your strips are added in a moment, refresh if they don’t show.',
    );
  }
  if (upgraded) {
    // Stripe's webhook can land a moment after the redirect.
    // ?upgraded=basic|pro names the plan just bought (older links say 1).
    const want = upgradedTo === 'basic' ? 'basic' : 'pro';
    for (let i = 0; i < 10 && a && a.plan !== want; i++) {
      await new Promise((ok) => setTimeout(ok, 1500));
      a = await refreshAccount();
    }
    setNotice(
      a?.plan === 'pro'
        ? 'You’re on Pro. Everything is unlimited.'
        : a?.plan === 'basic'
          ? 'You’re on Basic. On-device stripping is unlimited.'
          : 'Payment received. Your plan turns on in a moment, refresh if it doesn’t.',
    );
  }
}
