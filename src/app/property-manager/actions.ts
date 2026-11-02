"use server";
import { BUSINESS_REQUESTS_AVAILABLE } from "@/lib/business-availability";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createPropertyManagerOrganization(formData: FormData) {
  if (!BUSINESS_REQUESTS_AVAILABLE) redirect("/property-manager?error=Business%20requests%20are%20temporarily%20unavailable.");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/property-manager");
  const name = String(formData.get("organization_name") ?? "").trim();
  if (!name) redirect("/property-manager?error=Organization name is required.");

  const { data: org, error } = await supabase.from("pm_organizations").insert({ name, created_by: user.id }).select().single();
  if (error || !org) redirect(`/property-manager?error=${encodeURIComponent(error?.message ?? "Could not create organization")}`);
  const { error: membershipError } = await supabase.from("pm_members").insert({ organization_id: org.id, user_id: user.id, role: "admin" });
  if (membershipError) redirect("/property-manager?error=Could%20not%20finish%20workspace%20setup.%20Please%20contact%20support.");
  revalidatePath("/property-manager");
  redirect("/property-manager?notice=Property-manager workspace created.");
}

export async function addManagedProperty(formData: FormData) {
  if (!BUSINESS_REQUESTS_AVAILABLE) redirect("/property-manager?error=Business%20requests%20are%20temporarily%20unavailable.");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/property-manager");
  const organizationId = String(formData.get("organization_id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const unitCount = Number(formData.get("unit_count") ?? 1);
  if (!organizationId || !name || !address) redirect("/property-manager?error=Property name and address are required.");
  const { error } = await supabase.from("pm_properties").insert({ organization_id: organizationId, name, address, unit_count: Math.max(unitCount || 1, 1) });
  if (error) redirect(`/property-manager?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/property-manager");
  redirect("/property-manager?notice=Property added.");
}

export async function createPmServiceRequest(formData: FormData) {
  if (!BUSINESS_REQUESTS_AVAILABLE) redirect("/property-manager?error=Business%20requests%20are%20temporarily%20unavailable.");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/property-manager");
  const organizationId = String(formData.get("organization_id") ?? "");
  const propertyId = String(formData.get("property_id") ?? "");
  const unitLabel = String(formData.get("unit_label") ?? "").trim();
  const serviceType = String(formData.get("service_type") ?? "lockout");
  const residentName = String(formData.get("resident_name") ?? "").trim();
  const residentPhone = String(formData.get("resident_phone") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  if (!["lockout", "rekey", "lock_change", "smart_lock"].includes(serviceType)) redirect("/property-manager?error=Choose%20a%20supported%20service.");
  const { data: membership } = await supabase.from("pm_members").select("organization_id").eq("organization_id", organizationId).eq("user_id", user.id).maybeSingle();
  const { data: property } = await supabase.from("pm_properties").select("id").eq("id", propertyId).eq("organization_id", organizationId).maybeSingle();
  if (!membership || !property) redirect("/property-manager?error=Choose%20a%20property%20from%20your%20organization.");
  const { error } = await supabase.from("pm_service_requests").insert({ organization_id: organizationId, property_id: propertyId, requested_by: user.id, unit_label: unitLabel || null, service_type: serviceType, resident_name: residentName || null, resident_phone: residentPhone || null, notes: notes || null, status: "requested" });
  if (error) redirect(`/property-manager?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/property-manager");
  redirect("/property-manager?notice=Service request recorded. Provider availability and acceptance still require confirmation.");
}
