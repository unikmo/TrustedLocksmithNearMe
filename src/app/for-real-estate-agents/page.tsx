import { BusinessPage } from "@/components/b2b/BusinessPage";
import { businessMetadata } from "@/lib/b2b";
const page = {"title": "A clear key handover after closing", "description": "Coordinate rekeys and lock changes with the authorized owner or property manager.", "answer": "Coordinate rekeys and lock changes with the authorized owner or property manager.", "sections": [["Prepare the handover", "Identify the property, cylinders, instructing party and preferred date."], ["Choose the right work", "Rekey serviceable cylinders to change key control; assess damaged locks or smart-lock requirements separately."], ["Agree the visit", "Confirm provider acceptance and timing before committing to a closing-day appointment."]]} as const;
export const metadata = businessMetadata(page.title, page.description, "/for-real-estate-agents");
export default function Page() { return <BusinessPage {...page} path="/for-real-estate-agents" />; }
