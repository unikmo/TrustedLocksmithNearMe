import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

const STRIPE_ACCOUNTS_V2_VERSION = "2026-11-18.endive";

function isStripeTestSecret(key: string | undefined) {
  return key?.startsWith("sk_test_") === true || key?.startsWith("rk_test_") === true;
}

export type StripeConnectApiVersion = "v1" | "v2";

export type StripeConnectAccount = {
  id: string;
  apiVersion: StripeConnectApiVersion;
  metadata?: Record<string, string>;
  details_submitted?: boolean;
  charges_enabled?: boolean;
  payouts_enabled?: boolean;
  requirements?: {
    currently_due?: string[];
    eventually_due?: string[];
    past_due?: string[];
    disabled_reason?: string | null;
  };
  configuration?: {
    recipient?: {
      capabilities?: {
        stripe_balance?: {
          stripe_transfers?: {
            status?: string;
          };
        };
      };
    };
  };
};

type StripeApiErrorPayload = {
  error?: {
    code?: string;
    message?: string;
  };
};

class StripeApiError extends Error {
  constructor(
    message: string,
    readonly code?: string,
  ) {
    super(message);
  }
}

function stripeSecret() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Stripe Connect is not configured.");

  if (!key.startsWith("sk_test_") && process.env.STRIPE_CONNECT_ALLOW_LIVE !== "true") {
    throw new Error("Stripe Connect is limited to test keys until STRIPE_CONNECT_ALLOW_LIVE=true is set.");
  }

  return key;
}

/**
 * Checkout deliberately has its own restricted test key. It must never share
 * the Connect credential, and accepting only a test key keeps this feature
 * unavailable to live customers unless it is redesigned and reviewed.
 */
function stripeTestCheckoutSecret() {
  const key = process.env.STRIPE_CHECKOUT_SECRET_KEY;
  if (!isStripeTestSecret(key)) {
    throw new Error("Stripe test checkout is not configured with a test key.");
  }

  return key;
}

async function stripeRequest<T>(
  path: string,
  init?: {
    method?: "GET" | "POST";
    body?: URLSearchParams | Record<string, unknown>;
    idempotencyKey?: string;
    secretKey?: string;
  },
) {
  const isForm = init?.body instanceof URLSearchParams;
  const response = await fetch(`https://api.stripe.com${path}`, {
    method: init?.method ?? "GET",
    headers: {
      Authorization: `Bearer ${init?.secretKey ?? stripeSecret()}`,
      ...(path.startsWith("/v2/") ? { "Stripe-Version": STRIPE_ACCOUNTS_V2_VERSION } : {}),
      ...(init?.idempotencyKey ? { "Idempotency-Key": init.idempotencyKey } : {}),
      ...(init?.body ? { "Content-Type": isForm ? "application/x-www-form-urlencoded" : "application/json" } : {}),
    },
    body: init?.body ? (isForm ? init.body.toString() : JSON.stringify(init.body)) : undefined,
    cache: "no-store",
  });

  const payload = await response.json() as StripeApiErrorPayload;
  if (!response.ok) {
    throw new StripeApiError(
      payload.error?.message ?? `Stripe request failed with ${response.status}.`,
      payload.error?.code,
    );
  }

  return payload as unknown as T;
}

function isV1Account(account: StripeConnectAccount) {
  return account.apiVersion === "v1";
}

function canFallBackToV1(error: unknown) {
  return error instanceof StripeApiError && error.code === "v1_account_instead_of_v2_account";
}

export function hasStripeConnectConfig() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

/**
 * This is deliberately separate from the Connect configuration check. A
 * customer-facing checkout is enabled only on an explicitly opted-in test
 * deployment; a live key can never turn it on by accident.
 */
export function hasStripeTestCheckoutConfig() {
  return process.env.STRIPE_TEST_CHECKOUT_ENABLED === "true"
    && isStripeTestSecret(process.env.STRIPE_CHECKOUT_SECRET_KEY);
}

export async function createTestCheckoutSession(input: {
  serviceId: string;
  serviceTitle: string;
  amountCents: number;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
}) {
  if (!hasStripeTestCheckoutConfig()) {
    throw new Error("Test checkout is not enabled.");
  }

  const body = new URLSearchParams();
  body.set("mode", "payment");
  body.set("success_url", input.successUrl);
  body.set("cancel_url", input.cancelUrl);
  body.set("line_items[0][price_data][currency]", "usd");
  body.set("line_items[0][price_data][product_data][name]", input.serviceTitle);
  body.set("line_items[0][price_data][unit_amount]", String(input.amountCents));
  body.set("line_items[0][quantity]", "1");
  body.set("metadata[service_id]", input.serviceId);

  if (input.customerEmail) body.set("customer_email", input.customerEmail);

  return stripeRequest<{
    id: string;
    object: "checkout.session";
    url: string;
  }>("/v1/checkout/sessions", {
    method: "POST",
    body,
    secretKey: stripeTestCheckoutSecret(),
  });
}

