import type { Metadata } from "next";
import { PAGE_VISUALS } from "@/lib/visuals";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Trusted Locksmith Near Me | Upfront Prices, Local Providers",
    template: `%s | ${SITE.brandName}`,
  },
  description:
    "Find participating independent local locksmiths for home lockouts, rekeys, lock changes and smart-lock installation. See the standard price and scope before you request service.",
  applicationName: SITE.brandName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.brandName,
    title: "Trusted Locksmith Near Me | Upfront prices. Independent local providers.",
    description:
      "Choose the locksmith service you need, see the standard total first, then request a participating independent local provider.",
    url: SITE.url,
    images: [PAGE_VISUALS.services.src],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trusted Locksmith Near Me | Upfront prices. Local providers.",
    description:
      "See the standard price and scope before requesting a participating independent local locksmith provider.",
    images: [PAGE_VISUALS.services.src],
  },
  robots: { index: true, follow: true },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.operatorName,
  url: SITE.url,
  brand: {
    "@type": "Brand",
    name: SITE.brandName,
  },
  description:
    "PlanetHike OÜ operates Trusted Locksmith, a platform that helps customers request participating independent local locksmith providers with clearly scoped services and upfront standard pricing.",
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
