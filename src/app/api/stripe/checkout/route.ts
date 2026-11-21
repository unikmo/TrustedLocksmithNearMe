import { NextRequest, NextResponse } from "next/server";
import { getServiceMenuItem } from "@/lib/service-menu";
import { createTestCheckoutSession, hasStripeTestCheckoutConfig } from "@/lib/stripe-connect";

export const runtime = "nodejs";

function optionalEmail(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return undefined;
  const email = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : undefined;
}

export async function POST(request: NextRequest) {
  if (!hasStripeTestCheckoutConfig()) {
    return NextResponse.json({ error: "Test checkout is unavailable." }, { status: 404 });
  }

  const formData = await request.formData();
  const serviceId = formData.get("service_id");
  const service = typeof serviceId === "string" ? getServiceMenuItem(serviceId) : undefined;

  if (!service) {
    return NextResponse.json({ error: "Choose a valid service before checkout." }, { status: 400 });
  }

  const origin = request.nextUrl.origin;
  const review = new URL("/book/review", origin);
  review.searchParams.set("service_id", service.id);

  const successUrl = new URL(review);
  successUrl.searchParams.set("checkout", "success");
  successUrl.searchParams.set("session_id", "{CHECKOUT_SESSION_ID}");

  const cancelUrl = new URL(review);
  cancelUrl.searchParams.set("checkout", "cancelled");

  try {
    const session = await createTestCheckoutSession({
      serviceId: service.id,
      serviceTitle: service.title,
      amountCents: service.customerPriceCents,
      customerEmail: optionalEmail(formData.get("email")),
      successUrl: successUrl.toString(),
      cancelUrl: cancelUrl.toString(),
    });

    return NextResponse.redirect(session.url, { status: 303 });
  } catch (error) {
    console.error("Unable to create Stripe test Checkout Session", error);
    return NextResponse.json({ error: "Unable to start test checkout." }, { status: 502 });
  }
}
