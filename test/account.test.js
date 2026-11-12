'use strict';

// node --test: accounts, quota, Google sign-in and Stripe billing, with
// Google and Stripe mocked out, and D1 replaced by a local SQLite database
// running the real migrations.

const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('crypto');
const express = require('express');
const { createAccounts, loadConfig, verifyStripeSignature, safeNext, withQuery } = require('../server/account');
const { createStore, d1Http } = require('../server/store');
const { fakeD1 } = require('./fake-d1');

function config(over = {}) {
  return { ...loadConfig({ NODE_ENV: 'test' }), sessionSecret: 'test-secret', siteUrl: 'http://app.test', ...over };
}

const storeFor = (db) => createStore({ query: d1Http({ accountId: db.accountId, databaseId: db.databaseId, apiToken: db.apiToken, fetchImpl: db.fetch }) });

/** A tiny app: the account routes plus two gated endpoints standing in for strip/download. */
async function start({ db = fakeD1(), ...opts } = {}) {
  const accounts = createAccounts({ store: storeFor(db), ...opts });
  const app = express();
  app.use('/api', accounts.router);
  app.post('/api/strip', accounts.gate('server_strip'), (req, res) => {
    req.quota.refundUnlessSent(res);
    if (req.query.fail) return res.status(500).json({ error: 'boom' });
    res.send('clean');
  });
  // A server route gated on on-device strips, to test pack credit refunds.
  app.post('/api/device', accounts.gate('strip'), (req, res) => {
    if (req.query.fail) { req.quota.refund(); return res.status(500).json({ credit: req.quota.credit }); }
    res.json({ credit: req.quota.credit });
  });
  app.post('/api/download', accounts.gate('download'), (req, res) => {
    if (req.query.fail) req.quota.refund();
    res.status(202).json({ ok: true });
  });
  const server = await new Promise((ok) => { const s = app.listen(0, () => ok(s)); });
  const base = `http://127.0.0.1:${server.address().port}`;
  let cookie = '';
  const call = async (method, path, { body, headers = {}, raw } = {}) => {
    const res = await fetch(base + path, {
      method,
      redirect: 'manual',
      headers: { ...(cookie ? { cookie } : {}), ...(body ? { 'content-type': 'application/json' } : {}), ...headers },
      body: raw ?? (body ? JSON.stringify(body) : undefined),
    });
    for (const c of res.headers.getSetCookie()) {
      const [pair] = c.split(';');
      const [name, value] = pair.split('=');
      const jar = new Map(cookie ? cookie.split('; ').map((x) => x.split('=')) : []);
      if (value) jar.set(name, value); else jar.delete(name);
      cookie = [...jar].map(([k, v]) => `${k}=${v}`).join('; ');
    }
    const text = await res.text();
    let data = text;
    try { data = JSON.parse(text); } catch { /* not JSON */ }
    return { status: res.status, data, location: res.headers.get('location') };
  };
  return { accounts, call, db, close: () => server.close() };
}

test('helpers', () => {
  assert.equal(safeNext('/app/#youtube'), '/app/#youtube');
  assert.equal(safeNext('//evil.com'), '/app/');
  assert.equal(safeNext('/\\evil.com'), '/app/');
  assert.equal(safeNext('https://evil.com'), '/app/');
  assert.equal(withQuery('/app/#strip', 'upgraded=1'), '/app/?upgraded=1#strip');
  assert.equal(withQuery('/app/?a=1', 'upgraded=1'), '/app/?a=1&upgraded=1');
});

test('dev mode: anonymous is asked to sign in, then gets 1 free on-device strip, 1 server strip and 1 download', async (t) => {
  const s = await start({ config: config() });
  t.after(s.close);

  let me = await s.call('GET', '/api/me');
  assert.equal(me.data.signedIn, false);
  assert.equal(me.data.signIn, 'dev');
  assert.equal((await s.call('POST', '/api/strip')).data.code, 'auth_required');

  const login = await s.call('GET', '/api/auth/google?next=/app/%23youtube');
  assert.equal(login.status, 302);
  assert.match(login.location, /^\/api\/auth\/dev\?next=/);
  const dev = await s.call('GET', login.location);
  assert.equal(dev.location, '/app/#youtube');

  me = await s.call('GET', '/api/me');
  assert.equal(me.data.signedIn, true);
  assert.equal(me.data.plan, 'free');
  assert.deepEqual(me.data.usage, {
    strip: { used: 0, limit: 1 }, server_strip: { used: 0, limit: 1 }, download: { used: 0, limit: 1 },
  });

  // A failed strip gives the use back.
  assert.equal((await s.call('POST', '/api/strip?fail=1')).status, 500);
  assert.equal((await s.call('GET', '/api/me')).data.usage.server_strip.used, 0);

  assert.equal((await s.call('POST', '/api/strip')).status, 200);
  const second = await s.call('POST', '/api/strip');
  assert.equal(second.status, 402);
  assert.equal(second.data.code, 'upgrade_required');
  assert.equal(second.data.kind, 'server_strip');
  assert.equal(second.data.plan, 'pro');
  // On-device strips have their own free one.
  assert.equal((await s.call('POST', '/api/usage/strip')).status, 200);
  const device = await s.call('POST', '/api/usage/strip');
  assert.equal(device.status, 402);
  assert.equal(device.data.kind, 'strip');
  assert.equal(device.data.plan, 'basic');
  assert.match(device.data.error, /Basic or Pro/);

  assert.equal((await s.call('POST', '/api/download?fail=1')).status, 202);
  assert.equal((await s.call('POST', '/api/download')).status, 202);
  assert.equal((await s.call('POST', '/api/download')).status, 402);

  // Dev upgrade to Pro (the default plan) → unlimited.
  const up = await s.call('POST', '/api/billing/checkout', { body: { next: '/app/#strip' } });
  assert.equal(up.data.url, 'http://app.test/app/?upgraded=pro#strip');
  me = await s.call('GET', '/api/me');
  assert.equal(me.data.plan, 'pro');
  assert.equal(me.data.usage.strip.limit, null);
  assert.equal(me.data.usage.server_strip.limit, null);
  assert.equal(me.data.usage.download.limit, null);
  for (let i = 0; i < 3; i++) assert.equal((await s.call('POST', '/api/strip')).status, 200);
  assert.equal((await s.call('POST', '/api/usage/strip')).status, 200);

  // Dev "manage" cancels, back to the free limits that are already used up.
  await s.call('POST', '/api/billing/portal', { body: {} });
  assert.equal((await s.call('POST', '/api/strip')).status, 402);

  await s.call('POST', '/api/auth/logout');
  assert.equal((await s.call('GET', '/api/me')).data.signedIn, false);
});

