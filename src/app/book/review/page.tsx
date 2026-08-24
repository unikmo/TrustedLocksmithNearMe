import type { Metadata } from "next";
import Link from "next/link";
import { Keyhole } from "@/components/Keyhole";
import { createGuestBooking } from "../actions";
import { defaultServiceForJobType, formatServicePrice, getServiceMenuItem } from "@/lib/service-menu";

export const metadata: Metadata = { title: "Review locksmith request", robots: { index: false } };

export default async function BookReviewPage({
  searchParams,
}: {
  searchParams: Promise<{
    service_id?: string;
    job_type?: string;
    address?: string;
    phone?: string;
    email?: string;
    error?: string;
  }>;
}) {
  const { service_id, job_type, address, phone, email, error } = await searchParams;
  const service = getServiceMenuItem(service_id) ?? defaultServiceForJobType(job_type)!;

  return (
    <div className="min-h-screen bg-ink px-5 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-2xl">
        <Link href="/" className="inline-flex items-center gap-2.5 font-display text-lg font-medium text-parchment">
          <span className="grid h-8 w-8 place-items-center rounded-xl border border-brass/30 bg-brass/10">
            <Keyhole className="h-4 w-3 text-brass" />
          </span>
          Trusted Locksmith
        </Link>

        <div className="mt-10 border-b border-line/70 pb-8 text-center">
          <Progress current={3} />
          <h1 className="mt-6 font-display text-4xl font-medium tracking-[-.025em] text-parchment">Review before you submit.</h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-parchment-dim">
            This is the decision point: confirm the service, location and standard total before the request goes to participating independent local providers.
          </p>
        </div>

        {error && <div className="mt-6 rounded-xl border border-ember/30 bg-ember/10 px-4 py-3 text-sm text-ember">{error}</div>}

        <div className="mt-8 border-y border-line/70 py-2 text-sm">
          <Row label="Service" value={service.title} />
          <Row label="When" value={service.timing} />
          <Row label="Address" value={address || "—"} />
          <Row label="Phone" value={phone || "—"} />
        </div>

        <div className="mt-6 rounded-2xl border border-brass/25 bg-brass/[.055] p-5 sm:p-6">
          <div className="flex items-end justify-between gap-4">
            <span className="font-semibold text-parchment">Standard total</span>
            <span className="font-display text-4xl text-brass">{formatServicePrice(service.customerPriceCents)}</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-verdigris">Provider travel/service call is included. No second generic call-out fee is added.</p>
          <p className="mt-4 text-xs leading-5 text-parchment-dim">{service.scope}</p>
          <p className="mt-2 text-xs leading-5 text-parchment-dim">If the actual job requires work outside this published scope, the additional work and price must be shown and approved before it begins.</p>
        </div>

        <form action={createGuestBooking} className="mt-7">
          <input type="hidden" name="service_id" value={service.id} />
          <input type="hidden" name="address" value={address ?? ""} />
          <input type="hidden" name="phone" value={phone ?? ""} />
          <input type="hidden" name="email" value={email ?? ""} />
          <button type="submit" className="w-full rounded-full bg-brass px-6 py-3 text-sm font-semibold text-ink transition hover:brightness-110">Submit locksmith request</button>
        </form>
        <p className="mt-3 text-center text-[11px] leading-5 text-parchment-dim">Submitting a request does not guarantee provider availability. Provider identity and ETA appear only after acceptance.</p>
        <p className="mt-5 text-center text-xs text-parchment-dim"><Link href={`/book/details?service_id=${service.id}`} className="hover:text-parchment">← Edit details</Link></p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex items-start justify-between gap-5 py-2.5"><span className="text-parchment-dim">{label}</span><span className="max-w-[68%] text-right font-medium text-parchment">{value}</span></div>;
}

function Progress({ current }: { current: 1 | 2 | 3 }) {
  return (
    <div className="mx-auto flex max-w-sm items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[.12em] text-parchment-dim" aria-label={`Step ${current} of 3`}>
      {["Service", "Details", "Review"].map((label, index) => {
        const step = index + 1;
        return (
          <div key={label} className="flex items-center gap-2">
            <span className={step <= current ? "text-brass" : "text-parchment-dim/60"}>{step}. {label}</span>
            {step < 3 && <span className="text-line">/</span>}
          </div>
        );
      })}
    </div>
  );
}
