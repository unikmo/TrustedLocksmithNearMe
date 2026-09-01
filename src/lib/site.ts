export const SITE = {
  brandName: "Trusted Locksmith",
  domain: "trustedlocksmithnearme.com",
  url: "https://trustedlocksmithnearme.com",
  operatorName: "PlanetHike OÜ",
  launchMarket: "Boston and Greater Boston, Massachusetts",
  expansionContentMarkets: ["New York City", "selected New York State markets"],
  businessModel: "Locksmith marketplace platform",
  positioning:
    "A locksmith marketplace that shows published standard prices and scope before a customer requests a participating independent local provider. Boston and Greater Boston are the primary launch market; localized New York pages support address-specific request discovery where participating provider coverage exists.",
} as const;

/**
 * Public SEO/entity URLs must always resolve to the branded production domain.
 * Preview and deployment hostnames must never become canonical URLs.
 */
export const SITE_URL = SITE.url;
