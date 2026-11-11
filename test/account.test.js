'use strict';

// node --test: accounts, quota, Google sign-in and Stripe billing, with
// Google and Stripe mocked out.

const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('crypto');
const express = require('express');
const { createAccounts, loadConfig, verifyStripeSignature, safeNext, withQuery } = require('../server/account');
const { openStore } = require('../server/store');

function config(over = {}) {
  return { ...loadConfig({ NODE_ENV: 'test' }), dbFile: ':memory:', sessionSecret: 'test-secret', siteUrl: 'http://app.test', ...over };
}

/** A tiny app: the account routes plus two gated endpoints standing in for strip/download. */
async function start(opts) {
  const accounts = createAccounts({ store: openStore(':memory:'), ...opts });
  const app = express();
  app.use('/api', accounts.router);
  app.post('/api/strip', accounts.gate('strip'), (req, res) => {
    req.quota.refundUnlessSent(res);
    if (req.query.fail) return res.status(500).json({ error: 'boom' });
    res.send('clean');
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
  return { accounts, call, close: () => server.close() };
}

test('helpers', () => {
  assert.equal(safeNext('/app/#youtube'), '/app/#youtube');
  assert.equal(safeNext('//evil.com'), '/app/');
  assert.equal(safeNext('/\\evil.com'), '/app/');
  assert.equal(safeNext('https://evil.com'), '/app/');
  assert.equal(withQuery('/app/#strip', 'upgraded=1'), '/app/?upgraded=1#strip');
  assert.equal(withQuery('/app/?a=1', 'upgraded=1'), '/app/?a=1&upgraded=1');
});

test('dev mode: anonymous is asked to sign in, then gets 1 free strip and 1 free download', async (t) => {
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
  assert.deepEqual(me.data.usage.strip, { used: 0, limit: 1 });

  // A failed strip gives the use back.
  assert.equal((await s.call('POST', '/api/strip?fail=1')).status, 500);
  assert.equal((await s.call('GET', '/api/me')).data.usage.strip.used, 0);

  assert.equal((await s.call('POST', '/api/strip')).status, 200);
  const second = await s.call('POST', '/api/strip');
  assert.equal(second.status, 402);
  assert.equal(second.data.code, 'upgrade_required');
  // On-device strips count against the same quota.
  assert.equal((await s.call('POST', '/api/usage/strip')).status, 402);

  assert.equal((await s.call('POST', '/api/download?fail=1')).status, 202);
  assert.equal((await s.call('POST', '/api/download')).status, 202);
  assert.equal((await s.call('POST', '/api/download')).status, 402);

  // Dev upgrade → unlimited.
  const up = await s.call('POST', '/api/billing/checkout', { body: { next: '/app/#strip' } });
  assert.equal(up.data.url, 'http://app.test/app/?upgraded=1#strip');
  me = await s.call('GET', '/api/me');
  assert.equal(me.data.plan, 'pro');
  assert.equal(me.data.usage.strip.limit, null);
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
  const accounts = createAccounts({ config: config(), store: openStore(':memory:') });
  const tok = accounts.sessionToken(7);
  assert.equal(accounts.readSession(tok), 7);
  const [body, mac] = tok.split('.');
  const forged = Buffer.from(JSON.stringify({ u: 1, e: Date.now() + 1e9 })).toString('base64url');
  assert.equal(accounts.readSession(`${forged}.${mac}`), null);
  assert.equal(accounts.readSession(`${body}.x${mac.slice(1)}`), null);
  assert.equal(accounts.readSession(accounts.sessionToken(7, Date.now() - 31 * 86400000)), null);
});

test('production without Google or Stripe refuses sign-in and checkout instead of faking them', async (t) => {
  const s = await start({ config: config({ production: true }) });
  t.after(s.close);
  assert.equal((await s.call('GET', '/api/auth/google')).status, 503);
  assert.equal((await s.call('GET', '/api/auth/dev')).status, 404);
  assert.equal((await s.call('GET', '/api/me')).data.signIn, null);
});

test('PAYWALL=off lets everyone through without an account', async (t) => {
  const s = await start({ config: config({ paywall: false }) });
  t.after(s.close);
  for (let i = 0; i < 3; i++) assert.equal((await s.call('POST', '/api/strip')).status, 200);
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
    config: config({ stripeKey: 'sk_test_x', stripePrice: 'price_20', stripeWebhookSecret: 'whsec_t' }),
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
  assert.equal(checkoutParams.get('success_url'), 'http://app.test/app/?upgraded=1');

  const hook = (event) => {
    const body = JSON.stringify(event);
    return s.call('POST', '/api/billing/webhook', { raw: body, headers: { 'content-type': 'application/json', 'stripe-signature': signed('whsec_t', body) } });
  };

  // Unsigned events are rejected.
  const forged = await s.call('POST', '/api/billing/webhook', { raw: '{"type":"checkout.session.completed"}', headers: { 'stripe-signature': 't=1,v1=00' } });
  assert.equal(forged.status, 400);

  const periodEnd = Math.floor(Date.now() / 1000) + 30 * 86400;
  subs.set('sub_1', { id: 'sub_1', customer: 'cus_1', status: 'active', items: { data: [{ current_period_end: periodEnd }] } });
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
