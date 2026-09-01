import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { PAGE_VISUALS } from "@/lib/visuals";

const metaDescription = "Claim your Trusted Locksmith provider profile, choose the services and locations you cover, complete Stripe-hosted payout onboarding, and control when you accept job offers.";

export const metadata: Metadata = {
  title: "Locksmith Provider Network | Claim & Activate Your Profile",
  description: metaDescription,
  alternates: { canonical: "/partner-tech" },
  openGraph: { title: "Trusted Locksmith provider network", description: metaDescription, url: "/partner-tech", images: [PAGE_VISUALS.providers.src] },
  twitter: { card: "summary_large_image", title: "Trusted Locksmith provider network", description: metaDescription, images: [PAGE_VISUALS.providers.src] },
};

const STEPS = [
  ["01", "Claim your business profile", "Use the secure invitation sent to your verified business email, or find your profile directly. Matching invited claims are linked automatically; exception cases can still be reviewed."],
  ["02", "Choose services and coverage", "Select the locksmith jobs you want and the locations you are willing to serve."],
  ["03", "Complete secure payout onboarding", "Stripe collects the business, identity and bank payout information it requires. Trusted Locksmith does not collect bank account or routing numbers in its own forms."],
  ["04", "Turn availability on when you want work", "Once your profile is payout-ready, you control whether you are available for new offers."],
  ["05", "Review each offer before accepting", "See the service scope, local request context, payout and private job terms before you accept or decline."],
] as const;

export default function PartnerTechPage() {
  return (
    <div className="flex min-h-screen flex-col"><Nav /><main className="flex-1">
      <PageHero eyebrow="For locksmith businesses" title="Claim your profile. Set up payouts securely. Accept only the jobs you want." body="Trusted Locksmith is building a self-serve provider network around clear requests, private commercial terms, provider-controlled availability and Stripe-hosted payout onboarding." visual={PAGE_VISUALS.providers} />

      <section className="border-b border-line/60 py-14 sm:py-16"><div className="mx-auto grid max-w-[1180px] gap-10 px-6 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:px-10"><div><div className="eyebrow">Self-serve activation</div><h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment">From public profile to payout-ready provider without a routine admin queue.</h2><p className="mt-4 text-sm leading-6 text-parchment-dim">The secure invitation path verifies the business-email connection automatically. Manual review is kept only for claims that cannot be verified through that path.</p></div><div className="divide-y divide-line/70 border-y border-line/70">{STEPS.map(([n,title,body])=><div key={n} className="grid gap-3 py-5 sm:grid-cols-[48px_.42fr_.58fr] sm:gap-6"><div className="font-mono text-xs text-brass">{n}</div><h3 className="font-display text-xl text-parchment">{title}</h3><p className="text-sm leading-6 text-parchment-dim">{body}</p></div>)}</div></div></section>

      <section className="border-b border-[#c7d9ec] bg-mist py-14 text-navy-text sm:py-16"><div className="mx-auto grid max-w-[1180px] gap-10 px-6 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start lg:px-10"><div><div className="font-mono text-[10px] uppercase tracking-[.14em] text-[#7d6330]">Payout privacy</div><h2 className="mt-3 font-display text-4xl tracking-[-.03em]">Your bank details stay with Stripe.</h2><p className="mt-4 max-w-xl text-sm leading-6 text-[#536e8a]">Trusted Locksmith creates and tracks the connected provider account, but payout onboarding itself is hosted by Stripe. We store only the account identifier and readiness state needed for marketplace operations.</p></div><div className="divide-y divide-[#c7d9ec] border-y border-[#c7d9ec]">{[["Trusted Locksmith stores","Provider profile, chosen services/areas, Stripe connected-account ID, payout-readiness flags and job activity."],["Stripe handles","Identity/business verification plus the financial account details needed to send payouts."],["Activation rule","Paid job acceptance stays locked until the connected account reports payout readiness."]].map(([title,body])=><div key={title} className="py-5"><h3 className="font-semibold text-navy-text">{title}</h3><p className="mt-1 text-sm leading-6 text-[#536e8a]">{body}</p></div>)}</div></div></section>

      <section className="border-b border-line/60 py-14 sm:py-16"><div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10"><div className="eyebrow">Market status</div><div className="mt-6 grid gap-5 md:grid-cols-2"><div className="border-t border-line pt-5"><h2 className="font-display text-2xl text-parchment">Boston & Greater Boston</h2><p className="mt-3 text-sm leading-6 text-parchment-dim">Primary launch market. Providers can select the Massachusetts locations they actually cover rather than being treated as available everywhere.</p></div><div className="border-t border-line pt-5"><h2 className="font-display text-2xl text-parchment">New York</h2><p className="mt-3 text-sm leading-6 text-parchment-dim">Expansion market. Providers can select New York City, borough, neighborhood and selected New York State coverage areas as relevant to their business.</p></div></div></div></section>

      <section className="border-b border-line/60 py-14 sm:py-16"><div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10"><div className="grid gap-6 md:grid-cols-3">{[["Clear scope","Review the service type and expected scope before accepting."],["Private payout terms","See the provider payout inside the authenticated job-offer workflow."],["Your availability","Pause or resume availability instead of being treated as permanently on-call."]].map(([title,body])=><div key={title} className="border-t border-line pt-5"><h2 className="font-display text-2xl text-parchment">{title}</h2><p className="mt-3 text-sm leading-6 text-parchment-dim">{body}</p></div>)}</div></div></section>

      <section className="py-16 sm:py-20"><div className="mx-auto max-w-3xl px-6 text-center sm:px-8"><div className="eyebrow">Start with your profile</div><h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment sm:text-5xl">Already received an invitation? Use that link for the fastest claim.</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-parchment-dim">Otherwise, find your existing business profile or create a provider account. No bank information is requested on the claim form.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/providers/claim" className="inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-7 py-3 text-sm font-semibold text-ink">Find & claim my profile</Link><Link href="/providers/register" className="inline-flex min-h-12 items-center justify-center rounded-full border border-sky/25 px-7 py-3 text-sm font-semibold text-parchment">Create provider account</Link></div><Link href="/provider" className="mt-5 inline-flex text-sm font-semibold text-parchment-dim hover:text-parchment">Provider login →</Link></div></section>
    </main><Footer /></div>
  );
}
