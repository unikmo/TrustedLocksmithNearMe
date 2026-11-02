import { BusinessPage } from "@/components/b2b/BusinessPage";
import { businessMetadata } from "@/lib/b2b";
const page = {"title": "About Trusted Locksmith", "description": "Locksmith coordination for property teams, operated by PlanetHike OÜ.", "answer": "Locksmith coordination for property teams, operated by PlanetHike OÜ.", "sections": [["One place for property access work", "Organize buildings, units, rekeys and service records without starting a new vendor search for each turnover."], ["Boston first", "We start with Boston and Greater Boston. Check the service-area page for location details and the FAQ for availability."]]} as const;
export const metadata = businessMetadata(page.title, page.description, "/about");
export default function Page() { return <BusinessPage {...page} path="/about" />; }
