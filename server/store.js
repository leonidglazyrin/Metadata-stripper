'use strict';

// Accounts, paid plans (Basic / Pro) and usage counts, stored in Cloudflare D1.
//
// The container (and a self-hosted server) reaches D1 over Cloudflare's HTTP
// API (d1Http), so it works anywhere with no extra dependency and nothing
// kept on local disk. The Worker uses its D1 binding instead (d1Binding). The schema is in
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

/**
 * A D1 client over a Worker's D1 binding (env.DB), same shape as d1Http.
 * Note: the binding's `changes` also counts rows written by triggers (an
 * upsert of usage_counters reports 2), so callers test `changes > 0`.
 */
function d1Binding(db) {
  if (!db || typeof db.prepare !== 'function') throw new StoreError('The DB (D1) binding is missing, see wrangler.jsonc');
  return async function query(sql, params = []) {
    let r;
    try {
      r = await db.prepare(sql).bind(...params).all();
    } catch (e) {
      throw new StoreError(`D1: ${e.message}`);
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
  const isUuid = (id) => typeof id === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
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
      return changes > 0;
    },

    /** Give back a use that didn't produce a file (failed or cancelled). */
    async refund(userId, kind) {
      await query('UPDATE usage_counters SET used = used - 1 WHERE user_id = ?1 AND kind = ?2 AND used > 0', [userId, kind]);
    },

    // --- strip packs (migrations/0003_strip_packs.sql)

    /**
     * Add a pack's on-device strips to an account. `id` is the Stripe
     * Checkout session id, so the same purchase is only counted once.
     * Returns true when this call added them.
     */
    async grantStripPack(userId, { id, strips, amountCents = null, currency = null }) {
      const { changes } = await query(
        `INSERT INTO strip_pack_purchases (id, user_id, strips, amount_cents, currency)
         SELECT ?1, ?2, ?3, ?4, ?5 WHERE EXISTS (SELECT 1 FROM profiles WHERE id = ?2)
         ON CONFLICT (id) DO NOTHING`,
        [id, userId, strips, amountCents, currency],
      );
      return changes > 0;
    },

    /**
     * Spend one pack credit, if the account has one left. One statement that
     * checks the balance and records the use, so it can't be raced. Returns
     * the use's id (to give it back with refundCredit), or null.
     */
    async useCredit(userId) {
      const id = uuid();
      const { changes } = await query(
        `INSERT INTO strip_credit_uses (id, user_id)
         SELECT ?1, ?2
         WHERE (SELECT COALESCE(SUM(strips), 0) FROM strip_pack_purchases WHERE user_id = ?2)
             > (SELECT COUNT(*) FROM strip_credit_uses WHERE user_id = ?2 AND refunded_at IS NULL)`,
        [id, userId],
      );
      return changes > 0 ? id : null;
    },

    /**
     * Give back a credit whose strip failed. Only the account's own, only
     * once, and only within `maxAgeSec` of using it. Returns true if given back.
     */
    async refundCredit(userId, useId, maxAgeSec = 3600) {
      if (!isUuid(useId)) return false;
      const { changes } = await query(
        `UPDATE strip_credit_uses SET refunded_at = unixepoch()
         WHERE id = ?1 AND user_id = ?2 AND refunded_at IS NULL AND created_at > unixepoch() - ?3`,
        [useId, userId, maxAgeSec],
      );
      return changes > 0;
    },

    // --- site-wide free trial cap (migrations/0004_free_trial_cap.sql)

    /**
     * Take one of today's (UTC) free server strips / downloads, if fewer than
     * `cap` were taken. One statement, so it can't be raced. True when taken.
     */
    async takeFreeTrial(cap) {
      const { changes } = await query(
        `INSERT INTO free_trial_days (day, used) SELECT date('now'), 1 WHERE ?1 >= 1
         ON CONFLICT (day) DO UPDATE SET used = used + 1 WHERE free_trial_days.used < ?1`,
        [Math.max(0, Number(cap) || 0)],
      );
      return changes > 0;
    },

    /** Free trials taken today (UTC). */
    async freeTrialsToday() {
      const row = await first("SELECT used FROM free_trial_days WHERE day = date('now')", []);
      return Number(row?.used ?? 0);
    },

    /**
     * Whether this account started download job `jobId` within the last
     * `maxAgeSec` (its history row names the job), so a free account can
     * follow its own trial download and nothing else.
     */
    async ownsRecentJob(userId, jobId, maxAgeSec) {
      if (!isUuid(userId) || !isUuid(jobId)) return false;
      return Boolean(await first(
        'SELECT 1 AS ok FROM download_history WHERE user_id = ?1 AND job_id = ?2 AND created_at > unixepoch() - ?3 LIMIT 1',
        [userId, jobId, maxAgeSec],
      ));
    },

    /** Whether the account has a download the container may still hold (pending or ready, recent). */
    async hasLiveDownload(userId, platform, maxAgeSec) {
      if (!isUuid(userId)) return false;
      return Boolean(await first(
        `SELECT 1 AS ok FROM download_history WHERE user_id = ?1 AND (?2 IS NULL OR platform = ?2) AND job_id IS NOT NULL
           AND status IN ('pending', 'ready') AND created_at > unixepoch() - ?3 LIMIT 1`,
        [userId, platform ?? null, maxAgeSec],
      ));
    },

    /**
     * The session signing secret kept in app_settings, for a deploy without
     * SESSION_SECRET. The first caller's candidate wins; everyone gets that one.
     */
    async sessionSecret(candidate) {
      await query(
        "INSERT OR IGNORE INTO app_settings (key, value, note) VALUES ('session_secret', ?1, 'Signs session cookies when SESSION_SECRET is not set. Changing it signs everyone out.')",
        [JSON.stringify(candidate)],
      );
      const row = await first("SELECT value FROM app_settings WHERE key = 'session_secret'");
      const value = row ? JSON.parse(row.value) : '';
      if (typeof value !== 'string' || value.length < 32) throw new Error('D1: app_settings.session_secret is missing or too short');
      return value;
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

    // --- download rows (migrations/0002_download_history.sql)

    /** The account's newest rows for one platform. */
    async listDownloads(userId, platform, limit = 50) {
      const n = Math.min(Math.max(Number(limit) || 50, 1), 200);
      const { rows } = await query(
        `SELECT id, user_id, platform, url, mode, name, job_id, status, message, created_at, updated_at
         FROM download_history WHERE user_id = ?1 AND platform = ?2
         ORDER BY created_at DESC, rowid DESC LIMIT ?3`,
        [userId, platform, n],
      );
      return rows;
    },

    /**
     * Insert or update a row; fields left out keep their value. A row id that
     * belongs to another account is left alone.
     */
    async saveDownload(userId, row) {
      if (!isUuid(userId) || !isUuid(row.id)) return;
      await query(
        `INSERT INTO download_history (id, user_id, platform, url, mode, name, job_id, status, message)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, COALESCE(?8, 'pending'), ?9)
         ON CONFLICT (id) DO UPDATE SET
           name = COALESCE(excluded.name, download_history.name),
           job_id = COALESCE(?7, download_history.job_id),
           status = COALESCE(?8, download_history.status),
           message = CASE WHEN ?8 IS NULL THEN download_history.message ELSE ?9 END,
           updated_at = unixepoch()
         WHERE download_history.user_id = ?2`,
        [row.id, userId, row.platform, row.url, row.mode, row.name ?? null, row.jobId ?? null, row.status ?? null, row.message ?? null],
      );
    },

    /** Delete rows by id, or all of a platform's when ids is null. Returns their job ids. */
    async deleteDownloads(userId, platform, ids = null) {
      const list = ids && ids.filter(isUuid);
      if (list && !list.length) return [];
      const { rows } = await query(
        `DELETE FROM download_history WHERE user_id = ?1 AND platform = ?2
           AND (?3 IS NULL OR id IN (SELECT value FROM json_each(?3)))
         RETURNING job_id`,
        [userId, platform, list ? JSON.stringify(list) : null],
      );
      return rows.map((r) => r.job_id).filter(Boolean);
    },

    async pruneDownloads(days = 30) {
      await query('DELETE FROM download_history WHERE created_at < unixepoch() - ?1 * 86400', [Math.max(1, Number(days) || 30)]);
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

module.exports = { createStore, d1Http, d1Binding, planOf, isPaid, isUnlimited, PLAN_UNLIMITED, StoreError };
