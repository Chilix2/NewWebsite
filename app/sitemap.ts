import type { MetadataRoute } from "next";

const SITE_URL = "https://www.sailly.de";
const LOCALES = ["de", "en", "tr", "es", "ar", "zh", "ru", "pl", "fr", "el", "ko", "vi", "th"];

const PAGES = [
  "",                              // homepage
  "/loesungen/hotels",
  "/loesungen/restaurants",
  "/loesungen/medical",
  "/loesungen/legal",
  "/loesungen/services",
  "/preise",
  "/pricing",
  "/produkt",
  "/produkt/integrationen",
  "/produkt/data-insights",
  "/produkt/security-compliance",
  "/produkt/languages",
  "/produkt/strategic-partners",
  "/produkt/ki-integration",
  "/produkt/workflow-builder",
  "/produkt/templates",
  "/technologie",
  "/demo",
  "/contact",
  "/news",
  "/blog",
  "/community",
  "/resources",
  "/docs",
  "/agb",
  "/datenschutz",
  "/impressum",
  "/use-cases/branche/hotels",
  "/use-cases/branche/restaurants",
  "/use-cases/branche/medical",
  "/use-cases/branche/banking",
  "/use-cases/branche/healthcare",
  "/use-cases/branche/legal",
  "/use-cases/branche/retail",
  "/use-cases/branche/manufacturing",
  "/use-cases/branche/baubranche",
  "/use-cases/branche/telecom",
  "/use-cases/branche/public-sector",
  "/ai-impacts/it-ops",
  "/ai-impacts/marketing",
  "/ai-impacts/sales",
  "/ai-impacts/secops",
  "/ai-impacts/support",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const page of PAGES) {
      const url = `${SITE_URL}/${locale}${page}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : page.startsWith("/loesungen") ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${SITE_URL}/${l}${page}`])
          ),
        },
      });
    }
  }

  return entries;
}
