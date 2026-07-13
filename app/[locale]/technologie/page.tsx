import React from "react";
import { getDictionary } from "@/lib/dictionary";

import { PageHero } from "@/components/page-hero";

export default async function TechPage({
  params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const p = dict?.technologie_page;
  return (
    <div className="bg-white min-h-screen">
      <PageHero 
        title={p?.title || "KI-Technologie der nächsten Generation"}
        subtitle={p?.subtitle || "Erfahren Sie, wie unsere Sprachmodelle und Integrations-Engines zusammenarbeiten."}
        badge={p?.badge || "Technologie"}
      />
      {/* Content would go here */}
    </div>
  );
}
