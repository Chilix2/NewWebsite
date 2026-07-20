"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { cn } from "@/lib/utils";

/** Cream band for metric / ROI stats — same fill as language/cream cards (#f7f4ee). */
export function StatsBand({
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
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55 }}
        className={cn("rounded-3xl bg-[#f7f4ee] p-8 lg:p-12", className)}
      >
        {title && (
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 max-w-2xl">
            {title}
          </h2>
        )}
        {subtitle && <p className="mt-3 text-slate-500 max-w-2xl">{subtitle}</p>}
        {children}
      </m.div>
    </LazyMotion>
  );
}