test('parallel requests cannot both take the last free use', async (t) => {
  const s = await start({ config: config() });
  t.after(s.close);
  await s.call('GET', '/api/auth/dev');
  const results = await Promise.all(Array.from({ length: 8 }, () => s.call('POST', '/api/usage/strip')));
  assert.equal(results.filter((r) => r.status === 200).length, 1);
});

test('tampered or expired session cookies are ignored', async () => {
  const accounts = createAccounts({ config: config(), store: storeFor(fakeD1()) });
  const tok = accounts.sessionToken('7');
  assert.equal(accounts.readSession(tok), '7');
  const [body, mac] = tok.split('.');
  const forged = Buffer.from(JSON.stringify({ u: 1, e: Date.now() + 1e9 })).toString('base64url');
  assert.equal(accounts.readSession(`${forged}.${mac}`), null);
  assert.equal(accounts.readSession(`${body}.x${mac.slice(1)}`), null);
  assert.equal(accounts.readSession(accounts.sessionToken('7', Date.now() - 31 * 86400000)), null);
});

test('production without Google or Stripe refuses sign-in and checkout instead of faking them', async (t) => {
  const s = await start({ config: config({ production: true }) });
  t.after(s.close);
  assert.equal((await s.call('GET', '/api/auth/google')).status, 503);
  assert.equal((await s.call('GET', '/api/auth/dev')).status, 404);
  assert.equal((await s.call('GET', '/api/me')).data.signIn, null);
});

test('signed out, every free use and every purchase is refused with 401, even with Google and Stripe live', async (t) => {
  // Production-like: real Google sign-in and Stripe, so nothing falls back to dev mode.
  let stripeCalls = 0;
  const fetchImpl = async () => { stripeCalls++; throw new Error('must not reach Stripe or Google'); };
  const s = await start({
    config: config({
      production: true, googleId: 'g', googleSecret: 'gs', stripeKey: 'sk_test', stripeWebhookSecret: 'whsec',
      stripePriceBasic: 'price_basic', stripePricePro: 'price_pro', stripePricePack: 'price_pack',
    }),
    fetchImpl,
  });
  t.after(s.close);
  const routes = [
    ['POST', '/api/usage/strip'], // free on-device strip
    ['POST', '/api/strip'], // free server strip
    ['POST', '/api/download'], // free download
    ['POST', '/api/usage/strip/refund'],
    ['POST', '/api/billing/checkout', { plan: 'basic' }], // $10
    ['POST', '/api/billing/checkout', { plan: 'pro' }], // $20
    ['POST', '/api/billing/pack', {}], // $2
    ['POST', '/api/billing/portal', {}],
  ];
  for (const [method, path, body] of routes) {
    const r = await s.call(method, path, { body, headers: { 'x-forwarded-for': '203.0.113.7' } });
    assert.equal(r.status, 401, `${path} ${JSON.stringify(body ?? '')}`);
    assert.equal(r.data.code, 'auth_required');
  }
  // A forged session cookie is no better than none.
  const forged = await s.call('POST', '/api/billing/pack', { body: {}, headers: { cookie: 'sh_sess=eyJ1IjoiMSIsImUiOjk5OTk5OTk5OTk5OTl9.bad' } });
  assert.equal(forged.status, 401);
  assert.equal((await s.call('GET', '/api/auth/dev')).status, 404);
  assert.equal(stripeCalls, 0);
});

test('PAYWALL=off lets everyone through without an account', async (t) => {
  const s = await start({ config: config({ paywall: false }) });
  t.after(s.close);
  for (let i = 0; i < 3; i++) assert.equal((await s.call('POST', '/api/strip')).status, 200);
  // With no database at all, /api/me still answers.
  const noDb = createAccounts({ config: config({ paywall: false }) });
  assert.equal((await noDb.account(null)).paywall, false);
});

test('Google sign-in: state is checked, the code is exchanged, the account is created', async (t) => {
  const calls = [];
  const fetchImpl = async (url, init = {}) => {
    calls.push(url);
    if (url === 'https://oauth2.googleapis.com/token') {
      const p = new URLSearchParams(init.body);
      assert.equal(p.get('code'), 'the-code');
      assert.equal(p.get('redirect_uri'), 'http://app.test/api/auth/google/callback');
      return Response.json({ access_token: 'at' });
    }
    if (url === 'https://openidconnect.googleapis.com/v1/userinfo') {
      assert.equal(init.headers.Authorization, 'Bearer at');
      return Response.json({ sub: 'g-123', email: 'ana@example.com', email_verified: true, name: 'Ana', picture: 'https://lh3/p.png' });
    }
    throw new Error(`unexpected ${url}`);
  };
  const s = await start({ config: config({ googleId: 'cid', googleSecret: 'csecret' }), fetchImpl });
  t.after(s.close);

  const go = await s.call('GET', '/api/auth/google?next=/app/%23tiktok');
  const url = new URL(go.location);
  assert.equal(url.origin + url.pathname, 'https://accounts.google.com/o/oauth2/v2/auth');
  assert.equal(url.searchParams.get('client_id'), 'cid');
  const state = url.searchParams.get('state');

  const bad = await s.call('GET', `/api/auth/google/callback?state=wrong&code=the-code`);
  assert.match(bad.location, /signin=failed/);
  assert.equal(calls.length, 0);

  // The failed attempt cleared the state cookie, so start again.
  const go2 = await s.call('GET', '/api/auth/google?next=/app/%23tiktok');
  const state2 = new URL(go2.location).searchParams.get('state');
  assert.notEqual(state2, state);
  const ok = await s.call('GET', `/api/auth/google/callback?state=${state2}&code=the-code`);
  assert.equal(ok.location, '/app/#tiktok');
  const me = await s.call('GET', '/api/me');
  assert.equal(me.data.user.email, 'ana@example.com');
  assert.equal(me.data.signIn, 'google');
});

function signed(secret, body, t = Math.floor(Date.now() / 1000)) {
  const sig = crypto.createHmac('sha256', secret).update(`${t}.${body}`).digest('hex');
  return `t=${t},v1=${sig}`;
}

