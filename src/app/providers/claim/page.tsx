import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient, hasAdminClientConfig } from "@/lib/supabase/admin";
import { hashProviderInviteToken } from "@/lib/provider-outreach";
import { claimProvider } from "./actions";

export const metadata: Metadata = { title: "Claim a locksmith provider profile", robots: { index: false } };

export default async function ClaimProviderPage({
  searchParams,
}: {
  searchParams: Promise<{ provider?: string; invite?: string; error?: string }>;
}) {
  let { provider: providerParam, invite, error } = await searchParams;
  const supabase = await createClient();
  let invitedEmail = "";

  if (invite && hasAdminClientConfig()) {
    const admin = createAdminClient();
    const { data: invitation } = await admin
      .from("provider_outreach_invites")
      .select("provider_id,contact_id,status,expires_at")
      .eq("token_hash", hashProviderInviteToken(invite))
      .maybeSingle();

    if (invitation && invitation.status !== "opted_out" && new Date(invitation.expires_at).getTime() > Date.now()) {
      providerParam = providerParam || invitation.provider_id;
      const { data: contact } = await admin.from("provider_contacts").select("contact_type,contact_value,verification_status").eq("id", invitation.contact_id).maybeSingle();
      if (contact?.contact_type === "email" && contact.verification_status === "verified") invitedEmail = contact.contact_value;
    }
  }

  const { data: providers } = await supabase
    .from("provider_profiles")
    .select("id,slug,business_name,city,state,claim_status")
    .order("business_name");

  const provider = providerParam
    ? (providers ?? []).find((item: any) => item.id === providerParam || item.slug === providerParam)
    : null;
  const { data: { user } } = await supabase.auth.getUser();

  if (!provider) {
    return (
      <div className="flex min-h-screen flex-col"><Nav /><main className="flex-1 py-16"><div className="mx-auto max-w-4xl px-6">
        <div className="eyebrow">Claim your business</div>
        <h1 className="mt-3 font-display text-4xl text-parchment">Find your locksmith profile</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-parchment-dim">Profiles are preloaded from public business information so Greater Boston locksmith businesses can claim and complete onboarding without rebuilding their listing from scratch.</p>
        <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-surface">
          {(providers ?? []).map((item: any) => <Link key={item.id} href={`/providers/claim?provider=${item.id}`} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-surface-raised"><span><span className="block text-sm font-medium text-parchment">{item.business_name}</span><span className="mt-1 block text-xs text-parchment-dim">{[item.city, item.state].filter(Boolean).join(", ") || "Greater Boston"} · {item.claim_status.replaceAll("_", " ")}</span></span><span className="text-brass">Claim →</span></Link>)}
        </div>
        <p className="mt-5 text-sm text-parchment-dim">Do not see your business? <Link href="/providers/register" className="font-semibold text-brass hover:underline">Create a provider account →</Link></p>
      </div></main><Footer /></div>
    );
  }

  const { data: existingClaim } = user
    ? await supabase.from("provider_claims").select("id,status").eq("provider_id", provider.id).eq("user_id", user.id).maybeSingle()
    : { data: null };
  const next = `/providers/claim?provider=${encodeURIComponent(provider.id)}${invite ? `&invite=${encodeURIComponent(invite)}` : ""}`;
  const registrationParams = new URLSearchParams({ provider: provider.id });
  if (invite) registrationParams.set("invite", invite);
  if (invitedEmail) registrationParams.set("email", invitedEmail);

  return (
    <div className="flex min-h-screen flex-col"><Nav /><main className="flex-1 py-16"><div className="mx-auto max-w-2xl px-6">
      <Link href="/providers/claim" className="text-xs text-parchment-dim hover:text-parchment">← All provider profiles</Link>
      <div className="mt-6 eyebrow">Provider onboarding · Step 1</div>
      <h1 className="mt-3 font-display text-4xl text-parchment">Claim {provider.business_name}</h1>
      <p className="mt-2 text-sm text-parchment-dim">{[provider.city, provider.state].filter(Boolean).join(", ") || "Greater Boston"}</p>
      {invite && <div className="mt-5 rounded-2xl border border-verdigris/25 bg-verdigris/[.06] p-4 text-sm leading-6 text-parchment-dim"><strong className="text-parchment">Secure invited claim.</strong> Sign in with the business email that received the invitation and the profile can be linked automatically. No routine admin approval is required.</div>}
      {error && <div className="mt-6 rounded-xl border border-ember/30 bg-ember/10 p-3 text-sm text-ember">{error}</div>}

      {existingClaim?.status === "approved" ? (
        <div className="mt-8 rounded-2xl border border-line bg-surface p-6"><div className="font-medium text-parchment">Profile already claimed</div><p className="mt-2 text-sm leading-6 text-parchment-dim">Continue with service-area and secure payout onboarding.</p><Link href="/provider/onboarding" className="mt-5 inline-flex rounded-full bg-brass px-5 py-2.5 text-sm font-semibold text-ink">Continue onboarding →</Link></div>
      ) : existingClaim ? (
        <div className="mt-8 rounded-2xl border border-line bg-surface p-6"><div className="font-medium text-parchment">Claim is in exception review</div><p className="mt-2 text-sm leading-6 text-parchment-dim">Current status: {existingClaim.status}. Invited claims with the matching verified business email bypass this queue.</p><Link href="/provider" className="mt-5 inline-flex rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-parchment">Open provider dashboard</Link></div>
      ) : !user ? (
        <div className="mt-8 rounded-2xl border border-line bg-surface p-6"><div className="font-medium text-parchment">Use your provider account</div><p className="mt-2 text-sm leading-6 text-parchment-dim">Create or sign in to the account that will manage this business profile.</p><div className="mt-5 flex flex-col gap-3 sm:flex-row"><Link href={`/providers/register?${registrationParams.toString()}`} className="rounded-full bg-brass px-5 py-2.5 text-center text-sm font-semibold text-ink">Create provider account</Link><Link href={`/login?next=${encodeURIComponent(next)}`} className="rounded-full border border-line px-5 py-2.5 text-center text-sm font-semibold text-parchment">Log in</Link></div></div>
      ) : (
        <form action={claimProvider} className="mt-8 space-y-4 rounded-2xl border border-line bg-surface p-6">
          <input type="hidden" name="provider_id" value={provider.id} />
          <input type="hidden" name="invite_token" value={invite ?? ""} />
          <Field label="Your name"><input className="input" name="contact_name" required defaultValue={String(user.user_metadata?.full_name ?? "")} /></Field>
          <Field label="Business email"><input className="input" type="email" name="business_email" required readOnly={Boolean(invite)} defaultValue={user.email ?? invitedEmail} /></Field>
          <Field label="Business phone"><input className="input" type="tel" name="business_phone" required /></Field>
          <Field label="Your relationship to the business"><select className="input" name="relationship" required defaultValue="owner"><option value="owner">Owner</option><option value="authorized_manager">Authorized manager</option><option value="employee">Employee authorized to claim</option></select></Field>
          <Field label="Verification note (optional)"><textarea className="input min-h-24" name="notes" placeholder="Add context only if helpful." /></Field>
          <button className="w-full rounded-full bg-brass px-5 py-3 text-sm font-semibold text-ink">{invite ? "Verify claim & continue" : "Submit claim"}</button>
          <p className="text-xs leading-5 text-parchment-dim">Invited matching-email claims continue automatically. Other claims remain available as an exception path and may require review.</p>
        </form>
      )}
    </div></main><Footer /><style>{`.input{width:100%;border:1px solid var(--line);background:var(--surface-raised);border-radius:.75rem;padding:.75rem .9rem;font-size:.875rem;color:var(--parchment);outline:none}.input:focus{border-color:var(--brass)}`}</style></div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[.12em] text-parchment-dim">{label}</span>{children}</label>; }
