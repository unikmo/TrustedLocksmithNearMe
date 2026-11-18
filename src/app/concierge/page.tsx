import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Digital Locksmith Concierge | Clear Next Steps",
  description: "A quick, no-app guide to lockouts, rekeying and smart-lock questions. Learn what to check, view published prices and contact Trusted Locksmith without promising instant dispatch.",
  alternates: {canonical: "/concierge"}
};

const options = [
 { title: "I'm locked out", description: "First, check lawful access via a trusted key holder or building contact. If a locksmith is needed, scope and timing must be confirmed.", subject: "Lockout guidance enquiry", id: "lockout"},
 { title: "I need keys or a rekey", description: "Ask whether the existing cylinder can be rekeyed before replacing the lock. Have the number of cylinders and your location ready.", subject: "Rekey guidance enquiry", id: "rekey"},
 { title: "I want a smarter lock", description: "Check door compatibility, access method and backup entry before buying hardware.", subject: "Smart lock guidance enquiry", id: "smart-lock"}
];
export default async function Concierge({searchParams}:{searchParams: Promise<{need?: string}>}) {
 const {need} = await searchParams;
 return <div className="flex min-h-screen flex-col"><Nav/><main className="flex-1">
  <section className="mx-auto max-w-[1000px] px-6 py-14 sm:px-8">
   <div className="eyebrow">Digital concierge · No app, no boxes</div>
   <h1 className="mt-4 max-w-3xl font-display text-5xl tracking-tight sm:text-6xl">Door trouble? Start here.</h1>
   <p className="mt-5 max-w-2xl text-lg leading-8 text-parchment-dim">Choose what you need. We will help you understand the options before you request any work.</p>
   <div className="mt-10 grid gap-4 md:grid-cols-3">
    {options.map(item=><article key={item.id} className={`rounded-2xl border p-6 ${need===item.id?"border-brass bg-surface-raised":"border-line bg-surface"}`}>
      <h2 className="font-display text-2xl">{item.title}</h2><p className="mt-3 min-h-28 text-sm leading-6 text-parchment-dim">{item.description}</p>
      <a className="inline-flex min-h-11 items-center rounded-full bg-brass px-4 py-2.5 text-sm font-semibold text-ink" href={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent(item.subject)}&body=${encodeURIComponent("My city/ZIP: \nMy question (no access codes or sensitive documents): \n")}`}>Email the concierge →</a>
    </article>)}
   </div>
   <div className="mt-9 rounded-xl border border-line p-5 text-sm leading-7 text-parchment-dim">
     <strong className="text-parchment">Important:</strong> Email is not monitored as an emergency dispatch service. Do not assume a provider or appointment is confirmed. For urgent safety or medical emergencies, contact local emergency services. Never send door codes, spare-key locations or identity documents in an initial enquiry.
   </div>
   <div className="mt-10 flex flex-wrap gap-6 text-sm"><Link href="/services" className="text-brass underline">Services &amp; published scope →</Link><Link href="/for-property-managers" className="text-brass underline">Property business help →</Link><Link href="/trust-safety" className="text-brass underline">How provider verification works →</Link></div>
  </section>
 </main><Footer/></div>;
}
