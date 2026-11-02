# B2B-only website release — 2 November 2026

## Delivered in source

- B2B homepage, navigation, property-manager, landlord and brokerage positioning.
- Consumer booking, household membership signup/gifting and consumer app routes redirect to business pages. Consumer server mutations cannot create orders.
- Dedicated turnover-rekey, portfolio-coordination, master-key planning and access-control planning pages. Specialist availability is not represented as confirmed.
- Turnover pricing guide, working GET-based cost calculator and handover checklist.
- B2B local pages. Massachusetts pages are indexable; unconfirmed expansion pages use noindex/follow. Sitemap excludes consumer and unconfirmed expansion URLs.
- Server-rendered answers, canonical and social metadata, Organization/WebSite/WebPage/Article/Breadcrumb/FAQ structured data, search-crawler rules and updated llms.txt.
- Public marketing pages avoid unnecessary authentication-network calls.

## Operational circuit breaker

`src/lib/business-availability.ts` intentionally sets `BUSINESS_REQUESTS_AVAILABLE = false`.
New business signup, enquiry insert and portfolio mutations are disabled at both form and server levels. Workspace and enquiry pages explain current unavailability. This prevents failed submissions and false success messages while the existing backend is inaccessible.

Supabase project `rgyzlfezyhwisfrtoczn` (`keepwell`) is INACTIVE. Restore was attempted and refused because the organization administrator already has two active free projects. A read-only database query also failed. No unrelated project was paused, deleted or upgraded.

`supabase/pending/b2b_only_release.sql` is a prepared, UNAPPLIED database patch. It closes direct consumer booking/order writes and gift activation, prevents signup metadata from provisioning paid memberships, and explicitly correlates requests to their organization and property. Existing customer data and subscriptions are retained. Inspect the live schema before applying.

## Verification

- Production build passed with placeholder public backend configuration; this is compilation evidence, not a live database test.
- TypeScript passed.
- Route-policy tests cover consumer closure, provider/admin preservation and safe login destinations.
- Built-output SEO checks cover sitemap entries, canonicals, descriptions, one H1, parseable JSON-LD, consumer CTA removal, expansion noindex and search-crawler rules.
- Browser: homepage layout, business navigation, consumer-booking redirect, disabled enquiry fields and cost calculator. Ten separate visits / two cylinders yields $1,040.
- Full authenticated business signup, enquiry persistence, organization creation, provider acceptance and completion are BLOCKED by the inactive database. Mobile layouts are implemented responsively but full device/browser testing remains unverified.

## Activation gate

1. Restore capacity for the existing keepwell database without disrupting another project.
2. Inspect live tables, policies and triggers; apply the pending SQL, then run security advisors.
3. Verify business signup/confirmation, organization membership, property/request ownership and isolation, enquiry persistence and provider fulfillment.
4. Only then set `BUSINESS_REQUESTS_AVAILABLE = true`, build and deploy, and retest the full business journey.

Search-engine indexing and AI citations are external outcomes. Metadata, accessible content and crawler access do not guarantee rankings or AI recommendations.
