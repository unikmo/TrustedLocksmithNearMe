import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PAGE_VISUALS } from "@/lib/visuals";
import { submitContact } from "./actions";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Trusted Locksmith about customer support, property partnerships, provider applications or trust and safety.",
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
  const topics = ["Customer support", "Billing", "Partnership", "Provider", "Trust & safety", "Something else"];
  const defaultTopic = topics.includes(topic ?? "") ? topic! : "Customer support";

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div>
              <div className="eyebrow">Contact Trusted Locksmith</div>
              <h1 className="mt-3 font-display text-4xl font-medium text-parchment sm:text-5xl">Choose the right route and keep the request clear</h1>
              <p className="mt-5 max-w-xl leading-7 text-parchment-dim">
                Need a locksmith? Start with the service finder instead of support. Use this form for account, billing, partnership, provider or trust-and-safety questions.
              </p>
              <a href="/book" className="mt-7 inline-flex min-h-11 items-center rounded-full bg-brass px-5 py-2.5 text-sm font-semibold text-ink">Find a locksmith</a>

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
                <Info title="Customer support" body="Account, membership and platform questions." />
                <Info title="Property partnerships" body="Property managers, landlords and real-estate professionals." />
                <Info title="Provider network" body="Independent locksmith providers applying to receive local requests." />
              </div>
            </div>

            <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8 lg:sticky lg:top-28">
              {sent && <div className="mb-6 rounded-xl border border-verdigris/30 bg-verdigris/10 px-4 py-3 text-sm text-verdigris">Message sent. Trusted Locksmith will follow up using the contact information you provided.</div>}
              {error && <div className="mb-6 rounded-xl border border-ember/30 bg-ember/10 px-4 py-3 text-sm text-ember">{error}</div>}
              <form action={submitContact} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name"><input type="text" name="name" required autoComplete="name" placeholder="Your name" className="field" /></Field>
                  <Field label="Email"><input type="email" name="email" required autoComplete="email" placeholder="you@email.com" className="field" /></Field>
                </div>
                <Field label="Topic">
                  <select name="topic" defaultValue={defaultTopic} className="field">
                    {topics.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </Field>
                <Field label="Message"><textarea name="message" required rows={6} placeholder="Tell us what you need and include the property market or service area if relevant." className="field resize-y" /></Field>
                <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full bg-brass px-6 py-2.5 text-sm font-semibold text-ink">Send message</button>
              </form>
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
