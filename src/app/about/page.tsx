import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { SITE, SITE_URL } from "@/lib/site";

const description =
  "Trusted Locksmith is a locksmith marketplace operated by PlanetHike OÜ. Customers see published standard prices and scope before requesting a participating independent local provider.";

export const metadata: Metadata = {
  title: "About Trusted Locksmith | Locksmith Marketplace",
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
};

const PRINCIPLES = [
  ["Price and scope first", "The published standard price and included scope appear before the request is sent. Provider travel/service call is included in published standard totals, and extra work or hardware requires a separate price and approval where applicable."],
  ["Real provider acceptance", "A request is not presented as accepted by a specific locksmith until a participating independent provider actually accepts it. Provider identity and ETA appear only after that acceptance."],
  ["Independent field providers", "Trusted Locksmith operates the marketplace and request flow. Participating independent local providers perform the field locksmith work."],
  ["Verification means what it says", "A verified business-profile claim confirms an account-to-business connection. It is not a blanket statement that every possible licensing, insurance, credential or KYC requirement has been completed."],
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
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-medium leading-[.98] tracking-[-.035em] text-parchment sm:text-6xl lg:text-[68px]">
              A locksmith marketplace built around price and process clarity.
            </h1>
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

        <section className="border-b border-[#c7d9ec] bg-mist py-14 text-navy-text sm:py-16">
          <div className="mx-auto grid max-w-[1080px] gap-8 px-6 sm:px-8 md:grid-cols-2 lg:px-10">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[.14em] text-[#7d6330]">Primary launch market</div>
              <h2 className="mt-3 font-display text-3xl">Boston & Greater Boston</h2>
              <p className="mt-3 text-sm leading-6 text-[#536e8a]">This remains the primary launch market. Actual request fulfillment still depends on participating provider coverage and acceptance.</p>
              <Link href="/boston-ma" className="mt-5 inline-flex text-sm font-semibold text-navy-text hover:underline">Explore Massachusetts →</Link>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[.14em] text-[#7d6330]">Expansion discovery markets</div>
              <h2 className="mt-3 font-display text-3xl">New York</h2>
              <p className="mt-3 text-sm leading-6 text-[#536e8a]">Localized New York pages support address-specific discovery and requests. A page does not guarantee provider availability at every address or hour.</p>
              <Link href="/new-york-ny" className="mt-5 inline-flex text-sm font-semibold text-navy-text hover:underline">Explore New York →</Link>
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
