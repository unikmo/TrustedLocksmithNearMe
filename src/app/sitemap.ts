import type { MetadataRoute } from "next";
import { MA_CITIES, MA_LOCAL_ROUTES } from "@/lib/massachusetts-seo";
import { NY_AREAS, NY_LOCAL_ROUTES } from "@/lib/new-york-seo";
import { NY_SERVICE_ROUTES } from "@/lib/new-york-services";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/how-it-works",
    "/pricing",
    "/digital-access",
    "/second-homes",
    "/landlords",
    "/for-property-managers",
    "/for-real-estate-agents",
    "/partner-tech",
    "/trust-safety",
    "/contact",
  ];

  const corePages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/services"
          ? 0.9
          : route === "/about" || route === "/how-it-works" || route === "/partner-tech"
            ? 0.8
            : 0.7,
  }));

  const maCitySlugs = new Set(MA_CITIES.map((city) => `/${city.slug}`));
  const massachusettsPages: MetadataRoute.Sitemap = MA_LOCAL_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: maCitySlugs.has(route) ? 0.82 : 0.76,
  }));

  const nyPriority = new Map(
    NY_AREAS.map((area) => [
      `/${area.slug}`,
      area.slug === "new-york-ny" ? 0.92 : area.kind === "borough" ? 0.88 : area.kind === "neighborhood" ? 0.82 : 0.84,
    ]),
  );
  const newYorkPages: MetadataRoute.Sitemap = NY_LOCAL_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: nyPriority.get(route) ?? 0.8,
  }));

  const newYorkServicePages: MetadataRoute.Sitemap = NY_SERVICE_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route.includes("/emergency-locksmith") ? 0.8 : route.includes("/car-lockout") ? 0.78 : 0.74,
  }));

  return [...corePages, ...massachusettsPages, ...newYorkPages, ...newYorkServicePages];
}
