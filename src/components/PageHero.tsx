export function PageHero({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <section className="border-b border-line/70 bg-surface/18 py-14 sm:py-18 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <div className="eyebrow">{eyebrow}</div>
          <h1 className="mt-4 font-display text-4xl font-medium leading-[1.02] tracking-[-.03em] text-parchment sm:text-5xl lg:text-[58px]">
            {title}
          </h1>
          {body && <p className="mt-5 max-w-2xl text-base leading-7 text-parchment-dim sm:text-lg sm:leading-8">{body}</p>}
        </div>
      </div>
    </section>
  );
}
