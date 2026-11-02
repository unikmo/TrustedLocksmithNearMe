-- PENDING: the keepwell database is inactive. Inspect live schema and apply only
-- after restoration, before enabling BUSINESS_REQUESTS_AVAILABLE.
-- Retains all existing records and agreements. No cancellations or deletions.
begin;
-- New B2B service requests use pm_service_requests, never guest_bookings.
revoke insert on public.guest_bookings from anon, authenticated;
drop policy if exists guest_bookings_public_insert on public.guest_bookings;
-- Household gifting / consumer purchases are closed.
revoke insert on public.brokerage_bulk_orders from anon, authenticated;
revoke insert on public.subscriptions from anon, authenticated;
revoke execute on function public.lookup_brokerage_activation(text) from public, anon, authenticated;
-- User-supplied signup metadata must never activate a paid subscription.
create or replace function public.handle_new_member() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.members(id,full_name,plan)
  values(new.id,coalesce(nullif(new.raw_user_meta_data->>'full_name',''),split_part(new.email,'@',1)),'Business')
  on conflict(id) do update set full_name=excluded.full_name;
  return new;
end;
$$;
revoke execute on function public.handle_new_member() from public, anon, authenticated;
-- Preserve codes but stop new consumer gift redemption at database-trigger level.
drop trigger if exists on_auth_brokerage_activation on auth.users;
-- Correct the property/organization correlation explicitly, in addition to
-- server-side organization membership and property checks.
drop policy if exists pm_requests_insert on public.pm_service_requests;
create policy pm_requests_insert on public.pm_service_requests for insert to authenticated
with check (
  public.is_pm_member(organization_id)
  and requested_by = (select auth.uid())
  and exists (select 1 from public.pm_properties p where p.id = pm_service_requests.property_id and p.organization_id = pm_service_requests.organization_id)
);
commit;
