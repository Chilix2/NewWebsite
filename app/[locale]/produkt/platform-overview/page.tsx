import { getDictionary } from "@/lib/dictionary";
import { Activity, ArrowRight, CheckCircle2, PlayCircle } from "lucide-react";
import Link from "next/link";
import { SaillyIcon } from "@/components/sailly-icon";
import { WorkflowAnimationSequence } from "@/components/workflow-animation-sequence";
import { SaillyConversationPreview } from "@/components/sailly-conversation-preview";
import { SaillyDashboardPreview } from "@/components/sailly-dashboard-preview";
import { GlassCard } from "@/components/ui/glass-card";
import { ComplianceCertificates } from "@/components/compliance-certificates";
import { FluidBackground } from "@/components/fluid-background";

export default async function PlatformOverviewPage({ 
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
        
        {/* 1. Hero Section */}
        <section className="pt-32 pb-20 px-4 text-center max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/50 px-4 py-1.5 rounded-full text-sm font-bold mb-8 shadow-sm text-pink-600 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <SaillyIcon size="sm" state="idle" className="w-5 h-5" />
            {dict?.produkt_page?.badge || "Sailly Voice Agent"}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-gray-900 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            {dict?.produkt_page?.hero?.title_part1 || "Nicht nur KI."} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-coral-500 to-purple-600">
              {dict?.produkt_page?.hero?.title_part2 || "Ein echtes Teammitglied."}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {dict?.produkt_page?.hero?.description || "Sailly ist kein Anrufbeantworter. Sie hört zu, versteht und arbeitet wie eine menschliche Kollegin – rund um die Uhr."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
             <Link href={`/${locale}/demo`}>
               <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-[0_10px_40px_-10px_rgba(236,72,153,0.5)] hover:scale-105 transition-all flex items-center gap-2">
                 {dict?.produkt_page?.hero?.cta_hire || "Sailly jetzt einstellen"} <ArrowRight className="w-5 h-5" />
               </button>
             </Link>
             <button className="bg-white/80 backdrop-blur-sm text-gray-700 border border-white/50 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white transition-all flex items-center gap-2">
               <PlayCircle className="w-5 h-5 text-gray-400" />
               {dict?.produkt_page?.hero?.cta_demo || "Demo ansehen"}
             </button>
          </div>
        </section>

        {/* 2. How It Works - Glass Workflow */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{dict?.produkt_page?.how_it_works?.title || "So funktioniert Sailly"}</h2>
              <p className="text-gray-600 text-lg">{dict?.produkt_page?.how_it_works?.subtitle || "Intelligent, vernetzt und einfach."}</p>
            </div>
            
            <WorkflowAnimationSequence />
          </div>
        </section>

        {/* 3. Dashboard / Intelligence - Glass Cards */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <GlassCard variant="light" intensity="lg" className="p-8 md:p-12 rounded-[2.5rem] bg-white/40 border-white/60">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                   <div className="inline-block p-3 rounded-2xl bg-pink-100 text-pink-600 mb-6">
                     <Activity className="w-6 h-6" />
                   </div>
                   <h2 className="text-3xl md:text-4xl font-bold mb-6">Sie behält den Überblick</h2>
                   <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                     Während Sailly telefoniert, analysiert sie jedes Gespräch. Sie erhalten Live-Einblicke in die Kundenzufriedenheit, häufige Fragen und gebuchte Termine.
                   </p>
                   
                   <div className="space-y-6">
                     {[
                       { title: "Echtzeit-Analyse", desc: "Erkennt Stimmung und Dringlichkeit sofort." },
                       { title: "Nahtlose Integration", desc: "Verbindet sich direkt mit Ihrem CRM." },
                       { title: "Lernfähig", desc: "Wird mit jedem Gespräch intelligenter." }
                     ].map((item, i) => (
                       <div key={i} className="flex gap-4">
                         <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-green-500">
                           <CheckCircle2 className="w-5 h-5" />
                         </div>
                         <div>
                           <h4 className="font-bold text-gray-900">{item.title}</h4>
                           <p className="text-gray-500 text-sm">{item.desc}</p>
                         </div>
                       </div>
                     ))}
                   </div>
                </div>
                
                <div className="relative">
                  {/* The Dashboard Component */}
                  <SaillyDashboardPreview dict={dict} locale={locale} />
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* 4. Natural Conversation - Phone Style */}
        <section className="py-24 overflow-hidden">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative flex justify-center">
               <div className="absolute inset-0 bg-gradient-to-tr from-pink-200 to-purple-200 blur-[60px] opacity-40 rounded-full scale-110" />
               <SaillyConversationPreview dict={dict} />
            </div>

            <div className="order-1 md:order-2">
               <h2 className="text-3xl md:text-4xl font-bold mb-6">Sie spricht Ihre Sprache</h2>
               <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                 Kunden merken oft nicht einmal, dass sie mit einer KI sprechen. Sailly beherrscht Smalltalk, versteht Dialekte und bleibt auch in stressigen Situationen freundlich.
               </p>
               
               <div className="grid grid-cols-2 gap-4">
                  <GlassCard className="p-4 text-center">
                     <div className="text-3xl font-bold text-pink-500 mb-1">40+</div>
                     <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Sprachen</div>
                  </GlassCard>
                  <GlassCard className="p-4 text-center">
                     <div className="text-3xl font-bold text-purple-500 mb-1">&lt;200ms</div>
                     <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Reaktionszeit</div>
                  </GlassCard>
               </div>
            </div>
          </div>
        </section>

        {/* 5. Trust — Sierra-style compliance badges */}
        <section className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {dict?.security_trust?.title || "Höchste Standards für deutsche Unternehmen"}
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-12">
              {dict?.security_trust?.subtitle ||
                "Sailly wurde mit höchstem Anspruch an Vertrauen, Sicherheit und Compliance entwickelt."}
            </p>
            <ComplianceCertificates size="lg" />
          </div>
        </section>

        {/* 6. Final CTA */}
        <section className="py-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-50/50 pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto px-4">
            <SaillyIcon size="xl" state="speaking" className="mx-auto mb-8" />
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Bereit für das nächste Level?</h2>
            <p className="text-xl text-gray-600 mb-10">
              Testen Sie Sailly noch heute kostenlos und erleben Sie den Unterschied.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/demo`}>
                <button className="bg-pink-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-pink-700 shadow-xl shadow-pink-200 hover:-translate-y-1 transition-all">
                  Jetzt kostenlos starten
                </button>
              </Link>
              <Link href={`/${locale}/contact`}>
                 <button className="bg-white text-gray-700 border border-gray-200 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all">
                   Kontakt aufnehmen
                 </button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
