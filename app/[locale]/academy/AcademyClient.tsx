"use client";

import { Card } from "@/components/ui/card";
import { getDictionary } from "@/lib/dictionary";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Play, 
  Clock, 
  Users,
  Star,
  BookOpen,
  GraduationCap,
  Award,
  TrendingUp,
  Zap,
  Code,
  Database,
  Brain,
  Shield,
  Target,
  CheckCircle
} from "lucide-react";
import { GlassIcon } from "@/components/ui/glass-icon";
import Link from "next/link";
import { useState } from "react";

export default function AcademyClient() {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "de";
  // Note: This is a client component with useState, cannot use async getDictionary
  // Hardcoded German content for now - refactor to pass dict as prop from parent
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [selectedLevel, setSelectedLevel] = useState("Alle");

  const courses = [
    {
      id: 1,
      title: "QORTEX Grundlagen",
      description: "Lernen Sie die Grundlagen der Workflow-Automatisierung mit QORTEX",
      category: "Grundlagen",
      level: "Anfänger",
      duration: "2 Stunden",
      lessons: 8,
      students: 1250,
      rating: 4.9,
      instructor: "Dr. Sarah Weber",
      price: "Kostenlos",
      image: "fundamentals",
      topics: ["Workflow-Design", "Grundlegende Automatisierung", "QORTEX Interface", "Erste Schritte"]
    },
    {
      id: 2,
      title: "KI-Integration Masterclass",
      description: "Erweiterte KI-Integration und maschinelles Lernen in Workflows",
      category: "KI & ML",
      level: "Fortgeschritten",
      duration: "6 Stunden",
      lessons: 24,
      students: 890,
      rating: 4.8,
      instructor: "Prof. Michael Chen",
      price: "€199",
      image: "ai-integration",
      topics: ["Machine Learning", "NLP Integration", "Computer Vision", "Predictive Analytics"]
    },
    {
      id: 3,
      title: "Enterprise Workflow Design",
      description: "Komplexe Enterprise-Workflows für große Organisationen entwickeln",
      category: "Enterprise",
      level: "Fortgeschritten",
      duration: "8 Stunden",
      lessons: 32,
      students: 650,
      rating: 4.7,
      instructor: "Anna Müller",
      price: "€299",
      image: "enterprise",
      topics: ["Skalierbare Architekturen", "Compliance", "Security", "Performance Optimization"]
    },
    {
      id: 4,
      title: "API Integration Workshop",
      description: "Nahtlose Integration externer APIs und Services",
      category: "Integration",
      level: "Mittel",
      duration: "4 Stunden",
      lessons: 16,
      students: 1100,
      rating: 4.6,
      instructor: "Thomas Schmidt",
      price: "€149",
      image: "api-integration",
      topics: ["REST APIs", "GraphQL", "Webhooks", "Authentication"]
    },
    {
      id: 5,
      title: "Datenanalyse & Reporting",
      description: "Automatisierte Datenanalyse und intelligente Berichtserstellung",
      category: "Datenanalyse",
      level: "Mittel",
      duration: "5 Stunden",
      lessons: 20,
      students: 780,
      rating: 4.8,
      instructor: "Dr. Lisa Hoffmann",
      price: "€179",
      image: "data-analysis",
      topics: ["Data Processing", "Visualization", "Automated Reports", "Business Intelligence"]
    },
    {
      id: 6,
      title: "Security & Compliance",
      description: "Sichere Workflows und Compliance-konforme Automatisierung",
      category: "Sicherheit",
      level: "Fortgeschritten",
      duration: "3 Stunden",
      lessons: 12,
      students: 520,
      rating: 4.9,
      instructor: "Marcus Weber",
      price: "€129",
      image: "security",
      topics: ["GDPR Compliance", "Data Encryption", "Access Control", "Audit Trails"]
    }
  ];

  const categories = ["Alle", "Grundlagen", "KI & ML", "Expert", "Integration", "Datenanalyse", "Sicherheit"];
  const levels = ["Alle", "Anfänger", "Mittel", "Fortgeschritten"];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === "Alle" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "Alle" || course.level === selectedLevel;
    return matchesCategory && matchesLevel;
  });

  const learningPaths = [
    {
      title: "Workflow Automation Specialist",
      description: "Werden Sie zum Experten für Workflow-Automatisierung",
      courses: 4,
      duration: "12 Wochen",
      level: "Anfänger bis Mittel",
      color: "blue"
    },
    {
      title: "AI Integration Expert",
      description: "Spezialisierung auf KI-gestützte Automatisierung",
      courses: 3,
      duration: "8 Wochen",
      level: "Mittel bis Fortgeschritten",
      color: "purple"
    },
    {
      title: "Enterprise Architect",
      description: "Komplexe Enterprise-Lösungen entwickeln und implementieren",
      courses: 5,
      duration: "16 Wochen",
      level: "Fortgeschritten",
      color: "green"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-soft pt-24 font-sans text-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md border-b border-white/20" />
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-900 font-semibold mb-6 backdrop-blur-sm">
              Sailly Academy
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 tracking-tight">
              Lernen Sie Workflow-Automatisierung
            </h1>
            <p className="text-xl text-slate-800 mb-8 leading-relaxed max-w-3xl mx-auto">
              Meistern Sie Sailly mit unseren expertengeleitet Kursen, praktischen Workshops 
              und strukturierten Lernpfaden. Von Grundlagen bis zu fortgeschrittenen KI-Integrationen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-lg transition-all hover:scale-105" size="lg">
                <GraduationCap className="mr-2 h-5 w-5" />
                Kostenlos starten
              </Button>
              <Button variant="outline" className="bg-white/40 hover:bg-white/60 border-white/40 text-slate-900 rounded-xl" size="lg">
                <Play className="mr-2 h-5 w-5" />
                Einführungsvideo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <section className="py-12 px-6 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 glass-card-neon bg-white/20 border-white/30 shadow-lg text-center">
              <div className="mb-4">
                <GlassIcon icon={Users} color="blue" size="lg" />
              </div>
              <div className="text-3xl font-bold text-amber-600 mb-2">15,000+</div>
              <div className="text-slate-600 font-medium">Aktive Lernende</div>
            </Card>
            <Card className="p-6 glass-card-neon bg-white/20 border-white/30 shadow-lg text-center">
              <div className="mb-4">
                <GlassIcon icon={BookOpen} color="green" size="lg" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-slate-600 font-medium">Kurse & Workshops</div>
            </Card>
            <Card className="p-6 glass-card-neon bg-white/20 border-white/30 shadow-lg text-center">
              <div className="mb-4">
                <GlassIcon icon={Award} color="purple" size="lg" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">12,000+</div>
              <div className="text-slate-600 font-medium">Zertifikate vergeben</div>
            </Card>
            <Card className="p-6 glass-card-neon bg-white/20 border-white/30 shadow-lg text-center">
              <div className="mb-4">
                <GlassIcon icon={TrendingUp} color="orange" size="lg" />
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-2">4.8/5</div>
              <div className="text-slate-600 font-medium">Durchschnittsbewertung</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Strukturierte Lernpfade</h2>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto">
              Folgen Sie unseren kuratierten Lernpfaden für eine systematische Weiterbildung
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {learningPaths.map((path, index) => (
              <Card key={index} className="p-8 glass-card-neon bg-white/20 border-white/30 hover:bg-white/30 hover:scale-[1.02] transition-all duration-300 shadow-lg">
                <div className="mb-6">
                  <GlassIcon icon={Target} color={path.color as any} size="lg" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{path.title}</h3>
                <p className="text-slate-700 mb-6 leading-relaxed">{path.description}</p>
                
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Kurse:</span>
                    <span className="font-medium">{path.courses} Kurse</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Dauer:</span>
                    <span className="font-medium">{path.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Level:</span>
                    <span className="font-medium">{path.level}</span>
                  </div>
                </div>

                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-all hover:scale-105">
                  Lernpfad starten
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Filters */}
      <section className="py-8 px-6 border-y border-white/20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Alle Kurse durchsuchen</h3>
              <p className="text-slate-600">Finden Sie den perfekten Kurs für Ihr Skill-Level und Ihre Ziele</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Kategorie</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-white/40 border border-white/30 rounded-lg text-slate-900 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Level</label>
                <select 
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-4 py-2 bg-white/40 border border-white/30 rounded-lg text-slate-900 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {filteredCourses.length} Kurse gefunden
            </h2>
            <p className="text-slate-600">
              {selectedCategory !== "Alle" && `Kategorie: ${selectedCategory}`}
              {selectedCategory !== "Alle" && selectedLevel !== "Alle" && " • "}
              {selectedLevel !== "Alle" && `Level: ${selectedLevel}`}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="glass-card-neon bg-white/20 border-white/30 hover:bg-white/30 hover:scale-[1.02] transition-all duration-300 shadow-lg overflow-hidden group">
                {/* Course Image */}
                <div className="h-48 bg-gradient-to-br from-amber-500/20 to-purple-500/20 flex items-center justify-center">
                  <GlassIcon 
                    icon={course.category === "KI & ML" ? Brain : 
                          course.category === "Integration" ? Database :
                          course.category === "Sicherheit" ? Shield :
                          course.category === "Expert" ? Target :
                          BookOpen} 
                    color="blue" 
                    size="xl" 
                  />
                </div>

                <div className="p-6">
                  {/* Course Meta */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-700 rounded-md font-medium">
                      {course.category}
                    </span>
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-700 rounded-md font-medium">
                      {course.level}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-900 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Course Stats */}
                  <div className="flex items-center justify-between mb-4 text-sm text-slate-600">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{course.lessons} Lektionen</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  {/* Instructor */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm">
                      <span className="text-slate-600">Instructor: </span>
                      <span className="font-medium text-slate-900">{course.instructor}</span>
                    </div>
                    <div className="text-sm font-bold text-amber-600">
                      {course.price}
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-1">
                      {course.topics.slice(0, 3).map((topic, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-slate-500/20 text-slate-700 rounded">
                          {topic}
                        </span>
                      ))}
                      {course.topics.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-slate-500/20 text-slate-700 rounded">
                          +{course.topics.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-all group-hover:scale-105">
                    {course.price === "Kostenlos" ? "Kostenlos starten" : "Kurs kaufen"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certification */}
      <section className="py-20 px-6 bg-white/5 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <GlassIcon icon={Award} color="gold" size="xl" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Offizielle Sailly Zertifizierung
          </h2>
          <p className="text-xl text-slate-700 mb-8 max-w-2xl mx-auto">
            Erhalten Sie anerkannte Zertifikate für abgeschlossene Kurse und Lernpfade. 
            Zeigen Sie Ihre Expertise in der Workflow-Automatisierung.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 glass-card-neon bg-white/20 border-white/30 shadow-lg">
              <div className="mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Anerkannt</h3>
              <p className="text-sm text-slate-600">Industrie-anerkannte Zertifikate</p>
            </Card>
            <Card className="p-6 glass-card-neon bg-white/20 border-white/30 shadow-lg">
              <div className="mb-4">
                <Shield className="h-8 w-8 text-amber-600 mx-auto" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Verifiziert</h3>
              <p className="text-sm text-slate-600">Blockchain-verifizierte Zertifikate</p>
            </Card>
            <Card className="p-6 glass-card-neon bg-white/20 border-white/30 shadow-lg">
              <div className="mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600 mx-auto" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Karriere</h3>
              <p className="text-sm text-slate-600">Verbessern Sie Ihre Karrierechancen</p>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-lg transition-all hover:scale-105" size="lg">
              <Award className="mr-2 h-5 w-5" />
              Zertifizierung starten
            </Button>
            <Link href={`/${locale}/contact`}>
              <Button variant="outline" className="bg-white/40 hover:bg-white/60 border-white/40 text-slate-900 rounded-xl" size="lg">
                Mehr erfahren
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