test('Stripe signature check', () => {
  const body = '{"id":"evt_1"}';
  assert.ok(verifyStripeSignature(Buffer.from(body), signed('whsec', body), 'whsec'));
  assert.ok(!verifyStripeSignature(Buffer.from(body), signed('other', body), 'whsec'));
  assert.ok(!verifyStripeSignature(Buffer.from(body + ' '), signed('whsec', body), 'whsec'));
  assert.ok(!verifyStripeSignature(Buffer.from(body), signed('whsec', body, 1000), 'whsec'));
});

test('Stripe: checkout, webhook turns Pro on, cancellation turns it off', async (t) => {
  const subs = new Map();
  let checkoutParams;
  const fetchImpl = async (url, init = {}) => {
    assert.equal(init.headers.Authorization, 'Bearer sk_test_x');
    if (url === 'https://api.stripe.com/v1/checkout/sessions') {
      checkoutParams = new URLSearchParams(init.body);
      return Response.json({ id: 'cs_1', url: 'https://checkout.stripe.com/c/cs_1' });
    }
    if (url === 'https://api.stripe.com/v1/billing_portal/sessions') {
      const p = new URLSearchParams(init.body);
      assert.equal(p.get('customer'), 'cus_1');
      return Response.json({ url: 'https://billing.stripe.com/p/session_1' });
    }
    const m = url.match(/\/v1\/subscriptions\/(.+)$/);
    if (m) return subs.has(m[1]) ? Response.json(subs.get(m[1])) : Response.json({ error: { message: 'No such subscription' } }, { status: 404 });
    throw new Error(`unexpected ${url}`);
  };
  const s = await start({
    config: config({ stripeKey: 'sk_test_x', stripePricePro: 'price_20', stripeWebhookSecret: 'whsec_t' }),
    fetchImpl,
  });
  t.after(s.close);
  await s.call('GET', '/api/auth/dev?email=buyer@example.com');

  const co = await s.call('POST', '/api/billing/checkout', { body: { next: '/app/' } });
  assert.equal(co.data.url, 'https://checkout.stripe.com/c/cs_1');
  assert.equal(checkoutParams.get('mode'), 'subscription');
  assert.equal(checkoutParams.get('line_items[0][price]'), 'price_20');
  assert.equal(checkoutParams.get('customer_email'), 'buyer@example.com');
  const userId = checkoutParams.get('client_reference_id');
  assert.equal(checkoutParams.get('success_url'), 'http://app.test/app/?upgraded=pro');

  const hook = (event) => {
    const body = JSON.stringify(event);
    return s.call('POST', '/api/billing/webhook', { raw: body, headers: { 'content-type': 'application/json', 'stripe-signature': signed('whsec_t', body) } });
  };

  // Unsigned events are rejected.
  const forged = await s.call('POST', '/api/billing/webhook', { raw: '{"type":"checkout.session.completed"}', headers: { 'stripe-signature': 't=1,v1=00' } });
  assert.equal(forged.status, 400);

  const periodEnd = Math.floor(Date.now() / 1000) + 30 * 86400;
  subs.set('sub_1', { id: 'sub_1', customer: 'cus_1', status: 'active', items: { data: [{ id: 'si_1', price: { id: 'price_20' }, current_period_end: periodEnd }] } });
  const r = await hook({ id: 'evt_1', type: 'checkout.session.completed', data: { object: { mode: 'subscription', client_reference_id: userId, customer: 'cus_1', subscription: 'sub_1' } } });
  assert.equal(r.status, 200);
  let me = await s.call('GET', '/api/me');
  assert.equal(me.data.plan, 'pro');
  assert.equal(me.data.subscription.renewsAt, periodEnd * 1000);
  for (let i = 0; i < 3; i++) assert.equal((await s.call('POST', '/api/strip')).status, 200);

  const portal = await s.call('POST', '/api/billing/portal', { body: { next: '/app/' } });
  assert.equal(portal.data.url, 'https://billing.stripe.com/p/session_1');

  // Cancelled in the portal: Stripe sends .updated (cancel at period end, still Pro) then .deleted.
  subs.set('sub_1', { ...subs.get('sub_1'), cancel_at_period_end: true });
  await hook({ id: 'evt_2', type: 'customer.subscription.updated', data: { object: { id: 'sub_1', customer: 'cus_1' } } });
  me = await s.call('GET', '/api/me');
  assert.equal(me.data.plan, 'pro');
  assert.equal(me.data.subscription.cancelAtPeriodEnd, true);

  subs.set('sub_1', { ...subs.get('sub_1'), status: 'canceled' });
  await hook({ id: 'evt_3', type: 'customer.subscription.deleted', data: { object: { id: 'sub_1', customer: 'cus_1', status: 'canceled' } } });
  me = await s.call('GET', '/api/me');
  assert.equal(me.data.plan, 'free');
  assert.equal((await s.call('POST', '/api/strip')).status, 402);

  // Re-subscribing reuses the Stripe customer.
  await s.call('POST', '/api/billing/checkout', { body: {} });
  assert.equal(checkoutParams.get('customer'), 'cus_1');
  assert.equal(checkoutParams.get('customer_email'), null);
});

