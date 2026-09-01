import type { NyArea } from "@/lib/new-york-seo";

export type NyServiceSlug =
  | "emergency-locksmith"
  | "car-lockout"
  | "rekey-locks"
  | "lock-change"
  | "smart-lock-installation";

export type NyServiceDefinition = {
  slug: NyServiceSlug;
  shortTitle: string;
  eyebrow: string;
  serviceIds: string[];
  summary: (area: NyArea) => string;
  localAngle: (area: NyArea) => string;
  scopeBullets: string[];
  faq: (area: NyArea) => Array<{ q: string; a: string }>;
};

export const NY_SERVICE_DEFINITIONS: Record<NyServiceSlug, NyServiceDefinition> = {
  "emergency-locksmith": {
    slug: "emergency-locksmith",
    shortTitle: "Emergency locksmith",
    eyebrow: "Urgent residential access",
    serviceIds: ["home_lockout_day", "home_lockout_evening_weekend", "home_lockout_overnight_holiday"],
    summary: (area) =>
      `Need urgent residential locksmith help in ${area.shortLocation}? See the published lockout price for the service window before you send a request. A specific provider and ETA appear only after a participating provider actually accepts.`,
    localAngle: (area) =>
      `${area.localContext} For an urgent lockout, that local building mix matters because a private apartment door, shared building entrance, townhouse entry or detached-home door can create very different access conditions.`,
    scopeBullets: [
      "Standard residential lockout entry",
      "Separate published totals for weekday daytime, evening/weekend and overnight/major-holiday windows",
      "Provider travel/service call included in the published total",
      "Destructive entry, repairs, replacement hardware or other out-of-scope work require a separate price and approval",
    ],
    faq: (area) => [
      {
        q: `Is emergency locksmith availability guaranteed across ${area.name}?`,
        a: "No. The page explains the request, standard price and local access context. A provider is shown only after a participating provider with a matching service area actually accepts.",
      },
      {
        q: "Does emergency locksmith mean a guaranteed 24/7 provider?",
        a: "No. Trusted Locksmith publishes service-window pricing but does not claim blanket 24/7 provider availability. Actual availability depends on participating provider coverage and acceptance.",
      },
      {
        q: "Can the price change after the provider arrives?",
        a: "The published standard scope stays at the listed total. If the actual job needs excluded work or hardware, the additional work and price must be shown and approved before it starts.",
      },
    ],
  },
  "car-lockout": {
    slug: "car-lockout",
    shortTitle: "Car lockout",
    eyebrow: "Vehicle access",
    serviceIds: ["car_lockout_at_property"],
    summary: (area) =>
      `Locked out of a vehicle in ${area.shortLocation}? Trusted Locksmith shows the standard vehicle-entry total before the request. The current service is entry only and does not imply key cutting, fob programming or ignition repair.`,
    localAngle: (area) =>
      `${area.accessNotes[0]} For vehicle access, the exact service address matters because parking conditions, road access and provider service radius can differ significantly inside the same local market.`,
    scopeBullets: [
      "Standard vehicle entry at the service property",
      "Provider travel/service call included",
      "Replacement keys, key cutting and key programming are not included",
      "High-security vehicle systems, ignition work and damage repair are outside the standard scope",
    ],
    faq: (area) => [
      {
        q: `Does car lockout service in ${area.name} include replacement keys?`,
        a: "No. The current offer covers standard vehicle entry only. Replacement keys, fob programming and ignition work are not included in the published car-lockout price.",
      },
      {
        q: "Is the travel or service-call fee extra?",
        a: "No. Provider travel/service call is included in the published standard vehicle-entry total.",
      },
      {
        q: "Will I see an ETA before anyone accepts?",
        a: "No. Provider identity and ETA appear only after a participating provider actually accepts the request.",
      },
    ],
  },
  "rekey-locks": {
    slug: "rekey-locks",
    shortTitle: "Rekey locks",
    eyebrow: "Planned key control",
    serviceIds: ["standard_rekey"],
    summary: (area) =>
      `Need locks rekeyed in ${area.shortLocation}? See the standard first-cylinder price and the fixed additional-cylinder price before you request a participating provider.`,
    localAngle: (area) =>
      `${area.localContext} Rekeying is most useful when compatible hardware can stay in place but old keys should no longer work—for example after a move, tenant change, roommate change or uncertain key possession.`,
    scopeBullets: [
      "Provider travel/service call plus the first standard cylinder rekey",
      "Additional standard cylinders priced at $29 each",
      "Existing compatible lock hardware remains in place",
      "Specialty and high-security cylinders require separate pricing and approval",
    ],
    faq: (area) => [
      {
        q: `When is rekeying useful in ${area.name}?`,
        a: "Rekeying is useful when compatible existing hardware can remain but old keys should stop working, such as after occupancy or key-possession changes.",
      },
      {
        q: "Is more than one cylinder included?",
        a: "The published standard rekey price includes the first standard cylinder. Additional standard cylinders are $29 each.",
      },
      {
        q: "Should I rekey or replace the lock?",
        a: "Rekeying changes which key operates compatible existing hardware. A lock change replaces the hardware. The condition and type of the existing lock determine which service is appropriate.",
      },
    ],
  },
  "lock-change": {
    slug: "lock-change",
    shortTitle: "Lock change",
    eyebrow: "Residential lock replacement",
    serviceIds: ["standard_lock_change"],
    summary: (area) =>
      `Need a standard residential lock changed in ${area.shortLocation}? Trusted Locksmith publishes the standard labor total before the request. Replacement hardware is separate and must be approved before installation.`,
    localAngle: (area) =>
      `${area.accessNotes[1] ?? area.localContext} A lock change is a hardware-replacement job, so the existing door, lock format and building context matter more than a generic citywide quote.`,
    scopeBullets: [
      "Provider travel/service call and labor for one standard residential lock replacement",
      "Replacement hardware is separate",
      "Hardware price must be shown and approved before installation",
      "Door modification, repairs and other out-of-scope work require separate approval",
    ],
    faq: (area) => [
      {
        q: `Is the replacement lock included in the ${area.name} lock-change price?`,
        a: "No. The published standard total covers provider travel/service call and labor for one standard residential lock replacement. Hardware is separate.",
      },
      {
        q: "Will I approve the hardware price first?",
        a: "Yes. Hardware and any other work outside the standard labor scope must be priced and approved before installation.",
      },
      {
        q: "Can I rekey instead of replacing the lock?",
        a: "If the existing hardware is compatible and in suitable condition, rekeying may be enough when the goal is simply to stop old keys from working.",
      },
    ],
  },
  "smart-lock-installation": {
    slug: "smart-lock-installation",
    shortTitle: "Smart lock installation",
    eyebrow: "Smart residential access",
    serviceIds: ["smart_lock_install"],
    summary: (area) =>
      `Install one compatible customer-supplied smart lock in ${area.shortLocation} with the standard labor price shown before you request service.`,
    localAngle: (area) =>
      `${area.localContext} Smart-lock installation is best treated as a planned access upgrade: compatibility with the existing door and hardware should be clear before work begins, especially in older apartment, townhouse or multifamily buildings.`,
    scopeBullets: [
      "Provider travel/service call and labor for one compatible customer-supplied smart lock",
      "Basic installation and setup included",
      "Smart-lock hardware is not included",
      "Door modification, electrical work and network troubleshooting are outside the standard scope",
    ],
    faq: (area) => [
      {
        q: `Do I need to buy the smart lock before installation in ${area.name}?`,
        a: "Yes. The current standard service is installation and basic setup of one compatible customer-supplied smart lock.",
      },
      {
        q: "Does the standard labor price include door modification?",
        a: "No. Door modification, electrical work and other out-of-scope work require separate pricing and approval.",
      },
      {
        q: "Is every building suitable for a smart lock?",
        a: "No. Compatibility depends on the door, existing hardware and any building or property rules that apply. The service scope should be confirmed before installation.",
      },
    ],
  },
};

