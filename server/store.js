'use strict';

// Accounts, paid plans (Basic / Pro) and usage counts, stored in Cloudflare D1.
//
// The server reaches D1 over Cloudflare's HTTP API, so it works from any
// container (Cloudflare Containers, Vercel, Fly, ...) with no extra
// dependency and nothing kept on local disk. The schema is in
// migrations/0001_accounts.sql. Every write is a single SQL statement, and D1
// runs statements one at a time, so the free-use check can't be raced.

/** Subscription statuses that count as a paid license. */
const ACTIVE = new Set(['active', 'trialing', 'past_due']);
const ACTIVE_SQL = "('active', 'trialing', 'past_due')";

const SETTINGS_TTL_MS = 60_000;

class StoreError extends Error {}

/**
 * A D1 client over the REST API:
 * POST /accounts/:account/d1/database/:db/query  { sql, params }
 */
function d1Http({ accountId, databaseId, apiToken, fetchImpl = fetch, timeoutMs = 10_000, apiBase = 'https://api.cloudflare.com/client/v4' }) {
  if (!accountId || !databaseId || !apiToken) {
    throw new StoreError('CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_D1_DATABASE_ID and CLOUDFLARE_API_TOKEN must be set (see docs/accounts-and-billing.md)');
  }
  const url = `${apiBase}/accounts/${encodeURIComponent(accountId)}/d1/database/${encodeURIComponent(databaseId)}/query`;
  return async function query(sql, params = []) {
    let res;
    try {
      res = await fetchImpl(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql, params }),
        signal: AbortSignal.timeout(timeoutMs),
      });
    } catch (e) {
      throw new StoreError(`D1: ${e.message}`);
    }
    const data = await res.json().catch(() => null);
    const r = data?.result?.[0];
    if (!res.ok || !data?.success || !r || r.success === false) {
      const why = data?.errors?.map((e) => e.message).join('; ') || r?.error || `HTTP ${res.status}`;
      throw new StoreError(`D1: ${why}`);
    }
    return { rows: r.results || [], changes: r.meta?.changes ?? 0 };
  };
}

// True when the account's current paid plan includes this kind of use
// (?1 = user id, ?2 = kind). Mirrors PLAN_UNLIMITED below.
const UNLIMITED_SQL = `EXISTS (SELECT 1 FROM subscriptions s WHERE s.user_id = ?1 AND s.status IN ${ACTIVE_SQL}
  AND (s.current_period_end IS NULL OR s.current_period_end > unixepoch() - 86400)
  AND (s.tier = 'pro' OR (s.tier = 'basic' AND ?2 = 'strip')))`;

/**
 * @param {{ query: (sql: string, params?: unknown[]) => Promise<{ rows: object[], changes: number }> }} opts
 */
function createStore({ query, uuid = () => crypto.randomUUID() }) {
  const first = async (sql, params) => (await query(sql, params)).rows[0] || null;
  const getUser = async (id) => (typeof id === 'string' && id ? first('SELECT * FROM accounts WHERE id = ?1', [id]) : null);

  let settings = null;
  let settingsAt = 0;

  return {
    /** The account row (see the `accounts` view), or null. */
    getUser,

    userByCustomer: (customerId) => first('SELECT * FROM accounts WHERE stripe_customer_id = ?1', [customerId]),

    /** Find or create the account for a Google identity, refreshing its profile. */
    async upsertGoogleUser({ sub, email, name, picture }) {
      const row = await first(
        `INSERT INTO profiles (id, google_sub, email, name, picture, last_login_at) VALUES (?1, ?2, ?3, ?4, ?5, unixepoch())
         ON CONFLICT (google_sub) DO UPDATE SET email = excluded.email, name = excluded.name,
           picture = excluded.picture, last_login_at = excluded.last_login_at
         RETURNING id`,
        [uuid(), sub, email ?? null, name ?? null, picture ?? null],
      );
      return getUser(row.id);
    },

    async setCustomer(userId, customerId) {
      await query('UPDATE profiles SET stripe_customer_id = ?2 WHERE id = ?1', [userId, customerId]);
    },

    async setSubscription(userId, sub) {
      await query(
        `INSERT INTO subscriptions (id, user_id, status, current_period_end, cancel_at_period_end, price_id, tier, updated_at)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, unixepoch())
         ON CONFLICT (id) DO UPDATE SET user_id = excluded.user_id, status = excluded.status,
           current_period_end = excluded.current_period_end, cancel_at_period_end = excluded.cancel_at_period_end,
           price_id = COALESCE(excluded.price_id, subscriptions.price_id), tier = excluded.tier,
           updated_at = excluded.updated_at`,
        [sub.id, userId, sub.status, sub.periodEnd ?? null, sub.cancelAtPeriodEnd ? 1 : 0, sub.priceId ?? null,
          sub.tier === 'basic' ? 'basic' : 'pro'],
      );
    },

    /**
     * Count one use of `kind` ('strip' = on-device, 'server_strip' or
     * 'download'). Always allowed when the account's plan includes it (see
     * PLAN_UNLIMITED), otherwise only while under `freeLimit`. One statement,
     * so two parallel requests can't both take the last free use.
     */
    async consume(userId, kind, freeLimit) {
      const { changes } = await query(
        `INSERT INTO usage_counters (user_id, kind, used)
         SELECT ?1, ?2, 1 WHERE EXISTS (SELECT 1 FROM profiles WHERE id = ?1) AND (${UNLIMITED_SQL} OR ?3 >= 1)
         ON CONFLICT (user_id, kind) DO UPDATE SET used = used + 1
         WHERE ${UNLIMITED_SQL} OR usage_counters.used < ?3`,
        [userId, kind, freeLimit],
      );
      return changes === 1;
    },

    /** Give back a use that didn't produce a file (failed or cancelled). */
    async refund(userId, kind) {
      await query('UPDATE usage_counters SET used = used - 1 WHERE user_id = ?1 AND kind = ?2 AND used > 0', [userId, kind]);
    },

    /** Rows of the app_settings table as { key: value }, cached for a minute. */
    async settings(now = Date.now()) {
      if (settings && now - settingsAt < SETTINGS_TTL_MS) return settings;
      try {
        const { rows } = await query('SELECT key, value FROM app_settings');
        const out = {};
        for (const { key, value } of rows) {
          try { out[key] = JSON.parse(value); } catch { out[key] = value; }
        }
        settings = out;
        settingsAt = now;
      } catch (e) {
        if (!settings) throw e;
        // Keep serving the last values if D1 hiccups.
      }
      return settings;
    },
  };
}

/** What each paid plan includes without limits. Mirrors UNLIMITED_SQL above. */
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

module.exports = { createStore, d1Http, planOf, isPaid, isUnlimited, PLAN_UNLIMITED, StoreError };
