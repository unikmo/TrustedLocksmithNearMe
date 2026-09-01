import { NextResponse, type NextRequest } from "next/server";
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

  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
