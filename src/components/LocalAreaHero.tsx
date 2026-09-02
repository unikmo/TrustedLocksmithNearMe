import Image from "next/image";
import Link from "next/link";
import type { LocalHeroImage } from "@/lib/local-image";
import { getLocalPagePersonality, getLocalSmile } from "@/lib/local-page-personality";

export function LocalAreaHero({
  slug,
  name,
  eyebrow,
  areas,
  heroImage,
}: {
  slug: string;
  name: string;
  eyebrow: string;
  areas: string[];
  heroImage: LocalHeroImage;
}) {
  const copy = getLocalPagePersonality({ slug, name });
  const smile = getLocalSmile({ slug, name, areas });

  return (
    <section className="border-b border-line/60">
      <div className="mx-auto grid max-w-[1180px] gap-8 px-6 py-9 sm:px-8 sm:py-11 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:gap-12 lg:px-10 lg:py-12">
        <div className="max-w-md">
          <div className="font-mono text-[10px] uppercase tracking-[.14em] text-brass">{eyebrow}</div>
          <h1 className="mt-4 font-display text-[38px] font-medium leading-[.98] tracking-[-.035em] text-parchment sm:text-[43px] lg:text-[48px]">
            {copy.lead}
            <span className="block italic text-brass">{copy.accent}</span>
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-6 text-parchment-dim">{copy.deck}</p>
          <p className="mt-3 max-w-md text-[13px] italic leading-5 text-brass">{smile}</p>

          <div className="mt-6 flex flex-wrap items-center gap-5">
            <Link href="/book" className="inline-flex min-h-11 items-center justify-center rounded-full bg-brass px-6 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110">Get my price</Link>
            <Link href="/services" className="text-sm font-semibold text-parchment transition hover:text-brass hover:underline">See prices →</Link>
          </div>
        </div>

        <figure>
          <div className="relative h-[350px] overflow-hidden rounded-[30px] border border-sky/18 bg-surface-raised shadow-[0_28px_70px_rgba(3,18,37,0.26)] sm:h-[460px]">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 64vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          {heroImage.creditUrl ? (
            <figcaption className="mt-2 text-right text-[9px] leading-4 text-parchment-dim/55">
              <a href={heroImage.creditUrl} target="_blank" rel="noreferrer" className="hover:text-parchment">
                Photo: {heroImage.credit}{heroImage.license ? ` · ${heroImage.license}` : ""} ↗
              </a>
            </figcaption>
          ) : null}
        </figure>
      </div>
    </section>
  );
}
