// Cloudflare entry point. The Worker (worker/app.mjs) serves the pages, the
// static files and every account route (sign-in, /api/me, usage, billing,
// Stripe webhooks) itself, with the D1 binding. Only server strips and
// downloads go on to the container from ../Dockerfile (ffmpeg, sharp,
// yt-dlp), and only after the Worker has checked them: signed in, Pro or a
// free use left within today's site-wide free trial cap, a valid link or a
// multipart upload under MAX_UPLOAD_MB. On-device stripping never wakes it.
//
// One named instance serves all container traffic, because download jobs and
// their files live in the container's memory and disk while they run: a
// second instance would not know a job the first one started. It sleeps after
// SLEEP_AFTER of no requests (cold start is a few seconds) and wakes on the
// next one. Accounts and usage are in D1, so nothing is lost when it sleeps.

import { Container, getContainer } from '@cloudflare/containers';
import { createApp, internalSecret } from './app.mjs';

// Worker variables and secrets passed through to the server's process.env.
// The container never handles sign-in or billing, so the Google and Stripe
// secrets stay in the Worker.
const PASS = [
  'SITE_URL', 'CONTACT_EMAIL', 'SESSION_SECRET', 'PAYWALL',
  'CLOUDFLARE_ACCOUNT_ID', 'CLOUDFLARE_D1_DATABASE_ID', 'CLOUDFLARE_API_TOKEN',
  'FREE_STRIPS', 'FREE_SERVER_STRIPS', 'FREE_DOWNLOADS', 'FREE_TRIALS_PER_DAY',
  'DOWNLOAD_TTL_MIN', 'DOWNLOAD_MAX_MIN', 'MAX_UPLOAD_MB', 'MAX_DOWNLOAD_MB', 'YTDLP_COOKIES',
];

export class SharonaServer extends Container {
  defaultPort = 3000;

  constructor(ctx, env) {
    super(ctx, env);
    this.sleepAfter = env.SLEEP_AFTER || '15m';
    this.envVars = {
      ...Object.fromEntries(PASS.filter((k) => typeof env[k] === 'string' && env[k] !== '').map((k) => [k, env[k]])),
      // The container refuses any request that doesn't carry this.
      INTERNAL_SECRET: internalSecret(env),
    };
  }
}

let app = null;

export default {
  async fetch(request, env) {
    app ??= createApp({ env, forward: (req) => getContainer(env.SERVER, 'main').fetch(req) });
    return app.fetch(request);
  },
};
