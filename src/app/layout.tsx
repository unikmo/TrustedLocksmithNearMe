import type { Metadata } from "next";
import { PAGE_VISUALS } from "@/lib/visuals";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Trusted Locksmith | Upfront Standard Prices",
    template: `%s | ${SITE.brandName}`,
  },
  description:
    "Choose a locksmith service, see the published standard price and scope, then request a participating independent local provider where coverage is available.",
  applicationName: SITE.brandName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.brandName,
    title: "Trusted Locksmith | Upfront standard prices",
    description:
      "See the published standard price and scope before requesting a participating independent local locksmith provider.",
    url: SITE.url,
    images: [PAGE_VISUALS.services.src],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trusted Locksmith | Upfront standard prices",
    description:
      "Choose the service, see the standard price first, then request a participating independent local provider where coverage is available.",
    images: [PAGE_VISUALS.services.src],
  },
  robots: { index: true, follow: true },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.operatorName,
  url: SITE.url,
  brand: {
    "@type": "Brand",
    "@id": `${SITE.url}/#brand`,
    name: SITE.brandName,
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: SITE.launchMarket,
  },
  knowsAbout: [
    "residential lockouts",
    "car lockouts",
    "lock rekeying",
    "residential lock changes",
    "smart lock installation",
    "locksmith marketplace services",
    "New York locksmith service geography",
  ],
  description: SITE.positioning,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-ink text-parchment">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
