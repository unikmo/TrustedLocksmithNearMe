import Link from "next/link";
import { Keyhole } from "./Keyhole";

const NAV_LINKS = [
  { label: "Services & prices", href: "/services" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Digital Access", href: "/digital-access" },
  { label: "Membership", href: "/pricing" },
  { label: "For providers", href: "/partner-tech" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/65 bg-ink/94 shadow-[0_8px_30px_rgba(4,19,38,0.14)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-10">
        <Link href="/" className="flex min-h-11 items-center gap-3 font-display text-xl font-medium text-parchment">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-sky/25 bg-surface-raised/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <Keyhole className="h-4 w-3 text-brass" />
          </span>
          <span className="whitespace-nowrap">Trusted Locksmith</span>
        </Link>

        <nav className="hidden items-center gap-6 text-[14px] text-parchment-dim xl:flex" aria-label="Primary navigation">
          {NAV_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-parchment">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          <Link href="/login" className="min-h-11 px-2 py-3 text-[14px] text-parchment-dim transition hover:text-parchment">
            Log in
          </Link>
          <Link
            href="/book"
            className="inline-flex min-h-11 items-center rounded-full bg-brass px-5 py-2.5 text-[14px] font-semibold text-ink shadow-[0_8px_22px_rgba(214,173,87,0.16)] transition hover:brightness-110"
          >
            Find a locksmith
          </Link>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <Link
            href="/book"
            className="hidden min-h-10 items-center rounded-full bg-brass px-4 py-2 text-sm font-semibold text-ink sm:inline-flex"
          >
            Find a locksmith
          </Link>
          <details className="group relative">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-line bg-surface-raised text-parchment marker:content-none" aria-label="Open navigation menu">
              <span className="space-y-1.5" aria-hidden="true">
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-5 bg-current" />
              </span>
            </summary>
            <div className="absolute right-0 mt-3 w-[min(88vw,360px)] rounded-2xl border border-line bg-surface-raised p-3 shadow-2xl">
              <nav className="grid" aria-label="Mobile navigation">
                {NAV_LINKS.map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-xl px-4 py-3 text-[15px] text-parchment transition hover:bg-surface">
                    {item.label}
                  </Link>
                ))}
                <Link href="/for-property-managers" className="rounded-xl px-4 py-3 text-[15px] text-parchment transition hover:bg-surface">
                  Property managers
                </Link>
                <Link href="/for-real-estate-agents" className="rounded-xl px-4 py-3 text-[15px] text-parchment transition hover:bg-surface">
                  Real estate professionals
                </Link>
                <Link href="/login" className="rounded-xl px-4 py-3 text-[15px] text-parchment transition hover:bg-surface">
                  Log in
                </Link>
                <Link href="/book" className="mt-2 rounded-xl bg-brass px-4 py-3 text-center text-[15px] font-semibold text-ink sm:hidden">
                  Find a locksmith
                </Link>
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
