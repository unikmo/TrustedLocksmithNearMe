"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SITE_URL } from "@/lib/site";

export async function registerProvider(formData: FormData) {
  const supabase = await createClient();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const provider = String(formData.get("provider") ?? "").trim();
  const invite = String(formData.get("invite") ?? "").trim();

  if (!name || !email || password.length < 8) {
    const query = new URLSearchParams({ provider, invite, email, error: "Name, email, and an 8+ character password are required." });
    redirect(`/providers/register?${query.toString()}`);
  }

  const nextParams = new URLSearchParams();
  if (provider) nextParams.set("provider", provider);
  if (invite) nextParams.set("invite", invite);
  const next = `/providers/claim${nextParams.size ? `?${nextParams.toString()}` : ""}`;

  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host");
  const proto = requestHeaders.get("x-forwarded-proto") || "https";
  const origin = host ? `${proto}://${host}` : SITE_URL;
  const emailRedirectTo = `${origin}/auth/callback?next=${encodeURIComponent(next)}`;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo,
      data: { full_name: name, account_surface: "provider" },
    },
  });

  if (error) {
    const query = new URLSearchParams({ provider, invite, email, error: error.message });
    redirect(`/providers/register?${query.toString()}`);
  }

  if (data.session) redirect(next);

  redirect(`/login?notice=${encodeURIComponent("Confirm your business email, then sign in to continue the profile claim.")}&next=${encodeURIComponent(next)}`);
}
