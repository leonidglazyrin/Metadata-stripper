'use strict';

// node --test: the Worker in front of the container (worker/app.mjs). D1 is
// the local SQLite stand-in with the real migrations, the static files are a
// small in-memory map, and the container is a fake that records what reached
// it. The point: nothing reaches the container unless the Worker checked it,
// and on-device stripping never reaches it at all.

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { spawn } = require('child_process');
const { d1Http, createStore } = require('../server/store');
const { fakeD1 } = require('./fake-d1');

const SITE = 'https://sharona.test';
const SECRET = 'session-secret-for-tests';

const ASSET_FILES = {
  '/index.html': ['text/html', '<a href="__SITE_URL__/app/">__CONTACT_EMAIL__</a>'],
  '/app/index.html': ['text/html', '<title>app</title>__SITE_URL__'],
  '/es/index.html': ['text/html', '<title>es</title>'],
  '/guides/strip-synthid/index.html': ['text/html', '<title>guide</title>'],
  '/es/guides/strip-synthid/index.html': ['text/html', '<title>guía</title>'],
  '/pages.json': ['application/json', JSON.stringify([
    { path: '/guides/strip-synthid/', priority: '0.7', alternates: [{ code: 'en', path: '/guides/strip-synthid/' }, { code: 'es', path: '/es/guides/strip-synthid/' }] },
    { path: '/es/guides/strip-synthid/', priority: '0.7', alternates: [{ code: 'en', path: '/guides/strip-synthid/' }, { code: 'es', path: '/es/guides/strip-synthid/' }] },
  ])],
  '/landing-langs.json': ['application/json', JSON.stringify([{ code: 'en', path: '/' }, { code: 'es', path: '/es/' }])],
  '/assets/app-123.js': ['text/javascript', 'console.log(1)'],
  '/assets/ffmpeg-core-1.wasm.part0': ['application/octet-stream', 'wasm'],
};
const ASSETS = {
  async fetch(request) {
    const f = ASSET_FILES[new URL(request.url).pathname];
    return f ? new Response(f[1], { headers: { 'Content-Type': f[0] } }) : new Response('nope', { status: 404 });
  },
};

async function setup(env = {}) {
  const db = fakeD1();
  const query = d1Http({ accountId: db.accountId, databaseId: db.databaseId, apiToken: db.apiToken, fetchImpl: db.fetch });
  const store = createStore({ query });
  const reached = [];
  const { createApp, INTERNAL_HEADER, internalSecret } = await import('../worker/app.mjs');
  const fullEnv = { SITE_URL: SITE, SESSION_SECRET: SECRET, ASSETS, ...env };
  const app = createApp({
    env: fullEnv,
    query,
    // The container: counts the use like server/index.js's gate does.
    forward: async (req) => {
      reached.push({ method: req.method, path: new URL(req.url).pathname, secret: req.headers.get(INTERNAL_HEADER), body: req.body ? await req.text() : null });
      return new Response('from container', { status: 200 });
    },
  });
  const users = {};
  async function signIn(name, plan) {
    const u = await store.upsertGoogleUser({ sub: `g:${name}`, email: `${name}@test`, name });
    if (plan) await store.setSubscription(u.id, { id: `sub_${name}`, status: 'active', periodEnd: Math.floor(Date.now() / 1000) + 86400, tier: plan });
    users[name] = { id: u.id, cookie: `sh_sess=${encodeURIComponent(app.accounts.sessionToken(u.id))}` };
    return users[name];
  }
  const call = (method, p, { as, body, headers = {} } = {}) => app.fetch(new Request(SITE + p, {
    method,
    headers: { ...(as ? { cookie: as.cookie } : {}), ...headers },
    body,
  }));
  const upload = (as, size = 1000, extra = {}) => call('POST', '/api/strip', {
    as,
    body: 'x'.repeat(size),
    headers: { 'content-type': 'multipart/form-data; boundary=abc', 'content-length': String(size), ...extra },
  });
  const startDl = (as, url = 'https://www.youtube.com/watch?v=abc', platform = 'youtube') => call('POST', `/api/download/${platform}/jobs`, {
    as,
    body: JSON.stringify({ url, mode: 'video' }),
    headers: { 'content-type': 'application/json' },
  });
  return { app, db, store, reached, signIn, call, upload, startDl, secret: internalSecret(fullEnv) };
}

