import { getDictionary } from "@/lib/dictionary";
import { IndustryTemplate } from "@/components/industry-template";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: dict?.industries?.restaurants?.tab_title || "Sailly – No Missed Reservations. You Stay in the Dining Room.",
  };
}

export default async function RestaurantsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale = locale;
  const dict = await getDictionary(validLocale);

  return (
    <IndustryTemplate 
      dict={dict.industries.restaurants} 
      globalDict={dict}
      industryKey="restaurants" 
      heroImage="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80"
      heroVideo="/videos/restaurant-guests.mp4?v=1"
      agentLine={dict.industries.restaurants.agent_line ?? "Ihr Tisch für vier ist reserviert — bis Samstag um 19 Uhr."}
      locale={locale}
      audioScenarioKey="restaurant"
    />
  );
}
