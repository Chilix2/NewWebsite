import { getDictionary } from "@/lib/dictionary";
import { ArrowRight, Plug, Database, Cloud, Mail, Calendar, FileText, CheckCircle, Globe, Building2, Utensils, Stethoscope, Scale } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { FluidBackground } from "@/components/fluid-background";

export default async function ProduktIntegrationenPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const p = dict?.integrationen_page;

  return (
    <div className="min-h-screen bg-[#faf9f8] font-sans text-gray-900 overflow-x-hidden selection:bg-pink-100 selection:text-pink-900">
      <FluidBackground />

      <main className="relative z-10 pt-24 pb-16">
        {/* Hero */}
        <section className="pt-32 pb-20 px-4 text-center max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/50 px-4 py-1.5 rounded-full text-sm font-bold mb-8 shadow-sm text-pink-600 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Plug className="w-5 h-5" />
            {p?.badge || "INTEGRATIONEN"}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-gray-900 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            {p?.heading_part1 || "Verbinden Sie"} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-coral-500 to-purple-600">
              {p?.heading_part2 || "alle Ihre Systeme"}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {p?.subtitle || "Über 500+ vorgefertigte Integrationen. Nahtlos verbinden, automatisch synchronisieren."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link href={`/${locale}/demo`}>
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_10px_40px_-10px_rgba(236,72,153,0.5)] hover:scale-105 transition-all duration-300">
                {p?.cta || "Integrationen erkunden"} <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </section>

        {/* Industry-First Categories */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">{p?.industry_badge || "Branchenspezifisch"}</div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900">{p?.industry_title || "Integrationen für Ihre Branche"}</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">{p?.industry_subtitle || "Speziell für Hotellerie, Gastronomie und Gesundheitswesen"}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <GlassCard className="p-8 group bg-white/60">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <Building2 className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{p?.hotels_title || "Hotellerie"}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{p?.hotels_desc || "Nahtlose Integration in Hotel-Management-Systeme."}</p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {["Oracle Hospitality, Sihot","Amadeus, Protel, RoomRaccoon","Booking.com, Expedia"].map((item,i) => (
                    <li key={i} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />{item}</li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard className="p-8 group bg-white/60">
                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <Utensils className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{p?.restaurants_title || "Gastronomie"}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{p?.restaurants_desc || "Direkte Anbindung an Reservierungssysteme."}</p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {["OpenTable, Resmio","TableAgent, Bookatable",p?.pos_label || "POS-Systeme, Menükarten"].map((item,i) => (
                    <li key={i} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />{item}</li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard className="p-8 group bg-white/60">
                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <Stethoscope className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{p?.healthcare_title || "Gesundheitswesen"}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{p?.healthcare_desc || "DSGVO-konforme Integration in Praxisverwaltungssysteme."}</p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {["Doctolib, Jameda","TurboMed, CGM Albis",p?.praxis_label || "Praxiskalender, Rezepte"].map((item,i) => (
                    <li key={i} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />{item}</li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard className="p-8 group bg-white/60">
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <Scale className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{p?.legal_title || "Kanzleien & Steuerberatung"}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{p?.legal_desc || "DSGVO-konforme Anbindung an Kanzlei- und Terminverwaltung."}</p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {["DATEV, RA-MICRO","Actaport, Kleos",p?.legal_label || "Mandantenakte, Erstgespräche"].map((item,i) => (
                    <li key={i} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />{item}</li>
                  ))}
                </ul>
              </GlassCard>
            </div>

            {/* General Business Tools */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{p?.business_title || "Allgemeine Business-Tools"}</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <GlassCard className="p-8 group bg-white/60">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <Database className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{p?.crm_title || "CRM & Sales"}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{p?.crm_desc || "Verbindung zu Ihren Kundenmanagement-Systemen."}</p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {["Salesforce, HubSpot","Pipedrive, Zoho CRM","Microsoft Dynamics"].map((item,i) => (
                    <li key={i} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />{item}</li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard className="p-8 group bg-white/60">
                <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <Calendar className="w-7 h-7 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{p?.calendar_title || "Kalender & Termine"}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{p?.calendar_desc || "Synchronisieren Sie Kalender und verwalten Sie Termine."}</p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {["Google Calendar","Outlook Calendar","CalDAV, iCal"].map((item,i) => (
                    <li key={i} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />{item}</li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard className="p-8 group bg-white/60">
                <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <Mail className="w-7 h-7 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{p?.comm_title || "Kommunikation"}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{p?.comm_desc || "Automatisierte Benachrichtigungen und Kommunikation."}</p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {["E-Mail, SMS, WhatsApp","Slack, Microsoft Teams","Webhook, REST APIs"].map((item,i) => (
                    <li key={i} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />{item}</li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* API Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <GlassCard className="p-8 sm:p-12 bg-white/60">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{p?.api_title || "Eigene Integrationen erstellen"}</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">{p?.api_subtitle || "Nutzen Sie unsere API-Dokumentation für eigene Integrationen."}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/docs`}>
                  <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-300">
                    {p?.api_docs || "API-Dokumentation"} <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-pink-500 to-purple-600 p-8 sm:p-16 rounded-[2.5rem] text-center shadow-xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{p?.cta_title || "Bereit zum Verbinden?"}</h2>
            <p className="text-xl text-white/90 mb-10 font-medium">{p?.cta_subtitle || "Erleben Sie, wie einfach Systemintegration sein kann."}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/demo`}>
                <button className="bg-white text-purple-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all hover:scale-105 shadow-lg">
                  {p?.cta_demo || "Demo anfordern"}
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
