import { getDictionary } from "@/lib/dictionary";
import { Activity, ArrowRight, CheckCircle, Clock, Cpu, Database, FileText, Globe, MessageCircle, Network, Search, Shield, Smartphone, Users } from "lucide-react";
import Link from "next/link";
import { LightRays } from "@/components/light-rays";

export default async function AiImpactsSupportPage({ 
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
              <MessageCircle className="w-4 h-4" />
              {dict?.ai_impacts_support?.badge || "AI IMPACTS SUPPORT"}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-shadow-md text-white mb-6">
              {dict?.ai_impacts_support?.title || "WhatsApp Support mit RAG"}
            </h1>
            
            <p className="text-lg sm:text-xl text-amber-50/90 leading-relaxed max-w-3xl mx-auto font-medium text-shadow-sm mb-12">
              {dict?.ai_impacts_support?.subtitle || "Revolutionieren Sie Ihren Kundensupport mit KI-gestützten WhatsApp-Bots, die auf Ihre Unternehmensdaten zugreifen und präzise Antworten liefern."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/demo`}>
                <button className="bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/30 hover:scale-105 transition-all duration-300 border border-white/20">
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
                Moderne Kunden erwarten sofortige, präzise Antworten - rund um die Uhr
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Clock className="w-12 h-12 text-red-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Lange Wartezeiten</h3>
                <p className="text-amber-50/80">
                  Kunden warten stundenlang auf Antworten, was zu Frustration und Abwanderung führt.
                </p>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Users className="w-12 h-12 text-yellow-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Überlastete Teams</h3>
                <p className="text-amber-50/80">
                  Support-Mitarbeiter sind mit repetitiven Anfragen überlastet und haben keine Zeit für komplexe Fälle.
                </p>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Search className="w-12 h-12 text-orange-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Inkonsistente Antworten</h3>
                <p className="text-amber-50/80">
                  Verschiedene Mitarbeiter geben unterschiedliche Antworten auf ähnliche Fragen.
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
                KI-gestützter WhatsApp Support
              </h2>
              <p className="text-lg text-amber-50/90 max-w-3xl mx-auto">
                Nutzen Sie die Kraft von RAG (Retrieval-Augmented Generation) für präzise, kontextuelle Antworten
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">WhatsApp Business Integration</h3>
                    <p className="text-amber-50/80">
                      Nahtlose Integration in WhatsApp Business API für direkten Kundenkontakt über den bevorzugten Kanal.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center flex-shrink-0">
                    <Network className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">RAG-basierte Antworten</h3>
                    <p className="text-amber-50/80">
                      Die KI durchsucht Ihre Wissensdatenbank und generiert präzise Antworten basierend auf aktuellen Unternehmensdaten.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Intelligente Eskalation</h3>
                    <p className="text-amber-50/80">
                      Komplexe Anfragen werden automatisch an menschliche Experten weitergeleitet - nahtlos und kontextbewusst.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <h3 className="text-2xl font-bold text-white mb-6">RAG-Workflow</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                    <span className="text-amber-50/90">Kunde stellt Frage via WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                    <span className="text-amber-50/90">KI analysiert die Anfrage</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                    <span className="text-amber-50/90">Relevante Dokumente werden abgerufen</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">4</div>
                    <span className="text-amber-50/90">Präzise Antwort wird generiert</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">✓</div>
                    <span className="text-amber-50/90">Sofortige Antwort an Kunden</span>
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
                Erweiterte Funktionen
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Globe className="w-10 h-10 text-amber-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Mehrsprachiger Support</h3>
                <p className="text-amber-50/80 text-sm">
                  Automatische Erkennung und Antwort in der Sprache des Kunden.
                </p>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <FileText className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Dokumenten-Upload</h3>
                <p className="text-amber-50/80 text-sm">
                  Kunden können Bilder und Dokumente direkt über WhatsApp senden.
                </p>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Cpu className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Personalisierung</h3>
                <p className="text-amber-50/80 text-sm">
                  Antworten werden basierend auf Kundenhistorie personalisiert.
                </p>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Activity className="w-10 h-10 text-yellow-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Echtzeit-Updates</h3>
                <p className="text-amber-50/80 text-sm">
                  Wissensdatenbank wird automatisch mit neuen Informationen aktualisiert.
                </p>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Database className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">CRM-Integration</h3>
                <p className="text-amber-50/80 text-sm">
                  Automatische Synchronisation mit bestehenden CRM-Systemen.
                </p>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <CheckCircle className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Qualitätskontrolle</h3>
                <p className="text-amber-50/80 text-sm">
                  Kontinuierliche Überwachung und Verbesserung der Antwortqualität.
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
                <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
                <p className="text-amber-50/90">Verfügbarkeit ohne Unterbrechung</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-amber-400 mb-2">90%</div>
                <p className="text-amber-50/90">Reduzierung der Antwortzeit</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-purple-400 mb-2">85%</div>
                <p className="text-amber-50/90">Automatische Problemlösung</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-cyan-400 mb-2">60%</div>
                <p className="text-amber-50/90">Kosteneinsparung im Support</p>
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
                <MessageCircle className="w-12 h-12 text-amber-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">E-Commerce Support</h3>
                <p className="text-amber-50/80 mb-4">
                  Bestellstatus, Retouren, Produktinformationen - alles automatisch und präzise beantwortet.
                </p>
                <ul className="space-y-2 text-amber-50/70">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Bestellverfolgung
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Produktberatung
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Retourenabwicklung
                  </li>
                </ul>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Shield className="w-12 h-12 text-green-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Technischer Support</h3>
                <p className="text-amber-50/80 mb-4">
                  Komplexe technische Fragen werden durch Zugriff auf Handbücher und Wissensdatenbanken beantwortet.
                </p>
                <ul className="space-y-2 text-amber-50/70">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Troubleshooting
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Installationsanleitungen
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    FAQ-Automatisierung
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
                Starten Sie noch heute mit KI-gestütztem WhatsApp Support und bieten Sie Ihren Kunden die beste Erfahrung.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/demo`}>
                  <button className="bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/30 hover:scale-105 transition-all duration-300 border border-white/20">
                    Kostenlose Demo <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                
                <Link href={`/${locale}/contact`}>
                  <button className="glass-panel-ultimate border-white/40 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-300">
                    Beratung anfragen <MessageCircle className="w-5 h-5" />
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