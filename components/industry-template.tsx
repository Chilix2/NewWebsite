"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CinemaFrame } from "./cinema-frame";
import { AudioDemoCard } from "./audio-demo-card";
import { IndustryScenariosSection } from "./industry-scenarios-section";

interface IndustryProps {
  dict: any; // The specific industry dictionary segment (e.g. dict.industries.hotels)
  globalDict: any; // The full dictionary for shared labels like CTA
  industryKey: string;
  heroImage: string;
  /** Optional cinematic footage; falls back to heroImage if missing. */
  heroVideo?: string;
  /** Agent message overlaid on the footage, Sierra-style. */
  agentLine?: string;
  locale: string;
  audioScenarioKey: string; // maps to {locale}-{audioScenarioKey}.mp3
}

const LOCALE_LANGUAGE_LABELS: Record<string, string> = {
  de: "Deutsch", en: "English", fr: "Français", es: "Español",
  tr: "Türkçe", ru: "Русский", pl: "Polski", ar: "العربية", zh: "中文",
};

/**
 * Industry sub-page in the Sierra pattern:
 * hero → cinematic frame → challenges (soft light cards) →
 * benefits (one warm container, icon-free list) → ROI band → scenarios → audio.
 */
export function IndustryTemplate({
  dict,
  globalDict,
  industryKey,
  heroImage,
  heroVideo,
  agentLine,
  locale,
  audioScenarioKey,
}: IndustryProps) {
  const audioElements = React.useRef<(HTMLAudioElement | null)[]>([]);
  const industryLabel =
    globalDict.nav?.solutions?.items?.[industryKey] ?? "Branche";

  return (
    <div className="flex flex-col min-h-screen text-slate-900 bg-white">
      {/* HERO — heading, cinematic frame, then challenges + benefits + ROI */}
      <section className="pt-6 lg:pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl space-y-4"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">
              {industryLabel}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.06]">
              {dict.hero.title}
            </h1>
            <p className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl">
              {dict.hero.subtitle}
            </p>
            <div className="pt-4">
              <Link
                href={`/${locale}/demo`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 min-h-[44px]"
              >
                {dict.hero.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-12 lg:mt-16"
          >
            {heroVideo ? (
              <CinemaFrame src={heroVideo} overlayText={agentLine} priority />
            ) : (
              <div className="relative overflow-hidden rounded-3xl aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/10]">
                <Image
                  src={heroImage}
                  alt={dict.hero.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />
                {agentLine && (
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 sm:px-12 pointer-events-none">
                    <p className="text-white/85 text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] max-w-3xl">
                      {agentLine}
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Challenges → Benefits → ROI (merged hero block) */}
          <div className="mt-16 lg:mt-20 space-y-16 lg:space-y-20">
            {/* Challenges — soft light cards, Sierra-style (no icons) */}
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-10 lg:mb-14 max-w-2xl">
                {dict.challenges.title}
              </h2>
              <div className="grid sm:grid-cols-3 gap-5 lg:gap-6">
                {dict.challenges.items.map((item: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="rounded-3xl bg-[#f7f4ee] p-6 lg:p-8 flex flex-col"
                  >
                    <span className="block w-8 h-[3px] rounded-full bg-primary/70 mb-5" aria-hidden="true" />
                    <h3 className="text-lg font-bold mb-2.5 text-slate-900">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-[15px]">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Benefits — one warm Sierra container: title left, icon-free list right */}
            <div className="rounded-[2.5rem] bg-[#f7f4ee] p-7 sm:p-10 lg:p-14">
              <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-16 items-start">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight lg:sticky lg:top-28">
                  {dict.benefits.title}
                </h2>
                <div className="divide-y divide-slate-900/10">
                  {dict.benefits.items.map((item: any, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.06 }}
                      className="py-6 first:pt-0 last:pb-0"
                    >
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-900">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-[15px] sm:text-base">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* ROI — dark rounded-3xl band with metrics */}
            <div className="rounded-3xl bg-[#0f172a] text-white p-8 lg:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-10 max-w-2xl">
                {globalDict.industry_template?.roi?.title || "Messbare Ergebnisse ab Tag 1"}
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {["satisfaction", "fewer_calls", "availability", "implementation"].map((key) => {
                  const metric = globalDict.industry_template?.roi?.metrics?.[key];
                  if (!metric) return null;
                  return (
                    <div key={key}>
                      <p className="text-3xl sm:text-4xl font-bold tracking-tight">{metric.value}</p>
                      <p className="mt-1.5 text-sm text-white/60">{metric.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REAL-WORLD SCENARIOS — Sierra pattern with industry-colored chat cards */}
      {dict.scenarios?.items?.length > 0 && (
        <IndustryScenariosSection scenarios={dict.scenarios} industryKey={industryKey} />
      )}

      {/* AUDIO SAMPLES — the live proof */}
      {dict.audio_samples && (
        <section className="py-16 lg:py-20 bg-[#faf7f4]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              {dict.audio_samples.title}
            </h2>
            <p className="mt-3 text-slate-500 text-lg">{dict.audio_samples.subtitle}</p>
            <div className="mt-10 max-w-xl mx-auto space-y-4 text-left">
              {dict.audio_samples.samples?.map((sample: any, i: number) => (
                <AudioDemoCard
                  key={i}
                  label={sample.label}
                  desc={sample.desc}
                  languageLabel={LOCALE_LANGUAGE_LABELS[locale] || locale}
                  audioPath={`/audio/demos/${locale}-${audioScenarioKey}.mp3`}
                  onRegisterRef={(el) => { audioElements.current[i] = el; }}
                  onPauseOthers={() => {
                    audioElements.current.forEach((ref, idx) => {
                      if (idx !== i && ref) ref.pause();
                    });
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
