# Accounts, free tier, the two plans and strip packs (Google + Stripe)

Every visitor signs in with Google. Each account gets, for life:

- **1 free on-device strip** (the file never leaves the browser),
- **1 free server strip** (about 4x faster),
- **1 free video download**.

Server strips and downloads run in the container (ffmpeg, sharp, yt-dlp), which costs money while it's awake, so the free ones are also capped **for the whole site: 10 per UTC day** in total (`free_trials_per_day` in `app_settings`). Once today's 10 are taken, a free account asking for its server strip or download gets "Today's free … are all taken. Try again tomorrow, or upgrade to Pro" (HTTP 402, `code: free_trials_full`) and the container is not woken. Pro is never counted against the cap, and the free on-device strip isn't either.

You can change all of these in the database without a deploy (see below). After that the tools offer two plans through Stripe, each billed monthly or yearly (yearly = two months free):

| Plan | Monthly | Yearly | Unlimited | Still limited to the free allowance |
| --- | --- | --- | --- | --- |
| **Basic** | $10/month | $100/year | On-device stripping | Server strips, downloads |
| **Pro** | $20/month | $200/year | Everything: on-device and server stripping, downloads | Nothing |

The yearly option only shows for a plan whose `STRIPE_PRICE_ID_<PLAN>_YEARLY` is set. The upgrade dialog has a Monthly / Yearly switch (hidden when no plan has a yearly price); the landing page's pricing section has the same switch (built without JavaScript, always shown).

There is also a **strip pack**: **10 SynthID strips for $2, paid once** (on-device strips, metadata removed too). It's shown first, as "Try it for $2", in the pricing section, the upgrade dialog and the account menu, as the cheapest way to pay and try. It can be bought any number of times and the strips add up on the account. Pack strips are used only after the free on-device strips are spent, and never while Basic or Pro already makes on-device stripping unlimited (so a subscriber's pack strips stay saved for after the plan ends). They never cover server strips or downloads.

People subscribe with Stripe Checkout (`POST /api/billing/checkout` with `{ plan: 'basic' | 'pro', interval: 'month' | 'year' }`, monthly when `interval` is missing). Switching plan (Basic to Pro or back, or monthly to yearly) and cancelling happen in the Stripe Customer Portal: "Switch to Pro" in the upgrade dialog opens the portal's confirm page for the new price on the same subscription (Stripe prorates), and "Manage subscription" in the account menu opens the portal's home page.

## How it works

