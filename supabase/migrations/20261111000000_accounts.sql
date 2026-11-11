-- Sharona accounts, Pro subscriptions and free-usage tracking.
--
-- Only the server talks to these tables, with the service role key. Row level
-- security is on with no policies, and every function is revoked from the
-- anon and authenticated roles, so the public (anon/publishable) key can read
-- or change nothing here.
--
-- Run it once in the Supabase SQL editor (or `supabase db push`). It is safe
-- to run again.

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

-- One row per person who signed in with Google.
create table if not exists public.profiles (
  id                 uuid primary key default gen_random_uuid(),
  google_sub         text not null unique,          -- Google's stable user id ("dev:<email>" for local dev sign-ins)
  email              text,
  name               text,
  picture            text,
  stripe_customer_id text unique,
  created_at         timestamptz not null default now(),
  last_login_at      timestamptz
);

-- Stripe subscriptions, kept in sync by the /api/billing/webhook endpoint.
create table if not exists public.subscriptions (
  id                   text primary key,             -- Stripe subscription id (sub_...)
  user_id              uuid not null references public.profiles (id) on delete cascade,
  status               text not null,                -- active, trialing, past_due, canceled, ...
  price_id             text,
  current_period_end   timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);
create index if not exists subscriptions_user_id_idx on public.subscriptions (user_id, updated_at desc);

-- How many strips / downloads each account has used (all time).
create table if not exists public.usage_counters (
  user_id uuid not null references public.profiles (id) on delete cascade,
  kind    text not null check (kind in ('strip', 'download')),
  used    integer not null default 0 check (used >= 0),
  primary key (user_id, kind)
);

