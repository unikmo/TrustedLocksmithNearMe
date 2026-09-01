import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";
import { hasAdminClientConfig } from "@/lib/supabase/admin";
import { hasStripeConnectConfig } from "@/lib/stripe-connect";
import { MA_CITIES } from "@/lib/massachusetts-seo";
import { NY_AREAS } from "@/lib/new-york-seo";
import { NORTHEAST_AREAS } from "@/lib/northeast-seo";
import { expansionCredentialGateAreas } from "@/lib/provider-eligibility";
import { saveProviderSetup, startPayoutOnboarding, syncPayoutStatus } from "./actions";

export const metadata: Metadata = { title: "Provider onboarding", robots: { index: false } };

const SERVICES = [
  ["lockout", "Home lockouts"],
  ["car_lockout", "Car lockouts"],
  ["rekey", "Rekeying"],
  ["lock_change", "Lock changes"],
  ["smart_lock", "Smart-lock installation"],
] as const;

const MARKET_GROUPS = [
  {
    title: "Massachusetts",
    note: "Existing Massachusetts values are preserved for compatibility with already-saved provider profiles.",
    areas: MA_CITIES.map((area) => ({ value: area.name, label: `${area.name}, MA` })),
  },
  {
    title: "New York",
    note: "Choose only the New York markets you genuinely cover. Neighborhood choices are optional when a broader borough/city area already describes your coverage.",
    areas: NY_AREAS.map((area) => ({ value: area.shortLocation, label: area.shortLocation })),
  },
  {
    title: "New Jersey",
    note: "Choose only the New Jersey cities or townships your business actually serves. Provider credential requirements remain a separate activation gate.",
    areas: NORTHEAST_AREAS.filter((area) => area.group === "new-jersey").map((area) => ({ value: area.shortLocation, label: area.shortLocation })),
  },
  {
    title: "Philadelphia",
    note: "Use the citywide market or add the Philadelphia submarkets that accurately describe your real service radius.",
    areas: NORTHEAST_AREAS.filter((area) => area.group === "philadelphia").map((area) => ({ value: area.shortLocation, label: area.shortLocation })),
  },
  {
    title: "Connecticut",
    note: "Choose only Connecticut markets you genuinely cover. Registration and other provider-eligibility requirements remain separate from geographic selection.",
    areas: NORTHEAST_AREAS.filter((area) => area.group === "connecticut").map((area) => ({ value: area.shortLocation, label: area.shortLocation })),
  },
  {
    title: "Delaware",
    note: "Choose the Delaware markets you actually serve, including coastal areas only when your normal operating radius supports them.",
    areas: NORTHEAST_AREAS.filter((area) => area.group === "delaware").map((area) => ({ value: area.shortLocation, label: area.shortLocation })),
  },
] as const;

