// The Worker in front of the container. It answers everything it can on its
// own, so the container (ffmpeg, sharp, yt-dlp; billed while awake) only
// wakes for work that needs it, from someone allowed to run it:
//
//   Worker only, container never touched
//     pages and static files              from the ASSETS binding (dist/)
//     /api/health, /api/download/platforms
//     /api/me, /api/auth/*, /api/usage/*, /api/billing/*   (D1 binding)
//     download history of an account with nothing live on the server
//
//   Container, after the Worker has checked the request
//     POST /api/strip                     multipart upload under MAX_UPLOAD_MB,
//                                         signed in, and Pro or a free server
//                                         strip left + one of today's free trials
//     POST /api/download/:platform/jobs   a valid link for that platform, and
//     POST /api/download/:platform          Pro or a free download left + one
//     POST /api/tiktok                      of today's free trials
//     /api/download/jobs/:id[/thumb|/file]  Pro, or the free account's own
//                                           recent trial job
//     /api/download/history/:platform     Pro, or a free account with a live job
//
// Everything that reaches the container carries X-Sharona-Internal, and the
// container refuses requests without it (server/index.js).
//
// Plain module with no Cloudflare imports, so node --test can run it
// (test/worker.test.js); worker/index.js wires it to the real container.

import { createHmac } from 'node:crypto';
import accountsCore from '../server/accounts-core.js';
import storeLib from '../server/store.js';
import platformsLib from '../server/platforms.js';
import site from '../server/site.js';

const { createAccountsCore, loadConfig } = accountsCore;
const { createStore, d1Binding, planOf, isUnlimited } = storeLib;
const { PLATFORMS, parseUrl } = platformsLib;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MB = 1024 * 1024;
const MAX_JSON = 4 * 1024;
export const INTERNAL_HEADER = 'X-Sharona-Internal';

/**
 * The secret the Worker stamps on every request it lets through to the
 * container: CONTAINER_SECRET when set, else derived from SESSION_SECRET (so
 * there is nothing new to set up). Empty when neither is set: then nothing
 * reaches the container.
 */
export function internalSecret(env) {
  if (env.CONTAINER_SECRET) return String(env.CONTAINER_SECRET);
  if (!env.SESSION_SECRET) return '';
  return createHmac('sha256', String(env.SESSION_SECRET)).update('sharona-container-v1').digest('hex');
}

const json = (data, status = 200, headers = {}) => new Response(JSON.stringify(data), {
  status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers },
});
const html = (body, status = 200) => new Response(body, {
  status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' },
});
const notFound = () => html(site.NOT_FOUND_HTML, 404);
const redirect = (location, status = 301) => new Response(null, { status, headers: { Location: location } });

/**
 * env      the Worker's env (vars, secrets, DB and ASSETS bindings)
 * forward  (Request) => Promise<Response>: send a checked request to the container
 * query    optional D1 query function (tests); defaults to the DB binding
 */
