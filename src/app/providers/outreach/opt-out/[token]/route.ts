import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashProviderInviteToken } from "@/lib/provider-outreach";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;
  const supabase = createAdminClient();
  const tokenHash = hashProviderInviteToken(token);

  const { data: invite } = await supabase
    .from("provider_outreach_invites")
    .select("id,provider_id,contact_id")
    .eq("token_hash", tokenHash)
    .maybeSingle();

  if (invite) {
    const now = new Date().toISOString();
    await supabase.from("provider_outreach_invites").update({ status: "opted_out", opted_out_at: now }).eq("id", invite.id);
    await supabase.from("provider_contacts").update({ do_not_contact: true, can_outreach: false, updated_at: now }).eq("id", invite.contact_id);
    await supabase.from("provider_acquisition_events").insert({
      provider_id: invite.provider_id,
      invite_id: invite.id,
      event_name: "outreach_opted_out",
      metadata: { channel: "email" },
    });
  }

  return new NextResponse(
    `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Outreach preferences</title></head><body style="font-family:Arial,sans-serif;background:#0b1727;color:#f4efe4;padding:48px"><main style="max-width:620px;margin:auto"><h1>Provider outreach stopped</h1><p>This business contact will not receive further Trusted Locksmith provider-network invitations from this outreach list.</p></main></body></html>`,
    { headers: { "content-type": "text/html; charset=utf-8" } },
  );
}
