import Link from "next/link";

export function CTABand({
  title,
  body,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
}: {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="border-y border-line/70 bg-surface/32 py-16 sm:py-20">
      <div className="mx-auto grid max-w-[1200px] gap-7 px-6 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:px-10">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-medium leading-tight tracking-[-.025em] text-parchment sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-parchment-dim">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
          <Link
            href={ctaHref}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-7 py-3 text-sm font-semibold text-ink shadow-[0_8px_22px_rgba(214,173,87,0.14)] transition hover:brightness-110"
          >
            {ctaLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-sky/25 px-7 py-3 text-sm font-semibold text-parchment transition hover:border-sky/50"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
