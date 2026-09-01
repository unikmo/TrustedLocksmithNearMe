import type { Metadata } from "next";
import { PAGE_VISUALS } from "@/lib/visuals";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Boston Locksmith | Upfront Standard Prices | Trusted Locksmith",
    template: `%s | ${SITE.brandName}`,
  },
  description:
    "Request participating independent locksmith providers in Boston and Greater Boston. See the published standard price and scope before you send the request.",
  applicationName: SITE.brandName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.brandName,
    title: "Boston Locksmith | Upfront standard prices",
    description:
      "Choose the locksmith service you need, see the published standard total first, then request a participating independent local provider.",
    url: SITE.url,
    images: [PAGE_VISUALS.services.src],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boston Locksmith | Upfront standard prices",
    description:
      "See the published standard price and scope before requesting a participating independent Boston-area locksmith provider.",
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
