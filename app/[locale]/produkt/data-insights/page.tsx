import { getDictionary } from "@/lib/dictionary";
import {
  SierraHero,
  Section,
  SectionHead,
  CreamCard,
  NavyBand,
  Stat,
  CtaBand,
} from "@/components/sierra/page-kit";

export default async function DataInsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = dict?.data_insights_page ?? {};

  const impacts = [
    t.impact_revenue,
    t.impact_efficiency,
    t.impact_satisfaction,
    t.impact_savings,
  ].filter(Boolean);

  return (
    <div className="bg-white min-h-screen text-slate-900">
      <SierraHero
        kicker={t.badge}
        title1={t.heading_part1 ?? t.title}
        title2={t.heading_part2}
        subtitle={t.subtitle}
      />

      <Section>
        <SectionHead title={t.impact_title} subtitle={t.impact_subtitle} />
        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
          {impacts.map((item: any, i: number) => (
            <CreamCard key={i} title={item.title} desc={item.desc} delay={i * 0.06} />
          ))}
        </div>
      </Section>

      <Section tinted>
        <SectionHead title={t.roi_title} subtitle={t.roi_subtitle} />
        <NavyBand title={t.roi_your_numbers}>
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Stat dark value="90%+" label={dict?.hero?.stats?.items?.containment?.label ?? "Automatisierte Routineanfragen"} />
            <Stat dark value="24/7" label={dict?.hero?.stats?.items?.reduction?.label ?? "Erreichbarkeit"} />
            <Stat dark value="85%+" label={dict?.hero?.stats?.items?.satisfaction?.label ?? "Zufriedenere Mitarbeiter"} />
            <Stat dark value="<30s" label={t.stats_response ?? "Reaktionszeit"} />
          </div>
        </NavyBand>
      </Section>

      <Section>
        <CtaBand
          title={t.cta_title}
          subtitle={t.cta_subtitle}
          primaryLabel={t.cta_roi ?? t.cta_consult}
          primaryHref={`/${locale}/demo`}
          secondaryLabel={t.cta_consult}
          secondaryHref={`/${locale}/contact`}
        />
      </Section>
    </div>
  );
}
