"use client";

import React from "react";
import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface FinalCtaV2Props {
  dict: any;
  locale: string;
}

export function FinalCtaV2({ dict, locale }: FinalCtaV2Props) {
  const cta = dict.cta_section ?? {};

  return (
    <LazyMotion features={domAnimation}>
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              {cta.title ?? "Bereit, Ihr Team zu entlasten?"}
            </h2>
            {cta.subtitle && (
              <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                {cta.subtitle}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Link
                href={`/${locale}/demo`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 text-lg"
              >
                {cta.demo ?? "Demo anfragen"}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center px-8 py-4 border border-slate-200 text-slate-700 font-semibold rounded-full hover:bg-slate-50 transition-all text-lg"
              >
                {cta.contact ?? "Kontakt aufnehmen"}
              </Link>
            </div>

            {(cta.guarantee || true) && (
              <p className="mt-6 text-sm text-slate-400 font-medium">
                <CheckCircle2 className="w-4 h-4 inline me-2 text-green-500" />
                {cta.guarantee ?? "30 Tage risikofrei testen"}
              </p>
            )}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
