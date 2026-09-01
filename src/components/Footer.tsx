import Link from "next/link";
import { Keyhole } from "./Keyhole";

const MASSACHUSETTS_MARKETS = [
  ["Boston", "/boston-ma"],
  ["Cambridge", "/cambridge-ma"],
  ["Newton", "/newton-ma"],
  ["Somerville", "/somerville-ma"],
  ["Medford", "/medford-ma"],
  ["Watertown", "/watertown-ma"],
  ["Waltham", "/waltham-ma"],
  ["Quincy", "/quincy-ma"],
  ["Lynn", "/lynn-ma"],
  ["Malden", "/malden-ma"],
  ["Revere", "/revere-ma"],
  ["Braintree", "/braintree-ma"],
  ["Chelsea", "/chelsea-ma"],
] as const;

const NEW_YORK_MARKETS = [
  ["New York City", "/new-york-ny"],
  ["Manhattan", "/manhattan-ny"],
  ["Brooklyn", "/brooklyn-ny"],
  ["Queens", "/queens-ny"],
  ["Bronx", "/bronx-ny"],
  ["Staten Island", "/staten-island-ny"],
  ["Buffalo", "/buffalo-ny"],
  ["Rochester", "/rochester-ny"],
  ["Albany", "/albany-ny"],
] as const;

export function Footer() {
  return (
    <footer className="border-t border-line/70 bg-void">
      <div className="mx-auto max-w-[1400px] px-6 py-10 sm:px-8 lg:px-10">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3 font-display text-xl font-medium text-parchment">
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-sky/20 bg-surface-raised/70">
                <Keyhole className="h-4 w-3 text-brass" />
              </span>
              Trusted Locksmith
            </Link>
            <p className="mt-4 max-w-sm text-[15px] leading-6 text-parchment-dim">
              Boston-first locksmith marketplace with published standard prices and clear scope before a request. Localized New York request pages are being added without pretending provider availability is guaranteed.
            </p>
            <p className="mt-3 max-w-md text-sm leading-6 text-parchment-dim/75">
              Trusted Locksmith is operated by PlanetHike OÜ. Field work is performed by participating independent local providers, and provider identity and ETA appear only after a real provider accepts.
            </p>
          </div>

          <FooterColumn
            title="Use Trusted Locksmith"
            links={[
              { label: "Find a locksmith", href: "/book" },
              { label: "Services & prices", href: "/services" },
              { label: "How it works", href: "/how-it-works" },
              { label: "Digital Access", href: "/digital-access" },
              { label: "For providers", href: "/partner-tech" },
            ]}
          />
          <FooterColumn
            title="More"
            links={[
              { label: "About Trusted Locksmith", href: "/about" },
              { label: "Trust & safety", href: "/trust-safety" },
              { label: "Property managers", href: "/for-property-managers" },
              { label: "Real estate professionals", href: "/for-real-estate-agents" },
              { label: "Contact", href: "/contact" },
              { label: "Terms", href: "/terms" },
            ]}
          />
        </div>

        <MarketRow title="Massachusetts service areas" markets={MASSACHUSETTS_MARKETS} />
        <MarketRow title="New York locations" markets={NEW_YORK_MARKETS} />

        <div className="mt-7 flex flex-col gap-3 border-t border-line/70 pt-5 text-sm text-parchment-dim sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} PlanetHike OÜ</span>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-parchment">Privacy</Link>
            <Link href="/member-agreement" className="hover:text-parchment">Member agreement</Link>
            <span>Trusted Locksmith membership is not insurance.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MarketRow({ title, markets }: { title: string; markets: readonly (readonly [string, string])[] }) {
  return (
    <div className="mt-8 border-t border-line/70 pt-6">
      <div className="font-mono text-[10px] uppercase tracking-[.14em] text-parchment-dim">{title}</div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {markets.map(([label, href]) => (
          <Link key={href} href={href} className="text-parchment-dim transition hover:text-parchment">{label}</Link>
        ))}
      </div>
    </div>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-[.14em] text-parchment-dim">{title}</div>
      <ul className="mt-4 space-y-3 text-[15px]">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-parchment-dim transition hover:text-parchment">{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
