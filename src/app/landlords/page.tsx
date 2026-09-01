import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { CTABand } from "@/components/CTABand";
import { PAGE_VISUALS } from "@/lib/visuals";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rental Rekey & Locksmith Workflow for Landlords",
  description: "Coordinate rental-property lockouts, turnover rekeys, trusted access and locksmith service history through one focused platform.",
  alternates: { canonical: "/landlords" },
  openGraph: { images: [PAGE_VISUALS.landlords.src] },
  twitter: { card: "summary_large_image", images: [PAGE_VISUALS.landlords.src] },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/landlords#page`,
  url: `${SITE_URL}/landlords`,
  name: "Trusted Locksmith for landlords",
  audience: { "@type": "Audience", audienceType: "Landlords and small rental-property operators" },
  about: [
    { "@type": "Thing", name: "tenant turnover rekeying" },
    { "@type": "Thing", name: "rental property lockouts" },
    { "@type": "Thing", name: "rental property access records" },
  ],
  relatedLink: [`${SITE_URL}/services`, `${SITE_URL}/for-property-managers`, `${SITE_URL}/for-real-estate-agents`],
};

const BENEFITS = [
  { title: "Turnover rekeys", body: "Create a repeatable rekey workflow when a tenant moves out instead of sourcing a locksmith from scratch each time." },
  { title: "Access records", body: "Keep lock, code and access notes associated with the property rather than scattered across messages and spreadsheets." },
  { title: "Resident requests", body: "Give access-related service requests a defined route instead of turning every lockout into an ad-hoc landlord call." },
  { title: "Service history", body: "Retain a simple record of what was requested and changed at each property." },
];

export default function LandlordsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <Nav />
      <main className="flex-1">
        <PageHero
          eyebrow="Trusted Locksmith for landlords"
          title="Access work should not restart from zero at every turnover"
          body="Give rental properties a consistent workflow for rekeys, lockouts, trusted access and the locksmith service record behind them."
          visual={PAGE_VISUALS.landlords}
        />
        <section className="border-b border-line/70 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((item) => (
                <div key={item.title} className="rounded-2xl border border-line bg-surface p-6">
                  <h2 className="font-display text-xl text-parchment">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-parchment-dim">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-line/70 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="eyebrow">Turnover starts with key control</div>
            <div className="mt-7 grid gap-6 md:grid-cols-2">
              <Link href="/services" className="group border-t border-line pt-5">
                <h2 className="font-display text-2xl text-parchment group-hover:text-brass">See rekey and lock-change pricing →</h2>
                <p className="mt-3 text-sm leading-6 text-parchment-dim">Use a rekey when compatible existing hardware can stay in place; use a lock change when the hardware itself needs replacement.</p>
              </Link>
              <Link href="/for-property-managers" className="group border-t border-line pt-5">
                <h2 className="font-display text-2xl text-parchment group-hover:text-brass">Managing a wider portfolio? →</h2>
                <p className="mt-3 text-sm leading-6 text-parchment-dim">The property-manager workflow extends the same turnover and service-history logic across multiple buildings and units.</p>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="rounded-3xl border border-brass/25 bg-brass/[0.06] p-8">
              <div className="eyebrow">Focused on locksmith access work</div>
              <h2 className="mt-3 font-display text-3xl text-parchment">Trusted Locksmith stays deliberately narrow</h2>
              <p className="mt-4 leading-7 text-parchment-dim">This is not a lease, rent-collection or maintenance-suite product. The platform stays focused on lockouts, rekeys, access records, trusted contacts and locksmith service history.</p>
            </div>
          </div>
        </section>
        <CTABand
          title="Start with one rental property"
          body="Use the same locksmith workflow now, then expand across properties when the operating pattern is proven."
          ctaLabel="See locksmith services"
          ctaHref="/services"
          secondaryLabel="Property manager solution"
          secondaryHref="/for-property-managers"
        />
      </main>
      <Footer />
    </div>
  );
}
