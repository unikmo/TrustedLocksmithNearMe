import Link from "next/link";
import { OperatorDetails } from "@/components/OperatorDetails";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export function LegalDoc({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:bg-brass focus:p-4 focus:text-ink">Skip to content</a>
      <Nav />
      <main id="main" className="flex-1 py-12 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="eyebrow">Legal</div>
          <h1 className="mt-3 font-display text-3xl font-medium text-parchment sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-wide text-parchment-dim">
            Last updated {lastUpdated}
          </p>

          <OperatorDetails />
          <nav aria-label="Legal pages" className="mt-6 flex flex-wrap gap-5 text-sm text-brass"><Link href="/terms" className="underline">Terms</Link><Link href="/privacy" className="underline">Privacy</Link><Link href="/cookies" className="underline">Cookies</Link></nav>
          <div className="legal-prose mt-10 space-y-8 text-base leading-7 text-parchment-dim">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-medium text-parchment">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
