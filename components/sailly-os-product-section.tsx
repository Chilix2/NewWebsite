"use client";

import React from "react";
import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SaillyOsPreview } from "./sailly-os-preview";

interface SaillyOsProductSectionProps {
  dict: Record<string, unknown>;
  locale?: string;
}

interface ModuleBlock {
  title: string;
  lead: string;
  points: string[];
  href: string;
  linkLabel: string;
}

/**
 * Sailly OS — product page section: dashboard preview + plain capability overview.
 */
export function SaillyOsProductSection({ dict, locale = "de" }: SaillyOsProductSectionProps) {
  const platform = (dict.platform_os ?? {}) as Record<string, string | string[]>;

  const modules: ModuleBlock[] = [
    {
      title: (platform.voice_title as string) ?? "Anrufe",
      lead:
        (platform.voice_lead as string) ??
        "Angenommen, gebucht, weitergeleitet — ohne Warteschleife.",
      points: (platform.voice_points as string[]) ?? [
        "Jeder Anruf wird sofort beantwortet",
        "Reservierungen landen in Ihrem System",
        "Gäste werden in ihrer Sprache bedient",
      ],
      href: `/${locale}/produkt`,
      linkLabel: (platform.voice_pill as string) ?? "Voice Agent",
    },
    {
      title: (platform.insights_title as string) ?? "Auswertungen",
      lead:
        (platform.insights_lead as string) ??
        "Was heute reingekommen ist — ohne Excel und ohne Rückfragen.",
      points: (platform.insights_points as string[]) ?? [
        "Anrufvolumen und häufigste Anliegen",
        "Gebuchte Termine auf einen Blick",
        "Gehostet in Deutschland, DSGVO-konform",
      ],
      href: `/${locale}/produkt/data-insights`,
      linkLabel: (platform.insights_pill as string) ?? "Daten & Insights",
    },
    {
      title: (platform.integrations_title as string) ?? "Anbindung",
      lead:
        (platform.integrations_lead as string) ??
        "Verbunden mit der Telefonanlage und den Tools, die Sie schon nutzen.",
      points: (platform.integrations_points as string[]) ?? [
        "Kalender, PMS und Reservierungssysteme",
        "Buchungen direkt im Tagesgeschäft",
        "Kein manuelles Nachpflegen",
      ],
      href: `/${locale}/produkt/integrationen`,
      linkLabel: (platform.integrations_pill as string) ?? "Integrationen",
    },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <section className="py-20 lg:py-28 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="max-w-2xl mb-10 lg:mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              {platform.title ?? "Sailly OS"}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              {platform.subtitle ??
                "Eine Oberfläche für Anrufe, Termine und Auswertungen — für Gastronomie, Hotellerie, Praxen und Kanzleien."}
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-16 lg:mb-20"
          >
            <SaillyOsPreview dict={dict} locale={locale} />
          </m.div>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
            {modules.map((mod, i) => (
              <m.div
                key={mod.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <h3 className="text-lg font-bold text-slate-900 mb-2">{mod.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{mod.lead}</p>
                <ul className="space-y-2 mb-5">
                  {mod.points.map((point) => (
                    <li key={point} className="text-sm text-slate-500 flex gap-2">
                      <span className="text-slate-300 shrink-0">—</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={mod.href}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-primary transition-colors"
                >
                  {mod.linkLabel}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </m.div>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
