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
const GOOD_IMAGE_TITLE = /(street|streetscape|downtown|neighborhood|district|skyline|main street|architecture|houses|homes|rowhouse|brownstone|waterfront)/i;

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

function fallback(placeName: string): LocalHeroImage {
  const all = Object.values(PAGE_VISUALS);
  const unique = Array.from(new Map(all.map((visual) => [visual.src, visual])).values());
  const visual = unique[stableIndex(placeName, unique.length)] ?? PAGE_VISUALS.services;
  return {
    src: visual.src,
    alt: `${visual.alt} — context for locksmith requests near ${placeName}`,
    credit: "",
    local: false,
  };
}

function localImageFromInfo(
  info: CommonsInfo,
  placeName: string,
  sourceTitle: string,
): LocalHeroImage | null {
  const src = info.thumburl || info.url;
  if (!src || BAD_IMAGE_TITLE.test(sourceTitle) || !hasHeroShape(info)) return null;
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
  const response = await fetch(url, { cache: "force-cache" });
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

async function searchCommonsForPlace(title: string, placeName: string): Promise<LocalHeroImage | null> {
  const searchParams = new URLSearchParams({
    action: "query",
    format: "json",
    generator: "search",
    gsrsearch: `\"${title}\" (street OR streetscape OR downtown OR neighborhood OR skyline OR architecture OR houses)`,
    gsrnamespace: "6",
    gsrlimit: "20",
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
    const image = localImageFromInfo(info, placeName, sourceTitle);
    if (!image) continue;
    candidates.push({ image, title: sourceTitle, info, score: scoreCandidate(sourceTitle, info) });
  }

  if (candidates.length === 0) return null;
  candidates.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  const top = candidates.slice(0, Math.min(6, candidates.length));
  return top[stableIndex(placeName, top.length)]?.image ?? candidates[0].image;
}

export async function getLocalHeroImage({
  title,
  placeName,
}: {
  title: string;
  placeName: string;
}): Promise<LocalHeroImage> {
  try {
    const primary = await getWikipediaPageImage(title, placeName);
    if (primary) return primary;
  } catch {
    // Prefer a broader local Commons search before any non-local fallback.
  }

  try {
    const searched = await searchCommonsForPlace(title, placeName);
    if (searched) return searched;
  } catch {
    // Fall back to a varied purpose-led image only when local imagery cannot be resolved.
  }

  return fallback(placeName);
}
