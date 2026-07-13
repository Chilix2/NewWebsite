import { getDictionary } from "@/lib/dictionary";
import { IndustryTemplate } from "@/components/industry-template";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const industryDict =
    dict?.industries?.legal ??
    (await getDictionary("en")).industries?.legal;
  return {
    title: industryDict?.tab_title || "Sailly – No Missed Clients. Your Team Stays Focused on Advisory.",
  };
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale = locale;
  const dict = await getDictionary(validLocale);
  const industryDict =
    dict.industries?.legal ??
    (await getDictionary("en")).industries?.legal;

  return (
    <IndustryTemplate
      dict={industryDict}
      globalDict={dict}
      industryKey="legal"
      heroImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
      heroVideo="/videos/legal-office.mp4?v=1"
      agentLine={industryDict.agent_line ?? "Ihr Erstberatungstermin ist am Donnerstag um 14 Uhr eingetragen."}
      locale={validLocale}
      audioScenarioKey="legal"
    />
  );
}
