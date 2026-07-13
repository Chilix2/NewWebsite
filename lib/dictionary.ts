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

export const getDictionary = async (locale: string) => {
  const validLocale = locale && locale in dictionaries ? locale : "de";
  return dictionaries[validLocale]();
};
