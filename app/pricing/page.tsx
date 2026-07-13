import { getDictionary } from "@/lib/dictionary";
import { PageLayout } from "@/components/page-layout";

export default async function PricingPage() {
  const dict = await getDictionary('de'); // Default to German as per project settings

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-white">
            {dict?.pricing?.title || "Preise"}
          </h1>
          <p className="text-lg text-white/80 mb-8">
            {dict?.pricing?.subtitle || "Entdecken Sie unsere flexiblen Preismodelle für QORTEX."}
          </p>
          
          {/* Pricing content placeholder */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Preismodelle</h2>
            <p className="text-white/70 mb-6">
              Unsere Preisstruktur wird bald verfügbar sein. Kontaktieren Sie uns für individuelle Angebote.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Starter</h3>
                <p className="text-white/60 mb-4">Für kleine Teams</p>
                <p className="text-2xl font-bold text-cyan-400">Auf Anfrage</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Professional</h3>
                <p className="text-white/60 mb-4">Für wachsende Unternehmen</p>
                <p className="text-2xl font-bold text-cyan-400">Auf Anfrage</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
                <p className="text-white/60 mb-4">Für große Organisationen</p>
                <p className="text-2xl font-bold text-cyan-400">Auf Anfrage</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
