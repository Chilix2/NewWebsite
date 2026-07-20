import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProduktHeroV2 } from "@/components/produkt-hero-v2";
import { ProduktHowItWorks } from "@/components/produkt-how-it-works";
import { SaillyConversationPreview } from "@/components/sailly-conversation-preview";
import { SaillyOsProductSection } from "@/components/sailly-os-product-section";
import { ComplianceCertificates } from "@/components/compliance-certificates";
import { GlassCard } from "@/components/ui/glass-card";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const page = dict?.produkt_page ?? {};
  const howItWorks = page?.how_it_works ?? {};
  const workflowSteps =
    howItWorks?.steps ??
    [
      {
        title: dict?.howItWorks?.steps?.answer?.title ?? "Anruf annehmen",
        desc:
          dict?.howItWorks?.steps?.answer?.desc ??
          "Sailly nimmt jeden Anruf sofort entgegen — freundlich, professionell, in über 50 Sprachen.",
      },
      {
        title: dict?.howItWorks?.steps?.understand?.title ?? "Verstehen & handeln",
        desc:
          dict?.howItWorks?.steps?.understand?.desc ??
          "Termine buchen, Bestellungen aufnehmen, Fragen beantworten — direkt in Ihrem System.",
      },
      {
        title: dict?.howItWorks?.steps?.execute?.title ?? "Ihr Team informieren",
        desc:
          dict?.howItWorks?.steps?.execute?.desc ??
          "Jede Buchung landet dort, wo sie gebraucht wird. Kein Zettel, kein Rückruf.",
      },
    ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      <ProduktHeroV2 dict={dict} locale={locale} />

      <ProduktHowItWorks
        title={howItWorks?.title ?? "So funktioniert's"}
        subtitle={
          howItWorks?.subtitle ??
          "Vom Klingeln bis zur Buchung — in einem Gespräch, ohne Warteschleife."
        }
        steps={workflowSteps}
      />

      <SaillyOsProductSection dict={dict} locale={locale} />

      <section className="py-20 lg:py-24 overflow-hidden bg-[#faf7f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 md:order-1 relative flex justify-center">
            <SaillyConversationPreview dict={dict} />
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-5">
              {page?.conversation_section?.heading ?? "In jeder Sprache verständlich"}
            </h2>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
              {page?.conversation_section?.description ??
                "Ob Dialekt, Fremdsprache oder hektischer Service — Sailly bleibt klar, freundlich und professionell am Telefon."}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <GlassCard className="p-4 text-center bg-slate-50 border-slate-100">
                <div className="text-3xl font-bold text-primary mb-1">30+</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  {page?.conversation_section?.languages_label ?? "Sprachen"}
                </div>
              </GlassCard>
              <GlassCard className="p-4 text-center bg-slate-50 border-slate-100">
                <div className="text-3xl font-bold text-slate-800 mb-1">24/7</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  {page?.conversation_section?.availability_label ?? "Erreichbarkeit"}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 px-4 bg-[#faf7f4]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            {dict?.security_trust?.title ?? "Höchste Standards für deutsche Unternehmen"}
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-12">
            {dict?.security_trust?.subtitle ??
              "Sailly wurde mit höchstem Anspruch an Vertrauen, Sicherheit und Compliance entwickelt."}
          </p>
          <ComplianceCertificates size="lg" />
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight text-slate-900">
            {page?.cta_section?.heading ?? dict?.cta_section?.title ?? "Bereit für den nächsten Schritt?"}
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            {page?.cta_section?.description ??
              dict?.cta_section?.subtitle ??
              "Sailly übernimmt Ihr Telefon — Ihr Team gewinnt Zeit. In vier Wochen einsatzbereit."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link
              href={`/${locale}/demo`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 min-h-[44px]"
            >
              {page?.cta_section?.cta_start ?? dict?.cta_section?.demo ?? "Demo anfragen"}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-8 py-4 border border-slate-200 bg-white text-slate-700 font-semibold rounded-full hover:bg-slate-50 transition-all min-h-[44px]"
            >
              {page?.cta_section?.cta_contact ?? dict?.cta_section?.contact ?? "Beratungstermin vereinbaren"}
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-400 font-medium">
            {dict?.cta_section?.guarantee ?? "30 Tage Geld-zurück-Garantie"}
          </p>
        </div>
      </section>
    </div>
  );
}
