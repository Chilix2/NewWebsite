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
  { name: "Deutsch", region: "Deutschland, Österreich, Schweiz", flag: "🇩🇪", accent: "Hochdeutsch, Bayrisch, Österreichisch", tts: true },
  { name: "English", region: "US, UK, Australia, Canada", flag: "🇺🇸", accent: "American, British, Australian", tts: true },
  { name: "Français", region: "France, Canada, Belgium", flag: "🇫🇷", accent: "Parisien, Québécois", tts: true },
  { name: "Español", region: "Spain, Mexico, Argentina", flag: "🇪🇸", accent: "Castellano, Mexicano", tts: true },
  { name: "Italiano", region: "Italy, Switzerland", flag: "🇮🇹", accent: "Standard, Regionale", tts: true },
  { name: "Nederlands", region: "Netherlands, Belgium", flag: "🇳🇱", accent: "Hollands, Vlaams", tts: true },
  { name: "日本語", region: "Japan", flag: "🇯🇵", accent: "Standard, Kansai", tts: true },
  { name: "Türkçe", region: "Türkiye", flag: "🇹🇷", accent: "İstanbul, Anadolu" },
  { name: "العربية", region: "22 Länder", flag: "🇸🇦", accent: "17 Dialekte (Ägyptisch, Levantinisch, Golf…)" },
  { name: "Polski", region: "Poland", flag: "🇵🇱", accent: "Warszawski, Krakowski" },
  { name: "Русский", region: "Russia, Ukraine", flag: "🇷🇺", accent: "Московский, Региональный" },
  { name: "中文", region: "China, Taiwan, Hong Kong", flag: "🇨🇳", accent: "Mandarin, Cantonese" },
  { name: "한국어", region: "South Korea", flag: "🇰🇷", accent: "Seoul, Busan" },
  { name: "Tiếng Việt", region: "Vietnam", flag: "🇻🇳", accent: "Hà Nội, Sài Gòn" },
  { name: "Ελληνικά", region: "Greece, Cyprus", flag: "🇬🇷", accent: "Αθηναϊκά, Κυπριακά" },
  { name: "ไทย", region: "Thailand", flag: "🇹🇭", accent: "กรุงเทพฯ, เหนือ" },
  { name: "Português", region: "Brazil, Portugal", flag: "🇧🇷", accent: "Brasileiro, Europeu" },
];

const LANGUAGES_STT = [
  { name: "हिंदी", region: "India", flag: "🇮🇳", accent: "Standard, Mumbai" },
  { name: "فارسی", region: "Iran, Afghanistan", flag: "🇮🇷", accent: "Tehrani, Dari" },
  { name: "Українська", region: "Ukraine", flag: "🇺🇦", accent: "Київський, Львівський" },
  { name: "Svenska", region: "Sweden", flag: "🇸🇪", accent: "Rikssvenska" },
  { name: "Dansk", region: "Denmark", flag: "🇩🇰", accent: "Københavnsk" },
  { name: "Suomi", region: "Finland", flag: "🇫🇮", accent: "Helsinki" },
  { name: "Bahasa Indonesia", region: "Indonesia", flag: "🇮🇩", accent: "Jakarta" },
  { name: "Bahasa Melayu", region: "Malaysia", flag: "🇲🇾", accent: "Standard" },
  { name: "Română", region: "Romania", flag: "🇷🇴", accent: "București" },
  { name: "Hrvatski", region: "Croatia", flag: "🇭🇷", accent: "Zagreb" },
  { name: "Srpski", region: "Serbia", flag: "🇷🇸", accent: "Beograd" },
  { name: "Čeština", region: "Czech Republic", flag: "🇨🇿", accent: "Praha" },
  { name: "Magyar", region: "Hungary", flag: "🇭🇺", accent: "Budapest" },
  { name: "Norsk", region: "Norway", flag: "🇳🇴", accent: "Oslo" },
  { name: "Slovenčina", region: "Slovakia", flag: "🇸🇰", accent: "Bratislava" },
  { name: "עברית", region: "Israel", flag: "🇮🇱", accent: "Standard" },
  { name: "Български", region: "Bulgaria", flag: "🇧🇬", accent: "Sofia" },
  { name: "Lietuvių", region: "Lithuania", flag: "🇱🇹", accent: "Vilnius" },
  { name: "Latviešu", region: "Latvia", flag: "🇱🇻", accent: "Rīga" },
  { name: "Eesti", region: "Estonia", flag: "🇪🇪", accent: "Tallinn" },
  { name: "Català", region: "Spain (Catalonia)", flag: "🇪🇸", accent: "Barcelona" },
  { name: "اردو", region: "Pakistan, India", flag: "🇵🇰", accent: "Standard" },
  { name: "Tagalog", region: "Philippines", flag: "🇵🇭", accent: "Manila" },
];

export default async function LanguagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = dict?.languages_page ?? {};

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
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
            <Stat dark value="50+" label={t.stats_languages ?? "Speech Recognition"} />
            <Stat dark value="7" label={t.stats_tts ?? "Voice Output"} />
            <Stat dark value="95%" label={t.stats_coverage} />
            <Stat dark value="<1s" label={t.stats_response} />
            <Stat dark value="98%" label={t.stats_accuracy} />
          </div>
        </NavyBand>
      </Section>

      {/* Voice Output Languages (TTS — 7 languages) */}
      <Section>
        <SectionHead title="Sprachausgabe (TTS)" subtitle="Volle Sprachausgabe mit natürlicher Stimme in 7 Sprachen" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 mb-12">
          {LANGUAGES.filter(l => l.tts).map((lang, i) => (
            <Reveal
              key={lang.name}
              delay={Math.min(i * 0.03, 0.3)}
              className="rounded-3xl bg-gradient-to-br from-[#5a7a52]/10 to-[#3b6ea8]/10 border border-green-200 p-6 flex items-start gap-4"
            >
              <span className="text-3xl leading-none mt-0.5" aria-hidden="true">{lang.flag}</span>
              <div>
                <h3 className="font-bold text-slate-900">{lang.name}</h3>
                <p className="text-sm text-slate-500 mt-0.5">{lang.region}</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-green-600 mt-2">
                  ✅ {t.available_accents} <span className="normal-case font-normal text-slate-500">{lang.accent}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Speech Recognition Languages (STT — 50+) */}
        <SectionHead title={t.grid_title ?? "Sprachverständnis (STT)"} subtitle={t.grid_subtitle ?? "Spracherkennung in über 50 Sprachen"} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {[...LANGUAGES.filter(l => !l.tts), ...LANGUAGES_STT].map((lang, i) => (
            <Reveal
              key={lang.name}
              delay={Math.min(i * 0.02, 0.3)}
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
        <CreamPanel
          title={t.voice_title}
          subtitle={t.voice_subtitle}
          items={[
            t.feature_dialect,
            t.feature_intonation,
            t.feature_cultural,
            t.feature_volume,
          ].filter(Boolean)}
        />
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
