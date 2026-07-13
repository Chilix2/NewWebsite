import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { getDictionary } from "@/lib/dictionary";
import { 
  Brain, 
  Cloud, 
  Phone, 
  Shield, 
  Zap,
  Network,
  Database,
  Mic,
  Server,
  Globe,
  CheckCircle2,
  ArrowRight,
  Handshake
} from "lucide-react";
import Link from "next/link";
import { FluidBackground } from "@/components/fluid-background";

export default async function StrategicPartnersPage({ 
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
            <Handshake className="w-5 h-5" />
            {dict?.strategic_partners_page?.badge || "Technology Stack"}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-gray-900 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            {dict?.strategic_partners_page?.heading_part1 || "Strategische"} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-coral-500 to-purple-600">
              {dict?.strategic_partners_page?.heading_part2 || "Partner"}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {dict?.strategic_partners_page?.subtitle || "Sailly basiert auf bewährten Technologien führender Anbieter. Erfahren Sie, welche Partner unsere KI-Plattform antreiben."}
          </p>
        </section>

        {/* Technology Stack Overview */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Unser Technologie-Stack</h2>
              <p className="text-gray-600 text-lg">Bewährte Partnerschaften für maximale Zuverlässigkeit und Performance</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  category: "KI Foundation",
                  icon: Brain,
                  color: "purple",
                  partners: ["OpenAI", "Anthropic", "Google AI"]
                },
                {
                  category: "Cloud Infrastructure",
                  icon: Cloud,
                  color: "blue",
                  partners: ["AWS", "Microsoft Azure", "Google Cloud"]
                },
                {
                  category: "Telefonie",
                  icon: Phone,
                  color: "green",
                  partners: ["Twilio", "Vonage", "Deutsche Telekom"]
                },
                {
                  category: "Sicherheit",
                  icon: Shield,
                  color: "red",
                  partners: ["Cloudflare", "Auth0", "HashiCorp"]
                }
              ].map((stack, i) => (
                <GlassCard key={i} className="p-6 text-center bg-white/60 hover:bg-white/80 transition-all">
                  <div className={`w-14 h-14 mx-auto mb-4 bg-${stack.color}-100 rounded-2xl flex items-center justify-center`}>
                    <stack.icon className={`w-7 h-7 text-${stack.color}-600`} />
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-gray-900">{stack.category}</h3>
                  <div className="space-y-1">
                    {stack.partners.map((partner, j) => (
                      <div key={j} className="text-sm text-gray-600">{partner}</div>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* AI Foundation Partners */}
        <section className="py-20 px-4 bg-white/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">KI-Foundation Partner</h2>
              <p className="text-gray-600 text-lg">Die besten Large Language Models für natürliche Konversationen</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "OpenAI GPT-4",
                  logo: "🤖",
                  description: "Fortschrittlichste Sprachmodelle für natürliche Konversationen und komplexe Aufgabenverarbeitung.",
                  features: [
                    "Multilinguale Unterstützung",
                    "Kontextverständnis",
                    "Reasoning-Fähigkeiten",
                    "Code-Integration"
                  ],
                  use_case: "Hauptmodell für komplexe Gespräche"
                },
                {
                  name: "Anthropic Claude",
                  logo: "🧠",
                  description: "Sicherheitsfokussierte KI mit ausgezeichneter Gesprächsführung und ethischen Richtlinien.",
                  features: [
                    "Constitutional AI",
                    "Sicherheitsfokus",
                    "Lange Kontexte",
                    "Präzise Antworten"
                  ],
                  use_case: "Backup-System und Spezialfälle"
                },
                {
                  name: "Google Gemini",
                  logo: "💎",
                  description: "Multimodale KI für erweiterte Funktionen und Integration in Google-Services.",
                  features: [
                    "Multimodale Eingaben",
                    "Google-Integration",
                    "Echtzeit-Verarbeitung",
                    "Skalierbarkeit"
                  ],
                  use_case: "Spezielle Integrationen"
                }
              ].map((ai, i) => (
                <GlassCard key={i} className="p-6 bg-white/70">
                  <div className="text-center mb-4">
                    <span className="text-4xl mb-2 block">{ai.logo}</span>
                    <h3 className="font-bold text-xl text-gray-900">{ai.name}</h3>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{ai.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2 text-gray-900">Hauptfeatures:</h4>
                    <div className="space-y-1">
                      {ai.features.map((feature, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          <span className="text-xs text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="text-xs text-purple-600 font-medium">Einsatzbereich:</div>
                    <div className="text-xs text-purple-800">{ai.use_case}</div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Voice Technology Partners */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Voice Technology Partner</h2>
              <p className="text-gray-600 text-lg">Modernste Sprachtechnologie für natürliche Kommunikation</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Speech-to-Text & Text-to-Speech</h3>
                <div className="space-y-6">
                  {[
                    {
                      partner: "ElevenLabs",
                      technology: "Neural Voice Synthesis",
                      benefit: "Natürlichste Sprachausgabe mit emotionaler Intonation"
                    },
                    {
                      partner: "AssemblyAI",
                      technology: "Real-time Speech Recognition",
                      benefit: "Präzise Erkennung auch bei Hintergrundgeräuschen"
                    },
                    {
                      partner: "Deepgram",
                      technology: "Advanced ASR",
                      benefit: "Unterstützung für 30+ Sprachen und Dialekte"
                    },
                    {
                      partner: "Azure Cognitive Services",
                      technology: "Speech Services",
                      benefit: "Enterprise-grade Skalierbarkeit und Zuverlässigkeit"
                    }
                  ].map((tech, i) => (
                    <GlassCard key={i} className="p-4 bg-white/60">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                          <Mic className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-gray-900">{tech.partner}</h4>
                          <p className="text-sm text-blue-600 font-medium">{tech.technology}</p>
                          <p className="text-sm text-gray-600 mt-1">{tech.benefit}</p>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
                <h4 className="text-xl font-bold mb-6 text-gray-900">Voice Processing Pipeline</h4>
                
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Audio Input", desc: "Kunde spricht ins Telefon" },
                    { step: "2", title: "Speech Recognition", desc: "Umwandlung in Text (AssemblyAI/Deepgram)" },
                    { step: "3", title: "Language Processing", desc: "Verstehen der Absicht (OpenAI/Claude)" },
                    { step: "4", title: "Response Generation", desc: "Intelligente Antwort erstellen" },
                    { step: "5", title: "Voice Synthesis", desc: "Natürliche Sprachausgabe (ElevenLabs)" }
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{step.title}</div>
                        <div className="text-sm text-gray-600">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Infrastructure Partners */}
        <section className="py-20 px-4 bg-white/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Infrastructure & Telefonie Partner</h2>
              <p className="text-gray-600 text-lg">Zuverlässige Infrastruktur für 24/7 Verfügbarkeit</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  category: "Cloud Hosting",
                  icon: Server,
                  partners: [
                    { name: "AWS", region: "Frankfurt", cert: "SOC 2" },
                    { name: "Microsoft Azure", region: "Deutschland West", cert: "DSGVO" },
                    { name: "Google Cloud", region: "europe-west3", cert: "GDPR" }
                  ]
                },
                {
                  category: "Telefonie",
                  icon: Phone,
                  partners: [
                    { name: "Twilio", region: "Global", cert: "HIPAA" },
                    { name: "Deutsche Telekom", region: "Deutschland", cert: "DSGVO" },
                    { name: "Vonage", region: "Europa", cert: "PCI DSS" }
                  ]
                },
                {
                  category: "CDN & Security",
                  icon: Shield,
                  partners: [
                    { name: "Cloudflare", region: "Global", cert: "SOC 2" },
                    { name: "AWS CloudFront", region: "Edge Locations", cert: "SOC 2" },
                    { name: "Fastly", region: "Europa", cert: "GDPR" }
                  ]
                }
              ].map((infra, i) => (
                <GlassCard key={i} className="p-6 bg-white/70">
                  <div className="text-center mb-4">
                    <div className="w-14 h-14 mx-auto mb-3 bg-orange-100 rounded-2xl flex items-center justify-center">
                      <infra.icon className="w-7 h-7 text-orange-600" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">{infra.category}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {infra.partners.map((partner, j) => (
                      <div key={j} className="border-l-2 border-orange-200 pl-3">
                        <div className="font-medium text-sm text-gray-900">{partner.name}</div>
                        <div className="text-xs text-gray-600">{partner.region}</div>
                        <div className="text-xs text-orange-600 font-medium">{partner.cert}</div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* German Compliance & Data Protection */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Deutsche Compliance & Datenschutz</h2>
              <p className="text-gray-600 text-lg">Alle Partner erfüllen deutsche und europäische Datenschutzstandards</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Zertifizierungen & Standards</h3>
                <div className="space-y-4">
                  {[
                    { cert: "DSGVO / GDPR", desc: "Vollständige Einhaltung der Datenschutz-Grundverordnung" },
                    { cert: "SOC 2 Type II", desc: "Sicherheit, Verfügbarkeit und Vertraulichkeit" },
                    { cert: "BSI C5", desc: "Bundesamt für Sicherheit in der Informationstechnik" },
                    { cert: "TISAX", desc: "Automotive-Sicherheitsstandard" }
                  ].map((cert, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{cert.cert}</h4>
                        <p className="text-sm text-gray-600">{cert.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <GlassCard className="p-8 bg-green-50/80">
                <h4 className="text-xl font-bold mb-4 text-green-800">Datenschutz-Garantien</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-green-800">Deutsche Server</div>
                      <div className="text-sm text-green-700">Alle Daten bleiben in Deutschland</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Database className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-green-800">Ende-zu-Ende Verschlüsselung</div>
                      <div className="text-sm text-green-700">AES-256 Verschlüsselung für alle Daten</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Network className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-green-800">Keine Datenweitergabe</div>
                      <div className="text-sm text-green-700">Ihre Daten gehören nur Ihnen</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-green-800">EU-Datenschutzrecht</div>
                      <div className="text-sm text-green-700">Unterliegt deutschem Recht</div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Integration Ecosystem */}
        <section className="py-20 px-4 bg-white/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Integration Ecosystem</h2>
              <p className="text-gray-600 text-lg">Nahtlose Verbindung zu Ihren bestehenden Systemen</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { category: "CRM", tools: ["Salesforce", "HubSpot", "Pipedrive", "Zoho"] },
                { category: "Kalender", tools: ["Google Calendar", "Outlook", "CalDAV", "iCal"] },
                { category: "Hotel PMS", tools: ["Oracle", "Sihot", "Amadeus", "Protel"] },
                { category: "Restaurant", tools: ["OpenTable", "Resmio", "TableAgent", "Bookatable"] },
                { category: "Medizin", tools: ["Doctolib", "Jameda", "TurboMed", "CGM"] },
                { category: "E-Commerce", tools: ["Shopify", "WooCommerce", "Magento", "SAP"] },
                { category: "Kommunikation", tools: ["Slack", "Teams", "WhatsApp", "Telegram"] },
                { category: "Zahlungen", tools: ["Stripe", "PayPal", "Klarna", "SEPA"] }
              ].map((eco, i) => (
                <GlassCard key={i} className="p-4 bg-white/60 hover:bg-white/80 transition-all">
                  <h4 className="font-bold text-center mb-3 text-gray-900">{eco.category}</h4>
                  <div className="space-y-1">
                    {eco.tools.map((tool, j) => (
                      <div key={j} className="text-sm text-gray-600 text-center">{tool}</div>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 text-center">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Vertrauen Sie auf bewährte Technologie</h2>
            <p className="text-xl text-gray-600 mb-10">
              Erleben Sie, wie Sailly mit Ihren bestehenden Systemen zusammenarbeitet.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/demo`}>
                <button className="bg-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-purple-700 shadow-xl shadow-purple-200 hover:-translate-y-1 transition-all flex items-center gap-2">
                  <Network className="w-5 h-5" />
                  Integration Demo
                </button>
              </Link>
              <Link href={`/${locale}/produkt/integrationen`}>
                <button className="bg-white text-gray-700 border border-gray-200 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all flex items-center gap-2">
                  Alle Integrationen <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}