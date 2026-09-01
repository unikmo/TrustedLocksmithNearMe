import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { SITE_URL } from "@/lib/site";

const OUTREACH_CAMPAIGN = "provider_network_launch";

export function hashProviderInviteToken(token: string) {
  return createHash("sha256").update(token, "utf8").digest("hex");
}

export function providerOutreachReadiness() {
  return {
    enabled: process.env.PROVIDER_OUTREACH_ENABLED === "true",
    resendConfigured: Boolean(process.env.RESEND_API_KEY && process.env.PROVIDER_OUTREACH_FROM),
    databaseAdminConfigured: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL),
  };
}

async function sendProviderInvitation(input: { to: string; businessName: string; inviteUrl: string; optOutUrl: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.PROVIDER_OUTREACH_FROM;
  if (!apiKey || !from) throw new Error("Provider outreach email is not configured.");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [input.to],
      subject: `${input.businessName}: claim your Trusted Locksmith profile`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#162338;max-width:620px;margin:auto">
          <h1 style="font-size:24px">A Trusted Locksmith profile has been prepared for ${escapeHtml(input.businessName)}</h1>
          <p>Trusted Locksmith is building its provider network around clearly scoped requests, private job terms and provider-controlled availability.</p>
          <p>If you own or are authorized to manage this business, use the secure link below to claim the profile. The account email must match the verified business email this invitation was sent to.</p>
          <p><a href="${input.inviteUrl}" style="display:inline-block;background:#d6ad57;color:#0b1727;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:999px">Claim business profile</a></p>
          <p>After claiming, choose the services and locations you cover. Payout and identity onboarding is completed securely with Stripe. Trusted Locksmith does not ask you to enter bank account details into our site.</p>
          <p style="font-size:12px;color:#627187">If this message reached the wrong business or you do not want provider-network invitations, <a href="${input.optOutUrl}">opt out here</a>.</p>
        </div>`,
      text: `A Trusted Locksmith profile has been prepared for ${input.businessName}. Claim it here: ${input.inviteUrl}\n\nChoose the services and locations you cover after claiming. Payout and identity onboarding is completed securely with Stripe; Trusted Locksmith does not collect bank details in its own forms.\n\nOpt out: ${input.optOutUrl}`,
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload?.message ?? `Email provider returned ${response.status}.`);
  return payload as { id?: string };
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char] ?? char);
}

export async function processProviderOutreachBatch(limit = 20) {
  const readiness = providerOutreachReadiness();
  if (!readiness.enabled) return { status: "disabled", processed: 0, sent: 0, failed: 0 };
  if (!readiness.resendConfigured || !readiness.databaseAdminConfigured) return { status: "configuration_required", processed: 0, sent: 0, failed: 0 };

  const supabase = createAdminClient();
  const { data: contacts, error: contactsError } = await supabase
    .from("provider_contacts")
    .select("id,provider_id,contact_value")
    .eq("contact_type", "email")
    .eq("verification_status", "verified")
    .eq("can_outreach", true)
    .eq("do_not_contact", false)
    .limit(Math.max(1, Math.min(limit, 50)));

  if (contactsError) throw new Error(contactsError.message);

  const baseUrl = process.env.PROVIDER_OUTREACH_BASE_URL || SITE_URL;
  let sent = 0;
  let failed = 0;

  for (const contact of contacts ?? []) {
    const { data: provider } = await supabase.from("provider_profiles").select("id,business_name,claim_status,claimed_user_id").eq("id", contact.provider_id).maybeSingle();
    if (!provider || provider.claimed_user_id || provider.claim_status === "verified") continue;

    const { data: priorInvite } = await supabase
      .from("provider_outreach_invites")
      .select("id,status,expires_at")
      .eq("provider_id", provider.id)
      .eq("contact_id", contact.id)
      .in("status", ["queued", "sent", "clicked", "claimed"])
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (priorInvite && priorInvite.status !== "claimed" && new Date(priorInvite.expires_at).getTime() > Date.now()) continue;
    if (priorInvite?.status === "claimed") continue;

    const rawToken = randomBytes(32).toString("base64url");
    const tokenHash = hashProviderInviteToken(rawToken);
    const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();

    const { data: invite, error: inviteError } = await supabase
      .from("provider_outreach_invites")
      .insert({ provider_id: provider.id, contact_id: contact.id, token_hash: tokenHash, campaign: OUTREACH_CAMPAIGN, status: "queued", expires_at: expiresAt })
      .select("id")
      .single();

    if (inviteError || !invite) { failed += 1; continue; }

    const inviteUrl = `${baseUrl}/providers/outreach/${encodeURIComponent(rawToken)}`;
    const optOutUrl = `${baseUrl}/providers/outreach/opt-out/${encodeURIComponent(rawToken)}`;

    try {
      const email = await sendProviderInvitation({ to: contact.contact_value, businessName: provider.business_name, inviteUrl, optOutUrl });
      await supabase.from("provider_outreach_invites").update({ status: "sent", sent_at: new Date().toISOString(), message_provider_id: email.id ?? null, last_error: null }).eq("id", invite.id);
      await supabase.from("provider_acquisition_events").insert({ provider_id: provider.id, invite_id: invite.id, event_name: "invite_sent", metadata: { channel: "email", campaign: OUTREACH_CAMPAIGN } });
      sent += 1;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown outreach error";
      await supabase.from("provider_outreach_invites").update({ status: "failed", last_error: message }).eq("id", invite.id);
      failed += 1;
    }
  }

  return { status: "ok", processed: (contacts ?? []).length, sent, failed };
}
