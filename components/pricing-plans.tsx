"use client";

import { useRouter } from "next/navigation";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PricingPlansProps {
  dict: any;
  locale?: string;
}

const PLAN_KEYS = ["starters", "main", "president_suite", "first_class"] as const;

const PRICES: Record<string, { de: string; intl: string }> = {
  starters: { de: "59,99", intl: "59.99" },
  main: { de: "149", intl: "149" },
  president_suite: { de: "279", intl: "279" },
  first_class: { de: "449", intl: "449" },
};

export function PricingPlans({ dict, locale = "de" }: PricingPlansProps) {
  const router = useRouter();
  const t = dict.pricing_page;

  const plans = PLAN_KEYS.map((key) => {
    const plan = t.plans?.[key] ?? {};
    const isLast = key === "first_class";
    const price = PRICES[key];
    return {
      key,
      name: plan.name,
      description: plan.description,
      features: plan.features ?? [],
      prev_tier: plan.prev_tier ?? "",
      cta: plan.cta,
      popular: key === "main",
      price: locale === "de" ? price.de : price.intl,
      isLast,
    };
  });

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            {t.badge}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {t.trial_text}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4 lg:gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.key}
              className={`flex flex-col relative ${
                plan.popular
                  ? "border-primary shadow-lg dark:border-primary"
                  : "border-gray-200 dark:border-gray-800"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 px-3 py-1 text-xs font-medium text-white bg-primary rounded-bl-lg">
                  {t.meta.popular}
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="mt-2 min-h-[50px]">
                  {plan.description}
                </CardDescription>
                <div className="mt-4 flex items-baseline text-gray-900 dark:text-white">
                  {plan.isLast && (
                     <span className="text-sm font-medium mr-1">{t.meta.starting_at}</span>
                  )}
                  <span className="text-4xl font-extrabold tracking-tight">
                    €{plan.price}
                  </span>
                  {!plan.isLast && (
                    <span className="ml-1 text-gray-500">{t.meta.per_month}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4">
                  {plan.prev_tier && (
                    <li className="flex items-start">
                      <span className="text-base font-semibold text-gray-700 dark:text-gray-200">
                        {plan.prev_tier}
                      </span>
                    </li>
                  )}
                  {plan.features.map((feature: string) => (
                    <li key={feature} className="flex items-start">
                      <Check className="flex-shrink-0 w-5 h-5 text-green-500" />
                      <span className="ml-3 text-base text-gray-600 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => router.push(`/${locale}/login?tab=register`)}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
