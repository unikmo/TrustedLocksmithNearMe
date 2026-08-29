import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

const description =
  "How Trusted Locksmith works in Boston: choose a locksmith service, see the published standard price and scope, then send one request and wait for a real provider acceptance.";

export const metadata: Metadata = {
  title: "How Trusted Locksmith Works | Boston Locksmith Requests",
  description,
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How Trusted Locksmith works",
    description,
    url: "/how-it-works",
  },
};

const STEPS = [
  {
    id: "choose",
    n: "01",
    title: "Choose the service",
    body: "Select the locksmith job you actually need: for example a home lockout, car lockout, rekey, lock change or smart-lock installation where available.",
  },
  {
    id: "price",
    n: "02",
    title: "See the standard price and scope",
    body: "Review the published standard total and what it includes before sending the request. Provider travel/service call is included in the listed standard total.",
  },
  {
    id: "acceptance",
    n: "03",
    title: "Send the request and wait for real acceptance",
    body: "Trusted Locksmith makes the request available to participating independent providers. A provider identity and ETA appear only after a real provider accepts. Extra work requires a separate price and approval.",
  },
] as const;

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${SITE_URL}/how-it-works#process`,
  name: "How to request a locksmith through Trusted Locksmith",
  description,
  step: STEPS.map((step) => ({
    "@type": "HowToStep",
    name: step.title,
    text: step.body,
    url: `${SITE_URL}/how-it-works#${step.id}`,
  })),
};

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <Nav />
      <main className="flex-1">
        <section className="border-b border-line/70 py-16 sm:py-20">
          <div className="mx-auto max-w-[1080px] px-6 sm:px-8 lg:px-10">
            <div className="eyebrow">How Trusted Locksmith works</div>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-medium leading-[.98] tracking-[-.035em] text-parchment sm:text-6xl lg:text-[68px]">
              Price first. Request second. Provider after acceptance.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-parchment-dim">
              Trusted Locksmith is a marketplace, not the field locksmith. The process is designed so the standard price and scope are clear before you send a request to participating independent local providers.
            </p>
          </div>
        </section>

        <section className="border-b border-line/70 py-14 sm:py-16">
          <div className="mx-auto max-w-[1080px] px-6 sm:px-8 lg:px-10">
            <div className="divide-y divide-line/70 border-y border-line/70">
              {STEPS.map((step) => (
                <article id={step.id} key={step.n} className="grid gap-4 py-7 md:grid-cols-[70px_.45fr_.55fr] md:gap-8">
                  <div className="font-mono text-xs text-brass">{step.n}</div>
                  <h2 className="font-display text-2xl text-parchment">{step.title}</h2>
                  <p className="text-sm leading-6 text-parchment-dim">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#c7d9ec] bg-mist py-14 text-navy-text sm:py-16">
          <div className="mx-auto grid max-w-[1080px] gap-8 px-6 sm:px-8 md:grid-cols-2 md:gap-12 lg:px-10">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[.14em] text-[#7d6330]">Trusted Locksmith handles</div>
              <p className="mt-4 text-base leading-7 text-[#536e8a]">
                Published standard pricing and scope, the request flow, provider acceptance status and the platform record of the request.
              </p>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[.14em] text-[#7d6330]">Independent providers handle</div>
              <p className="mt-4 text-base leading-7 text-[#536e8a]">
                Accepting or declining requests, performing the field work, applying their trade judgment and explaining any additional scope before extra work begins.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
            <div className="eyebrow">Need locksmith help?</div>
            <h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment sm:text-5xl">
              Start with the service and price.
            </h2>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/book" className="inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-7 py-3 text-sm font-semibold text-ink">
                Get my price →
              </Link>
              <Link href="/services" className="inline-flex min-h-12 items-center justify-center rounded-full border border-sky/30 px-7 py-3 text-sm font-semibold text-parchment transition hover:border-sky/55">
                See all services & prices
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
