# Stripe Connect sandbox checklist

This branch prepares **test-mode provider payout onboarding only**. It does not enable customer membership checkout, customer dispatch, live transfers, or production payouts.

## Configuration

Set these values only in a test/staging environment:

- `STRIPE_SECRET_KEY`: a Stripe test secret key (`sk_test_...`)
- `STRIPE_WEBHOOK_SECRET`: the signing secret for the test webhook endpoint
- `SUPABASE_SERVICE_ROLE_KEY`: server-only key for the verified non-production TLNM Supabase project

The integration rejects non-test Stripe keys unless `STRIPE_CONNECT_ALLOW_LIVE=true` is deliberately set. Do not set that override for preview or staging.

The integration uses the Stripe Accounts v2 API to create a Recipient account with:

- Express Dashboard access
- platform responsibility for payment fees and negative balances
- the `stripe_transfers` capability required for provider payouts

Providers do not need access to the platform Stripe Dashboard. They receive a single-use Stripe-hosted onboarding link and use the limited Express Dashboard.

## Before a preview test

1. Deploy this branch only to a preview/staging URL; do not promote it to production.
2. Configure the same test-only variables in that preview environment. Do not put secrets in Git.
3. In the Stripe test dashboard, create an endpoint at:
   `https://<preview-host>/api/stripe/connect/webhook`
4. Subscribe the endpoint to the current Accounts v2 account-update event shown by Stripe's dashboard. Copy its test signing secret into `STRIPE_WEBHOOK_SECRET`.
5. Use a verified test provider profile in the correct non-production Supabase project.

## End-to-end test

1. Open `/provider/onboarding` as the verified test provider.
2. Start secure payout onboarding. Stripe should create one recipient account and redirect to a one-time Stripe-hosted link.
3. Complete the test onboarding flow and return to Trusted Locksmith.
4. Confirm that the return route and account-update webhook mark the provider payout-ready only when the Recipient transfer capability is active.
5. Repeat the test using an expired link; the refresh route should issue another one-time link without creating a second account.
6. Confirm the provider remains unavailable to paid work until the marketplace's separate dispatch, transfer, legal, and operational release gates are cleared.

## Explicitly out of scope

- live keys or live connected accounts
- Stripe transfers to providers
- customer charges, membership checkout, refunds, or fee collection
- changes to the pending Supabase schema or production data
- merging or production promotion
