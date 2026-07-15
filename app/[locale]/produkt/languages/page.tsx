import { getDictionary } from "@/lib/dictionary";
import {
  SierraHero,
  Section,
  SectionHead,
  CreamCard,
  CreamPanel,
  NavyBand,
  Stat,
  CtaBand,
  Reveal,
} from "@/components/sierra/page-kit";

const LANGUAGES = [
  { name: "Deutsch", region: "Deutschland, Österreich, Schweiz", flag: "🇩🇪", accent: "Hochdeutsch, Bayrisch, Österreichisch" },
  { name: "English", region: "US, UK, Australia, Canada", flag: "🇺🇸", accent: "American, British, Australian" },
  { name: "Français", region: "France, Canada, Belgium", flag: "🇫🇷", accent: "Parisien, Québécois" },
  { name: "Español", region: "Spain, Mexico, Argentina", flag: "🇪🇸", accent: "Castellano, Mexicano" },
  { name: "Italiano", region: "Italy, Switzerland", flag: "🇮🇹", accent: "Standard, Regionale" },
  { name: "Nederlands", region: "Netherlands, Belgium", flag: "🇳🇱", accent: "Hollands, Vlaams" },
  { name: "Polski", region: "Poland", flag: "🇵🇱", accent: "Warszawski, Krakowski" },
  { name: "Português", region: "Brazil, Portugal", flag: "🇧🇷", accent: "Brasileiro, Europeu" },
  { name: "Русский", region: "Russia, Ukraine", flag: "🇷🇺", accent: "Московский, Региональный" },
  { name: "中文", region: "China, Taiwan, Hong Kong", flag: "🇨🇳", accent: "Mandarin, Cantonese" },
  { name: "日本語", region: "Japan", flag: "🇯🇵", accent: "Standard, Kansai" },
  { name: "한국어", region: "South Korea", flag: "🇰🇷", accent: "Seoul, Busan" },
];

export default async function LanguagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = dict?.languages_page ?? {};

  const voiceFeatures = [
    t.feature_dialect,
    t.feature_intonation,
    t.feature_cultural,
    t.feature_volume,
  ].filter(Boolean);

  return (
    <div className="bg-white min-h-screen text-slate-900">
      <SierraHero
        kicker={t.badge}
        title1={t.heading_part1 ?? t.title}
        title2={t.heading_part2}
        subtitle={t.hero_desc ?? t.subtitle}
      />

      <Section className="pt-2">
        <NavyBand>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Stat dark value="30+" label={t.stats_languages} />
            <Stat dark value="95%" label={t.stats_coverage} />
            <Stat dark value="<1s" label={t.stats_response} />
            <Stat dark value="98%" label={t.stats_accuracy} />
          </div>
        </NavyBand>
      </Section>

      <Section>
        <SectionHead title={t.grid_title} subtitle={t.grid_subtitle} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {LANGUAGES.map((lang, i) => (
            <Reveal
              key={lang.name}
              delay={Math.min(i * 0.03, 0.3)}
              className="rounded-3xl bg-[#f7f4ee] p-6 flex items-start gap-4"
            >
              <span className="text-3xl leading-none mt-0.5" aria-hidden="true">{lang.flag}</span>
              <div>
                <h3 className="font-bold text-slate-900">{lang.name}</h3>
                <p className="text-sm text-slate-500 mt-0.5">{lang.region}</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-2">
                  {t.available_accents}: <span className="normal-case font-normal">{lang.accent}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <p className="text-slate-500 text-center">{t.voice_special}</p>
        </Reveal>
      </Section>

      <Section tinted>
        <CreamPanel title={t.voice_title} subtitle={t.voice_subtitle} items={voiceFeatures} />
      </Section>

      <Section>
        <CtaBand
          title={t.cta_title ?? t.title}
          subtitle={t.cta_subtitle ?? t.subtitle}
          primaryLabel={t.cta_demo ?? dict?.industry_template?.final_cta?.demo ?? "Demo"}
          primaryHref={`/${locale}/demo`}
        />
      </Section>
    </div>
  );
}
