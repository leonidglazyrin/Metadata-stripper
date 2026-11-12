# Branch previews on Cloudflare

Every push to a branch other than `main` runs `npx wrangler preview` in Workers
Builds and gets its own URL:

```
https://<branch>-metadata-stripper.synthidstripper.workers.dev
```

The `previews` block in `wrangler.jsonc` is what a Preview runs with. Previews
inherit nothing from production except assets, compatibility settings,
migrations and observability, so that block restates every binding.

## Changing what Previews get

Edit only the `"previews"` block in `wrangler.jsonc`; everything above it is
production and Previews ignore it. `npm test` checks that Previews never name
the production database, carry no Google/Stripe/token settings, and that
production has no `NODE_ENV`, `PAYWALL` or `LOCAL_UNLIMITED`. When you add a
file to `migrations/`, run `npm run db:preview:migrate` too.

## What a Preview gets

| | Production | Preview |
|---|---|---|
| Database (`DB`) | `sharona` | `sharona-preview`, shared by all Previews, never production data |
| Durable Object namespace and container app | its own | a new one per Preview, made by Cloudflare (`metadata-stripper_<branch>_SharonaServer`) |
| Container size | `standard-2` | `basic`, 1 instance at most, sleeps after 3 minutes idle |
| Uploads / downloads | 2 GB | 500 MB |
| Sign-in | Google | Dev sign-in: "Sign in" logs into a test account, no Google |
| Billing | Stripe | Test mode: "Upgrade" and the strip pack are free and instant, no Stripe |
| `SITE_URL` | the workers.dev domain | empty, so links use the Preview's own URL |
| Search engines | allowed | `robots.txt` disallows everything |
| Container usage counting | in D1 | off (`PAYWALL=off` for the container only): the Worker still requires sign-in and checks the plan. Upgrade to Pro (free) to collect download files |

Dev sign-in and free upgrades come from `NODE_ENV=development` in
`previews.vars`; with no `GOOGLE_*` or `STRIPE_*` secrets on a Preview, the
Worker falls back to them. Production has no `NODE_ENV`, so it keeps the real
rules. Anyone with a Preview URL can use it, so turn on Cloudflare Access for
Preview URLs (below) if you don't want that.

## One-time setup

1. Create the preview database and apply the migrations (already done once;
   run again whenever `migrations/` gets a new file):

   ```bash
   npx wrangler d1 create sharona-preview   # only the first time; put its id in both preview configs
   npm run db:preview:migrate              # applies migrations/ to sharona-preview
   ```

   The id goes in `wrangler.jsonc` (`previews.vars.CLOUDFLARE_D1_DATABASE_ID`
   and `previews.d1_databases[0].database_id`) and in
   `wrangler.preview-migrations.jsonc`.

2. Preview secret. Secrets are never inherited from production. Set it on
   the preview base config, which every **new** Preview copies:

   ```bash
   openssl rand -hex 32 | npx wrangler preview base-config secret put SESSION_SECRET --worker-name metadata-stripper
   ```

   `SESSION_SECRET` signs sessions and lets the Worker reach the container;
   without it server strips and downloads answer 503. Leave `GOOGLE_*`,
   `STRIPE_*` and `CLOUDFLARE_API_TOKEN` unset: on a Preview the container
   runs with `PAYWALL=off` (only the container reads it; the Worker still
   requires sign-in and checks the plan), so it never talks to D1 itself.

   A Preview that already exists keeps the secrets it was created with; set one
   on it with `npx wrangler preview secret put NAME --name <branch> --worker-name metadata-stripper`.

3. Dashboard: Workers & Pages → metadata-stripper → Settings → Build → Branch
   control: turn on builds for non-production branches. The Preview command
   should be `npx wrangler preview` (the default).

4. Optional: Settings → Domains & Routes → Preview URLs → enable Cloudflare
   Access, so only you can open Previews.

## Cleaning up

A Preview's container app stays until the Preview is deleted:

```bash
npx wrangler preview delete --name <branch> --worker-name metadata-stripper --skip-confirmation
npx wrangler containers list
```
