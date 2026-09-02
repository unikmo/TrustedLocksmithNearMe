import Link from "next/link";
import { Footer } from "@/components/Footer";
import { LocalAreaHero } from "@/components/LocalAreaHero";
import { Nav } from "@/components/Nav";
import { SimpleLocalContext } from "@/components/SimpleLocalContext";
import type { LocalHeroImage } from "@/lib/local-image";
import { NORTHEAST_AREAS, getNortheastArea, getNortheastChildren, type NortheastArea } from "@/lib/northeast-seo";
import { formatServicePrice, getServiceMenuItem } from "@/lib/service-menu";

const SERVICES = [
  { id: "home_lockout_day", title: "Home lockout", note: "Home entry · weekday price", href: "/book/details?service_id=home_lockout_day" },
  { id: "car_lockout_at_property", title: "Car lockout", note: "Standard car entry", href: "/book/details?service_id=car_lockout_at_property" },
  { id: "standard_rekey", title: "Rekey locks", note: "First standard cylinder", href: "/book/details?service_id=standard_rekey" },
  { id: "standard_lock_change", title: "Lock change", note: "Labor for one standard lock", href: "/book/details?service_id=standard_lock_change" },
  { id: "smart_lock_install", title: "Smart lock installation", note: "Install your compatible smart lock", href: "/book/details?service_id=smart_lock_install" },
] as const;

function Nearby({ area }: { area: NortheastArea }) {
  const children = getNortheastChildren(area.slug);
  const nearby = area.nearby.map(getNortheastArea).filter((item): item is NortheastArea => Boolean(item));
  const sameGroup = NORTHEAST_AREAS.filter((item) => item.group === area.group && item.slug !== area.slug);
  const base = children.length > 0 ? children : nearby.length > 0 ? nearby : sameGroup;
  const links = base.slice(0, 6);
  if (links.length === 0) return null;

  return (
    <div className="mt-8 border-t border-line/70 pt-6">
      <div className="font-mono text-[10px] uppercase tracking-[.14em] text-parchment-dim">{children.length > 0 ? `More in ${area.name}` : "Nearby"}</div>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3 text-sm">
        {links.map((item) => <Link key={item.slug} href={`/${item.slug}`} className="font-semibold text-brass hover:underline">{item.name} →</Link>)}
      </div>
    </div>
  );
}

export function NortheastLocalPage({ area, heroImage }: { area: NortheastArea; heroImage: LocalHeroImage }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <LocalAreaHero slug={area.slug} name={area.name} eyebrow={area.shortLocation} areas={area.areas} heroImage={heroImage} />

        <section className="border-b border-[#c7d9ec] bg-mist py-11 text-navy-text sm:py-13">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10">
            <div className="max-w-2xl">
              <div className="font-mono text-xs uppercase tracking-[.14em] text-[#7d6330]">Prices in {area.name}</div>
              <h2 className="mt-3 font-display text-3xl tracking-[-.025em] sm:text-4xl">Choose the job. See the price.</h2>
              <p className="mt-3 text-sm leading-6 text-[#536e8a]">The price shown includes the service call for the listed job.</p>
            </div>
            <div className="mt-7 divide-y divide-[#c7d9ec] border-y border-[#c7d9ec]">
              {SERVICES.map((service) => {
                const item = getServiceMenuItem(service.id);
                if (!item) return null;
                return (
                  <Link key={service.id} href={service.href} className="group grid gap-3 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div>
                      <div className="font-display text-xl text-navy-text sm:text-2xl">{service.title}</div>
                      <div className="mt-1 text-sm text-[#536e8a]">{service.note}</div>
                    </div>
                    <div className="flex items-center justify-between gap-5 sm:justify-end">
                      <div className="text-right">
                        <div className="font-display text-3xl text-[#8c6d31]">{formatServicePrice(item.customerPriceCents)}</div>
                        <div className="mt-1 text-[11px] text-[#536e8a]">{service.id === "home_lockout_day" ? "from" : "standard price"}</div>
                      </div>
                      <span className="text-xl text-navy-text transition group-hover:translate-x-0.5" aria-hidden="true">→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
            <p className="mt-4 text-xs leading-5 text-[#536e8a]">If extra work is needed, you see and approve the added price first.</p>
          </div>
        </section>

        <SimpleLocalContext name={area.name} areas={area.areas} links={<Nearby area={area} />} />
      </main>
      <Footer />
    </div>
  );
}
