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
  locale?: string; // Using any for simplicity as the dictionary type isn't strictly defined here, but ideally should be typed
}

export function PricingPlans({ dict, locale = "de" }: PricingPlansProps) {
  const router = useRouter();
  const t = dict.pricing_page;

  const plans = [
    {
      name: t.plans.standard.name,
      price: "299",
      description: t.plans.standard.description,
      features: t.plans.standard.features,
      cta: t.plans.standard.cta,
      variant: "outline",
      popular: false,
    },
    {
      name: t.plans.gold.name,
      price: "499",
      description: t.plans.gold.description,
      features: t.plans.gold.features,
      cta: t.plans.gold.cta,
      variant: "default",
      popular: true,
    },
    {
      name: t.plans.future.name,
      price: "899",
      description: t.plans.future.description,
      features: t.plans.future.features,
      cta: t.plans.future.cta,
      variant: "outline",
      popular: false,
    },
  ];

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

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
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
                  {plan.name === "Future" && (
                     <span className="text-sm font-medium mr-1">{t.meta.starting_at}</span>
                  )}
                  <span className="text-4xl font-extrabold tracking-tight">
                    €{plan.price}
                  </span>
                  
                  {plan.name !== "Future" && (
                    <span className="ml-1 text-gray-500">{t.meta.per_month}</span>
                  )}
                </div>
                {plan.name === "Gold" && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      {t.meta.plus_fees}
                    </p>
                    <p className="text-xs text-gray-400 mt-2 italic">
                      {t.meta.per_minute_example || ""}
                    </p>
                  </div>
                )}
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4">
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
                  variant={plan.variant as "default" | "outline"}
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

