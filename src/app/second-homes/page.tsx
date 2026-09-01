import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { CTABand } from "@/components/CTABand";
import { PAGE_VISUALS } from "@/lib/visuals";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Locksmith & Access Planning for Second Homes",
  description: "Organize trusted property access, rekeys, lock changes, smart-lock setup and local locksmith requests for second homes and properties you do not occupy full-time.",
  alternates: { canonical: "/second-homes" },
  openGraph: { images: [PAGE_VISUALS.secondHomes.src] },
  twitter: { card: "summary_large_image", images: [PAGE_VISUALS.secondHomes.src] },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/second-homes#page`,
  url: `${SITE_URL}/second-homes`,
  name: "Trusted Locksmith for second homes",
  audience: { "@type": "Audience", audienceType: "Second-home and remotely managed property owners" },
  about: [
    { "@type": "Thing", name: "second-home rekeying" },
    { "@type": "Thing", name: "remote property lock changes" },
    { "@type": "Thing", name: "smart-lock installation for second homes" },
    { "@type": "Thing", name: "trusted property access planning" },
  ],
  relatedLink: [`${SITE_URL}/services`, `${SITE_URL}/digital-access`, `${SITE_URL}/landlords`],
};

const USE_CASES = [
  { title: "You are hours away", body: "Keep the people, codes and locksmith service history that matter when you cannot solve an access issue in person." },
  { title: "Guests need access", body: "Keep trusted-access information organized without turning every arrival into a search through old messages." },
  { title: "A key is lost", body: "Create a rekey or lock-change request with the property context already in one place." },
  { title: "A local person can solve it", body: "Check trusted access before escalating to a paid locksmith visit." },
];

export default function SecondHomesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <Nav />
      <main className="flex-1">
        <PageHero
          eyebrow="Trusted Locksmith for second homes"
          title="Your property still needs an access plan when you are not there"
          body="Organize the people, access information and local locksmith requests behind a second home so distance does not turn a small issue into a scramble."
          visual={PAGE_VISUALS.secondHomes}
        />
        <section className="border-b border-line/70 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {USE_CASES.map((item) => (
                <div key={item.title} className="rounded-2xl border border-line bg-surface p-6">
                  <h2 className="font-display text-xl text-parchment">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-parchment-dim">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-line/70 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="eyebrow">When access changes</div>
            <div className="mt-7 grid gap-5 md:grid-cols-3">
              <Link href="/services" className="group border-t border-line pt-5">
                <h2 className="font-display text-2xl text-parchment group-hover:text-brass">Rekey →</h2>
                <p className="mt-2 text-sm leading-6 text-parchment-dim">Reset which keys work when a key is lost or you no longer know who still holds a copy.</p>
              </Link>
              <Link href="/services" className="group border-t border-line pt-5">
                <h2 className="font-display text-2xl text-parchment group-hover:text-brass">Lock change →</h2>
                <p className="mt-2 text-sm leading-6 text-parchment-dim">Replace hardware when the current lock is damaged, unsuitable or no longer fits the access plan.</p>
              </Link>
              <Link href="/digital-access" className="group border-t border-line pt-5">
                <h2 className="font-display text-2xl text-parchment group-hover:text-brass">Smart access →</h2>
                <p className="mt-2 text-sm leading-6 text-parchment-dim">Pair compatible smart-lock setup with organized recovery instructions, codes and trusted-access information.</p>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="eyebrow">A better default</div>
            <h2 className="mt-3 font-display text-3xl text-parchment">Trusted access first. Local locksmith when you still need one.</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-parchment-dim">Digital Access can help owners avoid unnecessary service visits when a trusted local contact or registered access method can solve the problem immediately.</p>
          </div>
        </section>
        <CTABand
          title="Set up the access layer around your second home"
          body="Start with Digital Access, or use clearly priced locksmith service when you need a rekey, lock change or on-site help."
          ctaLabel="Explore Digital Access"
          ctaHref="/digital-access"
          secondaryLabel="See locksmith services"
          secondaryHref="/services"
        />
      </main>
      <Footer />
    </div>
  );
}
