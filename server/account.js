'use strict';

// Accounts (Google sign-in), the free quota, and the two Stripe plans.
//
//   Free   1 on-device strip, 1 server strip, 1 download per account
//          (configurable in the app_settings table)
//   Basic  $10/month: unlimited on-device stripping
//   Pro    $20/month: unlimited everything (server stripping, downloads)
//
//   GET  /api/me                     who is signed in, plan, usage
//   GET  /api/auth/google            start Google sign-in (?next=/app/#youtube)
//   GET  /api/auth/google/callback   Google sends the user back here
//   GET  /api/auth/dev               dev only: sign in without Google
//   POST /api/auth/logout
//   POST /api/usage/strip            count one on-device strip before it runs
//   POST /api/billing/checkout       { plan } → { url } of Stripe Checkout, or
//                                    of the Portal's confirm page to switch plan
//   POST /api/billing/portal         → { url } of the Stripe Customer Portal
//   POST /api/billing/webhook        Stripe events: turn the license on / off
//
// Accounts, subscriptions and usage live in Supabase (see server/store.js and
// supabase/migrations/). Sessions are signed cookies, so the server keeps
// nothing on disk and can run in throwaway containers.
//
// Without GOOGLE_* / STRIPE_* set and NODE_ENV not "production", sign-in and
// billing run in dev mode: "Sign in" logs into a test account and "Upgrade"
// turns the plan on at once, so the whole flow can be tried locally. Supabase is
// still required whenever the paywall is on.

const express = require('express');
const crypto = require('crypto');
const { createSupabaseStore, planOf, isUnlimited } = require('./store');
const log = require('./log');

const COOKIE = 'sh_sess';
const STATE_COOKIE = 'sh_oauth';
const SESSION_DAYS = 30;

function loadConfig(env = process.env) {
  const production = env.NODE_ENV === 'production';
  return {
    production,
    siteUrl: (env.SITE_URL || '').replace(/\/+$/, ''),
    googleId: env.GOOGLE_CLIENT_ID || '',
    googleSecret: env.GOOGLE_CLIENT_SECRET || '',
    stripeKey: env.STRIPE_SECRET_KEY || '',
    stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET || '',
    // STRIPE_PRICE_ID is the older name of the Pro price.
    stripePriceBasic: env.STRIPE_PRICE_ID_BASIC || '',
    stripePricePro: env.STRIPE_PRICE_ID_PRO || env.STRIPE_PRICE_ID || '',
    sessionSecret: env.SESSION_SECRET || '',
    supabaseUrl: env.SUPABASE_URL || '',
    supabaseKey: env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SECRET_KEY || '',
    paywall: !/^(0|off|false|no)$/i.test(env.PAYWALL || ''),
    // Free allowances come from the app_settings table in Supabase (default
    // 1 each). Setting these env vars overrides the table.
    freeStrips: limitFromEnv(env.FREE_STRIPS),
    freeServerStrips: limitFromEnv(env.FREE_SERVER_STRIPS),
    freeDownloads: limitFromEnv(env.FREE_DOWNLOADS),
    // Shown on the page; the charge itself comes from the Stripe price.
    priceLabels: {
      basic: env.PRICE_LABEL_BASIC || '$10',
      pro: env.PRICE_LABEL_PRO || env.PRICE_LABEL || '$20',
    },
  };
}

function limitFromEnv(v) {
  if (v === undefined || v === '') return null;
  const n = Number(v);
  return Number.isInteger(n) && n >= 0 ? n : null;
}

const DEFAULT_FREE = 1;

const KINDS = ['strip', 'server_strip', 'download'];
const PLANS = ['basic', 'pro'];
const PLAN_NAME = { free: 'Free', basic: 'Basic', pro: 'Pro' };
/** Cheapest plan with no limit on each kind. */
const NEEDS = { strip: 'basic', server_strip: 'pro', download: 'pro' };
/** Columns of the accounts view. */
const USED = { strip: 'strips_used', server_strip: 'server_strips_used', download: 'downloads_used' };
/** app_settings keys and config fields. */
const SETTING = { strip: 'free_strips', server_strip: 'free_server_strips', download: 'free_downloads' };
const ENV = { strip: 'freeStrips', server_strip: 'freeServerStrips', download: 'freeDownloads' };

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

