"use server";
import { BUSINESS_REQUESTS_AVAILABLE } from "@/lib/business-availability";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
export async function submitContact(formData: FormData) {
 if (!BUSINESS_REQUESTS_AVAILABLE) redirect("/business-enquiry?error=Business%20onboarding%20and%20enquiries%20are%20temporarily%20unavailable.%20Nothing%20was%20submitted.");
 const get=(key:string)=>String(formData.get(key)??"").trim();
 const name=get("name"),email=get("email"),company=get("company"),area=get("service_area"),message=get("message"),topic=get("topic")||"Portfolio enquiry";
 if(get("website"))redirect("/business-enquiry?error=Please%20try%20again.");
 if(!name||!company||!area||!message||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||message.length>10000)redirect("/business-enquiry?error=Enter%20your%20business%20contact%20details,%20service%20area%20and%20scope.");
 let failed=false;
 try {const supabase=await createClient();const {error}=await supabase.from("contact_messages").insert({name,email,topic,message:`Company: ${company}\nService area: ${area}\nUnits: ${get("units")||"Not specified"}\n\n${message}`});failed=Boolean(error);}catch{failed=true;}
 if(failed)redirect("/business-enquiry?error=Enquiries%20are%20temporarily%20unavailable.%20Your%20message%20was%20not%20submitted.%20Please%20try%20again%20later.");
 redirect("/business-enquiry?sent=1");
}
