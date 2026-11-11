'use strict';

// Accounts, paid plans (Basic / Pro) and usage counts, stored in Supabase (Postgres).
//
// The server talks to Supabase's REST API (PostgREST) with the service role
// key, so there is no extra dependency and nothing is kept on local disk.
// Every read and write goes through the SQL functions in
// supabase/migrations/, which keep the free-use check atomic. The tables have
// row level security on with no policies, so only the service role can reach
// them; never send this key to the browser.

/** Subscription statuses that count as a paid license. */
const ACTIVE = new Set(['active', 'trialing', 'past_due']);

const SETTINGS_TTL_MS = 60_000;

class StoreError extends Error {}

/**
 * @param {{ url: string, key: string, fetchImpl?: typeof fetch, timeoutMs?: number }} opts
 */
function createSupabaseStore({ url, key, fetchImpl = fetch, timeoutMs = 10_000 }) {
  if (!url || !key) {
    throw new StoreError('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set (see docs/accounts-and-billing.md)');
  }
  const base = `${url.replace(/\/+$/, '')}/rest/v1`;
  const headers = {
    apikey: key,
    // Legacy service_role keys are JWTs and also go in Authorization; the
    // newer sb_secret_... keys only go in apikey.
    ...(key.startsWith('eyJ') ? { Authorization: `Bearer ${key}` } : {}),
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  async function rpc(fn, args = {}) {
    let res;
    try {
      res = await fetchImpl(`${base}/rpc/${fn}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(args),
        signal: AbortSignal.timeout(timeoutMs),
      });
    } catch (e) {
      throw new StoreError(`Supabase ${fn}: ${e.message}`);
    }
    const text = await res.text();
    let data = null;
    if (text) {
      try { data = JSON.parse(text); } catch { data = text; }
    }
    if (!res.ok) {
      const why = data?.message || data?.hint || (typeof data === 'string' ? data : '') || `HTTP ${res.status}`;
      throw new StoreError(`Supabase ${fn}: ${why}`);
    }
    return data;
  }

  const one = (rows) => (Array.isArray(rows) ? rows[0] || null : rows || null);
  const isUuid = (id) => typeof id === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

  let settings = null;
  let settingsAt = 0;

  return {
    /** The account row (see the `accounts` view), or null. */
    async getUser(id) {
      if (!isUuid(id)) return null;
      return one(await rpc('get_account', { p_user_id: id }));
    },

    async userByCustomer(customerId) {
      return one(await rpc('account_by_customer', { p_customer: customerId }));
    },

    /** Find or create the account for a Google identity, refreshing its profile. */
    async upsertGoogleUser({ sub, email, name, picture }) {
      return one(await rpc('upsert_google_user', {
        p_sub: sub, p_email: email ?? null, p_name: name ?? null, p_picture: picture ?? null,
      }));
    },

    async setCustomer(userId, customerId) {
      await rpc('set_customer', { p_user_id: userId, p_customer: customerId });
    },

    async setSubscription(userId, sub) {
      await rpc('set_subscription', {
        p_user_id: userId,
        p_id: sub.id,
        p_status: sub.status,
        p_period_end: sub.periodEnd ?? null,
        p_cancel_at_period_end: Boolean(sub.cancelAtPeriodEnd),
        p_price_id: sub.priceId ?? null,
        p_tier: sub.tier === 'basic' ? 'basic' : 'pro',
      });
    },

    /**
     * Count one use of `kind` ('strip' = on-device, 'server_strip' or
     * 'download'). Always allowed when the account's plan includes it (see
     * PLAN_UNLIMITED), otherwise only while under `freeLimit`. Atomic in Postgres.
     */
    async consume(userId, kind, freeLimit) {
      if (!isUuid(userId)) return false;
      return (await rpc('consume_usage', { p_user_id: userId, p_kind: kind, p_free_limit: freeLimit })) === true;
    },

    /** Give back a use that didn't produce a file (failed or cancelled). */
    async refund(userId, kind) {
      await rpc('refund_usage', { p_user_id: userId, p_kind: kind });
    },

    /** Rows of the app_settings table as { key: value }, cached for a minute. */
    async settings(now = Date.now()) {
      if (settings && now - settingsAt < SETTINGS_TTL_MS) return settings;
      try {
        settings = (await rpc('get_settings')) || {};
        settingsAt = now;
      } catch (e) {
        if (!settings) throw e;
        // Keep serving the last values if Supabase hiccups.
      }
      return settings;
    },

    // --- download rows (supabase/migrations/20261111100000_download_history.sql)

    /** The account's newest rows for one platform. */
    async listDownloads(userId, platform, limit = 50) {
      if (!isUuid(userId)) return [];
      return (await rpc('list_downloads', { p_user_id: userId, p_platform: platform, p_limit: limit })) || [];
    },

    /** Insert or update a row; fields left out keep their value. */
    async saveDownload(userId, row) {
      if (!isUuid(userId) || !isUuid(row.id)) return;
      await rpc('save_download', {
        p_user_id: userId,
        p_id: row.id,
        p_platform: row.platform,
        p_url: row.url,
        p_mode: row.mode,
        p_name: row.name ?? null,
        p_job_id: row.jobId ?? null,
        p_status: row.status ?? null,
        p_message: row.message ?? null,
      });
    },

    /** Delete rows by id, or all of a platform's when ids is null. Returns their job ids. */
    async deleteDownloads(userId, platform, ids = null) {
      if (!isUuid(userId)) return [];
      const list = ids && ids.filter(isUuid);
      if (list && !list.length) return [];
      const out = await rpc('delete_downloads', { p_user_id: userId, p_platform: platform, p_ids: list });
      return (out || []).filter(Boolean);
    },

    async pruneDownloads(days = 30) {
      await rpc('prune_downloads', { p_days: days });
    },
  };
}

/** What each paid plan includes without limits. Mirrors tier_unlimited() in SQL. */
const PLAN_UNLIMITED = {
  free: [],
  basic: ['strip'],
  pro: ['strip', 'server_strip', 'download'],
};

/** The plan an account row is on now: 'free', 'basic' or 'pro'. */
function planOf(user) {
  if (!user || !ACTIVE.has(user.subscription_status)) return 'free';
  // A day of slack past the period end, in case a renewal webhook is late.
  if (user.current_period_end && user.current_period_end * 1000 + 86400000 <= Date.now()) return 'free';
  return user.subscription_tier === 'basic' ? 'basic' : 'pro';
}

const isUnlimited = (plan, kind) => PLAN_UNLIMITED[plan]?.includes(kind) ?? false;
const isPaid = (user) => planOf(user) !== 'free';

module.exports = { createSupabaseStore, planOf, isPaid, isUnlimited, PLAN_UNLIMITED, StoreError };
