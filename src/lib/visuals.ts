export type PageVisual = {
  src: string;
  alt: string;
  objectPosition?: string;
};

/**
 * Centralized, purpose-led photography for major conversion pages.
 * Keep the source set intentionally small and stable so hero photography
 * remains reliable across page builds and responsive image optimization.
 */
export const PAGE_VISUALS = {
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
    src: "https://images.unsplash.com/photo-1741156386380-0236c72eb6f9?auto=format&fit=crop&fm=jpg&q=78&w=1800",
    alt: "House keys held near a residential entrance",
    objectPosition: "center",
  },
  trust: {
    src: "https://images.unsplash.com/photo-1741156386380-0236c72eb6f9?auto=format&fit=crop&fm=jpg&q=78&w=1800",
    alt: "House keys held at an open residential doorway",
    objectPosition: "center",
  },
  propertyManagers: {
    src: "https://images.unsplash.com/photo-1643877481928-2b5c63ab6f83?auto=format&fit=crop&fm=jpg&q=78&w=1800",
    alt: "Residential property entrance",
    objectPosition: "center",
  },
  realEstate: {
    src: "https://images.unsplash.com/photo-1724482606633-fa74fe4f5de1?auto=format&fit=crop&fm=jpg&q=78&w=1800",
    alt: "House key held above residential property models",
    objectPosition: "center",
  },
  providers: {
    src: "https://images.unsplash.com/photo-1749477417968-2bc986bc6a42?auto=format&fit=crop&fm=jpg&q=78&w=1800",
    alt: "Independent locksmith workshop with key-cutting equipment",
    objectPosition: "center 58%",
  },
  secondHomes: {
    src: "https://images.unsplash.com/photo-1643877481928-2b5c63ab6f83?auto=format&fit=crop&fm=jpg&q=78&w=1800",
    alt: "Residential front entrance",
    objectPosition: "center",
  },
  landlords: {
    src: "https://images.unsplash.com/photo-1643877481928-2b5c63ab6f83?auto=format&fit=crop&fm=jpg&q=78&w=1800",
    alt: "Residential rental property entrance",
    objectPosition: "center",
  },
  help: {
    src: "https://images.unsplash.com/photo-1741156386380-0236c72eb6f9?auto=format&fit=crop&fm=jpg&q=76&w=1800",
    alt: "House keys held beside an open home entrance",
    objectPosition: "center",
  },
  contact: {
    src: "https://images.unsplash.com/photo-1643877481928-2b5c63ab6f83?auto=format&fit=crop&fm=jpg&q=76&w=1800",
    alt: "Welcoming residential front entrance",
    objectPosition: "center",
  },
} satisfies Record<string, PageVisual>;
