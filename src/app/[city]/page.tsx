import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalCityPage } from "@/components/HyperLocalMassachusettsPage";
import { NewYorkLocalPage } from "@/components/HyperLocalNewYorkPage";
import { NortheastLocalPage } from "@/components/HyperLocalNortheastPage";
import { MA_CITIES, MA_SERVICE_CONTENT, getMaCity } from "@/lib/massachusetts-seo";
import { NY_AREAS, getNyArea } from "@/lib/new-york-seo";
import { NY_SERVICE_DEFINITIONS, getNyServicesForArea } from "@/lib/new-york-services";
import { NORTHEAST_AREAS, getNortheastArea } from "@/lib/northeast-seo";
import { getLocalHeroImage } from "@/lib/local-image";
import { getWikipediaTitle } from "@/lib/local-page-personality";
import { SITE, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

const NORTHEAST_NON_CITY_SLUGS = new Set([
  "toms-river-nj", "edison-nj", "teaneck-nj", "north-bergen-nj", "hamilton-nj", "cherry-hill-nj",
  "north-brunswick-nj", "morristown-nj", "union-nj", "fairfield-ct", "west-hartford-ct", "greenwich-ct",
  "hamden-ct", "middletown-de",
]);

export function generateStaticParams() {
  return [
    ...MA_CITIES.map((city) => ({ city: city.slug })),
    ...NY_AREAS.map((area) => ({ city: area.slug })),
    ...NORTHEAST_AREAS.map((area) => ({ city: area.slug })),
  ];
}

function nyTitle(area: NonNullable<ReturnType<typeof getNyArea>>) {
  if (area.slug === "new-york-ny") return "Locksmith NYC | Upfront Standard Prices";
  if (area.kind === "neighborhood") return `Locksmith ${area.name} NYC | Upfront Standard Prices`;
  return `Locksmith ${area.name} NY | Upfront Standard Prices`;
}

function northeastSpatialType(area: NonNullable<ReturnType<typeof getNortheastArea>>) {
  if (area.kind === "neighborhood" || area.kind === "township" || NORTHEAST_NON_CITY_SLUGS.has(area.slug)) return "Place";
  return "City";
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params;
  const maCity = getMaCity(citySlug);
  if (maCity) {
    const title = `${maCity.name}, MA Locksmith | Upfront Prices`;
    const description = `Locksmith help in ${maCity.name}, Massachusetts, including ${maCity.areas.slice(0, 3).join(", ")}. See standard prices before you request service.`;
    const canonical = `${SITE_URL}/${maCity.slug}`;
    return { title, description, alternates: { canonical }, openGraph: { title, description, url: canonical, type: "website", siteName: SITE.brandName }, twitter: { card: "summary_large_image", title, description } };
  }

  const nyArea = getNyArea(citySlug);
  if (nyArea) {
    const title = nyTitle(nyArea);
    const description = `Locksmith requests in ${nyArea.shortLocation}, including ${nyArea.areas.slice(0, 3).join(", ")}. See published standard prices before requesting a participating independent provider.`;
    const canonical = `${SITE_URL}/${nyArea.slug}`;
    return { title, description, alternates: { canonical }, openGraph: { title, description, url: canonical, type: "website", siteName: SITE.brandName }, twitter: { card: "summary_large_image", title, description } };
  }

  const area = getNortheastArea(citySlug);
  if (!area) return {};
  const title = `Locksmith ${area.name} | Upfront Standard Prices`;
  const description = `Locksmith requests in ${area.shortLocation}, including ${area.areas.slice(0, 3).join(", ")}. See published standard prices and use the exact address for local matching.`;
  const canonical = `${SITE_URL}/${area.slug}`;
  return { title, description, alternates: { canonical }, openGraph: { title, description, url: canonical, type: "website", siteName: SITE.brandName }, twitter: { card: "summary_large_image", title, description } };
}

export default async function LocalAreaPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const maCity = getMaCity(citySlug);

  if (maCity) {
    const url = `${SITE_URL}/${maCity.slug}`;
    const heroImage = await getLocalHeroImage({ title: getWikipediaTitle({ slug: maCity.slug, name: maCity.name, kind: "massachusetts" }), placeName: `${maCity.name}, Massachusetts` });
    const schemas = [
      { "@context": "https://schema.org", "@type": "WebPage", "@id": `${url}#page`, name: `Locksmith in ${maCity.name}, Massachusetts`, url, description: `Local locksmith information for ${maCity.name}, including ${maCity.areas.slice(0, 4).join(", ")}.`, isPartOf: { "@type": "WebSite", name: SITE.brandName, url: SITE_URL }, about: { "@type": "Thing", name: `Locksmith services in ${maCity.name}, Massachusetts` } },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: SITE.brandName, item: SITE_URL }, { "@type": "ListItem", position: 2, name: `${maCity.name}, MA locksmith`, item: url }] },
      { "@context": "https://schema.org", "@type": "ItemList", name: `Locksmith services in ${maCity.name}, Massachusetts`, itemListElement: maCity.services.map((slug, index) => ({ "@type": "ListItem", position: index + 1, name: MA_SERVICE_CONTENT[slug].shortTitle, url: `${url}/${slug}` })) },
    ];
    return <>{schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}<LocalCityPage city={maCity} heroImage={heroImage} /></>;
  }

  const nyArea = getNyArea(citySlug);
  if (nyArea) {
    const url = `${SITE_URL}/${nyArea.slug}`;
    const parent = nyArea.parent ? getNyArea(nyArea.parent) : null;
    const localServices = getNyServicesForArea(nyArea.slug);
    const heroImage = await getLocalHeroImage({ title: getWikipediaTitle({ slug: nyArea.slug, name: nyArea.name, kind: "new-york" }), placeName: nyArea.shortLocation });
    const spatialType = nyArea.kind === "neighborhood" ? "Place" : nyArea.kind === "city" ? "City" : "AdministrativeArea";
    const breadcrumbs = [{ "@type": "ListItem", position: 1, name: SITE.brandName, item: SITE_URL }, ...(parent ? [{ "@type": "ListItem", position: 2, name: parent.name, item: `${SITE_URL}/${parent.slug}` }] : []), { "@type": "ListItem", position: parent ? 3 : 2, name: `${nyArea.name}, NY locksmith`, item: url }];
    const schemas = [
      { "@context": "https://schema.org", "@type": "WebPage", "@id": `${url}#page`, name: `Locksmith in ${nyArea.shortLocation}`, url, description: nyArea.localContext, isPartOf: { "@type": "WebSite", name: SITE.brandName, url: SITE_URL }, about: { "@type": "Thing", name: `Locksmith services in ${nyArea.shortLocation}`, description: nyArea.searchIntent }, spatialCoverage: { "@type": spatialType, name: nyArea.shortLocation } },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: breadcrumbs },
      { "@context": "https://schema.org", "@type": "ItemList", name: `Dedicated locksmith service pages for ${nyArea.shortLocation}`, itemListElement: localServices.map((slug, index) => ({ "@type": "ListItem", position: index + 1, name: NY_SERVICE_DEFINITIONS[slug].shortTitle, url: `${url}/${slug}` })) },
    ];
    return <>{schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}<NewYorkLocalPage area={nyArea} heroImage={heroImage} /></>;
  }

  const area = getNortheastArea(citySlug);
  if (!area) notFound();
  const url = `${SITE_URL}/${area.slug}`;
  const parent = area.parent ? getNortheastArea(area.parent) : null;
  const heroImage = await getLocalHeroImage({ title: getWikipediaTitle({ slug: area.slug, name: area.name, kind: "northeast", state: area.state }), placeName: area.shortLocation });
  const schemas = [
    { "@context": "https://schema.org", "@type": "WebPage", "@id": `${url}#page`, name: `Locksmith in ${area.shortLocation}`, url, description: area.localContext, isPartOf: { "@type": "WebSite", name: SITE.brandName, url: SITE_URL }, about: { "@type": "Thing", name: `Residential locksmith and property-access services in ${area.shortLocation}` }, spatialCoverage: { "@type": northeastSpatialType(area), name: area.shortLocation } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: SITE.brandName, item: SITE_URL }, ...(parent ? [{ "@type": "ListItem", position: 2, name: parent.name, item: `${SITE_URL}/${parent.slug}` }] : []), { "@type": "ListItem", position: parent ? 3 : 2, name: `${area.name} locksmith`, item: url }] },
  ];
  return <>{schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}<NortheastLocalPage area={area} heroImage={heroImage} /></>;
}
