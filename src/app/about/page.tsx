import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { SITE, SITE_URL } from "@/lib/site";

const description =
  "Trusted Locksmith is a Boston-first locksmith marketplace operated by PlanetHike OÜ. See how pricing, provider acceptance and independent field service work.";

export const metadata: Metadata = {
  title: "About Trusted Locksmith | Boston Locksmith Marketplace",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Trusted Locksmith",
    description,
    url: "/about",
    type: "website",
  },
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
    brand: {
      "@type": "Brand",
      "@id": `${SITE_URL}/#brand`,
      name: SITE.brandName,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: SITE.launchMarket,
    },
  },
};

const PRINCIPLES = [
  {
    title: "What customers see first",
    body: "The published standard price and included scope appear before the request is sent. Provider travel/service call is included in those published standard totals, and extra work or hardware requires a separate price and approval where applicable.",
  },
  {
    title: "What provider acceptance means",
    body: "A request is not presented as accepted by a specific locksmith until a participating independent provider actually accepts it. Provider identity and ETA appear after that acceptance, and local availability can vary by place and time.",
  },
  {
    title: "What Trusted Locksmith is not",
    body: "Trusted Locksmith is not the field locksmith and does not employ the independent providers performing the work. A verified business-profile claim means the account-to-business connection was reviewed; it is not a blanket statement that every possible licensing, insurance, credential or KYC requirement has been completed.",
  },
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
              A Boston-first locksmith marketplace built around price and process clarity.
            </h1>
            <div className="mt-7 max-w-3xl space-y-4 text-lg leading-8 text-parchment-dim">
              <p>
                Trusted Locksmith is an online marketplace operated by PlanetHike OÜ. It helps customers in Boston and Greater Boston request participating independent local locksmith providers. PlanetHike OÜ does not perform the field locksmith work.
              </p>
              <p>
                The core rule is simple: see the published standard price and included scope before sending the request. A specific provider identity and ETA appear only after a real participating provider accepts.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-line/70 py-14 sm:py-16">
          <div className="mx-auto max-w-[1080px] px-6 sm:px-8 lg:px-10">
            <div className="divide-y divide-line/70 border-y border-line/70">
              {PRINCIPLES.map((item) => (
                <article key={item.title} className="grid gap-3 py-6 md:grid-cols-[.42fr_.58fr] md:gap-10">
                  <h2 className="font-display text-2xl text-parchment">{item.title}</h2>
                  <p className="text-sm leading-6 text-parchment-dim">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
            <div className="eyebrow">Start with the useful facts</div>
            <h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment sm:text-5xl">
              Compare the service and price before you request anyone.
            </h2>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/services" className="inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-7 py-3 text-sm font-semibold text-ink">
                See services & prices
              </Link>
              <Link href="/partner-tech" className="inline-flex min-h-12 items-center justify-center rounded-full border border-sky/30 px-7 py-3 text-sm font-semibold text-parchment transition hover:border-sky/55">
                For locksmith providers
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
