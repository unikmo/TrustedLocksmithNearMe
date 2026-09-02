export type PageVisual = {
  src: string;
  alt: string;
  label?: string;
  objectPosition?: string;
};

/**
 * Purpose-led photography for major conversion pages.
 * Major pages must not reuse the same hero source: each route gets its own image.
 */
export const PAGE_VISUALS: Record<string, PageVisual> = {
  services: {
    src: "https://images.unsplash.com/photo-1643877481928-2b5c63ab6f83?auto=format&fit=crop&fm=jpg&q=80&w=1800",
    alt: "Residential front entrance with secure door hardware",
    objectPosition: "center",
  },
  booking: {
    src: "https://images.unsplash.com/photo-1741156386380-0236c72eb6f9?auto=format&fit=crop&fm=jpg&q=78&w=1800",
    alt: "House keys held near the entrance of a home",
    objectPosition: "center",
  },
  digitalAccess: {
    src: "https://images.unsplash.com/photo-1733244766159-f58f4184fd38?auto=format&fit=crop&fm=jpg&q=78&w=1800",
    alt: "A hand using a key at a residential door",
    objectPosition: "center",
  },
  trust: {
    src: "https://images.unsplash.com/photo-1585914641050-fa9883c4e21c?auto=format&fit=crop&fm=jpg&q=78&w=1800",
    alt: "Residential door hardware and lock detail",
    objectPosition: "center",
  },
  propertyManagers: {
    src: "https://images.unsplash.com/photo-1759086341057-5f7912848c5c?auto=format&fit=crop&fm=jpg&q=78&w=1800",
    alt: "Modern multi-unit residential property",
    objectPosition: "center 58%",
  },
  realEstate: {
    src: "https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?auto=format&fit=crop&fm=jpg&q=78&w=1800",
    alt: "House keys held beside a residential front door",
    objectPosition: "center",
  },
  providers: {
    src: "https://images.unsplash.com/photo-1749477417968-2bc986bc6a42?auto=format&fit=crop&fm=jpg&q=78&w=1800",
    alt: "Independent locksmith workshop with key-cutting equipment",
    objectPosition: "center 58%",
  },
  secondHomes: {
    src: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&fm=jpg&q=78&w=1800",
    alt: "Distinctive residential home exterior",
    objectPosition: "center",
  },
  landlords: {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&fm=jpg&q=78&w=1800",
    alt: "Well-kept residential rental property exterior",
    objectPosition: "center",
  },
  help: {
    src: "https://images.unsplash.com/photo-1677951570313-b0750351c461?auto=format&fit=crop&fm=jpg&q=76&w=1800",
    alt: "Close view of a key at a residential door",
    objectPosition: "center",
  },
  contact: {
    src: "https://images.unsplash.com/photo-1711098256657-f40961037781?auto=format&fit=crop&fm=jpg&q=76&w=1800",
    alt: "Welcoming residential front entrance",
    objectPosition: "center",
  },
};
