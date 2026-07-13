"use client";

import React from "react";
import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CinemaFrame } from "./cinema-frame";
import { HeroChatOverlay } from "./hero-chat-overlay";

interface ProduktHeroV2Props {
  dict: Record<string, unknown>;
  locale: string;
}

/**
 * Product page hero — Sierra industry pattern: headline on white,
 * cinematic footage with glass chat overlay below.
 */
export function ProduktHeroV2({ dict, locale }: ProduktHeroV2Props) {
  const page = (dict.produkt_page ?? {}) as Record<string, unknown>;
  const hero = (page.hero ?? {}) as Record<string, string>;

  return (
    <LazyMotion features={domAnimation}>
      <section className="pt-32 lg:pt-40 pb-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl space-y-4"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">
              {hero.eyebrow ?? "Sailly Voice Agent"}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.06] text-slate-900">
              {hero.title_line1 ?? "Anrufe beantworten."}
              <br />
              <span className="text-slate-700">{hero.title_line2 ?? "Termine eintragen."}</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl">
              {hero.description ??
                "Sailly nimmt jeden Anruf an, beantwortet Fragen und trägt Buchungen direkt in Ihr System ein — freundlich, zuverlässig, rund um die Uhr."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                href={`/${locale}/demo`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 min-h-[44px]"
              >
                {hero.cta_primary ?? "Demo anfragen"}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/${locale}/preise`}
                className="inline-flex items-center justify-center px-7 py-3.5 border border-slate-200 text-slate-700 font-semibold rounded-full hover:bg-slate-50 transition-all min-h-[44px]"
              >
                {hero.cta_secondary ?? "Preise ansehen"}
              </Link>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-12 lg:mt-16 relative"
          >
            <CinemaFrame
              src="/videos/hero-call.mp4?v=1"
              className="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/10]"
              aspect="adaptive"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 z-10 flex justify-end p-4 sm:p-8 lg:p-10 pointer-events-none">
              <HeroChatOverlay dict={dict} />
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
