'use strict';

// node --test: local unlimited mode (npm run dev:local, server/local-mode.js).
// It must give everything away on a laptop, and refuse to start anywhere that
// looks like a server. The Worker and the production config must ignore it.

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const sharp = require('sharp');
const { applyLocalMode, localModeProblems, DEPLOY_SIGNS } = require('../server/local-mode');

const ROOT = path.join(__dirname, '..');

test('off unless LOCAL_UNLIMITED is set, and the environment is left alone', () => {
  for (const v of [undefined, '', '0']) {
    const env = { STRIPE_SECRET_KEY: 'sk_live_x', ...(v === undefined ? {} : { LOCAL_UNLIMITED: v }) };
    assert.deepEqual(applyLocalMode(env), { enabled: false, ignored: [] });
    assert.equal(env.STRIPE_SECRET_KEY, 'sk_live_x');
    assert.equal(env.PAYWALL, undefined);
  }
});

test('on: paywall off, and every account, billing and D1 setting is dropped', () => {
  const env = {
    LOCAL_UNLIMITED: '1',
    NODE_ENV: 'development',
    SITE_URL: 'https://prod.example',
    STRIPE_SECRET_KEY: 'sk_live_x',
    GOOGLE_CLIENT_ID: 'id',
    CLOUDFLARE_D1_DATABASE_ID: 'prod-db',
    CLOUDFLARE_API_TOKEN: 'token',
    FREE_STRIPS: '1',
    MAX_UPLOAD_MB: '100',
  };
  const r = applyLocalMode(env);
  assert.equal(r.enabled, true);
  assert.deepEqual(r.ignored.sort(), ['CLOUDFLARE_API_TOKEN', 'CLOUDFLARE_D1_DATABASE_ID', 'FREE_STRIPS', 'GOOGLE_CLIENT_ID', 'SITE_URL', 'STRIPE_SECRET_KEY']);
  assert.equal(env.PAYWALL, 'off');
  assert.equal(env.HOST, '127.0.0.1');
  for (const k of r.ignored) assert.equal(env[k], undefined, k);
  assert.equal(env.MAX_UPLOAD_MB, '100');
});

test('refuses to start anywhere that looks like a deployment', () => {
  const refused = (extra) => assert.throws(() => applyLocalMode({ LOCAL_UNLIMITED: '1', ...extra }), { code: 'LOCAL_MODE_REFUSED' });
  refused({ NODE_ENV: 'production' });
  refused({ HOST: '0.0.0.0' });
  refused({ LOCAL_UNLIMITED: 'true' });
  for (const k of DEPLOY_SIGNS) refused({ [k]: 'x' });
  assert.ok(DEPLOY_SIGNS.includes('INTERNAL_SECRET'), 'the container behind the Worker always has INTERNAL_SECRET');
  assert.ok(DEPLOY_SIGNS.includes('WORKERS_CI'), 'Workers Builds sets WORKERS_CI');
  assert.deepEqual(localModeProblems({ LOCAL_UNLIMITED: '1', HOST: 'localhost' }), []);
  // A refusal leaves the environment as it was.
  const env = { LOCAL_UNLIMITED: '1', NODE_ENV: 'production', STRIPE_SECRET_KEY: 'sk' };
  assert.throws(() => applyLocalMode(env));
  assert.equal(env.STRIPE_SECRET_KEY, 'sk');
  assert.equal(env.PAYWALL, undefined);
});

function startServer(t, env) {
  const port = 30000 + Math.floor(Math.random() * 20000);
  const clean = { ...process.env };
  for (const k of [...DEPLOY_SIGNS, 'NODE_ENV', 'HOST', 'PAYWALL']) delete clean[k];
  // Its own temp dir: a server purges its work dir on startup, and other test
  // files start servers too.
  const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'sharona-local-'));
  t.after(() => fs.rmSync(tmp, { recursive: true, force: true }));
  const child = spawn(process.execPath, [path.join(ROOT, 'server', 'index.js')], {
    env: { ...clean, TMPDIR: tmp, PORT: String(port), NO_COLOR: '1', ...env },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  t.after(() => child.kill('SIGKILL'));
  let out = '';
  child.stdout.on('data', (d) => { out += d; });
  child.stderr.on('data', (d) => { out += d; });
  const ready = new Promise((ok, fail) => {
    child.stdout.on('data', () => { if (/running on/.test(out)) ok(); });
    child.on('exit', (code) => fail(Object.assign(new Error(`server exited ${code}`), { code, out: () => out })));
  });
  return { port, ready, out: () => out };
}

test('the server will not start in local mode with NODE_ENV=production', async (t) => {
  const s = startServer(t, { LOCAL_UNLIMITED: '1', NODE_ENV: 'production' });
  await assert.rejects(s.ready, (e) => e.code === 1 && /won't start/.test(e.out()));
});

test('the server will not start in local mode behind the Worker', async (t) => {
  const s = startServer(t, { LOCAL_UNLIMITED: '1', INTERNAL_SECRET: 'stamp' });
  await assert.rejects(s.ready, (e) => e.code === 1 && /INTERNAL_SECRET is set/.test(e.out()));
});

test('local mode: no sign-in, unlimited strips, real server strips, and only on 127.0.0.1', async (t) => {
  // Real-looking keys in .env must not matter: no D1, Google or Stripe call is made.
  const s = startServer(t, {
    LOCAL_UNLIMITED: '1',
    STRIPE_SECRET_KEY: 'sk_live_should_be_ignored',
    CLOUDFLARE_D1_DATABASE_ID: 'prod',
    CLOUDFLARE_API_TOKEN: 'prod',
    CLOUDFLARE_ACCOUNT_ID: 'prod',
  });
  await s.ready;
  assert.match(s.out(), /LOCAL UNLIMITED MODE/);
  const base = `http://127.0.0.1:${s.port}`;

  const me = await (await fetch(`${base}/api/me`)).json();
  assert.equal(me.paywall, false);
  assert.equal(me.signedIn, false);

  // On-device strips are never counted.
  for (let i = 0; i < 5; i++) assert.equal((await fetch(`${base}/api/usage/strip`, { method: 'POST' })).status, 200);

  // Server strips run without an account, again and again.
  const png = await sharp({ create: { width: 4, height: 4, channels: 3, background: '#f00' } })
    .withMetadata({ exif: { IFD0: { Copyright: 'someone' } } }).png().toBuffer();
  for (let i = 0; i < 3; i++) {
    const form = new FormData();
    form.append('file', new Blob([png], { type: 'image/png' }), 'a.png');
    const r = await fetch(`${base}/api/strip`, { method: 'POST', body: form });
    assert.equal(r.status, 200, await r.clone().text());
    assert.ok((await r.arrayBuffer()).byteLength > 0);
  }

  // Downloads get past the quota gate (a link that isn't a YouTube one is
  // still refused, which proves the request reached the downloader).
  const dl = await fetch(`${base}/api/download/youtube/jobs`, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ url: 'https://example.com/x' }),
  });
  assert.equal(dl.status, 400);
});

