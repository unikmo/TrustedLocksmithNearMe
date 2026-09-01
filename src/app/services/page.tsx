import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SERVICE_MENU, formatServicePrice } from "@/lib/service-menu";
import { PAGE_VISUALS } from "@/lib/visuals";
import { SITE_URL } from "@/lib/site";

const metaDescription = "See upfront standard prices for home lockouts, car lockouts, rekeys, lock changes and smart-lock installation before requesting a participating independent local locksmith provider.";

export const metadata: Metadata = {
  title: "Locksmith Services & Upfront Standard Prices | Trusted Locksmith",
  description: metaDescription,
  alternates: { canonical: "/services" },
  openGraph: { title: "Locksmith services & upfront standard prices", description: metaDescription, url: "/services", images: [PAGE_VISUALS.services.src] },
  twitter: { card: "summary_large_image", title: "Locksmith services & upfront standard prices", description: metaDescription, images: [PAGE_VISUALS.services.src] },
};

const serviceListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Trusted Locksmith services and standard prices",
  itemListElement: SERVICE_MENU.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Offer",
      name: `${service.title} — ${service.timing}`,
      description: service.scope,
      price: (service.customerPriceCents / 100).toFixed(2),
      priceCurrency: "USD",
      url: `${SITE_URL}/book/details?service_id=${service.id}`,
    },
  })),
};

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListSchema) }} />
      <Nav />
      <main className="flex-1">
        <PageHero
          eyebrow="Locksmith services & standard prices"
          title="See the standard price before you request a locksmith."
          body="Published standard totals include provider travel/service call. If the actual job falls outside the stated scope, extra work must be priced and approved separately before it starts."
          visual={PAGE_VISUALS.services}
        />

        <section className="border-b border-line/60 py-14 sm:py-16">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10">
            <div className="max-w-2xl">
              <div className="eyebrow">Choose the service</div>
              <h2 className="mt-3 font-display text-4xl tracking-[-.03em] text-parchment sm:text-5xl">One menu. Clear standard totals.</h2>
              <p className="mt-4 text-sm leading-6 text-parchment-dim">Use the location pages for local context. The underlying standard-service scope and pricing rule stay consistent.</p>
            </div>

            <div className="mt-9 divide-y divide-line/70 border-y border-line/70">
              {SERVICE_MENU.map((service) => (
                <article key={service.id} className="grid gap-5 py-6 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-10">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[.14em] text-parchment-dim">{service.timing}</div>
                    <h3 className="mt-2 font-display text-2xl text-parchment">{service.title}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-parchment-dim">{service.scope}</p>
                  </div>
                  <div className="min-w-[170px] sm:text-right">
                    <div className="font-display text-4xl text-brass">{formatServicePrice(service.customerPriceCents)}</div>
                    <div className="mt-1 text-[11px] text-parchment-dim">standard total</div>
                    <Link href={`/book/details?service_id=${service.id}`} className="mt-4 inline-flex min-h-10 items-center rounded-full border border-sky/25 px-5 py-2 text-sm font-semibold text-parchment transition hover:border-sky/50">Choose →</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#c7d9ec] bg-mist py-14 text-navy-text sm:py-16">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-6 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:items-start lg:px-10">
            <div>
              <div className="font-mono text-xs uppercase tracking-[.14em] text-[#7d6330]">The pricing rule</div>
              <h2 className="mt-3 font-display text-4xl tracking-[-.03em]">Know what is standard before the visit.</h2>
            </div>
            <div className="divide-y divide-[#c7d9ec] border-y border-[#c7d9ec]">
              {[
                ["01", "Price before request", "See the published standard total and scope before submitting the request."],
                ["02", "Provider after acceptance", "Provider identity and ETA appear only after a participating provider actually accepts."],
                ["03", "Extras by approval", "Out-of-scope work or hardware is separate only where applicable and must be approved first."],
              ].map(([n, title, body]) => (
                <div key={n} className="grid grid-cols-[42px_1fr] gap-4 py-5">
                  <div className="font-mono text-xs text-[#8c6d31]">{n}</div>
                  <div><h3 className="font-semibold text-navy-text">{title}</h3><p className="mt-1 text-sm leading-6 text-[#536e8a]">{body}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
            <div className="eyebrow">Ready?</div>
            <h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment sm:text-5xl">Choose the service. Then send the request.</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-parchment-dim">No membership required for one-off locksmith service. Availability is address-specific.</p>
            <Link href="/book" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-7 py-3 text-sm font-semibold text-ink">Get my price →</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
