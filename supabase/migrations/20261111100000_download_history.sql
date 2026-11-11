-- Download rows per account, so a signed-in user sees their downloads on any
-- device and after a reload.
--
-- Only the row is kept here (link, name, state). The downloaded file itself
-- stays on the server for DOWNLOAD_TTL_MIN and is then purged as before; an
-- old row then shows "Expired" with a retry button.
--
-- Same rules as the accounts migration: RLS on with no policies, functions
-- callable only with the service role key. Safe to run again.

create table if not exists public.download_history (
  id         uuid primary key,                       -- the row id the page made
  user_id    uuid not null references public.profiles (id) on delete cascade,
  platform   text not null check (platform in ('youtube', 'x', 'instagram', 'tiktok')),
  url        text not null,
  mode       text not null check (mode in ('video', 'audio')),
  name       text,
  job_id     text,                                   -- the server's download job, while it has one
  status     text not null default 'pending' check (status in ('pending', 'ready', 'error')),
  message    text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists download_history_user_idx on public.download_history (user_id, platform, created_at desc);

alter table public.download_history enable row level security;
revoke all on public.download_history from anon, authenticated;

-- The newest rows of one platform for one account.
create or replace function public.list_downloads(p_user_id uuid, p_platform text, p_limit integer default 50)
returns setof public.download_history language sql stable set search_path = '' as $$
  select * from public.download_history
  where user_id = p_user_id and platform = p_platform
  order by created_at desc
  limit least(greatest(coalesce(p_limit, 50), 1), 200);
$$;

-- Insert or update one row. Null arguments keep what the row already has.
-- A row id that belongs to another account is left alone.
create or replace function public.save_download(
  p_user_id uuid, p_id uuid, p_platform text, p_url text, p_mode text,
  p_name text default null, p_job_id text default null, p_status text default null, p_message text default null
)
returns void language sql set search_path = '' as $$
  insert into public.download_history as d (id, user_id, platform, url, mode, name, job_id, status, message)
  values (p_id, p_user_id, p_platform, p_url, p_mode, p_name, p_job_id, coalesce(p_status, 'pending'), p_message)
  on conflict (id) do update
    set name = coalesce(excluded.name, d.name),
        job_id = coalesce(p_job_id, d.job_id),
        status = coalesce(p_status, d.status),
        message = case when p_status is null then d.message else p_message end,
        updated_at = now()
    where d.user_id = p_user_id;
$$;

-- Delete some rows (p_ids), or all of a platform's rows when p_ids is null.
-- Returns the job ids they had, so the server can delete those files too.
create or replace function public.delete_downloads(p_user_id uuid, p_platform text, p_ids uuid[] default null)
returns text[] language sql set search_path = '' as $$
  with gone as (
    delete from public.download_history
    where user_id = p_user_id and platform = p_platform and (p_ids is null or id = any (p_ids))
    returning job_id
  )
  select coalesce(array_agg(job_id) filter (where job_id is not null), '{}') from gone;
$$;

-- Keep the table small: rows older than 30 days go (the server calls this hourly).
create or replace function public.prune_downloads(p_days integer default 30)
returns void language sql set search_path = '' as $$
  delete from public.download_history where created_at < now() - make_interval(days => greatest(p_days, 1));
$$;

do $$
declare f text;
begin
  foreach f in array array[
    'list_downloads(uuid, text, integer)',
    'save_download(uuid, uuid, text, text, text, text, text, text, text)',
    'delete_downloads(uuid, text, uuid[])',
    'prune_downloads(integer)'
  ] loop
    execute format('revoke all on function public.%s from public, anon, authenticated', f);
    execute format('grant execute on function public.%s to service_role', f);
  end loop;
end;
$$;
