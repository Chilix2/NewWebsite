import { getDictionary } from "@/lib/dictionary";
import { Activity, ArrowRight, Calendar, CheckCircle, Cpu, Database, Shield, Signal, Smartphone, TrendingUp, Users, Wifi } from "lucide-react";
import Link from "next/link";

export default async function BrancheTelecomPage({ 
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
              <Signal className="w-4 h-4" />
              {dict?.use_cases_telecom?.badge || "TELEKOMMUNIKATION"}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-shadow-md text-white mb-6">
              {dict?.use_cases_telecom?.title || "Telecom Workflow-Automatisierung"}
            </h1>
            
            <p className="text-lg sm:text-xl text-amber-50/90 leading-relaxed max-w-3xl mx-auto font-medium text-shadow-sm mb-12">
              {dict?.use_cases_telecom?.subtitle || "Optimieren Sie Ihre Telekommunikationsprozesse mit KI-gestützter Automatisierung - von der Kundenbetreuung bis zum Netzwerkmanagement."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/demo`}>
                <button className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300 border border-white/20">
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
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Users className="w-12 h-12 text-red-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Kundenservice-Volumen</h3>
                <p className="text-amber-50/80 mb-4">
                  Millionen von Kundenanfragen täglich überlasten Support-Teams.
                </p>
                <div className="text-2xl font-bold text-red-400">85%</div>
                <p className="text-amber-50/70 text-sm">Repetitive Standardanfragen</p>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Wifi className="w-12 h-12 text-yellow-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Netzwerk-Komplexität</h3>
                <p className="text-amber-50/80 mb-4">
                  Komplexe Infrastrukturen erfordern kontinuierliche Überwachung.
                </p>
                <div className="text-2xl font-bold text-yellow-400">24/7</div>
                <p className="text-amber-50/70 text-sm">Monitoring erforderlich</p>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <TrendingUp className="w-12 h-12 text-orange-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Schnelle Innovation</h3>
                <p className="text-amber-50/80 mb-4">
                  Neue Technologien wie 5G erfordern agile Prozesse.
                </p>
                <div className="text-2xl font-bold text-orange-400">6 Monate</div>
                <p className="text-amber-50/70 text-sm">Durchschnittliche Time-to-Market</p>
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
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Intelligenter Kundenservice</h3>
                    <p className="text-amber-50/80">
                      KI-Chatbots lösen 80% der Kundenanfragen automatisch und leiten komplexe Fälle nahtlos weiter.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Automatisches Netzwerk-Monitoring</h3>
                    <p className="text-amber-50/80">
                      Kontinuierliche Überwachung der Netzwerkperformance mit predictive Maintenance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Service-Provisionierung</h3>
                    <p className="text-amber-50/80">
                      Automatische Aktivierung und Konfiguration neuer Services und Tarife.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <h3 className="text-2xl font-bold text-white mb-6">Service-Aktivierung</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                    <span className="text-amber-50/90">Kundenbestellung erfassen</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                    <span className="text-amber-50/90">Verfügbarkeit automatisch prüfen</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                    <span className="text-amber-50/90">Service automatisch konfigurieren</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-sm">4</div>
                    <span className="text-amber-50/90">Kunde automatisch aktivieren</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">✓</div>
                    <span className="text-amber-50/90">Service ist aktiv</span>
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
                Messbare Verbesserungen
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-green-400 mb-2">80%</div>
                <p className="text-amber-50/90">Automatisierung im Kundenservice</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-amber-400 mb-2">50%</div>
                <p className="text-amber-50/90">Reduzierung der Service-Aktivierungszeit</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
                <p className="text-amber-50/90">Netzwerk-Verfügbarkeit</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-cyan-400 mb-2">60%</div>
                <p className="text-amber-50/90">Kosteneinsparung im Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-panel-ultimate p-12 rounded-3xl border border-white/20 backdrop-blur-md">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">{dict?.use_cases_telecom?.cta_page_title || "use_cases_telecom CTA"}</h2>
              <p className="text-lg text-amber-50/90 mb-8 max-w-2xl mx-auto">
                Nutzen Sie KI-gestützte Automatisierung für effizientere Abläufe und besseren Kundenservice.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/demo`}>
                  <button className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300 border border-white/20">{dict?.use_cases_common?.demo_cta || "Demo"} <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                
                <Link href={`/${locale}/contact`}>
                  <button className="glass-panel-ultimate border-white/40 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-300">
                    Telekom Beratung <Signal className="w-5 h-5" />
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