export function createApp({ env, forward, query, fetchImpl = fetch }) {
  const store = createStore({ query: query || d1Binding(env.DB) });
  // Always production rules here (no dev sign-in or free dev billing), and
  // the paywall is always on: nobody reaches the container without an account.
  // Branch previews set NODE_ENV=development (wrangler.jsonc "previews"):
  // dev sign-in and free test upgrades, against the preview database only.
  const config = { ...loadConfig({ ...env, NODE_ENV: env.NODE_ENV || 'production' }), paywall: true };
  const preview = !config.production;
  const accounts = createAccountsCore({ config, store, fetchImpl });
  const secret = internalSecret(env);
  const maxUpload = Number(env.MAX_UPLOAD_MB || 2048) * MB;
  // How long after it started a download job can still be on the server:
  // its run time cap plus how long the finished file is kept, plus slack.
  const liveSec = (Number(env.DOWNLOAD_MAX_MIN || 30) + Number(env.DOWNLOAD_TTL_MIN || 30)) * 60 + 300;
  const siteUrl = (url) => (env.SITE_URL || '').replace(/\/+$/, '') || url.origin;

  // --- to the container -----------------------------------------------------

  /** Stamp a checked request and send it on. body: a replacement body (already read). */
  async function toContainer(request, body) {
    if (!secret) return json({ error: 'The server is not set up yet (SESSION_SECRET)' }, 503);
    const headers = new Headers(request.headers);
    headers.set(INTERNAL_HEADER, secret);
    const init = { method: request.method, headers, redirect: 'manual' };
    if (body !== undefined) {
      headers.delete('content-length');
      init.body = body;
    } else if (!['GET', 'HEAD'].includes(request.method)) {
      // Stream the upload straight through.
      init.body = request.body;
      init.duplex = 'half';
    }
    try {
      return await forward(new Request(request.url, init));
    } catch (e) {
      console.error(`[container] ${request.method} ${new URL(request.url).pathname}: ${e.message}`);
      return json({ error: 'The server is starting up or busy, please try again in a moment' }, 503);
    }
  }

  const user = (request) => accounts.userFromCookies(request.headers.get('cookie'));
  const isPro = (u) => isUnlimited(planOf(u), 'download');

  /** POST /api/strip: a multipart upload of a sane size, from an allowed account. */
  async function strip(request) {
    if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
    if (!/^multipart\/form-data;\s*boundary=/i.test(request.headers.get('content-type') || '')) {
      return json({ error: 'Send the file as multipart/form-data' }, 415);
    }
    const length = request.headers.get('content-length');
    if (length === null || !/^\d+$/.test(length)) return json({ error: 'Content-Length is required' }, 411);
    if (Number(length) > maxUpload) return json({ error: `File too large (max ${Math.round(maxUpload / MB)} MB)` }, 413);
    if (Number(length) === 0) return json({ error: 'No file uploaded' }, 400);
    const no = await accounts.admit(await user(request), 'server_strip');
    if (no) return json(no.body, no.status);
    return toContainer(request);
  }

  /** Starting a download: a valid link for a known platform, from an allowed account. */
  async function startDownload(request, platform) {
    if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
    if (!Object.hasOwn(PLATFORMS, platform)) return json({ error: 'Unknown platform' }, 404);
    if (!/^application\/json\b/i.test(request.headers.get('content-type') || '')) return json({ error: 'Send JSON' }, 415);
    const length = Number(request.headers.get('content-length') || 0);
    if (length > MAX_JSON) return json({ error: 'Request too large' }, 413);
    const text = await request.text();
    if (text.length > MAX_JSON) return json({ error: 'Request too large' }, 413);
    let body;
    try { body = JSON.parse(text); } catch { return json({ error: 'Bad JSON' }, 400); }
    if (!body || typeof body !== 'object' || !parseUrl(platform, body.url)) {
      return json({ error: `Not a ${PLATFORMS[platform].label} link` }, 400);
    }
    const no = await accounts.admit(await user(request), 'download');
    if (no) return json(no.body, no.status);
    return toContainer(request, text);
  }

  /** A download job: Pro, or a free account's own recent trial job. */
  async function job(request, id) {
    const method = request.method === 'HEAD' ? 'GET' : request.method;
    if (!UUID.test(id)) return json({ error: 'Expired: the server no longer has this download', expired: true }, 404);
    const u = await user(request);
    if (!u) return json({ error: 'Sign in first', code: 'auth_required' }, 401);
    if (isPro(u) || await store.ownsRecentJob(u.id, id, liveSec)) return toContainer(request);
    if (method === 'DELETE') return new Response(null, { status: 204 });
    return json({ error: 'Expired: the server no longer has this download', expired: true }, 404);
  }

  /** An account's download rows; from D1 alone unless a job may still be live. */
  async function history(request, platform, rowId) {
    if (!Object.hasOwn(PLATFORMS, platform)) return json({ error: 'Unknown platform' }, 404);
    if (rowId !== undefined && !UUID.test(rowId)) return new Response(null, { status: 204 });
    const u = await user(request);
    if (request.method === 'GET' && rowId === undefined) {
      if (!u) return json({ enabled: false, rows: [] }, 200, { 'Cache-Control': 'no-store' });
      if (isPro(u) || await store.hasLiveDownload(u.id, platform, liveSec)) return toContainer(request);
      const rows = await store.listDownloads(u.id, platform, 50);
      return json({
        enabled: true,
        rows: rows.map((d) => ({
          id: d.id,
          url: d.url,
          mode: d.mode,
          name: d.name || null,
          serverId: null,
          status: d.status === 'error' ? 'error' : 'expired',
          message: d.status === 'error' ? d.message : null,
        })),
      }, 200, { 'Cache-Control': 'no-store' });
    }
    if (request.method !== 'DELETE') return json({ error: 'Method not allowed' }, 405);
    if (!u) return new Response(null, { status: 401 });
    if (isPro(u) || await store.hasLiveDownload(u.id, platform, liveSec)) return toContainer(request);
    await store.deleteDownloads(u.id, platform, rowId ? [rowId] : null);
    return new Response(null, { status: 204 });
  }

  async function api(request, url) {
    const p = url.pathname;
    if (p === '/api/health') return json({ ok: true });
    if (accounts.handles(p)) return accounts.handle(request);
    if (p === '/api/download/platforms') return json(Object.entries(PLATFORMS).map(([id, x]) => ({ id, label: x.label })));
    try {
      if (p === '/api/strip') return await strip(request);
      if (p === '/api/tiktok') return await startDownload(request, 'tiktok');
      let m = p.match(/^\/api\/download\/jobs\/([^/]+)(\/thumb|\/file)?$/);
      if (m) {
        if (m[2] && !['GET', 'HEAD'].includes(request.method)) return json({ error: 'Method not allowed' }, 405);
        if (!m[2] && !['GET', 'HEAD', 'DELETE'].includes(request.method)) return json({ error: 'Method not allowed' }, 405);
        return await job(request, m[1]);
      }
      m = p.match(/^\/api\/download\/history\/([^/]+)(?:\/([^/]+))?$/);
      if (m) return await history(request, m[1], m[2]);
      m = p.match(/^\/api\/download\/([^/]+)(\/jobs)?$/);
      if (m) return await startDownload(request, m[1]);
    } catch (e) {
      console.error(`[account] ${request.method} ${p}: ${e.message}`);
      return json({ error: 'Accounts are unavailable right now, please try again', code: 'unavailable' }, 503);
    }
    return json({ error: 'Not found' }, 404);
  }

  // --- pages ----------------------------------------------------------------

  const asset = (url, path) => env.ASSETS.fetch(new Request(new URL(path, url)));
  const cached = {};
  async function list(url, file, fallback) {
    if (cached[file]) return cached[file];
    try {
      const r = await asset(url, `/${file}`);
      if (!r.ok) return fallback;
      cached[file] = await r.json();
      return cached[file];
    } catch {
      return fallback;
    }
  }

  async function page(url, file) {
    const r = await asset(url, `/${file}`);
    if (!r.ok) return notFound();
    const base = siteUrl(url);
    return html(site.fillPage(await r.text(), base, site.contactEmailFor(env.CONTACT_EMAIL, base)));
  }

  async function pages(request, url) {
    if (!['GET', 'HEAD'].includes(request.method)) return new Response('Method not allowed', { status: 405 });
    const p = url.pathname;
    if (p === '/') return page(url, 'index.html');
    const lang = p.match(site.LANG_PAGE);
    if (lang) return lang[2] ? page(url, `${lang[1]}/index.html`) : redirect(`/${lang[1]}/`);
    if (site.CONTENT_PAGE.test(p)) {
      const want = p.endsWith('/') ? p : `${p}/`;
      if (!(await list(url, 'pages.json', [])).some((x) => x.path === want)) return notFound();
      if (want !== p) return redirect(want);
      return page(url, `${want.slice(1)}index.html`);
    }
    if (p === '/app') return redirect(`/app/${url.search}`);
    if (p.startsWith('/app/')) return page(url, 'app/index.html');
    if (p === '/robots.txt') {
      // Branch previews (NODE_ENV=development, see wrangler.jsonc) stay out of search results.
      const body = preview ? 'User-agent: *\nDisallow: /\n' : site.robotsTxt(siteUrl(url));
      return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }
    if (p === '/sitemap.xml') {
      const xml = site.sitemapXml(siteUrl(url), await list(url, 'landing-langs.json', [{ code: 'en', path: '/' }]), await list(url, 'pages.json', []));
      return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
    }
    const r = await env.ASSETS.fetch(request);
    if (r.status === 404) return notFound();
    if ((r.headers.get('content-type') || '').startsWith('text/html')) {
      const base = siteUrl(url);
      return html(site.fillPage(await r.text(), base, site.contactEmailFor(env.CONTACT_EMAIL, base)), r.status);
    }
    if (p.startsWith('/assets/') && r.ok) {
      // Hashed build files never change.
      const out = new Response(r.body, r);
      out.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      return out;
    }
    return r;
  }

  return {
    store,
    accounts,
    async fetch(request) {
      const url = new URL(request.url);
      return url.pathname.startsWith('/api/') ? api(request, url) : pages(request, url);
    },
  };
}
