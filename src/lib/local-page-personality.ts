export type LocalPageKind = "massachusetts" | "new-york" | "northeast";

export type LocalPagePersonalityInput = {
  slug: string;
  name: string;
};

const LOCAL_SMILES: Record<string, string> = {
  "boston-ma": "Boston traffic can surprise you. Your locksmith price should not.",
  "cambridge-ma": "Harvard Square can keep the debates. Your locksmith price can be settled first.",
  "newton-ma": "Newton has plenty of villages. Your locksmith price does not need to be complicated.",
  "somerville-ma": "Finding parking in Somerville can be hard enough. Finding the price should not be.",
  "revere-ma": "Revere Beach is better when being outside is your choice.",
  "new-york-ny": "Five boroughs are plenty. Your locksmith price does not need a sixth layer of complexity.",
  "manhattan-ny": "Manhattan already has enough expensive surprises. Your locksmith price should not be one.",
  "brooklyn-ny": "Keep the brownstone charm. Skip the locked-out-on-the-stoop drama.",
  "upper-west-side-ny": "A prewar building can have character. Your locksmith bill does not need surprises.",
  "upper-east-side-ny": "The doorman may know everyone. Your locksmith price should still introduce itself first.",
  "park-slope-ny": "Brownstone stoops are great for sitting. Less so when you are locked out.",
  "bay-ridge-ny": "The Shore Road view is better when being outside is your choice.",
  "buffalo-ny": "Buffalo weather can bring enough surprises. Locksmith pricing does not need to.",
  "syracuse-ny": "Snow is allowed to pile up. Locksmith extras are not.",
  "jersey-city-nj": "Downtown or the Heights, the skyline changes. The pricing rule does not.",
  "hoboken-nj": "Washington Street has enough foot traffic. Your locksmith price should not wander.",
  "philadelphia-pa": "Keep the rowhouse charm. Skip the rowhouse lockout drama.",
  "south-philadelphia-pa": "South Philly can keep the sandwich debate. The locksmith price can be settled first.",
  "center-city-philadelphia-pa": "Center City moves fast. Your locksmith price can still be clear first.",
  "bridgeport-ct": "Bridgeport traffic can surprise you. Your locksmith price should not.",
  "new-haven-ct": "New Haven has enough homework. Your locksmith price should not need any.",
  "rehoboth-beach-de": "Beach day: yes. Locked-out sequel: no.",
};

const WIKI_TITLES: Record<string, string> = {
  "new-york-ny": "New York City",
  "manhattan-ny": "Manhattan",
  "brooklyn-ny": "Brooklyn",
  "queens-ny": "Queens",
  "bronx-ny": "The Bronx",
  "staten-island-ny": "Staten Island",
  "chelsea-ny": "Chelsea, Manhattan",
  "upper-west-side-ny": "Upper West Side",
  "harlem-ny": "Harlem",
  "upper-east-side-ny": "Upper East Side",
  "astoria-ny": "Astoria, Queens",
  "flushing-ny": "Flushing, Queens",
  "jamaica-ny": "Jamaica, Queens",
  "forest-hills-ny": "Forest Hills, Queens",
  "midwood-ny": "Midwood, Brooklyn",
  "park-slope-ny": "Park Slope",
  "bay-ridge-ny": "Bay Ridge, Brooklyn",
  "west-philadelphia-pa": "West Philadelphia",
  "south-philadelphia-pa": "South Philadelphia",
  "center-city-philadelphia-pa": "Center City, Philadelphia",
};

function stableVariant(slug: string, count: number) {
  let total = 0;
  for (const char of slug) total = (total + char.charCodeAt(0)) % 10000;
  return total % count;
}

export function getLocalPagePersonality({ slug, name }: LocalPagePersonalityInput) {
  const templates = [
    { lead: `Locked out in ${name}?`, accent: "See the price first." },
    { lead: `${name} locksmith help.`, accent: "Know the price first." },
    { lead: `Need a locksmith in ${name}?`, accent: "Start with the price." },
    { lead: `Lock problem in ${name}?`, accent: "See the price first." },
    { lead: `${name}: locked out?`, accent: "Start with the price." },
    { lead: `Need lock help in ${name}?`, accent: "Know the price first." },
  ];

  return {
    ...templates[stableVariant(slug, templates.length)],
    deck: "House, apartment or car — choose what you need and see the standard price first.",
  };
}

export function getLocalSmile({ slug, name, areas }: { slug: string; name: string; areas: string[] }) {
  const custom = LOCAL_SMILES[slug];
  if (custom) return custom;

  const first = areas[0];
  const second = areas[1];
  const variants = first && second
    ? [
        `${first} to ${second}: plenty to explore. The wrong side of a locked door is not one of them.`,
        `${first} or ${second}, being outside should still be your choice.`,
        `From ${first} to ${second}, keep the local surprises. Skip the locksmith-price surprise.`,
        `${first} has its quirks. Surprise locksmith pricing should not be one of them.`,
      ]
    : first
      ? [
          `${first} has enough character. Your locksmith price does not need extra drama.`,
          `A detour through ${first} can be fun. A lockout detour, less so.`,
          `Being outside in ${first} should still be your choice.`,
        ]
      : [
          `${name} has enough local character. Your locksmith price does not need extra drama.`,
          `${name} has plenty to explore. The wrong side of a locked door is not one of the attractions.`,
          `Being outside in ${name} should still be your choice.`,
        ];

  return variants[stableVariant(slug, variants.length)];
}

export function getSimpleLocalIntro(name: string, areas: string[]) {
  const localAreas = areas.slice(0, 3);
  if (localAreas.length === 0) return `${name} has different homes and buildings, so the lock problem can vary from one address to the next.`;
  if (localAreas.length === 1) return `${localAreas[0]} and nearby streets are part of ${name}'s local service area.`;
  if (localAreas.length === 2) return `From ${localAreas[0]} to ${localAreas[1]}, ${name} has different types of homes and buildings.`;
  return `From ${localAreas[0]} and ${localAreas[1]} to ${localAreas[2]}, ${name} has different types of homes and buildings.`;
}

export function getWikipediaTitle({
  slug,
  name,
  kind,
  state,
}: {
  slug: string;
  name: string;
  kind: LocalPageKind;
  state?: string;
}) {
  if (WIKI_TITLES[slug]) return WIKI_TITLES[slug];
  if (kind === "massachusetts") return `${name}, Massachusetts`;
  if (kind === "new-york") return `${name}, New York`;
  return state ? `${name}, ${state}` : name;
}
