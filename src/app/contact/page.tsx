import { BUSINESS_REQUESTS_AVAILABLE, BUSINESS_UNAVAILABLE_MESSAGE } from "@/lib/business-availability";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PAGE_VISUALS } from "@/lib/visuals";
import { submitContact } from "./actions";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Trusted Locksmith about business properties, portfolio scope, provider participation and trust or safety.",
  alternates: { canonical: "/contact" },
  openGraph: { images: [PAGE_VISUALS.contact.src] },
  twitter: { card: "summary_large_image", images: [PAGE_VISUALS.contact.src] },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; sent?: string; topic?: string }>;
}) {
  const { error, sent, topic } = await searchParams;
  const topics = ["Portfolio enquiry", "Turnover rekey", "Specialist assessment", "Business account support", "Billing", "Provider", "Trust & safety"];
  const defaultTopic = topics.includes(topic ?? "") ? topic! : "Portfolio enquiry";

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div>
              <div className="eyebrow">Contact Trusted Locksmith</div>
              <h1 className="mt-3 font-display text-4xl font-medium text-parchment sm:text-5xl">Tell us about your properties</h1>
              <p className="mt-5 max-w-xl leading-7 text-parchment-dim">
                For property managers, landlords, rental operators and real-estate businesses. Share your business scope, service area and timing; do not include access codes or sensitive resident information.
              </p>
              <a href="/services" className="mt-7 inline-flex min-h-11 items-center rounded-full bg-brass px-5 py-2.5 text-sm font-semibold text-ink">Business services & scope</a>

              <figure className="relative mt-9 overflow-hidden rounded-[24px] border border-sky/18 bg-surface-raised shadow-[0_22px_52px_rgba(3,18,37,0.22)]">
                <img
                  src={PAGE_VISUALS.contact.src}
                  alt={PAGE_VISUALS.contact.alt}
                  width={1600}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: PAGE_VISUALS.contact.objectPosition }}
                  className="h-[260px] w-full object-cover sm:h-[320px]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void/95 via-void/60 to-transparent px-5 pb-5 pt-14 text-xs font-medium leading-5 text-parchment">
                  {PAGE_VISUALS.contact.label}
                </figcaption>
              </figure>

              <div className="mt-9 space-y-5 text-sm text-parchment-dim">
                <Info title="Business accounts" body="Managed properties, recurring requests and portfolio scope." />
                <Info title="Property partnerships" body="Property managers, landlords and real-estate professionals." />
                <Info title="Provider network" body="Independent locksmith providers applying to receive local requests." />
              </div>
            </div>

            <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8 lg:sticky lg:top-28">
              {sent && <div className="mb-6 rounded-xl border border-verdigris/30 bg-verdigris/10 px-4 py-3 text-sm text-verdigris">Enquiry received. This is not a confirmed appointment or a guarantee of provider availability.</div>}
              {error && <div className="mb-6 rounded-xl border border-ember/30 bg-ember/10 px-4 py-3 text-sm text-ember">{error}</div>}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" form="business-contact" aria-hidden="true" />
              {!BUSINESS_REQUESTS_AVAILABLE && <p role="status" className="mb-6 rounded-xl border border-brass/40 bg-brass/10 p-4 text-sm leading-6">{BUSINESS_UNAVAILABLE_MESSAGE}</p>}
              <form id="business-contact" action={submitContact} className="space-y-5"><fieldset disabled={!BUSINESS_REQUESTS_AVAILABLE} className="space-y-5 disabled:opacity-50">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name"><input type="text" name="name" required autoComplete="name" placeholder="Your name" className="field" /></Field>
                  <Field label="Email"><input type="email" name="email" required autoComplete="email" placeholder="you@email.com" className="field" /></Field>
                </div>
                <Field label="Company / property business"><input type="text" name="company" required autoComplete="organization" className="field" /></Field>
                <div className="grid gap-4 sm:grid-cols-2"><Field label="Property city / service area"><input type="text" name="service_area" required className="field" /></Field><Field label="Approximate units"><input type="number" name="units" min="1" max="1000000" className="field" /></Field></div>
                <Field label="Topic">
                  <select name="topic" defaultValue={defaultTopic} className="field">
                    {topics.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </Field>
                <Field label="Message"><textarea name="message" required rows={6} placeholder="Describe the buildings, job types, cylinder counts and preferred timing. Specialist availability must be confirmed. Do not include keys, access codes or identity documents." className="field resize-y" /></Field>
                <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full bg-brass px-6 py-2.5 text-sm font-semibold text-ink">Send business enquiry</button>
              </fieldset></form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`.field{width:100%;border:1px solid var(--line);background:var(--surface-raised);border-radius:.75rem;padding:.75rem .9rem;font-size:.875rem;color:var(--parchment);outline:none}.field:focus{border-color:var(--brass)}.field::placeholder{color:color-mix(in srgb,var(--parchment-dim) 60%,transparent)}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children?: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-parchment-dim">{label}</span>{children}</label>;
}

function Info({ title, body }: { title: string; body: string }) {
  return <div className="border-l border-line pl-4"><div className="font-medium text-parchment">{title}</div><div className="mt-1 text-sm leading-6 text-parchment-dim">{body}</div></div>;
}
