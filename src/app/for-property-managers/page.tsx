import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { CTABand } from "@/components/CTABand";
import { PAGE_VISUALS } from "@/lib/visuals";
import { SITE_URL } from "@/lib/site";

const metaDescription = "Standardize resident lockouts, turnover rekeys, lock changes, access records and independent-locksmith coordination across managed properties.";

export const metadata: Metadata = {
  title: "Property Manager Rekey & Resident Lockout Workflow",
  description: metaDescription,
  alternates: { canonical: "/for-property-managers" },
  openGraph: {
    title: "Trusted Locksmith for property managers",
    description: metaDescription,
    url: "/for-property-managers",
    images: [PAGE_VISUALS.propertyManagers.src],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trusted Locksmith for property managers",
    description: metaDescription,
    images: [PAGE_VISUALS.propertyManagers.src],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/for-property-managers#page`,
  url: `${SITE_URL}/for-property-managers`,
  name: "Trusted Locksmith for property managers",
  description: metaDescription,
  audience: { "@type": "Audience", audienceType: "Property managers and residential portfolio operators" },
  about: [
    { "@type": "Thing", name: "turnover rekeying" },
    { "@type": "Thing", name: "resident lockout workflows" },
    { "@type": "Thing", name: "residential lock changes" },
    { "@type": "Thing", name: "property access service history" },
  ],
  relatedLink: [`${SITE_URL}/services`, `${SITE_URL}/landlords`, `${SITE_URL}/for-real-estate-agents`],
};

const PROBLEMS = [
  { title: "Fewer after-hours access calls", body: "Give resident lockouts and access requests a defined route instead of turning every issue into an on-call staffing problem." },
  { title: "Repeatable turnover rekeys", body: "Use one property-level workflow for rekey requests between move-out and move-in instead of starting from scratch each time." },
  { title: "One access record", body: "Keep keys, lockboxes, service notes and completed work attached to the property rather than scattered across texts and vendor records." },
];

const WORKFLOWS = [
  { title: "Resident requests", body: "Capture the property, access issue and service need through a consistent intake flow." },
  { title: "Turnover rekeys", body: "Request the same clearly scoped rekey service across units with transparent standard pricing." },
  { title: "Locksmith coordination", body: "Route work through participating independent local providers instead of rebuilding the vendor search for every job." },
  { title: "Portfolio history", body: "Keep the access-service record at property and unit level so future requests start with context." },
];

export default function PropertyManagersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <Nav />
      <main className="flex-1">
        <PageHero
          eyebrow="Trusted Locksmith for property managers"
          title="Fewer lockout calls. Cleaner turnover rekeys. One access workflow."
          body="Give property teams a consistent way to handle resident access requests, rekeys, independent locksmith coordination and property-level service history."
          visual={PAGE_VISUALS.propertyManagers}
        />

        <section className="border-b border-line/70 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-6 md:grid-cols-3">
              {PROBLEMS.map((item) => (
                <div key={item.title} className="border-t border-line pt-5">
                  <h2 className="font-display text-xl text-parchment">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-parchment-dim">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-line/70 bg-surface/20 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <div className="eyebrow">One repeatable workflow</div>
              <h2 className="mt-3 font-display text-3xl text-parchment">From resident request to completed property record.</h2>
              <p className="mt-4 leading-7 text-parchment-dim">Your team keeps one intake and approval path while independent local locksmiths perform the field work. Request status and completed service stay attached to the property account.</p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {WORKFLOWS.map((item) => (
                <div key={item.title} className="border-t border-line pt-5">
                  <h3 className="font-display text-xl text-parchment">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-parchment-dim">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-line/70 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="eyebrow">Common property access jobs</div>
            <div className="mt-7 grid gap-5 md:grid-cols-3">
              <Link href="/services" className="group border-t border-line pt-5">
                <h2 className="font-display text-2xl text-parchment group-hover:text-brass">Turnover rekey →</h2>
                <p className="mt-2 text-sm leading-6 text-parchment-dim">Use the published standard rekey scope and first-cylinder pricing as the starting point for unit turnover.</p>
              </Link>
              <Link href="/services" className="group border-t border-line pt-5">
                <h2 className="font-display text-2xl text-parchment group-hover:text-brass">Lock change →</h2>
                <p className="mt-2 text-sm leading-6 text-parchment-dim">Use lock-change labor when hardware needs replacement rather than merely changing which key operates it.</p>
              </Link>
              <Link href="/landlords" className="group border-t border-line pt-5">
                <h2 className="font-display text-2xl text-parchment group-hover:text-brass">Smaller rental portfolio →</h2>
                <p className="mt-2 text-sm leading-6 text-parchment-dim">Landlords can use the same rekey, access-record and locksmith-history logic without a larger portfolio workflow.</p>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto grid max-w-5xl gap-8 px-6 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div>
              <div className="eyebrow">Flexible rollout</div>
              <h2 className="mt-3 font-display text-3xl text-parchment">Start with one building or a wider portfolio.</h2>
            </div>
            <p className="text-base leading-7 text-parchment-dim">Add the properties you want to manage through Trusted Locksmith and use the same service, approval and history workflow across them. The structure stays consistent whether you begin with a few units or manage a larger portfolio.</p>
          </div>
        </section>

        <CTABand
          title="Standardize locksmith work across your properties"
          body="Create a property-manager workspace and bring resident access requests, turnover rekeys and service history into one workflow."
          ctaLabel="Start property-manager setup"
          ctaHref="/property-manager"
          secondaryLabel="See locksmith pricing"
          secondaryHref="/services"
        />
      </main>
      <Footer />
    </div>
  );
}
