import { getDictionary } from "@/lib/dictionary";
import { ArrowRight, Calendar, Clock, TrendingUp, Zap, Building2, Award, Users } from "lucide-react";
import Link from "next/link";

export default async function LocaleNewsPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const newsItems = [
    {
      title: "QORTEX 3.0 Launch: Die Zukunft der Workflow-Automatisierung",
      excerpt: "Heute stellen wir QORTEX 3.0 vor - mit revolutionären KI-Features, verbesserter Performance und noch einfacherer Bedienung.",
      date: "15. Dezember 2024",
      category: "Product Launch",
      icon: Zap,
      color: "from-amber-600 to-amber-500",
      featured: true
    },
    {
      title: "Neue Partnerschaft mit Microsoft Deutschland",
      excerpt: "QORTEX wird offizieller Partner im Microsoft Partner Network und erweitert Azure-Integrationen.",
      date: "10. Dezember 2024",
      category: "Partnership",
      icon: Building2,
      color: "from-green-600 to-green-500"
    },
    {
      title: "QORTEX gewinnt German AI Award 2024",
      excerpt: "Auszeichnung in der Kategorie 'Best Enterprise AI Solution' für innovative Workflow-Automatisierung.",
      date: "5. Dezember 2024",
      category: "Award",
      icon: Award,
      color: "from-purple-600 to-purple-500"
    },
    {
      title: "10.000+ aktive Nutzer erreicht",
      excerpt: "Meilenstein: Über 10.000 Unternehmen nutzen bereits QORTEX für ihre Automatisierungsprojekte.",
      date: "1. Dezember 2024",
      category: "Milestone",
      icon: Users,
      color: "from-orange-600 to-orange-500"
    },
    {
      title: "Neue Banking-Compliance Features",
      excerpt: "Erweiterte Compliance-Tools für Banken und Finanzdienstleister jetzt verfügbar.",
      date: "28. November 2024",
      category: "Feature Update",
      icon: TrendingUp,
      color: "from-cyan-600 to-cyan-500"
    },
    {
      title: "QORTEX Academy startet mit 50+ Kursen",
      excerpt: "Umfassendes Lernprogramm für Workflow-Automatisierung jetzt kostenlos verfügbar.",
      date: "20. November 2024",
      category: "Education",
      icon: Zap,
      color: "from-red-600 to-red-500"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">

      <main className="relative z-10 pt-24 pb-16">
        {/* Header */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-ultimate border-white/40 text-white text-xs font-bold tracking-widest uppercase shadow-lg backdrop-blur-md mb-8">
              <Calendar className="w-4 h-4" />
              {dict?.news_page?.badge || "NEWS"}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-shadow-md text-white mb-6">
              {dict?.news_page?.title || "Neuigkeiten & Updates"}
            </h1>
            
            <p className="text-lg sm:text-xl text-amber-50/90 leading-relaxed max-w-3xl mx-auto font-medium text-shadow-sm mb-12">
              {dict?.news_page?.subtitle || "Bleiben Sie auf dem Laufenden über die neuesten Entwicklungen bei Sailly."}
            </p>
          </div>
        </section>

        {/* Featured News */}
        {newsItems.filter(item => item.featured).map((item, index) => (
          <section key={index} className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="glass-panel-ultimate p-8 sm:p-12 rounded-3xl border border-white/20 backdrop-blur-md">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-amber-200 uppercase tracking-wide">{item.category}</div>
                        <div className="text-sm text-amber-50/80 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {item.date}
                        </div>
                      </div>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                      {item.title}
                    </h2>
                    
                    <p className="text-lg text-amber-50/90 leading-relaxed">
                      {item.excerpt}
                    </p>
                    
                    <Link href={`/${locale}/blog`}>
                      <button className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-amber-500/30 hover:scale-105 transition-all duration-300 border border-white/20">
                        {dict?.news_page?.read_more || "Mehr erfahren"} <ArrowRight className="w-5 h-5" />
                      </button>
                    </Link>
                  </div>
                  
                  <div className="relative">
                    <div className={`w-full h-64 sm:h-80 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                      <item.icon className="w-24 h-24 text-white/30" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* News Grid */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                {dict?.news_page?.all_news || "Weitere Neuigkeiten"}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems.filter(item => !item.featured).map((item, index) => (
                <article key={index} className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center`}>
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-amber-200 uppercase tracking-wide">{item.category}</div>
                        <div className="text-xs text-amber-50/70 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {item.date}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-amber-50/80 text-sm leading-relaxed">
                      {item.excerpt}
                    </p>
                    
                    <Link href={`/${locale}/blog`} className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 text-sm font-medium transition-colors">
                      {dict?.news_page?.read_more || "Weiterlesen"} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-panel-ultimate p-12 rounded-3xl border border-white/20 backdrop-blur-md">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Verpassen Sie keine Updates
              </h2>
              <p className="text-lg text-amber-50/90 mb-8 max-w-2xl mx-auto">
                Abonnieren Sie unseren Newsletter und erhalten Sie die neuesten Nachrichten direkt in Ihr Postfach.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Ihre E-Mail-Adresse"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-amber-50/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-amber-500/30 hover:scale-105 transition-all duration-300 border border-white/20">
                  Abonnieren
                </button>
              </div>
              
              <p className="text-xs text-amber-50/60 mt-4">
                Keine Spam-Mails. Jederzeit abbestellbar.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}