/** Shared pricing plan config for /preise and /preise/[plan] */

export const PRICING_PLAN_KEYS = [
  "starters",
  "main",
  "president_suite",
  "first_class",
] as const;

export type PricingPlanKey = (typeof PRICING_PLAN_KEYS)[number];

export const PRICING_PRICES: Record<
  PricingPlanKey,
  { de: string; intl: string }
> = {
  starters: { de: "59,99", intl: "59.99" },
  main: { de: "149", intl: "149" },
  president_suite: { de: "279", intl: "279" },
  first_class: { de: "449", intl: "449" },
};

/** Exact theme keys from /produkt/integrationen industry + business cards */
export const PRICING_PLAN_THEMES: Record<PricingPlanKey, string> = {
  starters: "services", // Business-Tools lila
  main: "restaurants", // Gastronomie orange
  president_suite: "legal", // Kanzleien blue
  first_class: "hotels", // Hotellerie sand/gold
};

export function isPricingPlanKey(value: string): value is PricingPlanKey {
  return (PRICING_PLAN_KEYS as readonly string[]).includes(value);
}

export function formatPlanPrice(key: PricingPlanKey, locale: string): string {
  const p = PRICING_PRICES[key];
  return locale === "de" ? p.de : p.intl;
}
