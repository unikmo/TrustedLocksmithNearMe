import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalCityPage } from "@/components/LocalLocksmithPage";
import { MA_CITIES, getMaCity } from "@/lib/massachusetts-seo";
import { SITE, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return MA_CITIES.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getMaCity(citySlug);
  if (!city) return {};

  const title = `${city.name}, MA Locksmith | Upfront Prices`;
  const description = `Find a trusted locksmith in ${city.name}, Massachusetts for lockouts, rekeys, lock changes and smart-lock installation. See standard prices before you request service.`;
  const canonical = `${SITE_URL}/${city.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: SITE.brandName,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function MassachusettsCityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = getMaCity(citySlug);
  if (!city) notFound();

  const url = `${SITE_URL}/${city.slug}`;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `Locksmith in ${city.name}, Massachusetts`,
      url,
      description: `Trusted Locksmith local service information for ${city.name}, Massachusetts, including lockouts, rekeys, lock changes and smart-lock installation.`,
      isPartOf: { "@type": "WebSite", name: SITE.brandName, url: SITE_URL },
      about: { "@type": "Thing", name: `Locksmith services in ${city.name}, Massachusetts` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE.brandName, item: SITE_URL },
        { "@type": "ListItem", position: 2, name: `${city.name}, MA locksmith`, item: url },
      ],
    },
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <LocalCityPage city={city} />
    </>
  );
}
