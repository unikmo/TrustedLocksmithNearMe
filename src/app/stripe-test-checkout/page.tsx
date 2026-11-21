import { notFound } from "next/navigation";
import { defaultServiceForJobType, formatServicePrice, getServiceMenuItem } from "@/lib/service-menu";
import { hasStripeTestCheckoutConfig } from "@/lib/stripe-connect";

export const metadata = { title: "Stripe test checkout", robots: { index: false } };

export default async function StripeTestCheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ service_id?: string; checkout?: string }>;
}) {
  if (!hasStripeTestCheckoutConfig()) notFound();

  const { service_id, checkout } = await searchParams;
  const service = getServiceMenuItem(service_id) ?? defaultServiceForJobType();
  if (!service) notFound();

  return (
    <main className="min-h-screen bg-ink px-5 py-12 text-parchment">
      <div className="mx-auto max-w-xl rounded-2xl border border-brass/25 bg-surface p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[.16em] text-brass">Preview only</p>
        <h1 className="mt-3 font-display text-3xl">Stripe test checkout</h1>
        <p className="mt-3 text-sm leading-6 text-parchment-dim">This page is enabled only in the Preview environment. It uses Stripe test mode and never dispatches a locksmith.</p>

        {checkout === "success" && <p className="mt-5 rounded-lg border border-verdigris/30 bg-verdigris/10 px-4 py-3 text-sm text-verdigris">Stripe test payment completed. No locksmith has been dispatched.</p>}
        {checkout === "cancelled" && <p className="mt-5 rounded-lg border border-line px-4 py-3 text-sm text-parchment-dim">Test checkout was cancelled. No payment was taken.</p>}

        <div className="mt-6 border-y border-line/70 py-4">
          <p className="font-medium">{service.title}</p>
          <p className="mt-1 text-sm text-parchment-dim">Standard test amount</p>
          <p className="mt-2 font-display text-4xl text-brass">{formatServicePrice(service.customerPriceCents)}</p>
        </div>

        <form action="/api/stripe/checkout" method="post" className="mt-6">
          <input type="hidden" name="service_id" value={service.id} />
          <button type="submit" className="w-full rounded-full bg-brass px-6 py-3 text-sm font-semibold text-ink transition hover:brightness-110">Open Stripe test checkout</button>
        </form>
      </div>
    </main>
  );
}

