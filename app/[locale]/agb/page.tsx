import React from "react";
import { getDictionary } from "@/lib/dictionary";

import { PageHero } from "@/components/page-hero";

export default async function AGBPage({
  params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <div className="bg-white min-h-screen">
      <PageHero title={dict?.legal_pages?.agb_title || "Allgemeine Geschäftsbedingungen"} align="left" className="bg-slate-50" />
      <div className="container px-4 mx-auto max-w-3xl py-12 prose prose-slate">
        <p>Allgemeine Geschäftsbedingungen der Sailly GmbH.</p>
        {/* Placeholder content */}
      </div>
    </div>
  );
}
