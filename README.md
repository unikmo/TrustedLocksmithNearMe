# Trusted Locksmith

Trusted Locksmith is a Boston-first locksmith request and access-management platform operated by PlanetHike OÜ.

The public product is deliberately narrow:

- clearly scoped one-off locksmith requests
- published standard prices before a request is submitted
- provider identity and ETA only after a real provider accepts
- Digital Access for codes, spare-key locations, trusted contacts and recovery information
- optional membership and property-access workflows
- independent local provider participation

**Platform model:** PlanetHike OÜ operates Trusted Locksmith, the software and marketplace workflow. Field services are performed by participating independent local providers.

## Canonical launch truth

- **Brand:** Trusted Locksmith
- **Public domain:** `https://trustedlocksmithnearme.com`
- **Launch focus:** Boston / Greater Boston first
- **Operator:** PlanetHike OÜ
- **Provider status:** submitting a customer request does not mean a provider has accepted it
- **Provider claim verification:** the current `verified` provider-profile state confirms an approved account-to-business-profile claim. It must not be presented as blanket completion of every credential, insurance, licensing or KYC requirement that may apply to unrestricted paid launch.

Public SEO/entity URLs must use the branded production domain, never a Vercel preview hostname.

## Stack

- Next.js 16 — App Router, Server Actions, TypeScript
- Tailwind CSS v4
- Supabase — auth and Postgres with row-level security

## Core public routes

- `/` — Trusted Locksmith homepage
- `/services` — locksmith service categories and standard pricing
- `/book` — one-off service-request flow
- `/pricing` — optional membership plans
- `/how-it-works` — request flow and platform/provider role separation
- `/digital-access` — Digital Access product
- `/partner-tech` — provider network information
- `/providers` — public provider-profile directory/status
- `/trust-safety` — platform trust model and verification-scope explanation
- `/boston-ma` and supported Massachusetts city/service routes — local locksmith information

Additional authenticated routes support customers, providers, property managers, brokerages and internal operations. Do not remove an authenticated workspace simply because a similarly named marketing page exists.

## Environment variables

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SENTINEL_ENCRYPTION_KEY=...
```

`SENTINEL_ENCRYPTION_KEY` is server-only. Do not expose it with a `NEXT_PUBLIC_` prefix.

The public canonical domain is defined in `src/lib/site.ts`; preview/deployment hostnames must not become SEO canonicals.

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

## Launch blockers still requiring implementation or finalization

A successful deployment is **not** evidence that the marketplace is ready for unrestricted paid production use. Before paid public launch, complete and verify:

1. Real customer payment authorization, capture, refunds and membership activation.
2. Final provider credential, insurance, licensing/KYC rules required for the launch services and jurisdiction, with enforcement evidence beyond business-profile claim approval.
3. Production provider supply and operational acceptance coverage for the launch geography.
4. Production communications for offers, acceptance, customer updates and operational exceptions.
5. Explicit request/payment lifecycle handling for cancellation, failed matching, no-show, completion, disputes and recovery.
6. Final legal review for the actual operating entity, marketplace role, provider model, payment terms and launch geography.
7. End-to-end release QA and live post-release verification.

Historical database migration filenames are retained intentionally. Renaming an already-applied migration for branding cleanup creates unnecessary database-history risk.
