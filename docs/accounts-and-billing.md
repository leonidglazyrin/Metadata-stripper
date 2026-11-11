# Accounts, free tier, the two plans and strip packs (Google + Stripe)

Every visitor signs in with Google. Each account gets, for life:

- **1 free on-device strip** (the file never leaves the browser),
- **1 free server strip** (about 4x faster),
- **1 free video download**.

You can change all three in the database without a deploy (see below). After that the tools offer two monthly plans through Stripe:

| Plan | Price | Unlimited | Still limited to the free allowance |
| --- | --- | --- | --- |
| **Basic** | $10/month | On-device stripping | Server strips, downloads |
| **Pro** | $20/month | Everything: on-device and server stripping, downloads | Nothing |

There is also a **strip pack**: **$2, paid once, for 10 more on-device strips**. It can be bought any number of times and the strips add up on the account. Pack strips are used only after the free on-device strips are spent, and never while Basic or Pro already makes on-device stripping unlimited (so a subscriber's pack strips stay saved for after the plan ends). They never cover server strips or downloads.

People subscribe with Stripe Checkout. Switching plan (Basic to Pro or back) and cancelling happen in the Stripe Customer Portal: "Switch to Pro" in the upgrade dialog opens the portal's confirm page for the new price on the same subscription (Stripe prorates), and "Manage subscription" in the account menu opens the portal's home page.

## How it works

- `server/store.js` keeps users, usage counts and subscription status in **Cloudflare D1** (SQLite). The server sends SQL to D1's HTTP API with an API token, so it works from any container (Cloudflare Containers, Fly, Railway, ...). The schema is in `migrations/`. Nothing is stored on the container's disk, so it runs fine in throwaway containers and several can run side by side.
- Every write is a single SQL statement and D1 runs statements one at a time, so two parallel requests can't both take the last free use. Triggers log each use and refund in `usage_events`.
- Sign-in is the server's own Google OAuth flow. D1 is only the database.
- `server/account.js` has the routes: Google sign-in, `/api/me`, the quota gate, Checkout, the Portal and the webhook.
- Sessions are a signed, HttpOnly, SameSite=Lax cookie (30 days), signed with `SESSION_SECRET`. Every container must have the same `SESSION_SECRET`.
- Limits are enforced on the server before any work starts. Each mode has its own counter (`kind` in `usage_counters`):
  - **Server strip** (`POST /api/strip`, kind `server_strip`): checked before the upload is accepted. If the strip fails, the use is given back.
  - **Downloads** (kind `download`, `POST /api/download/:platform/jobs` and the old one-shot routes): checked after the link is validated. A download that fails or is cancelled before it finishes is given back. "Get audio" counts as a download.
  - **On-device strip** (kind `strip`): the file never reaches the server, so the page calls `POST /api/usage/strip` first, which counts the use. Someone editing the page's JavaScript could skip this; the server-side tools can't be bypassed. A free use isn't given back, but a **pack credit** is: when the free ones are spent, the same call spends a pack credit and returns its id, and if the strip then fails in the browser the page sends it to `POST /api/usage/strip/refund` (only the account's own credit, once, within an hour).
- **Strip packs** (`migrations/0003_strip_packs.sql`) are a ledger: `strip_pack_purchases` has one row per paid pack (its id is the Stripe Checkout session id) and `strip_credit_uses` one row per credit spent (`refunded_at` set when given back). Credits left = strips bought − uses not given back, shown as `strip_credits` in the `accounts` view. Spending a credit is one `INSERT … WHERE <credits left> > 0`, so two parallel strips can't both take the last one, and the webhook's `INSERT … ON CONFLICT DO NOTHING` on the session id means a webhook delivered twice adds the strips once.
- The license is the Stripe subscription: statuses `active`, `trialing` and `past_due` (while Stripe retries a card) count as paid, with a day of slack past the period end. The webhook re-reads the subscription from Stripe on every event, so retries and out-of-order deliveries are safe.
- **Which plan** comes from the subscription's price: the webhook compares it with `STRIPE_PRICE_ID_BASIC` and `STRIPE_PRICE_ID_PRO` and writes `basic` or `pro` into `subscriptions.tier`. A price that matches neither is treated as Pro and logged, so a paying customer is never locked out by a config mistake. The check-and-count statement in `consume()` reads that tier, so the limit can't be raced.
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
| `app_settings` | `free_strips` (on-device), `free_server_strips` and `free_downloads` (all `1`) |
| `accounts` (view) | Profile + current subscription (with `subscription_tier`) + usage + `strip_credits` (pack strips left) and `strip_packs` (packs bought) on one row; handy for looking someone up |

