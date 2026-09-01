# Trusted Locksmith Near Me

Locksmith marketplace and property-access platform operated by PlanetHike OÜ.

## Canonical project identity

- Brand: Trusted Locksmith
- Domain: https://trustedlocksmithnearme.com
- Repository: unikmo/TrustedLocksmithNearMe
- Operator: PlanetHike OÜ
- Primary launch market: Boston and Greater Boston, Massachusetts
- Expansion content: New York City and selected New York State markets
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
10. verified site-wide analytics destination if traffic/source reporting beyond first-party provider-funnel state is required

Historical migration filenames may retain the former internal codename and should not be renamed solely for branding cleanup because migration identity/history is operational state.
