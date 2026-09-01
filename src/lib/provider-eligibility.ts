import { NY_AREAS } from "@/lib/new-york-seo";
import { NORTHEAST_AREAS } from "@/lib/northeast-seo";

const EXPANSION_CREDENTIAL_GATED_AREAS = new Set([
  ...NY_AREAS.map((area) => area.shortLocation),
  ...NORTHEAST_AREAS.map((area) => area.shortLocation),
]);

export function expansionCredentialGateAreas(serviceArea: unknown): string[] {
  if (!Array.isArray(serviceArea)) return [];
  return serviceArea.map(String).filter((area) => EXPANSION_CREDENTIAL_GATED_AREAS.has(area));
}

export function hasPendingExpansionCredentialGate(serviceArea: unknown): boolean {
  return expansionCredentialGateAreas(serviceArea).length > 0;
}

/**
 * Expansion-market provider credential verification is intentionally fail-closed.
 * Geographic selection alone must never be treated as licensing/registration eligibility.
 * Replace this gate with verified jurisdiction-specific credential state before production activation.
 */
export const EXPANSION_CREDENTIAL_GATE_ACTIVE = true;
