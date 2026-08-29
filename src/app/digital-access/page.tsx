import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { PAGE_VISUALS } from "@/lib/visuals";

const metaDescription = "Keep access codes, spare-key locations and trusted key holders together so you can check backup options before an access problem becomes a locksmith request.";

export const metadata: Metadata = {
  title: "Digital Access | Codes, Spare Keys & Trusted Contacts",
  description: metaDescription,
  alternates: { canonical: "/digital-access" },
  openGraph: {
    title: "Digital Access | Your property-access backup plan",
    description: metaDescription,
    url: "/digital-access",
    images: [PAGE_VISUALS.digitalAccess.src],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Access | Your property-access backup plan",
    description: metaDescription,
    images: [PAGE_VISUALS.digitalAccess.src],
  },
};

const CHECKS = [
  ["Codes", "Keep keypad, lockbox, smart-lock recovery and garage-access details with the property."],
  ["Spare keys", "Record where a spare exists and who physically holds it."],
  ["Trusted people", "Keep the person who can help with access easy to find when you need them."],
] as const;

export default function DigitalAccessPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <PageHero
          eyebrow="Digital Access · optional"
          title="Check your backup access before you request a locksmith."
          body="Keep the few access details that matter together: codes, spare-key information and trusted people. One-off locksmith service remains available without membership."
          visual={PAGE_VISUALS.digitalAccess}
        />

        <section className="border-b border-line/70 py-14 sm:py-16">
          <div className="mx-auto grid max-w-[1080px] gap-10 px-6 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-14 lg:px-10">
            <div>
              <div className="eyebrow">Before on-site help</div>
              <h2 className="mt-3 font-display text-4xl tracking-[-.03em] text-parchment">Check three things first.</h2>
              <p className="mt-4 text-sm leading-6 text-parchment-dim">
                Digital Access is a prevention layer. If your saved backup access solves the problem, you may not need a service request at all.
              </p>
            </div>

            <div className="divide-y divide-line/70 border-y border-line/70">
              {CHECKS.map(([title, body], index) => (
                <div key={title} className="grid grid-cols-[42px_1fr] gap-4 py-5">
                  <div className="font-mono text-xs text-brass">0{index + 1}</div>
                  <div>
                    <h3 className="font-semibold text-parchment">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-parchment-dim">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#c7d9ec] bg-mist py-14 text-navy-text sm:py-16">
          <div className="mx-auto grid max-w-[1080px] gap-10 px-6 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start lg:px-10">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[.14em] text-[#7d6330]">What it looks like</div>
              <h2 className="mt-3 font-display text-4xl tracking-[-.03em]">One property. One backup-access record.</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-[#536e8a]">
                The record is private. Trusted key holders do not automatically receive access to saved codes or other sensitive details.
              </p>
              <Link href="/privacy" className="mt-5 inline-flex text-sm font-semibold text-navy-text hover:underline">Read the privacy approach →</Link>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-[#c7d9ec] bg-white shadow-[0_18px_45px_rgba(28,65,105,0.09)]" aria-label="Digital Access example">
              <div className="border-b border-[#c7d9ec] px-5 py-4">
                <div className="font-mono text-[10px] uppercase tracking-[.14em] text-[#536e8a]">Digital Access</div>
                <div className="mt-1 font-display text-xl text-navy-text">Home</div>
              </div>
              <div className="divide-y divide-[#dce7f2] px-5">
                <AccessRow label="Front door keypad" value="Saved privately" />
                <AccessRow label="Spare key" value="Trusted holder recorded" />
                <AccessRow label="Recovery instructions" value="Saved" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
            <div className="eyebrow">Choose what you need</div>
            <h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment sm:text-5xl">
              Organize backup access—or go straight to locksmith service.
            </h2>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/pricing" className="inline-flex min-h-12 items-center justify-center rounded-full border border-sky/30 px-7 py-3 text-sm font-semibold text-parchment transition hover:border-sky/55">
                Compare membership
              </Link>
              <Link href="/book" className="inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-7 py-3 text-sm font-semibold text-ink">
                Get my price →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function AccessRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-5">
      <div className="font-medium text-navy-text">{label}</div>
      <div className="text-sm text-[#536e8a]">{value}</div>
    </div>
  );
}
