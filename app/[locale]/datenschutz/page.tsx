import React from "react";
import { getDictionary } from "@/lib/dictionary";

import { PageHero } from "@/components/page-hero";

export default async function DatenschutzPage({
  params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <div className="bg-white min-h-screen">
      <PageHero title={dict?.legal_pages?.datenschutz_title || "Datenschutzerklärung"} align="left" className="bg-slate-50" />
      <div className="container px-4 mx-auto max-w-3xl py-12 prose prose-slate">
        <p>Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst.</p>
        {/* Placeholder content */}
      </div>
    </div>
  );
}
