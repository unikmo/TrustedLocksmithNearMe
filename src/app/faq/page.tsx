import { BusinessPage } from "@/components/b2b/BusinessPage";
import { businessMetadata } from "@/lib/b2b";
const page={
 title:"TLNM questions, answered",
 description:"Free Keys Happen plans, pilot membership, locksmith prices, business rekeying and no-pressure upgrades.",
 answer:"A free plan first. Clear pricing and no pressure when professional help is needed.",
 sections:[],
 faq:[
 ["What is Keys Happen?","A free household backup plan you can share without including door codes, key locations, phone numbers or other access secrets. It does not require an account."],
 ["Is TLNM a locksmith?","TLNM is a technology platform. Where service is available, independent participating locksmith businesses perform field work."],
 ["Do I need to be a member?","No. The Keys Happen Plan is free. Membership is optional and the new $30 pilot is not open for enrollment."],
 ["What does the proposed $30 membership include?","The proposed pilot offers up to $100 per membership year toward eligible locksmith labor. Materials and labor above the remaining annual balance are separate. Terms, waiting rules, service area and operational readiness require confirmation before enrollment opens."],
 ["Can I book a locksmith today?","Consumer booking and business website intake are not currently activated. A submitted email is an enquiry, not a confirmed visit or emergency dispatch."],
 ["What do published standard prices include?","Each published standard price defines travel/service call and labor for that job scope. Hardware and genuinely out-of-scope work must be separately described and approved before work."],
 ["Can a locksmith recommend more work?","Yes, but optional upgrades should be itemized and offered later without pressure. TLNM's proposed customer protection adds at least 24 hours to consider a written optional quote; the live enforcement workflow is not yet active."],
 ["What if an unexpected repair is required right away?","Work that genuinely cannot be completed under the original authorized scope needs a documented revised price and separate consent. A real security emergency requires independent verification; it cannot be self-declared to force an upsell."],
 ["Do locksmiths pay for leads?","The TLNM provider model is designed without lead-purchase fees or acquisition commissions. Providers review the agreed labor-and-travel payout and job scope before accepting."],
 ["Who can use TLNM for business?","Property managers, real-estate teams, landlords, short-term rental operators, facilities managers, student housing and other multi-site property organizations."],
 ["Where will the pilot operate?","Boston and Greater Boston, Massachusetts are the planned first service area. Pages for other locations do not mean a verified active provider network exists there."],
 ["What should I never share?","Door codes, lockbox codes, passwords, spare-key locations, government IDs, master-key plans and private resident information do not belong in an initial enquiry or shared plan."],
 ["Who operates TLNM?","The current repository identifies PlanetHike OÜ as operator. Any proposed operator change requires reconciliation and legal approval before publication."]
 ] as const
};
export const metadata=businessMetadata(page.title,page.description,"/faq");
export default function Page(){return <BusinessPage {...page} path="/faq"/>}
