import { getDictionary } from "@/lib/dictionary";
import { LegalLayout, LegalSection } from "@/components/sierra/legal-layout";

// NOTE FOR REVIEW (Chili): B2B terms template — have reviewed by counsel
// before go-live (esp. liability caps, SLA and jurisdiction).
const CONTENT: Record<"de" | "en", { title: string; updated: string; sections: LegalSection[] }> = {
  de: {
    title: "Allgemeine Geschäftsbedingungen",
    updated: "Stand: Juli 2026 — Sailly ist ein Angebot der Key Digital, Hennef",
    sections: [
      {
        heading: "1. Geltungsbereich",
        paragraphs: [
          "Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über die Nutzung des KI-Telefonassistenten „Sailly“ zwischen Key Digital, Alter Weg 70, 53773 Hennef (nachfolgend „Anbieter“) und Unternehmern im Sinne des § 14 BGB (nachfolgend „Kunde“). Das Angebot richtet sich ausschließlich an Unternehmen; ein Verkauf an Verbraucher erfolgt nicht.",
        ],
      },
      {
        heading: "2. Leistungsgegenstand",
        paragraphs: [
          "Der Anbieter stellt dem Kunden einen KI-gestützten Telefonassistenten als Software-as-a-Service bereit, der eingehende Anrufe entgegennimmt, Anliegen verarbeitet (z. B. Termin- und Reservierungsanfragen) und Ergebnisse an die Systeme des Kunden übergibt. Der konkrete Funktionsumfang ergibt sich aus dem jeweils gewählten Paket gemäß aktueller Leistungsbeschreibung auf www.sailly.de/preise.",
        ],
      },
      {
        heading: "3. Vertragsschluss und Testphase",
        paragraphs: [
          "Der Vertrag kommt durch Auftragsbestätigung des Anbieters oder durch Freischaltung des Dienstes zustande. Eine etwaige kostenlose oder vergünstigte Testphase endet automatisch, sofern sie nicht in ein kostenpflichtiges Abonnement überführt wird.",
        ],
      },
      {
        heading: "4. Preise und Zahlung",
        paragraphs: [
          "Es gelten die zum Zeitpunkt des Vertragsschlusses vereinbarten Preise zuzüglich gesetzlicher Umsatzsteuer. Nutzungsabhängige Entgelte (Gesprächsminuten) werden monatlich nachträglich abgerechnet. Rechnungen sind innerhalb von 14 Tagen ohne Abzug fällig. Bei Zahlungsverzug ist der Anbieter nach Ankündigung berechtigt, den Dienst vorübergehend zu sperren.",
        ],
      },
      {
        heading: "5. Laufzeit und Kündigung",
        paragraphs: [
          "Der Vertrag läuft auf unbestimmte Zeit und kann von beiden Seiten mit einer Frist von einem Monat zum Ende eines Kalendermonats gekündigt werden, sofern nicht abweichend vereinbart. Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Kündigungen bedürfen der Textform.",
        ],
      },
      {
        heading: "6. Verfügbarkeit",
        paragraphs: [
          "Der Anbieter strebt eine Verfügbarkeit des Dienstes von 99 % im Monatsmittel an. Hiervon ausgenommen sind angekündigte Wartungsfenster, Störungen im Verantwortungsbereich Dritter (insbesondere Telefonie- und Netzanbieter) sowie Fälle höherer Gewalt.",
        ],
      },
      {
        heading: "7. Mitwirkungspflichten des Kunden",
        paragraphs: [
          "Der Kunde stellt die für die Einrichtung erforderlichen Informationen (z. B. Öffnungszeiten, Speisekarten, Terminregeln, Rufnummern) rechtzeitig und zutreffend bereit, hält Zugangsdaten geheim und informiert seine Anrufer, soweit rechtlich erforderlich, über den Einsatz eines KI-Assistenten und etwaige Aufzeichnungen.",
        ],
      },
      {
        heading: "8. Datenschutz und Auftragsverarbeitung",
        paragraphs: [
          "Soweit der Anbieter personenbezogene Daten im Auftrag des Kunden verarbeitet, schließen die Parteien einen Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO. Die Verarbeitung erfolgt auf Servern in der EU. Einzelheiten regelt die Datenschutzerklärung unter www.sailly.de/datenschutz.",
        ],
      },
      {
        heading: "9. Haftung",
        paragraphs: [
          "Der Anbieter haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung von Leben, Körper und Gesundheit. Bei einfacher Fahrlässigkeit haftet der Anbieter nur für die Verletzung wesentlicher Vertragspflichten (Kardinalpflichten), begrenzt auf den vertragstypischen, vorhersehbaren Schaden, höchstens jedoch auf die vom Kunden in den letzten zwölf Monaten gezahlten Entgelte. Die Haftung nach dem Produkthaftungsgesetz bleibt unberührt. KI-generierte Gesprächsinhalte können Fehler enthalten; der Kunde bleibt für die fachliche Prüfung geschäftskritischer Vorgänge verantwortlich.",
        ],
      },
      {
        heading: "10. Schlussbestimmungen",
        paragraphs: [
          "Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gerichtsstand für alle Streitigkeiten ist, soweit gesetzlich zulässig, Bonn. Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
        ],
      },
    ],
  },
  en: {
    title: "Terms of Service",
    updated: "Last updated: July 2026 — Sailly is a service of Key Digital, Hennef, Germany",
    sections: [
      {
        heading: "1. Scope",
        paragraphs: [
          "These Terms govern all contracts for the use of the \"Sailly\" AI phone assistant between Key Digital, Alter Weg 70, 53773 Hennef, Germany (\"Provider\") and entrepreneurs within the meaning of Sec. 14 German Civil Code (\"Customer\"). The service is offered to businesses only, not to consumers.",
        ],
      },
      {
        heading: "2. Services",
        paragraphs: [
          "The Provider makes an AI-powered phone assistant available as software-as-a-service that answers incoming calls, processes requests (e.g. appointment and reservation enquiries) and hands results over to the Customer's systems. The specific scope of functions results from the selected plan as described at www.sailly.de/preise.",
        ],
      },
      {
        heading: "3. Conclusion of Contract and Trial",
        paragraphs: [
          "The contract is concluded upon the Provider's order confirmation or activation of the service. Any free or discounted trial period ends automatically unless converted into a paid subscription.",
        ],
      },
      {
        heading: "4. Prices and Payment",
        paragraphs: [
          "The prices agreed at the time of contract conclusion apply, plus statutory VAT. Usage-based fees (call minutes) are billed monthly in arrears. Invoices are due within 14 days without deduction. In the event of default, the Provider may temporarily suspend the service after prior notice.",
        ],
      },
      {
        heading: "5. Term and Termination",
        paragraphs: [
          "The contract runs for an indefinite period and may be terminated by either party with one month's notice to the end of a calendar month, unless agreed otherwise. The right to extraordinary termination for good cause remains unaffected. Termination requires text form.",
        ],
      },
      {
        heading: "6. Availability",
        paragraphs: [
          "The Provider aims for a monthly average service availability of 99%. Announced maintenance windows, disruptions within the sphere of third parties (in particular telephony and network providers) and force majeure are excluded.",
        ],
      },
      {
        heading: "7. Customer Obligations",
        paragraphs: [
          "The Customer provides the information required for setup (e.g. opening hours, menus, appointment rules, phone numbers) in a timely and accurate manner, keeps access credentials confidential and informs its callers, where legally required, about the use of an AI assistant and any recordings.",
        ],
      },
      {
        heading: "8. Data Protection",
        paragraphs: [
          "Where the Provider processes personal data on behalf of the Customer, the parties conclude a data processing agreement pursuant to Art. 28 GDPR. Processing takes place on servers in the EU. Details are set out in the privacy policy at www.sailly.de/datenschutz.",
        ],
      },
      {
        heading: "9. Liability",
        paragraphs: [
          "The Provider is liable without limitation for intent and gross negligence and for injury to life, body and health. In cases of simple negligence, the Provider is only liable for breach of essential contractual obligations, limited to the foreseeable damage typical for the contract and capped at the fees paid by the Customer in the preceding twelve months. Liability under the German Product Liability Act remains unaffected. AI-generated conversation content may contain errors; the Customer remains responsible for reviewing business-critical transactions.",
        ],
      },
      {
        heading: "10. Final Provisions",
        paragraphs: [
          "The law of the Federal Republic of Germany applies, excluding the UN Convention on Contracts for the International Sale of Goods. Place of jurisdiction, where legally permissible, is Bonn, Germany. Should individual provisions of these Terms be invalid, the validity of the remaining provisions remains unaffected. The German version is authoritative.",
        ],
      },
    ],
  },
};

export default async function AgbPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await getDictionary(locale);
  const c = locale === "de" ? CONTENT.de : CONTENT.en;
  return <LegalLayout title={c.title} updated={c.updated} sections={c.sections} />;
}
