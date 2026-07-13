"use client";

import React from "react";
import { SaillyHowItWorksSection, type HowItWorksStep } from "./sailly-how-it-works-section";

interface ProduktHowItWorksProps {
  title: string;
  subtitle: string;
  steps: HowItWorksStep[];
}

/**
 * Product page "how it works" — shared MCP animation section.
 */
export function ProduktHowItWorks({ title, subtitle, steps }: ProduktHowItWorksProps) {
  return (
    <section className="py-16 lg:py-24 bg-[#faf7f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SaillyHowItWorksSection
          title={title}
          subtitle={subtitle}
          steps={steps}
          variant="product"
        />
      </div>
    </section>
  );
}
