import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Keyhole } from "@/components/Keyhole";
import { SERVICE_MENU, formatServicePrice } from "@/lib/service-menu";
import { PAGE_VISUALS } from "@/lib/visuals";

export const metadata: Metadata = {
  title: "Find a Locksmith | Choose Service & See Price",
  description:
    "Choose a lockout, rekey, lock change or smart-lock service and see the standard Trusted Locksmith price before you submit a request.",
  alternates: { canonical: "/book" },
  openGraph: { images: [PAGE_VISUALS.booking.src] },
  twitter: { card: "summary_large_image", images: [PAGE_VISUALS.booking.src] },
};

const urgentServices = SERVICE_MENU.filter((service) => service.jobType === "lockout");
const scheduledServices = SERVICE_MENU.filter((service) => service.jobType !== "lockout");

export default function BookPage() {
  return (
    <div className="min-h-screen bg-ink px-5 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-2.5 font-display text-lg font-medium text-parchment">
            <span className="grid h-8 w-8 place-items-center rounded-xl border border-brass/30 bg-brass/10">
              <Keyhole className="h-4 w-3 text-brass" />
            </span>
            Trusted Locksmith
          </Link>
          <Link href="/services" className="text-sm text-parchment-dim hover:text-parchment">Services & prices</Link>
        </div>

        <div className="mt-10 grid gap-7 border-b border-line/70 pb-8 sm:mt-14 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:gap-9">
          <div className="text-center lg:text-left">
            <div className="lg:inline-block"><Progress current={1} /></div>
            <div className="mt-6 eyebrow">Find a locksmith</div>
            <h1 className="mt-3 font-display text-4xl font-medium leading-tight tracking-[-.025em] text-parchment sm:text-5xl">What do you need help with?</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-parchment-dim sm:text-base lg:mx-0">
              Choose the service first. You will see the standard total throughout the request. Provider travel/service call is included.
            </p>
          </div>

          <div className="relative h-[190px] overflow-hidden rounded-[22px] border border-sky/18 bg-surface-raised shadow-[0_18px_42px_rgba(3,18,37,0.2)] sm:h-[230px] lg:h-[260px]">
            <Image
              src={PAGE_VISUALS.booking.src}
              alt={PAGE_VISUALS.booking.alt}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 42vw"
              style={{ objectFit: "cover", objectPosition: PAGE_VISUALS.booking.objectPosition ?? "center" }}
            />
          </div>
        </div>

        <ServiceChoiceGroup title="Locked out now" note="Choose the timing that matches your request." services={urgentServices} />
        <ServiceChoiceGroup title="Scheduled lock service" note="Rekey, replace or install a lock at a planned time." services={scheduledServices} />

        <div className="mt-8 border-t border-line/70 pt-6 text-center text-xs leading-5 text-parchment-dim">
          Availability varies by location and time. A provider name and ETA appear only after a participating independent local provider accepts your request.
        </div>
      </div>
    </div>
  );
}

function ServiceChoiceGroup({
  title,
  note,
  services,
}: {
  title: string;
  note: string;
  services: typeof SERVICE_MENU;
}) {
  return (
    <section className="mt-9">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 className="font-display text-2xl text-parchment">{title}</h2>
        <p className="text-xs text-parchment-dim">{note}</p>
      </div>
      <div className="mt-4 border-y border-line/70">
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/book/details?service_id=${service.id}`}
            className="group grid gap-3 border-b border-line/70 px-1 py-5 transition last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6"
          >
            <span>
              <span className="block font-semibold text-parchment">{service.title}</span>
              <span className="mt-1 block text-xs leading-5 text-parchment-dim">{service.timing}</span>
            </span>
            <span className="flex items-center justify-between gap-4 sm:justify-end">
              <span className="font-display text-3xl text-brass">{formatServicePrice(service.customerPriceCents)}</span>
              <span className="text-brass transition group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Progress({ current }: { current: 1 | 2 | 3 }) {
  return (
    <div className="mx-auto flex max-w-sm items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[.12em] text-parchment-dim lg:mx-0 lg:justify-start" aria-label={`Step ${current} of 3`}>
      {["Service", "Details", "Review"].map((label, index) => {
        const step = index + 1;
        return (
          <div key={label} className="flex items-center gap-2">
            <span className={step <= current ? "text-brass" : "text-parchment-dim/60"}>{step}. {label}</span>
            {step < 3 && <span className="text-line">/</span>}
          </div>
        );
      })}
    </div>
  );
}
