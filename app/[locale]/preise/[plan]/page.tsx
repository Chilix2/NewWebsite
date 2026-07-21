import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionary";
import { Section, Reveal } from "@/components/sierra/page-kit";
import { cn } from "@/lib/utils";
import {
  PRICING_PLAN_KEYS,
  PRICING_PLAN_CARD_CLASSES,
  formatPlanPrice,
  isPricingPlanKey,
  type PricingPlanKey,
} from "@/lib/pricing-plans";

const PREV_TIER_FALLBACK: Partial<Record<PricingPlanKey, string>> = {
  main: "Alles aus Starters, plus:",
  president_suite: "Alles aus Main, plus:",
  first_class: "Alles aus President Suite, plus:",
};

export function generateStaticParams() {
  return PRICING_PLAN_KEYS.map((plan) => ({ plan }));
}

export default async function PricingPlanCheckoutPage({
  params,
}: {
  params: Promise<{ locale: string; plan: string }>;
}) {
  const { locale, plan: planParam } = await params;
  if (!isPricingPlanKey(planParam)) notFound();

  const planKey = planParam;
  const dict = await getDictionary(locale);
  const t = dict?.pricing_page ?? {};
  const meta = t.meta ?? {};
  const plan = t.plans?.[planKey] ?? {};
  const popular = planKey === "main";
  const isFirst = planKey === "starters";
  const isLast = planKey === "first_class";
  const prevLabel = plan.prev_tier ?? PREV_TIER_FALLBACK[planKey] ?? "";
  const checkoutHref =
    planKey === "first_class"
      ? `/${locale}/contact`
      : `/${locale}/login?tab=register&plan=${planKey}`;

  return (
    <div className="bg-white min-h-screen text-slate-900">
      <section className="pt-10 lg:pt-14 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <Link
              href={`/${locale}/preise`}
              className="inline-flex items-center min-h-[44px] text-sm font-medium text-slate-500 hover:text-slate-900 touch-manipulation"
            >
              ← {meta.back_to_plans ?? "Alle Pakete"}
            </Link>
            <p className="mt-4 text-sm font-semibold text-primary uppercase tracking-wider">
              {meta.checkout_kicker ?? meta.badge ?? t.badge}
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {meta.checkout_title ?? "Paketübersicht"}
              <span className="text-primary"> · {plan.name}</span>
            </h1>
            <p className="mt-3 text-lg text-slate-500 max-w-2xl">
              {plan.description}
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="pt-2">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto items-start">
          <Reveal>
            <div
              className={cn(
                "relative overflow-hidden rounded-3xl p-7 sm:p-9 w-full aspect-square max-w-md mx-auto lg:mx-0 flex flex-col",
                PRICING_PLAN_CARD_CLASSES[planKey]
              )}
            >
              <div className="relative z-10 flex flex-col flex-1">
                {popular && (
                  <span className="self-start rounded-full bg-white/95 text-slate-900 text-xs font-bold px-3.5 py-1.5 mb-4">
                    {meta.popular}
                  </span>
                )}
                <h2 className="text-3xl font-semibold tracking-tight text-white">
                  {plan.name}
                </h2>
                <p className="mt-8 flex items-baseline gap-1.5 text-white">
                  {isLast && (
                    <span className="text-sm text-white/70">{meta.starting_at}</span>
                  )}
                  <span className="text-5xl font-bold tracking-tight">
                    €{formatPlanPrice(planKey, locale)}
                  </span>
                  {!isLast && (
                    <span className="text-sm text-white/70">{meta.per_month}</span>
                  )}
                </p>
                <p className="mt-3 text-sm text-white/75">{meta.plus_fees}</p>
                <p className="mt-auto pt-8 text-sm text-white/80 leading-relaxed">
                  {t.trial_text}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[28px] bg-[#f7f4ee] p-6 sm:p-8 lg:p-10 flex flex-col min-h-full">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                {meta.overview_title ?? "Leistungsumfang"}
              </h3>
              <ul className="mt-6 space-y-0 divide-y divide-slate-900/10">
                {!isFirst && prevLabel && (
                  <li className="py-3.5 text-[15px] font-semibold text-slate-800">
                    {prevLabel}
                  </li>
                )}
                {(plan.features ?? []).map((f: string, fi: number) => (
                  <li
                    key={fi}
                    className="py-3.5 text-[15px] leading-relaxed text-slate-700 first:pt-0"
                  >
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-slate-500 leading-relaxed">
                {meta.per_minute_example}
              </p>

              <div className="mt-8 space-y-3">
                <Link
                  href={checkoutHref}
                  className="block text-center rounded-full bg-primary text-white font-semibold px-6 py-3.5 min-h-[44px] hover:bg-primary/90 transition-all touch-manipulation shadow-lg shadow-primary/20"
                >
                  {meta.checkout_cta ?? plan.cta}
                </Link>
                <Link
                  href={`/${locale}/demo`}
                  className="block text-center rounded-full bg-[#0f172a] text-white font-semibold px-6 py-3.5 min-h-[44px] hover:bg-[#0f172a]/90 transition-all touch-manipulation"
                >
                  {meta.demo_cta ?? dict?.cta_section?.demo ?? "Demo"}
                </Link>
                <Link
                  href={`/${locale}/preise`}
                  className="block text-center rounded-full border border-slate-200 text-slate-700 font-semibold px-6 py-3.5 min-h-[44px] hover:bg-white transition-all touch-manipulation"
                >
                  {meta.back_to_plans ?? "Alle Pakete"}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
