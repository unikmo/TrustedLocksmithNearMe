import Link from "next/link";
import { Footer } from "@/components/Footer";
import { LocalAreaHero } from "@/components/LocalAreaHero";
import { Nav } from "@/components/Nav";
import { SimpleLocalContext } from "@/components/SimpleLocalContext";
import type { LocalHeroImage } from "@/lib/local-image";
import { MA_CITIES, type MaCity, type MaServiceSlug } from "@/lib/massachusetts-seo";
import { formatServicePrice, getServiceMenuItem } from "@/lib/service-menu";

const SERVICES: Array<{ slug: MaServiceSlug; id: string; title: string; note: string }> = [
  { slug: "emergency-locksmith", id: "home_lockout_day", title: "Emergency locksmith", note: "Home lockout · weekday price" },
  { slug: "house-lockout", id: "home_lockout_day", title: "House lockout", note: "Standard home entry" },
  { slug: "car-lockout", id: "car_lockout_at_property", title: "Car lockout", note: "Standard car entry" },
  { slug: "rekey-locks", id: "standard_rekey", title: "Rekey locks", note: "First standard cylinder" },
  { slug: "lock-change", id: "standard_lock_change", title: "Lock change", note: "Labor for one standard lock" },
  { slug: "smart-lock-installation", id: "smart_lock_install", title: "Smart lock installation", note: "Install your compatible smart lock" },
];

const BOOKING_HREF: Record<MaServiceSlug, string> = {
  "emergency-locksmith": "/book",
  "house-lockout": "/book/details?service_id=home_lockout_day",
  "car-lockout": "/book/details?service_id=car_lockout_at_property",
  "rekey-locks": "/book/details?service_id=standard_rekey",
  "lock-change": "/book/details?service_id=standard_lock_change",
  "smart-lock-installation": "/book/details?service_id=smart_lock_install",
};

function serviceHref(city: MaCity, slug: MaServiceSlug) {
  return city.services.includes(slug) ? `/${city.slug}/${slug}` : BOOKING_HREF[slug];
}

export function LocalCityPage({ city, heroImage }: { city: MaCity; heroImage: LocalHeroImage }) {
  const nearby = city.nearby
    .map((slug) => MA_CITIES.find((item) => item.slug === slug))
    .filter((item): item is MaCity => Boolean(item));

  const nearbyLinks = nearby.length > 0 ? (
    <div className="mt-8 border-t border-line/70 pt-6">
      <div className="font-mono text-[10px] uppercase tracking-[.14em] text-parchment-dim">Nearby</div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {nearby.map((item) => (
          <Link key={item.slug} href={`/${item.slug}`} className="font-semibold text-brass hover:underline">{item.name} →</Link>
        ))}
      </div>
    </div>
  ) : null;

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <LocalAreaHero slug={city.slug} name={city.name} eyebrow={`${city.name}, Massachusetts`} heroImage={heroImage} />

        <section className="border-b border-[#c7d9ec] bg-mist py-11 text-navy-text sm:py-13">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10">
            <div className="max-w-2xl">
              <div className="font-mono text-xs uppercase tracking-[.14em] text-[#7d6330]">Prices in {city.name}</div>
              <h2 className="mt-3 font-display text-3xl tracking-[-.025em] sm:text-4xl">Choose the job. See the price.</h2>
              <p className="mt-3 text-sm leading-6 text-[#536e8a]">The price shown includes the service call for the listed job.</p>
            </div>

            <div className="mt-7 divide-y divide-[#c7d9ec] border-y border-[#c7d9ec]">
              {SERVICES.map((service) => {
                const item = getServiceMenuItem(service.id);
                if (!item) return null;
                return (
                  <Link key={service.slug} href={serviceHref(city, service.slug)} className="group grid gap-3 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div>
                      <div className="font-display text-xl text-navy-text sm:text-2xl">{service.title}</div>
                      <div className="mt-1 text-sm text-[#536e8a]">{service.note}</div>
                    </div>
                    <div className="flex items-center justify-between gap-5 sm:justify-end">
                      <div className="text-right">
                        <div className="font-display text-3xl text-[#8c6d31]">{formatServicePrice(item.customerPriceCents)}</div>
                        <div className="mt-1 text-[11px] text-[#536e8a]">{service.slug === "emergency-locksmith" || service.slug === "house-lockout" ? "from" : "standard price"}</div>
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

        <SimpleLocalContext slug={city.slug} name={city.name} areas={city.areas} links={nearbyLinks} />
      </main>
      <Footer />
    </div>
  );
}
