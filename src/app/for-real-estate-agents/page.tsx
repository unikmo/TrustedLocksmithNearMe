import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { CTABand } from "@/components/CTABand";
import { PAGE_VISUALS } from "@/lib/visuals";
import { SITE_URL } from "@/lib/site";

const metaDescription = "Help homebuyers start secure after closing with move-in rekey, lock-change and smart-lock options, or give Digital Access through a repeatable brokerage closing program.";

export const metadata: Metadata = {
  title: "Real Estate Closing Rekey & Homebuyer Access",
  description: metaDescription,
  alternates: { canonical: "/for-real-estate-agents" },
  openGraph: {
    title: "Move-in security and useful closing access for homebuyers",
    description: metaDescription,
    url: "/for-real-estate-agents",
    images: [PAGE_VISUALS.realEstate.src],
  },
  twitter: {
    card: "summary_large_image",
    title: "Move-in security and useful closing access for homebuyers",
    description: metaDescription,
    images: [PAGE_VISUALS.realEstate.src],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/for-real-estate-agents#page`,
  url: `${SITE_URL}/for-real-estate-agents`,
  name: "Trusted Locksmith for real estate professionals",
  description: metaDescription,
  audience: { "@type": "Audience", audienceType: "Real estate agents, brokerages and homebuyers" },
  about: [
    { "@type": "Thing", name: "move-in rekeying after a home closing" },
    { "@type": "Thing", name: "residential lock changes after closing" },
    { "@type": "Thing", name: "smart-lock installation for homebuyers" },
    { "@type": "Thing", name: "Digital Access closing gifts" },
  ],
  relatedLink: [
    `${SITE_URL}/services`,
    `${SITE_URL}/brokerage`,
    `${SITE_URL}/landlords`,
    `${SITE_URL}/for-property-managers`,
  ],
};

const REASONS = [
  { title: "A real day-one need", body: "New owners may not know who still has old keys. A rekey or lock change is a practical move-in security decision, not a decorative closing extra." },
  { title: "Useful after the handover", body: "Digital Access, trusted contacts and clearly priced locksmith services remain relevant long after the closing appointment." },
  { title: "Two ways to participate", body: "Agents can point buyers to move-in locksmith services or use the brokerage workspace for repeatable Digital Access membership gifting." },
  { title: "The buyer stays in control", body: "The buyer chooses and controls their own locksmith request or Trusted Locksmith account; the agent does not receive private access details." },
];

export default function RealEstateAgentsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <Nav />
      <main className="flex-1">
        <PageHero
          eyebrow="Trusted Locksmith for real estate professionals"
          title="Help buyers start secure on day one."
          body="After closing, buyers can see clearly priced move-in rekey, lock-change or smart-lock options. Brokerages can also give Digital Access as a practical closing benefit the buyer controls."
          visual={PAGE_VISUALS.realEstate}
        />

        <section className="border-b border-line/70 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <div className="eyebrow">Two closing pathways</div>
              <h2 className="mt-3 font-display text-4xl tracking-[-.03em] text-parchment sm:text-5xl">Security service or useful access gift.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-parchment-dim">The buyer can use either path independently. A locksmith service is not bundled into a gifted membership, and a gifted membership does not force a locksmith visit.</p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-[28px] border border-brass/25 bg-brass/[.06] p-7 sm:p-8">
                <div className="eyebrow">Move-in security</div>
                <h3 className="mt-3 font-display text-3xl text-parchment">Rekey the home after closing.</h3>
                <p className="mt-4 text-sm leading-6 text-parchment-dim">Start with a standard rekey when compatible existing hardware can stay in place. If hardware needs replacement, use lock-change pricing instead. Compatible customer-supplied smart locks can be installed as a separate service.</p>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm">
                  <Link href="/services" className="font-semibold text-brass hover:underline">See rekey & lock prices →</Link>
                  <Link href="/book" className="font-semibold text-parchment hover:underline">Start a request →</Link>
                </div>
              </div>

              <div className="rounded-[28px] border border-line bg-surface/45 p-7 sm:p-8">
                <div className="eyebrow">Closing gift / buyer access</div>
                <h3 className="mt-3 font-display text-3xl text-parchment">Give access organization the buyer owns.</h3>
                <p className="mt-4 text-sm leading-6 text-parchment-dim">Brokerages can prepare memberships and activation codes for multiple closings. The buyer activates and controls the account, including Digital Access details and trusted-access information.</p>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm">
                  <Link href="/brokerage" className="font-semibold text-brass hover:underline">Open brokerage workspace →</Link>
                  <Link href="/pricing" className="font-semibold text-parchment hover:underline">See membership →</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-line/70 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {REASONS.map((item) => (
                <div key={item.title} className="border-t border-line pt-5">
                  <h2 className="font-display text-xl text-parchment">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-parchment-dim">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="eyebrow">Repeatable brokerage gifting</div>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {[
                { n: "01", title: "Choose the buyer program", body: "Select the membership tier and quantity that fit your closing volume." },
                { n: "02", title: "Confirm the brokerage order", body: "Once the order is confirmed, individual activation codes are issued for use across your closings." },
                { n: "03", title: "Buyer activates", body: "The buyer creates and controls their own Trusted Locksmith account while the brokerage can track unused versus activated codes." },
              ].map((step) => (
                <div key={step.n} className="border-t border-line pt-5">
                  <div className="font-mono text-xs text-brass">{step.n}</div>
                  <h2 className="mt-3 font-display text-xl text-parchment">{step.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-parchment-dim">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABand
          title="Give buyers a cleaner start after closing"
          body="Use clearly priced move-in locksmith services when the property needs new key control, or build a repeatable Digital Access closing program for your brokerage."
          ctaLabel="See locksmith services"
          ctaHref="/services"
          secondaryLabel="Open brokerage workspace"
          secondaryHref="/brokerage"
        />
      </main>
      <Footer />
    </div>
  );
}
