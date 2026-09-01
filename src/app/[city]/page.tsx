import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalCityPage } from "@/components/LocalLocksmithPage";
import { NewYorkLocalPage } from "@/components/NewYorkLocalPage";
import { MA_CITIES, MA_SERVICE_CONTENT, getMaCity } from "@/lib/massachusetts-seo";
import { NY_AREAS, getNyArea } from "@/lib/new-york-seo";
import { SITE, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...MA_CITIES.map((city) => ({ city: city.slug })),
    ...NY_AREAS.map((area) => ({ city: area.slug })),
  ];
}

function nyTitle(area: NonNullable<ReturnType<typeof getNyArea>>) {
  if (area.slug === "new-york-ny") return "Locksmith NYC | Upfront Standard Prices";
  if (area.kind === "neighborhood") return `Locksmith ${area.name} NYC | Upfront Standard Prices`;
  return `Locksmith ${area.name} NY | Upfront Standard Prices`;
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params;
  const maCity = getMaCity(citySlug);
  if (maCity) {
    const title = `${maCity.name}, MA Locksmith | Upfront Prices`;
    const description = `Find a trusted locksmith in ${maCity.name}, Massachusetts for lockouts, rekeys, lock changes and smart-lock installation. See standard prices before you request service.`;
    const canonical = `${SITE_URL}/${maCity.slug}`;
    return {
      title,
      description,
      alternates: { canonical },
      openGraph: { title, description, url: canonical, type: "website", siteName: SITE.brandName },
      twitter: { card: "summary_large_image", title, description },
    };
  }

  const nyArea = getNyArea(citySlug);
  if (!nyArea) return {};

  const title = nyTitle(nyArea);
  const description = `Locksmith requests in ${nyArea.shortLocation}: see published standard prices and scope before requesting a participating independent provider. Local availability depends on actual provider acceptance.`;
  const canonical = `${SITE_URL}/${nyArea.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", siteName: SITE.brandName },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function LocalAreaPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const maCity = getMaCity(citySlug);

  if (maCity) {
    const url = `${SITE_URL}/${maCity.slug}`;
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${url}#page`,
        name: `Locksmith in ${maCity.name}, Massachusetts`,
        url,
        description: `Trusted Locksmith local service information for ${maCity.name}, Massachusetts, including lockouts, rekeys, lock changes and smart-lock installation.`,
        isPartOf: { "@type": "WebSite", name: SITE.brandName, url: SITE_URL },
        about: { "@type": "Thing", name: `Locksmith services in ${maCity.name}, Massachusetts` },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE.brandName, item: SITE_URL },
          { "@type": "ListItem", position: 2, name: `${maCity.name}, MA locksmith`, item: url },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `Locksmith services in ${maCity.name}, Massachusetts`,
        itemListElement: maCity.services.map((slug, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: MA_SERVICE_CONTENT[slug].shortTitle,
          url: `${url}/${slug}`,
        })),
      },
    ];

    return (
      <>
        {schemas.map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
        <LocalCityPage city={maCity} />
      </>
    );
  }

  const nyArea = getNyArea(citySlug);
  if (!nyArea) notFound();

  const url = `${SITE_URL}/${nyArea.slug}`;
  const parent = nyArea.parent ? getNyArea(nyArea.parent) : null;
  const breadcrumbs = [
    { "@type": "ListItem", position: 1, name: SITE.brandName, item: SITE_URL },
    ...(parent
      ? [{ "@type": "ListItem", position: 2, name: parent.name, item: `${SITE_URL}/${parent.slug}` }]
      : []),
    {
      "@type": "ListItem",
      position: parent ? 3 : 2,
      name: `${nyArea.name}, NY locksmith`,
      item: url,
    },
  ];
  const spatialType = nyArea.kind === "neighborhood" ? "Place" : nyArea.kind === "city" ? "City" : "AdministrativeArea";

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#page`,
      name: `Locksmith in ${nyArea.shortLocation}`,
      url,
      description: nyArea.localContext,
      isPartOf: { "@type": "WebSite", name: SITE.brandName, url: SITE_URL },
      about: {
        "@type": "Thing",
        name: `Locksmith services in ${nyArea.shortLocation}`,
        description: nyArea.searchIntent,
      },
      spatialCoverage: {
        "@type": spatialType,
        name: nyArea.shortLocation,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `Standard locksmith services for ${nyArea.shortLocation}`,
      itemListElement: [
        "Home lockout",
        "Car lockout",
        "Rekey locks",
        "Lock change",
        "Smart lock installation",
      ].map((name, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        url: index === 0 ? `${SITE_URL}/book` : `${SITE_URL}/services`,
      })),
    },
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <NewYorkLocalPage area={nyArea} />
    </>
  );
}
