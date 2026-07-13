import type { Metadata } from "next";
import { getDictionary, rtlLocales } from "@/lib/dictionary";
// import SaillyHeader from "@/components/sailly-header"; // OLD — keep for rollback
import SaillyHeaderV2 from "@/components/sailly-header-v2";
import { MainShell } from "@/components/main-shell";
import { SaillyFooter } from "@/components/sailly-footer";
import { LocaleHtmlAttrs } from "@/components/locale-html-attrs";

const SITE_URL = "https://www.sailly.de";
const LOCALES = ["de", "en", "tr", "es", "ar", "zh", "ru", "pl", "fr", "el", "ko", "vi", "th"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const languages: Record<string, string> = {};
  for (const lang of LOCALES) {
    languages[lang] = `${SITE_URL}/${lang}`;
  }
  languages["x-default"] = `${SITE_URL}/de`;

  return {
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages,
    },
    openGraph: {
      locale,
      alternateLocale: LOCALES.filter((l) => l !== locale),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRtl = rtlLocales.includes(locale);

  return (
    <div className="min-h-dvh overflow-x-hidden relative flex flex-col bg-white" dir={isRtl ? "rtl" : "ltr"} suppressHydrationWarning>
      <LocaleHtmlAttrs locale={locale} dir={isRtl ? "rtl" : "ltr"} />
      <SaillyHeaderV2 dict={dict} locale={locale} />
      <MainShell locale={locale}>{children}</MainShell>
      <SaillyFooter dict={dict} locale={locale} />
    </div>
  );
}