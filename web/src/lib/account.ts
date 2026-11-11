// The signed-in account, its free quota and the paywall, shared by every
// tool. A tiny external store so any component can read it with useAccount().

import { useSyncExternalStore } from 'react';
import { apiUrl, RequestError, requestJson } from './request';

export type Kind = 'strip' | 'download';

export interface Account {
  paywall: boolean;
  signedIn: boolean;
  user: { email: string | null; name: string | null; picture: string | null } | null;
  plan: 'free' | 'pro';
  usage: Record<Kind, { used: number; limit: number | null }> | null;
  subscription: { status: string; renewsAt: number | null; cancelAtPeriodEnd: boolean; manageable: boolean } | null;
  price: { label: string; interval: string };
  signIn: 'google' | 'dev' | null;
  dev: { auth: boolean; billing: boolean };
}

export interface Paywall {
  /** auth: sign in first. upgrade: the free use is spent. */
  reason: 'auth' | 'upgrade';
  kind?: Kind;
  message?: string;
}

interface State {
  account: Account | null;
  paywall: Paywall | null;
  notice: string | null;
}

let state: State = { account: null, paywall: null, notice: null };
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

export async function refreshAccount() {
  try {
    set({ account: await requestJson<Account>('GET', '/api/me') });
  } catch {
    /* server unreachable: the tools report that themselves */
  }
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

export async function startCheckout() {
  const { url } = await requestJson<{ url: string }>('POST', '/api/billing/checkout', { next: here() });
  location.href = url;
}

export async function openBillingPortal() {
  const { url } = await requestJson<{ url: string }>('POST', '/api/billing/portal', { next: here() });
  location.href = url;
}

/**
 * Call with an error from a strip or download request. A sign-in or upgrade
 * answer opens the paywall and becomes a short message for the row; any
 * other error passes through unchanged.
 */
export function gateError(e: unknown, kind: Kind): unknown {
  if (!(e instanceof RequestError) || (e.status !== 401 && e.status !== 402)) return e;
  openPaywall({ reason: e.status === 401 ? 'auth' : 'upgrade', kind });
  void refreshAccount();
  return new Error(e.status === 401 ? 'Sign in to keep going' : `Free ${kind} used, upgrade to Pro`);
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
  const failed = params.get('signin') === 'failed';
  if (upgraded || failed) {
    params.delete('upgraded');
    params.delete('signin');
    const q = params.toString();
    history.replaceState(null, '', location.pathname + (q ? `?${q}` : '') + location.hash);
  }
  if (failed) openPaywall({ reason: 'auth', message: 'Google sign-in didn’t go through. Please try again.' });
  let a = await refreshAccount();
  if (upgraded) {
    // Stripe's webhook can land a moment after the redirect.
    for (let i = 0; i < 10 && a && a.plan !== 'pro'; i++) {
      await new Promise((ok) => setTimeout(ok, 1500));
      a = await refreshAccount();
    }
    setNotice(a?.plan === 'pro' ? 'You’re on Pro. Everything is unlimited now.' : 'Payment received. Pro turns on in a moment, refresh if it doesn’t.');
  }
}
