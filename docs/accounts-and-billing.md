# Accounts, free tier and Pro (Google + Stripe)

Every visitor signs in with Google. Each account gets **1 free strip** and **1 free download** (lifetime). After that the tools ask them to upgrade to **Pro at $20/month** through Stripe Checkout. Pro is unlimited and can be cancelled anytime in the Stripe Customer Portal ("Manage subscription" in the account menu).

## How it works

- `server/store.js` keeps users, usage counts and subscription status in SQLite (`$DATA_DIR/sharona.db`, Node's built-in `node:sqlite`, so Node 22.13+).
- `server/account.js` has the routes: Google sign-in, `/api/me`, the quota gate, Checkout, the Portal and the webhook.
- Sessions are a signed, HttpOnly, SameSite=Lax cookie (30 days), signed with `SESSION_SECRET`.
- Limits are enforced on the server before any work starts:
  - **Server strip** (`POST /api/strip`): checked before the upload is accepted. If the strip fails, the use is given back.
  - **Downloads** (`POST /api/download/:platform/jobs` and the old one-shot routes): checked after the link is validated. A download that fails or is cancelled before it finishes is given back. "Get audio" counts as a download.
  - **On-device strip**: the file never reaches the server, so the page calls `POST /api/usage/strip` first, which counts the use (no refund). Someone editing the page's JavaScript could skip this; the server-side tools can't be bypassed.
- The license is the Stripe subscription: statuses `active`, `trialing` and `past_due` (while Stripe retries a card) count as Pro, with a day of slack past the period end. The webhook re-reads the subscription from Stripe on every event, so retries and out-of-order deliveries are safe.

## 1. Google OAuth client

1. Open [Google Cloud console](https://console.cloud.google.com/) → pick or create a project.
2. **APIs & Services → OAuth consent screen**: User type *External*, app name *Sharona*, your support email, scopes `openid`, `email`, `profile` (all non-sensitive, so no review needed). Publish the app when you go live (in *Testing* only listed test users can sign in).
3. **APIs & Services → Credentials → Create credentials → OAuth client ID** → *Web application*.
   - Authorized JavaScript origins: `https://your-domain` (and `http://localhost:5173` for dev)
   - Authorized redirect URIs: `https://your-domain/api/auth/google/callback` (and `http://localhost:5173/api/auth/google/callback` for dev)
4. Copy the client ID and secret into `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

## 2. Stripe product, price and webhook

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

## 3. Server settings

Set `SITE_URL`, `SESSION_SECRET` and the five Google/Stripe variables above (see `.env.example`), and give the container a persistent disk at `DATA_DIR` (the Dockerfile uses `/data`):

```bash
docker run -p 3000:3000 -v sharona-data:/data --env-file .env sharona
```

On start the server logs which mode it's in, e.g. `Accounts: sign-in Google, billing Stripe, free tier 1 strip + 1 download per account`.

## Dev mode

With `NODE_ENV` not `production` and no Google/Stripe variables, `npm run dev` just works: **Sign in** logs into a local test account (`/api/auth/dev?email=…` gives you more), **Upgrade** turns Pro on at once, and **Cancel Pro (dev)** turns it off. In production missing Google/Stripe settings make sign-in and checkout answer "not set up" instead; set `PAYWALL=off` to run without accounts until they are configured.
