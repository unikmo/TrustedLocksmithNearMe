export type PageVisual = {
  src: string;
  alt: string;
  label?: string;
  objectPosition?: string;
};

/**
 * Centralized, purpose-led photography for major conversion pages.
 * Images are free-to-use Unsplash photography and are served through
 * Unsplash's responsive image CDN so page-level crops can stay lightweight.
 */
export const PAGE_VISUALS = {
  services: {
    src: "https://images.unsplash.com/photo-1711098256657-f40961037781?auto=format&fit=crop&fm=jpg&q=80&w=1800",
    alt: "Residential front entrance with secure door hardware",
    label: "Choose the job first · see the standard price before requesting a provider",
    objectPosition: "center",
  },
  booking: {
    src: "https://images.unsplash.com/photo-1741156386380-0236c72eb6f9?auto=format&fit=crop&fm=jpg&q=78&w=1600",
    alt: "House keys held near the entrance of a home",
    label: "Start with the service · provider details appear after acceptance",
    objectPosition: "center",
  },
  digitalAccess: {
    src: "https://images.unsplash.com/photo-1733244766159-f58f4184fd38?auto=format&fit=crop&fm=jpg&q=80&w=1800",
    alt: "House keys near a residential entrance",
    label: "Codes · spare keys · trusted people · recovery instructions",
    objectPosition: "center",
  },
  trust: {
    src: "https://images.unsplash.com/photo-1741156386380-0236c72eb6f9?auto=format&fit=crop&fm=jpg&q=78&w=1800",
    alt: "House keys held at an open residential doorway",
    label: "Identity after acceptance · price before work · extras by approval",
    objectPosition: "center",
  },
  propertyManagers: {
    src: "https://images.unsplash.com/photo-1759086341057-5f7912848c5c?auto=format&fit=crop&fm=jpg&q=78&w=1800",
    alt: "Modern multi-unit residential property",
    label: "Resident access · turnover rekeys · property-level service history",
    objectPosition: "center",
  },
  realEstate: {
    src: "https://images.unsplash.com/photo-1770199105692-9e52ff137cad?auto=format&fit=crop&fm=jpg&q=78&w=1800",
    alt: "Real estate professional holding house keys",
    label: "A practical closing benefit buyers can keep using",
    objectPosition: "50% 38%",
  },
  providers: {
    src: "https://images.unsplash.com/photo-1749477417968-2bc986bc6a42?auto=format&fit=crop&fm=jpg&q=78&w=1800",
    alt: "Independent locksmith workshop with key-cutting equipment",
    label: "Independent providers · local requests · private commercial terms",
    objectPosition: "center 58%",
  },
  secondHomes: {
    src: "https://images.unsplash.com/photo-1669345796269-0647283f00e2?auto=format&fit=crop&fm=jpg&q=78&w=1800",
    alt: "Detached home with a covered front porch",
    label: "Trusted access first · local service when on-site help is still needed",
    objectPosition: "center",
  },
  landlords: {
    src: "https://images.unsplash.com/photo-1759086341057-5f7912848c5c?auto=format&fit=crop&fm=jpg&q=78&w=1800",
    alt: "Modern residential apartments managed as rental property",
    label: "Turnover rekeys · access records · repeatable service workflow",
    objectPosition: "center 58%",
  },
  help: {
    src: "https://images.unsplash.com/photo-1741156386380-0236c72eb6f9?auto=format&fit=crop&fm=jpg&q=76&w=1600",
    alt: "House keys held beside an open home entrance",
    label: "Clear answers for requests, Digital Access and membership",
    objectPosition: "center",
  },
  contact: {
    src: "https://images.unsplash.com/photo-1711098256657-f40961037781?auto=format&fit=crop&fm=jpg&q=76&w=1600",
    alt: "Welcoming residential front entrance",
    label: "Customer support · property partnerships · provider network",
    objectPosition: "center",
  },
} satisfies Record<string, PageVisual>;