-- Every use and refund, for support and analytics.
create table if not exists public.usage_events (
  id         bigint generated always as identity primary key,
  user_id    uuid not null references public.profiles (id) on delete cascade,
  kind       text not null check (kind in ('strip', 'download')),
  delta      integer not null,                       -- +1 used, -1 refunded (the job failed)
  pro        boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists usage_events_user_id_idx on public.usage_events (user_id, created_at desc);

-- App settings you can change without a deploy. The free allowance is per
-- account, all time. Change it in the Table Editor or with:
--   update public.app_settings set value = '3' where key = 'free_strips';
-- The server re-reads this table every minute.
create table if not exists public.app_settings (
  key        text primary key,
  value      jsonb not null,
  note       text,
  updated_at timestamptz not null default now()
);
insert into public.app_settings (key, value, note) values
  ('free_strips', '1', 'Free strips per account (server or on-device)'),
  ('free_downloads', '1', 'Free video downloads per account')
on conflict (key) do nothing;

alter table public.profiles       enable row level security;
alter table public.subscriptions  enable row level security;
alter table public.usage_counters enable row level security;
alter table public.usage_events   enable row level security;
alter table public.app_settings   enable row level security;

revoke all on public.profiles, public.subscriptions, public.usage_counters, public.usage_events, public.app_settings
  from anon, authenticated;

-- ---------------------------------------------------------------------------
-- What the server reads: one flat row per account with its best subscription
-- (a paid one first, then the newest) and usage counts.
-- ---------------------------------------------------------------------------

create or replace view public.accounts with (security_invoker = true) as
select
  p.id,
  p.google_sub,
  p.email,
  p.name,
  p.picture,
  p.stripe_customer_id,
  p.created_at,
  p.last_login_at,
  s.id                                         as subscription_id,
  s.status                                     as subscription_status,
  extract(epoch from s.current_period_end)::bigint as current_period_end,
  coalesce(s.cancel_at_period_end, false)      as cancel_at_period_end,
  coalesce((select u.used from public.usage_counters u where u.user_id = p.id and u.kind = 'strip'), 0)    as strips_used,
  coalesce((select u.used from public.usage_counters u where u.user_id = p.id and u.kind = 'download'), 0) as downloads_used
from public.profiles p
left join lateral (
  select * from public.subscriptions s
  where s.user_id = p.id
  order by (s.status in ('active', 'trialing', 'past_due')) desc, s.updated_at desc
  limit 1
) s on true;

revoke all on public.accounts from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Functions the server calls (POST /rest/v1/rpc/<name>)
-- ---------------------------------------------------------------------------

-- Paid if a subscription is active/trialing/past_due and its period hasn't
-- ended more than a day ago (in case a renewal webhook is late).
create or replace function public.is_pro(p_user_id uuid)
returns boolean language sql stable set search_path = '' as $$
  select exists (
    select 1 from public.subscriptions s
    where s.user_id = p_user_id
      and s.status in ('active', 'trialing', 'past_due')
      and (s.current_period_end is null or s.current_period_end > now() - interval '1 day')
  );
$$;

create or replace function public.get_account(p_user_id uuid)
returns setof public.accounts language sql stable set search_path = '' as $$
  select * from public.accounts where id = p_user_id;
$$;

create or replace function public.account_by_customer(p_customer text)
returns setof public.accounts language sql stable set search_path = '' as $$
  select * from public.accounts where stripe_customer_id = p_customer;
$$;

-- Find or create the account for a Google identity and refresh its profile.
create or replace function public.upsert_google_user(p_sub text, p_email text, p_name text, p_picture text)
returns setof public.accounts language plpgsql set search_path = '' as $$
declare v_id uuid;
begin
  insert into public.profiles (google_sub, email, name, picture, last_login_at)
  values (p_sub, p_email, p_name, p_picture, now())
  on conflict (google_sub) do update
    set email = excluded.email, name = excluded.name, picture = excluded.picture, last_login_at = now()
  returning id into v_id;
  return query select * from public.accounts where id = v_id;
end;
$$;

create or replace function public.set_customer(p_user_id uuid, p_customer text)
returns void language sql set search_path = '' as $$
  update public.profiles set stripe_customer_id = p_customer where id = p_user_id;
$$;

-- Insert or update one Stripe subscription (called from the webhook).
create or replace function public.set_subscription(
  p_user_id uuid, p_id text, p_status text, p_period_end bigint, p_cancel_at_period_end boolean, p_price_id text default null
)
returns void language sql set search_path = '' as $$
  insert into public.subscriptions (id, user_id, status, current_period_end, cancel_at_period_end, price_id, updated_at)
  values (p_id, p_user_id, p_status, to_timestamp(p_period_end), coalesce(p_cancel_at_period_end, false), p_price_id, now())
  on conflict (id) do update
    set user_id = excluded.user_id,
        status = excluded.status,
        current_period_end = excluded.current_period_end,
        cancel_at_period_end = excluded.cancel_at_period_end,
        price_id = coalesce(excluded.price_id, public.subscriptions.price_id),
        updated_at = now();
$$;

-- Count one use. Pro accounts always get it; free accounts only while under
-- p_free_limit. Check and increment happen in one statement, so two parallel
-- requests can't both take the last free use. Returns whether it was allowed.
create or replace function public.consume_usage(p_user_id uuid, p_kind text, p_free_limit integer)
returns boolean language plpgsql set search_path = '' as $$
declare
  v_pro boolean := public.is_pro(p_user_id);
  v_ok  boolean;
begin
  if not exists (select 1 from public.profiles where id = p_user_id) then
    return false;
  end if;
  if v_pro then
    insert into public.usage_counters as c (user_id, kind, used) values (p_user_id, p_kind, 1)
    on conflict (user_id, kind) do update set used = c.used + 1;
    v_ok := true;
  else
    if p_free_limit < 1 then
      return false;
    end if;
    insert into public.usage_counters as c (user_id, kind, used) values (p_user_id, p_kind, 1)
    on conflict (user_id, kind) do update set used = c.used + 1 where c.used < p_free_limit;
    v_ok := found;
  end if;
  if v_ok then
    insert into public.usage_events (user_id, kind, delta, pro) values (p_user_id, p_kind, 1, v_pro);
  end if;
  return v_ok;
end;
$$;

-- Give back a use whose job failed or was cancelled.
create or replace function public.refund_usage(p_user_id uuid, p_kind text)
returns void language plpgsql set search_path = '' as $$
begin
  update public.usage_counters set used = greatest(used - 1, 0) where user_id = p_user_id and kind = p_kind;
  if found then
    insert into public.usage_events (user_id, kind, delta) values (p_user_id, p_kind, -1);
  end if;
end;
$$;

create or replace function public.get_settings()
returns jsonb language sql stable set search_path = '' as $$
  select coalesce(jsonb_object_agg(key, value), '{}'::jsonb) from public.app_settings;
$$;

-- Only the service role may call these.
do $$
declare f text;
begin
  foreach f in array array[
    'is_pro(uuid)', 'get_account(uuid)', 'account_by_customer(text)', 'upsert_google_user(text, text, text, text)',
    'set_customer(uuid, text)', 'set_subscription(uuid, text, text, bigint, boolean, text)',
    'consume_usage(uuid, text, integer)', 'refund_usage(uuid, text)', 'get_settings()'
  ] loop
    execute format('revoke all on function public.%s from public, anon, authenticated', f);
    execute format('grant execute on function public.%s to service_role', f);
  end loop;
end;
$$;
