export const SITE = {
  brandName: "Trusted Locksmith",
  domain: "trustedlocksmithnearme.com",
  url: "https://trustedlocksmithnearme.com",
  operatorName: "PlanetHike OÜ",
  launchMarket: "Boston and Greater Boston, Massachusetts",
  expansionContentMarkets: ["New York City", "selected New York State markets"],
  businessModel: "Locksmith marketplace platform",
  positioning:
    "A locksmith marketplace that shows published standard prices and scope before a customer requests a participating independent local provider. Field work is performed by independent providers. Boston and Greater Boston are the primary launch market; New York discovery pages support address-specific requests where participating provider coverage exists.",
} as const;

/** Public SEO/entity URLs always use the branded production domain. */
export const SITE_URL = SITE.url;
