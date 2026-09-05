import Link from "next/link";
import { SITE } from "@/lib/site";
import { Keyhole } from "./Keyhole";

const POPULAR_LOCATIONS = [
  ["Boston", "/boston-ma"],
  ["Cambridge", "/cambridge-ma"],
  ["Newton", "/newton-ma"],
  ["New York City", "/new-york-ny"],
  ["Manhattan", "/manhattan-ny"],
  ["Brooklyn", "/brooklyn-ny"],
  ["Queens", "/queens-ny"],
  ["Jersey City", "/jersey-city-nj"],
  ["Newark, NJ", "/newark-nj"],
  ["Philadelphia", "/philadelphia-pa"],
  ["Stamford", "/stamford-ct"],
  ["Wilmington", "/wilmington-de"],
] as const;

export function Footer() {
  return (
    <footer className="border-t border-line/70 bg-void">
      <div className="mx-auto max-w-[1180px] px-6 py-9 sm:px-8 lg:px-10">
        <div className="grid gap-8 md:grid-cols-[1.45fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3 font-display text-xl font-medium text-parchment">
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-sky/20 bg-surface-raised/70">
                <Keyhole className="h-4 w-3 text-brass" />
              </span>
              Trusted Locksmith
            </Link>
            <p className="mt-4 max-w-sm text-[15px] leading-6 text-parchment-dim">
              Published standard locksmith prices before you request help, with local matching based on the service address.
            </p>
          </div>

          <FooterColumn
            title="Get help"
            links={[
              { label: "Get my price", href: "/book" },
              { label: "Services & prices", href: "/services" },
              { label: "How it works", href: "/how-it-works" },
              { label: "Trust & safety", href: "/trust-safety" },
            ]}
          />
          <FooterColumn
            title="More"
            links={[
              { label: "About", href: "/about" },
              { label: "For locksmiths", href: "/partner-tech" },
              { label: "Property managers", href: "/for-property-managers" },
              { label: "Real estate agents", href: "/for-real-estate-agents" },
              { label: "Contact", href: "/contact" },
            ]}
          />
        </div>

        <div className="mt-8 border-t border-line/70 pt-6">
          <div className="font-mono text-[10px] uppercase tracking-[.14em] text-parchment-dim">Popular locations</div>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {POPULAR_LOCATIONS.map(([label, href]) => (
              <Link key={href} href={href} className="text-parchment-dim transition hover:text-parchment">{label}</Link>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-line/70 pt-5 text-sm text-parchment-dim sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div>&copy; {new Date().getFullYear()} {SITE.operatorName} · Trusted Locksmith</div>
            <div className="mt-1 text-xs">A Wyoming limited liability company</div>
            <div className="mt-1 text-xs">{SITE.operatorAddressText}</div>
            <a href={`mailto:${SITE.operatorEmail}`} className="mt-1 inline-block text-xs hover:text-parchment">{SITE.operatorEmail}</a>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-parchment">Privacy</Link>
            <Link href="/terms" className="hover:text-parchment">Terms</Link>
            <Link href="/member-agreement" className="hover:text-parchment">Member agreement</Link>
            <Link href="/contact" className="hover:text-parchment">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-[.14em] text-parchment-dim">{title}</div>
      <ul className="mt-4 space-y-3 text-[15px]">
        {links.map((link) => (
          <li key={link.href}><Link href={link.href} className="text-parchment-dim transition hover:text-parchment">{link.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
