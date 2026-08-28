export const SITE = {
  brandName: "Trusted Locksmith",
  domain: "trustedlocksmithnearme.com",
  url: "https://trustedlocksmithnearme.com",
  operatorName: "PlanetHike OÜ",
} as const;

/**
 * Public SEO/entity URLs must always resolve to the branded production domain.
 * Preview and deployment hostnames must never become canonical URLs.
 */
export const SITE_URL = SITE.url;
