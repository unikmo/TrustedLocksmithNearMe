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
  extmetadata?: Record<string, { value?: string }>;
};

type CommonsPage = {
  title?: string;
  imageinfo?: CommonsInfo[];
};

type CommonsResponse = {
  query?: { pages?: Record<string, CommonsPage> };
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
  return total % count;
}

function fallback(placeName: string): LocalHeroImage {
  const fallbacks = [
    PAGE_VISUALS.services,
    PAGE_VISUALS.booking,
    PAGE_VISUALS.propertyManagers,
    PAGE_VISUALS.secondHomes,
    PAGE_VISUALS.providers,
    PAGE_VISUALS.realEstate,
  ];
  const visual = fallbacks[stableIndex(placeName, fallbacks.length)];
  return {
    src: visual.src,
    alt: `${visual.alt} — context for locksmith requests near ${placeName}`,
    credit: "Context visual",
    local: false,
  };
}

function localImageFromInfo(info: CommonsInfo, placeName: string): LocalHeroImage | null {
  const src = info.thumburl || info.url;
  if (!src) return null;
  const metadata = info.extmetadata;
  const artist = cleanText(metadata?.Artist?.value || metadata?.Credit?.value);
  const license = cleanText(metadata?.LicenseShortName?.value);
  return {
    src,
    alt: `Local view of ${placeName}`,
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
  if (!src || !pageImage) return null;

  const commonsParams = new URLSearchParams({
    action: "query",
    format: "json",
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: "1800",
    titles: `File:${pageImage}`,
    origin: "*",
  });
  const commons = await getJson<CommonsResponse>(`https://commons.wikimedia.org/w/api.php?${commonsParams.toString()}`);
  const imageInfo = firstValue(commons.query?.pages)?.imageinfo?.[0];
  if (!imageInfo) return null;
  const localImage = localImageFromInfo(imageInfo, placeName);
  return localImage ? { ...localImage, src } : null;
}

async function searchCommonsForPlace(title: string, placeName: string): Promise<LocalHeroImage | null> {
  const searchParams = new URLSearchParams({
    action: "query",
    format: "json",
    generator: "search",
    gsrsearch: `\"${title}\" streetscape OR downtown OR neighborhood`,
    gsrnamespace: "6",
    gsrlimit: "8",
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: "1800",
    origin: "*",
  });
  const commons = await getJson<CommonsResponse>(`https://commons.wikimedia.org/w/api.php?${searchParams.toString()}`);
  const pages = Object.values(commons.query?.pages ?? {});
  const excluded = /(flag|seal|logo|coat of arms|locator|map|diagram|icon|svg)/i;
  for (const page of pages) {
    if (excluded.test(page.title ?? "")) continue;
    const image = localImageFromInfo(page.imageinfo?.[0] ?? {}, placeName);
    if (image) return image;
  }
  return null;
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
    // Continue to Commons search before using a non-local fallback.
  }

  try {
    const searched = await searchCommonsForPlace(title, placeName);
    if (searched) return searched;
  } catch {
    // A varied contextual fallback avoids repeating one image across every city page.
  }

  return fallback(placeName);
}
