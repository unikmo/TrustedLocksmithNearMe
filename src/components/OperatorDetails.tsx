import { SITE } from "@/lib/site";

export function OperatorDetails() {
  return <section aria-label="Company and contact details" className="mt-8 rounded-xl border border-line p-5 text-sm leading-6 text-parchment-dim">
    <h2 className="font-medium text-parchment">{SITE.operatorName}</h2>
    <p>Estonian commercial register · Registration no. {SITE.registrationNumber}</p>
    <address className="not-italic">{SITE.registeredAddress}</address>
    <p className="mt-2"><a href={`mailto:${SITE.contactEmail}`} className="text-brass underline">{SITE.contactEmail}</a> · Company, support and privacy enquiries</p>
  </section>;
}
