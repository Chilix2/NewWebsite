import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";
import { SierraHero, Section, CtaBand, Reveal } from "@/components/sierra/page-kit";

const PRICES: Record<string, { de: string; intl: string }> = {
  starters: { de: "59,99", intl: "59.99" },
  main: { de: "149", intl: "149" },
  president_suite: { de: "279", intl: "279" },
  first_class: { de: "449", intl: "449" },
};

const PLAN_KEYS = ["starters", "main", "president_suite", "first_class"] as const;

/** Tier display labels shown in the card when showing cascading features */
const PREV_TIER_LABELS: Record<string, string> = {
  main: "Alles aus Starters, plus:",
  president_suite: "Alles aus Main, plus:",
  first_class: "Alles aus President Suite, plus:",
};

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
      <SierraHero kicker={t.badge} title1={t.title} subtitle={t.trial_text} />

      <Section className="pt-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {PLAN_KEYS.map((key, i) => {
            const plan = t.plans?.[key] ?? {};
            const popular = key === "main";
            const isFirst = key === "starters";
            const isLast = key === "first_class";
            const prevLabel = PREV_TIER_LABELS[key] ?? plan.prev_tier ?? "";

            return (
              <Reveal
                key={key}
                delay={i * 0.07}
                className={
                  popular
                    ? "rounded-3xl bg-[#0f172a] text-white p-7 lg:p-9 flex flex-col relative"
                    : "rounded-3xl bg-[#f7f4ee] p-7 lg:p-9 flex flex-col"
                }
              >
                {popular && (
                  <span className="absolute -top-3 left-7 rounded-full bg-primary text-white text-xs font-bold px-3.5 py-1.5">
                    {meta.popular}
                  </span>
                )}
                <span
                  className={`block w-8 h-[3px] rounded-full mb-5 ${popular ? "bg-primary" : "bg-primary/70"}`}
                  aria-hidden="true"
                />
                <h2 className="text-xl font-bold">{plan.name}</h2>
                <p className={`mt-2 text-[15px] leading-relaxed ${popular ? "text-white/70" : "text-slate-600"}`}>
                  {plan.description}
                </p>
                <p className="mt-6 flex items-baseline gap-1.5">
                  {isLast && <span className={`text-sm ${popular ? "text-white/60" : "text-slate-500"}`}>{meta.starting_at}</span>}
                  <span className="text-4xl font-bold tracking-tight">€{locale === "de" ? PRICES[key].de : PRICES[key].intl}</span>
                  {!isLast && <span className={`text-sm ${popular ? "text-white/60" : "text-slate-500"}`}>{meta.per_month}</span>}
                </p>
                <p className={`mt-1 text-xs ${popular ? "text-white/50" : "text-slate-400"}`}>{meta.plus_fees}</p>

                {/* Cascading feature list */}
                <ul className={`mt-7 space-y-0 divide-y ${popular ? "divide-white/10" : "divide-slate-900/10"}`}>
                  {!isFirst && prevLabel && (
                    <li
                      className={`py-3 text-[15px] leading-relaxed font-semibold ${popular ? "text-white/90" : "text-slate-800"}`}
                    >
                      {prevLabel}
                    </li>
                  )}
                  {(plan.features ?? []).map((f: string, fi: number) => (
                    <li
                      key={fi}
                      className={`py-3 text-[15px] leading-relaxed first:pt-0 ${popular ? "text-white/80" : "text-slate-700"}`}
                    >
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <Link
                    href={`/${locale}/demo`}
                    className={
                      popular
                        ? "block text-center rounded-full bg-primary text-white font-semibold px-6 py-3.5 hover:bg-primary/90 transition-all min-h-[44px]"
                        : "block text-center rounded-full bg-[#0f172a] text-white font-semibold px-6 py-3.5 hover:bg-[#0f172a]/90 transition-all min-h-[44px]"
                    }
                  >
                    {plan.cta}
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-6">
          <p className="text-sm text-slate-400 text-center">{meta.per_minute_example}</p>
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
