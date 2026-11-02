import type { MetadataRoute } from "next";
import { B2B_AREAS, B2B_PATHS } from "@/lib/b2b";
import { SITE_URL } from "@/lib/site";
// Fixed to the actual B2B content release, rather than changing on every request.
const CONTENT_UPDATED = new Date("2026-11-02T00:00:00Z");
export default function sitemap(): MetadataRoute.Sitemap {
 const routes = [...B2B_PATHS, ...B2B_AREAS.filter(a=>a.launch).map(a=>`/${a.slug}`), ...["boston-ma","cambridge-ma","newton-ma"].map(slug=>`/${slug}/turnover-rekeying`)];
 return [...new Set(routes)].map(path=>({url:`${SITE_URL}${path}`,lastModified:CONTENT_UPDATED,changeFrequency:"monthly",priority:path===""?1:path==="/for-property-managers"?0.9:0.7}));
}