export function getPayoutStatus(account: StripeConnectAccount) {
  if (isV1Account(account)) {
    const detailsSubmitted = Boolean(account.details_submitted);
    const payoutsEnabled = Boolean(account.payouts_enabled);
    return {
      detailsSubmitted,
      chargesEnabled: Boolean(account.charges_enabled),
      payoutsEnabled,
      payoutReady: detailsSubmitted && payoutsEnabled,
    };
  }

  const openRequirements = [
    ...(account.requirements?.currently_due ?? []),
    ...(account.requirements?.past_due ?? []),
  ];
  const detailsSubmitted = openRequirements.length === 0 && !account.requirements?.disabled_reason;
  const payoutsEnabled = account.configuration?.recipient?.capabilities?.stripe_balance?.stripe_transfers?.status === "active";

  return {
    detailsSubmitted,
    // Providers only receive transfers; customer charges remain on the platform.
    chargesEnabled: false,
    payoutsEnabled,
    payoutReady: detailsSubmitted && payoutsEnabled,
  };
}

export async function createConnectedAccount(input: {
  providerId: string;
  businessName: string;
  email?: string | null;
}) {
  const account = await stripeRequest<Omit<StripeConnectAccount, "apiVersion">>("/v2/core/accounts", {
    method: "POST",
    idempotencyKey: `trusted-locksmith-provider-${input.providerId}`,
    body: {
      contact_email: input.email ?? undefined,
      display_name: input.businessName,
      identity: { country: "US" },
      dashboard: "express",
      defaults: {
        responsibilities: {
          fees_collector: "application",
          losses_collector: "application",
        },
      },
      configuration: {
        recipient: {
          capabilities: {
            stripe_balance: {
              stripe_transfers: { requested: true },
            },
          },
        },
      },
      metadata: {
        provider_id: input.providerId,
        platform: "trusted_locksmith",
      },
      include: ["configuration.recipient", "requirements"],
    },
  });

  return { ...account, apiVersion: "v2" as const };
}

async function retrieveV1ConnectedAccount(accountId: string) {
  const account = await stripeRequest<Omit<StripeConnectAccount, "apiVersion">>(
    `/v1/accounts/${encodeURIComponent(accountId)}`,
  );
  return { ...account, apiVersion: "v1" as const };
}

export async function retrieveConnectedAccount(accountId: string): Promise<StripeConnectAccount> {
  const includes = new URLSearchParams();
  includes.set("include[0]", "configuration.recipient");
  includes.set("include[1]", "requirements");

  try {
    const account = await stripeRequest<Omit<StripeConnectAccount, "apiVersion">>(
      `/v2/core/accounts/${encodeURIComponent(accountId)}?${includes.toString()}`,
    );
    return { ...account, apiVersion: "v2" as const };
  } catch (error) {
    if (!canFallBackToV1(error)) throw error;
    return retrieveV1ConnectedAccount(accountId);
  }
}

export async function createOnboardingLink(input: {
  accountId: string;
  apiVersion: StripeConnectApiVersion;
  refreshUrl: string;
  returnUrl: string;
}) {
  if (input.apiVersion === "v1") {
    const body = new URLSearchParams();
    body.set("account", input.accountId);
    body.set("refresh_url", input.refreshUrl);
    body.set("return_url", input.returnUrl);
    body.set("type", "account_onboarding");
    body.set("collection_options[fields]", "eventually_due");

    return stripeRequest<{ object: "account_link"; url: string; expires_at: number }>("/v1/account_links", {
      method: "POST",
      body,
    });
  }

  return stripeRequest<{ object: "v2.core.account_link"; url: string; expires_at: string }>("/v2/core/account_links", {
    method: "POST",
    body: {
      account: input.accountId,
      use_case: {
        type: "account_onboarding",
        account_onboarding: {
          refresh_url: input.refreshUrl,
          return_url: input.returnUrl,
        },
      },
    },
  });
}

export function verifyStripeWebhookWithSecret(rawBody: string, signatureHeader: string | null, secret: string | undefined) {
  if (!secret || !signatureHeader) return false;

  const parts = signatureHeader.split(",");
  const timestamp = parts.find((part) => part.startsWith("t="))?.slice(2);
  const signatures = parts.filter((part) => part.startsWith("v1=")).map((part) => part.slice(3));
  if (!timestamp || signatures.length === 0) return false;

  const ageSeconds = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(ageSeconds) || ageSeconds > 300) return false;

  const expected = createHmac("sha256", secret).update(`${timestamp}.${rawBody}`, "utf8").digest("hex");
  const expectedBuffer = Buffer.from(expected, "hex");

  return signatures.some((signature) => {
    try {
      const candidate = Buffer.from(signature, "hex");
      return candidate.length === expectedBuffer.length && timingSafeEqual(candidate, expectedBuffer);
    } catch {
      return false;
    }
  });
}

export function verifyStripeWebhook(rawBody: string, signatureHeader: string | null) {
  return verifyStripeWebhookWithSecret(rawBody, signatureHeader, process.env.STRIPE_WEBHOOK_SECRET);
}

