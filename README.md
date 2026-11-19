# Trusted Locksmith Near Me

## TLNM / Keys Happen direction — 19 November 2026

**Brand promise:** Keys happen. Have a plan. Pressure shouldn't.

Three public product journeys:
1. Household: free Keys Happen Plan using safe preset contact roles, no access secrets, local share/print, and no sign-in.
2. Property businesses: rekeying, turnover, lock changes and portfolio access coordination; business intake remains closed until the verified TLNM database and operations are restored.
3. Independent locksmiths: jobs scoped upfront, provider choice, no lead-purchase fees, fixed provider payout covering standard travel and labor within the defined radius; claim, payout readiness and marketplace validation remain gates.

**Membership proposal (not open):** $30/year and up to $100 per membership year toward eligible labor only; materials and labor exceeding the remaining balance are customer-paid. Provider payout and TLNM member contribution are distinct financial flows. The old $29/$49/$89 tiers and membership agreement are historical product records and must not be silently migrated or applied to the proposed offer. A labor-benefit preview is available at /pricing, not a checkout.

**No-pressure policy:** optional add-on recommendations must be written, itemized and considered away from the provider; proposed 24-hour acceptance delay. Genuine change-of-scope, urgent security and pre-authorized B2B maintenance require separate approval logic. The pure eligibility function is tested but is not integrated with authenticated database quote acceptance or payment. No claim of live enforcement until operational tests and legal signoff.

**Legal operator:** TSquare Ventures LLC, a Wyoming limited liability company (filing ID 2026-002072750). Use TSquare Ventures LLC consistently across every TLNM public and legal surface.\n\n**Release state:** Draft PR #12 only; no merge or production promotion. Consumer dispatch and paid membership remain blocked. Business intake remains disabled. The current connected Supabase account does not reveal a verified TLNM project. Public preview and any paid functionality require end-to-end QA and the correct infrastructure.

**Design approach:** warm cream backgrounds, clear navy type, lime CTAs, friendly people-first photography, no fear-based messaging, common TLNM navigation and footer, and copy that never implies unverified provider availability.


Locksmith marketplace and property-access platform operated by TSquare Ventures LLC.

## Positioning update (17 November 2026) — consumer-aware, digital first

The homepage and navigation now introduce the Trusted Locksmith consumer-facing brand using a memorable editorial voice and simple digital concierge guidance. Property managers and other B2B customers retain their dedicated services and workflows.

**Release boundary:** The /concierge route offers self-serve guidance and a user-initiated email enquiry. It is **not live dispatch**. Consumer booking routes remain redirected and server-side order mutations remain closed. B2B intake is also disabled by `BUSINESS_REQUESTS_AVAILABLE = false` pending verified database restoration and operational QA. No physical key-box logistics or consumer membership enrollment are included in this repositioning.

**Product strategy:** B2C-led awareness, B2B-led initial monetization, with paid consumer requests activated only after provider availability, payment, address/service-area matching, communications and legal requirements are verified.

## Canonical project identity

- Brand: Trusted Locksmith
- Domain: https://trustedlocksmithnearme.com
- Repository: unikmo/TrustedLocksmithNearMe
- npm package: `trusted-locksmith-near-me`
- Operator: TSquare Ventures LLC
- Primary launch market: Boston and Greater Boston, Massachusetts
- Expansion discovery markets: New York City and selected New York State markets
- Platform role: Trusted Locksmith operates the marketplace; participating independent providers perform field locksmith work
- Homepage rule: market-neutral hero, followed immediately by location intent; no geographic carousel

## Customer promise

Customers see the published standard price and scope before sending a request. Provider identity and ETA appear only after a real participating provider accepts. Any work outside the published standard scope must be separately priced and approved before it starts.

Published standard totals include provider travel/service call.

## Provider acquisition and activation

The intended provider path is self-serve: verified business-email invitation → authenticated profile claim → services/service-area setup → Stripe-hosted payout onboarding → provider-controlled availability → job offers. Routine bank-account and routing details are never collected by Trusted Locksmith forms.

Provider funnel state is tracked first-party in the marketplace data model: contact-ready, invited, opened, claimed, payout-ready and available. `/admin/providers` is the internal acquisition view.

Outbound outreach is fail-closed. The scheduled route only sends when `PROVIDER_OUTREACH_ENABLED=true`, a protected `CRON_SECRET` is configured, server-side Supabase credentials are available, and a verified outreach-eligible email contact exists. Automated SMS/calling is not enabled.

`supabase/pending/provider_self_serve_acquisition.sql` is deliberately **not** canonical migration history yet. The Trusted Locksmith Supabase project must be connected, the schema applied through the normal migration workflow, and security/runtime checks passed before that database layer is considered active.

### Current dispatch boundary

