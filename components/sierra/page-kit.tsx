"use client";

import React from "react";
import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Sierra-style page primitives — the shared design language of the homepage
 * and industry pages: white canvas, warm cream containers (#f7f4ee),
 * coral (#ff9b8a) accents, navy (#0f172a) bands, icon-free lists.
 */

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, delay }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold text-primary uppercase tracking-wider">{children}</p>
  );
}

export function SierraHero({
  kicker,
  title1,
  title2,
  subtitle,
  ctaLabel,
  ctaHref,
  image,
  children,
  contentClassName,
  titleClassName,
}: {
  kicker?: string;
  title1: string;
  title2?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: React.ReactNode;
  children?: React.ReactNode;
  contentClassName?: string;
  titleClassName?: string;
}) {
  return (
    <section className="pt-6 lg:pt-10 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={image ? "lg:grid lg:grid-cols-[1fr_auto] lg:gap-12 lg:items-center" : ""}>
          <Reveal className={cn("max-w-3xl space-y-4", contentClassName)}>
            {kicker && <Kicker>{kicker}</Kicker>}
            <h1
              className={cn(
                "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.06] text-slate-900",
                titleClassName
              )}
            >
              {title1}
              {title2 && <span className="text-primary"> {title2}</span>}
            </h1>
            {subtitle && (
              <p className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl">{subtitle}</p>
            )}
            {ctaLabel && ctaHref && (
              <div className="pt-4">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 min-h-[44px]"
                >
                  {ctaLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </Reveal>
          {image && (
            <Reveal delay={0.1} className="hidden lg:block">
              {image}
            </Reveal>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

export function Section({
  children,
  className,
  tinted = false,
}: {
  children: React.ReactNode;
  className?: string;
  tinted?: boolean;
}) {
  return (
    <section className={cn("py-14 lg:py-20", tinted && "bg-[#faf7f4]", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">{children}</div>
    </section>
  );
}

export function SectionHead({
  kicker,
  title,
  subtitle,
  center = false,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={cn("max-w-3xl mb-10 lg:mb-14", center && "mx-auto text-center")}>
      {kicker && <div className="mb-3"><Kicker>{kicker}</Kicker></div>}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">{title}</h2>
      {subtitle && <p className="mt-3 text-lg text-slate-500 leading-relaxed">{subtitle}</p>}
    </Reveal>
  );
}

/** Soft warm card with a coral top rule — the challenge-card pattern. */
export function CreamCard({
  title,
  desc,
  meta,
  delay = 0,
  className,
  children,
}: {
  title: string;
  desc?: string;
  meta?: string;
  delay?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal delay={delay} className={cn("rounded-3xl bg-[#f7f4ee] p-6 lg:p-8 flex flex-col", className)}>
      <span className="block w-8 h-[3px] rounded-full bg-primary/70 mb-5" aria-hidden="true" />
      <h3 className="text-lg font-bold mb-2.5 text-slate-900">{title}</h3>
      {desc && <p className="text-slate-600 leading-relaxed text-[15px]">{desc}</p>}
      {meta && <p className="mt-auto pt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">{meta}</p>}
      {children}
    </Reveal>
  );
}

/** One large warm container: sticky title left, icon-free divided list right. */
export function CreamPanel({
  title,
  subtitle,
  items,
  children,
}: {
  title: string;
  subtitle?: string;
  items?: { title: string; desc?: string }[];
  children?: React.ReactNode;
}) {
  return (
    <Reveal className="rounded-[2.5rem] bg-[#f7f4ee] p-7 sm:p-10 lg:p-14">
      <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-28">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">{title}</h2>
          {subtitle && <p className="mt-3 text-slate-500 leading-relaxed">{subtitle}</p>}
        </div>
        <div className="divide-y divide-slate-900/10">
          {items?.map((item, i) => (
            <div key={i} className="py-6 first:pt-0 last:pb-0">
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-900">{item.title}</h3>
              {item.desc && (
                <p className="text-slate-600 leading-relaxed text-[15px] sm:text-base">{item.desc}</p>
              )}
            </div>
          ))}
          {children}
        </div>
      </div>
    </Reveal>
  );
}

/** Soft peach band for metric / ROI stats rows. */
export { StatsBand } from "./stats-band";

/** Cream band for CTAs and privacy copy — same fill as cream cards (#f7f4ee). */
export function NavyBand({
  title,
  subtitle,
  children,
  className,
}: {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("rounded-3xl bg-[#f7f4ee] p-8 lg:p-12", className)}>
      {title && (
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 max-w-2xl">{title}</h2>
      )}
      {subtitle && <p className="mt-3 text-slate-500 max-w-2xl">{subtitle}</p>}
      {children}
    </Reveal>
  );
}

export function CtaBand({
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  title: string;
  subtitle?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <NavyBand title={title} subtitle={subtitle}>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href={primaryHref}
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all min-h-[44px]"
        >
          {primaryLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
        {secondaryLabel && secondaryHref && (
          <Link
            href={secondaryHref}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white border border-slate-200 text-slate-800 font-semibold rounded-full hover:bg-slate-50 transition-all min-h-[44px]"
          >
            {secondaryLabel}
          </Link>
        )}
      </div>
    </NavyBand>
  );
}

/** Big stat value + label, for stat rows on white or navy. */
export function Stat({ value, label, dark = false }: { value: string; label: string; dark?: boolean }) {
  return (
    <div>
      <p className={cn("text-3xl sm:text-4xl font-bold tracking-tight", dark ? "text-white" : "text-slate-900")}>{value}</p>
      <p className={cn("mt-1.5 text-sm", dark ? "text-white/60" : "text-slate-500")}>{label}</p>
    </div>
  );
}