test('pages, static files and every on-device step are answered by the Worker alone', async () => {
  const s = await setup();
  const res = await s.call('GET', '/');
  assert.equal(res.status, 200);
  assert.equal(await res.text(), `<a href="${SITE}/app/">support@sharona.test</a>`);
  assert.equal((await s.call('GET', '/app/')).status, 200);
  assert.match(await (await s.call('GET', '/app/#strip')).text(), /sharona\.test/);
  assert.equal((await s.call('GET', '/app')).headers.get('location'), '/app/');
  assert.equal((await s.call('GET', '/es')).headers.get('location'), '/es/');
  assert.equal((await s.call('GET', '/es/')).status, 200);
  assert.equal((await s.call('GET', '/guides/strip-synthid')).headers.get('location'), '/guides/strip-synthid/');
  assert.equal((await s.call('GET', '/guides/strip-synthid/')).status, 200);
  assert.equal((await s.call('GET', '/guides/nope/')).status, 404);
  assert.equal((await s.call('GET', '/es/guides/strip-synthid/')).status, 200);
  assert.equal((await s.call('GET', '/es/guides/strip-synthid')).headers.get('location'), '/es/guides/strip-synthid/');
  assert.equal((await s.call('GET', '/fr/guides/strip-synthid/')).status, 404);
  assert.equal((await s.call('GET', '/nope')).status, 404);
  const js = await s.call('GET', '/assets/app-123.js');
  assert.match(js.headers.get('cache-control'), /immutable/);
  assert.equal((await s.call('GET', '/assets/ffmpeg-core-1.wasm.part0')).status, 200);
  const sitemap = await (await s.call('GET', '/sitemap.xml')).text();
  assert.match(sitemap, /<loc>https:\/\/sharona\.test\/es\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/sharona\.test\/es\/guides\/strip-synthid\/<\/loc>/);
  assert.match(sitemap, /hreflang="es" href="https:\/\/sharona\.test\/es\/guides\/strip-synthid\/"/);
  assert.match(sitemap, /hreflang="x-default" href="https:\/\/sharona\.test\/guides\/strip-synthid\/"/);
  assert.match(await (await s.call('GET', '/robots.txt')).text(), /Disallow: \/api\//);
  assert.deepEqual(await (await s.call('GET', '/api/health')).json(), { ok: true });
  assert.equal((await (await s.call('GET', '/api/download/platforms')).json()).length, 4);

  // Signed out /api/me, sign-in redirect, and production rules (no dev sign-in).
  const me = await (await s.call('GET', '/api/me')).json();
  assert.equal(me.signedIn, false);
  assert.equal(me.paywall, true);
  assert.equal(me.dev.auth, false);
  assert.equal((await s.call('GET', '/api/auth/google')).status, 503);

  // A free account strips on device, then with a $2 pack, then on Basic.
  const free = await s.signIn('free');
  assert.equal((await s.call('POST', '/api/usage/strip', { as: free })).status, 200);
  assert.equal((await s.call('POST', '/api/usage/strip', { as: free })).status, 402);
  await s.store.grantStripPack(free.id, { id: 'cs_pack_1', strips: 10 });
  const used = await (await s.call('POST', '/api/usage/strip', { as: free })).json();
  assert.ok(used.credit);
  assert.equal(used.credits.strip, 9);
  const back = await (await s.call('POST', '/api/usage/strip/refund', {
    as: free, body: JSON.stringify({ credit: used.credit }), headers: { 'content-type': 'application/json' },
  })).json();
  assert.equal(back.refunded, true);
  const basic = await s.signIn('basic', 'basic');
  for (let i = 0; i < 3; i++) assert.equal((await s.call('POST', '/api/usage/strip', { as: basic })).status, 200);
  assert.equal((await (await s.call('GET', '/api/me', { as: basic })).json()).plan, 'basic');
  assert.equal((await s.call('POST', '/api/auth/logout', { as: basic })).status, 200);

  assert.deepEqual(s.reached, [], 'nothing reached the container');
});

test('signed out, nothing reaches the container', async () => {
  const s = await setup();
  const strip = await s.upload(null);
  assert.equal(strip.status, 401);
  assert.equal((await strip.json()).code, 'auth_required');
  assert.equal((await s.startDl(null)).status, 401);
  assert.equal((await s.call('POST', '/api/tiktok', { body: JSON.stringify({ url: 'https://www.tiktok.com/@a/video/1' }), headers: { 'content-type': 'application/json' } })).status, 401);
  assert.equal((await s.call('GET', '/api/download/jobs/6f1c1a52-6f5c-4a43-9c55-0c6b8b9e8a11')).status, 401);
  assert.equal((await s.call('GET', '/api/download/jobs/6f1c1a52-6f5c-4a43-9c55-0c6b8b9e8a11/file')).status, 401);
  assert.deepEqual(await (await s.call('GET', '/api/download/history/youtube')).json(), { enabled: false, rows: [] });
  assert.equal((await s.call('DELETE', '/api/download/history/youtube')).status, 401);
  // A forged internal header from outside changes nothing.
  assert.equal((await s.upload(null, 1000, { 'x-sharona-internal': s.secret })).status, 401);
  assert.deepEqual(s.reached, []);
});

test('malformed requests are refused at the Worker, before the account or the container', async () => {
  const s = await setup({ MAX_UPLOAD_MB: '1' });
  const pro = await s.signIn('pro', 'pro');
  assert.equal((await s.call('GET', '/api/strip', { as: pro })).status, 405);
  assert.equal((await s.upload(pro, 1000, { 'content-type': 'application/json' })).status, 415);
  assert.equal((await s.upload(pro, 2 * 1024 * 1024)).status, 413);
  assert.equal((await s.upload(pro, 0)).status, 400);
  const noLength = await s.app.fetch(new Request(`${SITE}/api/strip`, {
    method: 'POST', headers: { cookie: pro.cookie, 'content-type': 'multipart/form-data; boundary=abc' }, body: 'x',
  }));
  assert.equal(noLength.status, 411);
  assert.equal((await s.startDl(pro, 'https://evil.example/watch?v=1')).status, 400);
  assert.equal((await s.startDl(pro, 'file:///etc/passwd')).status, 400);
  assert.equal((await s.startDl(pro, 'https://www.youtube.com/watch?v=1', 'vimeo')).status, 404);
  assert.equal((await s.startDl(pro, 'https://www.youtube.com/watch?v=1', 'constructor')).status, 404);
  assert.equal((await s.call('POST', '/api/download/youtube/jobs', { as: pro, body: '{"url":', headers: { 'content-type': 'application/json' } })).status, 400);
  assert.equal((await s.call('POST', '/api/download/youtube/jobs', { as: pro, body: JSON.stringify({ url: `https://youtu.be/${'a'.repeat(5000)}` }), headers: { 'content-type': 'application/json' } })).status, 413);
  assert.equal((await s.call('POST', '/api/download/youtube/jobs', { as: pro, body: 'url=x', headers: { 'content-type': 'text/plain' } })).status, 415);
  assert.equal((await s.call('GET', '/api/download/jobs/not-a-uuid', { as: pro })).status, 404);
  assert.equal((await s.call('POST', '/api/download/jobs/6f1c1a52-6f5c-4a43-9c55-0c6b8b9e8a11', { as: pro })).status, 405);
  assert.equal((await s.call('GET', '/api/anything-else', { as: pro })).status, 404);
  assert.deepEqual(s.reached, []);
});

test('Pro reaches the container, stamped with the internal secret, and never counts against the free trial cap', async () => {
  const s = await setup({ FREE_TRIALS_PER_DAY: '0' });
  const pro = await s.signIn('pro', 'pro');
  for (let i = 0; i < 3; i++) assert.equal((await s.upload(pro)).status, 200);
  assert.equal((await s.startDl(pro)).status, 200);
  assert.equal((await s.call('GET', '/api/download/jobs/6f1c1a52-6f5c-4a43-9c55-0c6b8b9e8a11', { as: pro })).status, 200);
  assert.equal((await s.call('GET', '/api/download/history/youtube', { as: pro })).status, 200);
  assert.equal(s.reached.length, 6);
  assert.ok(s.reached.every((r) => r.secret === s.secret && r.secret.length === 64));
  assert.equal(JSON.parse(s.reached[3].body).url, 'https://www.youtube.com/watch?v=abc');
  assert.equal(await s.store.freeTrialsToday(), 0);
});

test('free accounts get their one server strip and one download, within 10 free trials a day for the whole site', async () => {
  const s = await setup();
  // The container counts the account's use; do that here as it would.
  const container = async (u, kind) => s.store.consume(u.id, kind, 1);

  const first = await s.signIn('first');
  assert.equal((await s.upload(first)).status, 200);
  await container(first, 'server_strip');
  const again = await s.upload(first);
  assert.equal(again.status, 402);
  assert.equal((await again.json()).code, 'upgrade_required');
  assert.equal((await s.startDl(first)).status, 200);
  await container(first, 'download');
  assert.equal((await s.startDl(first)).status, 402);
  assert.equal(await s.store.freeTrialsToday(), 2);

  // 8 more free uses fill today's 10.
  for (let i = 0; i < 8; i++) {
    const u = await s.signIn(`u${i}`);
    assert.equal((await (i % 2 ? s.upload(u) : s.startDl(u))).status, 200);
  }
  assert.equal(s.reached.length, 10);
  const late = await s.signIn('late');
  const full = await s.upload(late);
  assert.equal(full.status, 402);
  const body = await full.json();
  assert.equal(body.code, 'free_trials_full');
  assert.equal(body.plan, 'pro');
  assert.match(body.error, /tomorrow.*Pro/);
  assert.equal((await (await s.startDl(late)).json()).code, 'free_trials_full');
  // A Pro account still gets in.
  assert.equal((await s.upload(await s.signIn('payer', 'pro'))).status, 200);
  assert.equal(s.reached.length, 11);
  assert.equal(await s.store.freeTrialsToday(), 10);

  // Basic doesn't cover the server: its free ones count like anyone's.
  const basic = await s.signIn('basicuser', 'basic');
  assert.equal((await (await s.upload(basic)).json()).code, 'free_trials_full');
});

test('/api/me tells the page, before any upload, whether it would be refused', async () => {
  const s = await setup({ FREE_TRIALS_PER_DAY: '1' });
  const me = async (as) => (await s.call('GET', '/api/me', { as })).json();

  // Signed out: the page shows sign-in and sends nothing.
  const out = await me();
  assert.equal(out.signedIn, false);
  assert.equal(out.trialsFull, null);

  const a = await s.signIn('a');
  let m = await me(a);
  assert.equal(m.usage.server_strip.used, 0);
  assert.equal(m.usage.server_strip.limit, 1);
  assert.equal(m.trialsFull, false);

  // Someone takes today's one free trial: everyone else on free now sees it as full.
  assert.equal((await s.upload(await s.signIn('b'))).status, 200);
  m = await me(a);
  assert.equal(m.trialsFull, true);
  assert.equal((await (await s.upload(a)).json()).code, 'free_trials_full');

  // Pro is unlimited and never limited by the cap.
  assert.equal((await me(await s.signIn('pro', 'pro'))).trialsFull, null);
  // None of these /api/me calls woke the container.
  assert.equal(s.reached.length, 1);
});

test('the daily cap follows app_settings, and parallel requests cannot take more than it allows', async () => {
  const s = await setup();
  s.db.db.prepare("UPDATE app_settings SET value = '3' WHERE key = 'free_trials_per_day'").run();
  const users = await Promise.all(Array.from({ length: 8 }, (_, i) => s.signIn(`p${i}`)));
  const res = await Promise.all(users.map((u) => s.upload(u)));
  assert.equal(res.filter((r) => r.status === 200).length, 3);
  assert.equal(res.filter((r) => r.status === 402).length, 5);
  assert.equal(await s.store.freeTrialsToday(), 3);
});

test('a free account can follow its own trial download, and nothing else of the container', async () => {
  const s = await setup();
  const free = await s.signIn('free');
  const other = await s.signIn('other');
  const jobId = '6f1c1a52-6f5c-4a43-9c55-0c6b8b9e8a11';
  const rowId = '0b9a6a3e-5d55-4a8e-8a41-2d2a8f3b9c10';
  // No job yet: answered by the Worker.
  assert.equal((await s.call('GET', `/api/download/jobs/${jobId}`, { as: free })).status, 404);
  assert.equal((await s.call('DELETE', `/api/download/jobs/${jobId}`, { as: free })).status, 204);
  assert.deepEqual(await (await s.call('GET', '/api/download/history/youtube', { as: free })).json(), { enabled: true, rows: [] });
  assert.deepEqual(s.reached, []);

  // The container wrote the row for the job it started.
  await s.store.saveDownload(free.id, { id: rowId, platform: 'youtube', url: 'https://youtu.be/x', mode: 'video', jobId, status: 'pending' });
  for (const p of ['', '/thumb', '/file']) assert.equal((await s.call('GET', `/api/download/jobs/${jobId}${p}`, { as: free })).status, 200);
  assert.equal((await s.call('GET', '/api/download/history/youtube', { as: free })).status, 200);
  assert.equal(s.reached.length, 4);
  // Someone else's job id gets nothing.
  assert.equal((await s.call('GET', `/api/download/jobs/${jobId}/file`, { as: other })).status, 404);
  assert.equal(s.reached.length, 4);

  // Once the job is long over, history comes from D1 and the container stays asleep.
  s.db.db.prepare('UPDATE download_history SET created_at = created_at - 7200').run();
  const h = await (await s.call('GET', '/api/download/history/youtube', { as: free })).json();
  assert.equal(h.rows[0].status, 'expired');
  assert.equal((await s.call('GET', `/api/download/jobs/${jobId}`, { as: free })).status, 404);
  assert.equal((await s.call('DELETE', `/api/download/history/youtube/${rowId}`, { as: free })).status, 204);
  assert.deepEqual((await (await s.call('GET', '/api/download/history/youtube', { as: free })).json()).rows, []);
  assert.equal(s.reached.length, 4);
});

test('without SESSION_SECRET (or CONTAINER_SECRET) nothing is sent to the container', async () => {
  const s = await setup({ SESSION_SECRET: '' });
  assert.equal(s.secret, '');
  const pro = await s.signIn('pro', 'pro');
  assert.equal((await s.upload(pro)).status, 503);
  assert.deepEqual(s.reached, []);
  const t = await setup({ CONTAINER_SECRET: 'explicit' });
  assert.equal(t.secret, 'explicit');
});

test('the container refuses requests that did not come through the Worker', async (t) => {
  const port = 30000 + Math.floor(Math.random() * 20000);
  const child = spawn(process.execPath, [path.join(__dirname, '..', 'server', 'index.js')], {
    env: { ...process.env, PORT: String(port), PAYWALL: 'off', INTERNAL_SECRET: 'stamp', NODE_ENV: 'test' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  t.after(() => child.kill('SIGKILL'));
  await new Promise((ok, fail) => {
    child.stdout.on('data', (d) => { if (/running on/.test(String(d))) ok(); });
    child.on('exit', (code) => fail(new Error(`server exited ${code}`)));
  });
  const base = `http://127.0.0.1:${port}`;
  assert.equal((await fetch(`${base}/api/health`)).status, 403);
  assert.equal((await fetch(`${base}/api/strip`, { method: 'POST', headers: { 'x-sharona-internal': 'wrong' } })).status, 403);
  assert.equal((await fetch(`${base}/`)).status, 403);
  assert.equal((await fetch(`${base}/api/health`, { headers: { 'x-sharona-internal': 'stamp' } })).status, 200);
});

// wrangler.jsonc without its comments (strings may contain "//").
function wranglerConfig() {
  const src = require('fs').readFileSync(path.join(__dirname, '..', 'wrangler.jsonc'), 'utf8');
  return JSON.parse(src.replace(/"(?:\\.|[^"\\])*"|\/\/[^\n]*|\/\*[\s\S]*?\*\//g, (m) => (m[0] === '"' ? m : '')));
}

test('branch previews never touch production resources, and production is unchanged', () => {
  const c = wranglerConfig();
  const prodDb = c.d1_databases[0].database_id;
  // Production: Google sign-in and Stripe rules, its own database and domain.
  assert.equal(c.vars.NODE_ENV, undefined);
  assert.equal(c.vars.SITE_URL, 'https://metadata-stripper.synthidstripper.workers.dev');
  assert.equal(c.vars.CLOUDFLARE_D1_DATABASE_ID, prodDb);
  assert.equal(c.containers[0].instance_type, 'standard-2');
  // Previews: a different database everywhere it is named.
  const p = c.previews;
  assert.equal(p.d1_databases.length, 1);
  assert.equal(p.d1_databases[0].binding, 'DB');
  assert.notEqual(p.d1_databases[0].database_id, prodDb);
  assert.notEqual(p.d1_databases[0].database_name, c.d1_databases[0].database_name);
  assert.equal(p.vars.CLOUDFLARE_D1_DATABASE_ID, p.d1_databases[0].database_id);
  assert.equal(p.vars.SITE_URL, '');
  assert.equal(p.vars.NODE_ENV, 'development');
  // Own Durable Object namespace and container app, kept small.
  assert.deepEqual(p.durable_objects.bindings, c.durable_objects.bindings);
  assert.equal(p.containers[0].class_name, 'SharonaServer');
  assert.equal(p.containers[0].max_instances, 1);
  // The migrations config points at the same preview database.
  const src = require('fs').readFileSync(path.join(__dirname, '..', 'wrangler.preview-migrations.jsonc'), 'utf8');
  const m = JSON.parse(src.replace(/"(?:\\.|[^"\\])*"|\/\/[^\n]*/g, (x) => (x[0] === '"' ? x : '')));
  assert.equal(m.d1_databases[0].database_id, p.d1_databases[0].database_id);
  assert.equal(m.d1_databases[0].database_name, p.d1_databases[0].database_name);
});

test('a branch preview: dev sign-in and test upgrade, its own URL, kept out of search', async () => {
  const { vars } = wranglerConfig().previews;
  const s = await setup({ ...vars, SESSION_SECRET: SECRET });
  const me = await (await s.call('GET', '/api/me')).json();
  assert.equal(me.signIn, 'dev');
  assert.deepEqual(me.dev, { auth: true, billing: true });
  // Links use the request's own origin (SITE_URL is empty).
  assert.match(await (await s.call('GET', '/app/')).text(), /https:\/\/sharona\.test/);
  assert.equal(await (await s.call('GET', '/robots.txt')).text(), 'User-agent: *\nDisallow: /\n');
  // Sign in without Google, upgrade without Stripe, then a download goes through.
  const signIn = await s.call('GET', '/api/auth/dev?email=tester@preview&next=/app/');
  assert.equal(signIn.status, 302);
  const as = { cookie: signIn.headers.get('set-cookie').split(';')[0] };
  assert.equal((await (await s.call('GET', '/api/me', { as })).json()).signedIn, true);
  const up = await s.call('POST', '/api/billing/checkout', { as, body: JSON.stringify({ plan: 'pro' }), headers: { 'content-type': 'application/json' } });
  assert.equal(up.status, 200);
  assert.equal((await (await s.call('GET', '/api/me', { as })).json()).plan, 'pro');
  assert.equal((await s.startDl(as)).status, 200);
  assert.equal(s.reached.length, 1);
  assert.equal(s.reached[0].secret, s.secret);
});
