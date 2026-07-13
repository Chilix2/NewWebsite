"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";

interface ProofBandV2Props {
  dict: any;
}

/**
 * Credibility band directly under the hero (Sierra places its logo wall here).
 * Sailly's honest equivalent: verifiable outcome metrics + who it's built for.
 */
export function ProofBandV2({ dict }: ProofBandV2Props) {
  const stats = dict.hero?.stats ?? {};
  const items = stats.items ?? {};
  const entries = Object.entries(items) as [string, { value: string; label: string }][];

  if (entries.length === 0) return null;

  return (
    <LazyMotion features={domAnimation}>
      <section className="bg-white py-16 lg:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <m.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center text-sm font-medium text-slate-400 mb-10"
          >
            {stats.title ?? "Ergebnisse unserer Partner"}
          </m.p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 max-w-4xl mx-auto">
            {entries.map(([key, item], i) => (
              <m.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center"
              >
                <p className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-slate-500">{item.label}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
