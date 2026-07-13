"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Database,
  FileText,
  Users,
  Settings,
  Play,
  GitBranch,
  Upload,
  Calendar,
  Mail,
  Shield,
  ClipboardCheck,
  Merge,
  LayoutGrid,
  Bot,
  FileSpreadsheet,
  FolderOpen,
  Send,
  Eye,
  PenTool,
  Activity,
  Cpu,
  Clock,
  Building,
  AlertCircle,
  FileCheck,
  Presentation,
} from "lucide-react"

export default function WorkflowDiagrams() {
  return (
    <div className="space-y-8 sm:space-y-12 bg-white p-4 sm:p-8 min-h-screen">
      {/* Header */}
      <div className="border-b pb-4 sm:pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Architekten-Workflow Analyse</h1>
        <p className="text-sm sm:text-base text-gray-600">Analyse der TOGAF-Prozesse mit n8n/Zapier Automatisierungspotenzial</p>
      </div>

      {/* ==================== SECTION 1: IST-ZUSTAND ==================== */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <span className="font-bold text-amber-600">1</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Ist-Zustand</h2>
            <p className="text-gray-500">Aktuelle Prozesse aus togaf.png und togaf2.png</p>
          </div>
        </div>

        {/* Workflow 1A: Kunden-Onboarding (togaf.png) */}
        <WorkflowSection
          title="Prozess 1A: Kunden-Onboarding & Anforderungserfassung"
          source="togaf.png"
          description="Vom Auftragseingang bis zur Workshop-Durchführung"
        >
          <div className="flex items-center gap-1 overflow-x-auto pb-4">
            <N8nNode type="trigger" icon={Play} label="Auftrag Grobkonzept" sublabel="Start-Event" />
            <N8nConnector />
            <N8nNode icon={Database} label="Auftrags-annahme" sublabel="Datenbank" color="purple" />
            <N8nConnector />
            <N8nNode
              icon={Users}
              label="Generierung Kundenzugang"
              sublabel="Kollaborationsplattform"
              color="green"
              automated
            />
            <N8nConnector />
            <N8nNode icon={Mail} label="Versandt Zugangsdaten" sublabel="E-Mail" color="green" automated />
            <N8nConnector />
            <N8nNode icon={Shield} label="Erster Login + NDA Einwilligung" sublabel="Auth & Consent" color="blue" />
            <N8nConnector />
            <N8nNode icon={ClipboardCheck} label="Erfassung Kundenanforderungen" sublabel="Formular" color="blue" />
            <N8nConnector />
            <N8nNode type="merge" icon={Merge} label="Zusammenführung" sublabel="Parallel Gate" />
            <N8nConnector />
            <N8nNode icon={Calendar} label="Terminabstimmung Workshop" sublabel="Kalender" color="green" automated />
            <N8nConnector />
            <N8nNode icon={Database} label="Speichern Validierungs-ergebnisse" sublabel="Datenbank" color="purple" />
            <N8nConnector />
            <N8nNode
              icon={Settings}
              label="Auto. Generierung Unterlagen"
              sublabel="Automatisch"
              color="green"
              automated
            />
            <N8nConnector />
            <N8nNode icon={Eye} label="Prüfung & Bereitstellung" sublabel="Manuell" color="orange" />
            <N8nConnector />
            <N8nNode
              icon={FileText}
              label="Vorbereitung Workshop"
              sublabel="Kollaborationsplattform"
              color="green"
              automated
            />
            <N8nConnector />
            <N8nNode icon={Users} label="Moderation Workshop" sublabel="Meeting" color="green" automated />
            <N8nConnector />
            <N8nNode icon={PenTool} label="Protokollierung" sublabel="Protokollierungstool" color="green" automated />
            <N8nConnector />
            <N8nNode type="end" icon={CheckCircle2} label="Abgeschlossen" sublabel="Ende" />
          </div>
        </WorkflowSection>

        {/* Workflow 1B: Dokumentenerstellung (togaf2.png) */}
        <WorkflowSection
          title="Prozess 1B: Dokumentenerstellung & Grobkonzept"
          source="togaf2.png"
          description="Von der Bestandsdokumentation bis zur Freigabe"
          className="mt-8"
        >
          <div className="flex items-center gap-1 overflow-x-auto pb-4">
            <N8nNode type="trigger" icon={Play} label="Start Dokumentation" sublabel="Trigger" />
            <N8nConnector />

            {/* Multiple Data Sources */}
            <div className="flex flex-col gap-2 shrink-0">
              <N8nNode icon={Database} label="Mobiles Messtool" sublabel="Datenquelle" color="purple" size="sm" />
              <N8nNode
                icon={Users}
                label="Kundenanforderungen"
                sublabel="Kollaborationsplattform"
                color="purple"
                size="sm"
              />
              <N8nNode icon={FileText} label="Protokollierungstool" sublabel="Datenquelle" color="purple" size="sm" />
              <N8nNode icon={Database} label="Datenbank" sublabel="Datenquelle" color="purple" size="sm" />
            </div>

            <N8nConnector />
            <N8nNode icon={Building} label="Dokumentation Bestandsräume" sublabel="Erfassung" color="blue" />
            <N8nConnector />
            <N8nNode icon={FileText} label="Zusammenstellung Protokoll" sublabel="Workshop-Protokoll" color="blue" />
            <N8nConnector />
            <N8nNode icon={ClipboardCheck} label="Finale Prüfung Protokoll" sublabel="Validierung" color="orange" />
            <N8nConnector />
            <N8nNode type="merge" icon={Merge} label="Verzweigung" sublabel="Parallel" />
            <N8nConnector />

            {/* Parallel Processing */}
            <div className="flex flex-col gap-2 shrink-0">
              <N8nNode
                icon={Cpu}
                label="Auto. Erstellung Grobkonzept"
                sublabel="KI-Generierung"
                color="green"
                automated
                size="sm"
              />
              <N8nNode
                icon={AlertTriangle}
                label="Optional: Standortrisiko-analyse"
                sublabel="Bedingt"
                color="gray"
                size="sm"
              />
            </div>

            <N8nConnector />
            <N8nNode icon={Eye} label="Prüfung erstellter Dokumente" sublabel="Manuelle Prüfung" color="orange" />
            <N8nConnector />
            <N8nNode
              icon={Upload}
              label="Hochladen zur Abstimmung"
              sublabel="Kollaborationsplattform"
              color="green"
              automated
            />
            <N8nConnector />
            <N8nNode icon={FileCheck} label="Finalisierung & Freigabe" sublabel="Approval" color="green" automated />
            <N8nConnector />
            <N8nNode type="end" icon={CheckCircle2} label="Grobkonzept erstellt" sublabel="Ende" />
          </div>
        </WorkflowSection>

        {/* IST-Zustand Zusammenfassung */}
        <Card className="p-4 sm:p-6 mt-4 sm:mt-6 bg-gray-50 border">
          <h4 className="font-bold text-gray-900 mb-3 sm:mb-4 text-lg sm:text-xl">Ist-Zustand Bewertung</h4>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <div className="flex items-center gap-2 text-green-600 font-semibold mb-2">
                <CheckCircle2 className="h-5 w-5" />
                Bereits automatisiert (Grün)
              </div>
              <ul className="text-sm text-gray-600 space-y-1 ml-7">
                <li>• Kundenzugang-Generierung</li>
                <li>• E-Mail-Versand Zugangsdaten</li>
                <li>• Terminabstimmung Workshop</li>
                <li>• Automatische Unterlagen-Generierung</li>
                <li>• Workshop-Protokollierung</li>
                <li>• Upload zur Abstimmung</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 text-orange-600 font-semibold mb-2">
                <Clock className="h-5 w-5" />
                Noch manuell / Problematisch
              </div>
              <ul className="text-sm text-gray-600 space-y-1 ml-7">
                <li>• Prüfung und Bereitstellung</li>
                <li>• Finale Protokoll-Prüfung</li>
                <li>• Dokumentenprüfung nach KI-Erstellung</li>
                <li>• Koordination mehrerer Datenquellen</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* ==================== SECTION 2: AUTOMATISIERUNGSPOTENZIAL ==================== */}
      <section className="pt-8 border-t">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <span className="font-bold text-orange-600">2</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Automatisierungspotenzial</h2>
            <p className="text-gray-500">Schmerzpunkte aus togaf3.png, togaf4.png, togaf5.png</p>
          </div>
        </div>

        {/* Pain Points Analysis */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <PainPointCard
            title="Validierung Kundenanforderungen"
            source="togaf4.png"
            problems={[
              "Manuelle Protokollierung zeitaufwändig",
              "Risiko unvollständiger Dokumentation",
              "Historische Daten schwer abrufbar",
              "Fehlende Automatisierung bei Ungereimtheiten",
            ]}
            automation={[
              "n8n: Webhook + Google Sheets Validierung",
              "Zapier: Typeform → Airtable Pipeline",
              "KI-gestützte Anforderungsprüfung",
              "Automatische Konflikt-Erkennung",
            ]}
          />

          <PainPointCard
            title="Gefährdungsanalyse (Standortrisiko)"
            source="togaf5.png"
            problems={[
              "Zeitintensive manuelle Erstellung",
              "SOLL-Risiken nicht klar definiert",
              "Fehlende transparente Darstellung",
              "Keine Vergleichbarkeit IST/SOLL",
            ]}
            automation={[
              "n8n: Datenbank → KI-Risikoberechnung",
              "Automatische Risikomatrix-Erstellung",
              "Templating für Standardrisiken",
              "Dashboard für Vergleichsanalyse",
            ]}
          />

          <PainPointCard
            title="Erstellung technischer Details"
            source="togaf3.png"
            problems={[
              "Manuelle Übertragung aus Bestandsaufnahme",
              "Wiederholte Eingabe identischer Daten",
              "Hoher Aufwand bei Erstellung",
              "Fehleranfällig durch Copy-Paste",
            ]}
            automation={[
              "n8n: Datenbank-Sync automatisieren",
              "Template-basierte Dokument-Generierung",
              "SAP/s Integration für Stammdaten",
              "Versionskontrolle automatisch",
            ]}
          />
        </div>

        {/* Workflow with Pain Points Highlighted */}
        <WorkflowSection
          title="Prozess mit Schmerzpunkten (ROT = Manuell)"
          source="togaf3.png, togaf4.png, togaf5.png"
          description="Darstellung der kritischen manuellen Schritte"
        >
          <div className="flex items-center gap-1 overflow-x-auto pb-4">
            <N8nNode type="trigger" icon={Play} label="Auftrag erhalten" sublabel="Trigger" />
            <N8nConnector />
            <N8nNode icon={Database} label="Historische Daten" sublabel="MS OneDrive" color="purple" />
            <N8nConnector />
            <N8nNode icon={AlertCircle} label="Validierung Anforderungen" sublabel="MANUELL" color="red" manual />
            <N8nConnector />
            <N8nNode icon={Calendar} label="Terminabstimmung" sublabel="Kalender" color="green" automated />
            <N8nConnector />
            <N8nNode icon={Send} label="Versand Unterlagen" sublabel="E-Mail" color="green" automated />
            <N8nConnector />
            <N8nNode icon={Users} label="Durchführung Workshop" sublabel="Meeting" color="blue" />
            <N8nConnector />
            <N8nNode icon={FileText} label="Dokumentation Protokoll" sublabel="Erfassung" color="blue" />
            <N8nConnector />
            <N8nNode icon={LayoutGrid} label="Erstellung Projektvorgaben" sublabel="Output" color="blue" />
            <N8nConnector />
            <N8nNode type="end" icon={CheckCircle2} label="Anforderungen erfasst" sublabel="Ende" />
          </div>
        </WorkflowSection>

        <WorkflowSection
          title="Standortrisikoanalyse (ROT = Manuelle Engpässe)"
          source="togaf5.png"
          description="Risikoanalyse-Prozess mit Automatisierungsbedarf"
          className="mt-6"
        >
          <div className="flex items-center gap-1 overflow-x-auto pb-4">
            <N8nNode type="trigger" icon={Play} label="Auftrag Risikoanalyse" sublabel="Trigger" />
            <N8nConnector />
            <N8nNode icon={Database} label="Standort-Daten" sublabel="Datenbank" color="purple" />
            <N8nConnector />
            <N8nNode icon={FileSpreadsheet} label="Erstellung Kriterien-verzeichnis" sublabel="Liste" color="blue" />
            <N8nConnector />
            <N8nNode icon={Building} label="Erstellung Bestandsaufnahme" sublabel="Analyse" color="blue" />
            <N8nConnector />
            <N8nNode icon={AlertCircle} label="Erstellung Gefährdungs-analyse" sublabel="MANUELL" color="red" manual />
            <N8nConnector />
            <N8nNode icon={LayoutGrid} label="Erstellung Risiko-matrix" sublabel="Berechnung" color="orange" />
            <N8nConnector />
            <N8nNode icon={FileCheck} label="Finalisierung Analyse" sublabel="Dokument" color="green" automated />
            <N8nConnector />
            <N8nNode type="end" icon={CheckCircle2} label="Analyse erstellt" sublabel="Ende" />
          </div>
        </WorkflowSection>

        <WorkflowSection
          title="Technische Konzeption (ROT = Manuelle Dateneingabe)"
          source="togaf3.png (unterer Bereich)"
          description="Grobkonzept-Erstellung mit Datenintegrationsproblemen"
          className="mt-6"
        >
          <div className="flex items-center gap-1 overflow-x-auto pb-4">
            <N8nNode type="trigger" icon={Play} label="Anforderungs-katalog" sublabel="Input" />
            <N8nConnector />
            <N8nNode icon={AlertCircle} label="Erstellung techn. Details" sublabel="MANUELL" color="red" manual />
            <N8nConnector />
            <N8nNode
              icon={FileSpreadsheet}
              label="Erstellung Angebots-/Kostenplan"
              sublabel="Kalkulation"
              color="blue"
            />
            <N8nConnector />
            <N8nNode icon={Database} label="Historische Daten" sublabel="Referenz" color="purple" />
            <N8nConnector />
            <N8nNode icon={Settings} label="Erstellung Architektur-rahmen" sublabel="Konzept" color="blue" />
            <N8nConnector />
            <N8nNode icon={Database} label="SAP/s Daten" sublabel="Integration" color="purple" />
            <N8nConnector />
            <N8nNode icon={FileText} label="Erstellung Summary" sublabel="Dokument" color="blue" />
            <N8nConnector />
            <N8nNode icon={Eye} label="Qualitätsprüfung" sublabel="Review" color="orange" />
            <N8nConnector />
            <N8nNode icon={Presentation} label="Finalisierung Präsentation" sublabel="Output" color="green" automated />
            <N8nConnector />
            <N8nNode type="end" icon={CheckCircle2} label="Grobkonzept erstellt" sublabel="Ende" />
          </div>
        </WorkflowSection>
      </section>

      {/* ==================== SECTION 3: FINALE WORKFLOWS ==================== */}
      <section className="pt-8 border-t">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <span className="font-bold text-green-600">3</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Finale n8n/Zapier Workflows</h2>
            <p className="text-gray-500">Optimierte Prozesse mit konkreten Tool-Integrationen</p>
          </div>
        </div>

        {/* Final Workflow 1: Kunden-Onboarding */}
        <FinalWorkflowCard
          title="Workflow 1: Kunden-Onboarding & Anforderungsworkshop"
          description="Vollautomatisierter Prozess vom Auftragseingang bis Workshop-Durchführung"
          tools={[
            "n8n Webhook",
            "Airtable/Notion",
            "Gmail/SMTP",
            "Google Calendar",
            "Typeform",
            "Slack",
            "Google Drive",
          ]}
        >
          <div className="flex items-center gap-1 overflow-x-auto pb-4">
            <N8nNode type="trigger" icon={Activity} label="Webhook: Neuer Auftrag" sublabel="n8n Trigger" />
            <N8nConnector />
            <N8nNode icon={Database} label="Airtable: Kunde anlegen" sublabel="CRM" color="purple" />
            <N8nConnector />
            <N8nNode icon={Shield} label="Auto: Zugangsdaten generieren" sublabel="Crypto/UUID" color="blue" />
            <N8nConnector />
            <N8nNode icon={Mail} label="Gmail: Einladung + NDA Link" sublabel="E-Mail Template" color="green" />
            <N8nConnector />
            <N8nNode type="switch" icon={GitBranch} label="NDA Status prüfen" sublabel="IF/Webhook" />
            <N8nConnector hasError />

            <div className="flex flex-col gap-2 shrink-0">
              <div className="flex items-center gap-1">
                <N8nNode
                  icon={ClipboardCheck}
                  label="Typeform: Anforderungen"
                  sublabel="Formular"
                  color="blue"
                  size="sm"
                />
              </div>
              <div className="flex items-center gap-1 opacity-60">
                <N8nNode icon={Clock} label="Reminder nach 48h" sublabel="Wait + Email" color="orange" size="sm" />
              </div>
            </div>

            <N8nConnector />
            <N8nNode icon={Calendar} label="Cal.com: Termin buchen" sublabel="Scheduling" color="green" />
            <N8nConnector />
            <N8nNode icon={Bot} label="OpenAI: Unterlagen generieren" sublabel="GPT-4" color="blue" />
            <N8nConnector />
            <N8nNode icon={FolderOpen} label="Google Drive: Speichern" sublabel="Dokumente" color="purple" />
            <N8nConnector />
            <N8nNode icon={Send} label="Slack: Team benachrichtigen" sublabel="Notification" color="green" />
            <N8nConnector />
            <N8nNode type="end" icon={CheckCircle2} label="Bereit für Workshop" sublabel="Ende" />
          </div>
        </FinalWorkflowCard>

        {/* Final Workflow 2: Standortrisikoanalyse */}
        <FinalWorkflowCard
          title="Workflow 2: Automatisierte Standortrisikoanalyse"
          description="KI-gestützte Risikoanalyse mit automatischer Matrix-Erstellung"
          tools={["n8n Webhook", "PostgreSQL/Supabase", "OpenAI GPT-4", "Google Sheets", "PDF Generator", "Slack"]}
          className="mt-6"
        >
          <div className="flex items-center gap-1 overflow-x-auto pb-4">
            <N8nNode type="trigger" icon={Activity} label="Trigger: Analyse angefordert" sublabel="n8n Webhook" />
            <N8nConnector />
            <N8nNode icon={Database} label="Supabase: Standortdaten laden" sublabel="PostgreSQL" color="purple" />
            <N8nConnector />
            <N8nNode icon={Bot} label="GPT-4: Kriterienverzeichnis" sublabel="Template + KI" color="blue" />
            <N8nConnector />
            <N8nNode icon={Building} label="Auto: Bestandsaufnahme" sublabel="Daten-Mapping" color="blue" />
            <N8nConnector />
            <N8nNode icon={Cpu} label="GPT-4: Gefährdungsanalyse" sublabel="KI-Bewertung" color="green" />
            <N8nConnector />
            <N8nNode icon={FileSpreadsheet} label="Sheets: Risikomatrix berechnen" sublabel="Formeln" color="blue" />
            <N8nConnector />
            <N8nNode type="switch" icon={GitBranch} label="Risiko-Level prüfen" sublabel="IF Node" />
            <N8nConnector hasError />

            <div className="flex flex-col gap-2 shrink-0">
              <N8nNode icon={AlertTriangle} label="Hoch: Eskalation" sublabel="Slack Alert" color="red" size="sm" />
              <N8nNode icon={CheckCircle2} label="Normal: Weiter" sublabel="Standard" color="green" size="sm" />
            </div>

            <N8nConnector />
            <N8nNode icon={FileText} label="PDF: Report generieren" sublabel="Template" color="blue" />
            <N8nConnector />
            <N8nNode icon={Upload} label="Drive: Hochladen" sublabel="Ablage" color="purple" />
            <N8nConnector />
            <N8nNode type="end" icon={CheckCircle2} label="Analyse abgeschlossen" sublabel="Ende" />
          </div>
        </FinalWorkflowCard>

        {/* Final Workflow 3: Grobkonzept-Erstellung */}
        <FinalWorkflowCard
          title="Workflow 3: Grobkonzept & Präsentation"
          description="Automatisierte Dokumentenerstellung mit SAP-Integration"
          tools={["n8n Webhook", "SAP API", "Airtable", "OpenAI GPT-4", "Google Slides", "DocuSign", "Notion"]}
          className="mt-6"
        >
          <div className="flex items-center gap-1 overflow-x-auto pb-4">
            <N8nNode type="trigger" icon={Zap} label="Trigger: Anforderungen fertig" sublabel="Webhook/Airtable" />
            <N8nConnector />
            <N8nNode icon={Database} label="Airtable: Anforderungen laden" sublabel="Datenabruf" color="purple" />
            <N8nConnector />
            <N8nNode icon={Database} label="SAP: Stammdaten abrufen" sublabel="API Call" color="purple" />
            <N8nConnector />
            <N8nNode type="merge" icon={Merge} label="Daten zusammenführen" sublabel="Merge Node" />
            <N8nConnector />
            <N8nNode icon={Cpu} label="GPT-4: Techn. Details erstellen" sublabel="KI-Generierung" color="green" />
            <N8nConnector />
            <N8nNode icon={FileSpreadsheet} label="Sheets: Kostenplan berechnen" sublabel="Kalkulation" color="blue" />
            <N8nConnector />
            <N8nNode icon={Bot} label="GPT-4: Architekturrahmen" sublabel="Template + KI" color="green" />
            <N8nConnector />
            <N8nNode icon={Presentation} label="Slides: Präsentation erstellen" sublabel="Auto-Layout" color="blue" />
            <N8nConnector />
            <N8nNode type="switch" icon={GitBranch} label="Qualitätsprüfung" sublabel="Human in Loop" />
            <N8nConnector />
            <N8nNode icon={Send} label="Slack: Review anfordern" sublabel="Notification" color="orange" />
            <N8nConnector />
            <N8nNode icon={FileCheck} label="DocuSign: Freigabe" sublabel="E-Signatur" color="green" />
            <N8nConnector />
            <N8nNode icon={FolderOpen} label="Notion: Ablage" sublabel="Dokumentation" color="purple" />
            <N8nConnector />
            <N8nNode type="end" icon={CheckCircle2} label="Grobkonzept finalisiert" sublabel="Ende" />
          </div>
        </FinalWorkflowCard>
      </section>

      {/* ==================== ZUSAMMENFASSUNG ==================== */}
      <section className="pt-6 sm:pt-8 border-t">
        <Card className="p-4 sm:p-8 bg-gradient-to-br from-gray-50 to-white border">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Zusammenfassung der Automatisierung</h3>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <MetricCard
              label="Manuelle Schritte reduziert"
              value="~70%"
              description="Durch KI und Integrationen"
              color="green"
            />
            <MetricCard
              label="Zeitersparnis pro Projekt"
              value="~15h"
              description="Geschätzte Einsparung"
              color="blue"
            />
            <MetricCard
              label="Fehlerreduktion"
              value="~85%"
              description="Durch automatische Validierung"
              color="purple"
            />
            <MetricCard label="Tool-Integrationen" value="12+" description="n8n/Zapier Konnektoren" color="orange" />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Vollautomatisiert
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <Activity className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span>Kundenzugang & Zugangsdaten</span>
                </li>
                <li className="flex items-start gap-2">
                  <Activity className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span>Terminplanung & Erinnerungen</span>
                </li>
                <li className="flex items-start gap-2">
                  <Activity className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span>Dokumenten-Upload & Benachrichtigungen</span>
                </li>
                <li className="flex items-start gap-2">
                  <Activity className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span>Report-Generierung (PDF)</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-amber-600 mb-3 flex items-center gap-2">
                <Bot className="h-5 w-5" />
                KI-unterstützt
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <Cpu className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  <span>Anforderungsvalidierung (GPT-4)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Cpu className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  <span>Gefährdungsanalyse-Erstellung</span>
                </li>
                <li className="flex items-start gap-2">
                  <Cpu className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  <span>Technische Details generieren</span>
                </li>
                <li className="flex items-start gap-2">
                  <Cpu className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  <span>Architekturrahmen-Vorschläge</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-600 mb-3 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Human-in-the-Loop
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <Eye className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                  <span>Finale Qualitätsprüfung</span>
                </li>
                <li className="flex items-start gap-2">
                  <Eye className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                  <span>Workshop-Moderation</span>
                </li>
                <li className="flex items-start gap-2">
                  <Eye className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                  <span>Risiko-Eskalation bei kritischen Fällen</span>
                </li>
                <li className="flex items-start gap-2">
                  <Eye className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                  <span>Kundenfreigabe & Signatur</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}

// ==================== COMPONENTS ====================

function WorkflowSection({
  title,
  source,
  description,
  children,
  className = "",
}: {
  title: string
  source: string
  description: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Card className={`bg-white border overflow-hidden ${className}`}>
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-bold text-gray-900">{title}</h3>
          <Badge variant="outline" className="text-xs">
            {source}
          </Badge>
        </div>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div
        className="p-6 overflow-x-auto"
        style={{
          backgroundImage: `radial-gradient(circle, #e5e7eb 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
      >
        {children}
      </div>
    </Card>
  )
}

function FinalWorkflowCard({
  title,
  description,
  tools,
  children,
  className = "",
}: {
  title: string
  description: string
  tools: string[]
  children: React.ReactNode
  className?: string
}) {
  return (
    <Card className={`bg-white border overflow-hidden ${className}`}>
      <div className="p-4 border-b bg-gradient-to-r from-green-50 to-amber-50">
        <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-3">{description}</p>
        <div className="flex flex-wrap gap-1">
          {tools.map((tool, i) => (
            <Badge key={i} variant="secondary" className="text-xs bg-white">
              {tool}
            </Badge>
          ))}
        </div>
      </div>
      <div
        className="p-6 overflow-x-auto"
        style={{
          backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
      >
        {children}
      </div>
    </Card>
  )
}

function PainPointCard({
  title,
  source,
  problems,
  automation,
}: {
  title: string
  source: string
  problems: string[]
  automation: string[]
}) {
  return (
    <Card className="p-5 bg-white border">
      <div className="flex items-center gap-2 mb-3">
        <AlertCircle className="h-5 w-5 text-red-500" />
        <h4 className="font-semibold text-gray-900">{title}</h4>
      </div>
      <Badge variant="outline" className="text-xs mb-3">
        {source}
      </Badge>

      <div className="mb-4">
        <div className="text-xs font-semibold text-red-600 mb-2">Probleme:</div>
        <ul className="text-xs text-gray-600 space-y-1">
          {problems.map((p, i) => (
            <li key={i} className="flex items-start gap-1">
              <XCircle className="h-3 w-3 text-red-400 mt-0.5 shrink-0" />
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="text-xs font-semibold text-green-600 mb-2">Automatisierung:</div>
        <ul className="text-xs text-gray-600 space-y-1">
          {automation.map((a, i) => (
            <li key={i} className="flex items-start gap-1">
              <Zap className="h-3 w-3 text-green-400 mt-0.5 shrink-0" />
              {a}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

function MetricCard({
  label,
  value,
  description,
  color,
}: {
  label: string
  value: string
  description: string
  color: "green" | "blue" | "purple" | "orange"
}) {
  const colors = {
    green: "text-green-600",
    blue: "text-amber-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
  }
  return (
    <div className="text-center">
      <div className={`text-3xl font-bold ${colors[color]}`}>{value}</div>
      <div className="font-medium text-gray-900">{label}</div>
      <div className="text-xs text-gray-500">{description}</div>
    </div>
  )
}

// n8n Style Node
function N8nNode({
  icon: Icon,
  label,
  sublabel,
  type = "action",
  color = "gray",
  size = "md",
  automated = false,
  manual = false,
}: {
  icon: React.ElementType
  label: string
  sublabel?: string
  type?: "trigger" | "action" | "switch" | "merge" | "end"
  color?: "blue" | "green" | "orange" | "red" | "purple" | "gray"
  size?: "sm" | "md"
  automated?: boolean
  manual?: boolean
}) {
  const iconColors = {
    blue: "text-amber-500",
    green: "text-green-500",
    orange: "text-orange-500",
    red: "text-red-500",
    purple: "text-purple-500",
    gray: "text-gray-400",
  }

  const getBgColor = () => {
    if (manual) return "bg-red-50 border-red-300"
    if (automated) return "bg-green-50 border-green-300"
    if (type === "trigger") return "bg-green-50 border-green-200"
    if (type === "end") return "bg-gray-100 border-gray-300"
    if (type === "switch") return "bg-amber-50 border-amber-200"
    if (type === "merge") return "bg-amber-50 border-amber-200"
    return "bg-white border-gray-200"
  }

  const sizeClasses = size === "sm" ? "w-16 h-16" : "w-14 h-14"
  const iconSize = size === "sm" ? "h-5 w-5" : "h-6 w-6"
  const textSize = size === "sm" ? "text-[10px]" : "text-xs"

  return (
    <div className="flex flex-col items-center gap-1.5 relative shrink-0">
      {/* Connection dots */}
      <div className="absolute left-0 top-1/2 -translate-x-0.5 -translate-y-3 w-1.5 h-1.5 rounded-full bg-gray-300 border border-gray-400" />
      <div className="absolute right-0 top-1/2 translate-x-0.5 -translate-y-3 w-1.5 h-1.5 rounded-full bg-gray-300 border border-gray-400" />

      <div
        className={`${sizeClasses} rounded-lg border-2 ${getBgColor()} shadow-sm flex items-center justify-center relative`}
      >
        {automated && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
            <Activity className="h-2 w-2 text-white" />
          </div>
        )}
        {manual && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
            <AlertCircle className="h-2 w-2 text-white" />
          </div>
        )}
        <Icon
          className={`${iconSize} ${
            manual
              ? "text-red-600"
              : type === "trigger"
                ? "text-green-600"
                : type === "end"
                  ? "text-gray-600"
                  : type === "switch"
                    ? "text-amber-600"
                    : iconColors[color]
          }`}
        />
      </div>
      <div className="text-center max-w-20">
        <div className={`font-medium text-gray-800 ${textSize} leading-tight`}>{label}</div>
        {sublabel && <div className="text-[9px] text-gray-500 leading-tight">{sublabel}</div>}
      </div>
    </div>
  )
}

// Connector
function N8nConnector({ hasError = false }: { hasError?: boolean }) {
  return (
    <div className="flex items-center shrink-0 -mx-0.5 mb-8">
      <div className={`w-6 h-0.5 ${hasError ? "bg-gray-300" : "bg-gray-300"}`} />
      <div className="w-0 h-0 border-t-[3px] border-b-[3px] border-l-[5px] border-transparent border-l-gray-300" />
    </div>
  )
}
