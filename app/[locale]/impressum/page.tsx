import React from "react";
import { getDictionary } from "@/lib/dictionary";

import { PageHero } from "@/components/page-hero";

export default async function ImpressumPage({
  params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <div className="bg-white min-h-screen">
      <PageHero title={dict?.legal_pages?.impressum_title || "Impressum"} align="left" className="bg-slate-50" />
      <div className="container px-4 mx-auto max-w-3xl py-12 prose prose-slate">
        <p>Angaben gemäß § 5 TMG</p>
        <p>Sailly GmbH<br />Musterstraße 1<br />10115 Berlin</p>
        <p><strong>Vertreten durch:</strong><br />Max Mustermann</p>
        <p><strong>Kontakt:</strong><br />Telefon: +49 (0) 123 44 55 66<br />E-Mail: kontakt@sailly.de</p>
      </div>
    </div>
  );
}
