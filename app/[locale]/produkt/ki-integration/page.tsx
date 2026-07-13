import { getDictionary } from "@/lib/dictionary";
import { ArrowRight, Network, MessageSquare, Image, FileText, CheckCircle, Activity, Sparkles } from "lucide-react";
import Link from "next/link";
import { FluidBackground } from "@/components/fluid-background";

export default async function ProduktKiIntegrationPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = dict?.ki_integration_page;

  return (
    <div className="min-h-screen bg-[#faf9f8] font-sans text-gray-900 overflow-x-hidden selection:bg-pink-100 selection:text-pink-900">
      <FluidBackground />
      
      <main className="relative z-10 pt-24 pb-16">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 text-center max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/50 px-4 py-1.5 rounded-full text-sm font-bold mb-8 shadow-sm text-pink-600 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Network className="w-5 h-5" />
            {t?.badge || "KI INTEGRATION"}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-gray-900 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            {t?.heading_part1 || "KI-Integration"} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-coral-500 to-purple-600">
              {t?.heading_part2 || "für Ihr Business"}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {t?.subtitle || "Nutzen Sie die Power moderner KI-Modelle direkt in Ihren Workflows."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link href={`/${locale}/demo`}>
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_10px_40px_-10px_rgba(236,72,153,0.5)] hover:scale-105 transition-all duration-300">
                {t?.cta || "KI-Features erkunden"} <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </section>

        {/* AI Capabilities Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <span className="glass-pill-badge glass-pill-badge-purple">KI-Funktionen</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white text-shadow-md">
                {t?.models_title || "Unterstützte KI-Modelle"}
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">
                {t?.models_subtitle || "Die besten Modelle für jeden Anwendungsfall"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-panel-ultimate p-8 group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/40 border border-amber-500/30 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">NLP & Textanalyse</h3>
                <p className="text-white/70 leading-relaxed">Verstehen und verarbeiten Sie Text mit modernen Sprachmodellen. Sentiment-Analyse, Extraktion, Übersetzung.</p>
              </div>

              <div className="glass-panel-ultimate p-8 group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/40 border border-purple-500/30 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Image className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Bilderkennung</h3>
                <p className="text-white/70 leading-relaxed">Analysieren Sie Bilder und Dokumente mit Computer Vision. Objekterkennung, OCR, Klassifizierung.</p>
              </div>

              <div className="glass-panel-ultimate p-8 group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-600/40 border border-green-500/30 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Chatbots & Assistenten</h3>
                <p className="text-white/70 leading-relaxed">Erstellen Sie intelligente Chatbots für Kundeninteraktionen.</p>
              </div>

              <div className="glass-panel-ultimate p-8 group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/40 border border-orange-500/30 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Dokumentenanalyse</h3>
                <p className="text-white/70 leading-relaxed">Automatische Analyse und Extraktion von Informationen aus Dokumenten.</p>
              </div>

              <div className="glass-panel-ultimate p-8 group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/40 border border-cyan-500/30 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Generative KI</h3>
                <p className="text-white/70 leading-relaxed">Nutzen Sie generative KI für Content-Erstellung und kreative Aufgaben.</p>
              </div>

              <div className="glass-panel-ultimate p-8 group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-pink-600/40 border border-pink-500/30 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Activity className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Automatische Entscheidungen</h3>
                <p className="text-white/70 leading-relaxed">KI-gestützte Entscheidungsfindung für komplexe Geschäftsprozesse.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Models Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <span className="glass-pill-badge glass-pill-badge-blue">Integrationen</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white text-shadow-md">
                {t?.features_title || "Integration Features"}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-panel-ultimate p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Cloud-basierte Modelle</h3>
                <p className="text-white/80 leading-relaxed mb-4">Nutzen Sie die Power führender Cloud-KI-Dienste direkt in Ihren Workflows.</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-white/70"><CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span>OpenAI GPT, Claude, Gemini</span></li>
                  <li className="flex items-start gap-3 text-white/70"><CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span>Azure Cognitive Services</span></li>
                  <li className="flex items-start gap-3 text-white/70"><CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span>AWS AI Services</span></li>
                  <li className="flex items-start gap-3 text-white/70"><CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span>Google Cloud AI</span></li>
                </ul>
              </div>

              <div className="glass-panel-ultimate p-8">
                <h3 className="text-2xl font-bold text-white mb-4">On-Premise & Open Source</h3>
                <p className="text-white/80 leading-relaxed mb-4">Nutzen Sie Open-Source-Modelle für maximale Kontrolle und Datenschutz.</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-white/70"><CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span>Llama, Mistral, Falcon</span></li>
                  <li className="flex items-start gap-3 text-white/70"><CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span>Hugging Face Models</span></li>
                  <li className="flex items-start gap-3 text-white/70"><CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span>Custom Model Deployment</span></li>
                  <li className="flex items-start gap-3 text-white/70"><CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span>Self-hosted Inference</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto glass-panel-ultimate p-8 sm:p-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-shadow-md">
              {t?.cta_title || "Bereit für KI-Power?"}
            </h2>
            <p className="text-xl text-white/90 mb-10 font-medium">
              {t?.cta_subtitle || "Starten Sie noch heute und entfesseln Sie das Potenzial Ihrer Daten mit KI."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/demo`}>
                <button className="bg-white text-amber-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition-all hover:scale-105 shadow-lg">
                  {t?.demo_cta || "Demo anfordern"}
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