**What runs where (Cloudflare).** The Worker (`worker/app.mjs`) serves the pages and static files (the `ASSETS` binding, built from `dist/`) and answers every account route itself with the D1 binding: `/api/me`, Google sign-in, `/api/usage/strip` (the on-device count and pack credits), Checkout, the Portal and the Stripe webhook. **On-device stripping (free, $2 pack, Basic, Pro) only ever touches the Worker and D1; the container is never woken.** The container is reached only by server strips and downloads, and only after the Worker has checked, in this order: a well-formed request (POST, `multipart/form-data` with a `Content-Length` under `MAX_UPLOAD_MB` for strips; a JSON body under 4 KB with a link on that platform's own hosts for downloads; a UUID job id), a valid session (else 401), and then Pro, or a free use left on the account plus one of today's site-wide free trials (else 402). Following a download (`/api/download/jobs/:id`, its file and thumbnail) is allowed for Pro and for a free account's own trial job of the last hour or so; download history for anyone with nothing live on the server is answered from D1. Every request the Worker lets through carries `X-Sharona-Internal` (`CONTAINER_SECRET`, or a value derived from `SESSION_SECRET`), and the container refuses anything without it. Covered by `test/worker.test.js`.

- `server/store.js` keeps users, usage counts and subscription status in **Cloudflare D1** (SQLite). The server sends SQL to D1's HTTP API with an API token, so it works from any container (Cloudflare Containers, Fly, Railway, ...). The schema is in `migrations/`. Nothing is stored on the container's disk, so it runs fine in throwaway containers and several can run side by side.
- Every write is a single SQL statement and D1 runs statements one at a time, so two parallel requests can't both take the last free use. Triggers log each use and refund in `usage_events`.
- Sign-in is the server's own Google OAuth flow. D1 is only the database.
- `server/accounts-core.js` has the routes as plain Fetch API handlers (Google sign-in, `/api/me`, the quota checks, Checkout, the Portal and the webhook), so the same code runs in the Worker and, through `server/account.js`, in the Express server for local development and self-hosting.
- Sessions are a signed, HttpOnly, SameSite=Lax cookie (30 days), signed with `SESSION_SECRET`. Every container must have the same `SESSION_SECRET`.
- **Everything is per Google account, and signing in is required for all of it**: the free on-device strip, the free server strip, the free download, the $10 and $20 plans and the $2 pack. There is no anonymous, IP or cookie-only allowance: a request without a valid session cookie gets `401 auth_required` from `/api/usage/strip`, `/api/strip`, `/api/download/*`, `/api/billing/checkout`, `/api/billing/pack` and `/api/billing/portal` before any work or Stripe call happens (covered by a test in `test/account.test.js`). Usage counters, pack credits and subscriptions are rows keyed by the account id, and Checkout sessions carry that id in `client_reference_id` and metadata, so a payment always lands on the account that started it. The only ways around sign-in are explicit: `PAYWALL=off` (everything free for everyone) and dev mode, which never runs with `NODE_ENV=production` (set in the Dockerfile).
- Limits are enforced on the server before any work starts. Each mode has its own counter (`kind` in `usage_counters`):
  - **Server strip** (`POST /api/strip`, kind `server_strip`): checked before the upload is accepted. If the strip fails, the use is given back.
  - **Downloads** (kind `download`, `POST /api/download/:platform/jobs` and the old one-shot routes): checked after the link is validated. A download that fails or is cancelled before it finishes is given back. "Get audio" counts as a download.
  - **On-device strip** (kind `strip`): the file never reaches the server, so the page calls `POST /api/usage/strip` first, which counts the use. Someone editing the page's JavaScript could skip this; the server-side tools can't be bypassed. A free use isn't given back, but a **pack credit** is: when the free ones are spent, the same call spends a pack credit and returns its id, and if the strip then fails in the browser the page sends it to `POST /api/usage/strip/refund` (only the account's own credit, once, within an hour).
- **Strip packs** (`migrations/0003_strip_packs.sql`) are a ledger: `strip_pack_purchases` has one row per paid pack (its id is the Stripe Checkout session id) and `strip_credit_uses` one row per credit spent (`refunded_at` set when given back). Credits left = strips bought − uses not given back, shown as `strip_credits` in the `accounts` view. Spending a credit is one `INSERT … WHERE <credits left> > 0`, so two parallel strips can't both take the last one, and the webhook's `INSERT … ON CONFLICT DO NOTHING` on the session id means a webhook delivered twice adds the strips once.
- The license is the Stripe subscription: statuses `active`, `trialing` and `past_due` (while Stripe retries a card) count as paid, with a day of slack past the period end. The webhook re-reads the subscription from Stripe on every event, so retries and out-of-order deliveries are safe.
- **Which plan** comes from the subscription's price: the webhook compares it with `STRIPE_PRICE_ID_BASIC` / `STRIPE_PRICE_ID_BASIC_YEARLY` (both Basic) and `STRIPE_PRICE_ID_PRO` / `STRIPE_PRICE_ID_PRO_YEARLY` (both Pro) and writes `basic` or `pro` into `subscriptions.tier`. A price that matches neither is treated as Pro and logged, so a paying customer is never locked out by a config mistake. The check-and-count statement in `consume()` reads that tier, so the limit can't be raced.
- When a tool hits a limit, the server answers 402 with the plan that lifts it (`basic` for on-device strips, `pro` for the rest), and the upgrade dialog highlights that plan. For on-device strips it also says `pack: true` when the strip pack can be bought, and the dialog offers it under the plans.

## 1. Cloudflare D1 database

You need Node 22+ and a Cloudflare account. `wrangler` is Cloudflare's CLI; `npx` runs it without installing.

1. Sign in: `npx wrangler login`.
2. Create the database (pick the location hint nearest your containers, e.g. `enam` for eastern North America):

   ```bash
   npx wrangler d1 create sharona --location enam
   ```

   It prints a `database_id`. Put it in `CLOUDFLARE_D1_DATABASE_ID`.
