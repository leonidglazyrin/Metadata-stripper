-- Strip packs: a one-time $2 purchase that adds 10 on-device strips to an
-- account. A pack can be bought any number of times and the strips add up.
--
-- Credits are a ledger, not a stored balance: the balance is the strips
-- bought (strip_pack_purchases) minus the credits used and not given back
-- (strip_credit_uses). Using a credit is one INSERT that checks the balance
-- in the same statement, so two parallel requests can't both take the last
-- one. A purchase row's id is the Stripe Checkout session id, so a webhook
-- delivered twice adds the strips once.
--
-- Credits are only used once the free on-device strips are spent, and never
-- while a Basic or Pro subscription already makes on-device stripping
-- unlimited.
--
-- Apply with:
--   npx wrangler d1 execute sharona --remote --file migrations/0003_strip_packs.sql
-- Safe to run again.

CREATE TABLE IF NOT EXISTS strip_pack_purchases (
  id           TEXT PRIMARY KEY,                     -- Stripe Checkout session id (cs_...), dev_pack_... in dev
  user_id      TEXT NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
  strips       INTEGER NOT NULL CHECK (strips > 0),  -- on-device strips this purchase added
  amount_cents INTEGER,                              -- what Stripe charged, for support
  currency     TEXT,
  created_at   INTEGER NOT NULL DEFAULT (unixepoch())
);
CREATE INDEX IF NOT EXISTS strip_pack_purchases_user_idx ON strip_pack_purchases (user_id, created_at);

-- One row per credit spent. refunded_at is set when the strip failed and the
-- credit was given back.
CREATE TABLE IF NOT EXISTS strip_credit_uses (
  id          TEXT PRIMARY KEY,                      -- random UUID, handed to the page so it can give a failed one back
  user_id     TEXT NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
  created_at  INTEGER NOT NULL DEFAULT (unixepoch()),
  refunded_at INTEGER
);
CREATE INDEX IF NOT EXISTS strip_credit_uses_user_idx ON strip_credit_uses (user_id, refunded_at);

-- The accounts view again, with the pack columns added at the end:
--   strip_credits  on-device strips left from packs
--   strip_packs    packs bought, all time
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
  COALESCE((SELECT used FROM usage_counters u WHERE u.user_id = p.id AND u.kind = 'server_strip'), 0) AS server_strips_used,
  COALESCE((SELECT SUM(strips) FROM strip_pack_purchases b WHERE b.user_id = p.id), 0)
    - (SELECT COUNT(*) FROM strip_credit_uses c WHERE c.user_id = p.id AND c.refunded_at IS NULL) AS strip_credits,
  (SELECT COUNT(*) FROM strip_pack_purchases b WHERE b.user_id = p.id) AS strip_packs
FROM profiles p
LEFT JOIN subscriptions s ON s.id = (
  SELECT id FROM subscriptions x
  WHERE x.user_id = p.id
  ORDER BY x.status IN ('active', 'trialing', 'past_due') DESC, x.tier = 'pro' DESC, x.updated_at DESC, x.rowid DESC
  LIMIT 1
);
