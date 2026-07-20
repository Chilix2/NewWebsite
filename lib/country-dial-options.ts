/**
 * Country dial options aligned with languages page flags (flagcdn ISO cc).
 * Deduplicated by `cc`.
 */
export type CountryDialOption = {
  cc: string;
  name: string;
  dial: string;
};

const RAW: CountryDialOption[] = [
  { cc: "de", name: "Deutschland", dial: "+49" },
  { cc: "us", name: "United States", dial: "+1" },
  { cc: "fr", name: "France", dial: "+33" },
  { cc: "es", name: "España", dial: "+34" },
  { cc: "it", name: "Italia", dial: "+39" },
  { cc: "nl", name: "Nederland", dial: "+31" },
  { cc: "jp", name: "Japan", dial: "+81" },
  { cc: "tr", name: "Türkiye", dial: "+90" },
  { cc: "sa", name: "Saudi Arabia", dial: "+966" },
  { cc: "pl", name: "Polska", dial: "+48" },
  { cc: "ru", name: "Россия", dial: "+7" },
  { cc: "cn", name: "中国", dial: "+86" },
  { cc: "kr", name: "한국", dial: "+82" },
  { cc: "vn", name: "Việt Nam", dial: "+84" },
  { cc: "gr", name: "Ελλάδα", dial: "+30" },
  { cc: "th", name: "ไทย", dial: "+66" },
  { cc: "br", name: "Brasil", dial: "+55" },
  { cc: "in", name: "India", dial: "+91" },
  { cc: "ir", name: "ایران", dial: "+98" },
  { cc: "ua", name: "Україна", dial: "+380" },
  { cc: "se", name: "Sverige", dial: "+46" },
  { cc: "dk", name: "Danmark", dial: "+45" },
  { cc: "fi", name: "Suomi", dial: "+358" },
  { cc: "id", name: "Indonesia", dial: "+62" },
  { cc: "my", name: "Malaysia", dial: "+60" },
  { cc: "ro", name: "România", dial: "+40" },
  { cc: "hr", name: "Hrvatska", dial: "+385" },
  { cc: "rs", name: "Srbija", dial: "+381" },
  { cc: "cz", name: "Česko", dial: "+420" },
  { cc: "hu", name: "Magyarország", dial: "+36" },
  { cc: "no", name: "Norge", dial: "+47" },
  { cc: "sk", name: "Slovensko", dial: "+421" },
  { cc: "il", name: "ישראל", dial: "+972" },
  { cc: "bg", name: "България", dial: "+359" },
  { cc: "lt", name: "Lietuva", dial: "+370" },
  { cc: "lv", name: "Latvija", dial: "+371" },
  { cc: "ee", name: "Eesti", dial: "+372" },
  { cc: "pk", name: "Pakistan", dial: "+92" },
  { cc: "ph", name: "Philippines", dial: "+63" },
  { cc: "at", name: "Österreich", dial: "+43" },
  { cc: "ch", name: "Schweiz", dial: "+41" },
  { cc: "gb", name: "United Kingdom", dial: "+44" },
  { cc: "be", name: "Belgique", dial: "+32" },
  { cc: "pt", name: "Portugal", dial: "+351" },
];

/** Unique by country code, sorted by name */
export const COUNTRY_DIAL_OPTIONS: CountryDialOption[] = (() => {
  const seen = new Set<string>();
  const out: CountryDialOption[] = [];
  for (const row of RAW) {
    if (seen.has(row.cc)) continue;
    seen.add(row.cc);
    out.push(row);
  }
  return out.sort((a, b) => a.name.localeCompare(b.name, "en"));
})();

const LOCALE_TO_CC: Record<string, string> = {
  de: "de",
  en: "us",
  fr: "fr",
  es: "es",
  tr: "tr",
  ar: "sa",
  zh: "cn",
  ru: "ru",
  pl: "pl",
  el: "gr",
  ko: "kr",
  vi: "vn",
  th: "th",
};

export function dialOptionForLocale(locale: string): CountryDialOption {
  const cc = LOCALE_TO_CC[locale] ?? "de";
  return COUNTRY_DIAL_OPTIONS.find((o) => o.cc === cc) ?? COUNTRY_DIAL_OPTIONS.find((o) => o.cc === "de")!;
}

export function flagUrl(cc: string, width = 40): string {
  return `https://flagcdn.com/w${width}/${cc}.png`;
}

/** Build E.164 from dial (+49) + national digits (strip leading 0). */
export function toE164(dial: string, national: string): string {
  let digits = national.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = digits.slice(1);
  const dialDigits = dial.replace(/\D/g, "");
  return `+${dialDigits}${digits}`;
}
