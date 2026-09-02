import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SERVICE_MENU, formatServicePrice } from "@/lib/service-menu";
import { PAGE_VISUALS } from "@/lib/visuals";
import { SITE_URL } from "@/lib/site";

const FEATURED_SERVICE_IDS = ["home_lockout_day", "car_lockout_at_property", "standard_rekey", "standard_lock_change", "smart_lock_install"];

const websiteSchema = { "@context": "https://schema.org", "@type": "WebSite", name: "Trusted Locksmith", url: SITE_URL };

const STEPS = [
  ["01", "Choose the job", "See the published standard price and scope before you send a request."],
  ["02", "Add the address", "The exact service location is used to match the request locally."],
  ["03", "See who accepts", "Provider identity and ETA appear only after a participating provider actually accepts."],
] as const;

const MARKETS = [
  { title: "Massachusetts", primaryLabel: "Boston", primaryHref: "/boston-ma", links: [["Cambridge", "/cambridge-ma"], ["Newton", "/newton-ma"], ["Somerville", "/somerville-ma"]], bg: "#fff8e8", border: "#e4c978", accent: "#86661f" },
  { title: "New York", primaryLabel: "New York City", primaryHref: "/new-york-ny", links: [["Manhattan", "/manhattan-ny"], ["Brooklyn", "/brooklyn-ny"], ["Queens", "/queens-ny"]], bg: "#eef6ff", border: "#b7d2ea", accent: "#376f9a" },
  { title: "New Jersey", primaryLabel: "Jersey City", primaryHref: "/jersey-city-nj", links: [["Newark", "/newark-nj"], ["Hoboken", "/hoboken-nj"], ["Cherry Hill", "/cherry-hill-nj"]], bg: "#eff8f0", border: "#bfd9c4", accent: "#4e7f58" },
  { title: "Philadelphia", primaryLabel: "Philadelphia", primaryHref: "/philadelphia-pa", links: [["West Philadelphia", "/west-philadelphia-pa"], ["South Philadelphia", "/south-philadelphia-pa"], ["Center City", "/center-city-philadelphia-pa"]], bg: "#fff1ed", border: "#edc3b7", accent: "#9a5b4b" },
  { title: "Connecticut", primaryLabel: "Stamford", primaryHref: "/stamford-ct", links: [["New Haven", "/new-haven-ct"], ["Hartford", "/hartford-ct"], ["Bridgeport", "/bridgeport-ct"]], bg: "#f4f1ff", border: "#cec4e9", accent: "#67569a" },
  { title: "Delaware", primaryLabel: "Wilmington", primaryHref: "/wilmington-de", links: [["Newark", "/newark-de"], ["Dover", "/dover-de"], ["Rehoboth Beach", "/rehoboth-beach-de"]], bg: "#edf9f7", border: "#b9dcd5", accent: "#39786e" },
] as const;

