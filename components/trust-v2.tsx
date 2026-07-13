"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { ComplianceCertificates } from "./compliance-certificates";

interface TrustV2Props {
  dict: Record<string, unknown>;
}

/** Sierra 1:1 — centered headline, subtitle, compliance badge row. */
export function TrustV2({ dict }: TrustV2Props) {
  const trust = (dict.security_trust ?? {}) as Record<string, string>;

  const title = trust.title ?? "Höchste Standards für deutsche Unternehmen";
  const subtitle =
    trust.subtitle ??
    "Sailly wurde mit höchstem Anspruch an Vertrauen, Sicherheit und Compliance entwickelt.";

  return (
    <LazyMotion features={domAnimation}>
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-10 lg:mb-14"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-900 tracking-tight leading-[1.15]">
              {title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-500 leading-relaxed">
              {subtitle}
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <ComplianceCertificates />
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
