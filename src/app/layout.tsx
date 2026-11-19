import type { Metadata } from "next";
import { PAGE_VISUALS } from "@/lib/visuals";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "TLNM | Keys happen. Have a plan.",
    template: `%s | ${SITE.brandName}`,
  },
  description:
    "Create a free household Keys Happen backup plan and explore clear, no-pressure locksmith and business property-access guidance. Service availability requires confirmation.",
  applicationName: SITE.brandName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.brandName,
    title: "TLNM | Keys happen. Have a plan.",
    description:
      "Free Keys Happen household planning and transparent locksmith scopes, plus business rekeying guidance. Availability and appointments require confirmation.",
    url: SITE.url,
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "TLNM | Keys happen. Have a plan.",
    description:
      "Make a free household backup plan and find clear next steps without pressure.",
    images: [PAGE_VISUALS.services.src],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 } },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.operatorName,
  url: SITE.url,
  legalName: SITE.operatorName,
  address: { "@type": "PostalAddress", ...SITE.operatorAddress },
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
    "managed-property resident access requests",
    "lock rekeying",
    "residential lock changes",
    "smart lock installation",
    "locksmith marketplace services",
    "property-manager turnover rekey workflows",
    "landlord tenant-turnover rekeying",
    "move-in rekeying after real-estate closings",
    "portfolio locksmith coordination",
    "Northeast United States locksmith service geography",
    "New York locksmith service geography",
    "New Jersey locksmith service geography",
    "Philadelphia locksmith service geography",
    "Connecticut locksmith service geography",
    "Delaware locksmith service geography",
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE.url}/#website`, name: SITE.brandName, url: SITE.url, publisher: { "@id": `${SITE.url}/#organization` }, inLanguage: "en-US" }) }} />
        {children}
      </body>
    </html>
  );
}
