import { getDictionary } from "@/lib/dictionary";
import {
  SierraHero,
  Section,
  SectionHead,
  CreamCard,
  CreamPanel,
  CtaBand,
} from "@/components/sierra/page-kit";

export default async function IntegrationenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = dict?.integrationen_page ?? {};

  const industryCards = [
    { title: t.legal_title, desc: t.legal_desc, meta: t.legal_label },
    { title: t.hotels_title, desc: t.hotels_desc, meta: "PMS" },
    { title: t.restaurants_title, desc: t.restaurants_desc, meta: t.pos_label },
    { title: t.healthcare_title, desc: t.healthcare_desc, meta: t.praxis_label },
  ];

  const businessItems = [
    { title: t.crm_title, desc: t.crm_desc },
    { title: t.calendar_title, desc: t.calendar_desc },
    { title: t.comm_title, desc: t.comm_desc },
  ];

  return (
    <div className="bg-white min-h-screen text-slate-900">
      <SierraHero
        kicker={t.badge}
        title1={t.heading_part1 ?? t.title}
        title2={t.heading_part2}
        subtitle={t.subtitle}
        ctaLabel={t.cta}
        ctaHref={`/${locale}/demo`}
      />

      <Section>
        <SectionHead kicker={t.industry_badge} title={t.industry_title} subtitle={t.industry_subtitle} />
        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
          {industryCards.map((card, i) => (
            <CreamCard key={i} title={card.title} desc={card.desc} meta={card.meta} delay={i * 0.06} />
          ))}
        </div>
      </Section>

      <Section tinted>
        <CreamPanel title={t.business_title} items={businessItems} />
      </Section>

      <Section>
        <SectionHead title={t.api_title} subtitle={t.api_subtitle} />
        <CtaBand
          title={t.cta_title}
          subtitle={t.cta_subtitle}
          primaryLabel={t.cta_demo}
          primaryHref={`/${locale}/demo`}
          secondaryLabel={t.api_docs}
          secondaryHref={`/${locale}/contact`}
        />
      </Section>
    </div>
  );
}
