-- Two paid plans and a separate free allowance per mode.
--
--   basic ($10/month): unlimited on-device stripping.
--   pro   ($20/month): unlimited everything: on-device and server stripping,
--                      and video downloads.
--
-- Free accounts get free_strips on-device strips, free_server_strips server
-- strips and free_downloads downloads (1 each by default, see app_settings).
--
-- Run it after 20261111000000_accounts.sql. It is safe to run again.

-- Which plan a subscription pays for. The webhook sets it from the Stripe
-- price (STRIPE_PRICE_ID_BASIC / STRIPE_PRICE_ID_PRO). Rows written before
-- this migration were all the single $20 plan, so they become 'pro'.
alter table public.subscriptions add column if not exists tier text not null default 'pro';
alter table public.subscriptions drop constraint if exists subscriptions_tier_check;
alter table public.subscriptions add constraint subscriptions_tier_check check (tier in ('basic', 'pro'));

-- 'strip' is an on-device strip, 'server_strip' one done on our server.
alter table public.usage_counters drop constraint if exists usage_counters_kind_check;
alter table public.usage_counters add constraint usage_counters_kind_check check (kind in ('strip', 'server_strip', 'download'));
alter table public.usage_events drop constraint if exists usage_events_kind_check;
alter table public.usage_events add constraint usage_events_kind_check check (kind in ('strip', 'server_strip', 'download'));
alter table public.usage_events add column if not exists tier text;

insert into public.app_settings (key, value, note) values
  ('free_server_strips', '1', 'Free server strips per account')
on conflict (key) do nothing;
update public.app_settings set note = 'Free on-device strips per account' where key = 'free_strips';
update public.app_settings set note = 'Free video downloads per account' where key = 'free_downloads';

-- ---------------------------------------------------------------------------
-- The accounts view gains the plan and the server-strip count. New columns
-- go at the end so `create or replace view` keeps working.
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
  coalesce((select u.used from public.usage_counters u where u.user_id = p.id and u.kind = 'download'), 0) as downloads_used,
  s.tier                                       as subscription_tier,
  s.price_id                                   as subscription_price_id,
  coalesce((select u.used from public.usage_counters u where u.user_id = p.id and u.kind = 'server_strip'), 0) as server_strips_used
from public.profiles p
left join lateral (
  select * from public.subscriptions s
  where s.user_id = p.id
  -- A paid subscription first, Pro before Basic, then the newest.
  order by (s.status in ('active', 'trialing', 'past_due')) desc, (s.tier = 'pro') desc, s.updated_at desc
  limit 1
) s on true;

revoke all on public.accounts from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Functions
-- ---------------------------------------------------------------------------

-- The paid plan an account is on now: 'pro', 'basic', or null for free.
-- Same rule as before: active/trialing/past_due, with a day of slack past the
-- period end in case a renewal webhook is late.
create or replace function public.account_tier(p_user_id uuid)
returns text language sql stable set search_path = '' as $$
  select s.tier from public.subscriptions s
  where s.user_id = p_user_id
    and s.status in ('active', 'trialing', 'past_due')
    and (s.current_period_end is null or s.current_period_end > now() - interval '1 day')
  order by (s.tier = 'pro') desc
  limit 1;
$$;

-- Re-created so they return the view's new columns.
create or replace function public.get_account(p_user_id uuid)
returns setof public.accounts language sql stable set search_path = '' as $$
  select * from public.accounts where id = p_user_id;
$$;

create or replace function public.account_by_customer(p_customer text)
returns setof public.accounts language sql stable set search_path = '' as $$
  select * from public.accounts where stripe_customer_id = p_customer;
$$;

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

-- What a plan includes without limits.
create or replace function public.tier_unlimited(p_tier text, p_kind text)
returns boolean language sql immutable set search_path = '' as $$
  select case
    when p_tier = 'pro' then true
    when p_tier = 'basic' then p_kind = 'strip'
    else false
  end;
$$;

-- The old signature had no tier; drop it so PostgREST has one function to call.
drop function if exists public.set_subscription(uuid, text, text, bigint, boolean, text);

create or replace function public.set_subscription(
  p_user_id uuid, p_id text, p_status text, p_period_end bigint, p_cancel_at_period_end boolean,
  p_price_id text default null, p_tier text default 'pro'
)
returns void language sql set search_path = '' as $$
  insert into public.subscriptions (id, user_id, status, current_period_end, cancel_at_period_end, price_id, tier, updated_at)
  values (p_id, p_user_id, p_status, to_timestamp(p_period_end), coalesce(p_cancel_at_period_end, false), p_price_id,
          coalesce(p_tier, 'pro'), now())
  on conflict (id) do update
    set user_id = excluded.user_id,
        status = excluded.status,
        current_period_end = excluded.current_period_end,
        cancel_at_period_end = excluded.cancel_at_period_end,
        price_id = coalesce(excluded.price_id, public.subscriptions.price_id),
        tier = excluded.tier,
        updated_at = now();
$$;

-- Count one use. If the account's plan includes this kind, it is always
-- allowed; otherwise only while under p_free_limit. Check and increment
-- happen in one statement, so two parallel requests can't both take the last
-- free use. Returns whether it was allowed.
create or replace function public.consume_usage(p_user_id uuid, p_kind text, p_free_limit integer)
returns boolean language plpgsql set search_path = '' as $$
declare
  v_tier      text := public.account_tier(p_user_id);
  v_unlimited boolean := public.tier_unlimited(v_tier, p_kind);
  v_ok        boolean;
begin
  if not exists (select 1 from public.profiles where id = p_user_id) then
    return false;
  end if;
  if v_unlimited then
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
    insert into public.usage_events (user_id, kind, delta, pro, tier) values (p_user_id, p_kind, 1, v_unlimited, v_tier);
  end if;
  return v_ok;
end;
$$;

-- Only the service role may call these.
do $$
declare f text;
begin
  foreach f in array array[
    'account_tier(uuid)', 'tier_unlimited(text, text)',
    'set_subscription(uuid, text, text, bigint, boolean, text, text)',
    'consume_usage(uuid, text, integer)', 'get_account(uuid)', 'account_by_customer(text)',
    'upsert_google_user(text, text, text, text)'
  ] loop
    execute format('revoke all on function public.%s from public, anon, authenticated', f);
    execute format('grant execute on function public.%s to service_role', f);
  end loop;
end;
$$;
