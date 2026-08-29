import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyStripeWebhook, type StripeConnectAccount } from "@/lib/stripe-connect";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!verifyStripeWebhook(rawBody, signature)) {
    return NextResponse.json({ received: false }, { status: 400 });
  }

  const event = JSON.parse(rawBody) as { id: string; type: string; data?: { object?: StripeConnectAccount } };
  if (event.type !== "account.updated" || !event.data?.object?.id) {
    return NextResponse.json({ received: true });
  }

  const account = event.data.object;
  const providerId = account.metadata?.provider_id;
  if (!providerId) return NextResponse.json({ received: true });

  const supabase = createAdminClient();
  const now = new Date().toISOString();
  const payoutReady = Boolean(account.details_submitted && account.payouts_enabled);

  const { data: provider } = await supabase
    .from("provider_profiles")
    .select("id,stripe_payouts_enabled")
    .eq("id", providerId)
    .eq("stripe_account_id", account.id)
    .maybeSingle();

  if (!provider) return NextResponse.json({ received: true });

  await supabase
    .from("provider_profiles")
    .update({
      stripe_details_submitted: Boolean(account.details_submitted),
      stripe_charges_enabled: Boolean(account.charges_enabled),
      stripe_payouts_enabled: Boolean(account.payouts_enabled),
      payout_ready_at: payoutReady ? now : null,
      updated_at: now,
    })
    .eq("id", providerId)
    .eq("stripe_account_id", account.id);

  if (payoutReady && !provider.stripe_payouts_enabled) {
    await supabase.from("provider_acquisition_events").insert({
      provider_id: providerId,
      event_name: "payout_ready",
      metadata: { stripe_account_id: account.id, stripe_event_id: event.id },
    });
  }

  return NextResponse.json({ received: true });
}
