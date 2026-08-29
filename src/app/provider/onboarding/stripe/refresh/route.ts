import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createOnboardingLink } from "@/lib/stripe-connect";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/login?next=/provider/onboarding", request.url));

  const { data: provider } = await supabase.from("provider_profiles").select("id,stripe_account_id").eq("claimed_user_id", user.id).eq("claim_status", "verified").maybeSingle();
  if (!provider?.stripe_account_id) return NextResponse.redirect(new URL("/provider/onboarding?error=Payout onboarding has not started.", request.url));

  try {
    const origin = new URL(request.url).origin;
    const link = await createOnboardingLink({
      accountId: provider.stripe_account_id,
      refreshUrl: `${origin}/provider/onboarding/stripe/refresh`,
      returnUrl: `${origin}/provider/onboarding/stripe/return`,
    });
    return NextResponse.redirect(link.url);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not resume Stripe onboarding.";
    return NextResponse.redirect(new URL(`/provider/onboarding?error=${encodeURIComponent(message)}`, request.url));
  }
}
