import { getDictionary } from "@/lib/dictionary";
import { ArrowRight, Shield, Lock, CheckCircle, FileCheck, Eye, Key, Server } from "lucide-react";
import Link from "next/link";
import { ComplianceCertificates } from "@/components/compliance-certificates";
import { GlassCard } from "@/components/ui/glass-card";
import { FluidBackground } from "@/components/fluid-background";

export default async function ProduktSecurityCompliancePage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = dict?.security_compliance_page;

  return (
    <div className="min-h-screen bg-[#faf9f8] font-sans text-gray-900 overflow-x-hidden selection:bg-pink-100 selection:text-pink-900">
      <FluidBackground />

      <main className="relative z-10 pt-24 pb-16">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 text-center max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/50 px-4 py-1.5 rounded-full text-sm font-bold mb-8 shadow-sm text-pink-600 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Shield className="w-5 h-5" />
            {t?.badge || "SECURITY & COMPLIANCE"}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-gray-900 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            {t?.heading_part1 || "Maximale Sicherheit"} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-coral-500 to-purple-600">
              {t?.heading_part2 || "für Ihr Unternehmen"}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {t?.subtitle || "Ihre Daten sind sicher bei uns."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link href={`/${locale}/demo`}>
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_10px_40px_-10px_rgba(236,72,153,0.5)] hover:scale-105 transition-all duration-300">
                {t?.cta || "Sicherheit erkunden"} <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </section>

        {/* Security Features Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">{t?.sec_badge || "Sicherheit"}</div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                {t?.sec_title || "Umfassende Sicherheitsfeatures"}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                {t?.sec_subtitle || "Mehrschichtige Sicherheit auf allen Ebenen"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <GlassCard className="p-8 group bg-white/60">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <Lock className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t?.f1_title || "Verschlüsselung"}</h3>
                <p className="text-gray-600 leading-relaxed">{t?.f1_desc || "End-to-End Verschlüsselung für Daten in Transit und at Rest. AES-256."}</p>
              </GlassCard>

              <GlassCard className="p-8 group bg-white/60">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <Key className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t?.f2_title || "Access Control"}</h3>
                <p className="text-gray-600 leading-relaxed">{t?.f2_desc || "Granulare Berechtigungen und Rollenverwaltung."}</p>
              </GlassCard>

              <GlassCard className="p-8 group bg-white/60">
                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <Eye className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t?.f3_title || "Audit Logging"}</h3>
                <p className="text-gray-600 leading-relaxed">{t?.f3_desc || "Vollständige Audit-Logs für alle Aktionen."}</p>
              </GlassCard>

              <GlassCard className="p-8 group bg-white/60">
                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <Server className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t?.f4_title || "Infrastruktur"}</h3>
                <p className="text-gray-600 leading-relaxed">{t?.f4_desc || "Sichere Cloud-Infrastruktur oder On-Premise Deployment."}</p>
              </GlassCard>

              <GlassCard className="p-8 group bg-white/60">
                <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <Shield className="w-7 h-7 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t?.f5_title || "Threat Protection"}</h3>
                <p className="text-gray-600 leading-relaxed">{t?.f5_desc || "Automatische Bedrohungserkennung und Schutz vor Angriffen."}</p>
              </GlassCard>

              <GlassCard className="p-8 group bg-white/60">
                <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <FileCheck className="w-7 h-7 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t?.f6_title || "Backup & Recovery"}</h3>
                <p className="text-gray-600 leading-relaxed">{t?.f6_desc || "Automatische Backups und Disaster Recovery."}</p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Compliance badges — Sierra-style */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t?.comp_title || "Zertifizierungen & Compliance"}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
              {t?.comp_subtitle || "Erfüllung aller wichtigen Standards und Vorschriften"}
            </p>
            <ComplianceCertificates size="lg" />
          </div>
        </section>

        {/* Compliance details */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <GlassCard className="p-8 bg-white/60">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t?.dp_title || "Datenschutz"}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{t?.dp_desc || "Vollständige Einhaltung der Datenschutzbestimmungen."}</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-600"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span>DSGVO (GDPR) konform</span></li>
                  <li className="flex items-start gap-3 text-gray-600"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span>CCPA konform</span></li>
                  <li className="flex items-start gap-3 text-gray-600"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span>Schweizer DSG konform</span></li>
                </ul>
              </GlassCard>

              <GlassCard className="p-8 bg-white/60">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t?.cert_title || "Zertifizierungen"}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{t?.cert_desc || "International anerkannte Sicherheits- und Qualitätsstandards."}</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-600"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span>SOC 2 Type II</span></li>
                  <li className="flex items-start gap-3 text-gray-600"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span>ISO 9001 Qualitätsmanagement</span></li>
                </ul>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Data Control Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <span className="glass-pill-badge glass-pill-badge-blue">Datenschutz</span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                {t?.data_ctrl_title || "Ihre Daten, Ihre Kontrolle"}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                {t?.data_ctrl_subtitle || "Maximale Kontrolle über Ihre Daten"}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <GlassCard className="p-8 text-center bg-white/60">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4"><Lock className="w-8 h-8 text-amber-600" /></div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t?.dr_title || "Datenresidenz"}</h3>
                <p className="text-gray-600 leading-relaxed">{t?.dr_desc || "Wählen Sie, wo Ihre Daten gespeichert werden."}</p>
              </GlassCard>

              <GlassCard className="p-8 text-center bg-white/60">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"><Shield className="w-8 h-8 text-green-600" /></div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t?.dm_title || "Datenminimierung"}</h3>
                <p className="text-gray-600 leading-relaxed">{t?.dm_desc || "Wir sammeln nur die Daten, die für den Service notwendig sind."}</p>
              </GlassCard>

              <GlassCard className="p-8 text-center bg-white/60">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4"><FileCheck className="w-8 h-8 text-purple-600" /></div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t?.del_title || "Recht auf Löschung"}</h3>
                <p className="text-gray-600 leading-relaxed">{t?.del_desc || "Vollständige Kontrolle über Ihre Daten."}</p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-pink-500 to-purple-600 p-8 sm:p-16 rounded-[2.5rem] text-center shadow-xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {t?.cta_title || "Sicherheit, die Sie vertrauen können"}
            </h2>
            <p className="text-xl text-white/90 mb-10 font-medium">
              {t?.cta_subtitle || "Erfahren Sie mehr über unsere Sicherheitsmaßnahmen."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/demo`}>
                <button className="bg-white text-purple-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all hover:scale-105 shadow-lg">
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
