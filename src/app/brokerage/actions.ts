"use server";
import { redirect } from "next/navigation";
export async function createBrokerageAccount(_formData: FormData) { redirect("/property-manager"); }
export async function createBulkMembershipOrder(_formData: FormData) { redirect("/for-real-estate-agents"); }
