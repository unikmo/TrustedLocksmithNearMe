-- PENDING — forward cleanup of legacy internal database identifiers
--
-- DO NOT mark as applied until the actual Trusted Locksmith Supabase project is
-- connected and inspected. This file intentionally references the former internal
-- identifiers only as migration targets. Do not rewrite already-applied migrations.
--
-- Apply this BEFORE provider_self_serve_acquisition.sql, then run security/performance
-- advisors and exercise provider/admin update flows before moving either change into
-- canonical migration history.

-- 1) Rename the admin helper without changing its OID, preserving policy dependencies.
do $$
begin
  if to_regprocedure('public.is_keepwell_admin()') is not null
     and to_regprocedure('public.is_marketplace_admin()') is null then
    execute 'alter function public.is_keepwell_admin() rename to is_marketplace_admin';
  end if;
end $$;

create or replace function public.is_marketplace_admin()
returns boolean
language sql
stable
security definer
set search_path=public
as $$
  select exists(select 1 from public.admin_users where user_id=auth.uid());
$$;

-- 2) Rename the legacy provider-rating columns in place, preserving data.
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='provider_profiles' and column_name='keepwell_rating'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='provider_profiles' and column_name='marketplace_rating'
  ) then
    execute 'alter table public.provider_profiles rename column keepwell_rating to marketplace_rating';
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='provider_profiles' and column_name='keepwell_review_count'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='provider_profiles' and column_name='marketplace_review_count'
  ) then
    execute 'alter table public.provider_profiles rename column keepwell_review_count to marketplace_review_count';
  end if;
end $$;

-- If this is a fresh/partially migrated database, ensure neutral columns exist.
alter table public.provider_profiles
  add column if not exists marketplace_rating numeric(3,2),
  add column if not exists marketplace_review_count integer not null default 0;

-- 3) Recreate trigger functions using neutral identifiers.
create or replace function public.protect_provider_profile_system_fields()
returns trigger
language plpgsql
set search_path=public
as $$
begin
  if not public.is_marketplace_admin() then
    new.id := old.id;
    new.slug := old.slug;
    new.business_name := old.business_name;
    new.claim_status := old.claim_status;
    new.claimed_user_id := old.claimed_user_id;
    new.verified_at := old.verified_at;
    new.marketplace_rating := old.marketplace_rating;
    new.marketplace_review_count := old.marketplace_review_count;
    new.created_at := old.created_at;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

create or replace function public.protect_provider_offer_terms()
returns trigger
language plpgsql
set search_path=public
as $$
begin
  if not public.is_marketplace_admin() then
    new.id := old.id;
    new.request_type := old.request_type;
    new.request_id := old.request_id;
    new.provider_id := old.provider_id;
    new.payout_cents := old.payout_cents;
    new.request_summary := old.request_summary;
    new.offered_at := old.offered_at;
    new.completed_at := old.completed_at;

    if old.status <> 'offered' or new.status not in ('accepted','declined') then
      new.status := old.status;
      new.eta_minutes := old.eta_minutes;
      new.accepted_at := old.accepted_at;
      new.responded_at := old.responded_at;
    end if;
  end if;
  return new;
end;
$$;

comment on function public.is_marketplace_admin() is
'Checks whether the authenticated user is listed in public.admin_users.';
comment on column public.provider_profiles.marketplace_rating is
'Internal marketplace rating field; no public rating claim should be inferred unless separately supported.';
comment on column public.provider_profiles.marketplace_review_count is
'Internal marketplace review-count field; no public review-count claim should be inferred unless separately supported.';