test('two plans: Basic unlocks on-device stripping, switching to Pro goes through the portal confirm page', async (t) => {
  const subs = new Map();
  const checkouts = [];
  const portals = [];
  let portalFlowFails = false;
  const fetchImpl = async (url, init = {}) => {
    if (url === 'https://api.stripe.com/v1/checkout/sessions') {
      checkouts.push(new URLSearchParams(init.body));
      return Response.json({ id: 'cs_b', url: 'https://checkout.stripe.com/c/cs_b' });
    }
    if (url === 'https://api.stripe.com/v1/billing_portal/sessions') {
      const p = new URLSearchParams(init.body);
      portals.push(p);
      if (p.get('flow_data[type]') && portalFlowFails) {
        return Response.json({ error: { message: 'This portal configuration does not allow subscription updates' } }, { status: 400 });
      }
      return Response.json({ url: `https://billing.stripe.com/p/${p.get('flow_data[type]') ? 'confirm' : 'home'}` });
    }
    const m = url.match(/\/v1\/subscriptions\/(.+)$/);
    if (m) return Response.json(subs.get(m[1]));
    throw new Error(`unexpected ${url}`);
  };
  const s = await start({
    config: config({ stripeKey: 'sk_test_x', stripePriceBasic: 'price_10', stripePricePro: 'price_20', stripeWebhookSecret: 'whsec_t' }),
    fetchImpl,
  });
  t.after(s.close);
  const hook = (event) => {
    const body = JSON.stringify(event);
    return s.call('POST', '/api/billing/webhook', { raw: body, headers: { 'content-type': 'application/json', 'stripe-signature': signed('whsec_t', body) } });
  };
  await s.call('GET', '/api/auth/dev?email=two@example.com');

  let me = await s.call('GET', '/api/me');
  assert.deepEqual(me.data.plans.map((p) => [p.id, p.label, p.available]), [['basic', '$10', true], ['pro', '$20', true]]);

  // Basic checkout uses the Basic price.
  const co = await s.call('POST', '/api/billing/checkout', { body: { plan: 'basic', next: '/app/' } });
  assert.equal(co.data.url, 'https://checkout.stripe.com/c/cs_b');
  assert.equal(checkouts[0].get('line_items[0][price]'), 'price_10');
  assert.equal(checkouts[0].get('subscription_data[metadata][plan]'), 'basic');
  const userId = checkouts[0].get('client_reference_id');

  const periodEnd = Math.floor(Date.now() / 1000) + 30 * 86400;
  subs.set('sub_b', { id: 'sub_b', customer: 'cus_b', status: 'active', items: { data: [{ id: 'si_b', price: { id: 'price_10' }, current_period_end: periodEnd }] } });
  await hook({ id: 'evt_b1', type: 'checkout.session.completed', data: { object: { mode: 'subscription', client_reference_id: userId, customer: 'cus_b', subscription: 'sub_b' } } });

  me = await s.call('GET', '/api/me');
  assert.equal(me.data.plan, 'basic');
  assert.equal(me.data.usage.strip.limit, null);
  assert.equal(me.data.usage.server_strip.limit, 1);
  assert.equal(me.data.usage.download.limit, 1);
  for (let i = 0; i < 4; i++) assert.equal((await s.call('POST', '/api/usage/strip')).status, 200);
  assert.equal((await s.call('POST', '/api/strip')).status, 200);
  const more = await s.call('POST', '/api/strip');
  assert.equal(more.status, 402);
  assert.equal(more.data.plan, 'pro');
  assert.equal((await s.call('POST', '/api/download')).status, 202);
  assert.equal((await s.call('POST', '/api/download')).status, 402);

  // Asking for Basic again is a no-op.
  assert.equal((await s.call('POST', '/api/billing/checkout', { body: { plan: 'basic', next: '/app/' } })).data.url, 'http://app.test/app/');

  // Upgrade: no second Checkout, a portal page that confirms the new price on the same subscription.
  const up = await s.call('POST', '/api/billing/checkout', { body: { plan: 'pro', next: '/app/#strip' } });
  assert.equal(up.data.url, 'https://billing.stripe.com/p/confirm');
  assert.equal(checkouts.length, 1);
  const flow = portals.at(-1);
  assert.equal(flow.get('customer'), 'cus_b');
  assert.equal(flow.get('flow_data[type]'), 'subscription_update_confirm');
  assert.equal(flow.get('flow_data[subscription_update_confirm][subscription]'), 'sub_b');
  assert.equal(flow.get('flow_data[subscription_update_confirm][items][0][id]'), 'si_b');
  assert.equal(flow.get('flow_data[subscription_update_confirm][items][0][price]'), 'price_20');
  assert.equal(flow.get('flow_data[after_completion][redirect][return_url]'), 'http://app.test/app/?upgraded=pro#strip');

  // Stripe changes the price and sends .updated: the webhook maps price_20 to Pro.
  subs.set('sub_b', { ...subs.get('sub_b'), items: { data: [{ id: 'si_b', price: { id: 'price_20' }, current_period_end: periodEnd }] } });
  await hook({ id: 'evt_b2', type: 'customer.subscription.updated', data: { object: { id: 'sub_b', customer: 'cus_b' } } });
  me = await s.call('GET', '/api/me');
  assert.equal(me.data.plan, 'pro');
  assert.equal((await s.call('POST', '/api/strip')).status, 200);
  assert.equal((await s.call('POST', '/api/download')).status, 202);

  // Downgrading when the portal doesn't allow plan changes falls back to the portal's home page.
  portalFlowFails = true;
  const down = await s.call('POST', '/api/billing/checkout', { body: { plan: 'basic', next: '/app/' } });
  assert.equal(down.data.url, 'https://billing.stripe.com/p/home');

  // Downgraded in the portal: back to Basic limits (server strips already used up).
  subs.set('sub_b', { ...subs.get('sub_b'), items: { data: [{ id: 'si_b', price: { id: 'price_10' }, current_period_end: periodEnd }] } });
  await hook({ id: 'evt_b3', type: 'customer.subscription.updated', data: { object: { id: 'sub_b', customer: 'cus_b' } } });
  assert.equal((await s.call('GET', '/api/me')).data.plan, 'basic');
  assert.equal((await s.call('POST', '/api/strip')).status, 402);
  assert.equal((await s.call('POST', '/api/usage/strip')).status, 200);

  // The D1 row carries the tier and price.
  const row = s.db.db.prepare("SELECT tier, price_id FROM subscriptions WHERE id = 'sub_b'").get();
  assert.equal(row.tier, 'basic');
  assert.equal(row.price_id, 'price_10');
});

