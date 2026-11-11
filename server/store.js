'use strict';

// Accounts, usage counts and subscription status, in one SQLite file.
// Uses Node's built-in node:sqlite (Node 22.13+), so there is no native
// module to compile. DATA_DIR (default ./data) must be on a persistent disk
// in production, or accounts and usage reset on every deploy.

const fs = require('fs');
const path = require('path');

// node:sqlite prints an ExperimentalWarning on load; it is stable enough for
// this, so keep the log clean.
const emit = process.emitWarning;
process.emitWarning = (w, ...rest) => {
  if (String(w?.message ?? w).includes('SQLite')) return;
  emit.call(process, w, ...rest);
};
const { DatabaseSync } = require('node:sqlite');
process.emitWarning = emit;

/** Subscription statuses that count as a paid license. */
const ACTIVE = new Set(['active', 'trialing', 'past_due']);

function openStore(file) {
  if (file !== ':memory:') fs.mkdirSync(path.dirname(file), { recursive: true });
  const db = new DatabaseSync(file);
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA busy_timeout = 5000;
    CREATE TABLE IF NOT EXISTS users (
      id                  INTEGER PRIMARY KEY,
      google_sub          TEXT UNIQUE NOT NULL,
      email               TEXT,
      name                TEXT,
      picture             TEXT,
      created_at          INTEGER NOT NULL,
      last_login_at       INTEGER,
      strips_used         INTEGER NOT NULL DEFAULT 0,
      downloads_used      INTEGER NOT NULL DEFAULT 0,
      stripe_customer_id  TEXT UNIQUE,
      subscription_id     TEXT,
      subscription_status TEXT,
      current_period_end  INTEGER,
      cancel_at_period_end INTEGER NOT NULL DEFAULT 0
    );
  `);

  const q = {
    byId: db.prepare('SELECT * FROM users WHERE id = ?'),
    bySub: db.prepare('SELECT * FROM users WHERE google_sub = ?'),
    byCustomer: db.prepare('SELECT * FROM users WHERE stripe_customer_id = ?'),
    insert: db.prepare(`INSERT INTO users (google_sub, email, name, picture, created_at, last_login_at)
                        VALUES (?, ?, ?, ?, ?, ?)`),
    touch: db.prepare('UPDATE users SET email = ?, name = ?, picture = ?, last_login_at = ? WHERE id = ?'),
    setCustomer: db.prepare('UPDATE users SET stripe_customer_id = ? WHERE id = ?'),
    setSub: db.prepare(`UPDATE users SET subscription_id = ?, subscription_status = ?, current_period_end = ?,
                        cancel_at_period_end = ? WHERE id = ?`),
  };
  const column = { strip: 'strips_used', download: 'downloads_used' };
  const take = {
    strip: db.prepare('UPDATE users SET strips_used = strips_used + 1 WHERE id = ? AND strips_used < ?'),
    download: db.prepare('UPDATE users SET downloads_used = downloads_used + 1 WHERE id = ? AND downloads_used < ?'),
  };
  const give = {
    strip: db.prepare('UPDATE users SET strips_used = MAX(strips_used - 1, 0) WHERE id = ?'),
    download: db.prepare('UPDATE users SET downloads_used = MAX(downloads_used - 1, 0) WHERE id = ?'),
  };

  return {
    db,
    getUser: (id) => q.byId.get(id) || null,
    userByCustomer: (cid) => q.byCustomer.get(cid) || null,

    /** Find or create the account for a Google identity, refreshing its profile. */
    upsertGoogleUser({ sub, email, name, picture }) {
      const now = Date.now();
      const found = q.bySub.get(sub);
      if (found) {
        q.touch.run(email ?? null, name ?? null, picture ?? null, now, found.id);
        return q.byId.get(found.id);
      }
      const r = q.insert.run(sub, email ?? null, name ?? null, picture ?? null, now, now);
      return q.byId.get(r.lastInsertRowid);
    },

    setCustomer: (userId, customerId) => q.setCustomer.run(customerId, userId),

    setSubscription(userId, sub) {
      q.setSub.run(sub.id ?? null, sub.status ?? null, sub.periodEnd ?? null, sub.cancelAtPeriodEnd ? 1 : 0, userId);
    },

    /**
     * Count one use of `kind` ('strip' | 'download'). Paid users are always
     * allowed; free users only while under `freeLimit`. The check and the
     * increment are one statement, so parallel requests can't both get the
     * last free use.
     */
    consume(userId, kind, freeLimit) {
      const user = q.byId.get(userId);
      if (!user) return false;
      if (isPro(user)) {
        db.prepare(`UPDATE users SET ${column[kind]} = ${column[kind]} + 1 WHERE id = ?`).run(userId);
        return true;
      }
      return take[kind].run(userId, freeLimit).changes === 1;
    },

    /** Give back a use that didn't produce a file (failed or cancelled). */
    refund: (userId, kind) => give[kind].run(userId),
  };
}

function isPro(user) {
  if (!user || !ACTIVE.has(user.subscription_status)) return false;
  // A day of slack past the period end, in case a renewal webhook is late.
  return !user.current_period_end || user.current_period_end * 1000 + 86400000 > Date.now();
}

module.exports = { openStore, isPro };
