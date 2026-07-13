import { getDictionary } from "@/lib/dictionary";
import { PricingPlans } from "@/components/pricing-plans";

export default async function LocalePricingPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="min-h-screen bg-gray-50">
      <PricingPlans dict={dict} locale={locale} />
    </div>
  );
}
