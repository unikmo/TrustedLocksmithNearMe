import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SERVICE_MENU, formatServicePrice } from "@/lib/service-menu";
import { PAGE_VISUALS } from "@/lib/visuals";

const metaDescription = "See upfront standard prices for home lockouts, rekeys, lock changes and smart-lock installation before you request an independent local locksmith through Trusted Locksmith.";

export const metadata: Metadata = {
  title: "Locksmith Prices | Lockout, Rekey & Lock Change",
  description: metaDescription,
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Locksmith services & upfront standard prices",
    description: metaDescription,
    url: "/services",
    images: [PAGE_VISUALS.services.src],
  },
  twitter: {
    card: "summary_large_image",
    title: "Locksmith services & upfront standard prices",
    description: metaDescription,
    images: [PAGE_VISUALS.services.src],
  },
};

const urgentServices = SERVICE_MENU.filter((service) => service.jobType === "lockout");
const scheduledServices = SERVICE_MENU.filter((service) => service.jobType !== "lockout");

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <PageHero
          eyebrow="Locksmith services & prices"
          title="See the standard price before you request a locksmith."
          body="Every published standard total includes provider travel/service call. If the actual job needs work outside the stated scope, that extra work must be priced and approved separately."
          visual={PAGE_VISUALS.services}
        />

        <section className="border-b border-line/70 py-14 sm:py-18">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
            <ServiceGroup
              eyebrow="Urgent access"
              title="Locked out now"
              body="Choose the timing that matches the request. Availability varies by location and time."
              services={urgentServices}
            />

            <div className="my-14 border-t border-line/70 sm:my-16" />

            <ServiceGroup
              eyebrow="Scheduled work"
              title="Rekeys, lock changes & smart locks"
              body="Use the published standard scope to compare the service before a provider is involved."
              services={scheduledServices}
            />
          </div>
        </section>

        <section className="border-b border-[#c7d9ec] bg-mist py-14 text-navy-text sm:py-16">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-6 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:items-start lg:px-10">
            <div>
              <div className="font-mono text-xs uppercase tracking-[.14em] text-[#7d6330]">What happens after you choose</div>
              <h2 className="mt-3 font-display text-3xl text-navy-text sm:text-4xl">The request stays clear from start to finish.</h2>
            </div>
            <div className="divide-y divide-[#c7d9ec] border-y border-[#c7d9ec]">
              {[
                ["1", "Review the standard total", "See the price and included scope before submitting the request."],
                ["2", "A real provider accepts", "Provider identity and ETA appear only after a participating independent provider accepts."],
                ["3", "Approve anything extra", "Out-of-scope work requires a separate price and your approval before it begins."],
              ].map(([n, title, body]) => (
                <div key={n} className="grid grid-cols-[34px_1fr] gap-4 py-5">
                  <div className="font-mono text-xs text-[#8c6d31]">0{n}</div>
                  <div>
                    <h3 className="font-semibold text-navy-text">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#536e8a]">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="eyebrow">Optional prevention layer</div>
            <h2 className="mt-3 font-display text-3xl font-medium text-parchment">
              Want your backup access organized before the next problem?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-parchment-dim">
              Digital Access keeps codes, spare-key details and trusted people together. One-off locksmith service remains available without membership.
            </p>
            <Link href="/digital-access" className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full border border-sky/25 px-6 py-2.5 text-sm font-semibold text-parchment transition hover:border-sky/50">
              Explore Digital Access
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ServiceGroup({
  eyebrow,
  title,
  body,
  services,
}: {
  eyebrow: string;
  title: string;
  body: string;
  services: typeof SERVICE_MENU;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[.58fr_1.42fr] lg:gap-12">
      <div className="max-w-sm">
        <div className="eyebrow">{eyebrow}</div>
        <h2 className="mt-3 font-display text-3xl text-parchment">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-parchment-dim">{body}</p>
      </div>
      <div className="border-y border-line/70">
        {services.map((service) => (
          <article key={service.id} className="grid gap-4 border-b border-line/70 py-6 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-8">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[.14em] text-parchment-dim">{service.timing}</div>
              <h3 className="mt-2 font-display text-2xl text-parchment">{service.title}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-parchment-dim">{service.scope}</p>
            </div>
            <div className="min-w-[150px] sm:text-right">
              <div className="font-display text-4xl text-brass">{formatServicePrice(service.customerPriceCents)}</div>
              <div className="mt-1 text-[11px] leading-4 text-verdigris">standard total · travel included</div>
              <Link href={`/book/details?service_id=${service.id}`} className="mt-4 inline-flex text-sm font-semibold text-parchment hover:text-brass">Choose service →</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
