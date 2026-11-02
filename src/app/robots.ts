import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
const PRIVATE_PATHS = ["/app", "/admin", "/provider/", "/property-manager", "/brokerage", "/activate/", "/login", "/signup", "/auth/", "/api/", "/book/"];
export default function robots(): MetadataRoute.Robots { return { rules: [{ userAgent: ["OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Claude-SearchBot", "Claude-User", "Googlebot", "Bingbot"], allow: "/", disallow: PRIVATE_PATHS }, { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS }], sitemap: `${SITE_URL}/sitemap.xml` }; }
