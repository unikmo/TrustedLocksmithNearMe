export type LocalPageKind = "massachusetts" | "new-york" | "northeast";

export type LocalPagePersonalityInput = {
  slug: string;
  name: string;
  areas: string[];
  kind: LocalPageKind;
};

const LOCAL_SMILES: Record<string, string> = {
  "boston-ma": "Beacon Hill has enough steps. The locksmith price can stay level.",
  "cambridge-ma": "Harvard Square can keep the debates. Your locksmith price can be settled before the request.",
  "newton-ma": "Newton Centre or Nonantum, there is enough to navigate. Your locksmith price can be the easy part.",
  "somerville-ma": "Davis Square or Union Square, the locksmith price should not need another square to figure out.",
  "medford-ma": "Medford Square to Wellington, the neighborhood changes. The pricing rule does not.",
  "watertown-ma": "Watertown Square can keep the traffic puzzle. The locksmith price can stay simple.",
  "waltham-ma": "Waltham Center or South Side, the locksmith price should be the uncomplicated part.",
  "quincy-ma": "Quincy Center to Marina Bay, the pricing rule stays in one lane.",
  "lynn-ma": "Central Lynn or Diamond District, surprise locksmith pricing does not need a neighborhood.",
  "malden-ma": "Malden Center to Oak Grove, the price should not need a transfer.",
  "revere-ma": "Revere Beach is better when being outside is your choice.",
  "braintree-ma": "Braintree Center or the Highlands, the locksmith decision can stay straightforward.",
  "chelsea-ma": "Bellingham Square to Admirals Hill, the locksmith price should stay compact.",
  "new-york-ny": "Five boroughs are plenty. Your locksmith price does not need a sixth layer of complexity.",
  "manhattan-ny": "Manhattan already has enough expensive surprises. Your locksmith price does not need to be one.",
  "brooklyn-ny": "Keep the brownstone charm. Skip the locked-out-on-the-stoop drama.",
  "queens-ny": "Astoria to Flushing, Queens has enough variety. The pricing rule can stay simple.",
  "bronx-ny": "Fordham to Riverdale, the neighborhood changes. The pricing rule does not.",
  "staten-island-ny": "St. George to Tottenville, the trip can be long. The price explanation should not be.",
  "chelsea-ny": "The neighborhood can keep the galleries. Your locksmith bill does not need to be abstract.",
  "upper-west-side-ny": "A prewar building can have character. Your locksmith bill does not need surprises.",
  "harlem-ny": "125th Street has enough rhythm. The locksmith process should have one too.",
  "upper-east-side-ny": "The doorman may know everyone. Your locksmith price should still introduce itself first.",
  "astoria-ny": "30th Avenue can handle the choices. Your locksmith price should not add another.",
  "flushing-ny": "Main Street has enough going on. Your locksmith request can stay simple.",
  "jamaica-ny": "Jamaica Center can be busy. Your locksmith process does not need to be.",
  "forest-hills-ny": "Queens Boulevard has enough lanes. Your locksmith decision needs one clear path.",
  "midwood-ny": "A quiet Midwood block is better when you can get through your own front door.",
  "park-slope-ny": "Brownstone stoops are great for sitting. Less so when you are locked out.",
  "bay-ridge-ny": "The Shore Road view is better when being outside is your choice.",
  "buffalo-ny": "Buffalo weather can bring enough surprises. Locksmith pricing does not need to.",
  "rochester-ny": "Park Avenue or South Wedge, the locksmith price should stay equally clear.",
  "albany-ny": "Center Square has enough old-house character. The locksmith price can stay modern and clear.",
  "syracuse-ny": "Snow is allowed to pile up. Locksmith extras are not.",
  "yonkers-ny": "The hills can be steep. The locksmith process should stay level.",
  "jersey-city-nj": "Downtown or the Heights, the skyline changes. The pricing rule does not.",
  "newark-nj": "Broad Street or the Ironbound, the locksmith price still starts upfront.",
  "hoboken-nj": "Washington Street has enough foot traffic. Your locksmith price should not wander.",
  "bayonne-nj": "Broadway to the waterfront, the locksmith price should stay on the same page.",
  "philadelphia-pa": "Keep the rowhouse charm. Skip the rowhouse lockout drama.",
  "west-philadelphia-pa": "West Philly has enough personality. Surprise locksmith pricing does not need any.",
  "south-philadelphia-pa": "South Philly can keep the debates about the best sandwich. The locksmith price can be settled first.",
  "center-city-philadelphia-pa": "Center City moves fast. Your locksmith price can still be clear before anyone moves.",
  "stamford-ct": "Downtown or North Stamford, the address changes. The pricing rule stays clear.",
  "new-haven-ct": "Downtown or East Rock, the locksmith price should not need a course catalog.",
  "hartford-ct": "Downtown or the West End, the locksmith process should stay straightforward.",
  "wilmington-de": "Market Street can keep the movement. The locksmith price can stay put.",
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

export function getLocalPagePersonality({ slug, name, areas, kind }: LocalPagePersonalityInput) {
  const templates = [
    { lead: `Locked out around ${name}?`, accent: "Start with the price." },
    { lead: `${name} locksmith help.`, accent: "No price guessing." },
    { lead: `Need locksmith help in ${name}?`, accent: "Know the standard price first." },
    { lead: `A clearer way to request a locksmith in ${name}.`, accent: "Price first. Provider second." },
    { lead: `Lock problem in ${name}?`, accent: "Keep the price simple." },
    { lead: `Looking for a locksmith in ${name}?`, accent: "Clear price. Real acceptance." },
  ];

  const template = templates[stableVariant(slug, templates.length)];
  const first = areas[0];
  const second = areas[1];
  const locality = first ? `From ${first}${second ? ` to ${second}` : ""}` : `Around ${name}`;
  const deck = kind === "massachusetts"
    ? `${locality}, choose the job you need and see the published standard total before you request a participating local provider.`
    : `${locality}, start with the exact service and address. See the published standard total before a participating provider accepts.`;

  const fallbackSmile = first
    ? `${first}${second ? ` or ${second}` : ""}: enough local detail already. The locksmith price can be the simple part.`
    : `There is enough to solve already. The locksmith price can be the simple part.`;

  return {
    ...template,
    deck,
    smile: LOCAL_SMILES[slug] ?? fallbackSmile,
  };
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
