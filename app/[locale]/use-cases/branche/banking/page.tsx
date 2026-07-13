import { getDictionary } from "@/lib/dictionary";
import { Activity, AlertTriangle, ArrowRight, Building2, Calendar, CheckCircle, Cpu, CreditCard, DollarSign, FileText, Lock, Shield, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { LightRays } from "@/components/light-rays";

export default async function BrancheBankingPage({ 
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
              <Building2 className="w-4 h-4" />
              {dict?.use_cases_banking?.badge || "BANKING & FINANZDIENSTLEISTUNGEN"}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-shadow-md text-white mb-6">
              {dict?.use_cases_banking?.title || "Workflow-Automatisierung für Banken"}
            </h1>
            
            <p className="text-lg sm:text-xl text-amber-50/90 leading-relaxed max-w-3xl mx-auto font-medium text-shadow-sm mb-12">
              {dict?.use_cases_banking?.subtitle || "Transformieren Sie Ihre Bankprozesse mit KI-gestützter Automatisierung - von der Kreditprüfung bis zur Compliance-Überwachung."}
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
              <p className="text-lg text-amber-50/90 max-w-3xl mx-auto">
                {dict?.use_cases_banking?.challenges_subtitle || "Banking challenges"}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <FileText className="w-12 h-12 text-red-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">{dict?.use_cases_banking?.c1_title || "Compliance Complexity"}</h3>
                <p className="text-amber-50/80 mb-4">
                  {dict?.use_cases_banking?.c1_desc || "Changing regulations require adaptation."}
                </p>
                <div className="text-2xl font-bold text-red-400">200+</div>
                <p className="text-amber-50/70 text-sm">{dict?.use_cases_banking?.c1_stat || "Regulatory changes/year"}</p>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Users className="w-12 h-12 text-yellow-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">{dict?.use_cases_banking?.c2_title || "Manual Processes"}</h3>
                <p className="text-amber-50/80 mb-4">
                  {dict?.use_cases_banking?.c2_desc || "Time-consuming manual reviews."}
                </p>
                <div className="text-2xl font-bold text-yellow-400">72h</div>
                <p className="text-amber-50/70 text-sm">{dict?.use_cases_banking?.c2_stat || "Average loan processing time"}</p>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <AlertTriangle className="w-12 h-12 text-orange-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">{dict?.use_cases_banking?.c3_title || "Risk Management"}</h3>
                <p className="text-amber-50/80 mb-4">
                  {dict?.use_cases_banking?.c3_desc || "Complex risk analysis required."}
                </p>
                <div className="text-2xl font-bold text-orange-400">€2.9B</div>
                <p className="text-amber-50/70 text-sm">{dict?.use_cases_banking?.c3_stat || "Annual fraud losses"}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                {dict?.use_cases_common?.solutions_title || "Sailly Lösungen"}
              </h2>
              <p className="text-lg text-amber-50/90 max-w-3xl mx-auto">
                {dict?.use_cases_banking?.solutions_subtitle || "Sailly solutions for banking"}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{dict?.use_cases_banking?.s1_title || "Automated Credit Check"}</h3>
                    <p className="text-amber-50/80">
                      {dict?.use_cases_banking?.s1_desc || "AI credit analysis."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Compliance-Monitoring</h3>
                    <p className="text-amber-50/80">
                      {dict?.use_cases_banking?.s2_desc || "Continuous compliance monitoring."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 flex items-center justify-center flex-shrink-0">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{dict?.use_cases_banking?.s3_title || "Intelligent Customer Service"}</h3>
                    <p className="text-amber-50/80">
                      {dict?.use_cases_banking?.s3_desc || "24/7 AI chatbots."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <h3 className="text-2xl font-bold text-white mb-6">{dict?.use_cases_banking?.workflow_title || "Credit Workflow"}</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                    <span className="text-amber-50/90">{dict?.use_cases_banking?.w1 || "Capture application"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                    <span className="text-amber-50/90">{dict?.use_cases_banking?.w2 || "AI document review"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                    <span className="text-amber-50/90">{dict?.use_cases_banking?.w3 || "Assess creditworthiness"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">4</div>
                    <span className="text-amber-50/90">{dict?.use_cases_banking?.w4 || "Calculate risk score"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">✓</div>
                    <span className="text-amber-50/90">{dict?.use_cases_banking?.w5 || "Decision in 15 min"}</span>
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
                <Lock className="w-10 h-10 text-amber-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Anti-Money Laundering</h3>
                <p className="text-amber-50/80 text-sm mb-4">
                  {dict?.use_cases_banking?.uc1_desc || "Automatic suspicious pattern detection."}
                </p>
                <div className="text-sm text-green-400 font-semibold">99.2% Erkennungsrate</div>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <FileText className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">KYC-Automatisierung</h3>
                <p className="text-amber-50/80 text-sm mb-4">
                  {dict?.use_cases_banking?.uc2_desc || "Fully automated KYC."}
                </p>
                <div className="text-sm text-green-400 font-semibold">5 Min statt 2 Stunden</div>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <TrendingUp className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Risiko-Scoring</h3>
                <p className="text-amber-50/80 text-sm mb-4">
                  {dict?.use_cases_banking?.uc3_desc || "AI risk scoring."}
                </p>
                <div className="text-sm text-green-400 font-semibold">40% weniger Ausfälle</div>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <DollarSign className="w-10 h-10 text-yellow-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Fraud Detection</h3>
                <p className="text-amber-50/80 text-sm mb-4">
                  {dict?.use_cases_banking?.uc4_desc || "Real-time fraud detection."}
                </p>
                <div className="text-sm text-green-400 font-semibold">&lt; 100ms Reaktionszeit</div>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Calendar className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Regulatory Reporting</h3>
                <p className="text-amber-50/80 text-sm mb-4">
                  {dict?.use_cases_banking?.uc5_desc || "Automated regulatory reporting."}
                </p>
                <div className="text-sm text-green-400 font-semibold">100% Compliance</div>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Users className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Kundenservice</h3>
                <p className="text-amber-50/80 text-sm mb-4">
                  {dict?.use_cases_banking?.uc6_desc || "AI-powered customer support."}
                </p>
                <div className="text-sm text-green-400 font-semibold">85% Automatisierung</div>
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
                <div className="text-3xl font-bold text-green-400 mb-2">80%</div>
                <p className="text-amber-50/90">{dict?.use_cases_banking?.b1_label || "Reduction in processing time"}</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-amber-400 mb-2">95%</div>
                <p className="text-amber-50/90">{dict?.use_cases_banking?.b2_label || "Automation rate"}</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-purple-400 mb-2">60%</div>
                <p className="text-amber-50/90">{dict?.use_cases_banking?.b3_label || "Cost savings"}</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-cyan-400 mb-2">99.8%</div>
                <p className="text-amber-50/90">{dict?.use_cases_banking?.b4_label || "Compliance rate"}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Compliance Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                {dict?.use_cases_common?.compliance_title || "Compliance"}
              </h2>
              <p className="text-lg text-amber-50/90 max-w-3xl mx-auto">
                {dict?.use_cases_banking?.reg_subtitle || "Full compliance"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Shield className="w-12 h-12 text-amber-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">{dict?.use_cases_banking?.reg1_title || "German Regulation"}</h3>
                <ul className="space-y-3 text-amber-50/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    BaFin-Compliance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    KWG-Konformität
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    GwG-Anforderungen
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    DSGVO-Konformität
                  </li>
                </ul>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Lock className="w-12 h-12 text-green-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">{dict?.use_cases_banking?.reg2_title || "International Standards"}</h3>
                <ul className="space-y-3 text-amber-50/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Basel III/IV
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    PCI-DSS Level 1
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    SOC 2 Type II
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
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                {dict?.use_cases_banking?.cta_page_title || "Digitalize your banking"}
              </h2>
              <p className="text-lg text-amber-50/90 mb-8 max-w-2xl mx-auto">
                {dict?.use_cases_banking?.cta_page_subtitle || "Start today."}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/demo`}>
                  <button className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-amber-500/30 hover:scale-105 transition-all duration-300 border border-white/20">
                    {dict?.use_cases_banking?.cta_btn || "Demo"} <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                
                <Link href={`/${locale}/contact`}>
                  <button className="glass-panel-ultimate border-white/40 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-300">
                    {dict?.use_cases_banking?.cta_contact_btn || "Consulting"} <Building2 className="w-5 h-5" />
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