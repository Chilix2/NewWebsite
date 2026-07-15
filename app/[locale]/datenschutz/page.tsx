import { getDictionary } from "@/lib/dictionary";
import { LegalLayout, LegalSection } from "@/components/sierra/legal-layout";

// NOTE FOR REVIEW (Chili): have this reviewed by counsel before go-live and
// list all actual processors (hosting, Supabase, telephony) in section 6.
const CONTENT: Record<"de" | "en", { title: string; updated: string; sections: LegalSection[] }> = {
  de: {
    title: "Datenschutzerklärung",
    updated: "Stand: Juli 2026",
    sections: [
      {
        heading: "1. Verantwortlicher",
        paragraphs: [
          "Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:\nSailly, Alter Weg 70, 53773 Hennef, Deutschland\nE-Mail: kontakt@sailly.de",
        ],
      },
      {
        heading: "2. Allgemeines zur Datenverarbeitung",
        paragraphs: [
          "Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Rechtsgrundlagen sind Art. 6 Abs. 1 lit. a (Einwilligung), lit. b (Vertrag bzw. vorvertragliche Maßnahmen) und lit. f (berechtigtes Interesse) DSGVO.",
        ],
      },
      {
        heading: "3. Hosting und Server-Logfiles",
        paragraphs: [
          "Unsere Website wird auf Servern in der Europäischen Union (Region Frankfurt am Main) betrieben. Bei jedem Aufruf erfasst das System automatisiert Daten und Informationen (u. a. IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite, Browsertyp). Diese Logdaten dienen der Sicherstellung des Betriebs, der Fehleranalyse und der Abwehr von Angriffen (Art. 6 Abs. 1 lit. f DSGVO) und werden nach spätestens 30 Tagen gelöscht.",
        ],
      },
      {
        heading: "4. Cookies und Spracheinstellung",
        paragraphs: [
          "Wir verwenden ausschließlich technisch notwendige Cookies. Dazu gehört das Cookie „NEXT_LOCALE“, das Ihre gewählte Sprache speichert, sowie – sofern Sie ein Kundenkonto nutzen – Sitzungs-Cookies unseres Authentifizierungsdienstes. Diese Cookies erfordern keine Einwilligung (§ 25 Abs. 2 TDDDG).",
        ],
      },
      {
        heading: "5. Kontakt- und Demo-Anfragen",
        paragraphs: [
          "Wenn Sie uns über das Kontakt- oder Demo-Formular Anfragen zukommen lassen, werden Ihre Angaben (Name, E-Mail-Adresse, Unternehmen, Telefonnummer, Nachricht) zur Bearbeitung der Anfrage und für Anschlussfragen bei uns gespeichert (Art. 6 Abs. 1 lit. b DSGVO). Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.",
        ],
      },
      {
        heading: "6. Kundenkonten und Auftragsverarbeiter",
        paragraphs: [
          "Für Kundenkonten und die Anmeldung nutzen wir den Dienst Supabase (Datenhaltung in der EU). Mit allen eingesetzten Dienstleistern – insbesondere Hosting-, Datenbank- und Telefonie-Anbietern – bestehen Auftragsverarbeitungsverträge gemäß Art. 28 DSGVO. Eine Übermittlung in Drittländer erfolgt nur, sofern die Voraussetzungen der Art. 44 ff. DSGVO erfüllt sind.",
          "Im Rahmen des Sailly-Produkts verarbeitete Gesprächsdaten unserer Kunden werden ausschließlich nach Weisung des jeweiligen Kunden verarbeitet; Einzelheiten regelt der Auftragsverarbeitungsvertrag.",
        ],
      },
      {
        heading: "7. Ihre Rechte",
        paragraphs: [
          "Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten: Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch gegen die Verarbeitung (Art. 21). Erteilte Einwilligungen können Sie jederzeit mit Wirkung für die Zukunft widerrufen.",
          "Ihnen steht zudem ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu. Zuständig für uns ist die Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen.",
        ],
      },
      {
        heading: "8. Änderungen dieser Erklärung",
        paragraphs: [
          "Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen umzusetzen.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    updated: "Last updated: July 2026",
    sections: [
      {
        heading: "1. Controller",
        paragraphs: [
          "Controller within the meaning of the GDPR:\nSailly, Alter Weg 70, 53773 Hennef, Germany\nEmail: kontakt@sailly.de",
        ],
      },
      {
        heading: "2. General Information",
        paragraphs: [
          "We process personal data of our users only to the extent necessary to provide a functional website and our content and services. Legal bases are Art. 6 (1) (a) (consent), (b) (contract or pre-contractual measures) and (f) (legitimate interest) GDPR.",
        ],
      },
      {
        heading: "3. Hosting and Server Log Files",
        paragraphs: [
          "Our website is operated on servers within the European Union (Frankfurt region). Each visit automatically generates log data (including IP address, date and time of access, page accessed, browser type). This data is used to ensure operation, analyse errors and defend against attacks (Art. 6 (1) (f) GDPR) and is deleted after 30 days at the latest.",
        ],
      },
      {
        heading: "4. Cookies and Language Preference",
        paragraphs: [
          "We only use technically necessary cookies. These include the \"NEXT_LOCALE\" cookie storing your chosen language and — if you use a customer account — session cookies of our authentication service. These cookies do not require consent (Sec. 25 (2) German TDDDG).",
        ],
      },
      {
        heading: "5. Contact and Demo Requests",
        paragraphs: [
          "If you send us enquiries via the contact or demo form, your details (name, email address, company, phone number, message) are stored to process the enquiry and for follow-up questions (Art. 6 (1) (b) GDPR). We do not pass on this data without your consent.",
        ],
      },
      {
        heading: "6. Customer Accounts and Processors",
        paragraphs: [
          "For customer accounts and login we use Supabase (data stored in the EU). Data processing agreements pursuant to Art. 28 GDPR are in place with all service providers used — in particular hosting, database and telephony providers. Transfers to third countries only take place if the requirements of Art. 44 et seq. GDPR are met.",
          "Call data processed within the Sailly product is processed exclusively on the instructions of the respective customer; details are governed by the data processing agreement.",
        ],
      },
      {
        heading: "7. Your Rights",
        paragraphs: [
          "You have the right to information (Art. 15 GDPR), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20) and objection to processing (Art. 21). You may revoke consent at any time with effect for the future. You also have the right to lodge a complaint with a data protection supervisory authority; the authority responsible for us is the Data Protection Commissioner of North Rhine-Westphalia.",
        ],
      },
      {
        heading: "8. Changes to this Policy",
        paragraphs: [
          "We reserve the right to amend this privacy policy so that it always complies with current legal requirements or to implement changes to our services. The German version is authoritative.",
        ],
      },
    ],
  },
};

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await getDictionary(locale);
  const c = locale === "de" ? CONTENT.de : CONTENT.en;
  return <LegalLayout title={c.title} updated={c.updated} sections={c.sections} />;
}
