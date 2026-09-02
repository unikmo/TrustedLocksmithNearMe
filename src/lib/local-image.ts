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
  descriptionurl?: string;
  extmetadata?: Record<string, { value?: string }>;
};

type CommonsPage = {
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

function fallback(placeName: string): LocalHeroImage {
  return {
    src: PAGE_VISUALS.services.src,
    alt: `Residential entrance used for locksmith service requests near ${placeName}`,
    credit: "Residential access visual",
    local: false,
  };
}

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: "force-cache" });
  if (!response.ok) throw new Error(`Image source request failed with ${response.status}`);
  return response.json() as Promise<T>;
}

export async function getLocalHeroImage({
  title,
  placeName,
}: {
  title: string;
  placeName: string;
}): Promise<LocalHeroImage> {
  try {
    const wikiParams = new URLSearchParams({
      action: "query",
      format: "json",
      prop: "pageimages",
      piprop: "thumbnail|name",
      pithumbsize: "1600",
      redirects: "1",
      titles: title,
      origin: "*",
    });
    const wiki = await getJson<WikiResponse>(`https://en.wikipedia.org/w/api.php?${wikiParams.toString()}`);
    const page = firstValue(wiki.query?.pages);
    const src = page?.thumbnail?.source;
    const pageImage = page?.pageimage;
    if (!src || !pageImage) return fallback(placeName);

    const commonsParams = new URLSearchParams({
      action: "query",
      format: "json",
      prop: "imageinfo",
      iiprop: "url|extmetadata",
      titles: `File:${pageImage}`,
      origin: "*",
    });
    const commons = await getJson<CommonsResponse>(`https://commons.wikimedia.org/w/api.php?${commonsParams.toString()}`);
    const imageInfo = firstValue(commons.query?.pages)?.imageinfo?.[0];
    const metadata = imageInfo?.extmetadata;
    const artist = cleanText(metadata?.Artist?.value || metadata?.Credit?.value);
    const license = cleanText(metadata?.LicenseShortName?.value);

    return {
      src,
      alt: `Local view of ${placeName}`,
      credit: artist || "Wikimedia Commons",
      creditUrl: imageInfo?.descriptionurl,
      license: license || undefined,
      local: true,
    };
  } catch {
    return fallback(placeName);
  }
}
