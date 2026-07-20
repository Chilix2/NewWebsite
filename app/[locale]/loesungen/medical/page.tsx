import { getDictionary } from "@/lib/dictionary";
import { IndustryTemplate } from "@/components/industry-template";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: dict?.industries?.medical?.tab_title || "Sailly – No Missed Patients. Your Team Stays Focused on Care.",
  };
}

export default async function MedicalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale = locale;
  const dict = await getDictionary(validLocale);

  return (
    <IndustryTemplate 
      dict={dict.industries.medical} 
      globalDict={dict}
      industryKey="medical" 
      heroImage="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80"
      heroVideo="/videos/praxis-reception.mp4?v=2"
      agentLine={
        dict.industries.medical.agent_line ?? "Ihr Termin ist eingetragen."
      }
      agentLine2={
        dict.industries.medical.agent_line_2 ?? "Laborergebnisse liegen vor."
      }
      locale={locale}
    />
  );
}
