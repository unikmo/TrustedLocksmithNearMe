import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { NORTHEAST_AREAS, getNortheastArea, getNortheastChildren, type NortheastArea } from "@/lib/northeast-seo";
import { formatServicePrice, getServiceMenuItem } from "@/lib/service-menu";

const FEATURED_SERVICES = [
  { id: "home_lockout_day", title: "Home lockout", note: "Residential entry · weekday standard", href: "/book/details?service_id=home_lockout_day", priceSuffix: "weekday standard" },
  { id: "car_lockout_at_property", title: "Car lockout", note: "Standard vehicle entry at the service property", href: "/book/details?service_id=car_lockout_at_property", priceSuffix: "standard total" },
  { id: "standard_rekey", title: "Rekey locks", note: "First standard cylinder", href: "/book/details?service_id=standard_rekey", priceSuffix: "first standard cylinder" },
  { id: "standard_lock_change", title: "Lock change", note: "Labor for one standard residential lock", href: "/book/details?service_id=standard_lock_change", priceSuffix: "labor · hardware separate" },
  { id: "smart_lock_install", title: "Smart lock installation", note: "Compatible customer-supplied smart lock", href: "/book/details?service_id=smart_lock_install", priceSuffix: "labor · customer-supplied lock" },
] as const;

const GROUP_LABELS = {
  "new-jersey": "New Jersey locations",
  philadelphia: "Philadelphia locations",
  connecticut: "Connecticut locations",
  delaware: "Delaware locations",
} as const;

type MarketLink = { slug: string; name: string };

const CROSS_MARKET_LINKS: Partial<Record<string, MarketLink[]>> = {
  "jersey-city-nj": [{ slug: "new-york-ny", name: "New York City" }],
  "hoboken-nj": [{ slug: "new-york-ny", name: "New York City" }],
  "north-bergen-nj": [{ slug: "new-york-ny", name: "New York City" }],
  "bayonne-nj": [{ slug: "new-york-ny", name: "New York City" }],
  "stamford-ct": [{ slug: "new-york-ny", name: "New York City" }],
  "greenwich-ct": [{ slug: "new-york-ny", name: "New York City" }],
};

