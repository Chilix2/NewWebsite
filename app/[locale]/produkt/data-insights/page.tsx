import { getDictionary } from "@/lib/dictionary";
import {
  SierraHero,
  Section,
  SectionHead,
  CreamCard,
  Stat,
  CtaBand,
  Reveal,
} from "@/components/sierra/page-kit";
import { StatsBand } from "@/components/sierra/stats-band";

const CHART_DATA: Record<string, { bars: number[]; color: string; label: string }> = {
  revenue: { bars: [40, 55, 65, 72, 85, 92], color: "#ff9b8a", label: "Monatliche Buchungen (+%)" },
  efficiency: { bars: [100, 85, 72, 58, 42, 30], color: "#4285F4", label: "Manuelle Anrufe (Minuten)" },
  satisfaction: { bars: [78, 82, 88, 92, 94, 96], color: "#34A853", label: "Kundenzufriedenheit (%)" },
  savings: { bars: [200, 350, 480, 620, 780, 920], color: "#F59E0B", label: "Kosteneinsparung (EUR/Monat)" },
};

function MiniChart({ bars, color, label }: { bars: number[]; color: string; label: string }) {
  const height = 80;
  const width = 200;
  const max = Math.max(...bars);
  const barWidth = (width - (bars.length - 1) * 4) / bars.length;

  return (
    <div className="mt-4">
      <svg viewBox={`0 0 ${width} ${height + 20}`} className="w-full h-auto" aria-label={label}>
        {bars.map((v, i) => {
          const barH = (v / max) * height;
          const x = i * (barWidth + 4);
          const y = height - barH + 10;
          return (
            <rect key={i} x={x} y={y} width={barWidth} height={barH} rx="3" fill={color} opacity="0.85" />
          );
        })}
        <line x1="0" y1={height + 10} x2={width} y2={height + 10} stroke="#e2e8f0" strokeWidth="1" />
      </svg>
      <p className="text-xs text-slate-400 mt-1.5 font-medium">{label}</p>
    </div>
  );
}

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
          {impacts.map((item: any, i: number) => {
            const chartKeys = ["revenue", "efficiency", "satisfaction", "savings"];
            const chartKey = chartKeys[i] ?? "revenue";
            const chart = CHART_DATA[chartKey];
            return (
              <Reveal key={i} delay={i * 0.06}>
                <div className="rounded-3xl bg-[#f7f4ee] p-6 lg:p-7 h-full">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  <MiniChart bars={chart.bars} color={chart.color} label={chart.label} />
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section tinted>
        <SectionHead title={t.roi_title} subtitle={t.roi_subtitle} />
        <StatsBand title={t.roi_your_numbers}>
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Stat value="90%+" label={dict?.hero?.stats?.items?.containment?.label ?? "Automatisierte Routineanfragen"} />
            <Stat value="24/7" label={dict?.hero?.stats?.items?.reduction?.label ?? "Erreichbarkeit"} />
            <Stat value="85%+" label={dict?.hero?.stats?.items?.satisfaction?.label ?? "Zufriedenere Mitarbeiter"} />
            <Stat value="<30s" label={t.stats_response ?? "Reaktionszeit"} />
          </div>
        </StatsBand>
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
