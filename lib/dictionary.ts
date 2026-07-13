const dictionaries: Record<string, () => Promise<any>> = {
  de: () => import("@/dictionaries/de.json").then((module) => module.default),
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  tr: () => import("@/dictionaries/tr.json").then((module) => module.default),
  es: () => import("@/dictionaries/es.json").then((module) => module.default),
  ar: () => import("@/dictionaries/ar.json").then((module) => module.default),
  zh: () => import("@/dictionaries/zh.json").then((module) => module.default),
  ru: () => import("@/dictionaries/ru.json").then((module) => module.default),
  pl: () => import("@/dictionaries/pl.json").then((module) => module.default),
  fr: () => import("@/dictionaries/fr.json").then((module) => module.default),
  el: () => import("@/dictionaries/el.json").then((module) => module.default),
  ko: () => import("@/dictionaries/ko.json").then((module) => module.default),
  vi: () => import("@/dictionaries/vi.json").then((module) => module.default),
  th: () => import("@/dictionaries/th.json").then((module) => module.default),
};

export const supportedLocales = ["de", "en", "tr", "es", "ar", "zh", "ru", "pl", "fr", "el", "ko", "vi", "th"];
export const rtlLocales = ["ar"];

/**
 * Deep-merges a locale dictionary over the English base so that any key a
 * locale hasn't translated yet resolves to English instead of disappearing
 * (or falling back to hard-coded German inside components).
 * Arrays are treated as atomic values: a locale either provides the full
 * list (e.g. chat scenarios) or inherits the complete English one.
 */
function mergeWithFallback(base: any, override: any): any {
  if (override === undefined || override === null) return base;
  if (Array.isArray(override) || typeof override !== "object") return override;
  if (typeof base !== "object" || base === null || Array.isArray(base)) return override;

  const result: Record<string, any> = { ...base };
  for (const key of Object.keys(override)) {
    result[key] = mergeWithFallback(base[key], override[key]);
  }
  return result;
}

const cache = new Map<string, any>();

export const getDictionary = async (locale: string) => {
  const validLocale = locale && locale in dictionaries ? locale : "de";
  if (cache.has(validLocale)) return cache.get(validLocale);

  const dict = await dictionaries[validLocale]();
  const merged =
    validLocale === "en" ? dict : mergeWithFallback(await dictionaries.en(), dict);

  cache.set(validLocale, merged);
  return merged;
};
