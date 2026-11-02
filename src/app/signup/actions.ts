"use server";
import { BUSINESS_REQUESTS_AVAILABLE } from "@/lib/business-availability";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
export async function signup(formData: FormData) {
 if (!BUSINESS_REQUESTS_AVAILABLE) redirect("/signup?error=Business%20onboarding%20and%20enquiries%20are%20temporarily%20unavailable.%20Nothing%20was%20submitted.");
 const email=String(formData.get("email")??"").trim();const password=String(formData.get("password")??"");const fullName=String(formData.get("name")??"").trim();const company=String(formData.get("company")??"").trim();
 if(!company||!fullName||!email||password.length<8||formData.get("business_confirmation")!=="yes")redirect("/signup?error=Enter your business details and confirm that you represent a property business.");
 const supabase=await createClient();
 const {data,error}=await supabase.auth.signUp({email,password,options:{data:{full_name:fullName,company_name:company,account_purpose:"property_business",membership_signup:false}}});
 if(error)redirect(`/signup?error=${encodeURIComponent("Business signup is currently unavailable. Please try again later.")}`);
 if(data.session)redirect("/property-manager");
 redirect("/login?notice=Check your email to confirm your business account, then open the property workspace.");
}
