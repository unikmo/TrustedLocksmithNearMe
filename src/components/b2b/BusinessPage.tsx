import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/site";
import { B2B_SERVICES } from "@/lib/b2b";

type Props = { title: string; description: string; path: string; eyebrow?: string; answer: string; sections: ReadonlyArray<readonly [string, string]>; faq?: ReadonlyArray<readonly [string, string]>; children?: React.ReactNode; guide?: boolean };
export function BusinessPage({ title, description, path, eyebrow = "For property professionals", answer, sections, faq = [], children, guide = false }: Props) {
  const url = `${SITE_URL}${path}`;
  const schema = [
    { "@context": "https://schema.org", "@type": guide ? "Article" : "WebPage", "@id": `${url}#page`, url, name: title, headline: title, description, inLanguage: "en-US", isPartOf: { "@id": `${SITE_URL}/#website` }, about: { "@type": "Thing", name: title }, audience: { "@type": "Audience", audienceType: "Property managers, landlords and real-estate professionals" }, publisher: { "@id": `${SITE_URL}/#organization` }, ...(guide ? { author: { "@id": `${SITE_URL}/#organization` } } : {}) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Trusted Locksmith", item: SITE_URL }, { "@type": "ListItem", position: 2, name: title, item: url }] },
    ...(faq.length ? [{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }] : []),
  ];
  return <div className="flex min-h-screen flex-col"><a href="#main" className="sr-only focus:not-sr-only focus:bg-brass focus:p-4 focus:text-ink">Skip to content</a><Nav /><main id="main" className="flex-1">
    {schema.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s).replace(/</g, "\\u003c") }} />)}
    <section className="border-b border-line/70 py-14 sm:py-20"><div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10"><div className="eyebrow">{eyebrow}</div><h1 className="mt-5 max-w-4xl font-display text-4xl leading-tight tracking-tight sm:text-6xl">{title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-parchment-dim">{answer}</p><div className="mt-8 flex flex-wrap gap-4"><Link href="/business-enquiry" className="inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-7 py-3 font-semibold text-ink">Discuss your properties</Link><Link href="/property-manager" className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-7 py-3">Business workspace</Link></div></div></section>
    <div className="mx-auto max-w-[1180px] space-y-12 px-6 py-12 sm:px-8 sm:py-16 lg:px-10">{sections.map(([heading, body], i) => <section key={heading} className="grid gap-5 border-b border-line/60 pb-10 md:grid-cols-[.7fr_1.3fr]"><div><span className="font-mono text-xs text-brass">0{i + 1}</span><h2 className="mt-3 font-display text-3xl">{heading}</h2></div><p className="max-w-2xl leading-8 text-parchment-dim">{body}</p></section>)}{children}
    {faq.length > 0 && <section><h2 className="font-display text-3xl">Questions, answered.</h2><div className="mt-6 divide-y divide-line">{faq.map(([q, a]) => <details key={q} className="py-5"><summary className="cursor-pointer text-lg font-medium">{q}</summary><p className="mt-4 max-w-3xl leading-7 text-parchment-dim">{a}</p></details>)}</div></section>}
    <section><h2 className="font-display text-3xl">Plan the next job.</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">{Object.entries(B2B_SERVICES).map(([slug, service]) => <Link key={slug} href={`/services/${slug}`} className="rounded-2xl border border-line bg-surface p-6 transition hover:border-brass"><h3 className="text-lg font-semibold">{service.title} →</h3><p className="mt-3 text-sm leading-6 text-parchment-dim">{service.description}</p></Link>)}</div></section>
    <p className="max-w-3xl border-t border-line pt-6 text-sm leading-6 text-parchment-dim">Business customers only. Boston and Greater Boston are the primary launch market. Every address, job scope and provider must be confirmed. A request does not guarantee attendance or an emergency response time. Independent providers perform field work.</p></div>
  </main><Footer /></div>;
}
