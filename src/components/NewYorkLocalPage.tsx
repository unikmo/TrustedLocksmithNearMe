import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { NY_AREAS, getNyArea, getNyChildren, type NyArea } from "@/lib/new-york-seo";
import { formatServicePrice, getServiceMenuItem } from "@/lib/service-menu";

const FEATURED_SERVICES = [
  {
    id: "home_lockout_day",
    title: "Home lockout",
    note: "Weekday daytime standard entry",
    href: "/book/details?service_id=home_lockout_day",
    priceSuffix: "weekday standard",
  },
  {
    id: "car_lockout_at_property",
    title: "Car lockout",
    note: "Standard vehicle entry at the service property",
    href: "/book/details?service_id=car_lockout_at_property",
    priceSuffix: "standard total",
  },
  {
    id: "standard_rekey",
    title: "Rekey locks",
    note: "First standard cylinder",
    href: "/book/details?service_id=standard_rekey",
    priceSuffix: "standard total",
  },
  {
    id: "standard_lock_change",
    title: "Lock change",
    note: "Labor for one standard residential lock",
    href: "/book/details?service_id=standard_lock_change",
    priceSuffix: "labor · hardware separate",
  },
  {
    id: "smart_lock_install",
    title: "Smart lock installation",
    note: "One compatible customer-supplied smart lock",
    href: "/book/details?service_id=smart_lock_install",
    priceSuffix: "labor · hardware separate",
  },
] as const;

