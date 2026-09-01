export type StrategicServiceLink = {
  href: string;
  audience: string;
  title: string;
  body: string;
};

const STRATEGIC_SERVICE_LINKS: Record<string, StrategicServiceLink[]> = {
  "rekey-locks": [
    {
      href: "/for-property-managers",
      audience: "Property managers",
      title: "Standardize turnover rekeys",
      body: "Use one property-level workflow for rekeys between move-out and move-in instead of sourcing and scoping each job from scratch.",
    },
    {
      href: "/for-real-estate-agents",
      audience: "Real estate professionals",
      title: "Help buyers rekey after closing",
      body: "A move-in rekey is a practical day-one security step for buyers who do not know who still holds copies of the old keys.",
    },
    {
      href: "/landlords",
      audience: "Landlords",
      title: "Make tenant turnover repeatable",
      body: "Keep rekey requests, access notes and completed locksmith work attached to the rental property across tenant changes.",
    },
    {
      href: "/second-homes",
      audience: "Second-home owners",
      title: "Reset access when key control changes",
      body: "Rekey when a key is lost, a local contact changes or you no longer know who can access a property you do not occupy full-time.",
    },
  ],
  "lock-change": [
    {
      href: "/for-property-managers",
      audience: "Property managers",
      title: "Keep replacement work in the property record",
      body: "Use the same request and approval workflow when worn or unsuitable lock hardware needs replacement across managed properties.",
    },
    {
      href: "/for-real-estate-agents",
      audience: "Real estate professionals",
      title: "Support a secure move-in",
      body: "When a buyer needs new hardware rather than a rekey, clearly priced lock-change labor can become part of the move-in security plan.",
    },
    {
      href: "/landlords",
      audience: "Landlords",
      title: "Handle damaged or outdated rental locks",
      body: "Keep replacement scope, hardware approval and service history tied to the rental property instead of scattered across vendor messages.",
    },
    {
      href: "/second-homes",
      audience: "Second-home owners",
      title: "Replace hardware when access risk changes",
      body: "A lock change can be appropriate when existing hardware is damaged, unsuitable or no longer fits how a remote property is accessed.",
    },
  ],
  "smart-lock-installation": [
    {
      href: "/for-property-managers",
      audience: "Property managers",
      title: "Plan smart-lock upgrades consistently",
      body: "Use a defined installation scope when compatible customer-supplied smart locks are introduced across selected managed properties.",
    },
    {
      href: "/for-real-estate-agents",
      audience: "Real estate professionals",
      title: "Offer buyers a modern move-in option",
      body: "Smart-lock installation can complement a move-in rekey or lock change when the buyer already has compatible hardware.",
    },
    {
      href: "/second-homes",
      audience: "Second-home owners",
      title: "Make remote access easier to manage",
      body: "Pair compatible smart-lock installation with Digital Access so recovery instructions, codes and trusted-access information stay organized.",
    },
  ],
};

export function getStrategicServiceLinks(serviceSlug: string) {
  return STRATEGIC_SERVICE_LINKS[serviceSlug] ?? [];
}
