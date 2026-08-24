import type { Metadata } from "next";
import Link from "next/link";
import { Keyhole } from "@/components/Keyhole";
import { defaultServiceForJobType, formatServicePrice, getServiceMenuItem } from "@/lib/service-menu";

export const metadata: Metadata = { title: "Locksmith request details", robots: { index: false } };

export default async function BookDetailsPage({
  searchParams,
}: {
  searchParams: Promise<{ service_id?: string; job_type?: string }>;
}) {
  const { service_id, job_type } = await searchParams;
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
          <Progress current={2} />
          <div className="mt-6 font-mono text-[10px] uppercase tracking-[.14em] text-brass">{service.timing}</div>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-[-.025em] text-parchment">Where do you need the service?</h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-parchment-dim">
            We use the address to route the request to participating independent local providers serving that area.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
          <aside className="border-y border-line/70 py-5">
            <div className="font-mono text-[10px] uppercase tracking-[.14em] text-parchment-dim">Selected service</div>
            <h2 className="mt-2 font-display text-2xl text-parchment">{service.title}</h2>
            <div className="mt-3 font-display text-4xl text-brass">{formatServicePrice(service.customerPriceCents)}</div>
            <div className="mt-1 text-xs font-medium text-verdigris">Standard total · travel/service call included</div>
            <p className="mt-4 text-xs leading-5 text-parchment-dim">{service.scope}</p>
            <Link href="/book" className="mt-4 inline-flex text-xs font-semibold text-parchment hover:text-brass">← Change service</Link>
          </aside>

          <form action="/book/review" className="space-y-5">
            <input type="hidden" name="service_id" value={service.id} />
            <Field label="Service address">
              <input type="text" name="address" required autoComplete="street-address" placeholder="Street, city, state, ZIP" className="input" />
            </Field>
            <Field label="Mobile phone">
              <input type="tel" name="phone" required autoComplete="tel" placeholder="Best number for this request" className="input" />
            </Field>
            <Field label="Email (optional)">
              <input type="email" name="email" autoComplete="email" placeholder="you@email.com" className="input" />
            </Field>
            <button type="submit" className="w-full rounded-full bg-brass px-5 py-3 text-sm font-semibold text-ink transition hover:brightness-110">Review locksmith request</button>
            <p className="text-center text-[11px] leading-5 text-parchment-dim">Next: review the service, address and standard total before submitting.</p>
          </form>
        </div>
      </div>
      <style>{`.input{width:100%;border:1px solid var(--line);background:var(--surface);border-radius:.875rem;padding:.85rem .95rem;font-size:.95rem;color:var(--parchment);outline:none;min-height:48px}.input:focus{border-color:var(--brass);box-shadow:0 0 0 3px rgba(214,173,87,.08)}.input::placeholder{color:color-mix(in srgb,var(--parchment-dim) 60%,transparent)}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children?: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-sm font-medium text-parchment">{label}</span>{children}</label>;
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
