import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { retrieveConnectedAccount } from "@/lib/stripe-connect";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/login?next=/provider/onboarding", request.url));

  const { data: provider } = await supabase.from("provider_profiles").select("*").eq("claimed_user_id", user.id).eq("claim_status", "verified").maybeSingle();
  if (!provider?.stripe_account_id) return NextResponse.redirect(new URL("/provider/onboarding?error=Payout onboarding account not found.", request.url));

  try {
    const account = await retrieveConnectedAccount(provider.stripe_account_id);
    const payoutReady = Boolean(account.details_submitted && account.payouts_enabled);
    const now = new Date().toISOString();
    const admin = createAdminClient();
    await admin.from("provider_profiles").update({
      stripe_details_submitted: Boolean(account.details_submitted),
      stripe_charges_enabled: Boolean(account.charges_enabled),
      stripe_payouts_enabled: Boolean(account.payouts_enabled),
      payout_ready_at: payoutReady ? now : null,
      updated_at: now,
    }).eq("id", provider.id).eq("claimed_user_id", user.id);

    if (payoutReady && !provider.stripe_payouts_enabled) {
      await admin.from("provider_acquisition_events").insert({ provider_id: provider.id, event_name: "payout_ready", metadata: { stripe_account_id: provider.stripe_account_id, source: "stripe_return" } });
    }

    return NextResponse.redirect(new URL(`/provider/onboarding?notice=${encodeURIComponent(payoutReady ? "Secure payout setup is complete." : "Stripe saved your progress. Complete any remaining requirements to become payout-ready.")}`, request.url));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not verify payout status.";
    return NextResponse.redirect(new URL(`/provider/onboarding?error=${encodeURIComponent(message)}`, request.url));
  }
}
