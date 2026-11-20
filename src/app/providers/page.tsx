import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Trusted Locksmith provider directory",
  description: "Prepared independent locksmith profiles for the TLNM pilot network. Claim and operational readiness must be confirmed.",
  robots: { index: false, follow: true },
};

export default async function ProvidersPage() {
  const supabase = await createClient();
  const { data: providers } = await supabase.from("provider_profiles").select("id,slug,business_name,city,state,claim_status,is_available").order("business_name");

  return (
    <div className="kh-theme flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="eyebrow">Provider network</div>
          <h1 className="mt-3 font-display text-4xl text-parchment">A good locksmith relationship starts with trust.</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-parchment-dim">Exploring the developing provider directory? A profile is only a starting point—not proof that a locksmith is available or fully approved. See the claim and verification details before relying on a listing.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(providers ?? []).map((provider: any) => (
              <Link key={provider.id} href={`/providers/${provider.slug}`} className="rounded-2xl border border-line bg-surface p-5 hover:border-brass/40">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-display text-xl text-parchment">{provider.business_name}</h2>
                  <span className={`rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-wide ${provider.claim_status === "verified" ? "bg-verdigris/10 text-verdigris" : "bg-brass/10 text-brass"}`}>{provider.claim_status === "verified" ? "Business claim verified" : "Unclaimed"}</span>
                </div>
                <p className="mt-2 text-xs text-parchment-dim">{[provider.city, provider.state].filter(Boolean).join(", ") || "Location not listed"}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center"><Link href="/providers/claim" className="inline-flex rounded-full bg-brass px-5 py-2.5 text-sm font-semibold text-ink">Find and claim your profile →</Link></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