function parseCookies(header) {
  const out = {};
  for (const part of (header || '').split(';')) {
    const i = part.indexOf('=');
    if (i < 0) continue;
    const k = part.slice(0, i).trim();
    if (!k || Object.hasOwn(out, k)) continue;
    try { out[k] = decodeURIComponent(part.slice(i + 1).trim()); } catch { /* skip malformed */ }
  }
  return out;
}

const b64u = (buf) => Buffer.from(buf).toString('base64url');

/** Form-encode nested objects the way Stripe's API expects (a[b][0]=c). */
function stripeForm(obj, prefix = '', out = new URLSearchParams()) {
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (typeof v === 'object') stripeForm(v, key, out);
    else out.append(key, String(v));
  }
  return out;
}

/** Verify a Stripe-Signature header (v1 = HMAC-SHA256 of "t.payload"). */
function verifyStripeSignature(payload, header, secret, toleranceSec = 300, now = Date.now()) {
  if (!header || !secret) return false;
  let t = null;
  const sigs = [];
  for (const part of header.split(',')) {
    const [k, v] = part.split('=');
    if (k === 't') t = Number(v);
    else if (k === 'v1' && v) sigs.push(v);
  }
  if (!t || !sigs.length || Math.abs(now / 1000 - t) > toleranceSec) return false;
  const expected = crypto.createHmac('sha256', secret).update(`${t}.`).update(payload).digest();
  return sigs.some((s) => {
    const got = Buffer.from(s, 'hex');
    return got.length === expected.length && crypto.timingSafeEqual(got, expected);
  });
}

/** Only same-site paths are allowed as a post-login destination. */
function safeNext(next) {
  return typeof next === 'string' && /^\/(?![/\\])/.test(next) && next.length < 300 ? next : '/app/';
}

// ---------------------------------------------------------------------------

