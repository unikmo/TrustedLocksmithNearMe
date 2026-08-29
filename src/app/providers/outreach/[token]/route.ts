import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashProviderInviteToken } from "@/lib/provider-outreach";

export const dynamic = "force-dynamic";

export async function GET(request: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;
  const tokenHash = hashProviderInviteToken(token);
  const supabase = createAdminClient();

  const { data: invite } = await supabase
    .from("provider_outreach_invites")
    .select("id,provider_id,status,expires_at")
    .eq("token_hash", tokenHash)
    .maybeSingle();

  if (!invite || invite.status === "opted_out" || new Date(invite.expires_at).getTime() <= Date.now()) {
    return NextResponse.redirect(new URL("/partner-tech?invite=expired", request.url));
  }

  if (["queued", "sent"].includes(invite.status)) {
    const now = new Date().toISOString();
    await supabase.from("provider_outreach_invites").update({ status: "clicked", clicked_at: now }).eq("id", invite.id);
    await supabase.from("provider_acquisition_events").insert({
      provider_id: invite.provider_id,
      invite_id: invite.id,
      event_name: "invite_clicked",
      metadata: { channel: "email" },
    });
  }

  const destination = new URL("/providers/claim", request.url);
  destination.searchParams.set("provider", invite.provider_id);
  destination.searchParams.set("invite", token);
  return NextResponse.redirect(destination);
}
