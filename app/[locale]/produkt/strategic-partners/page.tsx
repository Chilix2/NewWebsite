import { getDictionary } from "@/lib/dictionary";
import {
  SierraHero,
  Section,
  SectionHead,
  CreamCard,
  CreamPanel,
  NavyBand,
  CtaBand,
  Reveal,
} from "@/components/sierra/page-kit";

const AI_PARTNERS = [
  { name: "OpenAI GPT-4", useCase: "Hauptmodell für komplexe Gespräche" },
  { name: "Anthropic Claude", useCase: "Backup-System und Spezialfälle" },
  { name: "Google Gemini", useCase: "Spezielle Integrationen" },
];

const VOICE_PIPELINE = [
  { step: "1", title: "Audio Input", desc: "Kunde spricht ins Telefon" },
  { step: "2", title: "Speech Recognition", desc: "Umwandlung in Text (AssemblyAI/Deepgram)" },
  { step: "3", title: "Language Processing", desc: "Verstehen der Absicht (OpenAI/Claude)" },
  { step: "4", title: "Response Generation", desc: "Intelligente Antwort erstellen" },
  { step: "5", title: "Voice Synthesis", desc: "Natürliche Sprachausgabe (ElevenLabs)" },
];

const INFRA = [
  { group: "Cloud", items: [
    { name: "AWS", region: "Frankfurt", cert: "SOC 2" },
    { name: "Microsoft Azure", region: "Deutschland West", cert: "DSGVO" },
    { name: "Google Cloud", region: "europe-west3", cert: "GDPR" },
  ]},
  { group: "Telefonie", items: [
    { name: "Twilio", region: "Global", cert: "HIPAA" },
    { name: "Deutsche Telekom", region: "Deutschland", cert: "DSGVO" },
    { name: "Vonage", region: "Europa", cert: "PCI DSS" },
  ]},
  { group: "Edge & CDN", items: [
    { name: "Cloudflare", region: "Global", cert: "SOC 2" },
    { name: "AWS CloudFront", region: "Edge Locations", cert: "SOC 2" },
    { name: "Fastly", region: "Europa", cert: "GDPR" },
  ]},
];

const CERTS = [
  { cert: "DSGVO / GDPR", desc: "Vollständige Einhaltung der Datenschutz-Grundverordnung" },
  { cert: "SOC 2 Type II", desc: "Sicherheit, Verfügbarkeit und Vertraulichkeit" },
  { cert: "BSI C5", desc: "Bundesamt für Sicherheit in der Informationstechnik" },
  { cert: "TISAX", desc: "Automotive-Sicherheitsstandard" },
];

export default async function StrategicPartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = dict?.strategic_partners_page ?? {};

  return (
    <div className="bg-white min-h-screen text-slate-900">
      <SierraHero
        kicker={t.badge}
        title1={t.heading_part1 ?? t.title}
        title2={t.heading_part2}
        subtitle={t.subtitle}
      />

      {/* AI models */}
      <Section>
        <SectionHead title={t.ai_section_title} subtitle={t.ai_section_subtitle} />
        <div className="grid sm:grid-cols-3 gap-5 lg:gap-6">
          {AI_PARTNERS.map((p, i) => (
            <CreamCard key={p.name} title={p.name} desc={p.useCase} meta={t.use_case_label} delay={i * 0.06} />
          ))}
        </div>
      </Section>

      {/* Voice pipeline */}
      <Section tinted>
        <SectionHead title={t.voice_section_title} subtitle={t.voice_section_subtitle} />
        <Reveal className="rounded-[2.5rem] bg-white p-7 sm:p-10">
          <ol className="grid sm:grid-cols-5 gap-6">
            {VOICE_PIPELINE.map((s) => (
              <li key={s.step} className="relative">
                <span className="text-xs font-bold text-primary">{s.step.padStart(2, "0")}</span>
                <h3 className="mt-1.5 font-bold text-slate-900 text-sm">{s.title}</h3>
                <p className="mt-1 text-[13px] text-slate-500 leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      {/* Infrastructure */}
      <Section>
        <SectionHead title={t.infra_title} subtitle={t.infra_subtitle} />
        <div className="grid sm:grid-cols-3 gap-5 lg:gap-6">
          {INFRA.map((group, gi) => (
            <Reveal key={group.group} delay={gi * 0.06} className="rounded-3xl bg-[#f7f4ee] p-6 lg:p-8">
              <span className="block w-8 h-[3px] rounded-full bg-primary/70 mb-5" aria-hidden="true" />
              <h3 className="text-lg font-bold mb-4 text-slate-900">{group.group}</h3>
              <div className="divide-y divide-slate-900/10">
                {group.items.map((item) => (
                  <div key={item.name} className="py-3 first:pt-0 last:pb-0 flex items-baseline justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.region}</p>
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 shrink-0">{item.cert}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Compliance */}
      <Section tinted>
        <CreamPanel
          title={t.compliance_title}
          subtitle={t.compliance_subtitle}
          items={CERTS.map((c) => ({ title: c.cert, desc: c.desc }))}
        />
      </Section>

      {/* Privacy band + CTA */}
      <Section>
        <NavyBand title={t.privacy_title}>
          <div className="mt-8 grid sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-white">{t.german_servers}</h3>
              <p className="mt-1.5 text-sm text-white/60 leading-relaxed">{t.german_servers_desc}</p>
            </div>
            <div>
              <h3 className="font-bold text-white">{t.e2e_enc}</h3>
              <p className="mt-1.5 text-sm text-white/60 leading-relaxed">{t.e2e_enc_desc}</p>
            </div>
            <div>
              <h3 className="font-bold text-white">{t.no_sharing ?? t.no_sh}</h3>
              <p className="mt-1.5 text-sm text-white/60 leading-relaxed">{t.no_sharing_desc ?? t.no_sh_desc}</p>
            </div>
          </div>
        </NavyBand>
        <div className="mt-6">
          <CtaBand
            title={t.cta_title}
            subtitle={t.cta_subtitle}
            primaryLabel={t.cta_demo}
            primaryHref={`/${locale}/demo`}
            secondaryLabel={t.cta_all}
            secondaryHref={`/${locale}/produkt/integrationen`}
          />
        </div>
      </Section>
    </div>
  );
}
