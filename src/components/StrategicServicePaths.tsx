import Link from "next/link";
import { getStrategicServiceLinks } from "@/lib/strategic-service-links";

export function StrategicServicePaths({ serviceSlug, locationName }: { serviceSlug: string; locationName: string }) {
  const links = getStrategicServiceLinks(serviceSlug);
  if (links.length === 0) return null;

  return (
    <section className="border-b border-line/60 py-14 sm:py-16">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <div className="eyebrow">Part of a bigger property workflow?</div>
          <h2 className="mt-4 font-display text-4xl tracking-[-.03em] text-parchment sm:text-5xl">
            Use this service beyond a one-off request.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-parchment-dim">
            {serviceSlug === "rekey-locks"
              ? `Rekeying in ${locationName} often sits inside a turnover, closing or access-control workflow. Choose the path that matches the property relationship.`
              : `This ${locationName} service can also support repeat property operations, a buyer move-in or access planning for a property you manage from a distance.`}
          </p>
        </div>

        <div className={`mt-9 grid gap-5 ${links.length === 3 ? "md:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="group border-t border-line pt-5">
              <div className="font-mono text-[10px] uppercase tracking-[.14em] text-brass">{link.audience}</div>
              <h3 className="mt-3 font-display text-2xl text-parchment transition group-hover:text-brass">{link.title}</h3>
              <p className="mt-3 text-sm leading-6 text-parchment-dim">{link.body}</p>
              <span className="mt-4 inline-flex text-sm font-semibold text-brass">Explore workflow →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
