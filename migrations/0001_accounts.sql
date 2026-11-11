-- Sharona accounts, paid plans and free-usage tracking (Cloudflare D1).
--
--   basic ($10/month): unlimited on-device stripping.
--   pro   ($20/month): unlimited everything: on-device and server stripping,
--                      and video downloads.
-- Free accounts get free_strips on-device strips, free_server_strips server
-- strips and free_downloads downloads (see app_settings).
--
-- Apply with:
--   npx wrangler d1 execute sharona --remote --file migrations/0001_accounts.sql
-- Every statement is "IF NOT EXISTS" / "OR IGNORE", so running it again is safe.
--
-- Only the server reaches this database, through Cloudflare's D1 API with an
-- API token scoped to D1. Nothing here is exposed to the browser.
-- Times are Unix seconds.

-- One row per person who signed in with Google.
CREATE TABLE IF NOT EXISTS profiles (
  id                 TEXT PRIMARY KEY,               -- random UUID
  google_sub         TEXT NOT NULL UNIQUE,           -- Google's stable user id ("dev:<email>" for dev sign-ins)
  email              TEXT,
  name               TEXT,
  picture            TEXT,
  stripe_customer_id TEXT UNIQUE,
  created_at         INTEGER NOT NULL DEFAULT (unixepoch()),
  last_login_at      INTEGER
);

-- Stripe subscriptions, kept in sync by the /api/billing/webhook endpoint.
CREATE TABLE IF NOT EXISTS subscriptions (
  id                   TEXT PRIMARY KEY,             -- Stripe subscription id (sub_...)
  user_id              TEXT NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
  status               TEXT NOT NULL,                -- active, trialing, past_due, canceled, ...
  tier                 TEXT NOT NULL DEFAULT 'pro' CHECK (tier IN ('basic', 'pro')),
  price_id             TEXT,
  current_period_end   INTEGER,
  cancel_at_period_end INTEGER NOT NULL DEFAULT 0,
  created_at           INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at           INTEGER NOT NULL DEFAULT (unixepoch())
);
CREATE INDEX IF NOT EXISTS subscriptions_user_id_idx ON subscriptions (user_id, updated_at);

-- How many uses each account has made (all time). 'strip' is an on-device
-- strip, 'server_strip' one done on our server.
CREATE TABLE IF NOT EXISTS usage_counters (
  user_id TEXT NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
  kind    TEXT NOT NULL CHECK (kind IN ('strip', 'server_strip', 'download')),
  used    INTEGER NOT NULL DEFAULT 0 CHECK (used >= 0),
  PRIMARY KEY (user_id, kind)
);

-- Every use (+1) and refund (-1), written by the triggers below.
CREATE TABLE IF NOT EXISTS usage_events (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    TEXT NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
  kind       TEXT NOT NULL,
  delta      INTEGER NOT NULL,
  tier       TEXT,                                   -- paid plan at the time, NULL if free
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);
CREATE INDEX IF NOT EXISTS usage_events_user_id_idx ON usage_events (user_id, created_at);

CREATE TRIGGER IF NOT EXISTS usage_counters_insert_event AFTER INSERT ON usage_counters
BEGIN
  INSERT INTO usage_events (user_id, kind, delta, tier) VALUES (NEW.user_id, NEW.kind, NEW.used,
    (SELECT s.tier FROM subscriptions s WHERE s.user_id = NEW.user_id AND s.status IN ('active', 'trialing', 'past_due')
     AND (s.current_period_end IS NULL OR s.current_period_end > unixepoch() - 86400) ORDER BY s.tier = 'pro' DESC LIMIT 1));
END;

CREATE TRIGGER IF NOT EXISTS usage_counters_update_event AFTER UPDATE OF used ON usage_counters
WHEN NEW.used <> OLD.used
BEGIN
  INSERT INTO usage_events (user_id, kind, delta, tier) VALUES (NEW.user_id, NEW.kind, NEW.used - OLD.used,
    (SELECT s.tier FROM subscriptions s WHERE s.user_id = NEW.user_id AND s.status IN ('active', 'trialing', 'past_due')
     AND (s.current_period_end IS NULL OR s.current_period_end > unixepoch() - 86400) ORDER BY s.tier = 'pro' DESC LIMIT 1));
END;

-- Settings you can change without a deploy. The free allowance is per
-- account, all time. Change it with:
--   npx wrangler d1 execute sharona --remote --command "UPDATE app_settings SET value = '3' WHERE key = 'free_downloads'"
-- Running servers re-read this table every minute.
CREATE TABLE IF NOT EXISTS app_settings (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL,                          -- JSON
  note       TEXT,
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);
INSERT OR IGNORE INTO app_settings (key, value, note) VALUES
  ('free_strips', '1', 'Free on-device strips per account'),
  ('free_server_strips', '1', 'Free server strips per account'),
  ('free_downloads', '1', 'Free video downloads per account');

-- One flat row per account with its best subscription (a paid one first,
-- Pro before Basic, then the newest) and usage counts. The server reads accounts from here.
DROP VIEW IF EXISTS accounts;
CREATE VIEW accounts AS
SELECT
  p.id,
  p.google_sub,
  p.email,
  p.name,
  p.picture,
  p.stripe_customer_id,
  p.created_at,
  p.last_login_at,
  s.id                                   AS subscription_id,
  s.status                               AS subscription_status,
  s.current_period_end                   AS current_period_end,
  COALESCE(s.cancel_at_period_end, 0)    AS cancel_at_period_end,
  COALESCE((SELECT used FROM usage_counters u WHERE u.user_id = p.id AND u.kind = 'strip'), 0)    AS strips_used,
  COALESCE((SELECT used FROM usage_counters u WHERE u.user_id = p.id AND u.kind = 'download'), 0) AS downloads_used,
  s.tier                                 AS subscription_tier,
  s.price_id                             AS subscription_price_id,
  COALESCE((SELECT used FROM usage_counters u WHERE u.user_id = p.id AND u.kind = 'server_strip'), 0) AS server_strips_used
FROM profiles p
LEFT JOIN subscriptions s ON s.id = (
  SELECT id FROM subscriptions x
  WHERE x.user_id = p.id
  ORDER BY x.status IN ('active', 'trialing', 'past_due') DESC, x.tier = 'pro' DESC, x.updated_at DESC, x.rowid DESC
  LIMIT 1
);
