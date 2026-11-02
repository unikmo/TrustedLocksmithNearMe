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
    <LegalDoc title="Cookie Preferences" lastUpdated="November 2, 2026">
      <LegalSection title="How we use cookies">
        <p>
          Trusted Locksmith, operated by PlanetHike OÜ, uses essential cookies for sign-in and session security. This page describes the current application setup.
        </p>
      </LegalSection>

      <CookiePreferences />

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
