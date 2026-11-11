-- Download rows per account, so a signed-in user sees their downloads on any
-- device and after a reload.
--
-- Only the row is kept here (link, name, state). The downloaded file itself
-- stays on the server for DOWNLOAD_TTL_MIN and is then purged as before; an
-- old row then shows "Expired" with a retry button. Rows older than 30 days
-- are deleted by the server every hour. Safe to run again.

CREATE TABLE IF NOT EXISTS download_history (
  id         TEXT PRIMARY KEY,                       -- the row id the page made (UUID)
  user_id    TEXT NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
  platform   TEXT NOT NULL CHECK (platform IN ('youtube', 'x', 'instagram', 'tiktok')),
  url        TEXT NOT NULL,
  mode       TEXT NOT NULL CHECK (mode IN ('video', 'audio')),
  name       TEXT,
  job_id     TEXT,                                   -- the server's download job, while it has one
  status     TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'ready', 'error')),
  message    TEXT,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);
CREATE INDEX IF NOT EXISTS download_history_user_idx ON download_history (user_id, platform, created_at);
