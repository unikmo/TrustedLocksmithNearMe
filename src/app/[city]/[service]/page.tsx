import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalServicePage } from "@/components/LocalLocksmithPage";
import { NewYorkServicePage } from "@/components/NewYorkServicePage";
import { MA_CITIES, MA_SERVICE_CONTENT, getMaCity, getMaService } from "@/lib/massachusetts-seo";
import { getNyArea } from "@/lib/new-york-seo";
import {
  NY_SERVICE_MATRIX,
  areaHasNyService,
  getNyService,
  type NyServiceSlug,
} from "@/lib/new-york-services";
import { formatServicePrice, getServiceMenuItem } from "@/lib/service-menu";
import { SITE, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  const massachusetts = MA_CITIES.flatMap((city) => city.services.map((service) => ({ city: city.slug, service })));
  const newYork = (Object.keys(NY_SERVICE_MATRIX) as NyServiceSlug[]).flatMap((service) =>
    NY_SERVICE_MATRIX[service].map((city) => ({ city, service })),
  );
  return [...massachusetts, ...newYork];
}

function titleForMa(cityName: string, serviceSlug: keyof typeof MA_SERVICE_CONTENT) {
  const firstPriceId = MA_SERVICE_CONTENT[serviceSlug].serviceIds[0];
  const item = getServiceMenuItem(firstPriceId);
  const price = item ? formatServicePrice(item.customerPriceCents) : undefined;

  switch (serviceSlug) {
    case "emergency-locksmith":
      return `Emergency Locksmith ${cityName}, MA | Upfront Prices`;
    case "car-lockout":
      return `Car Lockout Locksmith ${cityName}, MA${price ? ` | ${price}` : ""}`;
    case "house-lockout":
      return `House Lockout Locksmith ${cityName}, MA${price ? ` | From ${price}` : ""}`;
    case "rekey-locks":
      return `Rekey Locks ${cityName}, MA${price ? ` | From ${price}` : ""}`;
    case "lock-change":
      return `Lock Change ${cityName}, MA${price ? ` | ${price} Labor` : ""}`;
    case "smart-lock-installation":
      return `Smart Lock Installation ${cityName}, MA${price ? ` | ${price} Labor` : ""}`;
  }
}

function titleForNy(location: string, serviceSlug: NyServiceSlug) {
  const service = getNyService(serviceSlug);
  const item = service ? getServiceMenuItem(service.serviceIds[0]) : undefined;
  const price = item ? formatServicePrice(item.customerPriceCents) : undefined;

  switch (serviceSlug) {
    case "emergency-locksmith":
      return `Emergency Locksmith ${location} | Upfront Prices`;
    case "car-lockout":
      return `Car Lockout Locksmith ${location}${price ? ` | ${price}` : ""}`;
    case "rekey-locks":
      return `Rekey Locks ${location}${price ? ` | From ${price}` : ""}`;
    case "lock-change":
      return `Lock Change ${location}${price ? ` | ${price} Labor` : ""}`;
    case "smart-lock-installation":
      return `Smart Lock Installation ${location}${price ? ` | ${price} Labor` : ""}`;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ city: string; service: string }> }): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;

  const maCity = getMaCity(citySlug);
  const maService = getMaService(serviceSlug);
  if (maCity && maService && maCity.services.includes(maService.slug)) {
    const title = titleForMa(maCity.name, maService.slug);
    const description = maService.description(maCity.name);
    const canonical = `${SITE_URL}/${maCity.slug}/${maService.slug}`;
    return {
      title,
      description,
      alternates: { canonical },
      openGraph: { title, description, url: canonical, type: "website", siteName: SITE.brandName },
      twitter: { card: "summary_large_image", title, description },
    };
  }

  const nyArea = getNyArea(citySlug);
  const nyService = getNyService(serviceSlug);
  if (nyArea && nyService && areaHasNyService(nyArea.slug, nyService.slug)) {
    const title = titleForNy(nyArea.shortLocation, nyService.slug);
    const description = nyService.summary(nyArea);
    const canonical = `${SITE_URL}/${nyArea.slug}/${nyService.slug}`;
    return {
      title,
      description,
      alternates: { canonical },
      openGraph: { title, description, url: canonical, type: "website", siteName: SITE.brandName },
      twitter: { card: "summary_large_image", title, description },
    };
  }

  return {};
}