test('yearly prices: checkout by interval, both prices map to the same plan, switch to yearly in the portal', async (t) => {
  const subs = new Map();
  const checkouts = [];
  const portals = [];
  const fetchImpl = async (url, init = {}) => {
    if (url === 'https://api.stripe.com/v1/checkout/sessions') {
      checkouts.push(new URLSearchParams(init.body));
      return Response.json({ id: 'cs_y', url: 'https://checkout.stripe.com/c/cs_y' });
    }
    if (url === 'https://api.stripe.com/v1/billing_portal/sessions') {
      portals.push(new URLSearchParams(init.body));
      return Response.json({ url: 'https://billing.stripe.com/p/confirm' });
    }
    const m = url.match(/\/v1\/subscriptions\/(.+)$/);
    if (m) return Response.json(subs.get(m[1]));
    throw new Error(`unexpected ${url}`);
  };
  const s = await start({
    config: config({
      stripeKey: 'sk_test_x', stripeWebhookSecret: 'whsec_t',
      stripePriceBasic: 'price_10', stripePricePro: 'price_20', stripePriceBasicYearly: 'price_100', stripePriceProYearly: 'price_200',
    }),
    fetchImpl,
  });
  t.after(s.close);
  const hook = (event) => {
    const body = JSON.stringify(event);
    return s.call('POST', '/api/billing/webhook', { raw: body, headers: { 'content-type': 'application/json', 'stripe-signature': signed('whsec_t', body) } });
  };
  await s.call('GET', '/api/auth/dev?email=year@example.com');
  let me = await s.call('GET', '/api/me');
  assert.deepEqual(me.data.plans.map((p) => [p.id, p.label, p.yearly?.label]), [['basic', '$10', '$100'], ['pro', '$20', '$200']]);

  // Yearly Basic checkout uses the yearly price; no interval still means monthly.
  await s.call('POST', '/api/billing/checkout', { body: { plan: 'basic', interval: 'year', next: '/app/' } });
  assert.equal(checkouts[0].get('line_items[0][price]'), 'price_100');
  assert.equal(checkouts[0].get('subscription_data[metadata][interval]'), 'year');
  await s.call('POST', '/api/billing/checkout', { body: { plan: 'pro', next: '/app/' } });
  assert.equal(checkouts[1].get('line_items[0][price]'), 'price_20');
  await s.call('POST', '/api/billing/checkout', { body: { plan: 'pro', interval: 'nonsense', next: '/app/' } });
  assert.equal(checkouts[2].get('line_items[0][price]'), 'price_20');
  const userId = checkouts[0].get('client_reference_id');

  // The webhook maps the yearly price to Basic.
  const periodEnd = Math.floor(Date.now() / 1000) + 365 * 86400;
  subs.set('sub_y', { id: 'sub_y', customer: 'cus_y', status: 'active', items: { data: [{ id: 'si_y', price: { id: 'price_100' }, current_period_end: periodEnd }] } });
  await hook({ id: 'evt_y1', type: 'checkout.session.completed', data: { object: { mode: 'subscription', client_reference_id: userId, customer: 'cus_y', subscription: 'sub_y' } } });
  me = await s.call('GET', '/api/me');
  assert.equal(me.data.plan, 'basic');
  assert.equal(me.data.subscription.interval, 'year');
  assert.equal(me.data.usage.strip.limit, null);

  // Same plan and interval: no-op. Same plan, other interval: the portal's confirm page with the monthly price.
  assert.equal((await s.call('POST', '/api/billing/checkout', { body: { plan: 'basic', interval: 'year', next: '/app/' } })).data.url, 'http://app.test/app/');
  const toMonthly = await s.call('POST', '/api/billing/checkout', { body: { plan: 'basic', interval: 'month', next: '/app/' } });
  assert.equal(toMonthly.data.url, 'https://billing.stripe.com/p/confirm');
  assert.equal(portals.at(-1).get('flow_data[subscription_update_confirm][items][0][price]'), 'price_10');
  // Upgrading to yearly Pro uses the yearly Pro price.
  await s.call('POST', '/api/billing/checkout', { body: { plan: 'pro', interval: 'year', next: '/app/' } });
  assert.equal(portals.at(-1).get('flow_data[subscription_update_confirm][items][0][price]'), 'price_200');
  assert.equal(checkouts.length, 3);

  subs.set('sub_y', { ...subs.get('sub_y'), items: { data: [{ id: 'si_y', price: { id: 'price_200' }, current_period_end: periodEnd }] } });
  await hook({ id: 'evt_y2', type: 'customer.subscription.updated', data: { object: { id: 'sub_y', customer: 'cus_y' } } });
  me = await s.call('GET', '/api/me');
  assert.equal(me.data.plan, 'pro');
  assert.equal(me.data.subscription.interval, 'year');

  for (const [price, tier] of [['price_10', 'basic'], ['price_100', 'basic'], ['price_20', 'pro'], ['price_200', 'pro']]) {
    assert.equal(s.accounts.tierForPrice(price), tier);
  }
  assert.equal(s.accounts.intervalForPrice('price_200'), 'year');
  assert.equal(s.accounts.intervalForPrice('price_20'), 'month');
});

test('yearly is hidden and refused when its price is not set', async (t) => {
  const s = await start({ config: config({ stripeKey: 'sk_test_x', stripePriceBasic: 'price_10', stripePricePro: 'price_20', stripePriceProYearly: 'price_200' }), fetchImpl: async () => { throw new Error('no Stripe call expected'); } });
  t.after(s.close);
  await s.call('GET', '/api/auth/dev?email=noyear@example.com');
  const me = await s.call('GET', '/api/me');
  assert.deepEqual(me.data.plans.map((p) => [p.id, p.yearly?.label ?? null]), [['basic', null], ['pro', '$200']]);
  const r = await s.call('POST', '/api/billing/checkout', { body: { plan: 'basic', interval: 'year' } });
  assert.equal(r.status, 503);
  assert.match(r.data.error, /yearly/);
  assert.equal(loadConfig({ STRIPE_PRICE_ID_BASIC_YEARLY: 'py' }).stripePriceBasicYearly, 'py');
});

test('dev billing: yearly plans', async (t) => {
  const s = await start({ config: config() });
  t.after(s.close);
  await s.call('GET', '/api/auth/dev');
  assert.ok((await s.call('GET', '/api/me')).data.plans.every((p) => p.yearly));
  await s.call('POST', '/api/billing/checkout', { body: { plan: 'basic', interval: 'year' } });
  let me = (await s.call('GET', '/api/me')).data;
  assert.equal(me.plan, 'basic');
  assert.equal(me.subscription.interval, 'year');
  await s.call('POST', '/api/billing/checkout', { body: { plan: 'basic', interval: 'month' } });
  me = (await s.call('GET', '/api/me')).data;
  assert.equal(me.subscription.interval, 'month');
});

test('price to plan mapping, and a plan without a price cannot be bought', async (t) => {
  const s = await start({ config: config({ stripeKey: 'sk_test_x', stripePricePro: 'price_20', production: true }), fetchImpl: async () => { throw new Error('no Stripe call expected'); } });
  t.after(s.close);
  assert.equal(s.accounts.tierForPrice('price_20'), 'pro');
  assert.equal(s.accounts.tierForPrice('price_old'), 'pro');
  assert.equal(s.accounts.tierForPrice(null), 'pro');
  // Create the account through the store (no dev sign-in in production).
  const user = await s.accounts.store.upsertGoogleUser({ sub: 'g-9', email: 'x@example.com' });
  const me = await s.accounts.account(await s.accounts.store.getUser(user.id));
  assert.deepEqual(me.plans.map((p) => [p.id, p.available]), [['basic', false], ['pro', true]]);
  assert.equal(loadConfig({ STRIPE_PRICE_ID: 'price_legacy' }).stripePricePro, 'price_legacy');
  assert.equal(loadConfig({ STRIPE_PRICE_ID_PRO: 'p2', STRIPE_PRICE_ID: 'price_legacy' }).stripePricePro, 'p2');
});

