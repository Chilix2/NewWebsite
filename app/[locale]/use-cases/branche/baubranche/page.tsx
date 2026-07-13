import { getDictionary } from "@/lib/dictionary";
import { Activity, ArrowRight, Calendar, CheckCircle, Clock, Cpu, Database, FileText, HardHat, Shield, Users, Wrench } from "lucide-react";
import Link from "next/link";
import { LightRays } from "@/components/light-rays";

export default async function BrancheBaubranchePage({ 
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
              <HardHat className="w-4 h-4" />
              {dict?.use_cases_baubranche?.badge || "BAUBRANCHE"}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-shadow-md text-white mb-6">
              {dict?.use_cases_baubranche?.title || "Digitale Bauprozesse mit QORTEX"}
            </h1>
            
            <p className="text-lg sm:text-xl text-amber-50/90 leading-relaxed max-w-3xl mx-auto font-medium text-shadow-sm mb-12">
              {dict?.use_cases_baubranche?.subtitle || "Revolutionieren Sie Ihre Bauprojekte mit KI-gestützter Automatisierung - von der Planung bis zur Abnahme."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/demo`}>
                <button className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-amber-500/30 hover:scale-105 transition-all duration-300 border border-white/20">
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
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Clock className="w-12 h-12 text-red-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Project Delays</h3>
                <p className="text-amber-50/80 mb-4">
                  Bauprojekte überschreiten regelmäßig Zeit- und Kostenpläne.
                </p>
                <div className="text-2xl font-bold text-red-400">70%</div>
                <p className="text-amber-50/70 text-sm">Projects delayed</p>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <FileText className="w-12 h-12 text-yellow-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Document Chaos</h3>
                <p className="text-amber-50/80 mb-4">
                  Pläne, Genehmigungen und Änderungen sind schwer zu verwalten.
                </p>
                <div className="text-2xl font-bold text-yellow-400">1000+</div>
                <p className="text-amber-50/70 text-sm">Documents per project</p>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Users className="w-12 h-12 text-orange-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Coordination Issues</h3>
                <p className="text-amber-50/80 mb-4">
                  Kommunikation zwischen Gewerken ist oft ineffizient.
                </p>
                <div className="text-2xl font-bold text-orange-400">20+</div>
                <p className="text-amber-50/70 text-sm">Parties per project</p>
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
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 flex items-center justify-center flex-shrink-0">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Intelligent Plan Review</h3>
                    <p className="text-amber-50/80">
                      AI analyzes plans automatically.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 flex items-center justify-center flex-shrink-0">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Automated Material Procurement</h3>
                    <p className="text-amber-50/80">
                      Orders are triggered automatically.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Quality Control</h3>
                    <p className="text-amber-50/80">
                      Automatic monitoring of progress.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <h3 className="text-2xl font-bold text-white mb-6">{dict?.use_cases_common?.solutions_title || "Project Workflow"}</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                    <span className="text-amber-50/90">Auto-check plans</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                    <span className="text-amber-50/90">Track permits</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                    <span className="text-amber-50/90">Order materials</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">4</div>
                    <span className="text-amber-50/90">Monitor progress</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">✓</div>
                    <span className="text-amber-50/90">Document acceptance</span>
                  </div>
                </div>
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
                <div className="text-3xl font-bold text-green-400 mb-2">30%</div>
                <p className="text-amber-50/90">Reduction in project time</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-amber-400 mb-2">25%</div>
                <p className="text-amber-50/90">Cost savings</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-purple-400 mb-2">90%</div>
                <p className="text-amber-50/90">Fewer planning errors</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-cyan-400 mb-2">50%</div>
                <p className="text-amber-50/90">Less rework</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-panel-ultimate p-12 rounded-3xl border border-white/20 backdrop-blur-md">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                {dict?.use_cases_baubranche?.cta_page_title || "Build smarter"}
              </h2>
              <p className="text-lg text-amber-50/90 mb-8 max-w-2xl mx-auto">
                {dict?.use_cases_baubranche?.cta_page_subtitle || "Digitalize your construction processes."}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/demo`}>
                  <button className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-amber-500/30 hover:scale-105 transition-all duration-300 border border-white/20">
                    {dict?.use_cases_common?.demo_cta || "Demo"} <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                
                <Link href={`/${locale}/contact`}>
                  <button className="glass-panel-ultimate border-white/40 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-300">
                    {dict?.use_cases_common?.contact_cta || "Consulting"} <HardHat className="w-5 h-5" />
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