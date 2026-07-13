import { getDictionary } from "@/lib/dictionary";
import { Activity, ArrowRight, BarChart3, Calendar, CheckCircle, Cpu, Eye, FileText, Globe, Network, PieChart, Search, Target, TrendingUp } from "lucide-react";
import Link from "next/link";
import { LightRays } from "@/components/light-rays";

export default async function AiImpactsMarketingPage({ 
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
              <TrendingUp className="w-4 h-4" />
              {dict?.ai_impacts_marketing?.badge || "AI IMPACTS MARKETING"}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-shadow-md text-white mb-6">
              {dict?.ai_impacts_marketing?.title || "Automatisierte Branchen-Analyse"}
            </h1>
            
            <p className="text-lg sm:text-xl text-amber-50/90 leading-relaxed max-w-3xl mx-auto font-medium text-shadow-sm mb-12">
              {dict?.ai_impacts_marketing?.subtitle || "Revolutionieren Sie Ihre Marktforschung mit KI-gestützter Analyse von Branchentrends, Wettbewerbern und Marktchancen in Echtzeit."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/demo`}>
                <button className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105 transition-all duration-300 border border-white/20">
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
                Traditionelle Marktforschung ist zeitaufwändig, teuer und oft bereits veraltet
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Search className="w-12 h-12 text-red-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Manuelle Recherche</h3>
                <p className="text-amber-50/80 mb-4">
                  Wochen werden für die Sammlung und Analyse von Marktdaten verschwendet.
                </p>
                <div className="text-2xl font-bold text-red-400">4-6</div>
                <p className="text-amber-50/70 text-sm">Wochen pro Analyse</p>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <FileText className="w-12 h-12 text-yellow-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Veraltete Daten</h3>
                <p className="text-amber-50/80 mb-4">
                  Bis Berichte fertig sind, haben sich Marktbedingungen bereits geändert.
                </p>
                <div className="text-2xl font-bold text-yellow-400">30%</div>
                <p className="text-amber-50/70 text-sm">Der Daten sind bei Veröffentlichung veraltet</p>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Eye className="w-12 h-12 text-orange-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Begrenzte Sichtweite</h3>
                <p className="text-amber-50/80 mb-4">
                  Wichtige Markttrends und Chancen werden übersehen oder zu spät erkannt.
                </p>
                <div className="text-2xl font-bold text-orange-400">60%</div>
                <p className="text-amber-50/70 text-sm">Der Marktchancen werden verpasst</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                KI-gestützte Marktanalyse
              </h2>
              <p className="text-lg text-amber-50/90 max-w-3xl mx-auto">
                Kontinuierliche Überwachung und Analyse von Märkten, Wettbewerbern und Trends
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Echtzeit-Datensammlung</h3>
                    <p className="text-amber-50/80">
                      Automatische Sammlung von Daten aus News, Social Media, Finanzberichten und Branchenpublikationen.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Network className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Intelligente Analyse</h3>
                    <p className="text-amber-50/80">
                      KI erkennt Muster, Trends und Anomalien in großen Datenmengen und generiert actionable Insights.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Automatische Berichte</h3>
                    <p className="text-amber-50/80">
                      Generierung detaillierter Marktanalysen, Wettbewerbsberichte und Trendprognosen auf Knopfdruck.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <h3 className="text-2xl font-bold text-white mb-6">Analyse-Pipeline</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                    <span className="text-amber-50/90">Datenquellen überwachen</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                    <span className="text-amber-50/90">Relevante Informationen filtern</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                    <span className="text-amber-50/90">KI-Analyse durchführen</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">4</div>
                    <span className="text-amber-50/90">Insights generieren</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">✓</div>
                    <span className="text-amber-50/90">Berichte bereitstellen</span>
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
                Umfassende Marktintelligenz
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Target className="w-10 h-10 text-amber-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Wettbewerbsanalyse</h3>
                <p className="text-amber-50/80 text-sm">
                  Kontinuierliche Überwachung von Konkurrenten, deren Strategien und Marktaktivitäten.
                </p>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <TrendingUp className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Trend-Erkennung</h3>
                <p className="text-amber-50/80 text-sm">
                  Frühe Identifikation von Markttrends und aufkommenden Technologien.
                </p>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <PieChart className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Marktgrößen-Analyse</h3>
                <p className="text-amber-50/80 text-sm">
                  Automatische Berechnung von Marktgrößen, Wachstumsraten und Marktanteilen.
                </p>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Cpu className="w-10 h-10 text-yellow-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Sentiment-Analyse</h3>
                <p className="text-amber-50/80 text-sm">
                  Analyse der öffentlichen Meinung zu Branchen, Produkten und Unternehmen.
                </p>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Calendar className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Prognose-Modelle</h3>
                <p className="text-amber-50/80 text-sm">
                  KI-basierte Vorhersagen für Marktentwicklungen und Geschäftschancen.
                </p>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Activity className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Alert-System</h3>
                <p className="text-amber-50/80 text-sm">
                  Sofortige Benachrichtigungen bei wichtigen Marktveränderungen oder Chancen.
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
                {dict?.ai_impacts_common?.benefits_title || "Measurable Results"}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-green-400 mb-2">85%</div>
                <p className="text-amber-50/90">Schnellere Marktanalysen</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-amber-400 mb-2">24/7</div>
                <p className="text-amber-50/90">Kontinuierliche Marktüberwachung</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-purple-400 mb-2">3x</div>
                <p className="text-amber-50/90">Mehr identifizierte Chancen</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-cyan-400 mb-2">70%</div>
                <p className="text-amber-50/90">Kosteneinsparung bei Marktforschung</p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Anwendungsbereiche
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <TrendingUp className="w-12 h-12 text-amber-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Strategische Planung</h3>
                <p className="text-amber-50/80 mb-4">
                  Fundierte Entscheidungen für Produktentwicklung, Marktexpansion und Investitionen.
                </p>
                <ul className="space-y-2 text-amber-50/70">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Markteintrittsstrategie
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Produktpositionierung
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Investitionsentscheidungen
                  </li>
                </ul>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Target className="w-12 h-12 text-green-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Marketing & Vertrieb</h3>
                <p className="text-amber-50/80 mb-4">
                  Optimierung von Marketing-Kampagnen und Vertriebsstrategien basierend auf Marktdaten.
                </p>
                <ul className="space-y-2 text-amber-50/70">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Zielgruppen-Analyse
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Kampagnen-Optimierung
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Lead-Generierung
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
                Gewinnen Sie wertvolle Markteinblicke in Echtzeit und treffen Sie datenbasierte Entscheidungen.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/demo`}>
                  <button className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105 transition-all duration-300 border border-white/20">
                    Kostenlose Analyse <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                
                <Link href={`/${locale}/contact`}>
                  <button className="glass-panel-ultimate border-white/40 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-300">
                    Marketing Beratung <BarChart3 className="w-5 h-5" />
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