test('dev billing: switching between Basic and Pro', async (t) => {
  const s = await start({ config: config() });
  t.after(s.close);
  await s.call('GET', '/api/auth/dev');
  await s.call('POST', '/api/billing/checkout', { body: { plan: 'basic' } });
  assert.equal((await s.call('GET', '/api/me')).data.plan, 'basic');
  await s.call('POST', '/api/billing/checkout', { body: { plan: 'pro' } });
  assert.equal((await s.call('GET', '/api/me')).data.plan, 'pro');
  await s.call('POST', '/api/billing/checkout', { body: { plan: 'basic' } });
  assert.equal((await s.call('GET', '/api/me')).data.plan, 'basic');
  await s.call('POST', '/api/billing/portal', { body: {} });
  assert.equal((await s.call('GET', '/api/me')).data.plan, 'free');
});

test('D1 store: sends the API token, and the free allowance follows the app_settings table', async (t) => {
  const s = await start({ config: config() });
  t.after(s.close);
  await s.call('GET', '/api/auth/dev');
  assert.equal(s.db.db.prepare('SELECT email FROM profiles').get().email, 'dev@localhost');

  assert.equal((await s.call('POST', '/api/download')).status, 202);
  assert.equal((await s.call('POST', '/api/download')).status, 402);
  const consume = s.db.calls.find((x) => /INSERT INTO usage_counters/.test(x.sql));
  assert.deepEqual(consume.params.slice(1), ['download', 1]);

  // Raising the allowance in the table takes effect without a restart (after the 1-minute cache).
  s.db.db.exec("UPDATE app_settings SET value = '3' WHERE key = 'free_downloads'");
  const settings = await s.accounts.store.settings(Date.now() + 61_000);
  assert.equal(settings.free_downloads, 3);
  const me = await s.call('GET', '/api/me');
  assert.deepEqual(me.data.usage.download, { used: 1, limit: 3 });
  assert.equal((await s.call('POST', '/api/download')).status, 202);
  // Triggers log every use.
  const events = s.db.db.prepare('SELECT kind, delta, tier FROM usage_events ORDER BY id').all().map((r) => ({ ...r }));
  assert.deepEqual(events, [{ kind: 'download', delta: 1, tier: null }, { kind: 'download', delta: 1, tier: null }]);
});

test('D1 store: refunds are logged and never go below zero', async () => {
  const db = fakeD1();
  const store = storeFor(db);
  const u = await store.upsertGoogleUser({ sub: 'g-1', email: 'a@b.c' });
  assert.equal(await store.consume(u.id, 'server_strip', 1), true);
  await store.refund(u.id, 'server_strip');
  await store.refund(u.id, 'server_strip');
  assert.equal((await store.getUser(u.id)).server_strips_used, 0);
  assert.deepEqual(db.db.prepare('SELECT delta FROM usage_events ORDER BY id').all().map((r) => r.delta), [1, -1]);
});

test('D1 store: plans decide what is unlimited, and expiry ends them', async () => {
  const db = fakeD1();
  const store = storeFor(db);
  const u = await store.upsertGoogleUser({ sub: 'g-2', email: 'b@b.c' });
  const future = Math.floor(Date.now() / 1000) + 86400 * 30;
  await store.setSubscription(u.id, { id: 'sub_basic', status: 'active', periodEnd: future, tier: 'basic', priceId: 'price_10' });
  await store.setSubscription(u.id, { id: 'sub_old', status: 'canceled', periodEnd: null });
  let row = await store.getUser(u.id);
  assert.equal(row.subscription_id, 'sub_basic');
  assert.equal(row.subscription_tier, 'basic');
  assert.equal(row.subscription_price_id, 'price_10');
  // Basic: on-device strips are unlimited, server strips are not.
  for (let i = 0; i < 3; i++) assert.equal(await store.consume(u.id, 'strip', 0), true);
  assert.equal(await store.consume(u.id, 'server_strip', 0), false);
  assert.equal(db.db.prepare("SELECT tier FROM usage_events WHERE kind = 'strip' LIMIT 1").get().tier, 'basic');
  // A Pro subscription wins over Basic.
  await store.setSubscription(u.id, { id: 'sub_pro', status: 'active', periodEnd: future, tier: 'pro' });
  row = await store.getUser(u.id);
  assert.equal(row.subscription_tier, 'pro');
  assert.equal(await store.consume(u.id, 'server_strip', 0), true);
  // Both expired more than a day ago: back to the free limit.
  const past = Math.floor(Date.now() / 1000) - 3 * 86400;
  await store.setSubscription(u.id, { id: 'sub_pro', status: 'active', periodEnd: past, tier: 'pro' });
  await store.setSubscription(u.id, { id: 'sub_basic', status: 'active', periodEnd: past, tier: 'basic' });
  assert.equal(await store.consume(u.id, 'download', 0), false);
  assert.equal(await store.consume('no-such-user', 'strip', 5), false);
});

test('FREE_* env override the table', async (t) => {
  const s = await start({ config: config(loadConfigOverrides({ FREE_STRIPS: '3', FREE_SERVER_STRIPS: '2', FREE_DOWNLOADS: '0' })) });
  t.after(s.close);
  await s.call('GET', '/api/auth/dev');
  assert.equal((await s.call('POST', '/api/strip')).status, 200);
  assert.equal((await s.call('POST', '/api/strip')).status, 200);
  assert.equal((await s.call('POST', '/api/strip')).status, 402);
  for (let i = 0; i < 3; i++) assert.equal((await s.call('POST', '/api/usage/strip')).status, 200);
  assert.equal((await s.call('POST', '/api/usage/strip')).status, 402);
  const dl = await s.call('POST', '/api/download');
  assert.equal(dl.status, 402);
  assert.match(dl.data.error, /Upgrade to Pro/);
  assert.ok(!s.db.calls.some((x) => /app_settings/.test(x.sql)));
});

function loadConfigOverrides(env) {
  const c = loadConfig({ NODE_ENV: 'test', ...env });
  return { freeStrips: c.freeStrips, freeServerStrips: c.freeServerStrips, freeDownloads: c.freeDownloads };
}

