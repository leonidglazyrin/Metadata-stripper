// Cloudflare Containers entry point. The whole app (Express API + built web
// pages) runs in the Docker image from ../Dockerfile; this Worker only starts
// that container and forwards every request to it.
//
// One named instance serves all traffic, because download jobs and their
// files live in the container's memory and disk while they run: a second
// instance would not know a job the first one started. It sleeps after
// SLEEP_AFTER of no requests (cold start is a few seconds) and wakes on the
// next one. Accounts and usage are in D1, so nothing is lost when it sleeps.

import { Container, getContainer } from '@cloudflare/containers';

// Worker variables and secrets passed through to the server's process.env.
const PASS = [
  'SITE_URL', 'CONTACT_EMAIL', 'SESSION_SECRET', 'PAYWALL',
  'CLOUDFLARE_ACCOUNT_ID', 'CLOUDFLARE_D1_DATABASE_ID', 'CLOUDFLARE_API_TOKEN',
  'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET',
  'STRIPE_SECRET_KEY', 'STRIPE_PRICE_ID', 'STRIPE_PRICE_ID_BASIC', 'STRIPE_PRICE_ID_PRO', 'STRIPE_PRICE_ID_PACK', 'STRIPE_WEBHOOK_SECRET',
  'FREE_STRIPS', 'FREE_SERVER_STRIPS', 'FREE_DOWNLOADS', 'PRICE_LABEL_BASIC', 'PRICE_LABEL_PRO', 'PRICE_LABEL_PACK', 'PACK_STRIPS',
  'DOWNLOAD_TTL_MIN', 'MAX_UPLOAD_MB', 'YTDLP_COOKIES',
];

export class SharonaServer extends Container {
  defaultPort = 3000;

  constructor(ctx, env) {
    super(ctx, env);
    this.sleepAfter = env.SLEEP_AFTER || '15m';
    this.envVars = Object.fromEntries(PASS.filter((k) => typeof env[k] === 'string' && env[k] !== '').map((k) => [k, env[k]]));
  }
}

export default {
  async fetch(request, env) {
    return getContainer(env.SERVER, 'main').fetch(request);
  },
};
