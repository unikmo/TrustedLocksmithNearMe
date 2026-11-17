import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { B2B_SERVICES } from "@/lib/b2b";
import type { Metadata } from "next";
import { PAGE_VISUALS } from "@/lib/visuals";
export const metadata: Metadata = { title: "Trusted Locksmith | Keys Missing. Panic Optional.", description: "Clear locksmith guidance, transparent standard service prices and a no-app digital concierge. Property management services also available. Coverage and appointments require confirmation.", alternates: {canonical: "/"} }; address-specific availability.", "/");
export default function Home() { return <div className="flex min-h-screen flex-col"><a href="#main" className="sr-only focus:not-sr-only focus:bg-brass focus:p-4 focus:text-ink">Skip to content</a><Nav /><main id="main">
<section className="home-hero border-b border-line">
  <div className="home-hero__inner">
    <div className="home-hero__copy">
      <div className="eyebrow">The digital-first locksmith guide</div>
      <h1 className="home-hero__title font-display">Keys missing.<span className="block italic text-brass">Panic optional.</span></h1>
      <p className="home-hero__description text-parchment-dim">Locked out, moving in or upgrading your locks? Get clear next steps and published service prices before making a decision.</p>
      <div className="home-hero__actions">
        <Link href="/concierge" className="inline-flex min-h-11 items-center justify-center rounded-full bg-brass px-5 py-3 text-sm font-semibold text-ink">Start with digital concierge</Link>
        <Link href="/for-property-managers" className="inline-flex min-h-11 items-center justify-center rounded-full border border-line px-5 py-3 text-sm">For property managers →</Link>
      </div>
    </div>
    <div className="home-hero__media border border-line">
      <img src={PAGE_VISUALS.booking.src} alt={PAGE_VISUALS.booking.alt} width="1600" height="1100" fetchPriority="high" />
    </div>
  </div>
</section>
<section className="bg-mist py-14 text-ink"><div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10"><div className="font-mono text-xs uppercase tracking-widest text-[#7d6330]">No drama. Just better decisions.</div><h2 className="mt-4 font-display text-4xl">Lock problems happen. Clarity comes first.</h2><div className="mt-8 grid gap-7 md:grid-cols-3">{[["01", "Know your options", "Choose lockout, rekey or smart-lock guidance. No account or physical key box needed."], ["02", "Check the scope", "See standard prices and what is included, without guessing about call-out fees."], ["03", "Confirm before any work", "A request is not an appointment. Provider identity, availability, scope and price require separate confirmation."]].map(([n,h,p])=><div key={n} className="border-t border-ink/20 pt-5"><span className="font-mono text-xs">{n}</span><h3 className="mt-3 text-xl font-semibold">{h}</h3><p className="mt-3 leading-7">{p}</p></div>)}</div></div></section>
<section className="mx-auto max-w-[1180px] space-y-12 px-6 py-14 sm:px-8 lg:px-10"><div><h2 className="font-display text-4xl">For properties and the people who manage them.</h2><div className="mt-8 grid gap-5 md:grid-cols-2">{Object.entries(B2B_SERVICES).map(([slug,s])=><Link key={slug} href={`/services/${slug}`} className="rounded-2xl border border-line bg-surface p-7 hover:border-brass"><h3 className="font-display text-2xl">{s.title} →</h3><p className="mt-4 leading-7 text-parchment-dim">{s.description}</p>{["master-key-systems","access-control"].includes(slug)&&<p className="mt-4 text-xs text-brass">Planning guidance</p>}</Link>)}</div></div>
<div className="grid gap-8 border-y border-line py-10 md:grid-cols-2"><div><h2 className="font-display text-3xl">Budget before the next turnover.</h2><p className="mt-4 leading-7 text-parchment-dim">Standard rekey: $75 including the visit and first cylinder, then $29 per additional standard cylinder. Specialty work is quoted separately.</p><Link className="mt-5 inline-block text-brass underline" href="/guides/turnover-rekey-cost">Use the rekey cost calculator →</Link></div><div><h2 className="font-display text-3xl">Give every handover a checklist.</h2><p className="mt-4 leading-7 text-parchment-dim">Confirm authority, cylinder count, lawful access, key handover and completion records before closing the job.</p><Link className="mt-5 inline-block text-brass underline" href="/guides/tenant-turnover-lock-checklist">Read the turnover checklist →</Link></div></div>
<div><h2 className="font-display text-3xl">Local knowledge, not invented availability.</h2><p className="mt-4 max-w-3xl leading-7 text-parchment-dim">Start with Boston and Greater Boston. Check your property’s location before planning a visit.</p><div className="mt-6 flex flex-wrap gap-5">{[["Boston","/boston-ma"],["Cambridge","/cambridge-ma"],["Newton","/newton-ma"],["Service-area enquiries","/locations"]].map(([n,h])=><Link key={h} href={h} className="text-brass underline">{n} →</Link>)}</div></div></section>
</main><Footer /></div>; }
