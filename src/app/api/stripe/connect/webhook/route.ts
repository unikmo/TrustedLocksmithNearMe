import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getPayoutStatus, retrieveConnectedAccount, verifyStripeWebhook } from "@/lib/stripe-connect";

export const dynamic = "force-dynamic";

type StripeAccountEvent = {
  id: string;
  type: string;
  data?: {
    object?: {
      id?: string;
    };
  };
};

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!verifyStripeWebhook(rawBody, signature)) {
    return NextResponse.json({ received: false }, { status: 400 });
  }

  const event = JSON.parse(rawBody) as StripeAccountEvent;
  const accountId = event.data?.object?.id;
  if (!accountId || !event.type.includes("account") || !event.type.includes("updated")) {
    return NextResponse.json({ received: true });
  }

  const supabase = createAdminClient();
  const { data: provider } = await supabase
    .from("provider_profiles")
    .select("id,stripe_payouts_enabled")
    .eq("stripe_account_id", accountId)
    .maybeSingle();

  if (!provider) return NextResponse.json({ received: true });

  const account = await retrieveConnectedAccount(accountId);
  const status = getPayoutStatus(account);
  const now = new Date().toISOString();

  await supabase
    .from("provider_profiles")
    .update({
      stripe_details_submitted: status.detailsSubmitted,
      stripe_charges_enabled: status.chargesEnabled,
      stripe_payouts_enabled: status.payoutsEnabled,
      payout_ready_at: status.payoutReady ? now : null,
      updated_at: now,
    })
    .eq("id", provider.id)
    .eq("stripe_account_id", accountId);

  if (status.payoutReady && !provider.stripe_payouts_enabled) {
    await supabase.from("provider_acquisition_events").insert({
      provider_id: provider.id,
      event_name: "payout_ready",
      metadata: { stripe_account_id: accountId, stripe_api_version: account.apiVersion, stripe_event_id: event.id },
    });
  }

  return NextResponse.json({ received: true });
}
