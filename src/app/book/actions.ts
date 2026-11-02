"use server";
import { redirect } from "next/navigation";
export async function createGuestBooking(_formData: FormData) { redirect("/for-property-managers"); }
export async function completeGuestBooking(_formData: FormData) { redirect("/for-property-managers"); }
