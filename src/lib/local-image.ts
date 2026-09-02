import { PAGE_VISUALS } from "@/lib/visuals";

export type LocalHeroImage = {
  src: string;
  alt: string;
  credit: string;
  creditUrl?: string;
  license?: string;
  local: boolean;
};

type WikiPage = {
  pageimage?: string;
  thumbnail?: { source?: string };
};

type WikiResponse = {
  query?: { pages?: Record<string, WikiPage> };
};

type CommonsInfo = {
  url?: string;
  thumburl?: string;
  descriptionurl?: string;
  width?: number;
  height?: number;
  extmetadata?: Record<string, { value?: string }>;
};

type CommonsPage = {
  title?: string;
  imageinfo?: CommonsInfo[];
};

type CommonsResponse = {
  query?: { pages?: Record<string, CommonsPage> };
};

const BAD_IMAGE_TITLE = /(flag|seal|logo|coat of arms|crest|emblem|locator|location map|map of|diagram|icon|svg|route shield|highway shield)/i;
const GOOD_IMAGE_TITLE = /(street|streetscape|downtown|neighborhood|district|skyline|main street|architecture|houses|homes|rowhouse|brownstone|waterfront|avenue|square|village)/i;

// Release rule: no hero photograph is shared between page purposes or location pages.
// Major conversion pages have dedicated sources in PAGE_VISUALS. Location pages reserve
// each selected source at prerender time; the verified Vercel build generates them in
// one worker, making this set the release uniqueness gate for static local pages.
const RESERVED_HERO_SOURCES = new Set(Object.values(PAGE_VISUALS).map((visual) => visual.src));

// High-profile places can use a reviewed local photograph instead of depending on
// search ranking at build time. These sources still pass through the same uniqueness gate.
const LOCAL_IMAGE_OVERRIDES: Record<string, LocalHeroImage> = {
  Manhattan: {
    src: "https://upload.wikimedia.org/wikipedia/commons/6/60/Manhattan_Skyline.jpg",
    alt: "Manhattan skyline across the water at dusk",
    credit: "Sujit kumar",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Manhattan_Skyline.jpg",
    license: "CC BY-SA 4.0",
    local: true,
  },
};

function firstValue<T>(record?: Record<string, T>) {
  return record ? Object.values(record)[0] : undefined;
}

function cleanText(value?: string) {
  if (!value) return "";
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function stableIndex(value: string, count: number) {
  let total = 0;
  for (const char of value) total = (total * 31 + char.charCodeAt(0)) >>> 0;
  return count > 0 ? total % count : 0;
}

function hasHeroShape(info: CommonsInfo) {
  if (!info.width || !info.height) return true;
  if (info.width < 900) return false;
  return info.width / info.height >= 1.12;
}

function isAvailable(image: LocalHeroImage | null): image is LocalHeroImage {
  return Boolean(image && !RESERVED_HERO_SOURCES.has(image.src));
}

function reserve(image: LocalHeroImage) {
  RESERVED_HERO_SOURCES.add(image.src);
  return image;
}

function localImageFromInfo(
  info: CommonsInfo,
  placeName: string,
  sourceTitle: string,
  requireHeroShape = true,
): LocalHeroImage | null {
  const src = info.thumburl || info.url;
  if (!src || BAD_IMAGE_TITLE.test(sourceTitle)) return null;
  if (requireHeroShape && !hasHeroShape(info)) return null;
  const metadata = info.extmetadata;
  const artist = cleanText(metadata?.Artist?.value || metadata?.Credit?.value);
  const license = cleanText(metadata?.LicenseShortName?.value);
  return {
    src,
    alt: `Local street or neighborhood view of ${placeName}`,
    credit: artist || "Wikimedia Commons",
    creditUrl: info.descriptionurl,
    license: license || undefined,
    local: true,
  };
}

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    cache: "force-cache",
    headers: {
      Accept: "application/json",
      "Api-User-Agent": "TrustedLocksmith/1.0 (https://trustedlocksmithnearme.com/contact)",
    },
  });
  if (!response.ok) throw new Error(`Image source request failed with ${response.status}`);
  return response.json() as Promise<T>;
}

async function getWikipediaPageImage(title: string, placeName: string): Promise<LocalHeroImage | null> {
  const wikiParams = new URLSearchParams({
    action: "query",
    format: "json",
    prop: "pageimages",
    piprop: "thumbnail|name",
    pithumbsize: "1800",
    redirects: "1",
    titles: title,
    origin: "*",
  });
  const wiki = await getJson<WikiResponse>(`https://en.wikipedia.org/w/api.php?${wikiParams.toString()}`);
  const page = firstValue(wiki.query?.pages);
  const src = page?.thumbnail?.source;
  const pageImage = page?.pageimage;
  if (!src || !pageImage || BAD_IMAGE_TITLE.test(pageImage)) return null;

  const commonsParams = new URLSearchParams({
    action: "query",
    format: "json",
    prop: "imageinfo",
    iiprop: "url|extmetadata|size",
    iiurlwidth: "1800",
    titles: `File:${pageImage}`,
    origin: "*",
  });
  const commons = await getJson<CommonsResponse>(`https://commons.wikimedia.org/w/api.php?${commonsParams.toString()}`);
  const commonsPage = firstValue(commons.query?.pages);
  const imageInfo = commonsPage?.imageinfo?.[0];
  if (!imageInfo) return null;
  const localImage = localImageFromInfo(imageInfo, placeName, commonsPage?.title ?? pageImage);
  return localImage ? { ...localImage, src } : null;
}