function NearbyMarkets({ area }: { area: NortheastArea }) {
  const children: MarketLink[] = getNortheastChildren(area.slug).map((item) => ({ slug: item.slug, name: item.name }));
  const nearby: MarketLink[] = area.nearby
    .map(getNortheastArea)
    .filter((item): item is NortheastArea => Boolean(item))
    .map((item) => ({ slug: item.slug, name: item.name }));
  const crossMarket = CROSS_MARKET_LINKS[area.slug] ?? [];
  const sameGroup: MarketLink[] = NORTHEAST_AREAS
    .filter((item) => item.group === area.group && item.slug !== area.slug)
    .slice(0, 8)
    .map((item) => ({ slug: item.slug, name: item.name }));
  const baseLinks = children.length > 0 ? children : nearby.length > 0 ? nearby : sameGroup;
  const links = [...baseLinks, ...crossMarket].filter((item, index, all) => all.findIndex((candidate) => candidate.slug === item.slug) === index);
  if (links.length === 0) return null;

  return (
    <section className="border-b border-line/60 py-14 sm:py-16">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10">
        <div className="eyebrow">{children.length > 0 ? `Go deeper in ${area.name}` : GROUP_LABELS[area.group]}</div>
        <h2 className="mt-3 max-w-3xl font-display text-3xl tracking-[-.025em] text-parchment sm:text-4xl">Match the request to the actual local market.</h2>
        <div className="mt-7 grid gap-x-8 gap-y-3 border-y border-line/70 py-5 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((item) => (
            <Link key={item.slug} href={`/${item.slug}`} className="group flex items-center justify-between gap-4 py-2 text-sm font-semibold text-parchment">
              <span>{item.name}</span><span className="text-brass transition group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function PropertyWorkflows({ area }: { area: NortheastArea }) {
  const links = [
    area.propertyTags.includes("property-management") && { title: "Property managers", body: `Coordinate turnover rekeys, resident lockouts and service history across ${area.name} properties.`, href: "/for-property-managers" },
    area.propertyTags.includes("real-estate") && { title: "Real estate & move-in", body: `Use rekey, lock-change and smart-lock services as part of a clearer move-in security handoff in ${area.name}.`, href: "/for-real-estate-agents" },
    area.propertyTags.includes("second-homes") && { title: "Second homes", body: "Keep trusted access and local locksmith options organized when the owner is not at the property.", href: "/second-homes" },
    { title: "Landlords", body: "Create a repeatable access workflow for tenant changes, lost keys and rekeys instead of starting from zero each time.", href: "/landlords" },
  ].filter(Boolean) as Array<{ title: string; body: string; href: string }>;

  return (
    <section className="border-b border-line/60 bg-surface/35 py-14 sm:py-16">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <div className="eyebrow">Property access in {area.name}</div>
          <h2 className="mt-3 font-display text-4xl tracking-[-.03em] text-parchment">Not every locksmith request starts with an emergency.</h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="group border-t border-line pt-5">
              <h3 className="font-display text-2xl text-parchment">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-parchment-dim">{item.body}</p>
              <span className="mt-4 inline-flex text-sm font-semibold text-brass group-hover:underline">Explore →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NortheastLocalPage({ area }: { area: NortheastArea }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <section className="border-b border-line/60">
          <div className="mx-auto max-w-[1180px] px-6 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-20">
            <div className="font-mono text-[11px] uppercase tracking-[.14em] text-brass">{area.shortLocation}</div>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-medium leading-[.96] tracking-[-.04em] text-parchment sm:text-6xl lg:text-[68px]">
              Need a locksmith in {area.name}?
              <span className="block italic text-brass">See the price first.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-parchment-dim">{area.localContext}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className="inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-7 py-3 text-[15px] font-semibold text-ink transition hover:brightness-110">Get my price</Link>
              <Link href="/services" className="inline-flex min-h-12 items-center justify-center rounded-full border border-sky/25 px-7 py-3 text-[15px] font-semibold text-parchment transition hover:border-sky/50">See all prices</Link>
            </div>
            <p className="mt-5 max-w-2xl text-xs leading-5 text-parchment-dim">Availability is address-specific and depends on participating provider coverage and actual acceptance. A local page is not a promise that a provider is currently available at every address or hour.</p>
          </div>
        </section>

        <section className="border-b border-line/60 bg-surface/38">
          <div className="mx-auto grid max-w-[1180px] gap-5 px-6 py-6 sm:grid-cols-3 sm:px-8 lg:px-10">
            {[
              ["Price first", "See the published standard total and scope before requesting anyone."],
              ["Hyperlocal matching", `Use the exact ${area.name} address rather than a broad metro-area assumption.`],
              ["Real acceptance", "Provider identity and ETA appear only after a participating provider actually accepts."],
            ].map(([title, body]) => <div key={title}><div className="text-sm font-semibold text-parchment">{title}</div><div className="mt-1 text-sm leading-6 text-parchment-dim">{body}</div></div>)}
          </div>
        </section>

        <section className="border-b border-[#c7d9ec] bg-mist py-14 text-navy-text sm:py-16">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10">
            <div className="max-w-2xl">
              <div className="font-mono text-xs uppercase tracking-[.14em] text-[#7d6330]">Standard locksmith services</div>
              <h2 className="mt-3 font-display text-4xl tracking-[-.03em] sm:text-5xl">Choose the job before the provider.</h2>
              <p className="mt-4 text-sm leading-6 text-[#536e8a]">The same published standard scope and pricing rules apply; the local page supplies the access context and geographic routing layer.</p>
            </div>
            <div className="mt-9 divide-y divide-[#c7d9ec] border-y border-[#c7d9ec]">
              {FEATURED_SERVICES.map((service) => {
                const item = getServiceMenuItem(service.id);
                if (!item) return null;
                return (
                  <Link key={service.id} href={service.href} className="group grid gap-3 py-5 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div><div className="font-display text-2xl text-navy-text">{service.title}</div><div className="mt-1 text-sm text-[#536e8a]">{service.note}</div></div>
                    <div className="flex items-center justify-between gap-5 sm:justify-end"><div className="text-right"><div className="font-display text-3xl text-[#8c6d31]">{formatServicePrice(item.customerPriceCents)}</div><div className="mt-1 text-[11px] text-[#536e8a]">{service.priceSuffix}</div></div><span className="text-xl text-navy-text transition group-hover:translate-x-0.5">→</span></div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-line/60 py-16 sm:py-20">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-6 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:items-start lg:px-10">
            <div className="max-w-md"><div className="eyebrow">Local access context</div><h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment">What changes in {area.name}.</h2></div>
            <div>
              <div className="divide-y divide-line/70 border-y border-line/70">{area.accessNotes.map((note, index) => <div key={note} className="grid grid-cols-[42px_1fr] gap-4 py-5"><div className="font-mono text-xs text-brass">0{index + 1}</div><p className="text-sm leading-6 text-parchment-dim">{note}</p></div>)}</div>
              <div className="mt-8"><div className="font-mono text-[10px] uppercase tracking-[.14em] text-parchment-dim">Local areas and corridors</div><div className="mt-3 flex flex-wrap gap-2">{area.areas.map((item) => <span key={item} className="rounded-full border border-line/80 px-3 py-1.5 text-xs text-parchment-dim">{item}</span>)}</div></div>
            </div>
          </div>
        </section>

        <PropertyWorkflows area={area} />
        <NearbyMarkets area={area} />

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
            <div className="eyebrow">{area.shortLocation}</div>
            <h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment sm:text-5xl">Start with the service and standard price.</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-parchment-dim">No membership required for a one-off request. Provider eligibility and local coverage are separate from the existence of this geographic page.</p>
            <Link href="/book" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-7 py-3 text-sm font-semibold text-ink">Get my price →</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