function ProcessStrip() {
  return (
    <section className="border-b border-line/60 bg-surface/38">
      <div className="mx-auto grid max-w-[1180px] gap-5 px-6 py-6 sm:grid-cols-3 sm:px-8 lg:px-10">
        {[
          ["Price first", "See the published standard total and scope before you send the request."],
          ["Address-specific matching", "New York coverage is based on the actual service address and provider service area."],
          ["Real acceptance", "Provider identity and ETA appear only after a participating provider actually accepts."],
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

function MarketLinks({ area }: { area: NyArea }) {
  const children = getNyChildren(area.slug);
  const related = area.nearby
    .map((slug) => getNyArea(slug))
    .filter((item): item is NyArea => Boolean(item));

  const upstateAndCounty = area.slug === "new-york-ny"
    ? NY_AREAS.filter((item) =>
        ["buffalo-ny", "rochester-ny", "albany-ny", "syracuse-ny", "yonkers-ny", "suffolk-county-ny", "nassau-county-ny", "white-plains-ny", "poughkeepsie-ny", "new-rochelle-ny", "schenectady-ny"].includes(item.slug)
      )
    : [];

  if (children.length === 0 && related.length === 0 && upstateAndCounty.length === 0) return null;

  return (
    <section className="border-b border-line/60 py-14 sm:py-16">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10">
        {children.length > 0 && (
          <div>
            <div className="eyebrow">
              {area.kind === "city" ? "NYC boroughs" : `More in ${area.name}`}
            </div>
            <h2 className="mt-3 max-w-3xl font-display text-3xl tracking-[-.025em] text-parchment sm:text-4xl">
              Go closer to the actual service address.
            </h2>
            <div className="mt-7 grid gap-x-8 gap-y-3 border-y border-line/70 py-5 sm:grid-cols-2 lg:grid-cols-3">
              {children.map((child) => (
                <Link key={child.slug} href={`/${child.slug}`} className="group flex items-center justify-between gap-4 py-2 text-sm font-semibold text-parchment">
                  <span>{child.name}</span>
                  <span className="text-brass transition group-hover:translate-x-0.5" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {upstateAndCounty.length > 0 && (
          <div className={children.length > 0 ? "mt-12" : ""}>
            <div className="eyebrow">New York State Wave 1</div>
            <h2 className="mt-3 max-w-3xl font-display text-3xl tracking-[-.025em] text-parchment sm:text-4xl">
              Beyond New York City.
            </h2>
            <div className="mt-7 grid gap-x-8 gap-y-3 border-y border-line/70 py-5 sm:grid-cols-2 lg:grid-cols-3">
              {upstateAndCounty.map((item) => (
                <Link key={item.slug} href={`/${item.slug}`} className="group flex items-center justify-between gap-4 py-2 text-sm font-semibold text-parchment">
                  <span>{item.name}</span>
                  <span className="text-brass transition group-hover:translate-x-0.5" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {children.length === 0 && related.length > 0 && (
          <div>
            <div className="eyebrow">Related New York locations</div>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-y border-line/70 py-5">
              {related.map((item) => (
                <Link key={item.slug} href={`/${item.slug}`} className="text-sm font-semibold text-brass hover:underline">
                  {item.name} →
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function NewYorkLocalPage({ area }: { area: NyArea }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <section className="border-b border-line/60">
          <div className="mx-auto max-w-[1180px] px-6 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-20">
            <div className="font-mono text-[11px] uppercase tracking-[.14em] text-brass">{area.shortLocation} · New York</div>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-medium leading-[.96] tracking-[-.04em] text-parchment sm:text-6xl lg:text-[68px]">
              Need a locksmith in {area.name}?
              <span className="block italic text-brass">See the price first.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-parchment-dim">
              {area.localContext}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className="inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-7 py-3 text-[15px] font-semibold text-ink transition hover:brightness-110">
                Get my price
              </Link>
              <Link href="/services" className="inline-flex min-h-12 items-center justify-center rounded-full border border-sky/25 px-7 py-3 text-[15px] font-semibold text-parchment transition hover:border-sky/50">
                See all prices
              </Link>
            </div>
            <p className="mt-5 max-w-2xl text-xs leading-5 text-parchment-dim">
              New York service availability depends on participating provider coverage and actual acceptance. This page does not imply that a provider is currently available at every address or hour.
            </p>
          </div>
        </section>

        <ProcessStrip />

        <section className="border-b border-[#c7d9ec] bg-mist py-14 text-navy-text sm:py-16">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10">
            <div className="max-w-2xl">
              <div className="font-mono text-xs uppercase tracking-[.14em] text-[#7d6330]">Standard locksmith services</div>
              <h2 className="mt-3 font-display text-4xl tracking-[-.03em] sm:text-5xl">
                Choose the job before the provider.
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#536e8a]">
                The published standard total includes provider travel/service call for the stated scope. Any hardware or work outside that scope must be priced and approved separately.
              </p>
            </div>

            <div className="mt-9 divide-y divide-[#c7d9ec] border-y border-[#c7d9ec]">
              {FEATURED_SERVICES.map((service) => {
                const item = getServiceMenuItem(service.id);
                if (!item) return null;
                return (
                  <Link key={service.id} href={service.href} className="group grid gap-3 py-5 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div>
                      <div className="font-display text-2xl text-navy-text">{service.title}</div>
                      <div className="mt-1 text-sm text-[#536e8a]">{service.note}</div>
                    </div>
                    <div className="flex items-center justify-between gap-5 sm:justify-end">
                      <div className="text-right">
                        <div className="font-display text-3xl text-[#8c6d31]">{formatServicePrice(item.customerPriceCents)}</div>
                        <div className="mt-1 text-[11px] text-[#536e8a]">{service.priceSuffix}</div>
                      </div>
                      <span className="text-xl text-navy-text transition group-hover:translate-x-0.5" aria-hidden="true">→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-line/60 py-16 sm:py-20">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-6 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:items-start lg:px-10">
            <div className="max-w-md">
              <div className="eyebrow">Local access context</div>
              <h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment">
                What changes in {area.name}.
              </h2>
            </div>
            <div>
              <div className="divide-y divide-line/70 border-y border-line/70">
                {area.accessNotes.map((note, index) => (
                  <div key={note} className="grid grid-cols-[42px_1fr] gap-4 py-5">
                    <div className="font-mono text-xs text-brass">0{index + 1}</div>
                    <p className="text-sm leading-6 text-parchment-dim">{note}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <div className="font-mono text-[10px] uppercase tracking-[.14em] text-parchment-dim">
                  Local areas and corridors
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {area.areas.map((item) => (
                    <span key={item} className="rounded-full border border-line/80 px-3 py-1.5 text-xs text-parchment-dim">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <MarketLinks area={area} />

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
            <div className="eyebrow">{area.shortLocation}</div>
            <h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment sm:text-5xl">
              Start with the service and standard price.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-parchment-dim">
              No membership required for a one-off request. A specific provider is shown only after that provider actually accepts.
            </p>
            <Link href="/book" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-7 py-3 text-sm font-semibold text-ink">
              Get my price →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
