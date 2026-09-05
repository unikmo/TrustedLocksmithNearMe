import type { Metadata } from "next";
import { LegalDoc, LegalSection } from "@/components/LegalDoc";
import { CookiePreferences } from "@/components/CookiePreferences";

export const metadata: Metadata = {
  title: "Cookie Preferences",
  description: "What cookies Trusted Locksmith uses and how to control them.",
  alternates: { canonical: "/cookies" },
  robots: { index: false },
};

export default function CookiesPage() {
  return (
    <LegalDoc title="Cookie Preferences" lastUpdated="September 5, 2026">
      <LegalSection title="How we use cookies">
        <p>
          Trusted Locksmith, a product of TSquare Ventures LLC, uses a small number of essential cookies to keep the site and app working — mainly
          to keep you signed in between visits. We may use limited analytics cookies to
          understand overall product usage; these never include your Digital Access contents or
          private service details.
        </p>
      </LegalSection>

      <CookiePreferences />

      <LegalSection title="Operator and contact details">
        <p>TrustedLocksmithNearMe.com is a product of TSquare Ventures LLC, a Wyoming limited liability company.</p>
        <p className="mt-3">TSquare Ventures LLC<br />30 N Gould St, Ste R<br />Sheridan, WY 82801<br />United States</p>
        <p className="mt-3">Wyoming Secretary of State filing ID: 2026-002072750</p>
        <p className="mt-3">Email: <a href="mailto:hello@trustedlocksmithnearme.com" className="text-brass hover:underline">hello@TrustedLocksmithNearMe.com</a></p>
      </LegalSection>

      <LegalSection title="More detail">
        <p>
          For the full breakdown of what we collect and why, see our{" "}
          <a href="/privacy" className="text-brass hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </LegalSection>
    </LegalDoc>
  );
}
