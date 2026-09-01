import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { StrategicServicePaths } from "@/components/StrategicServicePaths";
import {
  MA_CITIES,
  MA_SERVICE_CONTENT,
  type MaCity,
  type MaServiceContent,
  type MaServiceSlug,
} from "@/lib/massachusetts-seo";
import { formatServicePrice, getServiceMenuItem } from "@/lib/service-menu";

const SERVICE_CARDS: Array<{
  slug: MaServiceSlug;
  title: string;
  priceId: string;
  note: string;
}> = [
  { slug: "emergency-locksmith", title: "Emergency locksmith", priceId: "home_lockout_day", note: "Residential access · timing-based pricing" },
  { slug: "house-lockout", title: "House lockout", priceId: "home_lockout_day", note: "Standard residential entry" },
  { slug: "car-lockout", title: "Car lockout", priceId: "car_lockout_at_property", note: "Standard vehicle entry at the service property" },
  { slug: "rekey-locks", title: "Rekey locks", priceId: "standard_rekey", note: "First standard cylinder" },
  { slug: "lock-change", title: "Lock change", priceId: "standard_lock_change", note: "Labor for one standard residential lock" },
  { slug: "smart-lock-installation", title: "Smart lock installation", priceId: "smart_lock_install", note: "One compatible customer-supplied smart lock" },
];

const BOOKING_HREF: Record<MaServiceSlug, string> = {
  "emergency-locksmith": "/book",
  "house-lockout": "/book/details?service_id=home_lockout_day",
  "car-lockout": "/book/details?service_id=car_lockout_at_property",
  "rekey-locks": "/book/details?service_id=standard_rekey",
  "lock-change": "/book/details?service_id=standard_lock_change",
  "smart-lock-installation": "/book/details?service_id=smart_lock_install",
};

function cityServiceHref(city: MaCity, slug: MaServiceSlug) {
  return city.services.includes(slug) ? `/${city.slug}/${slug}` : BOOKING_HREF[slug];
}

