import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { SITE, SITE_URL } from "@/lib/site";

const description =
  "Trusted Locksmith is a locksmith marketplace operated by PlanetHike OÜ. Customers see published standard prices and scope before requesting a participating independent local provider.";

export const metadata: Metadata = {
  title: "About | Locksmith Marketplace",
  description,
  alternates: { canonical: "/about" },
  openGraph: { title: "About Trusted Locksmith", description, url: "/about", type: "website" },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about#page`,
  url: `${SITE_URL}/about`,
  name: "About Trusted Locksmith",
  description: SITE.positioning,
  mainEntity: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE.operatorName,
    url: SITE_URL,
    brand: { "@type": "Brand", "@id": `${SITE_URL}/#brand`, name: SITE.brandName },
    areaServed: { "@type": "AdministrativeArea", name: SITE.launchMarket },
  },
  relatedLink: [
    `${SITE_URL}/for-property-managers`,
    `${SITE_URL}/landlords`,
    `${SITE_URL}/for-real-estate-agents`,
    `${SITE_URL}/second-homes`,
    `${SITE_URL}/new-york-ny`,
    `${SITE_URL}/jersey-city-nj`,
    `${SITE_URL}/philadelphia-pa`,
    `${SITE_URL}/stamford-ct`,
    `${SITE_URL}/wilmington-de`,
  ],
};

const PRINCIPLES = [
  ["Price and scope first", "The published standard price and included scope appear before the request is sent. Provider travel/service call is included in published standard totals, and extra work or hardware requires a separate price and approval where applicable."],
  ["Real provider acceptance", "A request is not presented as accepted by a specific locksmith until a participating independent provider actually accepts it. Provider identity and ETA appear only after that acceptance."],
  ["Independent field providers", "Trusted Locksmith operates the marketplace and request flow. Participating independent local providers perform the field locksmith work."],
  ["Verification means what it says", "A verified business-profile claim confirms an account-to-business connection. It is not a blanket statement that every possible licensing, insurance, credential or KYC requirement has been completed."],
] as const;

const USE_CASES = [
  ["Property managers", "Resident lockouts, turnover rekeys, lock changes and property-level service history.", "/for-property-managers"],
  ["Landlords", "Tenant-turnover rekeys, access records and focused locksmith coordination for rental properties.", "/landlords"],
  ["Real estate", "Move-in rekeys, lock changes, smart-lock options and buyer-controlled closing access.", "/for-real-estate-agents"],
  ["Second homes", "Rekeys, lock changes, smart access and local help when the owner is not on site.", "/second-homes"],
] as const;

const EXPANSION_MARKETS = [
  ["New York", "/new-york-ny"],
  ["New Jersey", "/jersey-city-nj"],
  ["Philadelphia", "/philadelphia-pa"],
  ["Connecticut", "/stamford-ct"],
  ["Delaware", "/wilmington-de"],
] as const;

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <Nav />
      <main className="flex-1">
        <section className="border-b border-line/70 py-16 sm:py-20">
          <div className="mx-auto max-w-[1080px] px-6 sm:px-8 lg:px-10">
            <div className="eyebrow">About Trusted Locksmith</div>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-medium leading-[.98] tracking-[-.035em] text-parchment sm:text-6xl lg:text-[68px]">A locksmith marketplace built around price and process clarity.</h1>
            <div className="mt-7 max-w-3xl space-y-4 text-lg leading-8 text-parchment-dim">
              <p>Trusted Locksmith is an online marketplace operated by PlanetHike OÜ. PlanetHike OÜ does not perform the field locksmith work.</p>
              <p>The core rule is simple: see the published standard price and included scope before sending the request. A specific provider identity and ETA appear only after a participating provider actually accepts.</p>
            </div>
          </div>
        </section>

        <section className="border-b border-line/70 py-14 sm:py-16">
          <div className="mx-auto max-w-[1080px] px-6 sm:px-8 lg:px-10">
            <div className="divide-y divide-line/70 border-y border-line/70">
              {PRINCIPLES.map(([title, body]) => (
                <article key={title} className="grid gap-3 py-6 md:grid-cols-[.42fr_.58fr] md:gap-10">
                  <h2 className="font-display text-2xl text-parchment">{title}</h2>
                  <p className="text-sm leading-6 text-parchment-dim">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-line/70 py-14 sm:py-16">
          <div className="mx-auto max-w-[1080px] px-6 sm:px-8 lg:px-10">
            <div className="eyebrow">Property workflows</div>
            <h2 className="mt-3 max-w-3xl font-display text-4xl tracking-[-.03em] text-parchment">The same locksmith services can support different property relationships.</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {USE_CASES.map(([title, body, href]) => (
                <Link key={href} href={href} className="group border-t border-line pt-5">
                  <h3 className="font-display text-2xl text-parchment transition group-hover:text-brass">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-parchment-dim">{body}</p>
                  <span className="mt-4 inline-flex text-sm font-semibold text-brass">Explore →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#c7d9ec] bg-mist py-14 text-navy-text sm:py-16">
          <div className="mx-auto grid max-w-[1080px] gap-8 px-6 sm:px-8 md:grid-cols-2 lg:px-10">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[.14em] text-[#7d6330]">Primary launch market</div>
              <h2 className="mt-3 font-display text-3xl">Boston & Greater Boston</h2>
              <p className="mt-3 text-sm leading-6 text-[#536e8a]">This remains the primary launch market. Actual request fulfillment still depends on participating provider coverage and acceptance.</p>
              <Link href="/boston-ma" className="mt-5 inline-flex text-sm font-semibold text-navy-text hover:underline">Explore Massachusetts →</Link>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[.14em] text-[#7d6330]">Expansion discovery corridor</div>
              <h2 className="mt-3 font-display text-3xl">The Northeast corridor</h2>
              <p className="mt-3 text-sm leading-6 text-[#536e8a]">Localized pages now cover New York, New Jersey, Philadelphia, Connecticut and Delaware. They support address-specific discovery; they do not imply blanket provider availability or credential status.</p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-navy-text">
                {EXPANSION_MARKETS.map(([label, href]) => <Link key={href} href={href} className="hover:underline">{label} →</Link>)}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
            <div className="eyebrow">Start with the useful facts</div>
            <h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment sm:text-5xl">Compare the service and price before you request anyone.</h2>
            <Link href="/services" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-7 py-3 text-sm font-semibold text-ink">See services & prices</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