test('a D1 outage answers 503 instead of letting work through', async (t) => {
  const s = await start({ config: config() });
  t.after(s.close);
  await s.call('GET', '/api/auth/dev');
  s.db.setDown(true);
  const r = await s.call('POST', '/api/strip');
  assert.equal(r.status, 503);
  assert.equal(r.data.code, 'unavailable');
  assert.equal((await s.call('GET', '/api/me')).status, 503);
  s.db.setDown(false);
  assert.equal((await s.call('POST', '/api/strip')).status, 200);
});

test('with the paywall on, D1 settings are required', () => {
  assert.throws(() => createAccounts({ config: config() }), /CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_D1_DATABASE_ID and CLOUDFLARE_API_TOKEN/);
  // PAYWALL=off needs no database at all.
  assert.doesNotThrow(() => createAccounts({ config: config({ paywall: false }) }));
  const c = loadConfig({ CLOUDFLARE_ACCOUNT_ID: 'a', CLOUDFLARE_D1_DATABASE_ID: 'd', CLOUDFLARE_API_TOKEN: 't' });
  assert.deepEqual([c.cfAccountId, c.d1DatabaseId, c.cfApiToken], ['a', 'd', 't']);
  assert.equal(c.freeStrips, null);
});

test('D1 API errors are reported, not swallowed', async () => {
  const db = fakeD1();
  const store = createStore({ query: d1Http({ accountId: db.accountId, databaseId: db.databaseId, apiToken: 'wrong', fetchImpl: db.fetch }) });
  await assert.rejects(store.getUser('x'), /D1: Authentication error/);
});

// --- strip packs -----------------------------------------------------------

test('dev billing: a strip pack adds 10 on-device strips after the free one, and can be bought again', async (t) => {
  const s = await start({ config: config() });
  t.after(s.close);
  await s.call('GET', '/api/auth/dev?email=pack@example.com');
  let me = await s.call('GET', '/api/me');
  assert.deepEqual(me.data.credits, { strip: 0, packs: 0 });
  assert.deepEqual(me.data.pack, { label: '$2', strips: 10, available: true });

  // The free one first, without touching credits.
  let r = await s.call('POST', '/api/usage/strip');
  assert.equal(r.status, 200);
  assert.equal(r.data.credit, null);
  r = await s.call('POST', '/api/usage/strip');
  assert.equal(r.status, 402);
  assert.equal(r.data.pack, true);
  assert.match(r.data.error, /try 10 on-device strips for \$2/);

  const buy = await s.call('POST', '/api/billing/pack', { body: { next: '/app/#strip' } });
  assert.equal(buy.data.url, 'http://app.test/app/?pack=1#strip');
  me = await s.call('GET', '/api/me');
  assert.deepEqual(me.data.credits, { strip: 10, packs: 1 });

  // Bought again: the strips add up.
  const again = await s.call('POST', '/api/billing/pack', { body: { next: '/app/' } });
  assert.equal(again.data.url, 'http://app.test/app/?pack=2');
  assert.equal((await s.call('GET', '/api/me')).data.credits.strip, 20);

  for (let i = 0; i < 20; i++) {
    r = await s.call('POST', '/api/usage/strip');
    assert.equal(r.status, 200);
    assert.match(r.data.credit, /^[0-9a-f-]{36}$/);
    assert.equal(r.data.credits.strip, 19 - i);
  }
  assert.equal((await s.call('POST', '/api/usage/strip')).status, 402);
  // Free usage stayed at the one free strip.
  assert.equal((await s.call('GET', '/api/me')).data.usage.strip.used, 1);
});

test('strip pack credits: a failed strip gives its credit back once, only to its owner', async (t) => {
  const s = await start({ config: config() });
  t.after(s.close);
  await s.call('GET', '/api/auth/dev?email=a@example.com');
  await s.call('POST', '/api/usage/strip');
  await s.call('POST', '/api/billing/pack', { body: {} });

  // Server-side refund (the gate's refund()).
  const failed = await s.call('POST', '/api/device?fail=1');
  assert.equal(failed.status, 500);
  assert.ok(failed.data.credit);
  assert.equal((await s.call('GET', '/api/me')).data.credits.strip, 10);

  // The page's refund after an on-device strip failed.
  const use = await s.call('POST', '/api/usage/strip');
  assert.equal(use.data.credits.strip, 9);
  let back = await s.call('POST', '/api/usage/strip/refund', { body: { credit: use.data.credit } });
  assert.equal(back.data.refunded, true);
  assert.equal(back.data.credits.strip, 10);
  // Twice does nothing.
  back = await s.call('POST', '/api/usage/strip/refund', { body: { credit: use.data.credit } });
  assert.equal(back.data.refunded, false);
  assert.equal(back.data.credits.strip, 10);
  // Junk ids do nothing.
  assert.equal((await s.call('POST', '/api/usage/strip/refund', { body: { credit: "x' OR 1=1" } })).data.refunded, false);

  // Someone else can't refund it.
  const mine = await s.call('POST', '/api/usage/strip');
  await s.call('GET', '/api/auth/dev?email=b@example.com');
  assert.equal((await s.call('POST', '/api/usage/strip/refund', { body: { credit: mine.data.credit } })).data.refunded, false);
  // An old use can't be refunded.
  s.db.db.prepare('UPDATE strip_credit_uses SET created_at = created_at - 7200').run();
  await s.call('GET', '/api/auth/dev?email=a@example.com');
  assert.equal((await s.call('POST', '/api/usage/strip/refund', { body: { credit: mine.data.credit } })).data.refunded, false);
  assert.equal((await s.call('GET', '/api/me')).data.credits.strip, 9);
});

test('strip pack credits are never spent while a plan covers on-device stripping', async (t) => {
  const s = await start({ config: config() });
  t.after(s.close);
  await s.call('GET', '/api/auth/dev');
  await s.call('POST', '/api/billing/pack', { body: {} });
  await s.call('POST', '/api/billing/checkout', { body: { plan: 'basic' } });
  for (let i = 0; i < 3; i++) assert.equal((await s.call('POST', '/api/usage/strip')).data.credit, null);
  assert.equal((await s.call('GET', '/api/me')).data.credits.strip, 10);
  // Server strips aren't covered by Basic or by a pack.
  assert.equal((await s.call('POST', '/api/strip')).status, 200);
  const r = await s.call('POST', '/api/strip');
  assert.equal(r.status, 402);
  assert.equal(r.data.pack, false);
  // Plan cancelled: the free strip is used up, so credits kick in.
  await s.call('POST', '/api/billing/portal', { body: {} });
  assert.ok((await s.call('POST', '/api/usage/strip')).data.credit);
  assert.equal((await s.call('GET', '/api/me')).data.credits.strip, 9);
});

