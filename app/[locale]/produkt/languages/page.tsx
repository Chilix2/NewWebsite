import { getDictionary } from "@/lib/dictionary";
import {
  SierraHero,
  Section,
  SectionHead,
  Stat,
  CtaBand,
  Reveal,
} from "@/components/sierra/page-kit";
import { StatsBand } from "@/components/sierra/stats-band";

/** ISO 3166-1 alpha-2 for flagcdn images (emoji flags render as country codes on Windows). */
const ALL_LANGUAGES = [
  { name: "Deutsch", region: "Deutschland, Österreich, Schweiz", cc: "de", accent: "Hochdeutsch, Bayrisch, Österreichisch" },
  { name: "English", region: "US, UK, Australia, Canada", cc: "us", accent: "American, British, Australian" },
  { name: "Français", region: "France, Canada, Belgium", cc: "fr", accent: "Parisien, Québécois" },
  { name: "Español", region: "Spain, Mexico, Argentina", cc: "es", accent: "Castellano, Mexicano" },
  { name: "Italiano", region: "Italy, Switzerland", cc: "it", accent: "Standard, Regionale" },
  { name: "Nederlands", region: "Netherlands, Belgium", cc: "nl", accent: "Hollands, Vlaams" },
  { name: "日本語", region: "Japan", cc: "jp", accent: "Standard, Kansai" },
  { name: "Türkçe", region: "Türkiye", cc: "tr", accent: "İstanbul, Anadolu" },
  { name: "العربية", region: "22 Länder", cc: "sa", accent: "17 Dialekte (Ägyptisch, Levantinisch, Golf…)" },
  { name: "Polski", region: "Poland", cc: "pl", accent: "Warszawski, Krakowski" },
  { name: "Русский", region: "Russia, Ukraine", cc: "ru", accent: "Московский, Региональный" },
  { name: "中文", region: "China, Taiwan, Hong Kong", cc: "cn", accent: "Mandarin, Cantonese" },
  { name: "한국어", region: "South Korea", cc: "kr", accent: "Seoul, Busan" },
  { name: "Tiếng Việt", region: "Vietnam", cc: "vn", accent: "Hà Nội, Sài Gòn" },
  { name: "Ελληνικά", region: "Greece, Cyprus", cc: "gr", accent: "Αθηναϊκά, Κυπριακά" },
  { name: "ไทย", region: "Thailand", cc: "th", accent: "กรุงเทพฯ, เหนือ" },
  { name: "Português", region: "Brazil, Portugal", cc: "br", accent: "Brasileiro, Europeu" },
  { name: "हिंदी", region: "India", cc: "in", accent: "Standard, Mumbai" },
  { name: "فارسی", region: "Iran, Afghanistan", cc: "ir", accent: "Tehrani, Dari" },
  { name: "Українська", region: "Ukraine", cc: "ua", accent: "Київський, Львівський" },
  { name: "Svenska", region: "Sweden", cc: "se", accent: "Rikssvenska" },
  { name: "Dansk", region: "Denmark", cc: "dk", accent: "Københavnsk" },
  { name: "Suomi", region: "Finland", cc: "fi", accent: "Helsinki" },
  { name: "Bahasa Indonesia", region: "Indonesia", cc: "id", accent: "Jakarta" },
  { name: "Bahasa Melayu", region: "Malaysia", cc: "my", accent: "Standard" },
  { name: "Română", region: "Romania", cc: "ro", accent: "București" },
  { name: "Hrvatski", region: "Croatia", cc: "hr", accent: "Zagreb" },
  { name: "Srpski", region: "Serbia", cc: "rs", accent: "Beograd" },
  { name: "Čeština", region: "Czech Republic", cc: "cz", accent: "Praha" },
  { name: "Magyar", region: "Hungary", cc: "hu", accent: "Budapest" },
  { name: "Norsk", region: "Norway", cc: "no", accent: "Oslo" },
  { name: "Slovenčina", region: "Slovakia", cc: "sk", accent: "Bratislava" },
  { name: "עברית", region: "Israel", cc: "il", accent: "Standard" },
  { name: "Български", region: "Bulgaria", cc: "bg", accent: "Sofia" },
  { name: "Lietuvių", region: "Lithuania", cc: "lt", accent: "Vilnius" },
  { name: "Latviešu", region: "Latvia", cc: "lv", accent: "Rīga" },
  { name: "Eesti", region: "Estonia", cc: "ee", accent: "Tallinn" },
  { name: "Català", region: "Spain (Catalonia)", cc: "es", accent: "Barcelona" },
  { name: "اردو", region: "Pakistan, India", cc: "pk", accent: "Standard" },
  { name: "Tagalog", region: "Philippines", cc: "ph", accent: "Manila" },
];

function Flag({ cc, name }: { cc: string; name: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w80/${cc}.png`}
      srcSet={`https://flagcdn.com/w40/${cc}.png 1x, https://flagcdn.com/w80/${cc}.png 2x`}
      width={40}
      height={30}
      alt=""
      title={name}
      className="w-10 h-[30px] rounded object-cover shadow-sm shrink-0 mt-0.5"
      loading="lazy"
    />
  );
}

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
        <StatsBand>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Stat value="50+" label={t.stats_languages ?? "Spracherkennung Sprachen"} />
            <Stat value="95%" label={t.stats_coverage} />
            <Stat value="<1s" label={t.stats_response} />
            <Stat value="98%" label={t.stats_accuracy} />
          </div>
        </StatsBand>
      </Section>

      <Section>
        <SectionHead title={t.grid_title ?? "Unterstützte Sprachen"} subtitle={t.grid_subtitle ?? "Spracherkennung (STT) in über 50 Sprachen via Deepgram Nova-3"} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {ALL_LANGUAGES.map((lang, i) => (
            <Reveal
              key={lang.name}
              delay={Math.min(i * 0.02, 0.3)}
              className="rounded-3xl bg-[#f7f4ee] p-6 flex items-start gap-4"
            >
              <Flag cc={lang.cc} name={lang.name} />
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
        <SectionHead title={t.voice_title} subtitle={t.voice_subtitle} />
        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
          {[
            t.feature_dialect,
            t.feature_intonation,
            t.feature_cultural,
            t.feature_volume,
          ]
            .filter(Boolean)
            .map((item: { title?: string; desc?: string }, i) => (
              <Reveal
                key={item.title ?? i}
                delay={i * 0.06}
                className="rounded-3xl bg-[#f7f4ee] p-6 lg:p-8"
              >
                <span
                  className="block w-8 h-[3px] rounded-full bg-primary/70 mb-5"
                  aria-hidden="true"
                />
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">{item.title}</h3>
                {item.desc && (
                  <p className="mt-2 text-sm sm:text-[15px] text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                )}
              </Reveal>
            ))}
        </div>
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
