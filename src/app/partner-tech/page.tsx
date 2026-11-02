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
      <PageHero eyebrow="For locksmith businesses" title="Your profile. Your availability." body="Choose your services and coverage, complete payout onboarding and review each job before accepting." visual={PAGE_VISUALS.providers} />

      <section className="border-b border-line/60 py-14 sm:py-16"><div className="mx-auto grid max-w-[1180px] gap-10 px-6 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:px-10"><div><div className="eyebrow">Self-serve activation</div><h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment">Get ready for requests.</h2><p className="mt-4 text-sm leading-6 text-parchment-dim">Start with your invitation link or claim your business profile.</p></div><div className="divide-y divide-line/70 border-y border-line/70">{STEPS.map(([n,title,body])=><div key={n} className="grid gap-3 py-5 sm:grid-cols-[48px_.42fr_.58fr] sm:gap-6"><div className="font-mono text-xs text-brass">{n}</div><h3 className="font-display text-xl text-parchment">{title}</h3><p className="text-sm leading-6 text-parchment-dim">{body}</p></div>)}</div></div></section>

      <section className="border-b border-line/60 py-12"><div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10"><h2 className="font-display text-3xl">Provider questions</h2><div className="mt-6 divide-y divide-line">{[
        ["Who handles bank and identity details?", "Stripe hosts payout onboarding. Trusted Locksmith keeps your connected-account identifier and readiness status; bank and routing numbers are not entered in our forms. Paid job acceptance requires payout readiness."],
        ["Which markets can I select?", "Boston and Greater Boston are the primary launch market. New York, New Jersey, Philadelphia, Connecticut and Delaware are expansion markets. Choose only the areas you serve; local eligibility requirements apply separately."],
        ["Do I have to accept every offer?", "No. Set your availability and review the scope, payout and private job terms before accepting or declining."]
      ].map(([q,a])=><details key={q} className="py-5"><summary className="cursor-pointer text-lg font-medium">{q}</summary><p className="mt-3 max-w-3xl leading-7 text-parchment-dim">{a}</p></details>)}</div></div></section>

      <section className="py-16 sm:py-20"><div className="mx-auto max-w-3xl px-6 text-center sm:px-8"><div className="eyebrow">Start with your profile</div><h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment sm:text-5xl">Ready to join?</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-parchment-dim">Use your invitation, find your profile or create an account.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/providers/claim" className="inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-7 py-3 text-sm font-semibold text-ink">Find & claim my profile</Link><Link href="/providers/register" className="inline-flex min-h-12 items-center justify-center rounded-full border border-sky/25 px-7 py-3 text-sm font-semibold text-parchment">Create provider account</Link></div><Link href="/provider" className="mt-5 inline-flex text-sm font-semibold text-parchment-dim hover:text-parchment">Provider login →</Link></div></section>
    </main><Footer /></div>
  );
}