type Candidate = { image: LocalHeroImage; title: string; info: CommonsInfo; score: number };

function scoreCandidate(title: string, info: CommonsInfo) {
  let score = 0;
  if (GOOD_IMAGE_TITLE.test(title)) score += 4;
  if (info.width && info.height) {
    const ratio = info.width / info.height;
    if (ratio >= 1.35 && ratio <= 2.2) score += 4;
    else if (ratio >= 1.15) score += 2;
    if (info.width >= 1600) score += 2;
  }
  return score;
}

async function searchCommons(
  query: string,
  placeName: string,
  key: string,
  requireHeroShape = true,
): Promise<LocalHeroImage | null> {
  const searchParams = new URLSearchParams({
    action: "query",
    format: "json",
    generator: "search",
    gsrsearch: query,
    gsrnamespace: "6",
    gsrlimit: "40",
    prop: "imageinfo",
    iiprop: "url|extmetadata|size",
    iiurlwidth: "1800",
    origin: "*",
  });
  const commons = await getJson<CommonsResponse>(`https://commons.wikimedia.org/w/api.php?${searchParams.toString()}`);
  const pages = Object.values(commons.query?.pages ?? {});
  const candidates: Candidate[] = [];

  for (const page of pages) {
    const sourceTitle = page.title ?? "";
    const info = page.imageinfo?.[0];
    if (!info) continue;
    const image = localImageFromInfo(info, placeName, sourceTitle, requireHeroShape);
    if (!image || RESERVED_HERO_SOURCES.has(image.src)) continue;
    candidates.push({ image, title: sourceTitle, info, score: scoreCandidate(sourceTitle, info) });
  }

  if (candidates.length === 0) return null;
  candidates.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  const start = stableIndex(key, candidates.length);
  for (let offset = 0; offset < candidates.length; offset += 1) {
    const candidate = candidates[(start + offset) % candidates.length];
    if (!RESERVED_HERO_SOURCES.has(candidate.image.src)) return candidate.image;
  }
  return null;
}

async function searchCommonsForPlace(title: string, placeName: string): Promise<LocalHeroImage | null> {
  const key = `${title}|${placeName}`;
  const queries = [
    `\"${title}\" (street OR streetscape OR downtown OR neighborhood OR skyline OR architecture OR houses OR avenue OR square)`,
    `\"${title}\"`,
    `\"${placeName}\" (street OR neighborhood OR architecture OR houses)`,
  ];

  for (const query of queries) {
    const image = await searchCommons(query, placeName, key, true);
    if (image) return image;
  }

  return searchCommons(`\"${title}\"`, placeName, `${key}|relaxed`, false);
}

export async function getLocalHeroImage({
  title,
  placeName,
}: {
  title: string;
  placeName: string;
}): Promise<LocalHeroImage> {
  const reviewed = LOCAL_IMAGE_OVERRIDES[title];
  if (isAvailable(reviewed ?? null)) return reserve(reviewed);

  try {
    const primary = await getWikipediaPageImage(title, placeName);
    if (isAvailable(primary)) return reserve(primary);
  } catch {
    // Prefer broader local Commons searches before any fallback.
  }

  try {
    const searched = await searchCommonsForPlace(title, placeName);
    if (isAvailable(searched)) return reserve(searched);
  } catch {
    // Continue to a unique non-photo fallback only if local imagery cannot resolve.
  }

  // Never reuse another route's photograph. This rare fallback is intentionally
  // unique to the place and contains no visible text; it is preferable to showing
  // a false or duplicated local photograph.
  const hue = stableIndex(placeName, 360);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 1100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="hsl(${hue} 28% 28%)"/><stop offset="1" stop-color="hsl(${(hue + 34) % 360} 24% 12%)"/></linearGradient></defs><rect width="1800" height="1100" fill="url(#g)"/><path d="M0 820L260 690l190 70 250-210 250 165 220-120 250 155 380-230v580H0z" fill="rgba(255,255,255,.08)"/><path d="M0 910l330-120 250 80 260-135 260 125 260-85 440 170v155H0z" fill="rgba(255,255,255,.07)"/></svg>`;
  const src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  const fallback: LocalHeroImage = {
    src,
    alt: `Abstract local context for ${placeName}`,
    credit: "",
    local: false,
  };
  return reserve(fallback);
}
