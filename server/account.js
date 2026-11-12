'use strict';

// Express side of the accounts (server/accounts-core.js holds the logic).
//
// In production on Cloudflare the Worker (worker/app.mjs) answers every
// account route itself; the container only ever sees server strips and
// downloads, and uses gate() below to count them. Locally (npm run dev) and
// when self-hosting the container image without the Worker, this router
// serves the account routes too.

const express = require('express');
const log = require('./log');
const core = require('./accounts-core');

/** Express request → Fetch API Request (the body is a Buffer from express.raw). */
function toRequest(req) {
  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (k === 'host' || k === 'content-length' || k === 'connection' || k === 'transfer-encoding') continue;
    for (const one of Array.isArray(v) ? v : [v]) if (v !== undefined) headers.append(k, one);
  }
  const host = /^[a-z0-9.-]+(:\d+)?$/i.test(req.get('host') || '') ? req.get('host') : 'localhost';
  const hasBody = !['GET', 'HEAD'].includes(req.method) && Buffer.isBuffer(req.body) && req.body.length;
  return new Request(`${req.protocol}://${host}${req.originalUrl}`, {
    method: req.method,
    headers,
    body: hasBody ? req.body : undefined,
    redirect: 'manual',
  });
}

/** Fetch API Response → Express response. */
async function send(res, response) {
  res.status(response.status);
  for (const [k, v] of response.headers) if (k !== 'set-cookie') res.setHeader(k, v);
  const cookies = response.headers.getSetCookie();
  if (cookies.length) res.setHeader('Set-Cookie', cookies);
  res.end(Buffer.from(await response.arrayBuffer()));
}

function createAccounts(opts = {}) {
  const accounts = core.createAccountsCore(opts);
  const { config, store } = accounts;

  async function currentUser(req) {
    if (req._user !== undefined) return req._user;
    req._user = await accounts.userFromCookies(req.headers.cookie);
    return req._user;
  }

  // Account routes: raw body (the webhook checks Stripe's signature on the
  // exact bytes), then the shared handler.
  const router = express.Router();
  const raw = express.raw({ type: () => true, limit: '1mb' });
  router.use(async (req, res, next) => {
    const path = `/api${req.path}`;
    if (!accounts.handles(path)) return next();
    raw(req, res, async (err) => {
      if (err) return next(err);
      try {
        await send(res, await accounts.handle(toRequest(req)));
      } catch (e) {
        next(e);
      }
    });
  });

  const NOOP = { credit: null, refund() {}, refundUnlessSent() {} };

  /**
   * Middleware: count one use of `kind` for the signed-in user, or answer
   * 401 (not signed in) / 402 (free use spent, or today's free trials are
   * taken). Sets req.quota with refund() for when the work fails and nothing
   * reaches the user.
   *
   * trialCap: also take one of today's site-wide free trials for a free
   * server strip or download. On by default; the container turns it off
   * because the Worker already took it before letting the request in.
   */
  const gate = (kind, { trialCap = true } = {}) => async (req, res, next) => {
    try {
      if (!config.paywall) { req.quota = NOOP; return next(); }
      const user = await currentUser(req);
      if (trialCap && core.SERVER_KINDS.includes(kind)) {
        const no = await accounts.admit(user, kind);
        if (no) return res.status(no.status).json(no.body);
      }
      const r = await accounts.use(user, kind);
      if (!r.ok) return res.status(r.status).json(r.body);
      req.quota = {
        // The pack credit this use spent, or null when it was free or on a plan.
        credit: r.credit,
        refund: r.refund,
        // For routes whose response *is* the file: give the use back unless
        // the whole file went out with a 200.
        refundUnlessSent(out) {
          out.on('close', () => { if (!(out.statusCode === 200 && out.writableFinished)) r.refund(); });
        },
      };
      next();
    } catch (e) {
      log.fail('account', `${req.method} ${req.originalUrl}: ${e.message}`);
      if (!res.headersSent) res.status(503).json({ error: 'Accounts are unavailable right now, please try again', code: 'unavailable' });
    }
  };

  return {
    router,
    gate,
    currentUser,
    account: accounts.account,
    limits: accounts.limits,
    store,
    sessionToken: accounts.sessionToken,
    readSession: accounts.readSession,
    handleEvent: accounts.handleEvent,
    tierForPrice: accounts.tierForPrice,
    intervalForPrice: accounts.intervalForPrice,
    core: accounts,
  };
}

module.exports = {
  createAccounts,
  loadConfig: core.loadConfig,
  parseCookies: core.parseCookies,
  stripeForm: core.stripeForm,
  verifyStripeSignature: core.verifyStripeSignature,
  safeNext: core.safeNext,
  withQuery: core.withQuery,
};
