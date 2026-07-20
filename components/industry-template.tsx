"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CinemaFrame } from "./cinema-frame";
import { IndustryScenariosSection } from "./industry-scenarios-section";
import { getIndustryTheme } from "@/lib/industry-themes";
import { cn } from "@/lib/utils";

interface IndustryProps {
  dict: any; // The specific industry dictionary segment (e.g. dict.industries.hotels)
  globalDict: any; // The full dictionary for shared labels like CTA
  industryKey: string;
  heroImage: string;
  /** Optional cinematic footage; falls back to heroImage if missing. */
  heroVideo?: string;
  /** Multiple hero clips — CinemaFrame plays them as a playlist. */
  heroVideos?: string[];
  /** Agent message overlaid on the footage, Sierra-style. */
  agentLine?: string;
  /** Optional second overlay line — triggers line1 → line2 → logo sequence. */
  agentLine2?: string;
  locale: string;
}

/**
 * Industry sub-page in the Sierra pattern:
 * hero → cinematic frame → challenges (soft light cards) →
 * benefits (one warm container, icon-free list) → ROI band → scenarios.
 */
export function IndustryTemplate({
  dict,
  globalDict,
  industryKey,
  heroImage,
  heroVideo,
  heroVideos,
  agentLine,
  agentLine2,
  locale,
}: IndustryProps) {
  const industryLabel =
    globalDict.nav?.solutions?.items?.[industryKey] ?? "Branche";
  const title1 = dict.hero.heading_part1 ?? industryLabel;
  const title2 = dict.hero.heading_part2 as string | undefined;
  const hasVideo = Boolean(heroVideos?.length || heroVideo);
  const theme = getIndustryTheme(industryKey);

  return (
    <div className="flex flex-col min-h-screen text-slate-900 bg-white">
      {/* HERO — duo page title matching product pages (without kicker) */}
      <section className="pt-6 lg:pt-10 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.06] text-slate-900">
              {title1}
              {title2 ? <span className="text-primary"> {title2}</span> : null}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-8 lg:mt-10"
          >
            {hasVideo ? (
              <CinemaFrame
                src={heroVideo}
                srcs={heroVideos}
                overlayText={agentLine}
                overlayText2={agentLine2}
                priority
              />
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
                  <div className="absolute inset-0 z-10 flex items-center justify-center px-6 sm:px-12 pointer-events-none">
                    <p className="hero-clip-text hero-clip-in text-center text-white font-bold tracking-tight leading-[1.05] text-3xl sm:text-5xl lg:text-6xl max-w-4xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
                      {agentLine}
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl space-y-4 mt-8 lg:mt-10"
          >
            <p className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl">
              {dict.hero.title}
            </p>
            <div className="pt-2">
              <Link
                href={`/${locale}/demo`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 min-h-[44px]"
              >
                {dict.hero.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Challenges → Benefits → ROI (merged hero block) */}
          <div className="mt-16 lg:mt-20 space-y-16 lg:space-y-20">
            {/* Challenges — soft light cards, Sierra-style (no icons) */}
            <div>
              {dict.challenges.title ? (
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-10 lg:mb-14 max-w-2xl">
                  {dict.challenges.title}
                </h2>
              ) : null}
              <div className="grid sm:grid-cols-3 gap-5 lg:gap-6">
                {dict.challenges.items.map((item: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className={cn(
                      "rounded-3xl p-6 lg:p-8 flex flex-col",
                      theme.panel
                    )}
                  >
                    <span className="block w-8 h-[3px] rounded-full bg-primary/70 mb-5" aria-hidden="true" />
                    <h3 className="text-lg font-bold mb-2.5 text-slate-900">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-[15px]">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Benefits — one warm Sierra container: title left, icon-free list right */}
            <div className={cn("rounded-[2.5rem] p-7 sm:p-10 lg:p-14", theme.panel)}>
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

            {/* ROI — cream stats band (matches challenge/cream cards) */}
            <div className={cn("rounded-3xl p-8 lg:p-12", theme.panel)}>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-10 max-w-2xl">
                {globalDict.industry_template?.roi?.title || "Messbare Ergebnisse ab Tag 1"}
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {["satisfaction", "fewer_calls", "availability", "implementation"].map((key) => {
                  const metric = globalDict.industry_template?.roi?.metrics?.[key];
                  if (!metric) return null;
                  return (
                    <div key={key}>
                      <p className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{metric.value}</p>
                      <p className="mt-1.5 text-sm text-slate-500">{metric.label}</p>
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
    </div>
  );
}
