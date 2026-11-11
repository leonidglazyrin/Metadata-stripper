'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const express = require('express');
const { createDownloadRouter, displayName } = require('../server/downloaders');
const { createStore, d1Http } = require('../server/store');
const { fakeD1 } = require('./fake-d1');

/** Read the download_history table of a fake D1 database. */
function historyOf(db) {
  const get = (id) => {
    const r = db.db.prepare('SELECT * FROM download_history WHERE id = ?').get(id);
    return r ? { ...r } : undefined;
  };
  return {
    get,
    has: (id) => Boolean(get(id)),
    get size() { return db.db.prepare('SELECT COUNT(*) AS n FROM download_history').get().n; },
    insert(row) {
      db.db.prepare(`INSERT INTO download_history (id, user_id, platform, url, mode, name, job_id, status, message)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(row.id, row.user_id, row.platform, row.url, row.mode, row.name, row.job_id, row.status, row.message);
    },
  };
}

test('TikTok rows: account name, no hashtags, then a short bit of the caption', () => {
  assert.equal(displayName('POV: the dog finally gets it #fyp #dogsoftiktok #funny', 'Rex the Dog', 'tiktok'), 'Rex the Dog - POV: the dog finally gets it');
  assert.equal(displayName('#fyp #viral', 'someone', 'tiktok'), 'someone');
  assert.equal(displayName('TikTok video #7301234567890', 'someone', 'tiktok'), 'someone');
  assert.equal(displayName('', '', 'tiktok'), null);
  const long = displayName('This is a really long caption that goes on and on about my morning routine and coffee #coffee', 'barista', 'tiktok');
  assert.match(long, /^barista - This is a really long caption that goes on and on about my…$/);
  assert.ok([...long.split(' - ')[1]].length <= 61);
  // Other platforms keep "Title - Channel".
  assert.equal(displayName('My video', 'Channel', 'youtube'), 'My video - Channel');
});

async function server(t, { user }) {
  const db = fakeD1();
  const store = createStore({ query: d1Http({ accountId: db.accountId, databaseId: db.databaseId, apiToken: db.apiToken, fetchImpl: db.fetch }) });
  const fake = { db, history: historyOf(db) };
  const owner = await store.upsertGoogleUser({ sub: 'g-1', email: 'a@example.com' });
  const other = await store.upsertGoogleUser({ sub: 'g-2', email: 'b@example.com' });
  const who = { current: owner };
  const app = express();
  // An async gate, like the real one (it reads the account from the database).
  const gate = async (req, _res, next) => {
    await new Promise((ok) => setTimeout(ok, 5));
    req.quota = { refund() {}, refundUnlessSent() {} };
    next();
  };
  app.use('/api/download', createDownloadRouter(path.join(os.tmpdir(), `ms-test-${crypto.randomUUID()}`), {
    gate,
    currentUser: async () => (user ? who.current : null),
    history: store,
  }));
  const srv = app.listen(0);
  t.after(() => srv.close());
  const base = `http://127.0.0.1:${srv.address().port}/api/download`;
  const call = async (method, p, body) => {
    const res = await fetch(base + p, { method, headers: body ? { 'content-type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined });
    const text = await res.text();
    return { status: res.status, body: text ? JSON.parse(text) : null };
  };
  return { call, fake, owner, other, who };
}

const until = async (fn) => {
  for (let i = 0; i < 200; i++) {
    const v = await fn();
    if (v) return v;
    await new Promise((ok) => setTimeout(ok, 25));
  }
  throw new Error('timed out');
};

test('downloads are kept per account and only that account sees them', async (t) => {
  const { call, fake, owner, other, who } = await server(t, { user: true });
  const rowId = crypto.randomUUID();

  // The async gate lets the job start (it used to be read synchronously).
  const started = await call('POST', '/tiktok/jobs', { url: 'https://www.tiktok.com/@a/video/1', mode: 'video', rowId });
  assert.equal(started.status, 202);
  const jobId = started.body.id;

  const saved = fake.history.get(rowId);
  assert.equal(saved.user_id, owner.id);
  assert.equal(saved.platform, 'tiktok');
  assert.equal(saved.job_id, jobId);

  // yt-dlp isn't installed here, so the job fails; the row records that.
  await until(() => fake.history.get(rowId).status === 'error');

  const mine = await call('GET', '/history/tiktok');
  assert.equal(mine.status, 200);
  assert.equal(mine.body.enabled, true);
  assert.deepEqual(mine.body.rows.map((r) => [r.id, r.serverId, r.status]), [[rowId, jobId, 'error']]);
  assert.equal((await call('GET', `/jobs/${jobId}`)).status, 200);

  // Another account sees neither the row nor the job.
  who.current = other;
  assert.deepEqual((await call('GET', '/history/tiktok')).body.rows, []);
  assert.equal((await call('GET', `/jobs/${jobId}`)).status, 404);
  assert.equal((await call('GET', `/jobs/${jobId}/file`)).status, 404);
  await call('DELETE', `/history/tiktok/${rowId}`);
  assert.ok(fake.history.has(rowId), 'another account cannot delete the row');

  // The owner removes it.
  who.current = owner;
  assert.equal((await call('DELETE', `/history/tiktok/${rowId}`)).status, 204);
  assert.equal(fake.history.has(rowId), false);
  assert.equal((await call('GET', `/jobs/${jobId}`)).status, 404);
});

test('a row whose job the server no longer has comes back as expired', async (t) => {
  const { call, fake, owner } = await server(t, { user: true });
  const id = crypto.randomUUID();
  fake.history.insert({ id, user_id: owner.id, platform: 'youtube', url: 'https://youtu.be/x', mode: 'video', name: 'Old - Chan', job_id: crypto.randomUUID(), status: 'ready', message: null });
  const h = await call('GET', '/history/youtube');
  assert.deepEqual(h.body.rows, [{ id, url: 'https://youtu.be/x', mode: 'video', name: 'Old - Chan', serverId: null, status: 'expired', message: null }]);
  assert.equal((await call('DELETE', '/history/youtube')).status, 204);
  assert.equal(fake.history.size, 0);
});

test('signed out: no history, and no rows are written', async (t) => {
  const { call, fake } = await server(t, { user: false });
  assert.deepEqual((await call('GET', '/history/x')).body, { enabled: false, rows: [] });
  const r = await call('POST', '/x/jobs', { url: 'https://x.com/a/status/1', mode: 'video', rowId: crypto.randomUUID() });
  assert.equal(r.status, 202);
  assert.equal(fake.history.size, 0);
});

test('D1 download rows: other accounts cannot overwrite, delete by ids, prune old rows', async () => {
  const db = fakeD1();
  const store = createStore({ query: d1Http({ accountId: db.accountId, databaseId: db.databaseId, apiToken: db.apiToken, fetchImpl: db.fetch }) });
  const a = await store.upsertGoogleUser({ sub: 'g-a', email: 'a@x' });
  const b = await store.upsertGoogleUser({ sub: 'g-b', email: 'b@x' });
  const [id1, id2] = [crypto.randomUUID(), crypto.randomUUID()];
  await store.saveDownload(a.id, { id: id1, platform: 'x', url: 'https://x.com/a/status/1', mode: 'video', jobId: 'job1' });
  await store.saveDownload(a.id, { id: id2, platform: 'x', url: 'https://x.com/a/status/2', mode: 'audio', jobId: 'job2' });
  await store.saveDownload(a.id, { id: id1, platform: 'x', url: 'https://x.com/a/status/1', mode: 'video', status: 'ready', name: 'Clip - Me' });
  await store.saveDownload(b.id, { id: id1, platform: 'x', url: 'https://evil', mode: 'video', status: 'error', message: 'nope' });
  let rows = await store.listDownloads(a.id, 'x');
  assert.deepEqual(rows.map((r) => [r.id, r.status, r.name, r.job_id]).sort(), [[id1, 'ready', 'Clip - Me', 'job1'], [id2, 'pending', null, 'job2']].sort());
  assert.deepEqual(await store.listDownloads(b.id, 'x'), []);
  assert.deepEqual(await store.deleteDownloads(b.id, 'x', [id1]), []);
  assert.deepEqual(await store.deleteDownloads(a.id, 'x', [id1, 'not-a-uuid']), ['job1']);
  db.db.exec('UPDATE download_history SET created_at = unixepoch() - 40 * 86400');
  await store.pruneDownloads(30);
  rows = await store.listDownloads(a.id, 'x');
  assert.equal(rows.length, 0);
});
