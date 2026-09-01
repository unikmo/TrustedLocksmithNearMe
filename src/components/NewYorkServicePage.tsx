import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { StrategicServicePaths } from "@/components/StrategicServicePaths";
import { getNyArea, type NyArea } from "@/lib/new-york-seo";
import {
  NY_SERVICE_DEFINITIONS,
  getNyServicesForArea,
  areaHasNyService,
  type NyServiceDefinition,
} from "@/lib/new-york-services";
import { formatServicePrice, getServiceMenuItem } from "@/lib/service-menu";

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
          <div className="mx-auto max-w-[1180px] px-6 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-18">
            <div className="flex flex-wrap items-center gap-2 text-xs text-parchment-dim">
              <Link href={`/${area.slug}`} className="hover:text-parchment hover:underline">{area.name}</Link>
              <span>/</span>
              <span>{service.shortTitle}</span>
            </div>
            <div className="mt-5 font-mono text-[11px] uppercase tracking-[.14em] text-brass">{service.eyebrow} · {area.shortLocation}</div>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-medium leading-[.96] tracking-[-.04em] text-parchment sm:text-6xl lg:text-[66px]">
              {service.shortTitle} in {area.name}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-parchment-dim">{service.summary(area)}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className="inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-7 py-3 text-[15px] font-semibold text-ink transition hover:brightness-110">Get my price</Link>
              <Link href={`/${area.slug}`} className="inline-flex min-h-12 items-center justify-center rounded-full border border-sky/25 px-7 py-3 text-[15px] font-semibold text-parchment transition hover:border-sky/50">{area.name} locksmith guide</Link>
            </div>
            <p className="mt-5 max-w-2xl text-xs leading-5 text-parchment-dim">Availability is address-specific and depends on participating provider service areas and actual acceptance. This page does not guarantee a provider at every address or hour.</p>
          </div>
        </section>

        <section className="border-b border-[#c7d9ec] bg-mist py-14 text-navy-text sm:py-16">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
              <div>
                <div className="font-mono text-xs uppercase tracking-[.14em] text-[#7d6330]">Published standard price</div>
                <h2 className="mt-3 font-display text-4xl tracking-[-.03em]">Know the price and scope before requesting anyone.</h2>
              </div>
              <div className="divide-y divide-[#c7d9ec] border-y border-[#c7d9ec]">
                {service.serviceIds.map((id) => {
                  const item = getServiceMenuItem(id);
                  if (!item) return null;
                  return (
                    <div key={id} className="grid gap-3 py-5 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-8">
                      <div>
                        <div className="font-semibold text-navy-text">{item.title}</div>
                        <div className="mt-1 text-sm text-[#536e8a]">{item.timing}</div>
                        <p className="mt-2 max-w-2xl text-xs leading-5 text-[#536e8a]">{item.scope}</p>
                      </div>
                      <div className="sm:text-right">
                        <div className="font-display text-3xl text-[#8c6d31]">{formatServicePrice(item.customerPriceCents)}</div>
                        <div className="mt-1 text-[11px] text-[#536e8a]">standard total</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-line/60 py-16 sm:py-20">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-6 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:items-start lg:px-10">
            <div>
              <div className="eyebrow">Local service context</div>
              <h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment">Why {area.name} changes the job.</h2>
            </div>
            <div>
              <p className="text-base leading-7 text-parchment-dim">{service.localAngle(area)}</p>
              <div className="mt-7 divide-y divide-line/70 border-y border-line/70">
                {area.accessNotes.slice(0, 3).map((note, index) => (
                  <div key={note} className="grid grid-cols-[42px_1fr] gap-4 py-5">
                    <div className="font-mono text-xs text-brass">0{index + 1}</div>
                    <p className="text-sm leading-6 text-parchment-dim">{note}</p>
                  </div>
                ))}
              </div>
              <div className="mt-7">
                <div className="font-mono text-[10px] uppercase tracking-[.14em] text-parchment-dim">Local areas and corridors</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {area.areas.map((item) => (
                    <span key={item} className="rounded-full border border-line/80 px-3 py-1.5 text-xs text-parchment-dim">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-line/60 bg-surface/38 py-14 sm:py-16">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:px-10">
            <div>
              <div className="eyebrow">Standard scope</div>
              <h2 className="mt-3 font-display text-3xl text-parchment">What the published service means.</h2>
              <div className="mt-6 divide-y divide-line/70 border-y border-line/70">
                {service.scopeBullets.map((bullet) => (
                  <div key={bullet} className="flex gap-3 py-4 text-sm leading-6 text-parchment-dim"><span className="text-brass">✓</span><span>{bullet}</span></div>
                ))}
              </div>
            </div>
            <div>
              <div className="eyebrow">Important boundary</div>
              <h2 className="mt-3 font-display text-3xl text-parchment">Extra work remains your decision.</h2>
              <p className="mt-5 text-sm leading-6 text-parchment-dim">If the actual job falls outside the published standard scope, the provider must explain the extra work and price before it begins. Trusted Locksmith does not turn a local SEO page into a blanket promise of dispatch, availability or unlimited scope.</p>
            </div>
          </div>
        </section>

        <StrategicServicePaths serviceSlug={service.slug} locationName={area.name} />

        {(relatedServices.length > 0 || nearbyWithService.length > 0) && (
          <section className="border-b border-line/60 py-14 sm:py-16">
            <div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10">
              {relatedServices.length > 0 && (
                <div>
                  <div className="eyebrow">Other services in {area.name}</div>
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-y border-line/70 py-5">
                    {relatedServices.map(({ slug, service: related }) => (
                      <Link key={slug} href={`/${area.slug}/${slug}`} className="text-sm font-semibold text-brass hover:underline">{related.shortTitle} →</Link>
                    ))}
                  </div>
                </div>
              )}
              {nearbyWithService.length > 0 && (
                <div className={relatedServices.length > 0 ? "mt-10" : ""}>
                  <div className="eyebrow">Nearby {service.shortTitle.toLowerCase()} pages</div>
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-y border-line/70 py-5">
                    {nearbyWithService.map((nearby) => (
                      <Link key={nearby.slug} href={`/${nearby.slug}/${service.slug}`} className="text-sm font-semibold text-parchment hover:underline">{nearby.name} →</Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6 sm:px-8">
            <div className="eyebrow text-center">Questions about {service.shortTitle.toLowerCase()}</div>
            <h2 className="mt-4 text-center font-display text-4xl tracking-[-.03em] text-parchment">Clear answers before you request.</h2>
            <div className="mt-9 space-y-6">
              {service.faq(area).map((item) => (
                <div key={item.q} className="border-b border-line/70 pb-6"><h3 className="font-semibold text-parchment">{item.q}</h3><p className="mt-2 text-sm leading-6 text-parchment-dim">{item.a}</p></div>
              ))}
            </div>
            <div className="mt-9 text-center"><Link href="/book" className="inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-7 py-3 text-sm font-semibold text-ink">Get my price →</Link></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
