# Trusted Locksmith Near Me

Boston-first locksmith marketplace and property-access platform operated by PlanetHike OÜ.

## Canonical project identity

- Brand: Trusted Locksmith
- Domain: https://trustedlocksmithnearme.com
- Repository: unikmo/TrustedLocksmithNearMe
- Operator: PlanetHike OÜ
- Launch market: Boston and Greater Boston, Massachusetts
- Platform role: Trusted Locksmith operates the marketplace; participating independent providers perform field locksmith work

## Customer promise

Customers see the published standard price and scope before sending a request. Provider identity and ETA appear only after a real participating provider accepts. Any work outside the published standard scope must be separately priced and approved before it starts.

Published standard totals include provider travel/service call.

## Current public service menu

- Home lockout, weekdays 8am–6pm: $99
- Home lockout, evenings/weekends: $129
- Home lockout, overnight/major holidays: $139
- Car lockout at the property: $109
- Standard rekey: $75 for the first standard cylinder; additional standard cylinders $29 each
- Standard lock change: $89 standard labor; hardware separate
- Smart lock installation: $129 standard labor for one compatible customer-supplied smart lock

## Search and AI discovery architecture

The public site uses the branded production domain for canonical URLs, robots and sitemap output. Massachusetts local SEO remains generated from the canonical city/service registry, including 13 city pages and 23 city-service pages.

The public discovery layer includes:

- conventional crawlable HTML and internal linking
- canonical URLs and XML sitemap
- Organization/Brand entity identifiers
- About/entity authority page
- city, service, offer, breadcrumb and visible-FAQ structured data where applicable
- explicit search-crawler access for OAI-SearchBot, PerplexityBot, Claude-SearchBot and Claude-User while keeping account/private request paths disallowed
- an experimental `llms.txt` summary as a supplemental discovery aid; it is not treated as a Google ranking requirement

## Core routes

- `/` — Boston-first customer entry
- `/boston-ma` — Boston local landing page
- `/services` — public services and standard prices
- `/book` — service selection and request flow
- `/how-it-works` — marketplace/request process
- `/about` — canonical entity/operator definition
- `/trust-safety` — provider-claim and service-status boundaries
- `/partner-tech` — Greater Boston locksmith-provider acquisition
- `/digital-access` — optional access-prevention layer
- `/pricing` — one-off service pricing plus optional memberships
- `/providers/claim` — provider profile claim
- `/providers/register` — provider registration
- `/provider` — provider workspace/login entry

## Stack

- Next.js 16
- React 19
- Supabase
- Vercel

## Environment

Public SEO/entity URLs are intentionally pinned to `https://trustedlocksmithnearme.com` in `src/lib/site.ts` so preview/deployment hostnames cannot become canonical URLs.

Supabase runtime configuration still requires the relevant public/project environment variables for authenticated and database-backed workflows.

## Build

```bash
npm run build
```

## Paid-launch blockers

A successful web build does **not** mean unrestricted paid launch is ready. Before paid production launch, the project still needs verified evidence for:

1. sufficient Boston provider supply, acceptance and fill coverage
2. payment authorization/capture, refunds and any membership charging mechanics
3. provider KYC/payout/transfer mechanics where required
4. production communications plus no-match/no-show/failure lifecycle handling
5. provider credential/insurance/licensing rules appropriate to the launch model
6. Massachusetts legal review of the final marketplace, consumer and provider terms
7. production monitoring, recovery and end-to-end operational tests
8. verified analytics/search-console destinations if measurement is required for launch

Historical migration filenames may retain the former internal codename and should not be renamed solely for branding cleanup because migration identity/history is operational state.