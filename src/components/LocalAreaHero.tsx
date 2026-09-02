import Image from "next/image";
import Link from "next/link";
import type { LocalHeroImage } from "@/lib/local-image";
import { getLocalPagePersonality, type LocalPageKind } from "@/lib/local-page-personality";

export function LocalAreaHero({
  slug,
  name,
  eyebrow,
  areas,
  kind,
  heroImage,
  disclaimer,
}: {
  slug: string;
  name: string;
  eyebrow: string;
  areas: string[];
  kind: LocalPageKind;
  heroImage: LocalHeroImage;
  disclaimer: string;
}) {
  const copy = getLocalPagePersonality({ slug, name, areas, kind });
  const localLabels = areas.slice(0, 3);

  return (
    <section className="border-b border-line/60">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-6 py-10 sm:px-8 sm:py-12 lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:gap-12 lg:px-10 lg:py-14">
        <div className="max-w-lg">
          <div className="font-mono text-[10px] uppercase tracking-[.14em] text-brass">{eyebrow}</div>
          <h1 className="mt-4 font-display text-[40px] font-medium leading-[.98] tracking-[-.035em] text-parchment sm:text-[46px] lg:text-[52px]">
            {copy.lead}
            <span className="block italic text-brass">{copy.accent}</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-parchment-dim">{copy.deck}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/book" className="inline-flex min-h-11 items-center justify-center rounded-full bg-brass px-6 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110">Get my price</Link>
            <Link href="/services" className="inline-flex min-h-11 items-center justify-center rounded-full border border-sky/25 px-6 py-2.5 text-sm font-semibold text-parchment transition hover:border-sky/50">See all prices</Link>
          </div>

          <div className="mt-5 rounded-2xl border border-brass/20 bg-brass/[.06] px-4 py-3 text-[13px] leading-5 text-parchment">
            <span className="font-semibold text-brass">Local note.</span> {copy.smile}
          </div>

          <div className="mt-6 grid gap-3 border-t border-line/65 pt-5 sm:grid-cols-3">
            {[
              ["Published price", "Before the request"],
              ["Exact address", "Used for local matching"],
              ["Real acceptance", "Provider details after acceptance"],
            ].map(([title, body]) => (
              <div key={title}>
                <div className="text-[13px] font-semibold text-parchment">{title}</div>
                <div className="mt-1 text-[11px] leading-4 text-parchment-dim">{body}</div>
              </div>
            ))}
          </div>

          <p className="mt-4 max-w-lg text-[11px] leading-4 text-parchment-dim">{disclaimer}</p>
        </div>

        <figure>
          <div className="relative h-[360px] overflow-hidden rounded-[30px] border border-sky/18 bg-surface-raised shadow-[0_28px_70px_rgba(3,18,37,0.26)] sm:h-[460px]">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 60vw"
              style={{ objectFit: "cover" }}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void/95 via-void/45 to-transparent px-6 pb-6 pt-24">
              <div className="font-mono text-[10px] uppercase tracking-[.14em] text-brass">Local snapshot · {name}</div>
              {localLabels.length > 0 && <div className="mt-2 text-sm text-parchment-dim">{localLabels.join(" · ")}</div>}
            </div>
          </div>
          <figcaption className="mt-2 text-right text-[10px] leading-4 text-parchment-dim/65">
            {heroImage.creditUrl ? (
              <a href={heroImage.creditUrl} target="_blank" rel="noreferrer" className="hover:text-parchment">
                Photo: {heroImage.credit}{heroImage.license ? ` · ${heroImage.license}` : ""} ↗
              </a>
            ) : (
              heroImage.credit
            )}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
