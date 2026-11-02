import { BusinessPage } from "@/components/b2b/BusinessPage";
import { businessMetadata } from "@/lib/b2b";
const page = {"title": "Safe, authorized property work", "description": "Clear authority, agreed scope and careful handling of access information.", "answer": "Clear authority, agreed scope and careful handling of access information.", "sections": [["Check authority", "Establish lawful access and identify the person authorized to instruct the work and receive keys."], ["Verify the provider", "Confirm identity and eligibility for the location and task. A listing alone is not proof of credentials."], ["Protect access details", "Keep codes, key locations and resident documents out of enquiry fields. Approve additional work and charges before the work starts."]]} as const;
export const metadata = businessMetadata(page.title, page.description, "/trust-safety");
export default function Page() { return <BusinessPage {...page} path="/trust-safety" />; }
