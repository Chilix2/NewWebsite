"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";

interface SocialProofV2Props {
  dict: any;
}

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  location?: string;
}

/**
 * Sierra pattern: named people with real roles, quote as the hero element.
 * Content comes exclusively from the dictionary — no invented quotes.
 */
export function SocialProofV2({ dict }: SocialProofV2Props) {
  const t = dict.testimonials ?? {};
  const items: Testimonial[] = t.items ?? [];

  if (items.length === 0) return null;

  return (
    <LazyMotion features={domAnimation}>
      <section className="bg-[#faf7f4] py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 lg:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              {t.title ?? "Das sagen unsere Kunden"}
            </h2>
          </m.div>

          <div className="space-y-16 lg:space-y-20">
            {items.map((item, i) => (
              <m.figure
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55 }}
                className="text-center max-w-3xl mx-auto"
              >
                <blockquote className="text-xl sm:text-2xl lg:text-[1.7rem] text-slate-800 leading-snug font-medium tracking-tight">
                  &bdquo;{item.quote}&ldquo;
                </blockquote>
                <figcaption className="mt-6">
                  <p className="text-sm font-bold text-slate-900">{item.author}</p>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {[item.role, item.location].filter(Boolean).join(" · ")}
                  </p>
                </figcaption>
              </m.figure>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
