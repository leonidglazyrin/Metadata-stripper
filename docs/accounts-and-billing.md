# Accounts, free tier and the two plans (Google + Stripe)

Every visitor signs in with Google. Each account gets, for life:

- **1 free on-device strip** (the file never leaves the browser),
- **1 free server strip** (about 4x faster),
- **1 free video download**.

You can change all three in Supabase without a deploy (see below). After that the tools offer two monthly plans through Stripe:

| Plan | Price | Unlimited | Still limited to the free allowance |
| --- | --- | --- | --- |
| **Basic** | $10/month | On-device stripping | Server strips, downloads |
| **Pro** | $20/month | Everything: on-device and server stripping, downloads | Nothing |

People subscribe with Stripe Checkout. Switching plan (Basic to Pro or back) and cancelling happen in the Stripe Customer Portal: "Switch to Pro" in the upgrade dialog opens the portal's confirm page for the new price on the same subscription (Stripe prorates), and "Manage subscription" in the account menu opens the portal's home page.

## How it works

- `server/store.js` keeps users, usage counts and subscription status in **Supabase** (Postgres). The server calls the SQL functions in `supabase/migrations/` over Supabase's REST API with the service role key. Nothing is stored on the container's disk, so it runs fine in throwaway containers and several can run side by side.
- Sign-in is the server's own Google OAuth flow (not Supabase Auth): it was already working, needs no client-side Supabase library, and keeps every key on the server. Supabase is used as the database only, so you don't need to turn on Supabase's Google provider.
- `server/account.js` has the routes: Google sign-in, `/api/me`, the quota gate, Checkout, the Portal and the webhook.
- Sessions are a signed, HttpOnly, SameSite=Lax cookie (30 days), signed with `SESSION_SECRET`. Every container must have the same `SESSION_SECRET`.
- Limits are enforced on the server before any work starts. Each mode has its own counter (`kind` in `usage_counters`):
  - **Server strip** (`POST /api/strip`, kind `server_strip`): checked before the upload is accepted. If the strip fails, the use is given back.
  - **Downloads** (kind `download`, `POST /api/download/:platform/jobs` and the old one-shot routes): checked after the link is validated. A download that fails or is cancelled before it finishes is given back. "Get audio" counts as a download.
  - **On-device strip** (kind `strip`): the file never reaches the server, so the page calls `POST /api/usage/strip` first, which counts the use (no refund). Someone editing the page's JavaScript could skip this; the server-side tools can't be bypassed.
- The license is the Stripe subscription: statuses `active`, `trialing` and `past_due` (while Stripe retries a card) count as paid, with a day of slack past the period end. The webhook re-reads the subscription from Stripe on every event, so retries and out-of-order deliveries are safe.
- **Which plan** comes from the subscription's price: the webhook compares it with `STRIPE_PRICE_ID_BASIC` and `STRIPE_PRICE_ID_PRO` and writes `basic` or `pro` into `subscriptions.tier`. A price that matches neither is treated as Pro and logged, so a paying customer is never locked out by a config mistake. The check-and-count in Postgres (`consume_usage`) reads that tier, so the limit can't be raced.
- When a tool hits a limit, the server answers 402 with the plan that lifts it (`basic` for on-device strips, `pro` for the rest), and the upgrade dialog highlights that plan.

## 1. Supabase project

