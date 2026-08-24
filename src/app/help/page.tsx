import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { CTABand } from "@/components/CTABand";
import { PAGE_VISUALS } from "@/lib/visuals";

export const metadata: Metadata = {
  title: "Help Center",
  description: "Answers about Trusted Locksmith, Digital Access, locksmith requests, provider matching, membership and trusted access.",
  alternates: { canonical: "/help" },
  openGraph: { images: [PAGE_VISUALS.help.src] },
  twitter: { card: "summary_large_image", images: [PAGE_VISUALS.help.src] },
};

const SECTIONS = [
  {
    title: "Locksmith requests",
    items: [
      {
        q: "Do I need a membership to find a locksmith?",
        a: "No. One-off locksmith requests are available without membership. Trusted Locksmith shows the standard service price before you submit the request.",
      },
      {
        q: "Does submitting a request mean a locksmith is already assigned?",
        a: "No. A request is submitted first. A provider name and ETA appear only after a participating independent local provider accepts the request.",
      },
      {
        q: "Who performs the field work?",
        a: "Independent local providers perform field service. Trusted Locksmith, operated by PlanetHike OÜ, provides the platform that connects customers with participating providers and keeps the service request and pricing clear.",
      },
      {
        q: "Can a provider add charges after arriving?",
        a: "Only when the job is genuinely outside the published standard scope. Any additional work and price must be shown and approved before that additional work starts.",
      },
    ],
  },
  {
    title: "Digital Access",
    items: [
      {
        q: "What is Digital Access?",
        a: "Digital Access keeps access codes, spare-key details, trusted key holders, recovery instructions and reference photos together for the property so you can check your own backup options first.",
      },
      {
        q: "Can a trusted person see all my saved codes?",
        a: "No. A person can be recorded as holding a spare key or being able to help without automatically receiving access to your saved sensitive details.",
      },
      {
        q: "How are sensitive access details protected?",
        a: "Sensitive access details are encrypted and kept private. You control who is recorded as a trusted key holder and who is allowed to see specific Digital Access information.",
      },
    ],
  },
  {
    title: "Membership",
    items: [
      {
        q: "What does membership add?",
        a: "Membership adds Digital Access and plan-specific benefits such as household access profiles, trusted-contact capacity and, on Household+, priority matching and the included Lock & Access Audit on its stated cadence.",
      },
      {
        q: "When do field-service membership benefits begin?",
        a: "Digital Access is available with your account. Paid field-service membership benefits begin after membership activation and the waiting period shown on the pricing page. One-off locksmith service remains available separately.",
      },
      {
        q: "What happens after I create an account?",
        a: "Your selected plan is saved with the account so you can continue setup. Paid membership benefits begin only after membership activation is confirmed.",
      },
    ],
  },
];

export default function HelpCenterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <PageHero
          eyebrow="Help center"
          title="Clear answers before you find a locksmith"
          body="Understand Digital Access, local provider matching, pricing and membership in plain language."
          visual={PAGE_VISUALS.help}
        />

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6">
            {SECTIONS.map((section) => (
              <div key={section.title} className="mb-14 last:mb-0">
                <h2 className="font-display text-2xl font-medium text-parchment">{section.title}</h2>
                <div className="mt-7 space-y-6">
                  {section.items.map((item) => (
                    <div key={item.q} className="border-b border-line/70 pb-6">
                      <h3 className="font-medium text-parchment">{item.q}</h3>
                      <p className="mt-2 text-sm leading-6 text-parchment-dim">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <CTABand
          title="Still need help?"
          body="Contact us about an account, provider, privacy or general support question."
          ctaLabel="Contact Trusted Locksmith"
          ctaHref="/contact"
          secondaryLabel="View locksmith services"
          secondaryHref="/services"
        />
      </main>
      <Footer />
    </div>
  );
}
