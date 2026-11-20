import type { Metadata } from "next";
import { MA_CITIES } from "./massachusetts-seo";
import { NY_AREAS } from "./new-york-seo";
import { NORTHEAST_AREAS } from "./northeast-seo";
import { SITE_URL } from "./site";

export const BUSINESS_ENQUIRY = "/business-enquiry";
export const B2B_AREAS = [
  ...MA_CITIES.map(a => ({ slug: a.slug, name: `${a.name}, MA`, areas: a.areas, context: a.localContext, launch: true })),
  ...NY_AREAS.map(a => ({ slug: a.slug, name: a.shortLocation, areas: a.areas, context: a.localContext, launch: false })),
  ...NORTHEAST_AREAS.map(a => ({ slug: a.slug, name: a.shortLocation, areas: a.areas, context: a.localContext, launch: false })),
];
export const B2B_SERVICES = {
  "turnover-rekeying": {
    title: "New tenant. Fresh keys. Fewer surprises.", description: "Plan rental-property rekeys between tenancies with clear cylinder pricing, property details and an authorized site contact.",
    answer: "The next tenant deserves a clean start. A rekey can change key access without automatically replacing a sound lock. Check the fit and scope before booking anything.",
    sections: [
      ["A smoother handover starts before move-in", "Record the property address, unit, handover date, number of cylinders, existing hardware and authorized contact. Tell us if locks must be keyed alike or are part of an existing restricted or master-key system."],
      ["One clear price beats a surprise bill", "The published standard rekey price is $75 per visit, including travel/service call and the first standard cylinder. Additional standard cylinders are $29 each. Specialty hardware and work outside this scope require a separate quotation and approval."],
      ["Close the loop, not just the door", "The property team must establish its authority to instruct the work and arrange lawful site access. Confirm the final key handover and keep the completed request with the property record. A request is not a confirmed appointment until accepted."],
    ],
    faq: [["Does rekeying replace the lock?", "Usually no. A compatible cylinder is adjusted to work with a different key. Damaged, incompatible or specialty hardware may require replacement or specialist work."], ["Can I request work for multiple units?", "Yes. Use a business enquiry to describe the buildings, units, cylinders and timing. A portfolio scope must be confirmed before pricing or scheduling is agreed."]],
  },
  "portfolio-locksmith-services": {
    title: "A whole portfolio. Fewer key headaches.", description: "Organize locksmith requests across rental buildings and managed units through a business workspace and property-level request history.",
    answer: "One building has enough moving parts. A whole portfolio should not mean a hundred disconnected locksmith conversations. Explore a clearer way to plan the work—pilot availability still needs confirmation.",
    sections: [["See the building, not just the ticket", "Create a management organization, add property addresses and unit counts, and keep requests linked to the relevant building and unit."], ["Make the next request easier", "Choose turnover rekey, lock change, resident lockout or compatible smart-lock installation. Include a site contact, lawful access arrangements and the scope in your notes. Do not put door codes or other secrets in a public enquiry."], ["Know what is—and isn't—agreed", "Portfolio rates, billing arrangements, response windows and coverage must be agreed separately. An account does not automatically include a response-time guarantee, consolidated invoicing or a maintenance contract."]],
    faq: [["Is this a full property-management system?", "No. The workspace focuses on properties and locksmith service requests. It does not manage rent, leases or general building maintenance."], ["Do you directly employ the locksmith?", "No. Field work is performed by participating independent providers. Acceptance and address-specific availability must be confirmed."]],
  },
  "master-key-systems": {
    title: "One building. Many doors. A smarter key strategy.", description: "Understand master-key planning, restricted keys and building access hierarchies before commissioning specialist locksmith work.",
    answer: "Who should open which door—and who shouldn't? The right key hierarchy begins with better questions. Specialist assessment and availability must be confirmed.",
    sections: [["Who really needs which door?", "Document which staff roles need access to buildings, common areas and individual units. Consider lost-key procedures, key issuance and how future units will be added."], ["The key system you already have matters", "Existing cylinders may belong to a restricted keyway or manufacturer-controlled system. Identify the system and the party authorized to approve changes before ordering work."], ["Not every lock is a standard rekey", "Master-key design and installation are not included in our standard rekey menu. This page is planning guidance. Ask about specialist availability; we will need to confirm a qualified provider, hardware compatibility and a written project scope before any commitment."]],
    faq: [["Is master-key work available at the $75 rekey price?", "No. The standard price covers a standard cylinder rekey, not system design, restricted hardware or a building-wide master-key installation."], ["Can you guarantee specialist coverage?", "No. Specialist availability must be assessed for the address and project. An enquiry is not a confirmed service offer."]],
  },
  "access-control": {
    title: "Fewer keys. More control. The right kind.", description: "Compare mechanical key control, standalone smart locks and commercial electronic access control for a managed property.",
    answer: "One smart lock or an entire building of access? The difference changes the project—and the price. Find the right questions before choosing hardware.",
    sections: [["One door or the whole building?", "A standalone smart lock may suit a compatible individual door. A shared entrance with employee or resident credentials may need a commercial system, specialist assessment and a broader installation scope."], ["What the simple job actually costs", "The published $129 installation price covers labor and travel for one compatible customer-supplied smart lock. Hardware, door modifications, electrical work, network troubleshooting and commercial system integration are outside that scope."], ["When 'smart' needs a specialist", "Reader systems, intercoms, electric strikes, credential management and multi-door integrations are not advertised as confirmed standard services. Specialist capability, relevant requirements and compatibility must be checked before a project is accepted."]],
    faq: [["Is Digital Access an electronic access-control system?", "No. The former consumer Digital Access product organized saved access information. It did not operate commercial readers, controllers or door hardware, and consumer enrollment is closed."], ["Can I book a commercial installation immediately?", "No. Submit the business project scope first. Qualified provider availability and a written quotation must be confirmed."]],
  },
} as const;
export type B2BServiceSlug = keyof typeof B2B_SERVICES;
export const B2B_GUIDES = {
  "turnover-rekey-cost": {
    title: "How much will those turnover keys really cost?", description: "Worked rekey-cost examples using Trusted Locksmith's published standard scope, with a calculator for cylinders and separate visits.",
    answer: "One cylinder or ten? The difference adds up. Try the simple calculator, then check the assumptions before turning the estimate into a budget.",
    sections: [["The detail most people forget: cylinders", "A door can have more than one keyed cylinder. Count the actual cylinders requiring work, identify compatibility and note any restricted or high-security hardware."], ["Ten units don't always mean ten visits", "Each separately charged visit includes a first-cylinder allowance. Ten visits with two standard cylinders each would be $1,040 under this formula. Ten units in one building do not automatically mean ten visits; obtain a site-specific scope for grouped work."], ["Know what the calculator leaves out", "Replacement hardware, specialty cylinders, repairs and excluded work require separate pricing. Do not apply the standard formula to a master-key system or commercial access-control project. Confirm any applicable taxes in the quotation."]],
    faq: [["Are these independent market statistics?", "No. All worked examples use the platform's published prices. They are not a survey of local competitors."], ["Does the calculator create a booking?", "No. It is an estimate for standard work only. Submit your scope for confirmation of price and availability."]],
  },
  "tenant-turnover-lock-checklist": {
    title: "The handover checklist you'll be glad you kept.", description: "A practical checklist for property managers covering authorization, cylinders, key handover and the completion record.",
    answer: "A forgotten cylinder or missing key can undo an otherwise smooth handover. A few checks now help you close the door on avoidable confusion.",
    sections: [["Before the handover rush", "Confirm possession and lawful authority; do not use lock changes to resolve a disputed tenancy. List building and unit, cylinder count, hardware type, requested date and authorized on-site contact."], ["Make every key count", "Confirm who should receive keys and how many are needed. Have the provider identify excluded work and obtain approval before additional charges. Do not publish access codes, master-key layouts or key-location details."], ["Finish with a record you can trust", "Check the affected locks operate correctly, record the work and approved charges, document the key handover and remove obsolete access instructions from your internal records."]],
    faq: [["Should I rekey or replace the lock?", "Rekey when compatible existing hardware is serviceable and the goal is changing key control. Damaged or incompatible hardware may need replacement; obtain an assessment."], ["Is this legal advice about tenancy access?", "No. The property team is responsible for establishing authority and meeting the applicable requirements before instructing work."]],
  },
} as const;
export type GuideSlug = keyof typeof B2B_GUIDES;
export const B2B_PATHS = ["", "/about", "/services", "/how-it-works", "/faq", "/locations", "/landlords", "/for-property-managers", "/for-real-estate-agents", "/partner-tech", "/trust-safety", "/contact", "/business-enquiry", ...Object.keys(B2B_SERVICES).map(s => `/services/${s}`), ...Object.keys(B2B_GUIDES).map(s => `/guides/${s}`)];
export function businessMetadata(title: string, description: string, path: string): Metadata {
  return { title, description, alternates: { canonical: path }, openGraph: { title, description, url: `${SITE_URL}${path}`, type: "website", images: ["/opengraph-image"] }, twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] } };
}