test('parallel requests cannot both take the last strip pack credit', async (t) => {
  const s = await start({ config: config({ packStrips: 2 }) });
  t.after(s.close);
  await s.call('GET', '/api/auth/dev');
  await s.call('POST', '/api/usage/strip');
  await s.call('POST', '/api/billing/pack', { body: {} });
  const results = await Promise.all(Array.from({ length: 8 }, () => s.call('POST', '/api/usage/strip')));
  assert.equal(results.filter((r) => r.status === 200).length, 2);
  assert.equal((await s.call('GET', '/api/me')).data.credits.strip, 0);
});

test('Stripe: a strip pack is a one-time Checkout, the webhook adds it once per session', async (t) => {
  const checkouts = [];
  const fetchImpl = async (url, init = {}) => {
    if (url === 'https://api.stripe.com/v1/checkout/sessions') {
      checkouts.push(new URLSearchParams(init.body));
      return Response.json({ id: `cs_${checkouts.length}`, url: `https://checkout.stripe.com/c/cs_${checkouts.length}` });
    }
    throw new Error(`unexpected ${url}`);
  };
  const s = await start({
    config: config({ stripeKey: 'sk_test_x', stripePricePro: 'price_20', stripePricePack: 'price_2', stripeWebhookSecret: 'whsec_t' }),
    fetchImpl,
  });
  t.after(s.close);
  await s.call('GET', '/api/auth/dev?email=buyer@example.com');
  assert.equal((await s.call('GET', '/api/me')).data.pack.available, true);

  const co = await s.call('POST', '/api/billing/pack', { body: { next: '/app/#strip' } });
  assert.equal(co.data.url, 'https://checkout.stripe.com/c/cs_1');
  const p = checkouts[0];
  assert.equal(p.get('mode'), 'payment');
  assert.equal(p.get('line_items[0][price]'), 'price_2');
  assert.equal(p.get('line_items[0][quantity]'), '1');
  assert.equal(p.get('customer_email'), 'buyer@example.com');
  assert.equal(p.get('customer_creation'), 'always');
  assert.equal(p.get('metadata[product]'), 'strip_pack');
  assert.equal(p.get('metadata[strips]'), '10');
  assert.equal(p.get('success_url'), 'http://app.test/app/?pack=1#strip');
  const userId = p.get('client_reference_id');

  const hook = (event) => {
    const body = JSON.stringify(event);
    return s.call('POST', '/api/billing/webhook', { raw: body, headers: { 'content-type': 'application/json', 'stripe-signature': signed('whsec_t', body) } });
  };
  const session = (id, extra = {}) => ({
    id, mode: 'payment', payment_status: 'paid', client_reference_id: userId, customer: 'cus_9',
    amount_total: 200, currency: 'usd', metadata: { product: 'strip_pack', user_id: userId, strips: '10' }, ...extra,
  });

  // Not paid yet (a delayed payment method): nothing added until it succeeds.
  await hook({ id: 'evt_0', type: 'checkout.session.completed', data: { object: session('cs_1', { payment_status: 'unpaid' }) } });
  assert.equal((await s.call('GET', '/api/me')).data.credits.strip, 0);
  assert.equal((await hook({ id: 'evt_1', type: 'checkout.session.async_payment_succeeded', data: { object: session('cs_1') } })).status, 200);
  let me = await s.call('GET', '/api/me');
  assert.deepEqual(me.data.credits, { strip: 10, packs: 1 });
  assert.equal(me.data.plan, 'free');

  // Stripe delivers the same event again: still 10.
  await hook({ id: 'evt_1', type: 'checkout.session.async_payment_succeeded', data: { object: session('cs_1') } });
  await hook({ id: 'evt_1b', type: 'checkout.session.completed', data: { object: session('cs_1') } });
  assert.equal((await s.call('GET', '/api/me')).data.credits.strip, 10);
  const row = s.db.db.prepare('SELECT strips, amount_cents, currency FROM strip_pack_purchases').get();
  assert.deepEqual({ ...row }, { strips: 10, amount_cents: 200, currency: 'usd' });

  // A second purchase stacks, and reuses the Stripe customer saved from the first.
  await s.call('POST', '/api/billing/pack', { body: { next: '/app/' } });
  assert.equal(checkouts[1].get('customer'), 'cus_9');
  assert.equal(checkouts[1].get('customer_email'), null);
  assert.equal(checkouts[1].get('success_url'), 'http://app.test/app/?pack=2');
  await hook({ id: 'evt_2', type: 'checkout.session.completed', data: { object: session('cs_2') } });
  assert.deepEqual((await s.call('GET', '/api/me')).data.credits, { strip: 20, packs: 2 });

  // Other one-time payments and unknown users are ignored without an error.
  assert.equal((await hook({ id: 'evt_3', type: 'checkout.session.completed', data: { object: session('cs_3', { metadata: {} }) } })).status, 200);
  assert.equal((await hook({ id: 'evt_4', type: 'checkout.session.completed', data: { object: session('cs_4', { client_reference_id: 'nobody', metadata: { product: 'strip_pack' } }) } })).status, 200);
  assert.equal((await s.call('GET', '/api/me')).data.credits.strip, 20);
});

test('Stripe without a pack price: the pack is unavailable and the 402 does not offer it', async (t) => {
  const s = await start({
    config: config({ stripeKey: 'sk_test_x', stripePricePro: 'price_20', stripeWebhookSecret: 'whsec_t' }),
    fetchImpl: async (url) => { throw new Error(`unexpected ${url}`); },
  });
  t.after(s.close);
  await s.call('GET', '/api/auth/dev');
  assert.equal((await s.call('GET', '/api/me')).data.pack.available, false);
  assert.equal((await s.call('POST', '/api/billing/pack', { body: {} })).status, 503);
  await s.call('POST', '/api/usage/strip');
  const r = await s.call('POST', '/api/usage/strip');
  assert.equal(r.data.pack, false);
  assert.doesNotMatch(r.data.error, /more for/);
});

test('loadConfig reads the pack settings', () => {
  const c = loadConfig({ STRIPE_PRICE_ID_PACK: 'price_2', PACK_STRIPS: '25', PRICE_LABEL_PACK: '€2' });
  assert.equal(c.stripePricePack, 'price_2');
  assert.equal(c.packStrips, 25);
  assert.equal(c.priceLabels.pack, '€2');
  assert.equal(loadConfig({}).packStrips, 10);
  assert.equal(loadConfig({ PACK_STRIPS: '0' }).packStrips, 10);
});
