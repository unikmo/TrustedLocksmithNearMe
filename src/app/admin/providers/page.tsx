import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";
import { providerOutreachReadiness } from "@/lib/provider-outreach";
import { hasStripeConnectConfig } from "@/lib/stripe-connect";

export const metadata: Metadata = { title: "Provider acquisition", robots: { index: false } };

export default async function ProviderAcquisitionPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/admin/providers");
  const { data: admin } = await supabase.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!admin) redirect("/");

  const [providersResult, sourcesResult, contactsResult, invitesResult] = await Promise.all([
    supabase.from("provider_profiles").select("*").order("business_name"),
    supabase.from("provider_sources").select("provider_id,phone,website"),
    supabase.from("provider_contacts").select("*").order("updated_at", { ascending: false }),
    supabase.from("provider_outreach_invites").select("*").order("created_at", { ascending: false }),
  ]);

  const providers = providersResult.data ?? [];
  const sources = sourcesResult.data ?? [];
  const contacts = contactsResult.data ?? [];
  const invites = invitesResult.data ?? [];
  const schemaReady = !contactsResult.error && !invitesResult.error;
  const readiness = providerOutreachReadiness();

  const sourceMap = new Map(sources.map((source: any) => [source.provider_id, source]));
  const contactsByProvider = new Map<string, any[]>();
  for (const contact of contacts as any[]) contactsByProvider.set(contact.provider_id, [...(contactsByProvider.get(contact.provider_id) ?? []), contact]);
  const latestInviteByProvider = new Map<string, any>();
  for (const invite of invites as any[]) if (!latestInviteByProvider.has(invite.provider_id)) latestInviteByProvider.set(invite.provider_id, invite);

  const contactable = providers.filter((provider: any) => (contactsByProvider.get(provider.id) ?? []).some((contact: any) => contact.contact_type === "email" && contact.verification_status === "verified" && contact.can_outreach && !contact.do_not_contact));
  const invited = providers.filter((provider: any) => ["sent", "clicked", "claimed"].includes(latestInviteByProvider.get(provider.id)?.status));
  const clicked = providers.filter((provider: any) => ["clicked", "claimed"].includes(latestInviteByProvider.get(provider.id)?.status));
  const claimed = providers.filter((provider: any) => provider.claim_status === "verified");
  const payoutReady = providers.filter((provider: any) => provider.stripe_payouts_enabled);
  const available = providers.filter((provider: any) => provider.is_available && provider.stripe_payouts_enabled);

  return (
    <div className="flex min-h-screen flex-col"><Nav /><main className="flex-1 py-10"><div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><div className="eyebrow">Internal provider acquisition</div><h1 className="mt-2 font-display text-4xl text-parchment">Greater Boston supply funnel</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-parchment-dim">One source of truth for who can be contacted, who received an invitation, who opened it, who claimed, who completed secure payouts and who is available for work.</p></div><Link href="/admin" className="text-sm font-semibold text-brass">Network operations →</Link></div>

      {!schemaReady && <div className="mt-6 rounded-2xl border border-ember/30 bg-ember/10 p-5 text-sm leading-6 text-ember"><strong>Database activation pending.</strong> The provider acquisition schema is in the repo but has not been verified against the connected Trusted Locksmith Supabase project. Outreach remains safely disabled until that database is connected and migrated.</div>}

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <Stat label="Profiles" value={String(providers.length)} />
        <Stat label="Email-ready" value={String(contactable.length)} />
        <Stat label="Invited" value={String(invited.length)} />
        <Stat label="Opened" value={String(clicked.length)} />
        <Stat label="Claimed" value={String(claimed.length)} />
        <Stat label="Payout-ready" value={String(payoutReady.length)} />
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <Status label="Automated outreach" ok={readiness.enabled} text={readiness.enabled ? "Enabled" : "Disabled by default"} />
        <Status label="Email sender" ok={readiness.resendConfigured} text={readiness.resendConfigured ? "Configured" : "Configuration required"} />
        <Status label="Stripe Connect" ok={hasStripeConnectConfig()} text={hasStripeConnectConfig() ? "Server key configured" : "Configuration required"} />
      </div>

      <section className="mt-10"><div className="flex items-end justify-between"><div><div className="eyebrow">Provider-by-provider status</div><h2 className="mt-2 font-display text-3xl text-parchment">From public profile to active supply.</h2></div><div className="font-mono text-xs text-parchment-dim">Available now: {available.length}</div></div>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-line bg-surface"><table className="min-w-full text-left text-sm"><thead className="border-b border-line bg-surface-raised"><tr className="font-mono text-[10px] uppercase tracking-[.1em] text-parchment-dim"><th className="px-4 py-3">Business</th><th className="px-4 py-3">Contact</th><th className="px-4 py-3">Invite</th><th className="px-4 py-3">Claim</th><th className="px-4 py-3">Payout</th><th className="px-4 py-3">Availability</th></tr></thead><tbody className="divide-y divide-line">
          {providers.map((provider: any) => {
            const source: any = sourceMap.get(provider.id);
            const providerContacts = contactsByProvider.get(provider.id) ?? [];
            const email = providerContacts.find((contact: any) => contact.contact_type === "email" && !contact.do_not_contact);
            const invite: any = latestInviteByProvider.get(provider.id);
            return <tr key={provider.id}><td className="px-4 py-4"><div className="font-medium text-parchment">{provider.business_name}</div><div className="mt-1 text-xs text-parchment-dim">{[provider.city,provider.state].filter(Boolean).join(", ")}</div></td><td className="px-4 py-4 text-xs text-parchment-dim">{email ? <><div>{email.contact_value}</div><div className="mt-1">{email.verification_status}{email.can_outreach ? " · outreach-ready" : ""}</div></> : <><div>No verified email</div><div className="mt-1">{source?.website || source?.phone || "Needs contact enrichment"}</div></>}</td><td className="px-4 py-4"><Badge value={invite?.status ?? "not invited"} /></td><td className="px-4 py-4"><Badge value={provider.claim_status} good={provider.claim_status === "verified"} /></td><td className="px-4 py-4"><Badge value={provider.stripe_payouts_enabled ? "ready" : provider.stripe_account_id ? "in progress" : "not started"} good={provider.stripe_payouts_enabled} /></td><td className="px-4 py-4"><Badge value={provider.is_available && provider.stripe_payouts_enabled ? "available" : "offline"} good={provider.is_available && provider.stripe_payouts_enabled} /></td></tr>;
          })}
        </tbody></table></div>
      </section>

      <section className="mt-8 rounded-2xl border border-line bg-surface p-6"><div className="eyebrow">Contact-data gap</div><h2 className="mt-2 font-display text-2xl text-parchment">Phone numbers are not enough for safe automated launch outreach.</h2><p className="mt-3 max-w-3xl text-sm leading-6 text-parchment-dim">The existing Boston seed contains public phone numbers and some websites, but not verified business email addresses. The automation only sends to contacts explicitly marked as verified and outreach-eligible. Email enrichment can be connected as the next supply-data step; automated SMS/calling is deliberately not enabled.</p><p className="mt-3 text-xs leading-5 text-brass">REQUIRES QUALIFIED LEGAL REVIEW before activating outbound campaign sending.</p></section>
    </div></main><Footer /></div>
  );
}

function Stat({label,value}:{label:string;value:string}) { return <div className="rounded-2xl border border-line bg-surface p-4"><div className="font-mono text-[9px] uppercase tracking-[.12em] text-parchment-dim">{label}</div><div className="mt-2 font-display text-3xl text-parchment">{value}</div></div>; }
function Status({label,ok,text}:{label:string;ok:boolean;text:string}) { return <div className="rounded-2xl border border-line bg-surface p-4"><div className="font-mono text-[9px] uppercase tracking-[.12em] text-parchment-dim">{label}</div><div className={`mt-2 text-sm font-semibold ${ok ? "text-verdigris" : "text-parchment-dim"}`}>{text}</div></div>; }
function Badge({value,good=false}:{value:string;good?:boolean}) { return <span className={`inline-flex rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-wide ${good ? "border-verdigris/30 bg-verdigris/10 text-verdigris" : "border-line text-parchment-dim"}`}>{value.replaceAll("_"," ")}</span>; }
