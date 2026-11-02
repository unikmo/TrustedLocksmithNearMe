/** Consumer enrollment and ordering are closed; existing data is retained. */
export const CLOSED_CONSUMER_ROOTS = ["book", "app", "pricing", "digital-access", "digital-sentinel", "second-homes", "activate", "brokerage"] as const;
export const LEGACY_SERVICE_REDIRECTS: Record<string, string> = { "emergency-locksmith": "", "car-lockout": "", "house-lockout": "", "rekey-locks": "turnover-rekeying", "lock-change": "", "smart-lock-installation": "" };
export function businessRedirect(pathname: string): string | null {
 const parts = pathname.split("/").filter(Boolean);
 if (CLOSED_CONSUMER_ROOTS.some(root => parts[0] === root)) return parts[0] === "app" || parts[0] === "book" ? "/property-manager" : "/for-property-managers";
 if (parts.length === 2 && Object.hasOwn(LEGACY_SERVICE_REDIRECTS, parts[1])) {const service=LEGACY_SERVICE_REDIRECTS[parts[1]];return `/${parts[0]}${service ? `/${service}` : ""}`;}
 return null;
}
export function safeBusinessNext(raw: string | null | undefined): string {
 if (!raw || !raw.startsWith("/") || raw.startsWith("//") || raw.includes("\\")) return "/property-manager";
 try { const url = new URL(raw,"https://trustedlocksmithnearme.com"); return businessRedirect(url.pathname) ?? `${url.pathname}${url.search}`; } catch { return "/property-manager"; }
}
