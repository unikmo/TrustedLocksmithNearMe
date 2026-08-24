import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://trustedlocksmithnearme.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Trusted Locksmith Near Me | Upfront Prices, Local Providers",
    template: "%s | Trusted Locksmith",
  },
  description:
    "Find participating independent local locksmiths for home lockouts, rekeys, lock changes and smart-lock installation. See the standard price and scope before you request service.",
  applicationName: "Trusted Locksmith",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Trusted Locksmith",
    title: "Trusted Locksmith Near Me | Upfront prices. Independent local providers.",
    description:
      "Choose the locksmith service you need, see the standard total first, then request a participating independent local provider.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Trusted Locksmith Near Me | Upfront prices. Local providers.",
    description:
      "See the standard price and scope before requesting a participating independent local locksmith provider.",
  },
  robots: { index: true, follow: true },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PlanetHike OÜ",
  url: siteUrl,
  brand: {
    "@type": "Brand",
    name: "Trusted Locksmith",
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
