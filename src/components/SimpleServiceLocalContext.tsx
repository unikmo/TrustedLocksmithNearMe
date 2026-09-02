import { getLocalSmile, getSimpleLocalIntro } from "@/lib/local-page-personality";

export function SimpleServiceLocalContext({
  slug,
  name,
  areas,
  serviceLabel,
}: {
  slug: string;
  name: string;
  areas: string[];
  serviceLabel: string;
}) {
  const intro = getSimpleLocalIntro(name, areas);
  const smile = getLocalSmile(slug);

  return (
    <section className="border-b border-line/60 py-12 sm:py-14">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <div className="eyebrow">{name} neighborhoods</div>
          <h2 className="mt-3 font-display text-3xl tracking-[-.025em] text-parchment sm:text-4xl">{serviceLabel} around {name}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-parchment-dim">{intro}</p>
          {smile ? <p className="mt-4 max-w-2xl text-sm italic leading-6 text-brass">{smile}</p> : null}
        </div>

        {areas.length > 0 ? (
          <div className="mt-7 flex flex-wrap gap-2">
            {areas.map((area) => (
              <span key={area} className="rounded-full border border-line/80 px-3 py-1.5 text-xs text-parchment-dim">{area}</span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
