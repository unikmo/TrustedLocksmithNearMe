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
    title: "Tenant turnover rekeying", description: "Plan rental-property rekeys between tenancies with clear cylinder pricing, property details and an authorized site contact.",
    answer: "Rekeying changes which key operates a compatible existing cylinder. For property managers, it provides a repeatable way to change key control between tenancies without automatically replacing sound hardware.",
    sections: [
      ["Define the turnover scope", "Record the property address, unit, handover date, number of cylinders, existing hardware and authorized contact. Tell us if locks must be keyed alike or are part of an existing restricted or master-key system."],
      ["Know the standard price", "The published standard rekey price is $75 per visit, including travel/service call and the first standard cylinder. Additional standard cylinders are $29 each. Specialty hardware and work outside this scope require a separate quotation and approval."],
      ["Confirm access and completion", "The property team must establish its authority to instruct the work and arrange lawful site access. Confirm the final key handover and keep the completed request with the property record. A request is not a confirmed appointment until accepted."],
    ],
    faq: [["Does rekeying replace the lock?", "Usually no. A compatible cylinder is adjusted to work with a different key. Damaged, incompatible or specialty hardware may require replacement or specialist work."], ["Can I request work for multiple units?", "Yes. Use a business enquiry to describe the buildings, units, cylinders and timing. A portfolio scope must be confirmed before pricing or scheduling is agreed."]],
  },
  "portfolio-locksmith-services": {
    title: "Portfolio locksmith coordination", description: "Organize locksmith requests across rental buildings and managed units through a business workspace and property-level request history.",
    answer: "Portfolio locksmith coordination gives property teams one place to organize buildings, unit-level requests and service status. Trusted Locksmith provides the platform; participating independent local locksmiths perform the field work.",
    sections: [["Start with your properties", "Create a management organization, add property addresses and unit counts, and keep requests linked to the relevant building and unit."], ["Use a consistent request", "Choose turnover rekey, lock change, resident lockout or compatible smart-lock installation. Include a site contact, lawful access arrangements and the scope in your notes. Do not put door codes or other secrets in a public enquiry."], ["Confirm commercial terms", "Portfolio rates, billing arrangements, response windows and coverage must be agreed separately. An account does not automatically include a response-time guarantee, consolidated invoicing or a maintenance contract."]],
    faq: [["Is this a full property-management system?", "No. The workspace focuses on properties and locksmith service requests. It does not manage rent, leases or general building maintenance."], ["Do you directly employ the locksmith?", "No. Field work is performed by participating independent providers. Acceptance and address-specific availability must be confirmed."]],
  },
  "master-key-systems": {
    title: "Master-key systems for managed properties", description: "Understand master-key planning, restricted keys and building access hierarchies before commissioning specialist locksmith work.",
    answer: "A master-key system lets a higher-level key operate multiple locks while individual keys operate a defined subset. It is different from simply rekeying several cylinders to the same key.",
    sections: [["Plan the access hierarchy", "Document which staff roles need access to buildings, common areas and individual units. Consider lost-key procedures, key issuance and how future units will be added."], ["Check existing restrictions", "Existing cylinders may belong to a restricted keyway or manufacturer-controlled system. Identify the system and the party authorized to approve changes before ordering work."], ["Specialist assessment required", "Master-key design and installation are not included in our standard rekey menu. This page is planning guidance. Ask about specialist availability; we will need to confirm a qualified provider, hardware compatibility and a written project scope before any commitment."]],
    faq: [["Is master-key work available at the $75 rekey price?", "No. The standard price covers a standard cylinder rekey, not system design, restricted hardware or a building-wide master-key installation."], ["Can you guarantee specialist coverage?", "No. Specialist availability must be assessed for the address and project. An enquiry is not a confirmed service offer."]],
  },
  "access-control": {
    title: "Access control and smart-lock planning", description: "Compare mechanical key control, standalone smart locks and commercial electronic access control for a managed property.",
    answer: "Commercial access control manages who can enter a building or area, often through credentials, readers and controllers. It is a different project from fitting one standalone smart lock or keeping a record of spare keys.",
    sections: [["Choose the right scope", "A standalone smart lock may suit a compatible individual door. A shared entrance with employee or resident credentials may need a commercial system, specialist assessment and a broader installation scope."], ["Understand the standard installation", "The published $129 installation price covers labor and travel for one compatible customer-supplied smart lock. Hardware, door modifications, electrical work, network troubleshooting and commercial system integration are outside that scope."], ["Assess commercial systems separately", "Reader systems, intercoms, electric strikes, credential management and multi-door integrations are not advertised as confirmed standard services. Specialist capability, relevant requirements and compatibility must be checked before a project is accepted."]],
    faq: [["Is Digital Access an electronic access-control system?", "No. The former consumer Digital Access product organized saved access information. It did not operate commercial readers, controllers or door hardware, and consumer enrollment is closed."], ["Can I book a commercial installation immediately?", "No. Submit the business project scope first. Qualified provider availability and a written quotation must be confirmed."]],
  },
} as const;
export type B2BServiceSlug = keyof typeof B2B_SERVICES;
export const B2B_GUIDES = {
  "turnover-rekey-cost": {
    title: "How to budget for tenant-turnover rekeys", description: "Worked rekey-cost examples using Trusted Locksmith's published standard scope, with a calculator for cylinders and separate visits.",
    answer: "For one standard visit, the published rekey price is $75 for the first cylinder plus $29 for each additional standard cylinder. Two cylinders are $104; three are $133. These are examples of our own prices, not market averages.",
    sections: [["Count cylinders, not just doors", "A door can have more than one keyed cylinder. Count the actual cylinders requiring work, identify compatibility and note any restricted or high-security hardware."], ["Separate visits from units", "Each separately charged visit includes a first-cylinder allowance. Ten visits with two standard cylinders each would be $1,040 under this formula. Ten units in one building do not automatically mean ten visits; obtain a site-specific scope for grouped work."], ["Budget for exceptions", "Replacement hardware, specialty cylinders, repairs and excluded work require separate pricing. Do not apply the standard formula to a master-key system or commercial access-control project. Confirm any applicable taxes in the quotation."]],
    faq: [["Are these independent market statistics?", "No. All worked examples use the platform's published prices. They are not a survey of local competitors."], ["Does the calculator create a booking?", "No. It is an estimate for standard work only. Submit your scope for confirmation of price and availability."]],
  },
  "tenant-turnover-lock-checklist": {
    title: "Tenant-turnover lock and key checklist", description: "A practical checklist for property managers covering authorization, cylinders, key handover and the completion record.",
    answer: "Before a turnover rekey, confirm authority to instruct the work, count cylinders, identify restricted hardware, arrange site access and define who receives the new keys. After the visit, verify operation and update the property record.",
    sections: [["Before requesting work", "Confirm possession and lawful authority; do not use lock changes to resolve a disputed tenancy. List building and unit, cylinder count, hardware type, requested date and authorized on-site contact."], ["At the handover", "Confirm who should receive keys and how many are needed. Have the provider identify excluded work and obtain approval before additional charges. Do not publish access codes, master-key layouts or key-location details."], ["After completion", "Check the affected locks operate correctly, record the work and approved charges, document the key handover and remove obsolete access instructions from your internal records."]],
    faq: [["Should I rekey or replace the lock?", "Rekey when compatible existing hardware is serviceable and the goal is changing key control. Damaged or incompatible hardware may need replacement; obtain an assessment."], ["Is this legal advice about tenancy access?", "No. The property team is responsible for establishing authority and meeting the applicable requirements before instructing work."]],
  },
} as const;
export type GuideSlug = keyof typeof B2B_GUIDES;
export const B2B_PATHS = ["", "/about", "/services", "/how-it-works", "/faq", "/locations", "/landlords", "/for-property-managers", "/for-real-estate-agents", "/partner-tech", "/trust-safety", "/contact", "/business-enquiry", ...Object.keys(B2B_SERVICES).map(s => `/services/${s}`), ...Object.keys(B2B_GUIDES).map(s => `/guides/${s}`)];
export function businessMetadata(title: string, description: string, path: string): Metadata {
  return { title, description, alternates: { canonical: path }, openGraph: { title, description, url: `${SITE_URL}${path}`, type: "website", images: ["/opengraph-image"] }, twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] } };
}
