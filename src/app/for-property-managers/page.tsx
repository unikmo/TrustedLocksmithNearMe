import { BusinessPage } from "@/components/b2b/BusinessPage";
import { businessMetadata } from "@/lib/b2b";
const page = {"title": "Locksmith services for property managers", "description": "Keep rekeys, lock changes and resident access requests connected to each property.", "answer": "Keep rekeys, lock changes and resident access requests connected to each property.", "sections": [["Organize the portfolio", "Add buildings and units, then link every request to the right property and site contact."], ["Plan repeat work", "Use the standard service menu to budget for turnover work. Describe grouped jobs in a portfolio enquiry."], ["Keep the handover record", "Retain the agreed scope, approved charges and key handover details with the completed request."]]} as const;
export const metadata = businessMetadata(page.title, page.description, "/for-property-managers");
export default function Page() { return <BusinessPage {...page} path="/for-property-managers" />; }
