import { NextResponse } from "next/server";
import { hasStripeTestCheckoutConfig, verifyStripeWebhookWithSecret } from "@/lib/stripe-connect";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CheckoutSession = {
  id?: string;
  livemode?: boolean;
  payment_status?: string;
  amount_total?: number;
  currency?: string;
  metadata?: { service_id?: string };
};

type StripeCheckoutEvent = {
  id?: string;
  type?: string;
  data?: { object?: CheckoutSession };
};

/**
 * Test-only receipt endpoint. Stripe, rather than the success-page redirect,
 * is the authority for completed Checkout payments. This deliberately logs a
 * verified test receipt only: it neither dispatches a locksmith nor triggers
 * a provider transfer.
 */
export async function POST(request: Request) {
  if (!hasStripeTestCheckoutConfig()) return new NextResponse(null, { status: 404 });

  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_CHECKOUT_WEBHOOK_SECRET;

  if (!verifyStripeWebhookWithSecret(rawBody, signature, secret)) {
    return NextResponse.json({ received: false }, { status: 400 });
  }

  let event: StripeCheckoutEvent;
  try {
    event = JSON.parse(rawBody) as StripeCheckoutEvent;
  } catch {
    return NextResponse.json({ received: false }, { status: 400 });
  }

  const session = event.data?.object;
  if (event.type === "checkout.session.completed" && session?.livemode === false && session.payment_status === "paid") {
    console.info("Verified Stripe test checkout completion", {
      eventId: event.id,
      sessionId: session.id,
      serviceId: session.metadata?.service_id,
      amountTotal: session.amount_total,
      currency: session.currency,
    });
  }

  return NextResponse.json({ received: true });
}