const ALL_NY_AREAS = [
  "new-york-ny", "manhattan-ny", "brooklyn-ny", "queens-ny", "bronx-ny", "staten-island-ny",
  "chelsea-ny", "upper-west-side-ny", "harlem-ny", "upper-east-side-ny", "astoria-ny", "flushing-ny",
  "jamaica-ny", "forest-hills-ny", "midwood-ny", "park-slope-ny", "bay-ridge-ny",
  "buffalo-ny", "rochester-ny", "albany-ny", "syracuse-ny", "yonkers-ny", "suffolk-county-ny",
  "nassau-county-ny", "white-plains-ny", "poughkeepsie-ny", "new-rochelle-ny", "schenectady-ny",
] as const;

const CAR_LOCKOUT_AREAS = ALL_NY_AREAS.filter((slug) => ![
  "chelsea-ny", "upper-west-side-ny", "harlem-ny", "upper-east-side-ny", "park-slope-ny", "bay-ridge-ny",
].includes(slug));

const REKEY_AREAS = [
  "new-york-ny", "manhattan-ny", "brooklyn-ny", "queens-ny", "bronx-ny", "staten-island-ny",
  "chelsea-ny", "upper-west-side-ny", "harlem-ny", "upper-east-side-ny", "astoria-ny", "flushing-ny",
  "jamaica-ny", "forest-hills-ny", "midwood-ny", "park-slope-ny", "bay-ridge-ny",
  "yonkers-ny", "suffolk-county-ny", "nassau-county-ny",
] as const;

const LOCK_CHANGE_AREAS = [
  "new-york-ny", "manhattan-ny", "brooklyn-ny", "queens-ny", "bronx-ny", "staten-island-ny",
  "buffalo-ny", "rochester-ny", "albany-ny", "yonkers-ny", "suffolk-county-ny", "nassau-county-ny",
  "white-plains-ny", "new-rochelle-ny",
] as const;

const SMART_LOCK_AREAS = [
  "new-york-ny", "manhattan-ny", "brooklyn-ny", "queens-ny", "staten-island-ny",
  "suffolk-county-ny", "nassau-county-ny", "white-plains-ny",
] as const;

export const NY_SERVICE_MATRIX: Record<NyServiceSlug, readonly string[]> = {
  "emergency-locksmith": ALL_NY_AREAS,
  "car-lockout": CAR_LOCKOUT_AREAS,
  "rekey-locks": REKEY_AREAS,
  "lock-change": LOCK_CHANGE_AREAS,
  "smart-lock-installation": SMART_LOCK_AREAS,
};

export function getNyService(slug: string) {
  return NY_SERVICE_DEFINITIONS[slug as NyServiceSlug];
}

export function areaHasNyService(areaSlug: string, serviceSlug: string): serviceSlug is NyServiceSlug {
  const service = getNyService(serviceSlug);
  return Boolean(service && NY_SERVICE_MATRIX[service.slug].includes(areaSlug));
}

export function getNyServicesForArea(areaSlug: string) {
  return (Object.keys(NY_SERVICE_DEFINITIONS) as NyServiceSlug[]).filter((service) =>
    NY_SERVICE_MATRIX[service].includes(areaSlug),
  );
}

export const NY_SERVICE_ROUTES = (Object.keys(NY_SERVICE_MATRIX) as NyServiceSlug[]).flatMap((service) =>
  NY_SERVICE_MATRIX[service].map((area) => `/${area}/${service}`),
);

export const NY_SERVICE_PAGE_COUNT = NY_SERVICE_ROUTES.length;
