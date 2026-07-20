import { getDictionary } from "@/lib/dictionary";
import {
  SierraHero,
  Section,
  SectionHead,
  CreamCard,
  CreamPanel,
  CtaBand,
} from "@/components/sierra/page-kit";
import { ComplianceCertificates } from "@/components/compliance-certificates";

export default async function ProduktSecurityCompliancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = dict?.security_compliance_page ?? {};

  const features = [1, 2, 3, 4, 5, 6]
    .map((n) => ({ title: t[`f${n}_title`], desc: t[`f${n}_desc`] }))
    .filter((f) => f.title);

  const dataControl = [
    { title: t.dr_title, desc: t.dr_desc },
    { title: t.dm_title, desc: t.dm_desc },
    { title: t.del_title, desc: t.del_desc },
  ].filter((f) => f.title);

  return (
    <div className="bg-white min-h-screen text-slate-900">
      <SierraHero
        kicker={t.badge}
        title1={t.heading_part1}
        title2={t.heading_part2}
        subtitle={t.subtitle}
        ctaLabel={t.cta}
        ctaHref={`/${locale}/contact`}
        image={
          <div className="relative w-64 h-64">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
              <defs>
                <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4285F4" />
                  <stop offset="100%" stopColor="#34A853" />
                </linearGradient>
              </defs>
              <path d="M100 15 L180 50 L180 110 C180 150 130 185 100 190 C70 185 20 150 20 110 L20 50 Z" fill="url(#shieldGrad)" opacity="0.15" stroke="url(#shieldGrad)" strokeWidth="3" />
              <rect x="75" y="78" width="50" height="44" rx="6" fill="url(#shieldGrad)" />
              <path d="M85 78V68C85 58 95 50 100 50C105 50 115 58 115 68V78" stroke="url(#shieldGrad)" strokeWidth="5" strokeLinecap="round" fill="none" />
              <circle cx="100" cy="97" r="6" fill="white" />
              <path d="M100 103V113" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <circle cx="100" cy="170" r="10" fill="none" stroke="#34A853" strokeWidth="2" />
              <path d="M94 170L98 174L106 166" stroke="#34A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        }
      />

      <Section>
        <SectionHead kicker={t.sec_badge} title={t.sec_title} subtitle={t.sec_subtitle} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {features.map((f, i) => (
            <CreamCard key={i} title={f.title} desc={f.desc} delay={i * 0.05} />
          ))}
        </div>
      </Section>

      <Section tinted>
        <SectionHead title={t.comp_title} subtitle={t.comp_subtitle} />
        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6 mb-10">
          <CreamCard title={t.dp_title} desc={t.dp_desc} className="bg-white" />
          <CreamCard title={t.cert_title} desc={t.cert_desc} className="bg-white" delay={0.06} />
        </div>
        <ComplianceCertificates size="lg" />
      </Section>

      <Section>
        <CreamPanel title={t.data_ctrl_title} subtitle={t.data_ctrl_subtitle} items={dataControl} />
      </Section>

      <Section>
        <CtaBand
          title={t.cta_title}
          subtitle={t.cta_subtitle}
          primaryLabel={t.cta ?? t.cta_title}
          primaryHref={`/${locale}/contact`}
        />
      </Section>
    </div>
  );
}
