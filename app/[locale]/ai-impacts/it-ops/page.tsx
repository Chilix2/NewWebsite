import { getDictionary } from "@/lib/dictionary";
import { Activity, ArrowRight, Calendar, CheckCircle, Clock, Cpu, Database, FileText, Key, Laptop, Settings, Shield, Users, Workflow } from "lucide-react";
import Link from "next/link";
import { LightRays } from "@/components/light-rays";

export default async function AiImpactsItOpsPage({ 
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
              <Users className="w-4 h-4" />
              {dict?.ai_impacts_it_ops?.badge || "AI IMPACTS IT-OPS"}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-shadow-md text-white mb-6">
              {dict?.ai_impacts_it_ops?.title || "Mitarbeiter automatisch onboarden"}
            </h1>
            
            <p className="text-lg sm:text-xl text-amber-50/90 leading-relaxed max-w-3xl mx-auto font-medium text-shadow-sm mb-12">
              {dict?.ai_impacts_it_ops?.subtitle || "Revolutionieren Sie Ihr Employee Onboarding mit KI-gestützter Automatisierung - von der Kontenerstellung bis zur vollständigen Arbeitsplatzeinrichtung."}
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

        {/* Problem Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Herausforderungen beim Onboarding
              </h2>
              <p className="text-lg text-amber-50/90 max-w-3xl mx-auto">
                Manueller Onboarding-Prozess kostet Zeit, Geld und frustriert neue Mitarbeiter
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Clock className="w-12 h-12 text-red-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Zeitaufwändige Prozesse</h3>
                <p className="text-amber-50/80 mb-4">
                  IT-Teams verbringen Tage mit der manuellen Einrichtung neuer Arbeitsplätze.
                </p>
                <div className="text-2xl font-bold text-red-400">8-12h</div>
                <p className="text-amber-50/70 text-sm">Pro neuem Mitarbeiter</p>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <FileText className="w-12 h-12 text-yellow-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Fehleranfällige Abläufe</h3>
                <p className="text-amber-50/80 mb-4">
                  Manuelle Prozesse führen zu Fehlern und Sicherheitslücken.
                </p>
                <div className="text-2xl font-bold text-yellow-400">35%</div>
                <p className="text-amber-50/70 text-sm">Fehlerrate bei manueller Einrichtung</p>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Users className="w-12 h-12 text-orange-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Schlechte Erfahrung</h3>
                <p className="text-amber-50/80 mb-4">
                  Neue Mitarbeiter warten tagelang auf ihre IT-Ausstattung.
                </p>
                <div className="text-2xl font-bold text-orange-400">3-5</div>
                <p className="text-amber-50/70 text-sm">Tage bis zur Produktivität</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Automatisiertes Employee Onboarding
              </h2>
              <p className="text-lg text-amber-50/90 max-w-3xl mx-auto">
                Von der HR-Benachrichtigung bis zum produktiven ersten Arbeitstag - alles automatisiert
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <Key className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Automatische Account-Erstellung</h3>
                    <p className="text-amber-50/80">
                      Benutzerkonten werden automatisch in allen relevanten Systemen erstellt - AD, Office 365, CRM, etc.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <Laptop className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Hardware-Provisionierung</h3>
                    <p className="text-amber-50/80">
                      Automatische Bestellung und Konfiguration von Hardware basierend auf Rolle und Abteilung.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Sicherheits-Compliance</h3>
                    <p className="text-amber-50/80">
                      Automatische Zuweisung von Berechtigungen und Sicherheitsrichtlinien nach dem Prinzip der minimalen Berechtigung.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <h3 className="text-2xl font-bold text-white mb-6">Onboarding-Workflow</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                    <span className="text-amber-50/90">HR-System sendet Trigger</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                    <span className="text-amber-50/90">Accounts werden erstellt</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                    <span className="text-amber-50/90">Hardware wird bestellt</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">4</div>
                    <span className="text-amber-50/90">Software wird installiert</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">✓</div>
                    <span className="text-amber-50/90">Mitarbeiter ist produktiv</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Umfassende Automatisierung
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Database className="w-10 h-10 text-amber-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">System-Integration</h3>
                <p className="text-amber-50/80 text-sm">
                  Nahtlose Integration mit HR-Systemen, Active Directory, und Cloud-Plattformen.
                </p>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Workflow className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Rollenbasierte Workflows</h3>
                <p className="text-amber-50/80 text-sm">
                  Verschiedene Onboarding-Prozesse je nach Rolle, Abteilung und Sicherheitslevel.
                </p>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Cpu className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Chatbot-Unterstützung</h3>
                <p className="text-amber-50/80 text-sm">
                  KI-Chatbot beantwortet Fragen neuer Mitarbeiter und führt durch den Prozess.
                </p>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Calendar className="w-10 h-10 text-yellow-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Terminplanung</h3>
                <p className="text-amber-50/80 text-sm">
                  Automatische Buchung von Einführungsterminen und Schulungen.
                </p>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <FileText className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Dokumentation</h3>
                <p className="text-amber-50/80 text-sm">
                  Automatische Erstellung und Versendung aller notwendigen Dokumente.
                </p>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <CheckCircle className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Compliance-Tracking</h3>
                <p className="text-amber-50/80 text-sm">
                  Vollständige Nachverfolgung aller Onboarding-Schritte für Audit-Zwecke.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Messbare Verbesserungen
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-green-400 mb-2">90%</div>
                <p className="text-amber-50/90">Zeitersparnis für IT-Teams</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-amber-400 mb-2">1 Tag</div>
                <p className="text-amber-50/90">Bis zur vollen Produktivität</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-purple-400 mb-2">95%</div>
                <p className="text-amber-50/90">Reduzierung von Fehlern</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-cyan-400 mb-2">€2.5K</div>
                <p className="text-amber-50/90">Kosteneinsparung pro Mitarbeiter</p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Anwendungsszenarien
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Users className="w-12 h-12 text-amber-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Großunternehmen</h3>
                <p className="text-amber-50/80 mb-4">
                  Skalierbare Lösung für Unternehmen mit hunderten neuen Mitarbeitern pro Jahr.
                </p>
                <ul className="space-y-2 text-amber-50/70">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Bulk-Onboarding
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Multi-Location Support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Nahtlose Integration
                  </li>
                </ul>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Activity className="w-12 h-12 text-green-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Schnell wachsende Startups</h3>
                <p className="text-amber-50/80 mb-4">
                  Effiziente Skalierung der IT-Infrastruktur bei rapidem Wachstum.
                </p>
                <ul className="space-y-2 text-amber-50/70">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Cloud-First Approach
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Kostenoptimierung
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Flexible Workflows
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
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Automatisieren Sie Ihr Employee Onboarding
              </h2>
              <p className="text-lg text-amber-50/90 mb-8 max-w-2xl mx-auto">
                Reduzieren Sie Onboarding-Zeit um 90% und verbessern Sie die Mitarbeitererfahrung vom ersten Tag an.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/demo`}>
                  <button className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300 border border-white/20">
                    Kostenlose Demo <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                
                <Link href={`/${locale}/contact`}>
                  <button className="glass-panel-ultimate border-white/40 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-300">
                    IT-Beratung anfragen <Settings className="w-5 h-5" />
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