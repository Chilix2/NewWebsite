import { getDictionary } from "@/lib/dictionary";
import { Activity, ArrowRight, BarChart3, Calendar, CheckCircle, Cpu, Eye, Package, ShoppingCart, Smartphone, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { LightRays } from "@/components/light-rays";

export default async function BrancheRetailPage({ 
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
              <ShoppingCart className="w-4 h-4" />
              {dict?.use_cases_retail?.badge || "RETAIL & E-COMMERCE"}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-shadow-md text-white mb-6">
              {dict?.use_cases_retail?.title || "Workflow-Automatisierung für den Handel"}
            </h1>
            
            <p className="text-lg sm:text-xl text-amber-50/90 leading-relaxed max-w-3xl mx-auto font-medium text-shadow-sm mb-12">
              {dict?.use_cases_retail?.subtitle || "Optimieren Sie Ihre Retail-Prozesse mit KI-gestützter Automatisierung - von der Bestandsverwaltung bis zur personalisierten Kundenansprache."}
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

        {/* Challenges Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                {dict?.use_cases_common?.challenges_title || "Challenges"}
              </h2>
              <p className="text-lg text-amber-50/90 max-w-3xl mx-auto">
                Der Handel steht unter enormem Druck durch Omnichannel-Anforderungen und sich ändernde Kundenerwartungen
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Package className="w-12 h-12 text-red-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Bestandsmanagement</h3>
                <p className="text-amber-50/80 mb-4">
                  Komplexe Lagerverwaltung über mehrere Kanäle und Standorte hinweg.
                </p>
                <div className="text-2xl font-bold text-red-400">30%</div>
                <p className="text-amber-50/70 text-sm">Verluste durch Überbestände</p>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Users className="w-12 h-12 text-yellow-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Personalisierung</h3>
                <p className="text-amber-50/80 mb-4">
                  Kunden erwarten personalisierte Erfahrungen über alle Touchpoints.
                </p>
                <div className="text-2xl font-bold text-yellow-400">80%</div>
                <p className="text-amber-50/70 text-sm">Erwarten Personalisierung</p>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <TrendingUp className="w-12 h-12 text-orange-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Preisoptimierung</h3>
                <p className="text-amber-50/80 mb-4">
                  Dynamische Preisanpassungen basierend auf Nachfrage und Wettbewerb.
                </p>
                <div className="text-2xl font-bold text-orange-400">15%</div>
                <p className="text-amber-50/70 text-sm">Mögliche Margensteigerung</p>
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
                Intelligente Automatisierung für moderne Handelsunternehmen
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Intelligente Bestandsoptimierung</h3>
                    <p className="text-amber-50/80">
                      KI-gestützte Nachfrageprognosen und automatische Bestellungen basierend auf Verkaufsdaten und Trends.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center flex-shrink-0">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Personalisierte Kundenansprache</h3>
                    <p className="text-amber-50/80">
                      Automatische Segmentierung und personalisierte Marketing-Kampagnen basierend auf Kaufverhalten.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Dynamische Preisgestaltung</h3>
                    <p className="text-amber-50/80">
                      Automatische Preisanpassungen basierend auf Nachfrage, Wettbewerb und Lagerbeständen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <h3 className="text-2xl font-bold text-white mb-6">E-Commerce Workflow</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                    <span className="text-amber-50/90">Bestellung automatisch erfassen</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                    <span className="text-amber-50/90">Lagerbestand prüfen</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                    <span className="text-amber-50/90">Versand automatisch initiieren</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">4</div>
                    <span className="text-amber-50/90">Kunde automatisch informieren</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">✓</div>
                    <span className="text-amber-50/90">Follow-up Marketing</span>
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
                <Smartphone className="w-10 h-10 text-amber-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Omnichannel-Integration</h3>
                <p className="text-amber-50/80 text-sm mb-4">
                  Nahtlose Verbindung von Online-Shop, stationärem Handel und mobilen Apps.
                </p>
                <div className="text-sm text-green-400 font-semibold">360° Kundensicht</div>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Eye className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Visual Merchandising</h3>
                <p className="text-amber-50/80 text-sm mb-4">
                  KI-gestützte Optimierung der Produktplatzierung und Store-Layouts.
                </p>
                <div className="text-sm text-green-400 font-semibold">25% mehr Umsatz</div>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Calendar className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Saisonale Planung</h3>
                <p className="text-amber-50/80 text-sm mb-4">
                  Automatische Anpassung von Sortiment und Marketing an saisonale Trends.
                </p>
                <div className="text-sm text-green-400 font-semibold">40% weniger Restbestände</div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                {dict?.use_cases_common?.benefits_title || "Benefits"}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-green-400 mb-2">35%</div>
                <p className="text-amber-50/90">Steigerung der Conversion Rate</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-amber-400 mb-2">50%</div>
                <p className="text-amber-50/90">Reduzierung der Lagerkosten</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-purple-400 mb-2">90%</div>
                <p className="text-amber-50/90">Automatisierung der Bestellprozesse</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-cyan-400 mb-2">25%</div>
                <p className="text-amber-50/90">Steigerung der Kundenzufriedenheit</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-panel-ultimate p-12 rounded-3xl border border-white/20 backdrop-blur-md">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">{dict?.use_cases_retail?.cta_page_title || "use_cases_retail CTA"}</h2>
              <p className="text-lg text-amber-50/90 mb-8 max-w-2xl mx-auto">
                Starten Sie noch heute mit der Automatisierung Ihrer Retail-Prozesse und steigern Sie Ihre Effizienz.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/demo`}>
                  <button className="bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/30 hover:scale-105 transition-all duration-300 border border-white/20">{dict?.use_cases_common?.demo_cta || "Demo"} <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                
                <Link href={`/${locale}/contact`}>
                  <button className="glass-panel-ultimate border-white/40 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-300">
                    E-Commerce Beratung <ShoppingCart className="w-5 h-5" />
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