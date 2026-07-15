import { getDictionary } from "@/lib/dictionary";
import { LegalLayout, LegalSection } from "@/components/sierra/legal-layout";

// NOTE FOR REVIEW (Chili): verify [Inhaber-Name] and phone number before go-live.
const CONTENT: Record<"de" | "en", { title: string; updated: string; sections: LegalSection[] }> = {
  de: {
    title: "Impressum",
    updated: "Angaben gemäß § 5 DDG",
    sections: [
      {
        heading: "Anbieter",
        paragraphs: [
          "Key Digital\nInhaber: [Inhaber-Name]\nAlter Weg 70\n53773 Hennef\nDeutschland",
        ],
      },
      {
        heading: "Kontakt",
        paragraphs: ["E-Mail: kontakt@sailly.de\nWeb: www.sailly.de"],
      },
      {
        heading: "Umsatzsteuer-Identifikationsnummer",
        paragraphs: [
          "USt-IdNr. gemäß § 27a Umsatzsteuergesetz: DE363237855",
        ],
      },
      {
        heading: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
        paragraphs: ["[Inhaber-Name], Alter Weg 70, 53773 Hennef"],
      },
      {
        heading: "EU-Streitschlichtung",
        paragraphs: [
          "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
        ],
      },
      {
        heading: "Haftung für Inhalte und Links",
        paragraphs: [
          "Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Für Inhalte externer Links übernehmen wir keine Gewähr; für den Inhalt der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.",
        ],
      },
    ],
  },
  en: {
    title: "Imprint",
    updated: "Information pursuant to Sec. 5 German Digital Services Act (DDG)",
    sections: [
      {
        heading: "Provider",
        paragraphs: [
          "Key Digital\nOwner: [Owner name]\nAlter Weg 70\n53773 Hennef\nGermany",
        ],
      },
      {
        heading: "Contact",
        paragraphs: ["Email: kontakt@sailly.de\nWeb: www.sailly.de"],
      },
      {
        heading: "VAT Identification Number",
        paragraphs: ["VAT ID pursuant to Sec. 27a German VAT Act: DE363237855"],
      },
      {
        heading: "Responsible for content pursuant to Sec. 18 (2) MStV",
        paragraphs: ["[Owner name], Alter Weg 70, 53773 Hennef, Germany"],
      },
      {
        heading: "EU Dispute Resolution",
        paragraphs: [
          "The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr. We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.",
        ],
      },
      {
        heading: "Liability for Content and Links",
        paragraphs: [
          "As a service provider, we are responsible for our own content on these pages in accordance with general laws. We assume no liability for external links; the respective provider is always responsible for the content of linked pages. The German version of this imprint is authoritative.",
        ],
      },
    ],
  },
};

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await getDictionary(locale); // keeps locale validation consistent
  const c = locale === "de" ? CONTENT.de : CONTENT.en;
  return <LegalLayout title={c.title} updated={c.updated} sections={c.sections} />;
}
