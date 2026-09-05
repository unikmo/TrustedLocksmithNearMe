import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { CTABand } from "@/components/CTABand";
import { PAGE_VISUALS } from "@/lib/visuals";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trust & Safety",
  description: "How Trusted Locksmith reviews provider information, protects access details and keeps pricing and service status clear before work begins.",
  alternates: { canonical: "/trust-safety" },
  openGraph: { images: [PAGE_VISUALS.trust.src] },
  twitter: { card: "summary_large_image", images: [PAGE_VISUALS.trust.src] },
};

const PILLARS = [
  {
    title: "Business-profile connection is reviewed",
    body: "Before a provider profile can receive requests, Trusted Locksmith reviews the provider account's connection to that business profile. A business-claim approval does not by itself represent every credential, insurance, licensing or KYC check that may be required for launch.",
  },
  {
    title: "Provider details appear after acceptance",
    body: "A provider name or ETA is shown only after a participating provider has actually accepted your request. Availability is never presented as guaranteed in advance.",
  },
  {
    title: "Price and scope stay clear",
    body: "The standard service price and included scope are shown before you submit a request. Any additional work requires a separate price and your approval before it begins.",
  },
  {
    title: "Access information stays private",
    body: "Digital Access details are kept private and encrypted. Trusted key holders do not automatically receive access to your saved codes or other sensitive information.",
  },
];

const FAQ = [
  {
    q: "Does Trusted Locksmith employ the locksmith?",
    a: "No. Trusted Locksmith is a platform operated by TSquare Ventures LLC. Participating locksmith providers are independent businesses or professionals, not TSquare Ventures LLC employees.",
  },
  {
    q: "What does a verified business claim mean?",
    a: "It means Trusted Locksmith has reviewed the provider account's connection to the business profile. It should not be read as a blanket claim that every possible credential, insurance, licensing or KYC requirement has been completed.",
  },
  {
    q: "Can a locksmith request be unavailable?",
    a: "Yes. Local provider availability varies by location and time. Your request is confirmed with a specific provider only after that provider accepts it.",
  },
  {
    q: "What happens if the job needs extra work?",
    a: "The provider must explain any work outside the published standard scope and show the additional price before that work begins. You decide whether to approve it.",
  },
  {
    q: "Is membership insurance?",
    a: "No. Trusted Locksmith membership is a service-platform membership and is not a substitute for property, renters or auto insurance.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/trust-safety#faq`,
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function TrustSafetyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />
      <main className="flex-1">
        <PageHero
          eyebrow="Trust & safety"
          title="Know who is coming, what the job costs and what you are approving."
          body="Trusted Locksmith is designed to make the most important parts of a locksmith request clear before anyone starts work."
          visual={PAGE_VISUALS.trust}
        />
        <section className="border-b border-line/70 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {PILLARS.map((pillar) => (
                <div key={pillar.title} className="border-t border-line pt-5">
                  <h2 className="font-display text-2xl text-parchment">{pillar.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-parchment-dim">{pillar.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <div className="eyebrow text-center">Common questions</div>
            <h2 className="mt-3 text-center font-display text-3xl text-parchment">Trust should be easy to understand.</h2>
            <div className="mt-10 space-y-6">
              {FAQ.map((item) => (
                <div key={item.q} className="border-b border-line/70 pb-6">
                  <h3 className="font-medium text-parchment">{item.q}</h3>
                  <p className="mt-2 text-sm leading-6 text-parchment-dim">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <CTABand
          title="Have a trust or safety concern?"
          body="Contact Trusted Locksmith about a provider, request, account, privacy or safety concern."
          ctaLabel="Contact Trusted Locksmith"
          ctaHref="/contact?topic=Trust%20%26%20safety"
        />
      </main>
      <Footer />
    </div>
  );
}
