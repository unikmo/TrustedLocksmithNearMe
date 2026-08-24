import type { PageVisual } from "@/lib/visuals";

export function PageHero({
  eyebrow,
  title,
  body,
  visual,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  visual?: PageVisual;
}) {
  return (
    <section className="border-b border-line/70 bg-surface/18 py-14 sm:py-18 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-10">
        <div className={visual ? "grid gap-9 lg:grid-cols-[.88fr_1.12fr] lg:items-center lg:gap-14" : ""}>
          <div className="max-w-3xl">
            <div className="eyebrow">{eyebrow}</div>
            <h1 className="mt-4 font-display text-4xl font-medium leading-[1.02] tracking-[-.03em] text-parchment sm:text-5xl lg:text-[58px]">
              {title}
            </h1>
            {body && (
              <p className="mt-5 max-w-2xl text-base leading-7 text-parchment-dim sm:text-lg sm:leading-8">
                {body}
              </p>
            )}
          </div>

          {visual && (
            <figure className="relative overflow-hidden rounded-[28px] border border-sky/18 bg-surface-raised shadow-[0_26px_64px_rgba(3,18,37,0.24)]">
              <img
                src={visual.src}
                alt={visual.alt}
                width={1800}
                height={1125}
                fetchPriority="high"
                decoding="async"
                style={{ objectPosition: visual.objectPosition ?? "center" }}
                className="h-[290px] w-full object-cover sm:h-[380px] lg:h-[430px]"
              />
              {visual.label && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void/95 via-void/62 to-transparent px-5 pb-5 pt-16 text-xs font-medium leading-5 text-parchment sm:px-6 sm:pb-6 sm:text-sm">
                  {visual.label}
                </figcaption>
              )}
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
