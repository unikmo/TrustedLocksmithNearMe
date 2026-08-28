import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { PAGE_VISUALS } from "@/lib/visuals";

const metaDescription = "Join the Trusted Locksmith Provider Network in Greater Boston. Review clearly scoped local requests and private job terms, control your availability, and accept only the requests you want.";

export const metadata: Metadata = {
  title: "Boston Locksmith Provider Network | Local Job Requests",
  description: metaDescription,
  alternates: { canonical: "/partner-tech" },
  openGraph: {
    title: "Boston locksmith provider network | Local requests, clear terms",
    description: metaDescription,
    url: "/partner-tech",
    images: [PAGE_VISUALS.providers.src],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boston locksmith provider network | Local requests, clear terms",
    description: metaDescription,
    images: [PAGE_VISUALS.providers.src],
  },
};

export default function PartnerTechPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <PageHero
          eyebrow="For Greater Boston locksmith businesses"
          title="Local requests. Clear details. You decide what to accept."
          body="Trusted Locksmith is building the Boston provider side around a simple rule: you should see the request and private commercial terms before you commit to the job."
          visual={PAGE_VISUALS.providers}
        />

        <section className="border-b border-line/60 py-14 sm:py-16">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-6 sm:px-8 lg:grid-cols-[.78fr_1.22fr] lg:items-start lg:px-10">
            <div className="max-w-md">
              <div className="eyebrow">Why join</div>
              <h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment">Less ambiguity before you say yes.</h2>
            </div>
            <div className="divide-y divide-line/70 border-y border-line/70">
              {[
                ["Clear request scope", "See the service type, location context and expected scope before deciding whether the request fits your business."],
                ["Control your availability", "Turn availability on or off and accept or decline requests according to your schedule and capabilities."],
                ["Private job terms", "Job-specific compensation and acceptance terms stay inside the provider workflow rather than being advertised publicly."],
              ].map(([title, body]) => (
                <div key={title} className="py-5">
                  <h3 className="font-semibold text-parchment">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-parchment-dim">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#c7d9ec] bg-mist py-14 text-navy-text sm:py-16">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-6 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:items-start lg:px-10">
            <div>
              <div className="font-mono text-xs uppercase tracking-[.14em] text-[#7d6330]">How joining works</div>
              <h2 className="mt-3 font-display text-4xl tracking-[-.03em]">Three steps to the provider dashboard.</h2>
            </div>
            <div className="divide-y divide-[#c7d9ec] border-y border-[#c7d9ec]">
              {[
                ["01", "Claim or create the business profile", "Use an existing Greater Boston profile where one exists, or register a new provider account."],
                ["02", "Confirm the business connection", "Trusted Locksmith reviews the provider account's connection to the business profile before that profile can receive requests."],
                ["03", "Review requests privately", "Once activated, use the provider dashboard to control availability and review individual offers before accepting."],
              ].map(([n, title, body]) => (
                <div key={n} className="grid grid-cols-[42px_1fr] gap-4 py-5">
                  <div className="font-mono text-xs text-[#8c6d31]">{n}</div>
                  <div><h3 className="font-semibold text-navy-text">{title}</h3><p className="mt-1 text-sm leading-6 text-[#536e8a]">{body}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-line/60 py-14 sm:py-16">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10">
            <div className="rounded-[28px] border border-brass/25 bg-brass/[.07] p-7 sm:p-9">
              <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="max-w-2xl">
                  <div className="eyebrow">Provider verification boundary</div>
                  <h2 className="mt-3 font-display text-3xl tracking-[-.02em] text-parchment sm:text-4xl">Business-claim approval has a specific meaning.</h2>
                  <p className="mt-4 text-sm leading-6 text-parchment-dim">Claim approval means Trusted Locksmith has reviewed the provider account's connection to the business profile. It does not by itself represent completion of every credential, insurance, licensing or KYC requirement that may apply to unrestricted paid launch.</p>
                </div>
                <Link href="/trust-safety" className="text-sm font-semibold text-brass hover:underline">Trust & safety →</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
            <div className="eyebrow">Ready to join?</div>
            <h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment sm:text-5xl">Start with your business profile.</h2>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/providers/claim" className="inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-7 py-3 text-sm font-semibold text-ink">Claim an existing profile</Link>
              <Link href="/providers/register" className="inline-flex min-h-12 items-center justify-center rounded-full border border-sky/25 px-7 py-3 text-sm font-semibold text-parchment transition hover:border-sky/50">Register a new business</Link>
            </div>
            <Link href="/provider" className="mt-5 inline-flex text-sm font-semibold text-parchment-dim hover:text-parchment">Provider login →</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
