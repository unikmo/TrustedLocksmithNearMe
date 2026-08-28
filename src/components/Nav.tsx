import Link from "next/link";
import { Keyhole } from "./Keyhole";

const NAV_LINKS = [
  { label: "Boston", href: "/boston-ma" },
  { label: "Services & prices", href: "/services" },
  { label: "For locksmiths", href: "/partner-tech" },
  { label: "How it works", href: "/#how-it-works" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/55 bg-ink/96 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-10">
        <Link href="/" className="flex min-h-11 items-center gap-3 font-display text-lg font-medium text-parchment sm:text-xl">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-sky/20 bg-surface-raised/65">
            <Keyhole className="h-4 w-3 text-brass" />
          </span>
          <span className="whitespace-nowrap">Trusted Locksmith</span>
        </Link>

        <nav className="hidden items-center gap-7 text-[14px] text-parchment-dim lg:flex" aria-label="Primary navigation">
          {NAV_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-parchment">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login" className="px-2 py-3 text-[13px] text-parchment-dim transition hover:text-parchment">
            Log in
          </Link>
          <Link
            href="/book"
            className="inline-flex min-h-11 items-center rounded-full bg-brass px-5 py-2.5 text-[14px] font-semibold text-ink transition hover:brightness-110"
          >
            Get my price
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/book" className="hidden min-h-10 items-center rounded-full bg-brass px-4 py-2 text-sm font-semibold text-ink sm:inline-flex">
            Get my price
          </Link>
          <details className="group relative">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-line bg-surface-raised text-parchment marker:content-none" aria-label="Open navigation menu">
              <span className="space-y-1.5" aria-hidden="true">
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-5 bg-current" />
              </span>
            </summary>
            <div className="absolute right-0 mt-3 w-[min(88vw,340px)] rounded-2xl border border-line bg-surface-raised p-3 shadow-2xl">
              <nav className="grid" aria-label="Mobile navigation">
                {NAV_LINKS.map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-xl px-4 py-3 text-[15px] text-parchment transition hover:bg-surface">
                    {item.label}
                  </Link>
                ))}
                <Link href="/login" className="rounded-xl px-4 py-3 text-[15px] text-parchment transition hover:bg-surface">
                  Log in
                </Link>
                <Link href="/book" className="mt-2 rounded-xl bg-brass px-4 py-3 text-center text-[15px] font-semibold text-ink sm:hidden">
                  Get my price
                </Link>
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
