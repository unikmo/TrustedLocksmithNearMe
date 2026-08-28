import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { PAGE_VISUALS } from "@/lib/visuals";

const metaDescription = "Join the Trusted Locksmith Provider Network as an independent local locksmith. Receive clearly scoped local requests, control your availability and review job terms privately before accepting.";

export const metadata: Metadata = {
  title: "Provider Network | Local Locksmith Opportunities",
  description: metaDescription,
  alternates: { canonical: "/partner-tech" },
  openGraph: {
    title: "Trusted Locksmith Provider Network | Local requests, clear terms",
    description: metaDescription,
    url: "/partner-tech",
    images: [PAGE_VISUALS.providers.src],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trusted Locksmith Provider Network | Local requests, clear terms",
    description: metaDescription,
    images: [PAGE_VISUALS.providers.src],
  },
};

const BENEFITS = [
  {
    n: "01",
    title: "Clearly scoped requests",
    body: "See the service type, location context and expected scope before deciding whether a request fits your business.",
  },
  {
    n: "02",
    title: "You stay in control",
    body: "Set your service area and availability, then accept or decline requests according to your schedule and capabilities.",
  },
  {
    n: "03",
    title: "Private commercial terms",
    body: "Job-specific compensation and acceptance terms are shown only inside the provider workflow after profile activation—not on the public marketplace.",
  },
];

const STEPS = [
  ["1", "Create or claim your business profile", "Register a new business or claim an existing profile built from public business information."],
  ["2", "Confirm your business connection", "Trusted Locksmith reviews the provider account's connection to the business profile before that profile can receive requests."],
  ["3", "Review requests privately", "Once the profile is activated, use your provider dashboard to manage availability and review individual job offers before accepting."],
] as const;

export default function PartnerTechPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <PageHero
          eyebrow="Trusted Locksmith Provider Network"
          title="Local locksmith requests. Your schedule. Your decision."
          body="Trusted Locksmith connects customers with independent local providers through a structured request flow. You decide when you are available and which jobs you accept."
          visual={PAGE_VISUALS.providers}
        />

        <section className="border-b border-line/70 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-6 md:grid-cols-3">
              {BENEFITS.map((item) => (
                <div key={item.n} className="border-t border-line pt-5">
                  <div className="font-mono text-xs text-brass">{item.n}</div>
                  <h2 className="mt-3 font-display text-2xl text-parchment">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-parchment-dim">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/providers/claim" className="inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-6 py-3 text-sm font-semibold text-ink">
                Claim an existing profile
              </Link>
              <Link href="/providers/register" className="inline-flex min-h-12 items-center justify-center rounded-full border border-sky/30 bg-surface/35 px-6 py-3 text-sm font-semibold text-parchment hover:border-sky/55">
                Register a new business
              </Link>
              <Link href="/provider" className="inline-flex min-h-12 items-center justify-center px-4 py-3 text-sm font-semibold text-parchment-dim hover:text-parchment">
                Provider login →
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b border-[#c7d9ec] bg-mist py-16 text-navy-text sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
            <div>
              <div className="font-mono text-xs uppercase tracking-[.14em] text-[#7d6330]">How joining works</div>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-[-.025em] text-navy-text">A professional network starts with a real business connection.</h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#536e8a]">
                Customers should know that the provider account is connected to the business profile. Providers should know the job details before they commit. The network is designed around both expectations.
              </p>
            </div>
            <div className="divide-y divide-[#c7d9ec] border-y border-[#c7d9ec]">
              {STEPS.map(([n, title, body]) => (
                <div key={n} className="grid grid-cols-[42px_1fr] gap-4 py-5">
                  <div className="font-mono text-xs text-[#8c6d31]">0{n}</div>
                  <div>
                    <h3 className="font-semibold text-navy-text">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#536e8a]">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="eyebrow">Provider standards</div>
            <h2 className="mt-3 font-display text-3xl text-parchment sm:text-4xl">A verified business claim has a specific meaning.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-parchment-dim">
              Claim approval means Trusted Locksmith has reviewed the provider account's connection to the business profile. It does not by itself represent every credential, insurance, licensing or KYC requirement that may be required for unrestricted paid launch.
            </p>
            <Link href="/providers/register" className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-brass px-6 py-2.5 text-sm font-semibold text-ink">Join Trusted Locksmith</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
