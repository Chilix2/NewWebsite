import { getDictionary } from "@/lib/dictionary";
import { Activity, ArrowRight, CheckCircle, Code, GitBranch, Layers, MousePointerClick, Play } from "lucide-react";
import Link from "next/link";
import { FluidBackground } from "@/components/fluid-background";

export default async function ProduktWorkflowBuilderPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = dict?.workflow_builder_page;

  return (
    <div className="min-h-screen bg-[#faf9f8] font-sans text-gray-900 overflow-x-hidden selection:bg-pink-100 selection:text-pink-900">
      <FluidBackground />
      
      <main className="relative z-10 pt-24 pb-16">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 text-center max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/50 px-4 py-1.5 rounded-full text-sm font-bold mb-8 shadow-sm text-pink-600 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Activity className="w-5 h-5" />
            {t?.badge || "WORKFLOW BUILDER"}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-gray-900 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            {t?.heading_part1 || "Visueller"} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-coral-500 to-purple-600">
              {t?.heading_part2 || "Workflow-Builder"}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {t?.subtitle || "Erstellen Sie komplexe Workflows mit unserem intuitiven Drag-and-Drop Builder."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link href={`/${locale}/demo`}>
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_10px_40px_-10px_rgba(236,72,153,0.5)] hover:scale-105 transition-all duration-300">
                {t?.cta || "Builder testen"} <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <span className="glass-pill-badge glass-pill-badge-blue">Features</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white text-shadow-md">
                {t?.features_title || "Alles was Sie brauchen"}
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">
                {t?.features_subtitle || "Ein leistungsstarker Builder für professionelle Workflows"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-panel-ultimate p-8 group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/40 border border-amber-500/30 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <MousePointerClick className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t?.f1_title || "Drag & Drop"}</h3>
                <p className="text-white/70 leading-relaxed">{t?.f1_desc || "Intuitives Drag-and-Drop Interface."}</p>
              </div>

              <div className="glass-panel-ultimate p-8 group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/40 border border-purple-500/30 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Layers className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t?.f2_title || "Viele Komponenten"}</h3>
                <p className="text-white/70 leading-relaxed">{t?.f2_desc || "Hunderte von vorgefertigten Komponenten."}</p>
              </div>

              <div className="glass-panel-ultimate p-8 group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-600/40 border border-green-500/30 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t?.f3_title || "Live-Testing"}</h3>
                <p className="text-white/70 leading-relaxed">{t?.f3_desc || "Testen Sie Ihre Workflows direkt im Builder."}</p>
              </div>

              <div className="glass-panel-ultimate p-8 group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/40 border border-orange-500/30 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Code className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t?.f4_title || "Code-Editor"}</h3>
                <p className="text-white/70 leading-relaxed">{t?.f4_desc || "Erweiterte Funktionalität mit eingebautem Code-Editor."}</p>
              </div>

              <div className="glass-panel-ultimate p-8 group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/40 border border-cyan-500/30 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <GitBranch className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t?.f5_title || "Versionierung"}</h3>
                <p className="text-white/70 leading-relaxed">{t?.f5_desc || "Vollständige Versionskontrolle für alle Workflows."}</p>
              </div>

              <div className="glass-panel-ultimate p-8 group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-pink-600/40 border border-pink-500/30 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t?.f6_title || "Validierung"}</h3>
                <p className="text-white/70 leading-relaxed">{t?.f6_desc || "Automatische Validierung und Fehlerprüfung."}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Template Library Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <span className="glass-pill-badge glass-pill-badge-purple">Templates</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white text-shadow-md">
                {t?.tpl_title || "Template-Bibliothek"}
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">
                {t?.tpl_subtitle || "Starten Sie mit vorgefertigten Workflow-Templates"}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-panel-ultimate p-8">
                <h3 className="text-xl font-bold text-white mb-4">{t?.t1_title || "Dokumentenverarbeitung"}</h3>
                <p className="text-white/70 leading-relaxed mb-4">{t?.t1_desc || "Templates für automatische Dokumentenverarbeitung."}</p>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />PDF-Verarbeitung</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />E-Mail-Verarbeitung</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />Formular-Extraktion</li>
                </ul>
              </div>

              <div className="glass-panel-ultimate p-8">
                <h3 className="text-xl font-bold text-white mb-4">{t?.t2_title || "Datenintegration"}</h3>
                <p className="text-white/70 leading-relaxed mb-4">{t?.t2_desc || "Verbinden Sie Systeme und synchronisieren Sie Daten automatisch."}</p>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />API-Integrationen</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />Datenbank-Sync</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />Cloud-Services</li>
                </ul>
              </div>

              <div className="glass-panel-ultimate p-8">
                <h3 className="text-xl font-bold text-white mb-4">{t?.t3_title || "KI & Automatisierung"}</h3>
                <p className="text-white/70 leading-relaxed mb-4">{t?.t3_desc || "Nutzen Sie KI für intelligente Automatisierung."}</p>
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
              {t?.cta_title || "Bereit zum Erstellen?"}
            </h2>
            <p className="text-xl text-white/90 mb-10 font-medium">
              {t?.cta_subtitle || "Starten Sie noch heute mit dem Workflow-Builder."}
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
