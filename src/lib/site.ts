export const SITE = {
  brandName: "Trusted Locksmith",
  domain: "trustedlocksmithnearme.com",
  url: "https://trustedlocksmithnearme.com",
  operatorName: "PlanetHike OÜ",
  launchMarket: "Boston and Greater Boston, Massachusetts",
  expansionContentMarkets: ["New York City", "selected New York State markets"],
  businessModel: "Locksmith marketplace platform",
  positioning:
    "A Boston-first locksmith marketplace that shows published standard prices and scope before a customer requests a participating independent local provider. Trusted Locksmith also publishes localized New York request guidance; provider availability there depends on participating provider service areas and actual acceptance.",
} as const;

/**
 * Public SEO/entity URLs must always resolve to the branded production domain.
 * Preview and deployment hostnames must never become canonical URLs.
 */
export const SITE_URL = SITE.url;