3. Create the tables:

   ```bash
   npx wrangler d1 execute sharona --remote --file migrations/0001_accounts.sql
   npx wrangler d1 execute sharona --remote --file migrations/0002_download_history.sql
   npx wrangler d1 execute sharona --remote --file migrations/0003_strip_packs.sql
   npx wrangler d1 execute sharona --remote --file migrations/0004_free_trial_cap.sql
   ```

   Running them again is harmless, as long as you run them in order: `0003` rebuilds the `accounts` view with the pack columns, so if you ever re-run `0001` on its own, run `0003` after it. When later features add `migrations/0003_….sql` and so on, run each new file the same way, in order of its name.
4. Your **account ID** is on the right of the Cloudflare dashboard's *Workers & Pages* overview (or run `npx wrangler whoami`). Put it in `CLOUDFLARE_ACCOUNT_ID`.
5. Create an API token: **My Profile → API Tokens → Create Token → Custom token**, permission **Account · D1 · Edit**, limited to your account. Put it in `CLOUDFLARE_API_TOKEN`. It can read and change the whole database: keep it on the server only, never in the web app or in git.
6. Check: `npx wrangler d1 execute sharona --remote --command "SELECT key, value FROM app_settings"` should list the three free allowances.

What the tables hold:

| Table | What's in it |
| --- | --- |
| `profiles` | One row per Google account: Google id, email, name, picture, Stripe customer id |
| `subscriptions` | Each Stripe subscription (status, `tier` = `basic`/`pro`, price, period end, cancel at period end), written by the Stripe webhook |
| `usage_counters` | Uses per account and `kind`: `strip` (on-device), `server_strip`, `download` |
| `usage_events` | Every use (+1) and refund (−1), with the plan at the time and a timestamp, for support and stats (written by triggers) |
| `strip_pack_purchases` | Each strip pack bought: Stripe Checkout session id, account, strips added (10), amount and currency |
| `strip_credit_uses` | Each pack strip spent, and `refunded_at` when a failed strip gave it back |
| `download_history` | Each signed-in account's download rows (link, name, state), so they show on any device. The file itself is still deleted after `DOWNLOAD_TTL_MIN`; rows older than 30 days are pruned hourly |
| `app_settings` | `free_strips` (on-device), `free_server_strips` and `free_downloads` (all `1`), `free_trials_per_day` (`10`) |
| `free_trial_days` | Free server strips + downloads taken per UTC day, for the site-wide cap |
| `accounts` (view) | Profile + current subscription (with `subscription_tier`) + usage + `strip_credits` (pack strips left) and `strip_packs` (packs bought) on one row; handy for looking someone up |

### Changing the free allowance

Edit the `value` of `free_strips` (on-device), `free_server_strips` or `free_downloads` in the Cloudflare dashboard (**Storage & Databases → D1 → sharona → Tables → app_settings**), or run:

```bash
npx wrangler d1 execute sharona --remote --command "UPDATE app_settings SET value = '3', updated_at = unixepoch() WHERE key = 'free_downloads'"
```

Running servers pick it up within a minute, no deploy needed. It applies to everyone, including people who already used their free one (someone at 1 of 3 gets 2 more). Set `FREE_STRIPS` / `FREE_SERVER_STRIPS` / `FREE_DOWNLOADS` on the server only if you want the env to override the table.

The site-wide daily cap on free server strips and downloads is `free_trials_per_day` (default `10`, `0` turns free server use off entirely):

```bash
npx wrangler d1 execute sharona --remote --command "UPDATE app_settings SET value = '20', updated_at = unixepoch() WHERE key = 'free_trials_per_day'"
```

`FREE_TRIALS_PER_DAY` overrides it. Today's count is `SELECT used FROM free_trial_days WHERE day = date('now')`.

To give one person 10 pack strips by hand (e.g. support), add a purchase row: `INSERT INTO strip_pack_purchases (id, user_id, strips) VALUES ('manual_<something unique>', '<id>', 10)`.

To give one person more free uses, lower their count: `UPDATE usage_counters SET used = 0 WHERE user_id = '<id>' AND kind = 'server_strip'` (find the id with `SELECT id FROM accounts WHERE email = '…'`).

## 2. Google OAuth client

