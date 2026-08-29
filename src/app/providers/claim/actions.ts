"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient, hasAdminClientConfig } from "@/lib/supabase/admin";
import { hashProviderInviteToken } from "@/lib/provider-outreach";

export async function claimProvider(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/providers/claim");

  const providerId = String(formData.get("provider_id") ?? "");
  const inviteToken = String(formData.get("invite_token") ?? "").trim();
  const contactName = String(formData.get("contact_name") ?? "").trim();
  const businessEmail = String(formData.get("business_email") ?? "").trim().toLowerCase();
  const businessPhone = String(formData.get("business_phone") ?? "").trim();
  const relationship = String(formData.get("relationship") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!providerId || !contactName || !businessEmail || !businessPhone || !relationship) {
    redirect(`/providers/claim?provider=${encodeURIComponent(providerId)}&invite=${encodeURIComponent(inviteToken)}&error=${encodeURIComponent("Complete the required ownership details.")}`);
  }

  if (inviteToken) {
    if (!hasAdminClientConfig()) {
      redirect(`/providers/claim?provider=${encodeURIComponent(providerId)}&invite=${encodeURIComponent(inviteToken)}&error=${encodeURIComponent("Secure invite verification is not configured yet.")}`);
    }

    const admin = createAdminClient();
    const tokenHash = hashProviderInviteToken(inviteToken);
    const { data: invite } = await admin
      .from("provider_outreach_invites")
      .select("id,provider_id,contact_id,status,expires_at")
      .eq("token_hash", tokenHash)
      .maybeSingle();

    if (!invite || invite.provider_id !== providerId || invite.status === "opted_out" || new Date(invite.expires_at).getTime() <= Date.now()) {
      redirect(`/providers/claim?provider=${encodeURIComponent(providerId)}&error=${encodeURIComponent("This provider invitation is no longer valid.")}`);
    }

    const { data: contact } = await admin
      .from("provider_contacts")
      .select("id,contact_type,contact_value,verification_status,do_not_contact")
      .eq("id", invite.contact_id)
      .eq("provider_id", providerId)
      .maybeSingle();

    const authenticatedEmail = String(user.email ?? "").trim().toLowerCase();
    const invitedEmail = String(contact?.contact_value ?? "").trim().toLowerCase();
    const inviteIsVerifiedEmail = contact?.contact_type === "email" && contact?.verification_status === "verified" && !contact?.do_not_contact;

    if (!inviteIsVerifiedEmail || !authenticatedEmail || authenticatedEmail !== invitedEmail) {
      redirect(`/providers/claim?provider=${encodeURIComponent(providerId)}&invite=${encodeURIComponent(inviteToken)}&error=${encodeURIComponent("Sign in with the verified business email that received this invitation.")}`);
    }

    const { data: provider } = await admin
      .from("provider_profiles")
      .select("id,claimed_user_id,claim_status")
      .eq("id", providerId)
      .maybeSingle();

    if (!provider || (provider.claimed_user_id && provider.claimed_user_id !== user.id)) {
      redirect(`/providers/claim?provider=${encodeURIComponent(providerId)}&error=${encodeURIComponent("This business profile is already linked to another account.")}`);
    }

    const now = new Date().toISOString();
    const { error: claimError } = await admin.from("provider_claims").upsert({
      provider_id: providerId,
      user_id: user.id,
      contact_name: contactName,
      business_email: authenticatedEmail,
      business_phone: businessPhone,
      relationship,
      notes: notes || null,
      status: "approved",
      submitted_at: now,
      reviewed_at: now,
      outreach_invite_id: invite.id,
      verification_method: "verified_business_email_invite",
    }, { onConflict: "provider_id,user_id" });

    if (claimError) {
      redirect(`/providers/claim?provider=${encodeURIComponent(providerId)}&invite=${encodeURIComponent(inviteToken)}&error=${encodeURIComponent(claimError.message)}`);
    }

    const { error: profileError } = await admin.from("provider_profiles").update({
      claimed_user_id: user.id,
      claim_status: "verified",
      verified_at: now,
      is_available: false,
      updated_at: now,
    }).eq("id", providerId);

    if (profileError) {
      redirect(`/providers/claim?provider=${encodeURIComponent(providerId)}&invite=${encodeURIComponent(inviteToken)}&error=${encodeURIComponent(profileError.message)}`);
    }

    await admin.from("provider_outreach_invites").update({ status: "claimed", claimed_at: now }).eq("id", invite.id);
    await admin.from("provider_acquisition_events").insert({
      provider_id: providerId,
      invite_id: invite.id,
      event_name: "profile_claimed",
      metadata: { verification_method: "verified_business_email_invite" },
    });

    redirect(`/provider/onboarding?notice=${encodeURIComponent("Business profile claimed. Complete secure payout setup to activate job offers.")}`);
  }

  const { error } = await supabase.from("provider_claims").insert({
    provider_id: providerId,
    user_id: user.id,
    contact_name: contactName,
    business_email: businessEmail,
    business_phone: businessPhone,
    relationship,
    notes: notes || null,
    status: "pending",
    verification_method: "exception_review",
  });

  if (error) {
    redirect(`/providers/claim?provider=${encodeURIComponent(providerId)}&error=${encodeURIComponent(error.message)}`);
  }

  redirect("/provider?notice=Claim submitted for exception review.");
}
