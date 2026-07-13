import { getDictionary } from "@/lib/dictionary";
import { Activity, ArrowRight, BarChart3, Calendar, CheckCircle, Clock, Database, DollarSign, FileText, MessageSquare, Phone, Target, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { LightRays } from "@/components/light-rays";

export default async function AiImpactsSalesPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Light Rays for Subpages */}
      <LightRays variant="subpage" className="absolute inset-0 z-[1]" />

      <main className="relative z-10 pt-24 pb-16">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-ultimate border-white/40 text-white text-xs font-bold tracking-widest uppercase shadow-lg backdrop-blur-md mb-8">
              <Phone className="w-4 h-4" />
              {dict?.ai_impacts_sales?.badge || "AI IMPACTS SALES"}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-shadow-md text-white mb-6">
              {dict?.ai_impacts_sales?.title || "Call-Daten intelligent extrahieren"}
            </h1>
            
            <p className="text-lg sm:text-xl text-amber-50/90 leading-relaxed max-w-3xl mx-auto font-medium text-shadow-sm mb-12">
              {dict?.ai_impacts_sales?.subtitle || "Automatisieren Sie die Extraktion und Analyse von Verkaufsgesprächen mit KI-gestützter Spracherkennung und intelligenter Datenverarbeitung."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/demo`}>
                <button className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-amber-500/30 hover:scale-105 transition-all duration-300 border border-white/20">
                  {dict?.use_cases_common?.demo_cta || "Demo anfordern"} <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                {dict?.ai_impacts_common?.challenges_title || "Current Challenges"}
              </h2>
              <p className="text-lg text-amber-50/90 max-w-3xl mx-auto">
                Verkaufsteams verlieren wertvolle Zeit mit manueller Nachbearbeitung von Gesprächen
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Clock className="w-12 h-12 text-red-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Zeitverlust</h3>
                <p className="text-amber-50/80">
                  Stunden werden für manuelle Transkription und Zusammenfassung von Verkaufsgesprächen verschwendet.
                </p>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <FileText className="w-12 h-12 text-yellow-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Inkonsistente Dokumentation</h3>
                <p className="text-amber-50/80">
                  Wichtige Gesprächsinhalte gehen verloren oder werden unvollständig erfasst.
                </p>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <TrendingUp className="w-12 h-12 text-orange-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Verpasste Chancen</h3>
                <p className="text-amber-50/80">
                  Verkaufschancen werden übersehen, da wichtige Kundeninformationen nicht systematisch erfasst werden.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                KI-gestützte Call-Daten Extraktion
              </h2>
              <p className="text-lg text-amber-50/90 max-w-3xl mx-auto">
                Automatisieren Sie die komplette Nachbearbeitung Ihrer Verkaufsgespräche
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Automatische Transkription</h3>
                    <p className="text-amber-50/80">
                      Wandeln Sie Sprachaufnahmen automatisch in strukturierten Text um - in Echtzeit oder nachgelagert.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 flex items-center justify-center flex-shrink-0">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Intelligente Datenextraktion</h3>
                    <p className="text-amber-50/80">
                      Extrahieren Sie automatisch Kundendaten, Bedürfnisse, Einwände und nächste Schritte aus Gesprächen.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">CRM-Integration</h3>
                    <p className="text-amber-50/80">
                      Übertragen Sie extrahierte Daten automatisch in Ihr CRM-System und aktualisieren Sie Kundendatensätze.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <h3 className="text-2xl font-bold text-white mb-6">Workflow-Beispiel</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                    <span className="text-amber-50/90">Verkaufsgespräch aufzeichnen</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                    <span className="text-amber-50/90">KI transkribiert automatisch</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                    <span className="text-amber-50/90">Daten werden extrahiert</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">4</div>
                    <span className="text-amber-50/90">CRM wird aktualisiert</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">✓</div>
                    <span className="text-amber-50/90">Follow-up Aufgaben erstellt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Messbare Vorteile
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-green-400 mb-2">75%</div>
                <p className="text-amber-50/90">Zeitersparnis bei der Nachbearbeitung</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-amber-400 mb-2">95%</div>
                <p className="text-amber-50/90">Genauigkeit bei der Datenerfassung</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-purple-400 mb-2">40%</div>
                <p className="text-amber-50/90">Steigerung der Conversion Rate</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-cyan-400 mb-2">100%</div>
                <p className="text-amber-50/90">Vollständige Gesprächsdokumentation</p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Anwendungsfälle
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Users className="w-12 h-12 text-amber-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">B2B Vertrieb</h3>
                <p className="text-amber-50/80 mb-4">
                  Erfassen Sie komplexe Kundenanforderungen, technische Spezifikationen und Entscheidungsprozesse automatisch.
                </p>
                <ul className="space-y-2 text-amber-50/70">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Stakeholder-Mapping
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Anforderungsanalyse
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Competitive Intelligence
                  </li>
                </ul>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Target className="w-12 h-12 text-green-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Kundenbetreuung</h3>
                <p className="text-amber-50/80 mb-4">
                  Dokumentieren Sie Kundenfeedback, Beschwerden und Verbesserungsvorschläge systematisch.
                </p>
                <ul className="space-y-2 text-amber-50/70">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Sentiment-Analyse
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Ticket-Erstellung
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Eskalationsmanagement
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-panel-ultimate p-12 rounded-3xl border border-white/20 backdrop-blur-md">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">{dict?.ai_impacts_common?.cta_title || "Get Started"}</h2>
              <p className="text-lg text-amber-50/90 mb-8 max-w-2xl mx-auto">
                Starten Sie noch heute und automatisieren Sie Ihre Verkaufsprozesse mit KI-gestützter Gesprächsanalyse.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/demo`}>
                  <button className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-amber-500/30 hover:scale-105 transition-all duration-300 border border-white/20">
                    Kostenlose Demo <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                
                <Link href={`/${locale}/contact`}>
                  <button className="glass-panel-ultimate border-white/40 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-300">
                    Beratung anfragen <Calendar className="w-5 h-5" />
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