"use client";

import { Card } from "@/components/ui/card";
import { getDictionary } from "@/lib/dictionary";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Search, 
  BookOpen,
  Code,
  Database,
  Settings,
  Shield,
  Zap,
  ExternalLink,
  Download,
  Copy,
  CheckCircle,
  Clock,
  Users,
  Star,
  FileText,
  Terminal,
  Layers,
  GitBranch
} from "lucide-react";
import { GlassIcon } from "@/components/ui/glass-icon";
import Link from "next/link";
import { useState } from "react";

export default function DocsClient() {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "de";
  // Note: getDictionary cannot be used in client components
  // Hardcoded German content for now - refactor to pass as prop from parent
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alle");

  const documentationSections = [
    {
      title: "Erste Schritte",
      description: "Grundlagen und Setup für neue Benutzer",
      icon: BookOpen,
      color: "blue",
      articles: [
        { title: "Installation & Setup", readTime: "5 min", difficulty: "Anfänger" },
        { title: "Ihr erstes Workflow", readTime: "10 min", difficulty: "Anfänger" },
        { title: "Dashboard Übersicht", readTime: "8 min", difficulty: "Anfänger" },
        { title: "Grundlegende Konzepte", readTime: "15 min", difficulty: "Anfänger" }
      ]
    },
    {
      title: "API Referenz",
      description: "Vollständige API-Dokumentation und Beispiele",
      icon: Code,
      color: "green",
      articles: [
        { title: "REST API Übersicht", readTime: "12 min", difficulty: "Mittel" },
        { title: "Authentication", readTime: "8 min", difficulty: "Mittel" },
        { title: "Webhook Integration", readTime: "15 min", difficulty: "Fortgeschritten" },
        { title: "Rate Limiting", readTime: "6 min", difficulty: "Mittel" }
      ]
    },
    {
      title: "Workflow Design",
      description: "Erweiterte Workflow-Erstellung und -Optimierung",
      icon: Settings,
      color: "purple",
      articles: [
        { title: "Workflow Patterns", readTime: "20 min", difficulty: "Mittel" },
        { title: "Conditional Logic", readTime: "15 min", difficulty: "Mittel" },
        { title: "Error Handling", readTime: "18 min", difficulty: "Fortgeschritten" },
        { title: "Performance Optimization", readTime: "25 min", difficulty: "Fortgeschritten" }
      ]
    },
    {
      title: "Integrationen",
      description: "Verbindung mit externen Services und Systemen",
      icon: Database,
      color: "orange",
      articles: [
        { title: "Salesforce Integration", readTime: "20 min", difficulty: "Mittel" },
        { title: "Microsoft 365 Setup", readTime: "15 min", difficulty: "Mittel" },
        { title: "Custom Connectors", readTime: "30 min", difficulty: "Fortgeschritten" },
        { title: "Database Connections", readTime: "18 min", difficulty: "Mittel" }
      ]
    },
    {
      title: "KI & Automation",
      description: "Intelligente Automatisierung und ML-Integration",
      icon: Zap,
      color: "yellow",
      articles: [
        { title: "AI Model Integration", readTime: "25 min", difficulty: "Fortgeschritten" },
        { title: "Natural Language Processing", readTime: "30 min", difficulty: "Fortgeschritten" },
        { title: "Computer Vision Setup", readTime: "35 min", difficulty: "Fortgeschritten" },
        { title: "Predictive Analytics", readTime: "28 min", difficulty: "Fortgeschritten" }
      ]
    },
    {
      title: "Sicherheit",
      description: "Sicherheitsrichtlinien und Compliance",
      icon: Shield,
      color: "red",
      articles: [
        { title: "Security Best Practices", readTime: "20 min", difficulty: "Mittel" },
        { title: "GDPR Compliance", readTime: "25 min", difficulty: "Fortgeschritten" },
        { title: "Access Control", readTime: "15 min", difficulty: "Mittel" },
        { title: "Audit Logging", readTime: "12 min", difficulty: "Mittel" }
      ]
    }
  ];

  const quickStart = [
    {
      step: 1,
      title: "Account erstellen",
      description: "Registrieren Sie sich für einen kostenlosen QORTEX Account",
      time: "2 min"
    },
    {
      step: 2,
      title: "Workspace einrichten",
      description: "Konfigurieren Sie Ihren ersten Workspace",
      time: "5 min"
    },
    {
      step: 3,
      title: "Template verwenden",
      description: "Starten Sie mit einem vorgefertigten Template",
      time: "3 min"
    },
    {
      step: 4,
      title: "Ersten Workflow erstellen",
      description: "Bauen Sie Ihren ersten automatisierten Workflow",
      time: "10 min"
    }
  ];

  const popularArticles = [
    { title: "Workflow Debugging Guide", views: "15.2k", rating: 4.9 },
    { title: "API Rate Limiting Best Practices", views: "12.8k", rating: 4.8 },
    { title: "Advanced Error Handling", views: "11.5k", rating: 4.7 },
    { title: "Performance Optimization Tips", views: "10.9k", rating: 4.8 },
    { title: "Security Configuration Guide", views: "9.7k", rating: 4.9 }
  ];

  const categories = ["Alle", "Erste Schritte", "API", "Workflows", "Integrationen", "KI", "Sicherheit"];

  const filteredSections = documentationSections.filter(section => {
    if (selectedCategory === "Alle") return true;
    return section.title.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gradient-soft pt-24 font-sans text-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md border-b border-white/20" />
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/20 border border-green-400/30 text-green-900 font-semibold mb-6 backdrop-blur-sm">
              Dokumentation
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 tracking-tight">
              QORTEX Dokumentation
            </h1>
            <p className="text-xl text-slate-800 mb-8 leading-relaxed max-w-3xl mx-auto">
              Umfassende Anleitungen, API-Referenzen und Best Practices für die 
              Entwicklung mit QORTEX. Alles was Sie brauchen, um erfolgreich zu sein.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 h-5 w-5" />
              <input
                type="text"
                placeholder="Dokumentation durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/40 border border-white/30 rounded-xl text-slate-900 placeholder-slate-600 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400 text-lg"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg transition-all hover:scale-105" size="lg">
                <BookOpen className="mr-2 h-5 w-5" />
                Erste Schritte
              </Button>
              <Button variant="outline" className="bg-white/40 hover:bg-white/60 border-white/40 text-slate-900 rounded-xl" size="lg">
                <Code className="mr-2 h-5 w-5" />
                API Referenz
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Quick Start Guide</h2>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto">
              In 4 einfachen Schritten zu Ihrem ersten automatisierten Workflow
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {quickStart.map((step, index) => (
              <Card key={step.step} className="p-6 glass-card-neon bg-white/20 border-white/30 hover:bg-white/30 transition-all shadow-lg">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{step.description}</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-slate-500">
                    <Clock className="h-3 w-3" />
                    <span>{step.time}</span>
                  </div>
                </div>
                {index < quickStart.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-green-600" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-6 border-y border-white/20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-white/40 text-slate-700 hover:bg-white/60"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSections.map((section, index) => (
              <Card key={index} className="glass-card-neon bg-white/20 border-white/30 hover:bg-white/30 hover:scale-[1.02] transition-all duration-300 shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <GlassIcon icon={section.icon} color={section.color as any} size="md" />
                    <h3 className="text-xl font-bold text-slate-900">{section.title}</h3>
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed">{section.description}</p>
                  
                  <div className="space-y-3">
                    {section.articles.map((article, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-white/30 rounded-lg hover:bg-white/40 transition-colors cursor-pointer">
                        <div className="flex-1">
                          <div className="font-medium text-slate-900 text-sm">{article.title}</div>
                          <div className="flex items-center gap-3 text-xs text-slate-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {article.readTime}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              article.difficulty === "Anfänger" ? "bg-green-500/20 text-green-700" :
                              article.difficulty === "Mittel" ? "bg-yellow-500/20 text-yellow-700" :
                              "bg-red-500/20 text-red-700"
                            }`}>
                              {article.difficulty}
                            </span>
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles & Resources */}
      <section className="py-20 px-6 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Popular Articles */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Beliebte Artikel</h2>
              <div className="space-y-4">
                {popularArticles.map((article, index) => (
                  <Card key={index} className="p-4 glass-card-neon bg-white/20 border-white/30 hover:bg-white/30 transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900 mb-1">{article.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {article.views} Views
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {article.rating}
                          </span>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate-400" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Developer Resources */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Developer Resources</h2>
              <div className="space-y-6">
                <Card className="p-6 glass-card-neon bg-white/20 border-white/30 hover:bg-white/30 transition-all cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <GlassIcon icon={Terminal} color="green" size="sm" />
                    <h3 className="font-bold text-slate-900">CLI Tools</h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">Command-line Interface für Entwickler</p>
                  <Button size="sm" variant="outline" className="bg-white/40 hover:bg-white/60 border-white/40 text-slate-900">
                    <Download className="mr-2 h-3 w-3" />
                    Download
                  </Button>
                </Card>

                <Card className="p-6 glass-card-neon bg-white/20 border-white/30 hover:bg-white/30 transition-all cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <GlassIcon icon={Code} color="blue" size="sm" />
                    <h3 className="font-bold text-slate-900">SDKs</h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">Software Development Kits für verschiedene Sprachen</p>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-700 rounded">Python</span>
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-700 rounded">Node.js</span>
                    <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-700 rounded">Java</span>
                  </div>
                </Card>

                <Card className="p-6 glass-card-neon bg-white/20 border-white/30 hover:bg-white/30 transition-all cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <GlassIcon icon={GitBranch} color="orange" size="sm" />
                    <h3 className="font-bold text-slate-900">Code Examples</h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">Praktische Beispiele und Snippets</p>
                  <Button size="sm" variant="outline" className="bg-white/40 hover:bg-white/60 border-white/40 text-slate-900">
                    <ExternalLink className="mr-2 h-3 w-3" />
                    GitHub
                  </Button>
                </Card>

                <Card className="p-6 glass-card-neon bg-white/20 border-white/30 hover:bg-white/30 transition-all cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <GlassIcon icon={Layers} color="purple" size="sm" />
                    <h3 className="font-bold text-slate-900">Postman Collection</h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">Vorgefertigte API-Requests für Testing</p>
                  <Button size="sm" variant="outline" className="bg-white/40 hover:bg-white/60 border-white/40 text-slate-900">
                    <Download className="mr-2 h-3 w-3" />
                    Import
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-12 glass-card-neon bg-white/20 border-white/30 shadow-lg">
            <div className="mb-6">
              <GlassIcon icon={Users} color="green" size="xl" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Brauchen Sie weitere Hilfe?
            </h2>
            <p className="text-xl text-slate-700 mb-8 max-w-2xl mx-auto">
              Unser Support-Team und die Community stehen Ihnen bei Fragen zur Verfügung.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/contact`}>
                <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg transition-all hover:scale-105" size="lg">
                  <Users className="mr-2 h-5 w-5" />
                  Support kontaktieren
                </Button>
              </Link>
              <Link href={`/${locale}/community`}>
                <Button variant="outline" className="bg-white/40 hover:bg-white/60 border-white/40 text-slate-900 rounded-xl" size="lg">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Community Forum
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
