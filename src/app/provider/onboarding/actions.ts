"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient, hasAdminClientConfig } from "@/lib/supabase/admin";
import { createConnectedAccount, createOnboardingLink, hasStripeConnectConfig, retrieveConnectedAccount } from "@/lib/stripe-connect";
import { SITE_URL } from "@/lib/site";

async function ownedProvider() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/provider/onboarding");
  const { data: provider } = await supabase.from("provider_profiles").select("*").eq("claimed_user_id", user.id).eq("claim_status", "verified").maybeSingle();
  if (!provider) redirect("/providers/claim?error=Claim a verified business profile first.");
  return { supabase, user, provider };
}

function selectedValues(formData: FormData, name: string) {
  return formData.getAll(name).map(String).map((value) => value.trim()).filter(Boolean);
}

export async function saveProviderSetup(formData: FormData) {
  const { supabase, provider } = await ownedProvider();
  const services = selectedValues(formData, "services");
  const serviceArea = selectedValues(formData, "service_area");
  if (services.length === 0 || serviceArea.length === 0) redirect("/provider/onboarding?error=Choose at least one service and one service area.");

  const { error } = await supabase.from("provider_profiles").update({ services, service_area: serviceArea }).eq("id", provider.id);
  if (error) redirect(`/provider/onboarding?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/provider/onboarding");
  redirect("/provider/onboarding?notice=Service preferences saved.");
}

function currentOrigin(requestHeaders: { get(name: string): string | null }) {
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host");
  const proto = requestHeaders.get("x-forwarded-proto") || "https";
  return host ? `${proto}://${host}` : SITE_URL;
}

export async function startPayoutOnboarding() {
  const { user, provider } = await ownedProvider();
  if (!hasAdminClientConfig() || !hasStripeConnectConfig()) redirect("/provider/onboarding?error=Secure payout onboarding is not configured yet.");

  const admin = createAdminClient();
  let accountId = provider.stripe_account_id as string | null | undefined;
  if (!accountId) {
    const account = await createConnectedAccount({ providerId: provider.id, businessName: provider.business_name, email: user.email });
    accountId = account.id;
    const { error } = await admin.from("provider_profiles").update({ stripe_account_id: accountId, updated_at: new Date().toISOString() }).eq("id", provider.id).eq("claimed_user_id", user.id);
    if (error) redirect(`/provider/onboarding?error=${encodeURIComponent(error.message)}`);
    await admin.from("provider_acquisition_events").insert({ provider_id: provider.id, event_name: "payout_onboarding_started", metadata: { stripe_account_id: accountId } });
  }

  const requestHeaders = await headers();
  const origin = currentOrigin(requestHeaders);
  const link = await createOnboardingLink({ accountId, refreshUrl: `${origin}/provider/onboarding/stripe/refresh`, returnUrl: `${origin}/provider/onboarding/stripe/return` });
  redirect(link.url);
}

export async function syncPayoutStatus() {
  const { user, provider } = await ownedProvider();
  const accountId = provider.stripe_account_id as string | null | undefined;
  if (!accountId || !hasAdminClientConfig() || !hasStripeConnectConfig()) redirect("/provider/onboarding?error=Payout onboarding has not started yet.");

  const account = await retrieveConnectedAccount(accountId);
  const admin = createAdminClient();
  const payoutReady = Boolean(account.details_submitted && account.payouts_enabled);
  const wasReady = Boolean(provider.stripe_payouts_enabled);
  const now = new Date().toISOString();
  const { error } = await admin.from("provider_profiles").update({
    stripe_details_submitted: Boolean(account.details_submitted),
    stripe_charges_enabled: Boolean(account.charges_enabled),
    stripe_payouts_enabled: Boolean(account.payouts_enabled),
    payout_ready_at: payoutReady ? now : null,
    updated_at: now,
  }).eq("id", provider.id).eq("claimed_user_id", user.id);
  if (error) redirect(`/provider/onboarding?error=${encodeURIComponent(error.message)}`);

  if (payoutReady && !wasReady) await admin.from("provider_acquisition_events").insert({ provider_id: provider.id, event_name: "payout_ready", metadata: { stripe_account_id: accountId, source: "provider_sync" } });
  revalidatePath("/provider/onboarding");
  revalidatePath("/provider");
  redirect(`/provider/onboarding?notice=${encodeURIComponent(payoutReady ? "Secure payout setup is complete." : "Stripe still needs additional information. Continue secure onboarding.")}`);
}
