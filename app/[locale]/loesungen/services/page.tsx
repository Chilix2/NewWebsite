import { getDictionary } from "@/lib/dictionary";
import { IndustryTemplate } from "@/components/industry-template";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: dict?.industries?.services?.tab_title || "Sailly – No Missed Jobs. You Focus on the Work.",
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale = locale;
  const dict = await getDictionary(validLocale);

  return (
    <IndustryTemplate 
      dict={dict.industries.services} 
      globalDict={dict}
      industryKey="services" 
      heroImage="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
      agentLine={dict.industries.services.agent_line ?? "Ihr Termin ist notiert — wir melden uns, sobald alles fertig ist."}
      locale={validLocale}
      audioScenarioKey="services-nail"
    />
  );
}
