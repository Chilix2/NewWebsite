import React from "react";
import { PageHero } from "@/components/page-hero";
import { GlassCard } from "@/components/ui/glass-card";
import { getDictionary } from "@/lib/dictionary";
import { 
  TrendingUp, 
  Clock, 
  Heart, 
  Euro, 
  Users, 
  Phone, 
  Calendar,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Target,
  Zap
} from "lucide-react";
import Link from "next/link";
import { FluidBackground } from "@/components/fluid-background";

export default async function DataInsightsPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  
  return (
    <div className="min-h-screen bg-[#faf9f8] font-sans text-gray-900 overflow-x-hidden selection:bg-pink-100 selection:text-pink-900">
      <FluidBackground />

      <div className="relative z-10">
        
        {/* Hero Section - matching the main product page style */}
        <section className="pt-32 pb-20 px-4 text-center max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/50 px-4 py-1.5 rounded-full text-sm font-bold mb-8 shadow-sm text-pink-600 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <BarChart3 className="w-5 h-5" />
            {dict?.data_insights_page?.badge || "Business Benefits"}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-gray-900 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            {dict?.data_insights_page?.heading_part1 || "Daten"} & <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-coral-500 to-purple-600">
              {dict?.data_insights_page?.heading_part2 || "Insights"}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {dict?.data_insights_page?.subtitle || "Messbare Ergebnisse für Ihr Business. Sehen Sie, wie Sailly Ihren Umsatz steigert und Ihr Team entlastet."}
          </p>
        </section>

        {/* ROI Calculator Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{dict?.data_insights_page?.roi_title || "ROI-Rechner: Was Sailly für Sie leistet"}</h2>
              <p className="text-gray-600 text-lg">{dict?.data_insights_page?.roi_subtitle || "Berechnen Sie Ihren Return on Investment mit konkreten Zahlen"}</p>
            </div>
            
            <GlassCard className="p-8 md:p-12 bg-white/60">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-6">{dict?.data_insights_page?.roi_your_numbers || "Ihre Zahlen sprechen für sich"}</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">15-25%</div>
                        <div className="text-gray-600">{dict?.data_insights_page?.impact_revenue?.desc || "Mehr Buchungen durch 24/7 Erreichbarkeit"}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">2-3 Stunden</div>
                        <div className="text-gray-600">{dict?.data_insights_page?.impact_efficiency?.desc || "Gesparte Zeit pro Tag und Mitarbeiter"}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Euro className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">€2.400+</div>
                        <div className="text-gray-600">{dict?.data_insights_page?.impact_savings?.desc || "Monatliche Kosteneinsparung (durchschnittlich)"}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
                  <h4 className="text-xl font-bold mb-4">Beispielrechnung Hotel (50 Zimmer)</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Verpasste Anrufe pro Tag:</span>
                      <span className="font-bold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Durchschnittlicher Buchungswert:</span>
                      <span className="font-bold">€120</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conversion Rate mit Sailly:</span>
                      <span className="font-bold">60%</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between text-lg font-bold text-green-600">
                      <span>Zusätzlicher Monatsumsatz:</span>
                      <span>€25.920</span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Business Impact Metrics */}
        <section className="py-20 px-4 bg-white/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Messbare Geschäftsvorteile</h2>
              <p className="text-gray-600 text-lg">Konkrete Verbesserungen, die Sie sofort spüren werden</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: TrendingUp,
                  title: "Umsatzsteigerung",
                  metric: "+15-25%",
                  description: "Mehr Buchungen durch perfekte Erreichbarkeit",
                  color: "green"
                },
                {
                  icon: Zap,
                  title: "Effizienzgewinn",
                  metric: "2-3h täglich",
                  description: "Gesparte Zeit pro Mitarbeiter für wichtige Aufgaben",
                  color: "blue"
                },
                {
                  icon: Heart,
                  title: "Kundenzufriedenheit",
                  metric: "+40%",
                  description: "Höhere Zufriedenheit durch sofortige Antworten",
                  color: "pink"
                },
                {
                  icon: Euro,
                  title: "Kosteneinsparung",
                  metric: "€2.400+",
                  description: "Monatlich gesparte Personalkosten",
                  color: "purple"
                }
              ].map((item, i) => (
                <GlassCard key={i} className="p-6 text-center bg-white/70 hover:bg-white/90 transition-all">
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-${item.color}-100`}>
                    <item.icon className={`w-7 h-7 text-${item.color}-600`} />
                  </div>
                  <div className={`text-3xl font-bold mb-2 text-${item.color}-600`}>{item.metric}</div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Erfolgsgeschichten unserer Kunden</h2>
              <p className="text-gray-600 text-lg">Echte Ergebnisse von echten Unternehmen</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  company: "Hotel Zur Post",
                  industry: "Hotellerie",
                  results: [
                    { metric: "+30%", label: "Mehr Buchungen" },
                    { metric: "€18.000", label: "Zusatzumsatz/Monat" },
                    { metric: "24/7", label: "Erreichbarkeit" }
                  ],
                  quote: "Sailly hat unser Reservierungsmanagement revolutioniert. Kein Anruf geht mehr verloren."
                },
                {
                  company: "Praxis Dr. Weber",
                  industry: "Gesundheitswesen", 
                  results: [
                    { metric: "+50%", label: "Termineffizienz" },
                    { metric: "3 Stunden", label: "Gesparte Zeit/Tag" },
                    { metric: "95%", label: "Patientenzufriedenheit" }
                  ],
                  quote: "Unsere Patienten lieben die sofortige Erreichbarkeit. Das Team kann sich auf die Behandlung konzentrieren."
                },
                {
                  company: "Restaurant Bella Vista",
                  industry: "Gastronomie",
                  results: [
                    { metric: "+40%", label: "Reservierungen" },
                    { metric: "€8.500", label: "Mehrumsatz/Monat" },
                    { metric: "0%", label: "No-Shows" }
                  ],
                  quote: "Kein Klingeln mehr im Gastraum. Wir können uns voll auf unsere Gäste konzentrieren."
                }
              ].map((story, i) => (
                <GlassCard key={i} className="p-6 bg-white/70">
                  <div className="mb-4">
                    <h3 className="font-bold text-xl">{story.company}</h3>
                    <p className="text-gray-600">{story.industry}</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {story.results.map((result, j) => (
                      <div key={j} className="text-center">
                        <div className="text-lg font-bold text-green-600">{result.metric}</div>
                        <div className="text-xs text-gray-600">{result.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-700 italic text-sm">
                    "{story.quote}"
                  </blockquote>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Competitive Advantage */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Warum Sailly besser ist</h2>
              <p className="text-gray-600 text-lg">Der Vergleich zu herkömmlichen Lösungen</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">Traditionelle Call Center</h3>
                <div className="space-y-4">
                  {[
                    "Hohe Personalkosten",
                    "Begrenzte Arbeitszeiten",
                    "Schwankende Servicequalität", 
                    "Lange Warteschleifen",
                    "Personalausfall bei Krankheit"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-600">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-6 text-green-600">Sailly Voice Agent</h3>
                <div className="space-y-4">
                  {[
                    "Fixe, planbare Kosten",
                    "24/7 Verfügbarkeit",
                    "Konstant hohe Qualität",
                    "Sofortige Antworten",
                    "Nie krank, nie im Urlaub"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 text-center">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{dict?.data_insights_page?.cta_title || "Bereit für messbare Ergebnisse?"}</h2>
            <p className="text-xl text-gray-600 mb-10">
              {dict?.data_insights_page?.cta_subtitle || "Starten Sie noch heute und erleben Sie, wie Sailly Ihr Business transformiert."}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/demo`}>
                <button className="bg-green-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-green-700 shadow-xl shadow-green-200 hover:-translate-y-1 transition-all flex items-center gap-2">
                  ROI-Demo anfordern <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <button className="bg-white text-gray-700 border border-gray-200 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all">
                  Beratungsgespräch buchen
                </button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}