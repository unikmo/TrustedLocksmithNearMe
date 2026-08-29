import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

export type StripeConnectAccount = {
  id: string;
  email?: string | null;
  details_submitted?: boolean;
  charges_enabled?: boolean;
  payouts_enabled?: boolean;
  metadata?: Record<string, string>;
  requirements?: {
    currently_due?: string[];
    eventually_due?: string[];
    disabled_reason?: string | null;
  };
};

function stripeSecret() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Stripe Connect is not configured.");
  return key;
}

async function stripeRequest<T>(path: string, init?: { method?: "GET" | "POST"; body?: URLSearchParams }) {
  const response = await fetch(`https://api.stripe.com${path}`, {
    method: init?.method ?? "GET",
    headers: {
      Authorization: `Bearer ${stripeSecret()}`,
      ...(init?.body ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
    },
    body: init?.body?.toString(),
    cache: "no-store",
  });

  const payload = await response.json();
  if (!response.ok) {
    const message = payload?.error?.message ?? `Stripe request failed with ${response.status}.`;
    throw new Error(message);
  }
  return payload as T;
}

export function hasStripeConnectConfig() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export async function createConnectedAccount(input: {
  providerId: string;
  businessName: string;
  email?: string | null;
}) {
  const body = new URLSearchParams();
  body.set("country", "US");
  if (input.email) body.set("email", input.email);
  body.set("controller[fees][payer]", "application");
  body.set("controller[losses][payments]", "application");
  body.set("controller[stripe_dashboard][type]", "express");
  body.set("capabilities[transfers][requested]", "true");
  body.set("business_profile[name]", input.businessName);
  body.set("business_profile[product_description]", "Independent locksmith field services fulfilled through the Trusted Locksmith marketplace.");
  body.set("metadata[provider_id]", input.providerId);
  body.set("metadata[platform]", "trusted_locksmith");

  return stripeRequest<StripeConnectAccount>("/v1/accounts", { method: "POST", body });
}

export async function retrieveConnectedAccount(accountId: string) {
  return stripeRequest<StripeConnectAccount>(`/v1/accounts/${encodeURIComponent(accountId)}`);
}

export async function createOnboardingLink(input: {
  accountId: string;
  refreshUrl: string;
  returnUrl: string;
}) {
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

export function verifyStripeWebhook(rawBody: string, signatureHeader: string | null) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
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
