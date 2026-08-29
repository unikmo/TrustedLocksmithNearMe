-- PENDING — Provider self-serve acquisition + Stripe Connect state
--
-- DO NOT treat this file as applied migration history.
-- The Trusted Locksmith Supabase project is not currently exposed to the connected
-- Supabase tool, so this schema cannot yet be applied and verified safely.
-- When the correct project is connected: apply through the normal Supabase migration
-- workflow, run security/performance advisors, exercise invite/claim/payout paths,
-- then move the verified change into canonical migration history.

create extension if not exists pgcrypto;

create table if not exists public.provider_contacts (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.provider_profiles(id) on delete cascade,
  contact_type text not null check (contact_type in ('email','phone','website')),
  contact_value text not null,
  source text not null default 'public_business_source',
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified','verified','invalid')),
  can_outreach boolean not null default false,
  do_not_contact boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(provider_id, contact_type, contact_value)
);

create index if not exists provider_contacts_outreach_idx
on public.provider_contacts(contact_type, verification_status, can_outreach, do_not_contact);

create table if not exists public.provider_outreach_invites (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.provider_profiles(id) on delete cascade,
  contact_id uuid not null references public.provider_contacts(id) on delete cascade,
  token_hash text not null unique,
  campaign text not null default 'greater_boston_launch',
  status text not null default 'queued'
    check (status in ('queued','sent','clicked','claimed','failed','expired','opted_out')),
  message_provider_id text,
  sent_at timestamptz,
  clicked_at timestamptz,
  claimed_at timestamptz,
  opted_out_at timestamptz,
  expires_at timestamptz not null,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists provider_outreach_invites_provider_idx
on public.provider_outreach_invites(provider_id, created_at desc);
create index if not exists provider_outreach_invites_status_idx
on public.provider_outreach_invites(status, expires_at);

create table if not exists public.provider_acquisition_events (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.provider_profiles(id) on delete cascade,
  invite_id uuid references public.provider_outreach_invites(id) on delete set null,
  event_name text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists provider_acquisition_events_provider_idx
on public.provider_acquisition_events(provider_id, created_at desc);

alter table public.provider_profiles
  add column if not exists stripe_account_id text,
  add column if not exists stripe_details_submitted boolean not null default false,
  add column if not exists stripe_charges_enabled boolean not null default false,
  add column if not exists stripe_payouts_enabled boolean not null default false,
  add column if not exists payout_ready_at timestamptz;

create unique index if not exists provider_profiles_stripe_account_uidx
on public.provider_profiles(stripe_account_id)
where stripe_account_id is not null;

alter table public.provider_claims
  add column if not exists outreach_invite_id uuid references public.provider_outreach_invites(id) on delete set null,
  add column if not exists verification_method text;

-- Protect Stripe/system fields from ordinary provider profile updates. Service-role
-- requests are allowed because the secret is server-only and never shipped to clients.
create or replace function public.protect_provider_profile_system_fields()
returns trigger
language plpgsql
set search_path=public
as $$
declare
  jwt_role text := coalesce(auth.jwt() ->> 'role', '');
begin
  if not public.is_keepwell_admin() and jwt_role <> 'service_role' then
    new.id := old.id;
    new.slug := old.slug;
    new.business_name := old.business_name;
    new.claim_status := old.claim_status;
    new.claimed_user_id := old.claimed_user_id;
    new.verified_at := old.verified_at;
    new.keepwell_rating := old.keepwell_rating;
    new.keepwell_review_count := old.keepwell_review_count;
    new.stripe_account_id := old.stripe_account_id;
    new.stripe_details_submitted := old.stripe_details_submitted;
    new.stripe_charges_enabled := old.stripe_charges_enabled;
    new.stripe_payouts_enabled := old.stripe_payouts_enabled;
    new.payout_ready_at := old.payout_ready_at;
    new.created_at := old.created_at;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

alter table public.provider_contacts enable row level security;
alter table public.provider_outreach_invites enable row level security;
alter table public.provider_acquisition_events enable row level security;

-- These acquisition tables are private operational data. There is deliberately no
-- anonymous policy and no provider-facing broad read policy.
drop policy if exists "admins can read provider contacts" on public.provider_contacts;
create policy "admins can read provider contacts" on public.provider_contacts
for select to authenticated using (public.is_keepwell_admin());

drop policy if exists "admins can manage provider contacts" on public.provider_contacts;
create policy "admins can manage provider contacts" on public.provider_contacts
for all to authenticated using (public.is_keepwell_admin()) with check (public.is_keepwell_admin());

drop policy if exists "admins can read provider outreach invites" on public.provider_outreach_invites;
create policy "admins can read provider outreach invites" on public.provider_outreach_invites
for select to authenticated using (public.is_keepwell_admin());

drop policy if exists "admins can manage provider outreach invites" on public.provider_outreach_invites;
create policy "admins can manage provider outreach invites" on public.provider_outreach_invites
for all to authenticated using (public.is_keepwell_admin()) with check (public.is_keepwell_admin());

drop policy if exists "admins can read provider acquisition events" on public.provider_acquisition_events;
create policy "admins can read provider acquisition events" on public.provider_acquisition_events
for select to authenticated using (public.is_keepwell_admin());

-- Keep the existing public-source phones/websites in the contact model for funnel
-- visibility, but NEVER mark them outreach-eligible automatically. Verified email
-- enrichment must explicitly set verification_status='verified' and can_outreach=true.
insert into public.provider_contacts
(provider_id, contact_type, contact_value, source, verification_status, can_outreach)
select provider_id, 'phone', phone, 'provider_sources', 'unverified', false
from public.provider_sources
where phone is not null and btrim(phone) <> ''
on conflict (provider_id, contact_type, contact_value) do nothing;

insert into public.provider_contacts
(provider_id, contact_type, contact_value, source, verification_status, can_outreach)
select provider_id, 'website', website, 'provider_sources', 'unverified', false
from public.provider_sources
where website is not null and btrim(website) <> ''
on conflict (provider_id, contact_type, contact_value) do nothing;

comment on table public.provider_contacts is
'Private provider acquisition contacts. Outreach is allowed only when a contact is independently verified and can_outreach is explicitly true.';
comment on table public.provider_outreach_invites is
'Hashed single-use provider acquisition invitations. Raw invite tokens are never stored.';
comment on column public.provider_profiles.stripe_account_id is
'Stripe connected-account identifier only. Bank account and routing details are never stored in Trusted Locksmith tables.';
