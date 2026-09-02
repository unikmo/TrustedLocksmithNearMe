import type { ReactNode } from "react";
import { getSimpleLocalIntro } from "@/lib/local-page-personality";

export function SimpleLocalContext({
  name,
  areas,
  links,
}: {
  name: string;
  areas: string[];
  links?: ReactNode;
}) {
  const intro = getSimpleLocalIntro(name, areas);

  return (
    <section className="border-b border-line/60 py-12 sm:py-14">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <div className="eyebrow">{name} neighborhoods</div>
          <h2 className="mt-3 font-display text-3xl tracking-[-.025em] text-parchment sm:text-4xl">Locksmith help around {name}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-parchment-dim">{intro}</p>
        </div>

        <div className="mt-8 grid gap-6 border-y border-line/70 py-7 sm:grid-cols-3">
          <div>
            <h3 className="font-semibold text-parchment">Locked out?</h3>
            <p className="mt-2 text-sm leading-6 text-parchment-dim">Tell us whether it is your house, apartment, building entrance or car.</p>
          </div>
          <div>
            <h3 className="font-semibold text-parchment">Old keys still out there?</h3>
            <p className="mt-2 text-sm leading-6 text-parchment-dim">Rekeying can make old keys stop working after a move or tenant change.</p>
          </div>
          <div>
            <h3 className="font-semibold text-parchment">Need a new lock?</h3>
            <p className="mt-2 text-sm leading-6 text-parchment-dim">See the standard labor price before you request the job.</p>
          </div>
        </div>

        {areas.length > 0 ? (
          <div className="mt-7 flex flex-wrap gap-2">
            {areas.map((area) => (
              <span key={area} className="rounded-full border border-line/80 px-3 py-1.5 text-xs text-parchment-dim">{area}</span>
            ))}
          </div>
        ) : null}

        {links}
      </div>
    </section>
  );
}
