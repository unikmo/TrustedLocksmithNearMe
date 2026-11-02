import { NextResponse, type NextRequest } from "next/server";
import { BUSINESS_REQUESTS_AVAILABLE } from "@/lib/business-availability";
import { businessRedirect } from "@/lib/business-only";
import { updateSession } from "@/lib/supabase/middleware";

const LEGACY_PUBLIC_HOSTS = new Set([
  "mykeepwell.vercel.app",
  "keepwell-eta.vercel.app",
  "mykeepwell-unikmos-projects.vercel.app",
  "mykeepwell-git-main-unikmos-projects.vercel.app",
]);

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase().split(":")[0] ?? "";

  if (LEGACY_PUBLIC_HOSTS.has(host)) {
    const canonical = new URL(request.nextUrl.pathname + request.nextUrl.search, "https://trustedlocksmithnearme.com");
    return NextResponse.redirect(canonical, 308);
  }

  const target = businessRedirect(request.nextUrl.pathname);
  if (target) {
    const destination = new URL(target, request.url);
    // Discard consumer query strings and never forward their POST body.
    return NextResponse.redirect(destination, request.method === "GET" || request.method === "HEAD" ? 308 : 303);
  }
  if (!BUSINESS_REQUESTS_AVAILABLE && ["/property-manager", "/signup"].includes(request.nextUrl.pathname)) return NextResponse.next();
  // Public B2B content does not need an auth-network round trip.
  const path = request.nextUrl.pathname;
  if (!["/property-manager", "/provider", "/admin", "/login", "/signup", "/auth"].some(prefix => path === prefix || path.startsWith(prefix + "/"))) return NextResponse.next();
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
