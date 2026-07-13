import { getDictionary } from "@/lib/dictionary";
import { Activity, AlertTriangle, ArrowRight, CheckCircle, Cpu, Eye, FileText, Globe, Lock, Mail, Network, Search, Shield, Target } from "lucide-react";
import Link from "next/link";
import { LightRays } from "@/components/light-rays";

export default async function AiImpactsSecopsPage({ 
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
              <Shield className="w-4 h-4" />
              {dict?.ai_impacts_secops?.badge || "AI IMPACTS SECOPS"}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-shadow-md text-white mb-6">
              {dict?.ai_impacts_secops?.title || "KI-gestützte Email-Sicherheit"}
            </h1>
            
            <p className="text-lg sm:text-xl text-amber-50/90 leading-relaxed max-w-3xl mx-auto font-medium text-shadow-sm mb-12">
              {dict?.ai_impacts_secops?.subtitle || "Schützen Sie Ihr Unternehmen vor Cyber-Bedrohungen mit intelligenter Email-Analyse, Phishing-Erkennung und automatisierten Sicherheitsmaßnahmen."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/demo`}>
                <button className="bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 transition-all duration-300 border border-white/20">
                  {dict?.use_cases_common?.demo_cta || "Demo anfordern"} <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Threat Landscape Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Aktuelle Bedrohungslage
              </h2>
              <p className="text-lg text-amber-50/90 max-w-3xl mx-auto">
                Cyber-Angriffe werden immer raffinierter - traditionelle Sicherheitsmaßnahmen reichen nicht mehr aus
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <AlertTriangle className="w-12 h-12 text-red-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Phishing-Angriffe</h3>
                <p className="text-amber-50/80 mb-4">
                  95% aller Cyber-Angriffe beginnen mit einer bösartigen Email.
                </p>
                <div className="text-2xl font-bold text-red-400">+300%</div>
                <p className="text-amber-50/70 text-sm">Anstieg in den letzten 2 Jahren</p>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Mail className="w-12 h-12 text-yellow-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Business Email Compromise</h3>
                <p className="text-amber-50/80 mb-4">
                  Durchschnittlicher Schaden pro Vorfall steigt kontinuierlich.
                </p>
                <div className="text-2xl font-bold text-yellow-400">€4.2M</div>
                <p className="text-amber-50/70 text-sm">Durchschnittlicher Schaden</p>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Eye className="w-12 h-12 text-orange-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Zero-Day Exploits</h3>
                <p className="text-amber-50/80 mb-4">
                  Neue, unbekannte Bedrohungen umgehen traditionelle Filter.
                </p>
                <div className="text-2xl font-bold text-orange-400">24h</div>
                <p className="text-amber-50/70 text-sm">Durchschnittliche Erkennungszeit</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                KI-gestützte Email Security
              </h2>
              <p className="text-lg text-amber-50/90 max-w-3xl mx-auto">
                Proaktiver Schutz durch maschinelles Lernen und Verhaltensanalyse
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center flex-shrink-0">
                    <Network className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Intelligente Bedrohungserkennung</h3>
                    <p className="text-amber-50/80">
                      KI analysiert Email-Inhalte, Absenderverhalten und Kommunikationsmuster in Echtzeit.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center flex-shrink-0">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Automatische Reaktion</h3>
                    <p className="text-amber-50/80">
                      Verdächtige Emails werden automatisch isoliert, Benutzer gewarnt und IT-Teams benachrichtigt.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Adaptive Sicherheit</h3>
                    <p className="text-amber-50/80">
                      Das System lernt kontinuierlich und passt sich neuen Bedrohungsmustern automatisch an.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <h3 className="text-2xl font-bold text-white mb-6">Schutz-Pipeline</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                    <span className="text-amber-50/90">Email-Eingang überwachen</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                    <span className="text-amber-50/90">KI-Analyse in Echtzeit</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                    <span className="text-amber-50/90">Risikobewertung durchführen</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">4</div>
                    <span className="text-amber-50/90">Automatische Maßnahmen</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">✓</div>
                    <span className="text-amber-50/90">Bedrohung neutralisiert</span>
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
                Erweiterte Sicherheitsfeatures
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Search className="w-10 h-10 text-amber-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">URL-Scanning</h3>
                <p className="text-amber-50/80 text-sm">
                  Automatische Überprüfung aller Links auf Malware und Phishing-Seiten.
                </p>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <FileText className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Attachment-Analyse</h3>
                <p className="text-amber-50/80 text-sm">
                  Tiefgehende Analyse von Dateianhängen in sicherer Sandbox-Umgebung.
                </p>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Cpu className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Behavioral Analysis</h3>
                <p className="text-amber-50/80 text-sm">
                  Erkennung anomaler Kommunikationsmuster und verdächtiger Aktivitäten.
                </p>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Globe className="w-10 h-10 text-yellow-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Threat Intelligence</h3>
                <p className="text-amber-50/80 text-sm">
                  Integration globaler Bedrohungsdatenbanken für aktuelle Schutzmaßnahmen.
                </p>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Eye className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Forensic Analysis</h3>
                <p className="text-amber-50/80 text-sm">
                  Detaillierte Analyse von Sicherheitsvorfällen für bessere Prävention.
                </p>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <CheckCircle className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Compliance Reporting</h3>
                <p className="text-amber-50/80 text-sm">
                  Automatische Berichte für Compliance-Anforderungen und Audits.
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
                Messbare Sicherheitsverbesserungen
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
                <p className="text-amber-50/90">Phishing-Erkennungsrate</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-amber-400 mb-2">&lt; 1s</div>
                <p className="text-amber-50/90">Durchschnittliche Reaktionszeit</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-purple-400 mb-2">95%</div>
                <p className="text-amber-50/90">Reduzierung false Positives</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-cyan-400 mb-2">80%</div>
                <p className="text-amber-50/90">Weniger Sicherheitsvorfälle</p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Branchenspezifische Anwendungen
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Shield className="w-12 h-12 text-amber-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Finanzdienstleistungen</h3>
                <p className="text-amber-50/80 mb-4">
                  Höchste Sicherheitsstandards für Banken und Versicherungen mit speziellen Compliance-Features.
                </p>
                <ul className="space-y-2 text-amber-50/70">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    PCI-DSS Compliance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Fraud Detection
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Regulatory Reporting
                  </li>
                </ul>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Target className="w-12 h-12 text-green-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Kritische Infrastruktur</h3>
                <p className="text-amber-50/80 mb-4">
                  Spezieller Schutz für Energieversorger, Telekommunikation und andere kritische Bereiche.
                </p>
                <ul className="space-y-2 text-amber-50/70">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    APT-Erkennung
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Nation-State Threats
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Incident Response
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
                Schützen Sie Ihr Unternehmen noch heute
              </h2>
              <p className="text-lg text-amber-50/90 mb-8 max-w-2xl mx-auto">
                Implementieren Sie KI-gestützte Email-Sicherheit und reduzieren Sie Ihr Cyber-Risiko um bis zu 95%.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/demo`}>
                  <button className="bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 transition-all duration-300 border border-white/20">
                    Sicherheitsanalyse <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                
                <Link href={`/${locale}/contact`}>
                  <button className="glass-panel-ultimate border-white/40 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-300">
                    Security Beratung <Shield className="w-5 h-5" />
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