import { getDictionary } from "@/lib/dictionary";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const posts = [
    {
      title: "Die Zukunft der Workflow-Automatisierung mit KI",
      excerpt: "Wie Large Language Models (LLMs) traditionelle RPA-Ansätze revolutionieren und intelligente Prozessautomatisierung ermöglichen.",
      author: "Dr. Sarah Weber",
      date: "12. Dez 2024",
      readTime: "5 min",
      category: "KI & Tech",
      image: "bg-gradient-to-br from-amber-500 to-purple-600",
      slug: "#",
    },
    {
      title: "5 Wege, wie QORTEX die Bauindustrie digitalisiert",
      excerpt: "Von der automatisierten Planprüfung bis zur Materialbeschaffung – so nutzen führende Bauunternehmen QORTEX.",
      author: "Markus Schmidt",
      date: "08. Dez 2024",
      readTime: "4 min",
      category: "Use Cases",
      image: "bg-gradient-to-br from-emerald-500 to-teal-600",
      slug: "#",
    },
    {
      title: "SecOps neu gedacht: Automatisierte Bedrohungsabwehr",
      excerpt: "Wie Sie mit QORTEX Sicherheitsvorfälle in Echtzeit erkennen und darauf reagieren, ohne Ihr Team zu überlasten.",
      author: "Julia Müller",
      date: "01. Dez 2024",
      readTime: "7 min",
      category: "Security",
      image: "bg-gradient-to-br from-red-500 to-orange-600",
      slug: "#",
    },
    {
      title: "QORTEX 2.0 Release Notes",
      excerpt: "Wir stellen vor: Der neue visuelle Workflow-Builder, verbesserte KI-Modelle und noch tiefere Integrationen.",
      author: "Product Team",
      date: "28. Nov 2024",
      readTime: "3 min",
      category: "Product Updates",
      image: "bg-gradient-to-br from-amber-600 to-indigo-700",
      slug: "#",
    },
    {
      title: "Warum Hyperautomation mehr ist als nur ein Buzzword",
      excerpt: "Ein tiefer Einblick in die Kombination von KI, RPA und Integration Platforms und warum sie die Zukunft der Arbeit ist.",
      author: "Thomas Klein",
      date: "20. Nov 2024",
      readTime: "6 min",
      category: "Thought Leadership",
      image: "bg-gradient-to-br from-purple-500 to-pink-600",
      slug: "#",
    },
    {
      title: "Case Study: Wie die Stadt München 10.000 Stunden sparte",
      excerpt: "Erfahren Sie, wie die öffentliche Verwaltung administrative Prozesse mit QORTEX erfolgreich digitalisierte.",
      author: "Lisa Wagner",
      date: "15. Nov 2024",
      readTime: "5 min",
      category: "Case Studies",
      image: "bg-gradient-to-br from-cyan-500 to-amber-600",
      slug: "#",
    },
  ]

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <Badge variant="outline" className="px-4 py-1 border-amber-200 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">
            Blog & Insights
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Aktuelles aus der Welt der <span className="text-gradient-blue">Automatisierung</span>
          </h1>
          <p className="text-xl text-slate-600">
            Expertenwissen, Produkt-Updates und inspirierende Erfolgsgeschichten für Ihre digitale Transformation.
          </p>
        </div>

        {/* Featured Post (First item) */}
        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className={`rounded-2xl ${posts[0].image} min-h-[200px] w-full`} />
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-0">{posts[0].category}</Badge>
              <span className="text-sm text-slate-500 flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {posts[0].date}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{posts[0].title}</h2>
            <p className="text-slate-600 text-lg">{posts[0].excerpt}</p>
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-2 text-sm text-slate-900 font-medium">
                <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                  <User className="h-4 w-4 text-slate-500" />
                </div>
                {posts[0].author}
              </div>
              <Button variant="ghost" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 p-0 h-auto">
                Artikel lesen <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1).map((post, index) => (
            <article key={index} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
              <div className={`h-48 ${post.image} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="p-6 flex flex-col flex-grow space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-slate-100 text-slate-700">{post.category}</Badge>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-600 text-sm line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="pt-4 mt-auto flex items-center justify-between border-t border-slate-100">
                  <span className="text-sm text-slate-500">{post.date}</span>
                  <span className="text-sm font-medium text-slate-900">{post.author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </main>
  )
}