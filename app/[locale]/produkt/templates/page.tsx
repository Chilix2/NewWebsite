import { getDictionary } from "@/lib/dictionary";
import { ArrowRight, CheckCircle, Code, FileText, Layers, Wand2 } from "lucide-react";
import Link from "next/link";
import { FluidBackground } from "@/components/fluid-background";

export default async function ProduktTemplatesPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = dict?.templates_page;

  return (
    <div className="min-h-screen bg-[#faf9f8] font-sans text-gray-900 overflow-x-hidden selection:bg-pink-100 selection:text-pink-900">
      <FluidBackground />
      
      <main className="relative z-10 pt-24 pb-16">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 text-center max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/50 px-4 py-1.5 rounded-full text-sm font-bold mb-8 shadow-sm text-pink-600 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Wand2 className="w-5 h-5" />
            {t?.badge || "TEMPLATES"}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-gray-900 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            {t?.heading_part1 || "Vorgefertigte"} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-coral-500 to-purple-600">
              {t?.heading_part2 || "Templates"}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {t?.subtitle || "Starten Sie sofort mit professionellen Workflow-Templates."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link href={`/${locale}/demo`}>
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_10px_40px_-10px_rgba(236,72,153,0.5)] hover:scale-105 transition-all duration-300">
                {t?.cta || "Templates erkunden"} <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </section>

        {/* Why Templates Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <span className="glass-pill-badge glass-pill-badge-blue">Features</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white text-shadow-md">
                {t?.all_title || "Alle Templates"}
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">
                {t?.all_subtitle || "Sofort einsatzbereit für alle Branchen"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-panel-ultimate p-8 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 flex items-center justify-center flex-shrink-0 mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Dokumentenverarbeitung</h3>
                <p className="text-white/70 leading-relaxed mb-4">Automatisieren Sie die Verarbeitung von Dokumenten.</p>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />PDF-Extraktion</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />OCR-Verarbeitung</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />Automatische Klassifizierung</li>
                </ul>
              </div>

              <div className="glass-panel-ultimate p-8 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 flex items-center justify-center flex-shrink-0 mb-4">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Datenintegration</h3>
                <p className="text-white/70 leading-relaxed mb-4">Verbinden Sie Systeme und synchronisieren Sie Daten.</p>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />API-Integrationen</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />Datenbank-Synchronisation</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />ETL-Prozesse</li>
                </ul>
              </div>

              <div className="glass-panel-ultimate p-8 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center flex-shrink-0 mb-4">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">KI & Automatisierung</h3>
                <p className="text-white/70 leading-relaxed mb-4">Nutzen Sie KI für intelligente Automatisierung.</p>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />Textanalyse</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />Bilderkennung</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />Automatische Klassifizierung</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto glass-panel-ultimate p-8 sm:p-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-shadow-md">
              {t?.cta_title || "Ihr Template nicht dabei?"}
            </h2>
            <p className="text-xl text-white/90 mb-10 font-medium">
              {t?.cta_subtitle || "Erstellen Sie Ihr eigenes Template oder lassen Sie sich von uns helfen."}
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