1. Create a project at [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**. Pick a region near where your containers run and save the database password somewhere safe (the app doesn't need it).
2. **SQL Editor → New query**: run each file in [`supabase/migrations/`](../supabase/migrations/) **in order of its name**, once each: paste it, click **Run**, then the next one. They create the tables, turn on row level security and add the functions the server calls.
   - `20261111000000_accounts.sql`: profiles, subscriptions, usage, settings.
   - `20261112000000_plans.sql`: the Basic/Pro tier on subscriptions, the separate `server_strip` counter and the `free_server_strips` setting. If you already ran the first file, just run this one; existing subscriptions become Pro (they were all the $20 plan).
   - Any later file (other features add their own).

   Running the newest file again is harmless, but don't re-run an older file after a newer one (it would put back the older version of a function). With the Supabase CLI this is handled for you: `supabase link --project-ref <ref>` then `supabase db push` applies only the files not yet applied.
3. **Project Settings → API** (or **API Keys**):
   - Copy the **Project URL** into `SUPABASE_URL` (`https://<ref>.supabase.co`).
   - Copy the **service_role** key (legacy tab, starts with `eyJ`) or create a **secret key** (`sb_secret_…`) and put it in `SUPABASE_SERVICE_ROLE_KEY`. This key bypasses row level security: keep it on the server only, never in the web app or in git.
4. Check **Table Editor**: you should see `profiles`, `subscriptions`, `usage_counters`, `usage_events` and `app_settings`.

What the tables hold:

| Table | What's in it |
| --- | --- |
| `profiles` | One row per Google account: Google id, email, name, picture, Stripe customer id |
| `subscriptions` | Each Stripe subscription (status, `tier` = `basic`/`pro`, price, period end, cancel at period end), written by the Stripe webhook |
| `usage_counters` | Uses per account and `kind`: `strip` (on-device), `server_strip`, `download` |
| `usage_events` | Every use (+1) and refund (−1), with a timestamp, for support and stats |
| `app_settings` | `free_strips` (on-device), `free_server_strips` and `free_downloads` (all `1`) |
| `accounts` (view) | Profile + current subscription (with `subscription_tier`) + usage on one row; handy for looking someone up |

### Changing the free allowance

Edit the `value` of `free_strips` (on-device), `free_server_strips` or `free_downloads` in **Table Editor → app_settings**, or run:

```sql
update public.app_settings set value = '3', updated_at = now() where key = 'free_downloads';
```

Running servers pick it up within a minute, no deploy needed. It applies to everyone, including people who already used their free one (someone at 1 of 3 gets 2 more). Set `FREE_STRIPS` / `FREE_SERVER_STRIPS` / `FREE_DOWNLOADS` on the server only if you want the env to override the table.

To give one person more, lower their count: `update public.usage_counters set used = 0 where user_id = '<id>' and kind = 'server_strip';` (find the id in the `accounts` view by email).

## 2. Google OAuth client

1. Open [Google Cloud console](https://console.cloud.google.com/) → pick or create a project.
2. **APIs & Services → OAuth consent screen**: User type *External*, app name *Sharona*, your support email, scopes `openid`, `email`, `profile` (all non-sensitive, so no review needed). Publish the app when you go live (in *Testing* only listed test users can sign in).
3. **APIs & Services → Credentials → Create credentials → OAuth client ID** → *Web application*.
   - Authorized JavaScript origins: `https://your-domain` (and `http://localhost:5173` for dev)
   - Authorized redirect URIs: `https://your-domain/api/auth/google/callback` (and `http://localhost:5173/api/auth/google/callback` for dev)
4. Copy the client ID and secret into `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

## 3. Stripe: two prices, the webhook and the Customer Portal

Do all of this in **Test mode** first (toggle at the top right of the [Stripe dashboard](https://dashboard.stripe.com/)), then repeat it in Live mode.

1. **Basic product.** **Product catalog → + Add product**:
   - Name: *Sharona Basic*. Description (shown at checkout): *Unlimited on-device stripping.*
   - Pricing: **Recurring**, **$10.00 USD**, billing period **Monthly**.
   - Save, open the product, and copy the price ID (`price_…`, in the Pricing section) into `STRIPE_PRICE_ID_BASIC`.
2. **Pro product.** **+ Add product** again:
   - Name: *Sharona Pro*. Description: *Unlimited stripping on our server (about 4x faster) and video downloads.*
   - Pricing: **Recurring**, **$20.00 USD**, **Monthly**.
   - Copy its price ID into `STRIPE_PRICE_ID_PRO`. (If you already had a $20 Pro price in `STRIPE_PRICE_ID`, keep using it: either rename the variable or leave it, `STRIPE_PRICE_ID` still counts as the Pro price.)
3. **API key.** **Developers → API keys**: copy the secret key (`sk_test_…`, later `sk_live_…`) into `STRIPE_SECRET_KEY`. A restricted key works too if it has write access to Checkout Sessions, Customer portal sessions and Customers, and read access to Subscriptions.
4. **Webhook.** **Developers → Webhooks → + Add endpoint** (in newer dashboards: **Workbench → Webhooks → Create an event destination**, type *Webhook endpoint*):
   - Endpoint URL: `https://your-domain/api/billing/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted` (optionally `customer.subscription.paused` and `customer.subscription.resumed`).
   - Save, click **Reveal** under *Signing secret*, and copy the `whsec_…` into `STRIPE_WEBHOOK_SECRET`.
   - Plan switches arrive as `customer.subscription.updated` with the new price; the server maps it to Basic or Pro.
5. **Customer Portal.** **Settings → Billing → Customer portal** (Test mode has its own copy of this page):
   - **Subscriptions → Cancel subscriptions**: on. Choose *At end of billing period* so people keep their plan until the period they paid for ends.
   - **Subscriptions → Customers can switch plans**: on. Under **Products**, add **Sharona Basic** with its $10 monthly price and **Sharona Pro** with its $20 monthly price. Without this, "Switch to Pro" / "Switch to Basic" can't open the confirm page and falls back to the portal's home page.
   - **Proration**: *Prorate charges and credits* (recommended). Upgrades are charged the difference right away; downgrades become a credit on the next invoice.
   - **Payment methods → Customers can update payment methods**: on. Invoice history: on.
   - **Business information**: your terms and privacy policy links.
   - **Default redirect link**: `https://your-domain/app/`. Click **Save**.
6. **Optional:** **Settings → Branding** for the logo and colour on the Checkout and portal pages.

Local testing with the Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/billing/webhook   # prints a whsec_… to use locally
# test card: 4242 4242 4242 4242, any future date, any CVC
```

Test both plans end to end: buy Basic, check that on-device strips are unlimited and the server strip still asks for Pro, click **Switch to Pro**, confirm, and check that everything is unlimited. Then cancel in **Manage subscription**.

Go live by switching the dashboard to Live mode and repeating steps 1–5 there (live price IDs, live key, live webhook secret, live portal settings).

## 4. Server settings

Set `SITE_URL`, `SESSION_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID_BASIC`, `STRIPE_PRICE_ID_PRO` and `STRIPE_WEBHOOK_SECRET` (see `.env.example`) in your host's environment settings. No volume or persistent disk is needed:

```bash
docker run -p 3000:3000 --env-file .env sharona
```

If the paywall is on and the Supabase variables are missing, the server refuses to start with a message saying so. If Supabase can't be reached while running, sign-in and the tools answer "Accounts are unavailable right now" (HTTP 503) instead of letting work through for free.

On start the server logs which mode it's in, e.g. `Accounts: sign-in Google, billing Stripe, accounts in Supabase (https://….supabase.co), free tier from the app_settings table, plans: basic + pro`. If one of the two price IDs is missing it logs which, and that plan shows "Not available yet" in the dialog.

## Dev mode

There is no local database: point `npm run dev` at a Supabase project too (a second, free "dev" project keeps test accounts out of production). With `NODE_ENV` not `production` and no Google/Stripe variables: **Sign in** logs into a local test account (`/api/auth/dev?email=…` gives you more), **Get Basic** / **Get Pro** turn that plan on at once (and switch between them), and **Cancel plan (dev)** turns it off. In production missing Google/Stripe settings make sign-in and checkout answer "not set up" instead; set `PAYWALL=off` to run without accounts (and without Supabase) until they are configured.
