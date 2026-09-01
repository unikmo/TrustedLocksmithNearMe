import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SERVICE_MENU, formatServicePrice } from "@/lib/service-menu";
import { PAGE_VISUALS } from "@/lib/visuals";
import { SITE_URL } from "@/lib/site";

const FEATURED_SERVICE_IDS = [
  "home_lockout_day",
  "car_lockout_at_property",
  "standard_rekey",
  "standard_lock_change",
  "smart_lock_install",
];

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Trusted Locksmith",
  url: SITE_URL,
};

const STEPS = [
  ["01", "Choose the service", "Start with the job you need and review the published standard price."],
  ["02", "Add the service location", "The exact address determines which participating providers can realistically receive the request."],
  ["03", "See who accepts", "Provider identity and ETA appear only after a participating provider actually accepts."],
] as const;

const MARKETS = [
  {
    title: "Massachusetts",
    body: "Boston and Greater Boston are the primary launch market, with local pages for Boston, Cambridge, Newton, Somerville and other nearby communities.",
    primaryLabel: "Boston",
    primaryHref: "/boston-ma",
    links: [
      ["Cambridge", "/cambridge-ma"],
      ["Newton", "/newton-ma"],
      ["Somerville", "/somerville-ma"],
    ],
  },
  {
    title: "New York",
    body: "Choose New York City, a borough, selected NYC neighborhoods or New York State markets. Availability remains address-specific and depends on real provider coverage.",
    primaryLabel: "New York City",
    primaryHref: "/new-york-ny",
    links: [
      ["Manhattan", "/manhattan-ny"],
      ["Brooklyn", "/brooklyn-ny"],
      ["Queens", "/queens-ny"],
    ],
  },
] as const;

