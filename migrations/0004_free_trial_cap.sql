-- A site-wide cap on free server strips and downloads: they run in the
-- container (ffmpeg, sharp, yt-dlp), which costs money while it's awake, so
-- free accounts together get at most free_trials_per_day of them per UTC day
-- (default 10). Pro (and anything a plan covers) is never counted here.
--
-- The Worker takes one slot with a single statement that checks the cap and
-- counts the use, before it lets the request reach the container, so two
-- parallel requests can't both take the last one.
--
-- Change the cap without a deploy:
--   npx wrangler d1 execute sharona --remote --command "UPDATE app_settings SET value = '20', updated_at = unixepoch() WHERE key = 'free_trials_per_day'"
--
-- Apply with:
--   npx wrangler d1 execute sharona --remote --file migrations/0004_free_trial_cap.sql
-- Safe to run again.

CREATE TABLE IF NOT EXISTS free_trial_days (
  day  TEXT PRIMARY KEY,                -- UTC date, YYYY-MM-DD
  used INTEGER NOT NULL DEFAULT 0 CHECK (used >= 0)
);

INSERT OR IGNORE INTO app_settings (key, value, note) VALUES
  ('free_trials_per_day', '10', 'Free server strips + downloads per UTC day, for all free accounts together');
