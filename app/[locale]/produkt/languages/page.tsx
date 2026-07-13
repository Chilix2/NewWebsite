import React from "react";
import { PageHero } from "@/components/page-hero";
import { GlassCard } from "@/components/ui/glass-card";
import { getDictionary } from "@/lib/dictionary";
import { 
  Globe, 
  Volume2, 
  Users, 
  CheckCircle2,
  Play,
  Mic,
  MessageSquare,
  Star
} from "lucide-react";
import Link from "next/link";
import { FluidBackground } from "@/components/fluid-background";
import { LanguageAudioButton } from "@/components/language-audio-button";

export default async function LanguagesPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  
  const langCodeMap: Record<string, string> = {
    "Deutsch": "de",
    "English": "en",
    "Français": "fr",
    "Español": "es",
    "Italiano": "it",
    "Nederlands": "nl",
    "Polski": "pl",
    "Português": "pt",
    "Русский": "ru",
    "中文": "zh",
    "日本語": "ja",
    "한국어": "ko"
  };
  
  const languages = [
    { name: "Deutsch", region: "Deutschland, Österreich, Schweiz", flag: "🇩🇪", accent: "Hochdeutsch, Bayrisch, Österreichisch" },
    { name: "English", region: "US, UK, Australia, Canada", flag: "🇺🇸", accent: "American, British, Australian" },
    { name: "Français", region: "France, Canada, Belgium", flag: "🇫🇷", accent: "Parisien, Québécois" },
    { name: "Español", region: "Spain, Mexico, Argentina", flag: "🇪🇸", accent: "Castellano, Mexicano" },
    { name: "Italiano", region: "Italy, Switzerland", flag: "🇮🇹", accent: "Standard, Regionale" },
    { name: "Nederlands", region: "Netherlands, Belgium", flag: "🇳🇱", accent: "Hollands, Vlaams" },
    { name: "Polski", region: "Poland", flag: "🇵🇱", accent: "Warszawski, Krakowski" },
    { name: "Português", region: "Brazil, Portugal", flag: "🇧🇷", accent: "Brasileiro, Europeu" },
    { name: "Русский", region: "Russia, Ukraine", flag: "🇷🇺", accent: "Московский, Региональный" },
    { name: "中文", region: "China, Taiwan, Hong Kong", flag: "🇨🇳", accent: "Mandarin, Cantonese" },
    { name: "日本語", region: "Japan", flag: "🇯🇵", accent: "Standard, Kansai" },
    { name: "한국어", region: "South Korea", flag: "🇰🇷", accent: "Seoul, Busan" }
  ];

  const listenLabel = dict?.languages_page?.listen_sample || "Sample";

  return (
    <div className="min-h-screen bg-[#faf9f8] font-sans text-gray-900 overflow-x-hidden selection:bg-pink-100 selection:text-pink-900">
      <FluidBackground />

      <div className="relative z-10">
        
        <section className="pt-32 pb-20 px-4 text-center max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/50 px-4 py-1.5 rounded-full text-sm font-bold mb-8 shadow-sm text-pink-600 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Globe className="w-5 h-5" />
            {dict?.languages_page?.badge || "Multilingual"}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-gray-900 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            {dict?.languages_page?.heading_part1 || "Sprachen"} & <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-coral-500 to-purple-600">
              {dict?.languages_page?.heading_part2 || "Dialekte"}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {dict?.languages_page?.hero_desc || "Sailly spricht über 30 Sprachen fließend und versteht regionale Dialekte. Ihre internationalen Kunden fühlen sich sofort verstanden."}
          </p>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              {[
                { icon: Globe, number: "30+", label: dict?.languages_page?.stats_languages || "Unterstützte Sprachen" },
                { icon: Users, number: "95%", label: dict?.languages_page?.stats_coverage || "Weltweite Abdeckung" },
                { icon: Volume2, number: "<200ms", label: dict?.languages_page?.stats_response || "Reaktionszeit" },
                { icon: Star, number: "99.8%", label: dict?.languages_page?.stats_accuracy || "Sprachgenauigkeit" }
              ].map((stat, i) => (
                <GlassCard key={i} className="p-6 text-center bg-white/60">
                  <div className="w-14 h-14 mx-auto mb-4 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <stat.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-white/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{dict?.languages_page?.grid_title || "Unterstützte Sprachen"}</h2>
              <p className="text-gray-600 text-lg">{dict?.languages_page?.grid_subtitle || "Natürliche Konversation in der Muttersprache Ihrer Kunden"}</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {languages.map((lang, i) => {
                const langCode = langCodeMap[lang.name];
                const hasAudio = ["de", "en", "fr", "es", "tr", "ru", "pl", "ar", "zh"].includes(langCode);
                return (
                  <GlassCard key={i} className="p-6 bg-white/70 hover:bg-white/90 transition-all">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-3xl">{lang.flag}</span>
                      <div>
                        <h3 className="font-bold text-lg">{lang.name}</h3>
                        <p className="text-gray-600 text-sm">{lang.region}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-1">{dict?.languages_page?.available_accents || "Verfügbare Akzente:"}</div>
                      <div className="text-sm font-medium">{lang.accent}</div>
                    </div>
                    
                    {hasAudio && langCode ? (
                      <LanguageAudioButton langCode={langCode} label={listenLabel} />
                    ) : (
                      <button disabled className="flex items-center gap-2 text-gray-400 text-sm font-medium cursor-not-allowed">
                        <Play className="w-4 h-4" />
                        {listenLabel}
                      </button>
                    )}
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{dict?.languages_page?.voice_title || "Natürliche Sprachqualität"}</h2>
              <p className="text-gray-600 text-lg">{dict?.languages_page?.voice_subtitle || "Modernste KI für menschlich klingende Gespräche"}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">{dict?.languages_page?.voice_special || "Was macht Sailly besonders?"}</h3>
                <div className="space-y-6">
                  {[
                    { icon: Mic, title: dict?.languages_page?.feature_dialect?.title || "Dialekt-Erkennung", desc: dict?.languages_page?.feature_dialect?.desc || "Versteht regionale Aussprachen und Besonderheiten" },
                    { icon: MessageSquare, title: dict?.languages_page?.feature_intonation?.title || "Natürliche Intonation", desc: dict?.languages_page?.feature_intonation?.desc || "Spricht mit der richtigen Betonung und Emotion" },
                    { icon: Users, title: dict?.languages_page?.feature_cultural?.title || "Kulturelle Anpassung", desc: dict?.languages_page?.feature_cultural?.desc || "Berücksichtigt kulturelle Höflichkeitsformen" },
                    { icon: Volume2, title: dict?.languages_page?.feature_volume?.title || "Adaptive Lautstärke", desc: dict?.languages_page?.feature_volume?.desc || "Passt sich automatisch an die Gesprächssituation an" }
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                        <feature.icon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                        <p className="text-gray-600">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
                <h4 className="text-xl font-bold mb-6">{dict?.languages_page?.demo_sample_title || "Sprachprobe"}</h4>
                <div className="space-y-4">
                  {[
                    { key: "de", flag: "🇩🇪", label: dict?.languages_page?.demo_hochdeutsch || "Deutsch (Hochdeutsch)", text: dict?.languages_page?.demo_hochdeutsch_text || "Guten Tag! Herzlich willkommen. Wie kann ich Ihnen helfen?" },
                    { key: "en", flag: "🇺🇸", label: dict?.languages_page?.demo_english || "English (British)", text: dict?.languages_page?.demo_english_text || "Good afternoon! Welcome. How may I assist you today?" },
                    { key: "fr", flag: "🇫🇷", label: dict?.languages_page?.demo_french || "Français (Parisien)", text: dict?.languages_page?.demo_french_text || "Bonjour ! Comment puis-je vous aider aujourd'hui ?" }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span>{item.flag}</span>
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      <p className="text-sm text-gray-700 italic mb-2">{item.text}</p>
                      <LanguageAudioButton langCode={item.key} label={dict?.languages_page?.listen_btn || "Anhören"} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-white/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{dict?.languages_page?.industry_title || "Branchenspezifische Terminologie"}</h2>
              <p className="text-gray-600 text-lg">{dict?.languages_page?.industry_subtitle || "Sailly kennt die Fachbegriffe Ihrer Branche in jeder Sprache"}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: dict?.languages_page?.industry_hotels || "Hotellerie", icon: "🏨", terms: ["Check-in/Check-out", "Zimmerservice", "Concierge", "Rezeption", "Housekeeping"] },
                { title: dict?.languages_page?.industry_restaurants || "Gastronomie", icon: "🍽️", terms: ["Tischreservierung", "Allergene", "Menü des Tages", "Weinempfehlung", "Takeaway"] },
                { title: dict?.languages_page?.industry_healthcare || "Gesundheitswesen", icon: "🏥", terms: ["Terminvereinbarung", "Notfall", "Rezept", "Sprechstunden", "Facharzt"] },
                { title: dict?.languages_page?.industry_legal || "Kanzleien & Steuerberatung", icon: "⚖️", terms: ["Erstberatung", "Mandant", "Frist", "Aktenzeichen", "Rückruf"] }
              ].map((industry, i) => (
                <GlassCard key={i} className="p-6 bg-white/70">
                  <div className="text-center mb-4">
                    <span className="text-4xl mb-2 block">{industry.icon}</span>
                    <h3 className="font-bold text-xl">{industry.title}</h3>
                  </div>
                  <div className="space-y-2">
                    {industry.terms.map((term, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{term}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{dict?.languages_page?.dialects_title || "Deutsche Dialekte & Akzente"}</h2>
              <p className="text-gray-600 text-lg">{dict?.languages_page?.dialects_subtitle || "Sailly versteht auch regionale Besonderheiten"}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { region: "Norddeutschland", accent: "Plattdeutsch", icon: "⚓" },
                { region: "Bayern", accent: "Bayrisch", icon: "🥨" },
                { region: "Österreich", accent: "Österreichisch", icon: "🏔️" },
                { region: "Schweiz", accent: "Schweizerdeutsch", icon: "🧀" },
                { region: "Rheinland", accent: "Kölsch", icon: "🍺" },
                { region: "Sachsen", accent: "Sächsisch", icon: "🏰" },
                { region: "Schwaben", accent: "Schwäbisch", icon: "🚗" },
                { region: "Berlin", accent: "Berlinerisch", icon: "🐻" }
              ].map((dialect, i) => (
                <GlassCard key={i} className="p-4 text-center bg-white/60 hover:bg-white/80 transition-all">
                  <span className="text-2xl mb-2 block">{dialect.icon}</span>
                  <h4 className="font-bold">{dialect.region}</h4>
                  <p className="text-sm text-gray-600">{dialect.accent}</p>
                  <div className="mt-2">
                    <div className="w-full bg-green-100 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '95%'}}></div>
                    </div>
                    <span className="text-xs text-green-600 font-medium">95% {dict?.languages_page?.accuracy_label || "Genauigkeit"}</span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 text-center">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{dict?.languages_page?.cta_title || "Sprechen Sie die Sprache Ihrer Kunden"}</h2>
            <p className="text-xl text-gray-600 mb-10">{dict?.languages_page?.cta_subtitle || "Testen Sie Sailly in Ihrer bevorzugten Sprache."}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/demo`}>
                <button className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-blue-700 shadow-xl shadow-blue-200 hover:-translate-y-1 transition-all flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  {dict?.languages_page?.cta_demo || "Mehrsprachige Demo"}
                </button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <button className="bg-white text-gray-700 border border-gray-200 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all">
                  {dict?.languages_page?.cta_consult || "Sprachberatung anfragen"}
                </button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
