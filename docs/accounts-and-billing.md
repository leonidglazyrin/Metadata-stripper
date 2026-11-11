# Accounts, free tier and Pro (Google + Stripe)

Every visitor signs in with Google. Each account gets **1 free strip** and **1 free download** (lifetime; you can raise both in Supabase without a deploy, see below). After that the tools ask them to upgrade to **Pro at $20/month** through Stripe Checkout. Pro is unlimited and can be cancelled anytime in the Stripe Customer Portal ("Manage subscription" in the account menu).

## How it works

- `server/store.js` keeps users, usage counts and subscription status in **Supabase** (Postgres). The server calls the SQL functions in `supabase/migrations/` over Supabase's REST API with the service role key. Nothing is stored on the container's disk, so it runs fine in throwaway containers and several can run side by side.
- Sign-in is the server's own Google OAuth flow (not Supabase Auth): it was already working, needs no client-side Supabase library, and keeps every key on the server. Supabase is used as the database only, so you don't need to turn on Supabase's Google provider.
- `server/account.js` has the routes: Google sign-in, `/api/me`, the quota gate, Checkout, the Portal and the webhook.
- Sessions are a signed, HttpOnly, SameSite=Lax cookie (30 days), signed with `SESSION_SECRET`. Every container must have the same `SESSION_SECRET`.
- Limits are enforced on the server before any work starts:
  - **Server strip** (`POST /api/strip`): checked before the upload is accepted. If the strip fails, the use is given back.
  - **Downloads** (`POST /api/download/:platform/jobs` and the old one-shot routes): checked after the link is validated. A download that fails or is cancelled before it finishes is given back. "Get audio" counts as a download.
  - **On-device strip**: the file never reaches the server, so the page calls `POST /api/usage/strip` first, which counts the use (no refund). Someone editing the page's JavaScript could skip this; the server-side tools can't be bypassed.
- The license is the Stripe subscription: statuses `active`, `trialing` and `past_due` (while Stripe retries a card) count as Pro, with a day of slack past the period end. The webhook re-reads the subscription from Stripe on every event, so retries and out-of-order deliveries are safe.

## 1. Supabase project

1. Create a project at [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**. Pick a region near where your containers run and save the database password somewhere safe (the app doesn't need it).
2. **SQL Editor → New query**: paste all of [`supabase/migrations/20261111000000_accounts.sql`](../supabase/migrations/20261111000000_accounts.sql) and click **Run**. It creates the tables, turns on row level security and adds the functions the server calls. Then do the same with [`supabase/migrations/20261111100000_download_history.sql`](../supabase/migrations/20261111100000_download_history.sql), which keeps each account's download rows so they show on every device. Running them again is harmless. (With the Supabase CLI: `supabase link --project-ref <ref>` then `supabase db push`.)
3. **Project Settings → API** (or **API Keys**):
   - Copy the **Project URL** into `SUPABASE_URL` (`https://<ref>.supabase.co`).
   - Copy the **service_role** key (legacy tab, starts with `eyJ`) or create a **secret key** (`sb_secret_…`) and put it in `SUPABASE_SERVICE_ROLE_KEY`. This key bypasses row level security: keep it on the server only, never in the web app or in git.
4. Check **Table Editor**: you should see `profiles`, `subscriptions`, `usage_counters`, `usage_events` and `app_settings`.

What the tables hold:

| Table | What's in it |
| --- | --- |
| `profiles` | One row per Google account: Google id, email, name, picture, Stripe customer id |
| `subscriptions` | Each Stripe subscription (status, period end, cancel at period end), written by the Stripe webhook |
| `usage_counters` | Strips and downloads used per account |
| `usage_events` | Every use (+1) and refund (−1), with a timestamp, for support and stats |
| `app_settings` | `free_strips` and `free_downloads` (both `1`) |
| `accounts` (view) | Profile + current subscription + usage on one row; handy for looking someone up |

### Changing the free allowance

Edit the `value` of `free_strips` or `free_downloads` in **Table Editor → app_settings**, or run:

```sql
update public.app_settings set value = '3', updated_at = now() where key = 'free_downloads';
```

Running servers pick it up within a minute, no deploy needed. It applies to everyone, including people who already used their free one (someone at 1 of 3 gets 2 more). Set `FREE_STRIPS` / `FREE_DOWNLOADS` on the server only if you want the env to override the table.

To give one person more, lower their count: `update public.usage_counters set used = 0 where user_id = '<id>';` (find the id in the `accounts` view by email).

## 2. Google OAuth client

1. Open [Google Cloud console](https://console.cloud.google.com/) → pick or create a project.
2. **APIs & Services → OAuth consent screen**: User type *External*, app name *Sharona*, your support email, scopes `openid`, `email`, `profile` (all non-sensitive, so no review needed). Publish the app when you go live (in *Testing* only listed test users can sign in).
3. **APIs & Services → Credentials → Create credentials → OAuth client ID** → *Web application*.
   - Authorized JavaScript origins: `https://your-domain` (and `http://localhost:5173` for dev)
   - Authorized redirect URIs: `https://your-domain/api/auth/google/callback` (and `http://localhost:5173/api/auth/google/callback` for dev)
4. Copy the client ID and secret into `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

## 3. Stripe product, price and webhook

1. In the [Stripe dashboard](https://dashboard.stripe.com/) (start in **Test mode**): **Product catalog → Add product** → name *Sharona Pro*, **Recurring**, **$20.00 USD / month**. Copy the price ID (`price_…`) into `STRIPE_PRICE_ID`.
2. **Developers → API keys**: copy the secret key (`sk_test_…`, later `sk_live_…`) into `STRIPE_SECRET_KEY`.
3. **Developers → Webhooks → Add endpoint**:
   - URL: `https://your-domain/api/billing/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted` (optionally `.paused` / `.resumed`)
   - Copy the signing secret (`whsec_…`) into `STRIPE_WEBHOOK_SECRET`.
4. **Settings → Billing → Customer portal**: turn on *Cancel subscriptions* (and *Update payment methods*), set the default return link to `https://your-domain/app/`, save.
5. Optional: **Settings → Branding** for the Checkout page's logo and colour.

Local testing with the Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/billing/webhook   # prints a whsec_… to use locally
# test card: 4242 4242 4242 4242, any future date, any CVC
```

Go live by switching the dashboard to Live mode and repeating steps 1–4 there (live price ID, live key, live webhook secret).

## 4. Server settings

Set `SITE_URL`, `SESSION_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` and the five Google/Stripe variables above (see `.env.example`) in your host's environment settings. No volume or persistent disk is needed:

```bash
docker run -p 3000:3000 --env-file .env sharona
```

If the paywall is on and the Supabase variables are missing, the server refuses to start with a message saying so. If Supabase can't be reached while running, sign-in and the tools answer "Accounts are unavailable right now" (HTTP 503) instead of letting work through for free.

On start the server logs which mode it's in, e.g. `Accounts: sign-in Google, billing Stripe, accounts in Supabase (https://….supabase.co), free tier from the app_settings table`.

## Dev mode

There is no local database: point `npm run dev` at a Supabase project too (a second, free "dev" project keeps test accounts out of production). With `NODE_ENV` not `production` and no Google/Stripe variables: **Sign in** logs into a local test account (`/api/auth/dev?email=…` gives you more), **Upgrade** turns Pro on at once, and **Cancel Pro (dev)** turns it off. In production missing Google/Stripe settings make sign-in and checkout answer "not set up" instead; set `PAYWALL=off` to run without accounts (and without Supabase) until they are configured.
