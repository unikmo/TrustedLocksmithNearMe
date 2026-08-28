# Trusted Locksmith Near Me

Trusted Locksmith is a Boston-first locksmith marketplace and property-access platform operated by PlanetHike OÜ. Customers can see a defined standard service scope and price before submitting a request; field work is performed by participating independent local providers.

The product currently includes:

- one-off locksmith service requests
- published standard service pricing and scope
- provider registration, profile claims and private job acceptance
- trusted contacts and Digital Access records
- membership and property-access workflows that remain subject to launch-readiness gates
- property-manager and real-estate workflows
- Massachusetts city/service discovery pages

**Platform model:** Trusted Locksmith operates the software, marketplace rules and customer/provider workflows. Field services are performed by independent local providers. A provider identity or ETA must not be presented as real until that provider has actually accepted the request.

## Canonical project identity

- Brand: Trusted Locksmith
- Public domain: https://trustedlocksmithnearme.com
- Repository: `unikmo/TrustedLocksmithNearMe`
- Operator: PlanetHike OÜ
- Initial launch market: Boston, Massachusetts

## Stack

- Next.js 16 — App Router, Server Actions, TypeScript
- Tailwind CSS v4
- Supabase — auth and Postgres with row-level security
- Vercel — preview and production deployment

## Core routes

- `/` — customer marketplace homepage
- `/services` — locksmith services and standard prices
- `/book` — one-off service-request flow
- `/boston-ma` — Boston local discovery page
- `/boston-ma/[service]` — Boston/local service-intent pages
- `/partner-tech` — independent provider acquisition
- `/providers/claim` — provider profile claim flow
- `/providers/register` — new provider registration
- `/provider` — authenticated provider dashboard
- `/digital-access` — Digital Access product surface
- `/pricing` — membership options
- `/trust-safety` — platform trust model
- `/for-property-managers` — property-management use case
- `/for-real-estate-agents` — real-estate use case
- `/app` — authenticated customer area

## Environment variables

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Public SEO/entity URLs are pinned in `src/lib/site.ts` to the branded production domain so preview/deployment hostnames cannot accidentally become canonical URLs.

Do not commit production secrets.

## Development

```bash
npm install
npm run dev
```

## Production check

```bash
npm run build
```

## Launch blockers still requiring completion and verification

Do not treat a successful website deployment as paid marketplace launch readiness. Before unrestricted paid production launch, verify at minimum:

1. Sufficient verified Boston provider supply and measurable acceptance/fill coverage.
2. Production payment authorization/capture, refunds and membership activation where paid flows are enabled.
3. Provider KYC/payout or transfer mechanics required by the chosen payment model.
4. Production communications and request lifecycle handling, including failure/no-match/no-show paths.
5. Final provider credential/insurance rules by service type and jurisdiction.
6. Massachusetts legal review of marketplace, pricing, provider and membership terms.
7. Monitoring, recovery and end-to-end lifecycle tests with release evidence.

Historical migration filenames may retain the former internal codename and should not be renamed solely for branding cleanup.
