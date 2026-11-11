'use strict';

// An in-memory stand-in for Supabase's REST API (PostgREST), answering the
// RPCs in supabase/migrations/ the same way the SQL does. Lets the account
// tests run without a database or network.

const crypto = require('crypto');

const ACTIVE = new Set(['active', 'trialing', 'past_due']);

function fakeSupabase({ url = 'https://proj.supabase.test', key = 'sb_secret_test' } = {}) {
  const profiles = new Map();
  const subs = new Map();
  const counters = new Map(); // `${user}:${kind}` -> used
  const events = [];
  const history = new Map(); // row id -> download row
  const settings = { free_strips: 1, free_downloads: 1 };
  const calls = [];
  let down = false;

  const isPro = (uid) => [...subs.values()].some((s) => s.user_id === uid && ACTIVE.has(s.status)
    && (s.current_period_end == null || s.current_period_end * 1000 > Date.now() - 86400000));

  function account(p) {
    if (!p) return null;
    const mine = [...subs.values()].filter((s) => s.user_id === p.id)
      .sort((a, b) => (ACTIVE.has(b.status) - ACTIVE.has(a.status)) || b.updated_at - a.updated_at);
    const s = mine[0];
    return {
      ...p,
      subscription_id: s?.id ?? null,
      subscription_status: s?.status ?? null,
      current_period_end: s?.current_period_end ?? null,
      cancel_at_period_end: s?.cancel_at_period_end ?? false,
      strips_used: counters.get(`${p.id}:strip`) ?? 0,
      downloads_used: counters.get(`${p.id}:download`) ?? 0,
    };
  }
  const rows = (p) => (p ? [account(p)] : []);
  let tick = 0;

  const rpc = {
    get_account: ({ p_user_id }) => rows(profiles.get(p_user_id)),
    account_by_customer: ({ p_customer }) => rows([...profiles.values()].find((p) => p.stripe_customer_id === p_customer)),
    upsert_google_user({ p_sub, p_email, p_name, p_picture }) {
      let p = [...profiles.values()].find((x) => x.google_sub === p_sub);
      if (!p) {
        p = { id: crypto.randomUUID(), google_sub: p_sub, stripe_customer_id: null };
        profiles.set(p.id, p);
      }
      Object.assign(p, { email: p_email, name: p_name, picture: p_picture });
      return rows(p);
    },
    set_customer({ p_user_id, p_customer }) {
      const p = profiles.get(p_user_id);
      if (p) p.stripe_customer_id = p_customer;
      return null;
    },
    set_subscription({ p_user_id, p_id, p_status, p_period_end, p_cancel_at_period_end, p_price_id }) {
      if (!profiles.has(p_user_id)) throw Object.assign(new Error('violates foreign key constraint'), { status: 409 });
      subs.set(p_id, {
        id: p_id, user_id: p_user_id, status: p_status, current_period_end: p_period_end,
        cancel_at_period_end: p_cancel_at_period_end, price_id: p_price_id, updated_at: ++tick,
      });
      return null;
    },
    consume_usage({ p_user_id, p_kind, p_free_limit }) {
      if (!profiles.has(p_user_id)) return false;
      const k = `${p_user_id}:${p_kind}`;
      const used = counters.get(k) ?? 0;
      const pro = isPro(p_user_id);
      if (!pro && used >= p_free_limit) return false;
      counters.set(k, used + 1);
      events.push({ user_id: p_user_id, kind: p_kind, delta: 1, pro });
      return true;
    },
    refund_usage({ p_user_id, p_kind }) {
      const k = `${p_user_id}:${p_kind}`;
      if (counters.has(k)) {
        counters.set(k, Math.max(0, counters.get(k) - 1));
        events.push({ user_id: p_user_id, kind: p_kind, delta: -1 });
      }
      return null;
    },
    get_settings: () => ({ ...settings }),
    list_downloads: ({ p_user_id, p_platform, p_limit }) => [...history.values()]
      .filter((d) => d.user_id === p_user_id && d.platform === p_platform)
      .sort((a, b) => b.seq - a.seq)
      .slice(0, p_limit ?? 50)
      .map(({ seq, ...d }) => d),
    save_download({ p_user_id, p_id, p_platform, p_url, p_mode, p_name, p_job_id, p_status, p_message }) {
      const d = history.get(p_id);
      if (!d) {
        history.set(p_id, {
          id: p_id, user_id: p_user_id, platform: p_platform, url: p_url, mode: p_mode, name: p_name ?? null,
          job_id: p_job_id ?? null, status: p_status ?? 'pending', message: p_message ?? null, seq: ++tick,
        });
      } else if (d.user_id === p_user_id) {
        if (p_name != null) d.name = p_name;
        if (p_job_id != null) d.job_id = p_job_id;
        if (p_status != null) { d.status = p_status; d.message = p_message ?? null; }
      }
      return null;
    },
    delete_downloads({ p_user_id, p_platform, p_ids }) {
      const gone = [];
      for (const [id, d] of history) {
        if (d.user_id !== p_user_id || d.platform !== p_platform || (p_ids && !p_ids.includes(id))) continue;
        history.delete(id);
        gone.push(d.job_id);
      }
      return gone;
    },
    prune_downloads: () => null,
  };

  async function fetchImpl(reqUrl, init = {}) {
    if (down) throw new TypeError('fetch failed');
    const prefix = `${url}/rest/v1/rpc/`;
    if (!reqUrl.startsWith(prefix)) throw new Error(`unexpected ${reqUrl}`);
    if (init.headers?.apikey !== key) return Response.json({ message: 'Invalid API key' }, { status: 401 });
    const fn = reqUrl.slice(prefix.length);
    const args = JSON.parse(init.body || '{}');
    calls.push({ fn, args, headers: init.headers });
    if (!rpc[fn]) return Response.json({ message: `Could not find the function public.${fn}` }, { status: 404 });
    try {
      const out = rpc[fn](args);
      return out === null ? new Response(null, { status: 204 }) : Response.json(out);
    } catch (e) {
      return Response.json({ message: e.message }, { status: e.status || 400 });
    }
  }

  return {
    url, key, fetch: fetchImpl, calls, events, settings, profiles, subs, history,
    setDown(v) { down = v; },
  };
}

module.exports = { fakeSupabase };