Provider claim, service-area setup, payout onboarding and provider-controlled availability are designed for self-service. **Customer-to-provider job offer dispatch is not yet fully automatic.** Current operations still use an admin-driven offer action after a customer request is created. Automated dispatch requires verified structured address/service-area matching, the correct Trusted Locksmith Supabase project, and end-to-end operational QA before it can replace the admin path.

## Current public service menu

- Home lockout, weekdays 8am–6pm: $99
- Home lockout, evenings/weekends: $129
- Home lockout, overnight/major holidays: $139
- Car lockout at the property: $109
- Standard rekey: $75 for the first standard cylinder; additional standard cylinders $29 each
- Standard lock change: $89 standard labor; hardware separate
- Smart lock installation: $129 standard labor for one compatible customer-supplied smart lock

## Search and AI discovery architecture

The public site uses the branded production domain for canonical URLs, robots and sitemap output.

Massachusetts local architecture:
- 13 geographic pages
- 23 city/service pages

New York local architecture:
- 28 highly localized geographic pages
- 92 evidence-gated service/location pages
  - 28 emergency-locksmith pages
  - 22 car-lockout pages
  - 20 rekey pages
  - 14 lock-change pages
  - 8 smart-lock-installation pages

New York house-lockout pages are not multiplied because current keyword evidence is weak and overlaps strongly with emergency-locksmith intent. Automotive pages remain vehicle-entry only and do not imply key cutting or programming.

The public discovery layer includes:
- conventional crawlable HTML and internal linking
- canonical URLs and XML sitemap
- Organization/Brand entity identifiers
- About/entity authority page
- city, service, offer, breadcrumb and visible-FAQ structured data where applicable
- explicit search-crawler access for OAI-SearchBot, PerplexityBot, Claude-SearchBot and Claude-User while keeping account/private request paths disallowed
- an experimental `llms.txt` summary as a supplemental discovery aid; it is not treated as a Google ranking requirement

## Core routes

- `/` — market-neutral customer entry with immediate Massachusetts/New York location choice
- `/boston-ma` — Boston local landing page
- `/new-york-ny` — New York City local hub
- `/services` — public services and standard prices
- `/book` — service selection and request flow
- `/how-it-works` — marketplace/request process
- `/about` — canonical entity/operator definition
- `/trust-safety` — provider-claim and service-status boundaries
- `/partner-tech` — provider acquisition
- `/providers/claim` — provider profile claim
- `/providers/register` — provider account registration
- `/provider/onboarding` — service coverage + secure payout onboarding
- `/provider` — provider workspace and job offers
- `/admin/providers` — internal provider acquisition funnel
- `/digital-access` — optional access-prevention layer
- `/pricing` — one-off service pricing plus optional memberships

## Stack

- Next.js 16
- React 19
- Supabase
- Vercel
- Stripe Connect integration via server-side API calls
- Optional Resend REST integration for provider invitation email

## Environment

Public SEO/entity URLs are intentionally pinned to `https://trustedlocksmithnearme.com` in `src/lib/site.ts` so preview/deployment hostnames cannot become canonical URLs.

Provider acquisition/onboarding server configuration can include:
- `SUPABASE_SERVICE_ROLE_KEY` — server only
- `STRIPE_SECRET_KEY` — server only; staging should use the Stripe sandbox/test key
- `STRIPE_WEBHOOK_SECRET` — server only
- `CRON_SECRET` — protects scheduled outreach route
- `RESEND_API_KEY` — server only
- `PROVIDER_OUTREACH_FROM` — verified sender identity
- `PROVIDER_OUTREACH_ENABLED` — must be exactly `true` before automated sends occur
- `PROVIDER_OUTREACH_BASE_URL` — optional branded base URL override

## Build

```bash
npm run build
```

## Paid-launch blockers

A successful web build does **not** mean unrestricted paid launch is ready. Before paid production launch, the project still needs verified evidence for:

1. sufficient provider supply, acceptance and fill coverage in each active market
2. production payment authorization/capture/refunds plus validated marketplace money flow
3. verified Stripe Connect configuration, provider KYC/payout/transfer mechanics and webhook handling
4. production communications plus no-match/no-show/failure lifecycle handling
5. provider credential/insurance/licensing rules appropriate to each launch market
6. applicable legal review of the final marketplace, consumer, provider and outbound-acquisition terms
7. production monitoring, recovery and end-to-end operational tests
8. correct Trusted Locksmith Supabase project connected and pending provider-acquisition schema applied/verified
9. verified outbound business-email enrichment/sender configuration before campaign activation
10. automated address/service-area dispatch matching or an explicitly approved operational fallback
11. verified site-wide analytics destination if traffic/source reporting beyond first-party provider-funnel state is required

Historical migration filenames and already-applied database identifiers may retain the former internal codename. They must be cleaned through verified forward migrations, not renamed blindly, because migration identity and deployed schema are operational state.