export default async function ProviderOnboarding({ searchParams }: { searchParams: Promise<{ notice?: string; error?: string }> }) {
  const { notice, error } = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/provider/onboarding");

  const { data: provider } = await supabase.from("provider_profiles").select("*").eq("claimed_user_id", user.id).eq("claim_status", "verified").maybeSingle();
  if (!provider) redirect("/providers/claim?error=Claim your business profile before onboarding.");

  const selectedAreas = Array.isArray(provider.service_area) ? provider.service_area : [];
  const serviceSetup = Array.isArray(provider.services) && provider.services.length > 0 && selectedAreas.length > 0;
  const payoutStarted = Boolean(provider.stripe_account_id);
  const payoutReady = Boolean(provider.stripe_details_submitted && provider.stripe_payouts_enabled);
  const credentialGateAreas = expansionCredentialGateAreas(selectedAreas);
  const credentialReady = credentialGateAreas.length === 0;
  const activationReady = serviceSetup && payoutReady && credentialReady;
  const stripeConfigured = hasAdminClientConfig() && hasStripeConnectConfig();

  return (
    <div className="flex min-h-screen flex-col"><Nav /><main className="flex-1 py-12"><div className="mx-auto max-w-5xl px-6">
      <div className="eyebrow">Provider onboarding</div>
      <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><h1 className="font-display text-4xl text-parchment sm:text-5xl">Activate {provider.business_name}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-parchment-dim">Choose the services and locations you actually cover, then complete Stripe-hosted payout setup. Trusted Locksmith never asks you to type bank-account or routing details into this site.</p></div><Link href="/provider" className="text-sm font-semibold text-brass">Provider dashboard →</Link></div>
      {notice && <div className="mt-6 rounded-xl border border-verdigris/30 bg-verdigris/10 p-3 text-sm text-verdigris">{notice}</div>}
      {error && <div className="mt-6 rounded-xl border border-ember/30 bg-ember/10 p-3 text-sm text-ember">{error}</div>}

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatusCard n="01" title="Business claim" status="Complete" complete body="Your provider account is linked to this business profile." />
        <StatusCard n="02" title="Service setup" status={serviceSetup ? "Complete" : "Required"} complete={serviceSetup} body="Choose the services and geographic areas you genuinely cover." />
        <StatusCard n="03" title="Secure payouts" status={payoutReady ? "Payout-ready" : payoutStarted ? "In progress" : "Required"} complete={payoutReady} body="Stripe handles identity verification and bank payout details directly." />
        <StatusCard n="04" title="Market eligibility" status={credentialReady ? "No expansion gate" : "Verification required"} complete={credentialReady} body={credentialReady ? "Your current selected areas do not trigger the expansion-market credential gate." : "Expansion-market availability stays off until jurisdiction-specific credential verification is implemented and passed."} />
      </div>

      {!credentialReady && <div className="mt-6 rounded-2xl border border-ember/30 bg-ember/10 p-5"><div className="font-mono text-[10px] uppercase tracking-[.12em] text-ember">Expansion credential gate</div><p className="mt-2 text-sm leading-6 text-parchment-dim">Selected expansion areas: {credentialGateAreas.join(", ")}. Geographic coverage selection is not treated as proof of licensing, registration, insurance or other eligibility. Paid availability for these markets is fail-closed until the market-specific verification layer is connected.</p></div>}

      <section className="mt-10 rounded-3xl border border-line bg-surface p-6 sm:p-8">
        <div className="eyebrow">Services & coverage</div><h2 className="mt-3 font-display text-3xl text-parchment">Choose what you want to receive.</h2>
        <form action={saveProviderSetup} className="mt-7 space-y-8">
          <fieldset><legend className="font-mono text-[10px] uppercase tracking-[.12em] text-parchment-dim">Services</legend><div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{SERVICES.map(([value,label])=><Choice key={value} name="services" value={value} label={label} checked={(provider.services ?? []).includes(value)} />)}</div></fieldset>
          {MARKET_GROUPS.map((group) => (
            <fieldset key={group.title} className="border-t border-line/70 pt-7">
              <legend className="font-mono text-[10px] uppercase tracking-[.12em] text-parchment-dim">{group.title} service areas</legend>
              <p className="mt-2 text-xs leading-5 text-parchment-dim">{group.note}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {group.areas.map((area) => <Choice key={`${group.title}-${area.value}`} name="service_area" value={area.value} label={area.label} checked={selectedAreas.includes(area.value)} />)}
              </div>
            </fieldset>
          ))}
          <button className="rounded-full border border-sky/30 px-6 py-2.5 text-sm font-semibold text-parchment">Save service setup</button>
        </form>
      </section>

      <section className="mt-6 rounded-3xl border border-brass/25 bg-brass/[.06] p-6 sm:p-8">
        <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end"><div><div className="eyebrow">Secure payout onboarding</div><h2 className="mt-3 font-display text-3xl text-parchment">Bank and identity details go directly to Stripe.</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-parchment-dim">Trusted Locksmith stores only your connected-account identifier and activation status. Stripe collects the financial account and identity information required for payouts.</p></div>
        <div className="flex flex-col gap-3">
          {!payoutReady && <form action={startPayoutOnboarding}><button disabled={!stripeConfigured} className="w-full rounded-full bg-brass px-6 py-3 text-sm font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-50">{payoutStarted ? "Continue secure Stripe onboarding" : "Set up secure payouts"}</button></form>}
          {payoutStarted && !payoutReady && <form action={syncPayoutStatus}><button className="w-full rounded-full border border-line px-6 py-3 text-sm font-semibold text-parchment">Check payout status</button></form>}
          {payoutReady && <div className="rounded-full border border-verdigris/30 bg-verdigris/10 px-5 py-2.5 text-center text-sm font-semibold text-verdigris">Payout setup complete</div>}
        </div></div>
        {!stripeConfigured && <p className="mt-5 text-xs leading-5 text-ember">Staging code is ready, but Stripe/server database credentials are not yet verified on this environment. No bank details can be collected until that configuration is connected.</p>}
      </section>

      <section className="mt-6 rounded-3xl border border-line bg-surface p-6 sm:p-8"><div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center"><div><div className="eyebrow">Activation</div><h2 className="mt-2 font-display text-2xl text-parchment">{activationReady ? "Ready to receive job offers." : "Finish the required steps first."}</h2><p className="mt-2 text-sm leading-6 text-parchment-dim">Availability remains off until service setup, secure payout onboarding and any applicable expansion-market credential gate are complete. You still decide when to turn availability on.</p></div><Link href="/provider" className={`rounded-full px-6 py-3 text-center text-sm font-semibold ${activationReady ? "bg-brass text-ink" : "border border-line text-parchment-dim"}`}>{activationReady ? "Go to provider dashboard →" : "View dashboard"}</Link></div></section>
    </div></main><Footer /></div>
  );
}

function Choice({name,value,label,checked}:{name:string;value:string;label:string;checked:boolean}) { return <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-surface-raised px-4 py-3 text-sm text-parchment"><input type="checkbox" name={name} value={value} defaultChecked={checked} className="h-4 w-4 accent-[var(--brass)]" />{label}</label>; }
function StatusCard({n,title,status,complete,body}:{n:string;title:string;status:string;complete:boolean;body:string}) { return <div className="rounded-2xl border border-line bg-surface p-5"><div className="flex items-center justify-between gap-3"><span className="font-mono text-xs text-brass">{n}</span><span className={`font-mono text-[10px] uppercase tracking-wide ${complete ? "text-verdigris" : "text-parchment-dim"}`}>{status}</span></div><h2 className="mt-4 font-display text-xl text-parchment">{title}</h2><p className="mt-2 text-xs leading-5 text-parchment-dim">{body}</p></div>; }
