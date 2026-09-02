import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { SimpleServiceLocalContext } from "@/components/SimpleServiceLocalContext";
import { getNyArea, type NyArea } from "@/lib/new-york-seo";
import {
  NY_SERVICE_DEFINITIONS,
  getNyServicesForArea,
  areaHasNyService,
  type NyServiceDefinition,
} from "@/lib/new-york-services";
import { formatServicePrice, getServiceMenuItem } from "@/lib/service-menu";

function heroText(service: NyServiceDefinition) {
  switch (service.slug) {
    case "emergency-locksmith": return "Locked out? See the price for the time you need help before you request it.";
    case "car-lockout": return "Locked out of your car? See the standard entry price before you request help.";
    case "rekey-locks": return "Need old keys to stop working? See the rekey price first.";
    case "lock-change": return "Need a new lock? See the labor price first. Hardware is separate.";
    case "smart-lock-installation": return "Already have a compatible smart lock? See the installation price first.";
  }
}

export function NewYorkServicePage({ area, service }: { area: NyArea; service: NyServiceDefinition }) {
  const relatedServices = getNyServicesForArea(area.slug)
    .filter((slug) => slug !== service.slug)
    .map((slug) => ({ slug, service: NY_SERVICE_DEFINITIONS[slug] }));

  const nearbyWithService = area.nearby
    .filter((slug) => areaHasNyService(slug, service.slug))
    .map((slug) => getNyArea(slug))
    .filter((item): item is NyArea => Boolean(item));

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <section className="border-b border-line/60">
          <div className="mx-auto max-w-[1180px] px-6 py-10 sm:px-8 sm:py-12 lg:px-10">
            <div className="flex flex-wrap items-center gap-2 text-xs text-parchment-dim">
              <Link href={`/${area.slug}`} className="hover:text-parchment hover:underline">{area.name}</Link>
              <span>/</span>
              <span>{service.shortTitle}</span>
            </div>
            <div className="mt-5 font-mono text-[10px] uppercase tracking-[.14em] text-brass">{area.shortLocation}</div>
            <h1 className="mt-4 max-w-3xl font-display text-[38px] font-medium leading-[.98] tracking-[-.035em] text-parchment sm:text-[44px] lg:text-[50px]">{service.shortTitle} in {area.name}</h1>
            <p className="mt-4 max-w-xl text-[15px] leading-6 text-parchment-dim">{heroText(service)}</p>
            <Link href="/book" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-brass px-6 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110">Get my price</Link>
          </div>
        </section>

        <section className="border-b border-[#c7d9ec] bg-mist py-11 text-navy-text sm:py-13">
          <div className="mx-auto grid max-w-[1180px] gap-7 px-6 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:items-start lg:px-10">
            <div>
              <div className="font-mono text-xs uppercase tracking-[.14em] text-[#7d6330]">Price</div>
              <h2 className="mt-3 font-display text-3xl tracking-[-.025em] sm:text-4xl">See it before you request.</h2>
              <p className="mt-3 text-sm leading-6 text-[#536e8a]">The price shown includes the service call for the listed job.</p>
            </div>
            <div className="divide-y divide-[#c7d9ec] border-y border-[#c7d9ec]">
              {service.serviceIds.map((id) => {
                const item = getServiceMenuItem(id);
                if (!item) return null;
                return (
                  <div key={id} className="grid gap-3 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div>
                      <div className="font-display text-xl text-navy-text sm:text-2xl">{item.title}</div>
                      <div className="mt-1 text-sm text-[#536e8a]">{item.timing}</div>
                    </div>
                    <div className="sm:text-right">
                      <div className="font-display text-3xl text-[#8c6d31]">{formatServicePrice(item.customerPriceCents)}</div>
                      <div className="mt-1 text-[11px] text-[#536e8a]">standard price</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-line/60 py-12 sm:py-14">
          <div className="mx-auto grid max-w-[1180px] gap-9 px-6 sm:px-8 lg:grid-cols-2 lg:px-10">
            <div>
              <div className="eyebrow">What is included</div>
              <h2 className="mt-3 font-display text-3xl text-parchment">The listed job, clearly defined.</h2>
              <div className="mt-6 divide-y divide-line/70 border-y border-line/70">
                {service.scopeBullets.map((bullet) => (
                  <div key={bullet} className="flex gap-3 py-4 text-sm leading-6 text-parchment-dim"><span className="text-brass">✓</span><span>{bullet}</span></div>
                ))}
              </div>
            </div>
            <div>
              <div className="eyebrow">If more work is needed</div>
              <h2 className="mt-3 font-display text-3xl text-parchment">You approve the extra price first.</h2>
              <p className="mt-5 max-w-md text-sm leading-6 text-parchment-dim">If the job needs hardware or work outside the listed service, you see the added price before that work starts.</p>
            </div>
          </div>
        </section>

        <SimpleServiceLocalContext slug={area.slug} name={area.name} areas={area.areas} serviceLabel={service.shortTitle} />

        <section className="border-b border-line/60 bg-surface/35 py-12 sm:py-14">
          <div className="mx-auto max-w-3xl px-6 sm:px-8">
            <div className="eyebrow">Questions</div>
            <h2 className="mt-3 font-display text-3xl tracking-[-.025em] text-parchment sm:text-4xl">What to know before you request.</h2>
            <div className="mt-7 divide-y divide-line/70 border-y border-line/70">
              {service.faq(area).slice(0, 3).map((item) => (
                <div key={item.q} className="py-5"><h3 className="font-semibold text-parchment">{item.q}</h3><p className="mt-2 text-sm leading-6 text-parchment-dim">{item.a}</p></div>
              ))}
            </div>
          </div>
        </section>

        {(relatedServices.length > 0 || nearbyWithService.length > 0) && (
          <section className="py-12 sm:py-14">
            <div className="mx-auto grid max-w-[1180px] gap-8 px-6 sm:px-8 lg:grid-cols-2 lg:px-10">
              {relatedServices.length > 0 && (
                <div>
                  <div className="eyebrow">More in {area.name}</div>
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">
                    <Link href={`/${area.slug}`} className="font-semibold text-brass hover:underline">All {area.name} locksmith services →</Link>
                    {relatedServices.slice(0, 4).map(({ slug, service: related }) => (
                      <Link key={slug} href={`/${area.slug}/${slug}`} className="font-semibold text-brass hover:underline">{related.shortTitle} →</Link>
                    ))}
                  </div>
                </div>
              )}
              {nearbyWithService.length > 0 && (
                <div>
                  <div className="eyebrow">Nearby</div>
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">
                    {nearbyWithService.slice(0, 6).map((nearby) => (
                      <Link key={nearby.slug} href={`/${nearby.slug}/${service.slug}`} className="font-semibold text-brass hover:underline">{nearby.name} →</Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