function createAccounts({ config = loadConfig(), store, fetchImpl = fetch } = {}) {
  if (!store && config.paywall) {
    store = createSupabaseStore({ url: config.supabaseUrl, key: config.supabaseKey, fetchImpl });
  }
  const google = Boolean(config.googleId && config.googleSecret);
  const priceOf = { basic: config.stripePriceBasic, pro: config.stripePricePro };
  const stripe = Boolean(config.stripeKey && (priceOf.basic || priceOf.pro));
  const devAuth = !google && !config.production;
  const devBilling = !stripe && !config.production;

  let secret = config.sessionSecret;
  if (!secret) {
    if (config.production && config.paywall) log.fail('account', 'SESSION_SECRET is not set: sessions end on every restart. Set it to a long random string.');
    secret = crypto.randomBytes(32).toString('hex');
  }

  if (config.paywall) {
    log.info(`Accounts: sign-in ${google ? 'Google' : devAuth ? 'DEV (local test account, no Google)' : 'NOT CONFIGURED'}, `
      + `billing ${stripe ? 'Stripe' : devBilling ? 'DEV (upgrade is free and instant)' : 'NOT CONFIGURED'}, `
      + `accounts in Supabase (${config.supabaseUrl || 'custom store'}), free tier from `
      + `${KINDS.some((k) => config[ENV[k]] !== null) ? 'FREE_* env' : 'the app_settings table'}`
      + `${stripe ? `, plans: ${PLANS.filter((p) => priceOf[p]).join(' + ') || 'none'}` : ''}`);
    if (stripe && PLANS.some((p) => !priceOf[p])) {
      log.fail('billing', `STRIPE_PRICE_ID_${PLANS.find((p) => !priceOf[p]).toUpperCase()} is not set: that plan can't be bought`);
    }
  } else {
    log.info('Accounts: PAYWALL=off, everything is free and no sign-in is needed');
  }

  // --- sessions -------------------------------------------------------------

  const sign = (data) => b64u(crypto.createHmac('sha256', secret).update(data).digest());

  function sessionToken(userId, now = Date.now()) {
    const body = b64u(JSON.stringify({ u: userId, e: now + SESSION_DAYS * 86400000 }));
    return `${body}.${sign(body)}`;
  }

  function readSession(token, now = Date.now()) {
    if (!token) return null;
    const [body, mac] = token.split('.');
    if (!body || !mac) return null;
    const expected = Buffer.from(sign(body));
    const got = Buffer.from(mac);
    if (got.length !== expected.length || !crypto.timingSafeEqual(got, expected)) return null;
    try {
      const { u, e } = JSON.parse(Buffer.from(body, 'base64url').toString());
      return e > now ? u : null;
    } catch { return null; }
  }

  const secure = (req) => config.production || baseUrl(req).startsWith('https:');
  const cookieOpts = (req, maxAgeSec) => `Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSec}${secure(req) ? '; Secure' : ''}`;
  const setCookie = (res, req, name, value, maxAgeSec) => {
    const prev = res.getHeader('Set-Cookie');
    const list = Array.isArray(prev) ? prev : prev ? [prev] : [];
    res.setHeader('Set-Cookie', [...list, `${name}=${encodeURIComponent(value)}; ${cookieOpts(req, maxAgeSec)}`]);
  };

  async function currentUser(req) {
    if (req._user !== undefined) return req._user;
    const id = readSession(parseCookies(req.headers.cookie)[COOKIE]);
    req._user = id && store ? await store.getUser(id) : null;
    return req._user;
  }

  /** Free allowances per kind: env override, else the app_settings table, else 1. */
  async function limits() {
    const s = KINDS.every((k) => config[ENV[k]] !== null) ? {} : await store.settings();
    const out = {};
    for (const k of KINDS) {
      const n = Number(s[SETTING[k]]);
      out[k] = config[ENV[k]] ?? (s[SETTING[k]] !== undefined && Number.isInteger(n) && n >= 0 ? n : DEFAULT_FREE);
    }
    return out;
  }

  /** The plan a Stripe price pays for. */
  function tierForPrice(priceId) {
    if (priceId && priceId === priceOf.basic) return 'basic';
    if (priceId && priceId === priceOf.pro) return 'pro';
    // A price we don't know (e.g. an old one): keep the customer fully served.
    if (priceId) log.fail('billing', `price ${priceId} is neither STRIPE_PRICE_ID_BASIC nor STRIPE_PRICE_ID_PRO; treating it as Pro`);
    return 'pro';
  }

  /** Wrap an async route so a Supabase outage answers 503 instead of hanging. */
  const safe = (fn) => async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (e) {
      log.fail('account', `${req.method} ${req.originalUrl}: ${e.message}`);
      if (!res.headersSent) res.status(503).json({ error: 'Accounts are unavailable right now, please try again', code: 'unavailable' });
    }
  };

  function signIn(req, res, user) {
    setCookie(res, req, COOKIE, sessionToken(user.id), SESSION_DAYS * 86400);
  }

  // The public origin, for OAuth and Stripe return links. In dev the Vite
  // proxy passes the page's own host along as X-Forwarded-Host.
  function baseUrl(req) {
    if (config.siteUrl) return config.siteUrl;
    const fwd = !config.production && req.get('x-forwarded-host');
    const hostHeader = fwd || req.get('host') || '';
    const host = /^[a-z0-9.-]+(:\d+)?$/i.test(hostHeader) ? hostHeader : 'localhost';
    const proto = req.get('x-forwarded-proto')?.split(',')[0].trim() === 'https' ? 'https' : req.protocol;
    return `${proto}://${host}`;
  }

  // --- what the page shows --------------------------------------------------

  async function account(user) {
    const plan = planOf(user);
    const lim = config.paywall && store && plan !== 'pro' ? await limits() : null;
    return {
      paywall: config.paywall,
      signedIn: Boolean(user),
      user: user ? { email: user.email, name: user.name, picture: user.picture } : null,
      plan,
      usage: user ? Object.fromEntries(KINDS.map((k) => [k, {
        used: Number(user[USED[k]] ?? 0),
        limit: isUnlimited(plan, k) ? null : lim[k],
      }])) : null,
      subscription: user && user.subscription_status ? {
        status: user.subscription_status,
        renewsAt: user.current_period_end ? user.current_period_end * 1000 : null,
        cancelAtPeriodEnd: Boolean(user.cancel_at_period_end),
        manageable: Boolean(user.stripe_customer_id) || devBilling,
      } : null,
      // The free allowance every account starts with (for the sign-in step).
      free: lim,
      plans: PLANS.map((id) => ({
        id,
        name: PLAN_NAME[id],
        label: config.priceLabels[id],
        interval: 'month',
        available: Boolean(priceOf[id]) || devBilling,
      })),
      // Older pages read this: the Pro price.
      price: { label: config.priceLabels.pro, interval: 'month' },
      signIn: google ? 'google' : devAuth ? 'dev' : null,
      dev: { auth: devAuth, billing: devBilling },
    };
  }

  // --- quota ----------------------------------------------------------------

  const NOOP = { refund() {}, refundUnlessSent() {} };
  const word = { strip: 'on-device strip', server_strip: 'server strip', download: 'download' };
  const verb = { strip: 'strip on your device', server_strip: 'strip on our server', download: 'download' };

  /**
   * Middleware: count one use of `kind` for the signed-in user, or answer
   * 401 (not signed in) / 402 (free use spent, with the plan that unlocks
   * it). Sets req.quota with refund() for when the work fails and nothing
   * reaches the user.
   */
  const gate = (kind) => safe(async (req, res, next) => {
    if (!config.paywall) { req.quota = NOOP; return next(); }
    const user = await currentUser(req);
    if (!user) {
      return res.status(401).json({ error: `Sign in with Google to ${verb[kind]} for free`, code: 'auth_required', kind });
    }
    const n = (await limits())[kind];
    if (!(await store.consume(user.id, kind, n))) {
      const needs = NEEDS[kind];
      const upgrade = needs === 'basic' ? 'Basic or Pro' : 'Pro';
      return res.status(402).json({
        error: n === 0
          ? `Upgrade to ${upgrade} to ${verb[kind]}.`
          : `You've used your free ${word[kind]}${n === 1 ? '' : `s (${n})`}. Upgrade to ${upgrade} for unlimited.`,
        code: 'upgrade_required',
        kind,
        plan: needs,
      });
    }
    let refunded = false;
    const refund = () => {
      if (refunded) return;
      refunded = true;
      store.refund(user.id, kind).catch((e) => log.fail('account', `refund ${kind} for user ${user.id}: ${e.message}`));
    };
    req.quota = {
      refund,
      // For routes whose response *is* the file: give the use back unless
      // the whole file went out with a 200.
      refundUnlessSent(r) {
        r.on('close', () => { if (!(r.statusCode === 200 && r.writableFinished)) refund(); });
      },
    };
    next();
  });

  // --- Stripe ---------------------------------------------------------------

  async function stripeApi(method, endpoint, params) {
    const res = await fetchImpl(`https://api.stripe.com/v1/${endpoint}`, {
      method,
      headers: {
        Authorization: `Bearer ${config.stripeKey}`,
        ...(params ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}),
      },
      body: params ? stripeForm(params).toString() : undefined,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(data?.error?.message || `Stripe error (HTTP ${res.status})`);
      err.status = res.status;
      throw err;
    }
    return data;
  }

  /** Copy a Stripe subscription object onto the user it belongs to. */
  async function applySubscription(sub, userId) {
    const customer = typeof sub.customer === 'string' ? sub.customer : sub.customer?.id;
    let user = userId ? await store.getUser(userId) : null;
    if (!user && customer) user = await store.userByCustomer(customer);
    if (!user && sub.metadata?.user_id) user = await store.getUser(String(sub.metadata.user_id));
    if (!user) return null;
    if (customer && user.stripe_customer_id !== customer) await store.setCustomer(user.id, customer);
    // Newer API versions keep the period on the subscription item.
    const item = sub.items?.data?.[0];
    const periodEnd = sub.current_period_end ?? item?.current_period_end ?? null;
    const priceId = item?.price?.id ?? null;
    await store.setSubscription(user.id, {
      id: sub.id,
      status: sub.status,
      periodEnd,
      cancelAtPeriodEnd: Boolean(sub.cancel_at_period_end || sub.cancel_at),
      priceId,
      tier: tierForPrice(priceId),
    });
    return store.getUser(user.id);
  }

  async function handleEvent(event) {
    const obj = event.data?.object || {};
    switch (event.type) {
      case 'checkout.session.completed': {
        if (obj.mode !== 'subscription') return;
        const userId = obj.client_reference_id || null;
        if (userId && obj.customer && await store.getUser(userId)) await store.setCustomer(userId, obj.customer);
        if (obj.subscription) {
          const sub = await stripeApi('GET', `subscriptions/${encodeURIComponent(obj.subscription)}`);
          const u = await applySubscription(sub, userId);
          if (u) log.ok('billing', `user ${u.id} (${u.email}) subscribed to ${planOf(u)}: ${sub.status}`);
        }
        return;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
      case 'customer.subscription.paused':
      case 'customer.subscription.resumed': {
        // Events can arrive out of order, so read the subscription as it is now.
        let sub = obj;
        try { sub = await stripeApi('GET', `subscriptions/${encodeURIComponent(obj.id)}`); } catch (e) {
          if (e.status !== 404) throw e;
        }
        const u = await applySubscription(sub);
        if (u) log.note('billing', `user ${u.id} (${u.email}) subscription ${sub.status}, plan ${planOf(u)}${u.cancel_at_period_end ? ' (cancels at period end)' : ''}`);
        else log.note('billing', `${event.type} for unknown customer ${sub.customer}`);
        return;
      }
      default:
    }
  }

  // --- routes ---------------------------------------------------------------

  const router = express.Router();
  const json = express.json({ limit: '4kb' });

  router.get('/me', safe(async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.json(await account(await currentUser(req)));
  }));

  router.get('/auth/google', (req, res) => {
    const next = safeNext(req.query.next);
    if (!google) {
      if (devAuth) return res.redirect(302, `/api/auth/dev?next=${encodeURIComponent(next)}`);
      return res.status(503).type('text').send('Google sign-in is not set up on this server (GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET).');
    }
    const state = b64u(crypto.randomBytes(18));
    setCookie(res, req, STATE_COOKIE, `${state}|${next}`, 600);
    const params = new URLSearchParams({
      client_id: config.googleId,
      redirect_uri: `${baseUrl(req)}/api/auth/google/callback`,
      response_type: 'code',
      scope: 'openid email profile',
      state,
      prompt: 'select_account',
    });
    res.redirect(302, `https://accounts.google.com/o/oauth2/v2/auth?${params}`);
  });

  router.get('/auth/google/callback', async (req, res) => {
    const saved = parseCookies(req.headers.cookie)[STATE_COOKIE] || '';
    const bar = saved.indexOf('|');
    const state = bar > 0 ? saved.slice(0, bar) : '';
    const next = safeNext(bar > 0 ? saved.slice(bar + 1) : '');
    setCookie(res, req, STATE_COOKIE, '', 0);
    const fail = (why) => {
      log.fail('account', `Google sign-in failed: ${why}`);
      res.redirect(302, `${next.split('#')[0]}${next.includes('?') ? '&' : '?'}signin=failed`);
    };
    if (!google) return res.sendStatus(404);
    if (req.query.error) return fail(String(req.query.error));
    if (!state || req.query.state !== state || typeof req.query.code !== 'string') return fail('state mismatch or missing code');
    try {
      const tokenRes = await fetchImpl('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code: req.query.code,
          client_id: config.googleId,
          client_secret: config.googleSecret,
          redirect_uri: `${baseUrl(req)}/api/auth/google/callback`,
          grant_type: 'authorization_code',
        }).toString(),
      });
      const tok = await tokenRes.json();
      if (!tokenRes.ok || !tok.access_token) return fail(tok.error_description || tok.error || `token HTTP ${tokenRes.status}`);
      // Ask Google who this is over TLS with the fresh token, rather than
      // decoding the ID token ourselves.
      const infoRes = await fetchImpl('https://openidconnect.googleapis.com/v1/userinfo', {
        headers: { Authorization: `Bearer ${tok.access_token}` },
      });
      const info = await infoRes.json();
      if (!infoRes.ok || !info.sub) return fail(`userinfo HTTP ${infoRes.status}`);
      if (info.email && info.email_verified === false) return fail('email not verified');
      const user = await store.upsertGoogleUser(info);
      signIn(req, res, user);
      log.ok('account', `user ${user.id} (${user.email}) signed in`);
      res.redirect(302, next);
    } catch (e) {
      fail(e.message);
    }
  });

  // Dev mode only: a local account per ?email=, so the paywall can be tried
  // without Google credentials.
  router.get('/auth/dev', safe(async (req, res) => {
    if (!devAuth || !store) return res.sendStatus(404);
    const email = /^[^\s@]+@[^\s@]+$/.test(req.query.email || '') ? req.query.email : 'dev@localhost';
    const user = await store.upsertGoogleUser({ sub: `dev:${email}`, email, name: 'Dev user' });
    signIn(req, res, user);
    log.note('account', `dev sign-in as user ${user.id} (${email})`);
    res.redirect(302, safeNext(req.query.next));
  }));

  router.post('/auth/logout', safe(async (req, res) => {
    setCookie(res, req, COOKIE, '', 0);
    res.json(await account(null));
  }));

  // On-device stripping never reaches the server, so the page asks for one
  // use first. (A determined user could skip this in the browser; the
  // server-side tools are the ones that can't be bypassed.)
  router.post('/usage/strip', gate('strip'), safe(async (req, res) => {
    req._user = undefined;
    res.json(await account(await currentUser(req)));
  }));

  router.post('/billing/checkout', json, safe(async (req, res) => {
    const user = await currentUser(req);
    if (!user) return res.status(401).json({ error: 'Sign in first', code: 'auth_required' });
    const want = PLANS.includes(req.body?.plan) ? req.body.plan : 'pro';
    const back = safeNext(req.body?.next);
    const site = baseUrl(req);
    const done = `${site}${withQuery(back, `upgraded=${want}`)}`;
    const current = planOf(user);
    if (current === want) return res.json({ url: `${site}${back}` });

    if (!stripe) {
      if (!devBilling) return res.status(503).json({ error: 'Payments are not set up on this server yet' });
      await store.setSubscription(user.id, {
        id: `dev_sub_${user.id}`, status: 'active', periodEnd: Math.floor(Date.now() / 1000) + 30 * 86400, tier: want,
      });
      log.note('billing', `dev ${current === 'free' ? 'upgrade' : 'plan change'}: user ${user.id} is on ${want}`);
      return res.json({ url: done });
    }
    if (!priceOf[want]) return res.status(503).json({ error: `The ${PLAN_NAME[want]} plan isn't set up on this server yet` });

    try {
      // Already paying: switch the existing subscription (Stripe prorates)
      // on the Customer Portal's confirm page instead of starting a second one.
      if (current !== 'free' && user.stripe_customer_id) {
        return res.json({ url: await switchPlanUrl(user, want, done, `${site}${back}`) });
      }
      const session = await stripeApi('POST', 'checkout/sessions', {
        mode: 'subscription',
        line_items: [{ price: priceOf[want], quantity: 1 }],
        client_reference_id: String(user.id),
        ...(user.stripe_customer_id ? { customer: user.stripe_customer_id } : { customer_email: user.email || undefined }),
        subscription_data: { metadata: { user_id: String(user.id), plan: want } },
        allow_promotion_codes: 'true',
        success_url: done,
        cancel_url: `${site}${back}`,
      });
      res.json({ url: session.url });
    } catch (e) {
      log.fail('billing', `checkout (${want}) for user ${user.id}: ${e.message}`);
      res.status(502).json({ error: 'Could not reach Stripe, please try again' });
    }
  }));

  /** A Customer Portal link that goes straight to "confirm the new plan". */
  async function switchPlanUrl(user, want, doneUrl, backUrl) {
    try {
      const sub = await stripeApi('GET', `subscriptions/${encodeURIComponent(user.subscription_id)}`);
      const item = sub.items?.data?.[0];
      if (!item?.id) throw new Error('subscription has no items');
      const session = await stripeApi('POST', 'billing_portal/sessions', {
        customer: user.stripe_customer_id,
        return_url: backUrl,
        flow_data: {
          type: 'subscription_update_confirm',
          subscription_update_confirm: { subscription: sub.id, items: [{ id: item.id, price: priceOf[want], quantity: 1 }] },
          after_completion: { type: 'redirect', redirect: { return_url: doneUrl } },
        },
      });
      log.note('billing', `user ${user.id} is switching ${planOf(user)} → ${want}`);
      return session.url;
    } catch (e) {
      // E.g. plan switching isn't turned on in the portal settings: open the
      // portal's home page, where they can still manage the subscription.
      log.fail('billing', `plan switch for user ${user.id}: ${e.message}; opening the plain portal`);
      const session = await stripeApi('POST', 'billing_portal/sessions', { customer: user.stripe_customer_id, return_url: backUrl });
      return session.url;
    }
  }

  router.post('/billing/portal', json, safe(async (req, res) => {
    const user = await currentUser(req);
    if (!user) return res.status(401).json({ error: 'Sign in first', code: 'auth_required' });
    const back = `${baseUrl(req)}${safeNext(req.body?.next)}`;
    if (!stripe) {
      if (!devBilling) return res.status(503).json({ error: 'Payments are not set up on this server yet' });
      // Dev: "managing" the plan simply cancels it, to test the free state again.
      await store.setSubscription(user.id, { id: `dev_sub_${user.id}`, status: 'canceled', periodEnd: null });
      log.note('billing', `dev cancel: user ${user.id} is back on free`);
      return res.json({ url: back });
    }
    if (!user.stripe_customer_id) return res.status(400).json({ error: 'No subscription to manage yet' });
    try {
      const session = await stripeApi('POST', 'billing_portal/sessions', { customer: user.stripe_customer_id, return_url: back });
      res.json({ url: session.url });
    } catch (e) {
      log.fail('billing', `portal for user ${user.id}: ${e.message}`);
      res.status(502).json({ error: 'Could not reach Stripe, please try again' });
    }
  }));

  router.post('/billing/webhook', express.raw({ type: '*/*', limit: '1mb' }), async (req, res) => {
    if (!store) return res.status(503).json({ error: 'Accounts are off (PAYWALL=off)' });
    if (!config.stripeWebhookSecret) return res.status(503).json({ error: 'STRIPE_WEBHOOK_SECRET is not set' });
    const payload = Buffer.isBuffer(req.body) ? req.body : Buffer.from('');
    if (!verifyStripeSignature(payload, req.get('stripe-signature'), config.stripeWebhookSecret)) {
      log.fail('billing', 'webhook with a bad signature rejected');
      return res.status(400).json({ error: 'Bad signature' });
    }
    let event;
    try { event = JSON.parse(payload.toString('utf8')); } catch { return res.status(400).json({ error: 'Bad JSON' }); }
    try {
      // Safe to run twice: every handler re-reads the subscription from Stripe.
      await handleEvent(event);
      res.json({ received: true });
    } catch (e) {
      // Non-2xx makes Stripe retry later.
      log.fail('billing', `webhook ${event.type} ${event.id}: ${e.message}`);
      res.status(500).json({ error: 'Handler failed' });
    }
  });

  return { router, gate, currentUser, account, limits, store, sessionToken, readSession, handleEvent, tierForPrice };
}

function withQuery(p, q) {
  const [pathAndQuery, hash] = p.split('#');
  return `${pathAndQuery}${pathAndQuery.includes('?') ? '&' : '?'}${q}${hash !== undefined ? `#${hash}` : ''}`;
}

module.exports = { createAccounts, loadConfig, parseCookies, stripeForm, verifyStripeSignature, safeNext, withQuery };
