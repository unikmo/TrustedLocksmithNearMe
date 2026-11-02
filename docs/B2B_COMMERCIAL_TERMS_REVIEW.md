# Trusted Locksmith — commercial terms for approval

**Review draft — not published as customer terms, accepted by providers or enabled in checkout.**
Prepared 2 November 2026. The public site currently supports enquiries by email; database submissions and customer enrollment remain disabled. Existing customer agreements are not changed by this draft.

## Decisions included in this proposal

- No fee for an enquiry, account application or unaccepted request.
- Standard jobs: payment after completion against an itemized invoice; no deposit unless separately quoted and accepted.
- No automatic renewal, minimum portfolio commitment or cancellation penalty by default.
- If the provider does not attend or no work is performed, no service charge; return any service prepayment. Separately approved nonrecoverable hardware costs require evidence.
- Additional work or costs require written approval before they are incurred.
- Proposed governing law for the new B2B service agreement: Massachusetts; nonexclusive Massachusetts courts, preserving mandatory applicable law. An Estonian operator serving US properties needs jurisdiction-specific legal review before this clause is adopted.

These are proposed commercial choices, not findings about an existing agreement. The owner must approve them and legal review must resolve the contract-party and jurisdiction questions before paid service activation.

## A. Business customer service terms

### 1. Parties and scope

The platform operator is PlanetHike OÜ, Estonian registry no. 17233027, Järvevana tee 9, 11314 Tallinn, Estonia. Contact: hello@trustedlocksmithnearme.com. Trusted Locksmith is its business name for the property-service platform.

The customer is the property business identified in the accepted quotation. Each quotation must identify the independent provider performing the work and state who contracts for, invoices and receives payment for the field service. Do not accept a paid job while that allocation is unresolved. The platform's coordination role does not replace a provider's responsibility for its work or the operator's responsibility for its own services.

### 2. Enquiry and acceptance

An enquiry is free and does not create a service appointment. A job becomes confirmed only when the customer and provider accept a written scope, service address, timing, price and any special terms. A workspace account does not establish coverage, emergency attendance, a maintenance contract or consolidated billing.

### 3. Authority and access

The customer must have lawful authority to instruct the work, arrange site access and identify the person receiving keys. A provider may seek proportionate proof of authority. Work must not proceed where authority or possession is disputed. Access credentials must be exchanged through an agreed secure channel, not a public enquiry.

### 4. Price and changes

The accepted quotation states travel, labor, included cylinders, hardware and applicable taxes. Published standard prices apply only to the stated standard scope. No additional general travel fee may be added where travel is included. Specialist work and variations require a written price and customer approval before they begin. If unexpected conditions prevent the agreed work, stop and obtain instructions.

### 5. Payment

Unless the accepted quotation expressly states otherwise, payment is due upon completion and receipt of an itemized invoice. Any deposit, payment authorization, collection agent or different payment deadline must be disclosed and agreed before acceptance. No automatic renewal or recurring debit is authorized by making an enquiry or creating a workspace.

### 6. Cancellation, failed attendance and refunds

A customer may withdraw an unaccepted request without charge. For an accepted job, no cancellation penalty applies unless a specific amount or calculation was disclosed and accepted in the quotation. Approved, nonrecoverable hardware costs may be charged only to the extent actually incurred and evidenced.

If no provider attends or the agreed work is not performed, do not charge for that unperformed service. Return any corresponding prepayment to its original payment method, except evidenced hardware costs expressly approved in advance. Begin the refund within ten business days after the refundable amount is agreed; banking or card settlement time is additional. A provider's substitute must be identified and accepted before attendance.

### 7. Completion and disputes

Record the work performed, approved variations, charges and key handover. The customer should report a workmanship or billing issue promptly to the provider and copy hello@trustedlocksmithnearme.com so the platform can help trace the record. Do not treat acknowledgement of attendance or payment as a waiver of non-waivable rights. No special warranty period is offered by this draft; each accepted quotation must disclose any offered warranty.

### 8. Responsibilities and claims

The provider is responsible for its accepted field work, relevant eligibility, tools and personnel. The customer is responsible for its authority and instructions. PlanetHike OÜ is responsible for the coordination services it undertakes. This draft introduces no liability cap, indemnity or mandatory arbitration; those provisions need specific owner approval and legal review rather than assumptions.

### 9. Governing law — proposed for review

The proposed agreement is governed by Massachusetts law, subject to mandatory laws that cannot be excluded. The parties submit to the nonexclusive jurisdiction of the competent Massachusetts courts. This clause must be reviewed for the actual contracting and payment model before publication.

## B. Independent provider schedule

1. **Identity and eligibility:** The provider supplies its correct business identity, contact details, genuine service areas and evidence of qualifications, licenses, permits or insurance required for the location and task. A geographic listing is not eligibility approval.
2. **Independent business:** The provider controls whether to make itself available and accept an offer. It remains responsible for its staff, tools, tax obligations and lawful performance. Contract labels alone do not settle worker-classification questions.
3. **Offer acceptance:** Each offer identifies the job scope, site, timing, customer price where relevant, provider payout, platform fees, taxes, invoicing party and cancellation treatment. No hidden fee or payout formula is introduced by this schedule. Do not activate paid acceptance until these terms are populated and accepted.
4. **Changes and completion:** Do not carry out or charge for extra work without approval. Record attendance, completion, approved variations and key handover. Notify the customer and platform promptly if a job cannot be fulfilled.
5. **Payment and charge disputes:** Stripe-hosted onboarding may collect payout information. Payout timing, reserves, refunds and chargeback allocation must be disclosed in the accepted provider offer or signed schedule before paid work begins. This draft does not authorize deductions from unrelated jobs.
6. **Personal data and access secrets:** Use only the information necessary for the accepted job. Do not retain or reuse access codes, documents or resident details for unrelated purposes. Report a suspected data or access incident promptly to hello@trustedlocksmithnearme.com. A separate data-role assessment and processing agreement is required where applicable.
7. **Removal and existing jobs:** A provider may stop accepting new offers. The operator may restrict future offers for unresolved safety, eligibility or misuse concerns. Existing accepted jobs, earned payments and complaints still need to be resolved under their applicable terms.

## Release requirements

- Owner approval of the commercial choices above.
- Legal review of contract formation, service-vs-platform parties, jurisdiction, provider classification and applicable property-access requirements.
- Confirm live payment, cancellation, no-show and refund behavior matches the published terms.
- Resolve the Supabase active-free-project quota and verify enquiry insertion, authentication and portfolio requests before enabling database intake.
- Confirm processor contracts, international-transfer arrangements and retention rules before claiming a complete privacy compliance review.

## Evidence

Verified operator details and company email are published by the operator:
- https://www.planethike.org/about
- https://www.planethike.org/privacy

Implementation evidence: `src/lib/business-availability.ts`, `src/app/contact/actions.ts`, `src/proxy.ts`, current service menu and provider onboarding actions. Supabase returned `keepwell` (`rgyzlfezyhwisfrtoczn`) as `INACTIVE`; restoration was rejected because the owner has reached the two-active-free-project limit. Active projects returned: `EventEngine` and `tisonik-production`. No other project was paused and no upgrade was purchased.

Primary legal references for review, without assuming every regime applies to every B2B transaction:
- GDPR, particularly Articles 6, 13, 28 and 44–49: https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng/
- Massachusetts home-improvement contract guidance (counsel must assess whether particular work falls in scope): https://www.mass.gov/info-details/home-improvement-contract-sample-language

This is a proposed agreement for review, not a representation that the product is legally compliant or ready for paid operation.
