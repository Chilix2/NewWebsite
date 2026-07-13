import { getDictionary } from "@/lib/dictionary";
import { IndustryTemplate } from "@/components/industry-template";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: dict?.industries?.hotels?.tab_title || "Sailly – No Missed Bookings. Your Guests Get the Attention They Deserve.",
  };
}

export default async function HotelsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale = locale;
  const dict = await getDictionary(validLocale);

  return (
    <IndustryTemplate 
      dict={dict.industries.hotels} 
      globalDict={dict}
      industryKey="hotels"
      heroImage="/images/hero-hotel.jpg"
      heroVideo="/videos/hotel-checkin.mp4?v=1"
      agentLine={dict.industries.hotels.agent_line ?? "Ihr Zimmer ist reserviert. Wir freuen uns auf Sie."}
      locale={validLocale}
      audioScenarioKey="hotel"
    />
  );
}