### Changing the free allowance

Edit the `value` of `free_strips` (on-device), `free_server_strips` or `free_downloads` in the Cloudflare dashboard (**Storage & Databases → D1 → sharona → Tables → app_settings**), or run:

```bash
npx wrangler d1 execute sharona --remote --command "UPDATE app_settings SET value = '3', updated_at = unixepoch() WHERE key = 'free_downloads'"
```

Running servers pick it up within a minute, no deploy needed. It applies to everyone, including people who already used their free one (someone at 1 of 3 gets 2 more). Set `FREE_STRIPS` / `FREE_SERVER_STRIPS` / `FREE_DOWNLOADS` on the server only if you want the env to override the table.

To give one person 10 pack strips by hand (e.g. support), add a purchase row: `INSERT INTO strip_pack_purchases (id, user_id, strips) VALUES ('manual_<something unique>', '<id>', 10)`.

To give one person more free uses, lower their count: `UPDATE usage_counters SET used = 0 WHERE user_id = '<id>' AND kind = 'server_strip'` (find the id with `SELECT id FROM accounts WHERE email = '…'`).

## 2. Google OAuth client

1. Open [Google Cloud console](https://console.cloud.google.com/) → pick or create a project.
2. **APIs & Services → OAuth consent screen**: User type *External*, app name *Sharona*, your support email, scopes `openid`, `email`, `profile` (all non-sensitive, so no review needed). Publish the app when you go live (in *Testing* only listed test users can sign in).
3. **APIs & Services → Credentials → Create credentials → OAuth client ID** → *Web application*.
   - Authorized JavaScript origins: `https://your-domain` (and `http://localhost:5173` for dev)
   - Authorized redirect URIs: `https://your-domain/api/auth/google/callback` (and `http://localhost:5173/api/auth/google/callback` for dev)
4. Copy the client ID and secret into `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

## 3. Stripe: three prices, the webhook and the Customer Portal

Do all of this in **Test mode** first (toggle at the top right of the [Stripe dashboard](https://dashboard.stripe.com/)), then repeat it in Live mode.

1. **Basic product.** **Product catalog → + Add product**:
   - Name: *Sharona Basic*. Description (shown at checkout): *Unlimited on-device stripping.*
   - Pricing: **Recurring**, **$10.00 USD**, billing period **Monthly**.
   - Save, open the product, and copy the price ID (`price_…`, in the Pricing section) into `STRIPE_PRICE_ID_BASIC`.
2. **Pro product.** **+ Add product** again:
   - Name: *Sharona Pro*. Description: *Unlimited stripping on our server (about 4x faster) and video downloads.*
   - Pricing: **Recurring**, **$20.00 USD**, **Monthly**.
   - Copy its price ID into `STRIPE_PRICE_ID_PRO`. (If you already had a $20 Pro price in `STRIPE_PRICE_ID`, keep using it: either rename the variable or leave it, `STRIPE_PRICE_ID` still counts as the Pro price.)
3. **Strip pack product.** **+ Add product** again:
   - Name: *Sharona strip pack*. Description: *10 more on-device strips. Buy as many as you like, they add up.*
   - Pricing: **One-off** (not Recurring), **$2.00 USD**.
   - Copy its price ID into `STRIPE_PRICE_ID_PACK`. Without it the pack shows "Not available yet" and the 402 doesn't offer it.
   - Don't add this product to the Customer Portal's plan list in step 6: it isn't a subscription.
   - Optional: `PACK_STRIPS` (default `10`) changes how many strips a pack adds and `PRICE_LABEL_PACK` (default `$2`) the label on the page. Change them together with the Stripe price.
4. **API key.** **Developers → API keys**: copy the secret key (`sk_test_…`, later `sk_live_…`) into `STRIPE_SECRET_KEY`. A restricted key works too if it has write access to Checkout Sessions, Customer portal sessions and Customers, and read access to Subscriptions.
5. **Webhook.** **Developers → Webhooks → + Add endpoint** (in newer dashboards: **Workbench → Webhooks → Create an event destination**, type *Webhook endpoint*):
   - Endpoint URL: `https://your-domain/api/billing/webhook`
   - Events: `checkout.session.completed`, `checkout.session.async_payment_succeeded` (strip packs paid with a delayed method such as a bank debit), `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted` (optionally `customer.subscription.paused` and `customer.subscription.resumed`).
   - Save, click **Reveal** under *Signing secret*, and copy the `whsec_…` into `STRIPE_WEBHOOK_SECRET`.
   - Plan switches arrive as `customer.subscription.updated` with the new price; the server maps it to Basic or Pro.
   - A strip pack arrives as `checkout.session.completed` with `mode: payment` and `metadata.product = strip_pack`; the strips are added once `payment_status` is `paid`. If you already have the endpoint, edit it and add `checkout.session.async_payment_succeeded`.
6. **Customer Portal.** **Settings → Billing → Customer portal** (Test mode has its own copy of this page):
   - **Subscriptions → Cancel subscriptions**: on. Choose *At end of billing period* so people keep their plan until the period they paid for ends.
   - **Subscriptions → Customers can switch plans**: on. Under **Products**, add **Sharona Basic** with its $10 monthly price and **Sharona Pro** with its $20 monthly price. Without this, "Switch to Pro" / "Switch to Basic" can't open the confirm page and falls back to the portal's home page.
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

Test the strip pack: sign in, use the free on-device strip, click **Buy 10 strips · $2** in the dialog, pay with the test card, and check the account menu shows 10 pack strips; buy it again and check it shows 20.

Test both plans end to end: buy Basic, check that on-device strips are unlimited and the server strip still asks for Pro, click **Switch to Pro**, confirm, and check that everything is unlimited. Then cancel in **Manage subscription**.

Go live by switching the dashboard to Live mode and repeating steps 1–6 there (live price IDs, live key, live webhook secret, live portal settings).

## 4. Server settings

Set `SITE_URL`, `SESSION_SECRET`, `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_D1_DATABASE_ID`, `CLOUDFLARE_API_TOKEN`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID_BASIC`, `STRIPE_PRICE_ID_PRO`, `STRIPE_PRICE_ID_PACK` and `STRIPE_WEBHOOK_SECRET` (see `.env.example`) in your host's environment settings. No volume or persistent disk is needed:

```bash
docker run -p 3000:3000 --env-file .env sharona
```

If the paywall is on and the D1 variables are missing, the server refuses to start with a message saying so. If D1 can't be reached while running, sign-in and the tools answer "Accounts are unavailable right now" (HTTP 503) instead of letting work through for free.

On start the server logs which mode it's in, e.g. `Accounts: sign-in Google, billing Stripe, accounts in D1 (<database id>), free tier from the app_settings table, plans: basic + pro`. If one of the two price IDs is missing it logs which, and that plan shows "Not available yet" in the dialog.

## Deploying on Cloudflare Containers

`wrangler.jsonc` and `worker/index.js` deploy the Docker image to [Cloudflare Containers](https://developers.cloudflare.com/containers/) with a small Worker in front. Workers Builds (connected to this repo) runs `npx wrangler deploy` on every push to main; you can also run it yourself with Docker running.

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

   Put `STRIPE_PRICE_ID_BASIC`, `STRIPE_PRICE_ID_PRO` and `STRIPE_PRICE_ID_PACK` in `vars` in `wrangler.jsonc` (they aren't secret), or set them as secrets too. The Worker hands every one of these to the server (the list is `PASS` in `worker/index.js`).
3. Push to main (or run `npx wrangler deploy`).

One container instance (`standard-2`) serves all traffic, because a download job lives in the memory and disk of the container that started it. It sleeps after 15 minutes without requests and wakes in a few seconds on the next one; set `SLEEP_AFTER` in `vars` to change that.

## Dev mode

There is no local database: point `npm run dev` at a D1 database too (a second database, e.g. `npx wrangler d1 create sharona-dev`, keeps test accounts out of production). With `NODE_ENV` not `production` and no Google/Stripe variables: **Sign in** logs into a local test account (`/api/auth/dev?email=…` gives you more), **Get Basic** / **Get Pro** turn that plan on at once (and switch between them), **Get 10 strips (dev, free)** adds a strip pack, and **Cancel plan (dev)** turns it off. In production missing Google/Stripe settings make sign-in and checkout answer "not set up" instead; set `PAYWALL=off` to run without accounts (and without D1) until they are configured.

## A note on the D1 HTTP API limit

The server talks to D1 through Cloudflare's REST API, which allows about 1,200 requests per 5 minutes per account (roughly 4 a second). Each page load costs one request and each strip or download two or three, which is plenty for launch. If traffic grows past that, put a small Worker with a D1 binding in front of the database and point the store at it: `createStore()` only needs a `query(sql, params)` function, so nothing else changes.
