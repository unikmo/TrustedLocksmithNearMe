import { BusinessPage } from "@/components/b2b/BusinessPage";
import { businessMetadata } from "@/lib/b2b";

const page = {
 title: "The useful stuff, without the small print hunt.",
 description: "Straight answers about the free Keys Happen Plan, locksmith pricing, proposed membership, business coordination and no-pressure upgrades.",
 answer: "A key question deserves a straight answer. Start with the one on your mind, then explore the bit you didn't know you needed.",
 sections: [],
 faq: [
  ["What exactly do I get for free?",
   "A Keys Happen backup card you can create, print or share without an account. Choose who you would call first, who your backup contact would be, and where you would look for professional help. It is a practical reminder, not a locksmith booking or a service guarantee. Get started at /keys-happen."],
  ["Does TLNM save my household details?",
   "The free planner uses predefined roles rather than names, addresses, telephone numbers or free-text notes. It does not submit card choices to TLNM's servers. When you use your device's share or print feature, your chosen app or printer handles the exported card. Never put door codes, lockbox combinations, passwords or spare-key locations on something you share."],
  ["What if I am already locked out?",
   "First check lawful entry options you can use safely: a trusted key holder, building manager or another authorized contact. Avoid forcing entry or taking physical risks. The free concierge explains common lockout, rekey and smart-lock considerations. TLNM does not currently offer guaranteed emergency dispatch or confirmed consumer bookings; email is not an emergency response channel."],
  ["Is the $30 membership available now?",
   "Not yet. The proposed Keys Happen Member pilot would cost $30 a year, subject to final eligibility and service-area terms. It is not insurance, no coverage or redemption is currently active, and the public preview is not a checkout. The free household plan remains available independently."],
  ["How would the proposed $100 labor benefit work?",
   "The proposal is up to $100 total per membership year toward eligible locksmith labor, not $100 per incident. For an illustrative eligible visit with $120 labor and $35 materials, an unused $100 balance could contribute $100 to labor; the customer would pay $20 labor plus $35 materials, totaling $55. After that, the annual benefit balance would be $0. The locksmith's separately agreed payout is not the same as TLNM's contribution. Eligibility, remaining balance, exclusions and final price would need to be shown before a real job is approved."],
  ["What do standard locksmith prices include?",
   "The published standard menu identifies the service scope and the usual travel/service visit and labor inclusion. It is the platform's proposed standard service pricing, not a verified booking. Hardware, high-security work, incompatible cylinders, extra visits and other excluded services may require a separate written price. Check /services or /pricing for the relevant item and exclusions; always confirm the full quote before authorizing work."],
  ["Can a locksmith add charges after arriving?",
   "A provider should not perform extra billable work without a separate, explicit authorization. For a genuine change of scope that prevents completion of the original job, the revised work and amount must be explained before it starts. Optional improvements are different: they should be written up for later consideration and should never be a condition of finishing the agreed job. These are TLNM policy objectives; the full enforcement system is not yet live."],
  ["Why a 24-hour period for optional extras?",
   "Because a customer standing beside the locksmith should not have to make a purchasing decision under pressure. TLNM's proposed policy blocks acceptance of optional add-ons for at least 24 hours after the written quote is delivered, and requires the provider to be off site. Customers could decline without penalty. Genuine urgent security situations and pre-authorized commercial maintenance need separate documented procedures. This is a proposed TLNM rule, not a statement that the law requires a 24-hour wait; the real workflow has not been activated."],
  ["What if a door genuinely cannot be made secure without extra work?",
   "Stop, explain the finding, document the changed scope and itemize the price before undertaking the extra work. Where a genuine immediate safety issue exists, an independently reviewed exception with explicit authorization would be required. A provider cannot simply call an optional upgrade an emergency to bypass the reflection rule. These procedures still require operational and legal acceptance before a paid launch."],
  ["Are locksmiths TLNM employees?",
   "No. TLNM is operated by TSquare Ventures LLC as a technology platform. Participating locksmith businesses would perform field work independently. Business claims, identity, insurance, qualifications, eligibility and payout readiness must be checked separately; a listing does not itself establish that a provider is active."],
  ["Do locksmiths have to buy customer leads?",
   "The intended TLNM provider model does not sell leads or charge acquisition commissions for individual TLNM requests. Providers would see the defined standard job, service radius and all-in agreed payout for standard travel and labor before accepting an offer. Materials or nonstandard travel need clear separate terms. No live job volume is promised."],
  ["Can a locksmith recommend upgrades?",
   "Yes—recommending a genuinely useful replacement or security improvement is fine. The boundary is pressure: optional upgrades are written, itemized recommendations for consideration later, not something a customer must approve while the provider is standing at the door. Repeated high-pressure conduct would be a provider-quality issue once the operational program launches."],
  ["Is TLNM useful for my rental units or property portfolio?",
   "The business proposition covers property managers, landlords, real estate and closing teams, student accommodation, short-term rentals, office/facilities teams and multi-site businesses. Workflows include turnover rekeys, lock replacements, resident access and supplier coordination. Describe the general property and job scope first; business website intake is currently disabled, so only an independently sent enquiry email can reach the contact address. No appointment or SLA is promised."],
  ["What do business customers authorize differently?",
   "An authorized property manager may have written standing approvals under a commercial service agreement. That is separate from a homeowner being asked to approve an optional add-on. TLNM would record who can instruct work, the price and agreed scope, and exceptions requiring fresh approval. The commercial authorization workflow is not yet live."],
  ["Where does TLNM operate?",
   "Boston and Greater Boston, Massachusetts are the intended initial pilot market. Geographic pages elsewhere in the Northeast are information and expansion discovery, not a guarantee that a local provider can attend. Provider supply, address, job type, scope and acceptance must be verified before any booking can be confirmed."],
  ["Can I sign up or book a locksmith right now?",
   "The free Keys Happen planner works without signup. New paid household membership, consumer dispatch and website business intake remain closed while the operational backend, provider network and payments undergo verification. The site can explain services and accept a user-sent email enquiry, but an email is never a confirmed appointment."],
  ["Who is behind TLNM?",
   "TSquare Ventures LLC, a Wyoming limited liability company (filing ID 2026-002072750), operates TLNM. The registered address is 30 N Gould St, Ste R, Sheridan, WY 82801, United States. Reach the team through hello@trustedlocksmithnearme.com. This is the legal operator, not a claim that the company directly performs locksmith fieldwork."]
 ] as const
};
export const metadata = businessMetadata(page.title,page.description,"/faq");
export default function Page(){return <BusinessPage {...page} path="/faq"/>;}