export default function Home() {
  const featuredServices = FEATURED_SERVICE_IDS
    .map((id) => SERVICE_MENU.find((service) => service.id === id))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <div className="flex min-h-screen flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <Nav />
      <main className="flex-1">
        <section className="border-b border-line/60">
          <div className="mx-auto grid max-w-[1180px] gap-8 px-6 py-10 sm:px-8 sm:py-14 lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:gap-12 lg:px-10 lg:py-16">
            <div className="max-w-xl">
              <div className="eyebrow">Locksmith requests · upfront standard prices</div>
              <h1 className="mt-5 font-display text-5xl font-medium leading-[.96] tracking-[-.04em] text-parchment sm:text-6xl lg:text-[68px]">
                Locked out?
                <span className="block italic text-brass">Get it sorted.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-parchment-dim">
                Choose the service, see the published standard total and scope, then send the request. A specific provider appears only after a participating local provider actually accepts.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/book" className="inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-7 py-3 text-[15px] font-semibold text-ink transition hover:brightness-110">
                  Get my price
                </Link>
                <Link href="#locations" className="inline-flex min-h-12 items-center justify-center rounded-full border border-sky/25 px-7 py-3 text-[15px] font-semibold text-parchment transition hover:border-sky/50">
                  Choose location
                </Link>
              </div>

              <div className="mt-8 grid gap-3 border-t border-line/65 pt-6 sm:grid-cols-3">
                {[
                  ["Price first", "Know the standard total before you request."],
                  ["Real acceptance", "Provider details appear after acceptance."],
                  ["You approve extras", "No additional work starts without approval."],
                ].map(([title, body]) => (
                  <div key={title}>
                    <div className="text-sm font-semibold text-parchment">{title}</div>
                    <p className="mt-1 text-xs leading-5 text-parchment-dim">{body}</p>
                  </div>
                ))}
              </div>
            </div>

            <figure className="relative h-[390px] overflow-hidden rounded-[30px] border border-sky/18 bg-surface-raised shadow-[0_28px_70px_rgba(3,18,37,0.26)] sm:h-[500px]">
              <Image
                src={PAGE_VISUALS.services.src}
                alt={PAGE_VISUALS.services.alt}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 55vw"
                style={{ objectFit: "cover", objectPosition: PAGE_VISUALS.services.objectPosition ?? "center" }}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void/95 via-void/55 to-transparent px-6 pb-6 pt-20">
                <div className="font-mono text-[10px] uppercase tracking-[.14em] text-brass">One process · local matching</div>
                <p className="mt-2 max-w-md text-sm leading-6 text-parchment-dim">
                  Trusted Locksmith operates the request platform. Field work is performed by participating independent local providers.
                </p>
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="locations" className="border-b border-[#c7d9ec] bg-mist py-12 text-navy-text sm:py-14">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10">
            <div className="max-w-2xl">
              <div className="font-mono text-xs uppercase tracking-[.14em] text-[#7d6330]">Where do you need help?</div>
              <h2 className="mt-3 font-display text-4xl tracking-[-.03em] sm:text-5xl">Choose the market first.</h2>
              <p className="mt-4 text-sm leading-6 text-[#536e8a]">
                Location pages explain local access conditions and route you toward the right request path. They do not imply that a provider is available at every address or hour.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {MARKETS.map((market) => (
                <article key={market.title} className="rounded-[24px] border border-[#c7d9ec] bg-white/85 p-6 sm:p-7">
                  <div className="font-mono text-[10px] uppercase tracking-[.14em] text-[#7d6330]">{market.title}</div>
                  <p className="mt-3 text-sm leading-6 text-[#536e8a]">{market.body}</p>
                  <Link href={market.primaryHref} className="mt-5 inline-flex text-lg font-semibold text-navy-text hover:underline">
                    {market.primaryLabel} →
                  </Link>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#d7e2ed] pt-4 text-sm">
                    {market.links.map(([label, href]) => (
                      <Link key={href} href={href} className="font-medium text-[#536e8a] hover:text-navy-text hover:underline">
                        {label}
                      </Link>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-line/60 py-14 sm:py-16">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <div className="eyebrow">Common locksmith services</div>
                <h2 className="mt-3 font-display text-4xl tracking-[-.03em] text-parchment sm:text-5xl">Choose the job. See the price.</h2>
              </div>
              <Link href="/services" className="text-sm font-semibold text-parchment hover:underline">All services & prices →</Link>
            </div>

            <div className="mt-9 divide-y divide-line/70 border-y border-line/70">
              {featuredServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/book/details?service_id=${service.id}`}
                  className="group grid gap-3 py-5 transition sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div>
                    <div className="font-display text-2xl text-parchment">{service.title}</div>
                    <div className="mt-1 text-sm text-parchment-dim">{service.timing}</div>
                  </div>
                  <div className="flex items-center justify-between gap-5 sm:justify-end">
                    <div className="text-right">
                      <div className="font-display text-3xl text-brass">{formatServicePrice(service.customerPriceCents)}</div>
                      <div className="mt-1 text-[11px] text-parchment-dim">standard total</div>
                    </div>
                    <span className="text-xl text-parchment transition group-hover:translate-x-0.5" aria-hidden="true">→</span>
                  </div>
                </Link>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-parchment-dim">Published standard totals include provider travel/service call. Hardware or out-of-scope work is separate only where applicable and requires approval first.</p>
          </div>
        </section>

        <section id="how-it-works" className="border-b border-line/60 bg-surface/38 py-16 sm:py-20">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10">
            <div className="max-w-2xl">
              <div className="eyebrow">How it works</div>
              <h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment sm:text-5xl">Three steps. No fictional dispatch.</h2>
            </div>
            <div className="mt-10 grid gap-8 border-t border-line/70 pt-8 md:grid-cols-3 md:gap-10">
              {STEPS.map(([n, title, body]) => (
                <div key={n}>
                  <div className="font-mono text-xs text-brass">{n}</div>
                  <h3 className="mt-4 font-display text-2xl text-parchment">{title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-parchment-dim">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-line/60 py-14 sm:py-16">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-6 sm:px-8 lg:grid-cols-[.82fr_1.18fr] lg:items-start lg:px-10">
            <div className="max-w-md">
              <div className="eyebrow">Why the process is different</div>
              <h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment">Clarity before urgency takes over.</h2>
            </div>
            <div className="divide-y divide-line/70 border-y border-line/70">
              {[
                ["Standard price before the request", "You can see the published total and scope before a provider is involved."],
                ["Provider identity after acceptance", "We do not show a made-up provider, rating or ETA while a request is still unmatched."],
                ["Extra work stays your decision", "If the actual job is outside the standard scope, the additional work and price must be approved first."],
              ].map(([title, body]) => (
                <div key={title} className="py-5">
                  <h3 className="font-semibold text-parchment">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-parchment-dim">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto grid max-w-[1180px] gap-4 px-6 sm:px-8 md:grid-cols-2 lg:px-10">
            <div className="rounded-[28px] border border-brass/25 bg-brass/[.07] p-7 sm:p-8">
              <div className="eyebrow">Need a locksmith?</div>
              <h2 className="mt-3 font-display text-3xl text-parchment sm:text-4xl">Start with the price, not a sales call.</h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-parchment-dim">Choose the service and review the standard total before sending the request.</p>
              <Link href="/book" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-brass px-6 py-2.5 text-sm font-semibold text-ink">Get my price →</Link>
            </div>

            <div className="rounded-[28px] border border-line bg-surface/45 p-7 sm:p-8">
              <div className="eyebrow">Local locksmith businesses</div>
              <h2 className="mt-3 font-display text-3xl text-parchment sm:text-4xl">Want local requests you can choose to accept?</h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-parchment-dim">Control your availability and review each request and its private commercial terms before deciding.</p>
              <Link href="/partner-tech" className="mt-6 inline-flex min-h-11 items-center rounded-full border border-sky/25 px-6 py-2.5 text-sm font-semibold text-parchment transition hover:border-sky/50">For locksmiths →</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