1. Open [Google Cloud console](https://console.cloud.google.com/) → pick or create a project.
2. **APIs & Services → OAuth consent screen**: User type *External*, app name *Sharona*, your support email, scopes `openid`, `email`, `profile` (all non-sensitive, so no review needed). Publish the app when you go live (in *Testing* only listed test users can sign in).
3. **APIs & Services → Credentials → Create credentials → OAuth client ID** → *Web application*.
   - Authorized JavaScript origins: `https://your-domain` (and `http://localhost:5173` for dev)
   - Authorized redirect URIs: `https://your-domain/api/auth/google/callback` (and `http://localhost:5173/api/auth/google/callback` for dev)
4. Copy the client ID and secret into `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

## 3. Stripe: five prices, the webhook and the Customer Portal

Do all of this in **Test mode** first (toggle at the top right of the [Stripe dashboard](https://dashboard.stripe.com/)), then repeat it in Live mode.

1. **Basic product.** **Product catalog → + Add product**:
   - Name: *Sharona Basic*. Description (shown at checkout): *Unlimited on-device stripping.*
   - Pricing: **Recurring**, **$10.00 USD**, billing period **Monthly**.
   - Save, open the product, and copy the price ID (`price_…`, in the Pricing section) into `STRIPE_PRICE_ID_BASIC`.
   - On the same product, **+ Add another price**: **Recurring**, **$100.00 USD**, billing period **Yearly**. Copy its price ID into `STRIPE_PRICE_ID_BASIC_YEARLY`.
2. **Pro product.** **+ Add product** again:
   - Name: *Sharona Pro*. Description: *Unlimited stripping on our server (about 4x faster) and video downloads.*
   - Pricing: **Recurring**, **$20.00 USD**, **Monthly**.
   - On the same product, **+ Add another price**: **Recurring**, **$200.00 USD**, **Yearly**. Copy it into `STRIPE_PRICE_ID_PRO_YEARLY`.
   - Copy the monthly price ID into `STRIPE_PRICE_ID_PRO`. (If you already had a $20 Pro price in `STRIPE_PRICE_ID`, keep using it: either rename the variable or leave it, `STRIPE_PRICE_ID` still counts as the Pro price.)
3. **Strip pack product.** **+ Add product** again:
   - Name: *Sharona strip pack*. Description: *10 SynthID strips, on your device. Buy as many as you like, they add up.*
   - Pricing: **One-off** (not Recurring), **$2.00 USD**.
   - Copy its price ID into `STRIPE_PRICE_ID_PACK`. Without it the pack shows "Not available yet" and the 402 doesn't offer it.
   - Don't add this product to the Customer Portal's plan list in step 6: it isn't a subscription.
   - Optional: `PACK_STRIPS` (default `10`) changes how many strips a pack adds and `PRICE_LABEL_PACK` (default `$2`) the label on the page. Change them together with the Stripe price.
4. **API key.** **Developers → API keys**: copy the secret key (`sk_test_…`, later `sk_live_…`) into `STRIPE_SECRET_KEY`. A restricted key works too if it has write access to Checkout Sessions, Customer portal sessions and Customers, and read access to Subscriptions.
5. **Webhook.** **Developers → Webhooks → + Add endpoint** (in newer dashboards: **Workbench → Webhooks → Create an event destination**, type *Webhook endpoint*):
   - Endpoint URL: `https://your-domain/api/billing/webhook`
   - Events: select **all seven** below. `checkout.session.async_payment_succeeded` alone is **not** enough: it only fires for strip packs paid with a delayed method, so with only that event card payments for packs and every subscription ($10 Basic, $20 Pro, switches and cancellations) would never reach the server.

     | Event | What the server does (`handleEvent` in `server/account.js`) |
     | --- | --- |
     | `checkout.session.completed` | `mode: subscription`: links the Stripe customer to the account and turns Basic or Pro on. `mode: payment`: adds the $2 strip pack when `payment_status` is `paid` (cards, wallets). **Required.** |
     | `checkout.session.async_payment_succeeded` | Adds a $2 strip pack paid with a delayed method (e.g. a bank debit), which is still unpaid at `completed`. **Required.** |
     | `customer.subscription.created` | Turns the plan on (backup for `checkout.session.completed`). **Required.** |
     | `customer.subscription.updated` | Renewals, plan switches (Basic ↔ Pro), `past_due`, cancel at period end. **Required.** |
     | `customer.subscription.deleted` | Ends the plan; the account goes back to Free. **Required.** |
     | `customer.subscription.paused` | Pauses the plan. Optional (only if you use pausing). |
     | `customer.subscription.resumed` | Resumes the plan. Optional (only if you use pausing). |

     That is the full list: the server ignores every other event (no `invoice.*`, `payment_intent.*` or `charge.*`), so subscribing to more only costs requests. Renewals and failed payments still work without `invoice.*`, because Stripe also sends `customer.subscription.updated` when the status or period changes.
   - Save, click **Reveal** under *Signing secret*, and copy the `whsec_…` into `STRIPE_WEBHOOK_SECRET`.
   - Plan switches arrive as `customer.subscription.updated` with the new price; the server maps it to Basic or Pro (monthly and yearly prices of a plan give the same plan).
   - A strip pack arrives as `checkout.session.completed` with `mode: payment` and `metadata.product = strip_pack`; the strips are added once `payment_status` is `paid`. If you already have the endpoint, edit it and add `checkout.session.async_payment_succeeded`.
6. **Customer Portal.** **Settings → Billing → Customer portal** (Test mode has its own copy of this page):
   - **Subscriptions → Cancel subscriptions**: on. Choose *At end of billing period* so people keep their plan until the period they paid for ends.
   - **Subscriptions → Customers can switch plans**: on. Under **Products**, add **Sharona Basic** with both its prices ($10 monthly, $100 yearly) and **Sharona Pro** with both of its ($20 monthly, $200 yearly). This also lets people move between monthly and yearly. Without this, "Switch to Pro" / "Switch to Basic" can't open the confirm page and falls back to the portal's home page.
   - **Proration**: *Prorate charges and credits* (recommended). Upgrades are charged the difference right away; downgrades become a credit on the next invoice.
   - **Payment methods → Customers can update payment methods**: on. Invoice history: on.
   - **Business information**: your terms and privacy policy links.
   - **Default redirect link**: `https://your-domain/app/`. Click **Save**.
7. **Optional:** **Settings → Branding** for the logo and colour on the Checkout and portal pages.

Local testing with the Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/billing/webhook   # prints a whsec_… to use locally
# test card: 4242 4242 4242 4242, any future date, any CVC
```

Test the strip pack: sign in, use the free on-device strip, click **Try it · $2** in the dialog, pay with the test card, and check the account menu shows 10 pack strips; buy it again and check it shows 20.

Test both plans end to end: buy Basic, check that on-device strips are unlimited and the server strip still asks for Pro, click **Switch to Pro**, confirm, and check that everything is unlimited. Then cancel in **Manage subscription**.

Go live by switching the dashboard to Live mode and repeating steps 1–6 there (live price IDs, live key, live webhook secret, live portal settings).

## Stripe setup checklist (copy and tick)

Everything in one place, for this deploy (`https://metadata-stripper.synthidstripper.workers.dev`). Do it all in **Test mode** first, then again in **Live mode** (Stripe keeps separate products, prices, keys, webhooks and portal settings per mode, so the IDs change).

**Products and prices** (Stripe → Product catalog → + Add product)

- [ ] **Sharona Basic**, recurring: $10.00 USD monthly → `STRIPE_PRICE_ID_BASIC`
- [ ] same product, + Add another price: $100.00 USD yearly → `STRIPE_PRICE_ID_BASIC_YEARLY`
- [ ] **Sharona Pro**, recurring: $20.00 USD monthly → `STRIPE_PRICE_ID_PRO`
- [ ] same product, + Add another price: $200.00 USD yearly → `STRIPE_PRICE_ID_PRO_YEARLY`
- [ ] **Sharona strip pack**, one-off: $2.00 USD → `STRIPE_PRICE_ID_PACK`

**API key** (Developers → API keys)

- [ ] Secret key `sk_test_…` (later `sk_live_…`) → `STRIPE_SECRET_KEY`

**Webhook** (Developers → Webhooks → + Add endpoint)

- [ ] Endpoint URL: `https://metadata-stripper.synthidstripper.workers.dev/api/billing/webhook`
- [ ] Events (exactly these):
  - `checkout.session.completed`
  - `checkout.session.async_payment_succeeded`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `customer.subscription.paused` (optional)
  - `customer.subscription.resumed` (optional)
- [ ] Signing secret `whsec_…` → `STRIPE_WEBHOOK_SECRET`

**Customer Portal** (Settings → Billing → Customer portal)

- [ ] Cancel subscriptions: on, at end of billing period
- [ ] Customers can switch plans: on. Products: **Sharona Basic** ($10/month and $100/year) and **Sharona Pro** ($20/month and $200/year). Not the strip pack.
- [ ] Proration: prorate charges and credits
- [ ] Customers can update payment methods: on. Invoice history: on
- [ ] Business information: links to `/terms/` and `/privacy/`
- [ ] Default redirect link: `https://metadata-stripper.synthidstripper.workers.dev/app/`. Save.

**Secrets and vars on the Worker** (run from the repo; each asks for the value)

```bash
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put STRIPE_WEBHOOK_SECRET
npx wrangler secret put STRIPE_PRICE_ID_BASIC
npx wrangler secret put STRIPE_PRICE_ID_BASIC_YEARLY
npx wrangler secret put STRIPE_PRICE_ID_PRO
npx wrangler secret put STRIPE_PRICE_ID_PRO_YEARLY
npx wrangler secret put STRIPE_PRICE_ID_PACK
```

The five price IDs aren't secret, so you can put them in `vars` in `wrangler.jsonc` instead. Also needed if not set yet: `SESSION_SECRET`, `CLOUDFLARE_API_TOKEN`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` (secrets) and `SITE_URL`, `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_D1_DATABASE_ID` (already in `vars`). Secrets apply on the next deploy (`npx wrangler deploy` or a push to main). Leaving a `_YEARLY` price unset hides yearly for that plan.

**Test mode checks** (card `4242 4242 4242 4242`, any future date, any CVC)

- [ ] Server log on start says `billing Stripe`, `plans: basic + pro`, `yearly: basic + pro`, `strip pack: 10 strips`
- [ ] Sign in, use the free on-device strip, click **Try it · $2**, pay: the account menu shows 10 pack strips. Buy again: 20.
- [ ] Buy **Basic monthly**: on-device stripping unlimited, server strip still asks for Pro
- [ ] In the dialog, Yearly → **Switch to yearly** on Basic: portal confirm page shows $100/year; after confirming, still Basic
- [ ] **Switch to Pro** (yearly): portal confirm page shows $200/year; after confirming, everything unlimited
- [ ] **Manage subscription** → cancel: plan stays until the period end, then back to Free
- [ ] Stripe → Webhooks → your endpoint: every delivery is `200`
- [ ] Repeat the setup in Live mode, swap in the live key, live price IDs and live `whsec_…`, deploy, and do one real $2 pack purchase (refund it from the dashboard)

## 4. Server settings

Set `SITE_URL`, `SESSION_SECRET`, `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_D1_DATABASE_ID`, `CLOUDFLARE_API_TOKEN`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID_BASIC`, `STRIPE_PRICE_ID_PRO`, `STRIPE_PRICE_ID_BASIC_YEARLY`, `STRIPE_PRICE_ID_PRO_YEARLY`, `STRIPE_PRICE_ID_PACK` and `STRIPE_WEBHOOK_SECRET` (see `.env.example`) in your host's environment settings. No volume or persistent disk is needed:

```bash
docker run -p 3000:3000 --env-file .env sharona
```

If the paywall is on and the D1 variables are missing, the server refuses to start with a message saying so. If D1 can't be reached while running, sign-in and the tools answer "Accounts are unavailable right now" (HTTP 503) instead of letting work through for free.

On start the server logs which mode it's in, e.g. `Accounts: sign-in Google, billing Stripe, accounts in D1 (<database id>), free tier from the app_settings table, plans: basic + pro`. If one of the two price IDs is missing it logs which, and that plan shows "Not available yet" in the dialog.

## Deploying on Cloudflare Containers

`wrangler.jsonc` and `worker/index.js` deploy the Worker (pages, static files, accounts and billing, with the D1 binding) and the Docker image to [Cloudflare Containers](https://developers.cloudflare.com/containers/) behind it. `wrangler deploy` runs `npm run build` first (the `build` block), so `dist/` is fresh. Workers Builds (connected to this repo) runs `npx wrangler deploy` on every push to main; you can also run it yourself with Docker running. Run `migrations/0004_free_trial_cap.sql` on the database before deploying this version.

1. Put the D1 database id in both `REPLACE_WITH_D1_DATABASE_ID` spots in `wrangler.jsonc`, and your real address in `SITE_URL` (the `workers.dev` one, or your own domain once you add it under the Worker's **Settings → Domains & Routes**).
2. Set the secrets once (each command asks for the value):

   ```bash
   npx wrangler secret put SESSION_SECRET          # openssl rand -hex 32
   npx wrangler secret put CLOUDFLARE_API_TOKEN    # the D1 token
   npx wrangler secret put GOOGLE_CLIENT_ID
   npx wrangler secret put GOOGLE_CLIENT_SECRET
   npx wrangler secret put STRIPE_SECRET_KEY
   npx wrangler secret put STRIPE_WEBHOOK_SECRET
   ```

   Put `STRIPE_PRICE_ID_BASIC`, `STRIPE_PRICE_ID_PRO`, `STRIPE_PRICE_ID_BASIC_YEARLY`, `STRIPE_PRICE_ID_PRO_YEARLY` and `STRIPE_PRICE_ID_PACK` in `vars` in `wrangler.jsonc` (they aren't secret), or set them as secrets too. Sign-in and billing run in the Worker, so the Google and Stripe secrets stay there; the container only gets what it needs for strips and downloads (the list is `PASS` in `worker/index.js`) plus `INTERNAL_SECRET`, which it requires on every request.
3. Push to main (or run `npx wrangler deploy`).

One container instance (`standard-2`) serves all traffic, because a download job lives in the memory and disk of the container that started it. It sleeps after 15 minutes without requests and wakes in a few seconds on the next one; set `SLEEP_AFTER` in `vars` to change that.

## Branch previews

Workers Builds runs `npx wrangler preview` for every branch except main, which gives the branch its own URL. The `previews` block in `wrangler.jsonc` decides what a Preview gets, and nothing in it is production:

- **Database:** `sharona-preview`, a separate D1 database shared by all Previews. Test accounts made on a Preview never reach the real one, and the real accounts aren't visible there.
- **Container:** each Preview gets its own Durable Object namespace, container app and instance (Cloudflare does this because the class is declared under `previews`). It's a small one (`basic`, one instance) and sleeps after 5 minutes.
- **Sign-in and billing:** Google and Stripe aren't set, so sign-in and checkout answer "not set up". Pages and the landing page work; the tools behind sign-in need Google set up for the Preview URL first.

One-time setup (already done for `sharona-preview` unless you start over):

```bash
npx wrangler d1 create sharona-preview          # then put its id in wrangler.jsonc (previews) and wrangler.preview-migrations.jsonc
npm run db:preview:migrate                      # every file in migrations/, on the preview database
npx wrangler preview base-config secret put SESSION_SECRET        # a new value, not production's
npx wrangler preview base-config secret put CLOUDFLARE_API_TOKEN  # D1 · Edit token (lets the container count server strips)
```

When you add a migration, run `npm run db:preview:migrate` as well as the production one. Delete a finished Preview with `npx wrangler preview delete --name <branch>`.

## Dev mode

For your own use with no accounts at all, run `npm run dev:local` instead (see the README): no database, sign-in or limits.


There is no local database: point `npm run dev` at a D1 database too (a second database, e.g. `npx wrangler d1 create sharona-dev`, keeps test accounts out of production). With `NODE_ENV` not `production` and no Google/Stripe variables: **Sign in** logs into a local test account (`/api/auth/dev?email=…` gives you more), **Get Basic** / **Get Pro** turn that plan on at once, monthly or yearly (and switch between them), **Get 10 strips (dev, free)** adds a strip pack, and **Cancel plan (dev)** turns it off. In production missing Google/Stripe settings make sign-in and checkout answer "not set up" instead; set `PAYWALL=off` to run without accounts (and without D1) until they are configured.

## A note on the D1 HTTP API limit

On Cloudflare the Worker uses the D1 binding, which has no such limit, for pages, `/api/me`, sign-in, billing and on-device strips. Only the container (server strips and downloads) still talks to D1 through Cloudflare's REST API, which allows about 1,200 requests per 5 minutes per account; each strip or download costs two or three.
