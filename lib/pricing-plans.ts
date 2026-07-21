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

/**
 * Value-prop style solid two-stop gradients (`bg-gradient-to-br from-X to-Y`),
 * using the same lilac / orange / blue / gold hexes as the industry themes.
 */
export const PRICING_PLAN_CARD_CLASSES: Record<PricingPlanKey, string> = {
  starters: "bg-gradient-to-br from-[#c9b6e8] to-[#9b7fd4]", // services lilac
  main: "bg-gradient-to-br from-[#f5c4b0] to-[#e8957a]", // restaurants orange
  president_suite: "bg-gradient-to-br from-[#b8c4dc] to-[#8a9bc4]", // legal blue
  first_class: "bg-gradient-to-br from-[#d9c9a8] to-[#c4ad82]", // hotels sand/gold
};

/** @deprecated Prefer PRICING_PLAN_CARD_CLASSES — kept for theme-key references */
export const PRICING_PLAN_THEMES: Record<PricingPlanKey, string> = {
  starters: "services",
  main: "restaurants",
  president_suite: "legal",
  first_class: "hotels",
};

export function isPricingPlanKey(value: string): value is PricingPlanKey {
  return (PRICING_PLAN_KEYS as readonly string[]).includes(value);
}

export function formatPlanPrice(key: PricingPlanKey, locale: string): string {
  const p = PRICING_PRICES[key];
  return locale === "de" ? p.de : p.intl;
}
