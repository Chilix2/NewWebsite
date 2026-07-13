import { getDictionary } from "@/lib/dictionary";
import { Activity, ArrowRight, Calendar, CheckCircle, Clock, Cpu, Database, Eye, FileText, Scale, Search, Shield } from "lucide-react";
import Link from "next/link";

export default async function BrancheLegalPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="relative min-h-screen overflow-x-hidden">

      <main className="relative z-10 pt-24 pb-16">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-ultimate border-white/40 text-white text-xs font-bold tracking-widest uppercase shadow-lg backdrop-blur-md mb-8">
              <Scale className="w-4 h-4" />
              {dict?.use_cases_legal?.badge || "RECHTSWESEN & KANZLEIEN"}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-shadow-md text-white mb-6">
              {dict?.use_cases_legal?.title || "Legal-Tech Automatisierung"}
            </h1>
            
            <p className="text-lg sm:text-xl text-amber-50/90 leading-relaxed max-w-3xl mx-auto font-medium text-shadow-sm mb-12">
              {dict?.use_cases_legal?.subtitle || "Revolutionieren Sie Ihre Kanzlei mit KI-gestützter Automatisierung - von der Dokumentenanalyse bis zur Mandantenverwaltung."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/demo`}>
                <button className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300 border border-white/20">
                  {dict?.use_cases_common?.demo_cta || "Demo anfordern"} <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                {dict?.use_cases_common?.challenges_title || "Challenges"}
              </h2>
              <p className="text-lg text-amber-50/90 max-w-3xl mx-auto">
                Kanzleien stehen unter Druck durch steigende Komplexität und Effizienzanforderungen
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <FileText className="w-12 h-12 text-red-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Dokumentenflut</h3>
                <p className="text-amber-50/80 mb-4">
                  Anwälte verbringen 60% ihrer Zeit mit Dokumentenrecherche und -analyse.
                </p>
                <div className="text-2xl font-bold text-red-400">60%</div>
                <p className="text-amber-50/70 text-sm">Zeit für Dokumentenarbeit</p>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Clock className="w-12 h-12 text-yellow-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Zeitdruck</h3>
                <p className="text-amber-50/80 mb-4">
                  Enge Fristen und hohe Arbeitsbelastung führen zu Stress und Fehlern.
                </p>
                <div className="text-2xl font-bold text-yellow-400">12h</div>
                <p className="text-amber-50/70 text-sm">Durchschnittliche Arbeitszeit pro Tag</p>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Search className="w-12 h-12 text-orange-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Recherche-Aufwand</h3>
                <p className="text-amber-50/80 mb-4">
                  Komplexe Rechtsprechungsrecherche in unstrukturierten Datenmengen.
                </p>
                <div className="text-2xl font-bold text-orange-400">4h</div>
                <p className="text-amber-50/70 text-sm">Pro Recherche-Auftrag</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                {dict?.use_cases_common?.solutions_title || "Sailly Solutions"}
              </h2>
              <p className="text-lg text-amber-50/90 max-w-3xl mx-auto">
                KI-gestützte Automatisierung für moderne Kanzleien
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Intelligente Dokumentenanalyse</h3>
                    <p className="text-amber-50/80">
                      KI extrahiert automatisch relevante Informationen aus Verträgen, Urteilen und anderen Rechtsdokumenten.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Automatisierte Rechtsprechungsrecherche</h3>
                    <p className="text-amber-50/80">
                      Intelligente Suche in Rechtsdatenbanken mit automatischer Relevanz-Bewertung und Zusammenfassung.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Automatische Dokumentenerstellung</h3>
                    <p className="text-amber-50/80">
                      Generierung von Standarddokumenten, Verträgen und Schriftsätzen basierend auf Vorlagen und KI.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <h3 className="text-2xl font-bold text-white mb-6">Vertragsprüfungs-Workflow</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                    <span className="text-amber-50/90">Dokument automatisch einlesen</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                    <span className="text-amber-50/90">KI analysiert Klauseln</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                    <span className="text-amber-50/90">Risiken automatisch identifizieren</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">4</div>
                    <span className="text-amber-50/90">Verbesserungsvorschläge generieren</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">✓</div>
                    <span className="text-amber-50/90">Prüfbericht erstellen</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                {dict?.use_cases_common?.use_cases_title || "Use Cases"}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Shield className="w-10 h-10 text-amber-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Compliance-Überwachung</h3>
                <p className="text-amber-50/80 text-sm mb-4">
                  Automatische Überprüfung von Verträgen auf Compliance-Konformität.
                </p>
                <div className="text-sm text-green-400 font-semibold">99% Erkennungsrate</div>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Database className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Mandantenverwaltung</h3>
                <p className="text-amber-50/80 text-sm mb-4">
                  Automatisierte Erfassung und Verwaltung von Mandantendaten und -kommunikation.
                </p>
                <div className="text-sm text-green-400 font-semibold">50% Zeitersparnis</div>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Eye className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Due Diligence</h3>
                <p className="text-amber-50/80 text-sm mb-4">
                  KI-gestützte Analyse großer Dokumentenmengen bei M&A-Transaktionen.
                </p>
                <div className="text-sm text-green-400 font-semibold">80% schneller</div>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Calendar className="w-10 h-10 text-yellow-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Fristenverwaltung</h3>
                <p className="text-amber-50/80 text-sm mb-4">
                  Automatische Extraktion und Überwachung aller relevanten Fristen.
                </p>
                <div className="text-sm text-green-400 font-semibold">0 verpasste Fristen</div>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Activity className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Schriftsatz-Automatisierung</h3>
                <p className="text-amber-50/80 text-sm mb-4">
                  Automatische Generierung von Standardschriftsätzen und Anträgen.
                </p>
                <div className="text-sm text-green-400 font-semibold">70% weniger Aufwand</div>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Scale className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Rechtsprechungs-Monitoring</h3>
                <p className="text-amber-50/80 text-sm mb-4">
                  Kontinuierliche Überwachung neuer Urteile und Gesetzesänderungen.
                </p>
                <div className="text-sm text-green-400 font-semibold">24/7 Überwachung</div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Messbare Effizienzsteigerungen
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-green-400 mb-2">75%</div>
                <p className="text-amber-50/90">Reduzierung der Recherche-Zeit</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-amber-400 mb-2">90%</div>
                <p className="text-amber-50/90">Automatisierung von Routineaufgaben</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-purple-400 mb-2">40%</div>
                <p className="text-amber-50/90">Steigerung der Produktivität</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-cyan-400 mb-2">95%</div>
                <p className="text-amber-50/90">Reduzierung von Fehlern</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-panel-ultimate p-12 rounded-3xl border border-white/20 backdrop-blur-md">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">{dict?.use_cases_legal?.cta_page_title || "use_cases_legal CTA"}</h2>
              <p className="text-lg text-amber-50/90 mb-8 max-w-2xl mx-auto">
                Nutzen Sie die Kraft der KI für effizientere Rechtsarbeit und zufriedenere Mandanten.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/demo`}>
                  <button className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300 border border-white/20">
                    Legal-Tech Demo <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                
                <Link href={`/${locale}/contact`}>
                  <button className="glass-panel-ultimate border-white/40 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-300">
                    Kanzlei-Beratung <Scale className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}