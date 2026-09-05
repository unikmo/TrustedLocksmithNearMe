export const SITE = {
  brandName: "Trusted Locksmith",
  domain: "trustedlocksmithnearme.com",
  url: "https://trustedlocksmithnearme.com",
  operatorName: "TSquare Ventures LLC",
  operatorAddress: {
    streetAddress: "30 N Gould St Ste R",
    addressLocality: "Sheridan",
    addressRegion: "WY",
    postalCode: "82801",
    addressCountry: "US",
  },
  operatorAddressText: "30 N Gould St Ste R, Sheridan, WY 82801, USA",
  launchMarket: "Boston and Greater Boston, Massachusetts",
  expansionContentMarkets: [
    "New York City and selected New York State markets",
    "New Jersey",
    "Philadelphia",
    "Connecticut",
    "Delaware",
  ],
  businessModel: "Locksmith marketplace platform",
  positioning:
    "A locksmith marketplace that shows published standard prices and scope before a customer requests a participating independent local provider. Field work is performed by independent providers. Boston and Greater Boston remain the primary launch market; localized Northeast discovery pages support address-specific requests in New York, New Jersey, Philadelphia, Connecticut and Delaware where participating provider coverage exists.",
} as const;

/** Public SEO/entity URLs always use the branded production domain. */
export const SITE_URL = SITE.url;
