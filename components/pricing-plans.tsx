"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  PRICING_PLAN_KEYS,
  PRICING_PLAN_CARD_CLASSES,
  formatPlanPrice,
} from "@/lib/pricing-plans";

interface PricingPlansProps {
  dict: any;
  locale?: string;
}

export function PricingPlans({ dict, locale = "de" }: PricingPlansProps) {
  const router = useRouter();
  const t = dict.pricing_page;
  const meta = t?.meta ?? {};

  return (
    <section className="py-12 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            {t.badge}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600">{t.trial_text}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 max-w-4xl mx-auto">
          {PRICING_PLAN_KEYS.map((key) => {
            const plan = t.plans?.[key] ?? {};
            const popular = key === "main";
            const isLast = key === "first_class";
            const highlight = (plan.features ?? [])[0] ?? "";

            return (
              <div
                key={key}
                className={cn(
                  "relative overflow-hidden rounded-3xl p-7 sm:p-9 w-full aspect-square flex flex-col",
                  PRICING_PLAN_CARD_CLASSES[key]
                )}
              >
                <div className="relative z-10 flex flex-col flex-1 min-h-0">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white drop-shadow-sm min-w-0">
                      {plan.name}
                    </h3>
                    {popular && (
                      <span className="shrink-0 rounded-full bg-white/95 text-slate-900 text-[11px] sm:text-xs font-bold px-3 py-1.5 shadow-sm leading-tight text-right max-w-[9.5rem]">
                        {meta.popular}
                      </span>
                    )}
                  </div>
                  <div className="mt-6 flex items-baseline text-white">
                    {isLast && (
                      <span className="text-sm font-medium mr-1 text-white/70">
                        {meta.starting_at}
                      </span>
                    )}
                    <span className="text-4xl font-bold tracking-tight">
                      €{formatPlanPrice(key, locale)}
                    </span>
                    {!isLast && (
                      <span className="ml-1 text-white/70">{meta.per_month}</span>
                    )}
                  </div>
                  {highlight && (
                    <p className="mt-4 text-[15px] text-white/90 line-clamp-2">
                      {highlight}
                    </p>
                  )}
                  <div className="mt-auto pt-6">
                    <Button
                      className="w-full rounded-full min-h-[44px] touch-manipulation bg-white text-slate-900 hover:bg-white/90 shadow-md"
                      variant="default"
                      onClick={() => router.push(`/${locale}/preise/${key}`)}
                    >
                      {meta.details_cta ?? "Details"}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
