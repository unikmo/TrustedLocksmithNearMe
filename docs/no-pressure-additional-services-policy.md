# TLNM No-Pressure Additional Services Policy — Draft for implementation

Status: APPROVED PRODUCT DIRECTION; NOT LIVE; legal and operational review required before enforcement.
Experiment: TLNM-2026-001
Market: Greater Boston / Massachusetts pilot.
Scope: Standard lockout jobs, B2B rekeying and other participating provider visits, with role-specific authorization.

## Core rule

The original approved job must be performed at its agreed scope and price. A locksmith may recommend and quote optional additional work, but may not require its purchase or seek immediate approval while at the property. TLNM independently communicates the written offer, and the customer can consider it without the provider present.

**Proposed TLNM contractual waiting rule:** An optional add-on cannot be approved through TLNM until 24 hours after the provider submits the written quotation, and never while the original provider is on site. The 24-hour period is a TLNM consumer-protection policy proposal, not a claim of a legally required cooling-off period. Quotes must remain valid for at least 72 hours after submission unless a longer legally required validity period applies.

The customer may reject, ignore, or request clarification with no charge, penalty, reduction in the original service warranty, or impact on future eligibility. No implied approval from silence.

## Strict distinctions

- A **true add-on** is an optional separate service not required to complete the original authorized scope; it uses the 24-hour deferred decision path.
- A **scope exception** is a genuine obstacle preventing completion of the original job at its agreed scope (e.g., a nonstandard lock that cannot be opened by the agreed method). Stop work, document the finding, show a revised itemized price, and obtain explicit authorization **before** doing any different billable work. Do not mislabel it as an optional add-on to bypass the waiting rule; offer a no-cost decline/cancellation route subject only to previously disclosed lawful call-out fees.
- A **genuine urgent security issue** may need immediate corrective action, but urgency must be factually documented and customer-initiated or separately accepted after independent TLNM confirmation. Provider cannot self-declare urgency to bypass waiting; if independent TLNM approval is unavailable, no extra billable work is authorized. Where the original lockout can be safely completed without additional work, complete it first. Legal review required for cancellation and emergency-sales exceptions.
- A **B2B customer** may have an authorized property manager giving advance written approval under an existing service agreement. Define separately from household upsells; do not impose a homeowner consent flow on pre-authorized commercial maintenance.

## Provider quote fields

original_job_id; provider_id; service_area; quote_id; quote_version; add_on_category; recommendation_reason; optionality (required vs optional); evidence (photos only if safe/authorized); labor_amount; material_amount; travel_amount if additional; taxes; total; exclusions; quote_created_at; customer_visible_at; earliest_accept_at (customer_visible_at + 24h); expires_at (>= customer_visible_at + 72h); provider_on_site=false required for acceptance; customer_acceptance_at; cancellation disclosures; consent record; final amount.

Never share access credentials, door codes, spare-key locations or sensitive home-access details in quotes or communications.

## Workflow / guardrails

1. Provider completes and closes out original authorized job, or documents a genuine scope exception.
2. Provider may submit an optional itemized quote; provider interface shows 'Quote only — no immediate approval or payment'.
3. TLNM delivers quote asynchronously and independently. No customer CTA to approve until 24 hours after delivery. 'Decline', 'Ask a question', and 'Report pressure' are always available.
4. After 24 hours, customer may approve or decline on their own device; verify provider is no longer on-site, record explicit informed consent and exact price/version.
5. No scheduling, invoice, payment authorization, or provider job offer for extra work without the separate recorded approval.
6. Material quote change restarts the review period.
7. Any 'emergency exception' uses separate operations review, independently documented consent and legal-approved rules, and must not silently bypass the original agreement.
8. Record provider complaints and investigate repeated coercive or misleading recommendations; suspend provider where appropriate with fair review process.

## Economics and presentation

- TLNM generates customer requests; no provider lead-purchase fee or acquisition commission on participating jobs.
- The provider's fixed agreed total payout must explicitly cover travel and labor for the defined standard service area and scope; exceptional travel or materials must be disclosed separately before acceptance.
- The member's up-to-$100 per membership year labor benefit is distinct from the provider's total payout. Member eligibility, annual remaining balance, exclusions and labor/material allocation must be shown before the **original** job is approved.
- Do not promise any provider availability, operational service, insurance-like protection, benefits, or guaranteed savings until market/legal/operational gates pass.

## Customer copy

**Keys happen. Pressure shouldn't.**
Your original job is agreed upfront. If a locksmith suggests an optional upgrade, you'll receive a written price to review later. No on-the-spot upselling, no obligation, and no penalty for saying no.

## Provider copy

**Your work. Your price. No lead fees.**
See the agreed standard job scope and all-in provider payout before accepting. Recommend upgrades when genuinely useful; TLNM sends the optional written quote afterward so the customer can decide without pressure.

## Required implementation tickets

- Persist quote and consent audit fields in the verified TLNM database (do not modify pending migrations without environment verification).
- Add provider 'submit optional recommendation' flow without direct provider-controlled checkout.
- Add independent customer quote review flow, 24-hour server-enforced wait, 72-hour minimum validity, explicit consent, complaint/reporting.
- Add role-aware B2B authorization path, genuine scope-exception path, and independently reviewed urgent-security path.
- Unit/E2E tests: time bypass, changed price reset, unapproved work/payment attempt, provider-on-site block, complaint, no-response, waiver attempt, and B2B advance authorization.
- Legal review: Massachusetts 940 CMR 3.08, Massachusetts G.L. ch. 93A, cancellation/consumer solicitation applicability, licensing, provider terms, emergency exceptions, jurisdiction expansion.
- Release gates: correct Supabase project, provider operations, price/payout plumbing, legal approval, QA release certification. Keep unavailable consumer dispatch, paid enrollment and B2B intake disabled until independently ready.

## Legal research basis (not legal advice)

- Massachusetts 940 CMR 3.08 repairs and services: https://www.mass.gov/regulations/940-CMR-300-general-regulation
- Massachusetts consumer protection chapter 93A: https://www.mass.gov/info-details/the-massachusetts-consumer-protection-law
- Massachusetts G.L. ch. 93 sec. 48: https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXV/Chapter93/Section48

Note: Statutory cancellation rules vary by transaction and exceptions. The TLNM 24-hour policy must not be described as the law or as replacing statutory cancellation rights.
