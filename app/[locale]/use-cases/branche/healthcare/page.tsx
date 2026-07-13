import { getDictionary } from "@/lib/dictionary";
import { Activity, ArrowRight, Calendar, CheckCircle, Clock, Cpu, Database, FileText, Heart, Shield, Users } from "lucide-react";
import Link from "next/link";

export default async function BrancheHealthcarePage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="relative min-h-screen overflow-x-hidden">

      <main className="relative z-10 pt-24 pb-16">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-ultimate border-white/40 text-white text-xs font-bold tracking-widest uppercase shadow-lg backdrop-blur-md mb-8">
              <Heart className="w-4 h-4" />
              {dict?.use_cases_healthcare?.badge || "GESUNDHEITSWESEN"}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-shadow-md text-white mb-6">
              {dict?.use_cases_healthcare?.title || "Healthcare Workflow-Automatisierung"}
            </h1>
            
            <p className="text-lg sm:text-xl text-amber-50/90 leading-relaxed max-w-3xl mx-auto font-medium text-shadow-sm mb-12">
              {dict?.use_cases_healthcare?.subtitle || "Verbessern Sie die Patientenversorgung mit KI-gestützter Automatisierung - von der Terminplanung bis zur Dokumentation."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/demo`}>
                <button className="bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 transition-all duration-300 border border-white/20">
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
                Gesundheitseinrichtungen stehen unter enormem Druck durch Personalmangel und steigende Anforderungen
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Users className="w-12 h-12 text-red-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Personalmangel</h3>
                <p className="text-amber-50/80 mb-4">
                  Fachkräftemangel führt zu Überlastung und weniger Zeit für Patienten.
                </p>
                <div className="text-2xl font-bold text-red-400">200K</div>
                <p className="text-amber-50/70 text-sm">Fehlende Pflegekräfte in Deutschland</p>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <FileText className="w-12 h-12 text-yellow-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Dokumentationsaufwand</h3>
                <p className="text-amber-50/80 mb-4">
                  Ärzte und Pflegekräfte verbringen bis zu 50% ihrer Zeit mit Papierkram.
                </p>
                <div className="text-2xl font-bold text-yellow-400">50%</div>
                <p className="text-amber-50/70 text-sm">Zeit für Dokumentation</p>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Clock className="w-12 h-12 text-orange-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Wartezeiten</h3>
                <p className="text-amber-50/80 mb-4">
                  Lange Wartezeiten für Termine und Behandlungen belasten Patienten.
                </p>
                <div className="text-2xl font-bold text-orange-400">3-6</div>
                <p className="text-amber-50/70 text-sm">Monate Wartezeit bei Fachärzten</p>
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
              <p className="text-lg text-amber-50/90 max-w-3xl mx-auto">
                Digitale Transformation für bessere Patientenversorgung
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Intelligente Terminplanung</h3>
                    <p className="text-amber-50/80">
                      KI-optimierte Terminvergabe mit automatischer Ressourcenplanung und Patientenerinnerungen.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center flex-shrink-0">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Automatisierte Dokumentation</h3>
                    <p className="text-amber-50/80">
                      Spracherkennung und KI-gestützte Erstellung von Arztbriefen und Pflegedokumentation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center flex-shrink-0">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Patientenmonitoring</h3>
                    <p className="text-amber-50/80">
                      Kontinuierliche Überwachung von Vitalwerten mit automatischen Warnmeldungen bei Abweichungen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <h3 className="text-2xl font-bold text-white mb-6">Patientenaufnahme-Workflow</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                    <span className="text-amber-50/90">Online-Anmeldung erfassen</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                    <span className="text-amber-50/90">Versicherung automatisch prüfen</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                    <span className="text-amber-50/90">Patientenakte anlegen</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">4</div>
                    <span className="text-amber-50/90">Termin automatisch zuweisen</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">✓</div>
                    <span className="text-amber-50/90">Patient informieren</span>
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
                <Shield className="w-10 h-10 text-amber-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Medikationsmanagement</h3>
                <p className="text-amber-50/80 text-sm mb-4">
                  Automatische Überprüfung von Wechselwirkungen und Dosierungen.
                </p>
                <div className="text-sm text-green-400 font-semibold">95% weniger Medikationsfehler</div>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Database className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Laborintegration</h3>
                <p className="text-amber-50/80 text-sm mb-4">
                  Automatische Übertragung und Auswertung von Laborergebnissen.
                </p>
                <div className="text-sm text-green-400 font-semibold">60% schnellere Befunde</div>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Activity className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Notfall-Triage</h3>
                <p className="text-amber-50/80 text-sm mb-4">
                  KI-gestützte Ersteinschätzung und Priorisierung von Notfällen.
                </p>
                <div className="text-sm text-green-400 font-semibold">30% kürzere Wartezeiten</div>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Calendar className="w-10 h-10 text-yellow-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">OP-Planung</h3>
                <p className="text-amber-50/80 text-sm mb-4">
                  Optimale Auslastung von OP-Sälen und Ressourcenplanung.
                </p>
                <div className="text-sm text-green-400 font-semibold">25% höhere Auslastung</div>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <FileText className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Abrechnungsautomatisierung</h3>
                <p className="text-amber-50/80 text-sm mb-4">
                  Automatische Erstellung und Übermittlung von Abrechnungen.
                </p>
                <div className="text-sm text-green-400 font-semibold">90% Automatisierung</div>
              </div>

              <div className="glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <Heart className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">Patientenkommunikation</h3>
                <p className="text-amber-50/80 text-sm mb-4">
                  Automatisierte Erinnerungen, Nachsorge und Patientenaufklärung.
                </p>
                <div className="text-sm text-green-400 font-semibold">40% höhere Compliance</div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Messbare Verbesserungen
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-green-400 mb-2">60%</div>
                <p className="text-amber-50/90">Reduzierung der Dokumentationszeit</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-amber-400 mb-2">40%</div>
                <p className="text-amber-50/90">Steigerung der Patientenzufriedenheit</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-purple-400 mb-2">30%</div>
                <p className="text-amber-50/90">Effizienzsteigerung in der Verwaltung</p>
              </div>

              <div className="text-center glass-panel-ultimate p-6 rounded-2xl border border-white/20 backdrop-blur-md">
                <div className="text-3xl font-bold text-cyan-400 mb-2">95%</div>
                <p className="text-amber-50/90">Reduzierung von Fehlern</p>
              </div>
            </div>
          </div>
        </section>

        {/* Compliance Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Datenschutz & Compliance
              </h2>
              <p className="text-lg text-amber-50/90 max-w-3xl mx-auto">
                Höchste Sicherheitsstandards für sensible Gesundheitsdaten
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Shield className="w-12 h-12 text-amber-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Deutsche Standards</h3>
                <ul className="space-y-3 text-amber-50/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    DSGVO-konform
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    § 203 StGB konform
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Patientendaten-Schutz-Gesetz
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    BSI-Grundschutz
                  </li>
                </ul>
              </div>

              <div className="glass-panel-ultimate p-8 rounded-2xl border border-white/20 backdrop-blur-md">
                <Heart className="w-12 h-12 text-green-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Medizinische Standards</h3>
                <ul className="space-y-3 text-amber-50/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    HL7 FHIR kompatibel
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    IHE-Profile unterstützt
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Medizinprodukte-Verordnung
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
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">{dict?.use_cases_healthcare?.cta_page_title || "use_cases_healthcare CTA"}</h2>
              <p className="text-lg text-amber-50/90 mb-8 max-w-2xl mx-auto">
                Nutzen Sie KI-gestützte Automatisierung für effizientere Abläufe und mehr Zeit für Ihre Patienten.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/demo`}>
                  <button className="bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 transition-all duration-300 border border-white/20">{dict?.use_cases_common?.demo_cta || "Demo"} <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                
                <Link href={`/${locale}/contact`}>
                  <button className="glass-panel-ultimate border-white/40 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-300">
                    Gesundheits-IT Beratung <Heart className="w-5 h-5" />
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