export default async function LocalServiceRoute({ params }: { params: Promise<{ city: string; service: string }> }) {
  const { city: citySlug, service: serviceSlug } = await params;

  const maCity = getMaCity(citySlug);
  const maService = getMaService(serviceSlug);
  if (maCity && maService && maCity.services.includes(maService.slug)) {
    const cityUrl = `${SITE_URL}/${maCity.slug}`;
    const url = `${cityUrl}/${maService.slug}`;
    const description = maService.description(maCity.name);
    const offers = maService.serviceIds
      .map((id) => getServiceMenuItem(id))
      .filter((item): item is NonNullable<typeof item> => Boolean(item))
      .map((item) => ({
        "@type": "Offer",
        name: `${item.title} — ${item.timing}`,
        description: item.scope,
        price: (item.customerPriceCents / 100).toFixed(2),
        priceCurrency: "USD",
        url,
      }));

    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${url}#page`,
        name: `${maService.shortTitle} in ${maCity.name}, Massachusetts`,
        url,
        description,
        isPartOf: { "@type": "WebSite", name: SITE.brandName, url: SITE_URL },
        about: { "@id": `${url}#service` },
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${url}#service`,
        name: `${maService.shortTitle} in ${maCity.name}, Massachusetts`,
        serviceType: maService.shortTitle,
        areaServed: { "@type": "City", name: `${maCity.name}, Massachusetts` },
        description,
        url,
        offers,
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE.brandName, item: SITE_URL },
          { "@type": "ListItem", position: 2, name: `${maCity.name}, MA locksmith`, item: cityUrl },
          { "@type": "ListItem", position: 3, name: maService.shortTitle, item: url },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: maService.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ];

    return (
      <>
        {schemas.map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
        <LocalServicePage city={maCity} service={maService} />
      </>
    );
  }

  const nyArea = getNyArea(citySlug);
  const nyService = getNyService(serviceSlug);
  if (nyArea && nyService && areaHasNyService(nyArea.slug, nyService.slug)) {
    const areaUrl = `${SITE_URL}/${nyArea.slug}`;
    const url = `${areaUrl}/${nyService.slug}`;
    const description = nyService.summary(nyArea);
    const offers = nyService.serviceIds
      .map((id) => getServiceMenuItem(id))
      .filter((item): item is NonNullable<typeof item> => Boolean(item))
      .map((item) => ({
        "@type": "Offer",
        name: `${item.title} — ${item.timing}`,
        description: item.scope,
        price: (item.customerPriceCents / 100).toFixed(2),
        priceCurrency: "USD",
        url,
      }));
    const faq = nyService.faq(nyArea);

    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${url}#page`,
        name: `${nyService.shortTitle} in ${nyArea.shortLocation}`,
        url,
        description,
        isPartOf: { "@type": "WebSite", name: SITE.brandName, url: SITE_URL },
        about: { "@id": `${url}#service` },
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${url}#service`,
        name: `${nyService.shortTitle} in ${nyArea.shortLocation}`,
        serviceType: nyService.shortTitle,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "Place", name: `${nyArea.shortLocation}, New York` },
        description,
        url,
        offers,
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE.brandName, item: SITE_URL },
          { "@type": "ListItem", position: 2, name: `${nyArea.name} locksmith`, item: areaUrl },
          { "@type": "ListItem", position: 3, name: nyService.shortTitle, item: url },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ];

    return (
      <>
        {schemas.map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
        <NewYorkServicePage area={nyArea} service={nyService} />
      </>
    );
  }

  notFound();
}
