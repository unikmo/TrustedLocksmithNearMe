import { BusinessPage } from "@/components/b2b/BusinessPage";
import { businessMetadata } from "@/lib/b2b";
const page = {"title": "Locksmith services for landlords", "description": "Manage turnover rekeys and lock changes by building and unit.", "answer": "Manage turnover rekeys and lock changes by building and unit.", "sections": [["Prepare the turnover", "Count cylinders, note damaged or restricted hardware and identify who receives the new keys."], ["Choose the work", "Rekey serviceable cylinders or replace unsuitable hardware. Compare the standard scope and prices before enquiring."], ["Keep a clear record", "Store the request, completed work and key handover with the property."]]} as const;
export const metadata = businessMetadata(page.title, page.description, "/landlords");
export default function Page() { return <BusinessPage {...page} path="/landlords" />; }