test('the Worker ignores LOCAL_UNLIMITED and PAYWALL: the paywall stays on', async () => {
  const { createApp } = await import('../worker/app.mjs');
  const app = createApp({
    env: { LOCAL_UNLIMITED: '1', PAYWALL: 'off', SESSION_SECRET: 's', ASSETS: { fetch: async () => new Response('', { status: 404 }) } },
    query: async () => { throw new Error('no db in this test'); },
    forward: async () => { throw new Error('must not reach the container'); },
  });
  const r = await app.fetch(new Request('https://x.test/api/strip', {
    method: 'POST', headers: { 'content-type': 'multipart/form-data; boundary=a', 'content-length': '10' }, body: 'x'.repeat(10),
  }));
  assert.equal(r.status, 401);
});

test('the Worker never passes LOCAL_UNLIMITED to the container', () => {
  const src = fs.readFileSync(path.join(ROOT, 'worker', 'index.js'), 'utf8');
  const pass = src.match(/const PASS = \[([\s\S]*?)\];/)[1];
  assert.doesNotMatch(pass, /LOCAL_UNLIMITED/);
});

/** wrangler.jsonc without comments or trailing commas. */
function readJsonc(file) {
  const text = fs.readFileSync(path.join(ROOT, file), 'utf8')
    .replace(/"(?:[^"\\]|\\.)*"|\/\/[^\n]*|\/\*[\s\S]*?\*\//g, (m) => (m.startsWith('"') ? m : ''))
    .replace(/,(\s*[}\]])/g, '$1');
  return JSON.parse(text);
}

test('wrangler.jsonc: local mode is set nowhere, and previews never touch production data or billing', () => {
  const raw = fs.readFileSync(path.join(ROOT, 'wrangler.jsonc'), 'utf8');
  assert.doesNotMatch(raw.replace(/\/\/[^\n]*/g, ''), /LOCAL_UNLIMITED/);
  const c = readJsonc('wrangler.jsonc');
  const prodDb = c.d1_databases[0].database_id;

  // Production: paywall on, the production database.
  assert.equal(c.vars.PAYWALL, undefined);
  assert.equal(c.vars.CLOUDFLARE_D1_DATABASE_ID, prodDb);

  // Previews: their own database (the binding and the container's HTTP API id
  // agree), no billing or sign-in settings, paywall on, a small container.
  const p = c.previews;
  assert.ok(p, 'previews block');
  assert.equal(p.d1_databases.length, 1);
  assert.equal(p.d1_databases[0].binding, 'DB');
  assert.notEqual(p.d1_databases[0].database_id, prodDb);
  assert.equal(p.vars.CLOUDFLARE_D1_DATABASE_ID, p.d1_databases[0].database_id);
  assert.equal(p.vars.PAYWALL, undefined);
  for (const k of Object.keys(p.vars)) assert.doesNotMatch(k, /STRIPE|GOOGLE|SECRET|TOKEN|LOCAL/);
  assert.notEqual(p.vars.SITE_URL, c.vars.SITE_URL);
  assert.deepEqual(p.durable_objects.bindings, c.durable_objects.bindings);
  assert.equal(p.containers.length, 1);
  assert.equal(p.containers[0].class_name, c.containers[0].class_name);
  assert.equal(p.containers[0].max_instances, 1);

  // The migrations-only config points at the preview database, never production.
  const m = readJsonc('wrangler.preview-migrations.jsonc');
  assert.equal(m.d1_databases[0].database_id, p.d1_databases[0].database_id);
});
