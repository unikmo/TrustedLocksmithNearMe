import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SERVICE_MENU, formatServicePrice } from "@/lib/service-menu";

const HERO_IMAGE = "https://images.unsplash.com/photo-1711098256657-f40961037781?auto=format&fit=crop&fm=jpg&q=82&w=1800";
const KEY_IMAGE = "https://images.unsplash.com/photo-1733244766159-f58f4184fd38?auto=format&fit=crop&fm=jpg&q=82&w=1800";
const QUICK_SERVICE_IDS = ["home_lockout_day", "standard_rekey", "standard_lock_change"];
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://trustedlocksmithnearme.com";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Trusted Locksmith",
  url: siteUrl,
};

const STEPS = [
  {
    n: "01",
    title: "Choose the service",
    body: "Start with the job you actually need and see the published standard price and scope before entering your details.",
  },
  {
    n: "02",
    title: "Send one clear request",
    body: "Add the service address and contact details. Trusted Locksmith makes the request available to participating independent local providers.",
  },
  {
    n: "03",
    title: "See who accepts",
    body: "A provider name and ETA appear only after a real provider accepts. Out-of-scope work requires a separate price and your approval.",
  },
];

export default function Home() {
  const quickServices = QUICK_SERVICE_IDS
    .map((id) => SERVICE_MENU.find((service) => service.id === id))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <div className="flex min-h-screen flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <Nav />
      <main className="flex-1">
        <section className="border-b border-line/70">
          <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-12 sm:px-8 sm:py-16 lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:gap-14 lg:px-10 lg:py-20">
            <div className="max-w-2xl">
              <div className="eyebrow">Local providers · price shown first</div>
              <h1 className="mt-5 font-display text-5xl font-medium leading-[.96] tracking-[-.04em] text-parchment sm:text-6xl lg:text-[72px]">
                Find a trusted locksmith
                <span className="block italic text-brass">near you.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-parchment-dim">
                Choose the locksmith service you need, see the standard total and scope first, then request a participating independent local provider. No mystery call-out fee added later.
              </p>

              <div className="mt-8 overflow-hidden rounded-2xl border border-sky/18 bg-surface/66 shadow-[0_20px_54px_rgba(3,18,37,0.18)]">
                <div className="border-b border-line/70 px-5 py-3 font-mono text-[10px] uppercase tracking-[.14em] text-parchment-dim">
                  Start with the service
                </div>
                <div className="divide-y divide-line/70">
                  {quickServices.map((service) => (
                    <Link
                      key={service.id}
                      href={`/book/details?service_id=${service.id}`}
                      className="group grid gap-2 px-5 py-4 transition hover:bg-surface-raised/75 sm:grid-cols-[1fr_auto] sm:items-center"
                    >
                      <span>
                        <span className="block font-semibold text-parchment">{service.title}</span>
                        <span className="mt-1 block text-xs text-parchment-dim">{service.timing}</span>
                      </span>
                      <span className="flex items-center justify-between gap-4 sm:justify-end">
                        <span className="font-display text-2xl text-brass">{formatServicePrice(service.customerPriceCents)}</span>
                        <span className="text-brass transition group-hover:translate-x-0.5" aria-hidden="true">→</span>
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-2 border-t border-line/70 px-5 py-4 text-xs text-parchment-dim sm:flex-row sm:items-center sm:justify-between">
                  <span>Provider travel/service call is included in each standard total shown.</span>
                  <Link href="/services" className="font-semibold text-parchment hover:text-brass">All services & prices →</Link>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[30px] border border-sky/18 bg-surface-raised shadow-[0_28px_70px_rgba(3,18,37,0.28)]">
              <img
                src={HERO_IMAGE}
                alt="Residential front entrance"
                width={1800}
                height={1125}
                fetchPriority="high"
                decoding="async"
                className="h-[430px] w-full object-cover sm:h-[540px]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void/95 via-void/65 to-transparent px-5 pb-5 pt-16 sm:px-6 sm:pb-6">
                <div className="max-w-md text-sm leading-6 text-parchment">
                  <strong>Platform, not the locksmith.</strong>{" "}
                  <span className="text-parchment-dim">Field work is performed by participating independent local providers.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-line/70 bg-surface/48">
          <div className="mx-auto grid max-w-[1400px] gap-5 px-6 py-6 sm:grid-cols-3 sm:px-8 lg:px-10">
            {[
              ["Price before request", "See the published standard total and scope before you continue."],
              ["Real provider acceptance", "A provider name and ETA appear only after someone accepts the request."],
              ["Extras need approval", "Additional work must be priced and approved before it starts."],
            ].map(([title, body]) => (
              <div key={title} className="py-1">
                <div className="text-sm font-semibold text-parchment">{title}</div>
                <div className="mt-1 text-sm leading-6 text-parchment-dim">{body}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="border-b border-line/70 py-16 sm:py-20">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-10">
            <div className="max-w-2xl">
              <div className="eyebrow">How Trusted Locksmith works</div>
              <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-[-.03em] text-parchment sm:text-5xl">
                Three steps. No guessing about the process.
              </h2>
            </div>
            <div className="mt-12 grid gap-8 border-t border-line/70 pt-8 md:grid-cols-3 md:gap-10">
              {STEPS.map((step) => (
                <div key={step.n}>
                  <div className="font-mono text-xs text-brass">{step.n}</div>
                  <h3 className="mt-4 font-display text-2xl text-parchment">{step.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-parchment-dim">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#c7d9ec] bg-mist py-16 text-navy-text sm:py-20">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-start lg:gap-16">
              <div className="max-w-lg">
                <div className="font-mono text-xs uppercase tracking-[.14em] text-[#7d6330]">Common locksmith prices</div>
                <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-[-.03em] text-navy-text sm:text-5xl">
                  See the price before the pressure starts.
                </h2>
                <p className="mt-5 text-base leading-7 text-[#536e8a]">
                  Published standard totals make it easier to decide before a provider is involved. If the actual job falls outside the stated scope, you approve any extra work separately.
                </p>
                <Link href="/services" className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-brass px-6 py-2.5 text-sm font-semibold text-ink shadow-[0_8px_22px_rgba(150,119,59,0.16)] transition hover:brightness-105">
                  See all services & prices
                </Link>
              </div>

              <div className="border-y border-[#c7d9ec]">
                {quickServices.map((service) => (
                  <div key={service.id} className="grid gap-3 border-b border-[#c7d9ec] py-6 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div>
                      <h3 className="font-display text-2xl text-navy-text">{service.title}</h3>
                      <p className="mt-1 text-sm text-[#536e8a]">{service.timing}</p>
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="font-display text-4xl text-[#8c6d31]">{formatServicePrice(service.customerPriceCents)}</div>
                      <Link href={`/book/details?service_id=${service.id}`} className="font-semibold text-navy-text hover:underline">Choose →</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-line/70 py-16 sm:py-20">
          <div className="mx-auto grid max-w-[1400px] gap-10 px-6 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 lg:px-10">
            <div className="max-w-xl">
              <div className="eyebrow">Trust without invented promises</div>
              <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-[-.03em] text-parchment sm:text-5xl">
                Clear rules matter more than flashy claims.
              </h2>
              <p className="mt-5 text-base leading-7 text-parchment-dim">
                Trusted Locksmith is designed to make the decision safer and easier without pretending every market has the same response time or provider availability.
              </p>
            </div>
            <div className="divide-y divide-line/70 border-y border-line/70">
              {[
                ["Provider review", "Provider information is reviewed before activation on the platform."],
                ["No fake ETA", "We show a provider identity and ETA only after a participating provider actually accepts."],
                ["Scope control", "Standard scope is visible first. Extra work requires a separate price and approval."],
              ].map(([title, body]) => (
                <div key={title} className="py-5">
                  <div className="font-semibold text-parchment">{title}</div>
                  <p className="mt-1 text-sm leading-6 text-parchment-dim">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#c7d9ec] bg-mist py-16 text-navy-text sm:py-20">
          <div className="mx-auto grid max-w-[1400px] gap-10 px-6 sm:px-8 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:gap-16 lg:px-10">
            <div className="overflow-hidden rounded-[26px] border border-[#c7d9ec] bg-white shadow-[0_22px_55px_rgba(28,65,105,0.12)]">
              <img
                src={KEY_IMAGE}
                alt="House keys near a residential entrance"
                width={1800}
                height={1125}
                loading="lazy"
                decoding="async"
                className="h-[360px] w-full object-cover sm:h-[450px]"
              />
            </div>
            <div className="max-w-xl">
              <div className="font-mono text-xs uppercase tracking-[.14em] text-[#7d6330]">Digital Access · optional</div>
              <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-[-.03em] text-navy-text sm:text-5xl">
                Before calling anyone, check the access you already have.
              </h2>
              <p className="mt-5 text-base leading-7 text-[#536e8a]">
                Membership adds Digital Access for codes, spare-key locations, trusted key holders and recovery instructions attached to the property. It is a prevention layer—not a requirement for one-off locksmith service.
              </p>
              <Link href="/digital-access" className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full border border-[#9fb5cc] px-6 py-2.5 text-sm font-semibold text-navy-text transition hover:border-[#718faa]">
                Explore Digital Access
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b border-line/70 py-14">
          <div className="mx-auto grid max-w-[1400px] gap-8 px-6 sm:px-8 md:grid-cols-2 md:gap-0 lg:px-10">
            <div className="md:border-r md:border-line/70 md:pr-10">
              <div className="eyebrow">Property managers</div>
              <h2 className="mt-3 font-display text-3xl text-parchment">Standardize lockouts and turnover rekeys.</h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-parchment-dim">Give teams a clearer service workflow without turning Trusted Locksmith into your maintenance department.</p>
              <Link href="/for-property-managers" className="mt-5 inline-flex text-sm font-semibold text-brass hover:underline">For property managers →</Link>
            </div>
            <div className="md:pl-10">
              <div className="eyebrow">Real estate professionals</div>
              <h2 className="mt-3 font-display text-3xl text-parchment">A useful move-in and closing benefit.</h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-parchment-dim">Help buyers organize access and get clearly priced locksmith help when they need it.</p>
              <Link href="/for-real-estate-agents" className="mt-5 inline-flex text-sm font-semibold text-brass hover:underline">For real estate professionals →</Link>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
            <div className="eyebrow">Need locksmith help?</div>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-[-.03em] text-parchment sm:text-5xl">
              Start with the service. See the price. Then decide.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-parchment-dim">
              No membership required. Choose the job you need and review the standard total before sending a request to participating local providers.
            </p>
            <Link href="/book" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-7 py-3 text-sm font-semibold text-ink shadow-[0_10px_28px_rgba(214,173,87,0.14)] transition hover:brightness-110">
              Find a locksmith
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
