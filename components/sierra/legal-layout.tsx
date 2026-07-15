import React from "react";
import { SierraHero, Section, Reveal } from "@/components/sierra/page-kit";

export interface LegalSection {
  heading?: string;
  paragraphs: string[];
}

/**
 * Sierra-style legal page: hero + one warm reading container.
 * Content is provided per-locale (de canonical, en for all other locales).
 */
export function LegalLayout({
  title,
  updated,
  sections,
}: {
  title: string;
  updated?: string;
  sections: LegalSection[];
}) {
  return (
    <div className="bg-white min-h-screen text-slate-900">
      <SierraHero title1={title} subtitle={updated} />
      <Section className="pt-2 pb-24">
        <Reveal className="rounded-[2.5rem] bg-[#f7f4ee] p-7 sm:p-10 lg:p-14 max-w-4xl">
          <div className="space-y-10">
            {sections.map((s, i) => (
              <div key={i}>
                {s.heading && (
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-3">{s.heading}</h2>
                )}
                <div className="space-y-3">
                  {s.paragraphs.map((p, pi) => (
                    <p key={pi} className="text-slate-600 leading-relaxed whitespace-pre-line text-[15px] sm:text-base">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
