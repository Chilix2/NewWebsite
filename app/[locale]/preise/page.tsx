import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";
import { SierraHero, Section, CtaBand, Reveal } from "@/components/sierra/page-kit";
import { cn } from "@/lib/utils";
import {
  PRICING_PLAN_KEYS,
  PRICING_PLAN_CARD_CLASSES,
  formatPlanPrice,
} from "@/lib/pricing-plans";

export default async function LocalePricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = dict?.pricing_page ?? {};
  const meta = t.meta ?? {};

  return (
    <div className="bg-white min-h-screen text-slate-900">
      <SierraHero
        title1={t.heading_part1 ?? t.title}
        title2={t.heading_part2}
        subtitle={t.trial_text}
      />

      <Section className="pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 max-w-4xl mx-auto">
          {PRICING_PLAN_KEYS.map((key, i) => {
            const plan = t.plans?.[key] ?? {};
            const popular = key === "main";
            const isLast = key === "first_class";
            const highlight =
              (plan.features ?? [])[0] ??
              (typeof plan.description === "string"
                ? plan.description.split(/[—.–]/)[0]?.trim()
                : "");

            return (
              <Reveal key={key} delay={i * 0.07}>
                <div
                  className={cn(
                    "relative overflow-hidden rounded-3xl p-7 sm:p-9 w-full aspect-square flex flex-col",
                    PRICING_PLAN_CARD_CLASSES[key]
                  )}
                >
                  <div className="relative z-10 flex flex-col flex-1 min-h-0">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white drop-shadow-sm min-w-0">
                        {plan.name}
                      </h2>
                      {popular && (
                        <span className="shrink-0 rounded-full bg-white/95 text-slate-900 text-[11px] sm:text-xs font-bold px-3 py-1.5 shadow-sm leading-tight text-right max-w-[9.5rem]">
                          {meta.popular}
                        </span>
                      )}
                    </div>

                    <p className="mt-6 flex items-baseline gap-1.5 text-white">
                      {isLast && (
                        <span className="text-sm text-white/70">{meta.starting_at}</span>
                      )}
                      <span className="text-4xl sm:text-5xl font-bold tracking-tight drop-shadow-sm">
                        €{formatPlanPrice(key, locale)}
                      </span>
                      {!isLast && (
                        <span className="text-sm text-white/70">{meta.per_month}</span>
                      )}
                    </p>

                    {highlight && (
                      <p className="mt-4 text-[15px] sm:text-base leading-snug text-white/90 line-clamp-2">
                        {highlight}
                      </p>
                    )}

                    <div className="mt-auto pt-6">
                      <Link
                        href={`/${locale}/preise/${key}`}
                        className="block text-center rounded-full font-semibold px-6 py-3.5 min-h-[44px] transition-all touch-manipulation bg-white text-slate-900 hover:bg-white/90 shadow-md"
                      >
                        {meta.details_cta ?? "Details"}
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-6">
          <p className="text-sm text-slate-400 text-center max-w-2xl mx-auto">
            {meta.per_minute_example}
          </p>
        </Reveal>
      </Section>

      <Section>
        <CtaBand
          title={dict?.cta_section?.title}
          subtitle={dict?.cta_section?.subtitle}
          primaryLabel={dict?.cta_section?.demo}
          primaryHref={`/${locale}/demo`}
          secondaryLabel={dict?.cta_section?.contact}
          secondaryHref={`/${locale}/contact`}
        />
      </Section>
    </div>
  );
}
