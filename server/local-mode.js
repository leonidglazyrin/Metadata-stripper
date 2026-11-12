'use strict';

// Local unlimited mode (npm run dev:local): the whole app on your own
// computer with no accounts, no sign-in, no limits and no paywall. Nothing
// to set up: no D1, Google or Stripe. On-device strips, server strips and
// downloads all work and are never counted.
//
// It is on only when LOCAL_UNLIMITED=1 is set in the environment, and it
// refuses to start anywhere that looks like a deployment, so it can't be
// switched on in production by accident:
//   - NODE_ENV=production (the Docker image sets it)
//   - INTERNAL_SECRET / CONTAINER_SECRET (only set behind the Worker)
//   - the environment variables Cloudflare (Workers Builds, Containers) and
//     the usual hosts (Fly, Railway, Render, Cloud Run, Heroku, Kubernetes) set
//   - HOST set to anything but a loopback address
// On top of that the Worker never passes LOCAL_UNLIMITED to the container
// (PASS in worker/index.js) and always runs with the paywall on
// (worker/app.mjs), and the server only listens on 127.0.0.1 in this mode.

const FLAG = 'LOCAL_UNLIMITED';

/** Variables whose presence means "this is a deployment, not a laptop". */
const DEPLOY_SIGNS = [
  'INTERNAL_SECRET', 'CONTAINER_SECRET',
  // Cloudflare Workers Builds and Cloudflare Containers.
  'WORKERS_CI', 'CF_PAGES', 'CLOUDFLARE_DEPLOYMENT_ID', 'CLOUDFLARE_APPLICATION_ID', 'CLOUDFLARE_DURABLE_OBJECT_ID',
  // Other hosts.
  'FLY_APP_NAME', 'RAILWAY_ENVIRONMENT', 'RENDER', 'K_SERVICE', 'DYNO', 'KUBERNETES_SERVICE_HOST',
];

/** Settings that would turn accounts or billing on, or point at real data. Ignored in local mode. */
const IGNORED = [
  'SITE_URL', 'SESSION_SECRET',
  'CLOUDFLARE_ACCOUNT_ID', 'CLOUDFLARE_D1_DATABASE_ID', 'CLOUDFLARE_API_TOKEN',
  'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET',
  'STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET', 'STRIPE_PRICE_ID', 'STRIPE_PRICE_ID_BASIC', 'STRIPE_PRICE_ID_PRO',
  'STRIPE_PRICE_ID_BASIC_YEARLY', 'STRIPE_PRICE_ID_PRO_YEARLY', 'STRIPE_PRICE_ID_PACK',
  'FREE_STRIPS', 'FREE_SERVER_STRIPS', 'FREE_DOWNLOADS', 'FREE_TRIALS_PER_DAY',
];

const LOOPBACK = /^(127\.\d+\.\d+\.\d+|::1|localhost)$/i;

const requested = (env) => Object.hasOwn(env, FLAG) && env[FLAG] !== '' && env[FLAG] !== '0';

/**
 * Why local mode must not run here: a list of reasons, empty when it's safe.
 * Only meaningful when LOCAL_UNLIMITED is set.
 */
function localModeProblems(env) {
  const problems = [];
  if (env[FLAG] !== '1') problems.push(`${FLAG} must be exactly "1" (got "${env[FLAG]}")`);
  if (env.NODE_ENV === 'production') problems.push('NODE_ENV is "production"');
  for (const k of DEPLOY_SIGNS) if (env[k]) problems.push(`${k} is set, which only happens on a server`);
  if (env.HOST && !LOOPBACK.test(env.HOST)) problems.push(`HOST is "${env.HOST}"; local mode only listens on 127.0.0.1`);
  return problems;
}

/**
 * Check LOCAL_UNLIMITED and, when it's on, switch the process to local mode:
 * the paywall off and every account, billing and D1 setting removed (so a
 * .env with real keys in it can't reach Stripe, Google or the production
 * database). Returns { enabled: false } when the flag isn't set, and
 * { enabled: true, ignored } when it is. Throws when the flag is set
 * somewhere that looks like a deployment.
 */
function applyLocalMode(env = process.env) {
  if (!requested(env)) return { enabled: false, ignored: [] };
  const problems = localModeProblems(env);
  if (problems.length) {
    const err = new Error(`${FLAG} is set, but this doesn't look like your own computer, so the server won't start: ${problems.join('; ')}. `
      + `Local unlimited mode is for npm run dev:local only; remove ${FLAG} here.`);
    err.code = 'LOCAL_MODE_REFUSED';
    throw err;
  }
  const ignored = IGNORED.filter((k) => env[k]);
  for (const k of IGNORED) delete env[k];
  env.PAYWALL = 'off';
  env.HOST = '127.0.0.1';
  return { enabled: true, ignored };
}

module.exports = { applyLocalMode, localModeProblems, FLAG, DEPLOY_SIGNS, IGNORED };