function ProcessStrip() {
  return (
    <section className="border-b border-line/60 bg-surface/38">
      <div className="mx-auto grid max-w-[1180px] gap-5 px-6 py-6 sm:grid-cols-3 sm:px-8 lg:px-10">
        {[
          ["Price first", "See the standard total before you request."],
          ["Real acceptance", "Provider identity and ETA appear only after acceptance."],
          ["You approve extras", "Additional work needs a separate price and approval."],
        ].map(([title, body]) => (
          <div key={title}>
            <div className="text-sm font-semibold text-parchment">{title}</div>
            <div className="mt-1 text-sm leading-6 text-parchment-dim">{body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function NearbyCities({ city }: { city: MaCity }) {
  const nearby = city.nearby
    .map((slug) => MA_CITIES.find((item) => item.slug === slug))
    .filter((item): item is MaCity => Boolean(item));

  if (nearby.length === 0) return null;

  return (
    <div className="border-t border-line/70 pt-6">
      <div className="font-mono text-[10px] uppercase tracking-[.14em] text-parchment-dim">Nearby Massachusetts locations</div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {nearby.map((item) => (
          <Link key={item.slug} href={`/${item.slug}`} className="font-semibold text-brass hover:underline">
            {item.name} →
          </Link>
        ))}
      </div>
    </div>
  );
}

function PriceRows({ service }: { service: MaServiceContent }) {
  const items = service.serviceIds
    .map((id) => getServiceMenuItem(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div className="divide-y divide-line/70 border-y border-line/70">
      {items.map((item) => (
        <div key={item.id} className="grid gap-3 py-5 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <div className="font-display text-2xl text-parchment">{item.title}</div>
            <div className="mt-1 text-sm text-parchment-dim">{item.timing}</div>
          </div>
          <div className="sm:text-right">
            <div className="font-display text-4xl text-brass">{formatServicePrice(item.customerPriceCents)}</div>
            <div className="mt-1 text-[11px] text-parchment-dim">standard total · travel/service call included</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function LocalCityPage({ city }: { city: MaCity }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <section className="border-b border-line/60">
          <div className="mx-auto max-w-[1180px] px-6 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-20">
            <div className="font-mono text-[11px] uppercase tracking-[.14em] text-brass">{city.name}, Massachusetts</div>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-medium leading-[.96] tracking-[-.04em] text-parchment sm:text-6xl lg:text-[68px]">
              Need a locksmith in {city.name}?
              <span className="block italic text-brass">See the price first.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-parchment-dim">
              Choose the service, review the published standard total and scope, then send one clear request to participating independent local providers.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className="inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-7 py-3 text-[15px] font-semibold text-ink transition hover:brightness-110">Get my price</Link>
              <Link href="/services" className="inline-flex min-h-12 items-center justify-center rounded-full border border-sky/25 px-7 py-3 text-[15px] font-semibold text-parchment transition hover:border-sky/50">See all prices</Link>
            </div>
          </div>
        </section>

        <ProcessStrip />

        <section className="border-b border-[#c7d9ec] bg-mist py-14 text-navy-text sm:py-16">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10">
            <div className="max-w-2xl">
              <div className="font-mono text-xs uppercase tracking-[.14em] text-[#7d6330]">Services in {city.name}</div>
              <h2 className="mt-3 font-display text-4xl tracking-[-.03em] sm:text-5xl">Start with the job you actually need.</h2>
            </div>

            <div className="mt-9 divide-y divide-[#c7d9ec] border-y border-[#c7d9ec]">
              {SERVICE_CARDS.map((card) => {
                const item = getServiceMenuItem(card.priceId);
                return (
                  <Link key={card.slug} href={cityServiceHref(city, card.slug)} className="group grid gap-3 py-5 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div>
                      <div className="font-display text-2xl text-navy-text">{card.title}</div>
                      <div className="mt-1 text-sm text-[#536e8a]">{card.note}</div>
                    </div>
                    <div className="flex items-center justify-between gap-5 sm:justify-end">
                      {item ? (
                        <div className="text-right">
                          <div className="font-display text-3xl text-[#8c6d31]">{formatServicePrice(item.customerPriceCents)}</div>
                          <div className="mt-1 text-[11px] text-[#536e8a]">{card.slug === "emergency-locksmith" || card.slug === "house-lockout" ? "from · weekday standard" : "standard total"}</div>
                        </div>
                      ) : null}
                      <span className="text-xl text-navy-text transition group-hover:translate-x-0.5" aria-hidden="true">→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
            <p className="mt-4 text-xs leading-5 text-[#536e8a]">Provider travel/service call is included in each published standard total. Hardware and work outside the stated standard scope are separate only where applicable and require approval first.</p>
          </div>
        </section>

        <section className="border-b border-line/60 py-16 sm:py-20">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-6 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start lg:px-10">
            <div className="max-w-md">
              <div className="eyebrow">Local context</div>
              <h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment">Built around a real local request.</h2>
            </div>
            <div>
              <p className="text-base leading-7 text-parchment-dim">{city.localContext}</p>
              <p className="mt-4 text-sm leading-6 text-parchment-dim">
                Service coverage depends on participating provider service areas and actual acceptance. Trusted Locksmith does not present a request as accepted until a real provider accepts it.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {city.areas.map((area) => (
                  <span key={area} className="rounded-full border border-line/80 px-3 py-1.5 text-xs text-parchment-dim">{area}</span>
                ))}
              </div>
              <div className="mt-8"><NearbyCities city={city} /></div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
            <div className="eyebrow">Need help in {city.name}?</div>
            <h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment sm:text-5xl">Start with the service and the standard price.</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-parchment-dim">No membership required for a one-off request.</p>
            <Link href="/book" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-7 py-3 text-sm font-semibold text-ink">Get my price →</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export function LocalServicePage({ city, service }: { city: MaCity; service: MaServiceContent }) {
  const localNote = city.serviceNotes[service.slug] ?? city.localContext;
  const otherServices = city.services.filter((slug) => slug !== service.slug);
  const bookingHref = BOOKING_HREF[service.slug];

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <section className="border-b border-line/60">
          <div className="mx-auto max-w-[1180px] px-6 py-12 sm:px-8 sm:py-16 lg:px-10">
            <div className="flex flex-wrap items-center gap-2 text-xs text-parchment-dim">
              <Link href="/" className="hover:text-parchment">Home</Link><span>/</span>
              <Link href={`/${city.slug}`} className="hover:text-parchment">{city.name}, MA</Link><span>/</span>
              <span className="text-brass">{service.shortTitle}</span>
            </div>
            <div className="mt-7 font-mono text-[11px] uppercase tracking-[.14em] text-brass">{service.eyebrow} · {city.name}, MA</div>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-medium leading-[.96] tracking-[-.04em] text-parchment sm:text-6xl lg:text-[66px]">{service.title(city.name)}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-parchment-dim">{service.description(city.name)}</p>
            <Link href={bookingHref} className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-7 py-3 text-[15px] font-semibold text-ink transition hover:brightness-110">Request this service</Link>
          </div>
        </section>

        <ProcessStrip />

        <section className="border-b border-line/60 py-14 sm:py-16">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-6 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:items-start lg:px-10">
            <div className="max-w-md">
              <div className="eyebrow">Published standard pricing</div>
              <h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment">Know the total before the request.</h2>
              <p className="mt-4 text-sm leading-6 text-parchment-dim">The standard total includes provider travel/service call for the stated scope.</p>
            </div>
            <PriceRows service={service} />
          </div>
        </section>

        <section className="border-b border-[#c7d9ec] bg-mist py-14 text-navy-text sm:py-16">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:px-10">
            <div>
              <div className="font-mono text-xs uppercase tracking-[.14em] text-[#7d6330]">Standard scope</div>
              <h2 className="mt-3 font-display text-3xl tracking-[-.02em]">What the published service covers.</h2>
              <ul className="mt-6 space-y-4">
                {service.scopeBullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-6 text-[#536e8a]"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8c6d31]" />{bullet}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-[.14em] text-[#7d6330]">Local service context</div>
              <h2 className="mt-3 font-display text-3xl tracking-[-.02em]">{service.shortTitle} in {city.name}.</h2>
              <p className="mt-5 text-sm leading-6 text-[#536e8a]">{localNote}</p>
              <p className="mt-4 text-sm leading-6 text-[#536e8a]">{service.intent}</p>
            </div>
          </div>
        </section>

        <section className="border-b border-line/60 py-14 sm:py-16">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-6 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:px-10">
            <div>
              <div className="eyebrow">Request flow</div>
              <h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment">Simple and explicit.</h2>
            </div>
            <div className="divide-y divide-line/70 border-y border-line/70">
              {[
                ["01", "Choose the service", "Start with the published standard scope and price."],
                ["02", "Send the location", `Provide the ${city.name} service location and request details needed for routing.`],
                ["03", "A provider accepts", "A participating independent provider decides whether to accept the request."],
                ["04", "See real provider details", "Provider identity and ETA are shown only after acceptance."],
              ].map(([n, title, body]) => (
                <div key={n} className="grid grid-cols-[42px_1fr] gap-4 py-5">
                  <div className="font-mono text-xs text-brass">{n}</div>
                  <div><h3 className="font-semibold text-parchment">{title}</h3><p className="mt-1 text-sm leading-6 text-parchment-dim">{body}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-line/60 bg-surface/35 py-14 sm:py-16">
          <div className="mx-auto max-w-3xl px-6 sm:px-8">
            <div className="eyebrow">Questions</div>
            <h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment">What to know before you request.</h2>
            <div className="mt-7 divide-y divide-line/70 border-y border-line/70">
              {service.faq.map((item) => (
                <div key={item.q} className="py-5"><h3 className="font-semibold text-parchment">{item.q}</h3><p className="mt-2 text-sm leading-6 text-parchment-dim">{item.a}</p></div>
              ))}
            </div>
          </div>
        </section>

        <StrategicServicePaths serviceSlug={service.slug} locationName={city.name} />

        <section className="py-14 sm:py-16">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <div className="eyebrow">More in {city.name}</div>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm">
                  <Link href={`/${city.slug}`} className="font-semibold text-brass hover:underline">All {city.name} services →</Link>
                  {otherServices.slice(0, 4).map((slug) => (
                    <Link key={slug} href={`/${city.slug}/${slug}`} className="font-semibold text-brass hover:underline">{MA_SERVICE_CONTENT[slug].shortTitle} →</Link>
                  ))}
                </div>
              </div>
              <NearbyCities city={city} />
            </div>
            <div className="mt-10 rounded-[28px] border border-brass/25 bg-brass/[.07] px-6 py-7 sm:px-8">
              <div className="font-display text-3xl text-parchment">Ready to request {service.shortTitle.toLowerCase()} in {city.name}?</div>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-parchment-dim">Review the standard price and scope first. A request is not presented as accepted until a real provider accepts it.</p>
              <Link href={bookingHref} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-brass px-6 py-2.5 text-sm font-semibold text-ink">Request this service →</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