export default function Home() {
  const featuredServices = FEATURED_SERVICE_IDS.map((id) => SERVICE_MENU.find((service) => service.id === id)).filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <div className="flex min-h-screen flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <Nav />
      <main className="flex-1">
        <section className="border-b border-line/60">
          <div className="mx-auto grid max-w-[1180px] gap-8 px-6 py-10 sm:px-8 sm:py-14 lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:gap-12 lg:px-10 lg:py-16">
            <div className="max-w-xl">
              <div className="eyebrow">Locksmith help · upfront standard prices</div>
              <h1 className="mt-5 font-display text-5xl font-medium leading-[.96] tracking-[-.04em] text-parchment sm:text-6xl lg:text-[68px]">
                Locked out?
                <span className="block italic text-brass">Get it sorted.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-parchment-dim">
                See the standard price before you request help. Add the address, then see the provider only after someone actually accepts.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/book" className="inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-7 py-3 text-[15px] font-semibold text-ink transition hover:brightness-110">Get my price</Link>
                <Link href="#locations" className="inline-flex min-h-12 items-center justify-center rounded-full border border-sky/25 px-7 py-3 text-[15px] font-semibold text-parchment transition hover:border-sky/50">Choose location</Link>
              </div>
              <div className="mt-8 grid gap-3 border-t border-line/65 pt-6 sm:grid-cols-3">
                {[["Price first", "Before the request"], ["Exact address", "For local matching"], ["Real acceptance", "Provider details after acceptance"]].map(([title, body]) => (
                  <div key={title}><div className="text-sm font-semibold text-parchment">{title}</div><p className="mt-1 text-xs leading-5 text-parchment-dim">{body}</p></div>
                ))}
              </div>
            </div>

            <div className="relative h-[390px] overflow-hidden rounded-[30px] border border-sky/18 bg-surface-raised shadow-[0_28px_70px_rgba(3,18,37,0.26)] sm:h-[500px]">
              <Image src={PAGE_VISUALS.services.src} alt={PAGE_VISUALS.services.alt} fill priority sizes="(max-width: 1023px) 100vw, 55vw" style={{ objectFit: "cover", objectPosition: PAGE_VISUALS.services.objectPosition ?? "center" }} />
            </div>
          </div>
        </section>

        <section id="locations" className="border-b border-[#c7d9ec] bg-mist py-12 text-navy-text sm:py-14">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10">
            <div className="max-w-2xl">
              <div className="font-mono text-xs uppercase tracking-[.14em] text-[#7d6330]">Where do you need help?</div>
              <h2 className="mt-3 font-display text-4xl tracking-[-.03em] sm:text-5xl">Choose your area.</h2>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {MARKETS.map((market) => (
                <article
                  key={market.title}
                  className="rounded-[24px] border p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(16,44,73,0.08)] sm:p-7"
                  style={{ backgroundColor: market.bg, borderColor: market.border }}
                >
                  <div className="font-mono text-[10px] uppercase tracking-[.14em]" style={{ color: market.accent }}>{market.title}</div>
                  <Link href={market.primaryHref} className="mt-5 inline-flex text-xl font-semibold text-navy-text hover:underline">{market.primaryLabel} →</Link>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t pt-4 text-sm" style={{ borderColor: market.border }}>
                    {market.links.map(([label, href]) => <Link key={href} href={href} className="font-medium text-[#536e8a] hover:text-navy-text hover:underline">{label}</Link>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-line/60 py-14 sm:py-16">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl"><div className="eyebrow">Common locksmith services</div><h2 className="mt-3 font-display text-4xl tracking-[-.03em] text-parchment sm:text-5xl">Choose the job. See the price.</h2></div>
              <Link href="/services" className="text-sm font-semibold text-parchment hover:underline">All services & prices →</Link>
            </div>
            <div className="mt-9 divide-y divide-line/70 border-y border-line/70">
              {featuredServices.map((service) => (
                <Link key={service.id} href={`/book/details?service_id=${service.id}`} className="group grid gap-3 py-5 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div><div className="font-display text-2xl text-parchment">{service.title}</div><div className="mt-1 text-sm text-parchment-dim">{service.timing}</div></div>
                  <div className="flex items-center justify-between gap-5 sm:justify-end"><div className="text-right"><div className="font-display text-3xl text-brass">{formatServicePrice(service.customerPriceCents)}</div><div className="mt-1 text-[11px] text-parchment-dim">standard total</div></div><span className="text-xl text-parchment transition group-hover:translate-x-0.5" aria-hidden="true">→</span></div>
                </Link>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-parchment-dim">Published standard totals include provider travel/service call. Hardware or out-of-scope work is separate only where applicable and requires approval first.</p>
          </div>
        </section>

        <section id="how-it-works" className="border-b border-line/60 bg-surface/38 py-14 sm:py-16">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10">
            <div className="max-w-2xl"><div className="eyebrow">How it works</div><h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment sm:text-5xl">Three steps. Clear from the start.</h2></div>
            <div className="mt-9 grid gap-8 border-t border-line/70 pt-8 md:grid-cols-3 md:gap-10">
              {STEPS.map(([n, title, body]) => <div key={n}><div className="font-mono text-xs text-brass">{n}</div><h3 className="mt-4 font-display text-2xl text-parchment">{title}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-parchment-dim">{body}</p></div>)}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16">
          <div className="mx-auto max-w-[760px] px-6 text-center sm:px-8">
            <div className="eyebrow">Need a locksmith?</div>
            <h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment sm:text-5xl">Start with the price, not the pressure.</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-parchment-dim">Choose the service and see the standard total before sending your request.</p>
            <Link href="/book" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-7 py-3 text-sm font-semibold text-ink">Get my price →</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
