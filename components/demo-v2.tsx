"use client";

import React from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { SaillyConversationPreview } from "./sailly-conversation-preview";
import { SaillyHowItWorksSection } from "./sailly-how-it-works-section";

interface DemoV2Props {
  dict: any;
  locale: string;
}

const STEP_KEYS = ["answer", "understand", "execute"] as const;

export function DemoV2({ dict }: DemoV2Props) {
  const howItWorks = dict.howItWorks ?? {};

  const steps = STEP_KEYS.map((key) => ({
    title: howItWorks.steps?.[key]?.title ?? key,
    desc: howItWorks.steps?.[key]?.desc ?? "",
  }));

  return (
    <LazyMotion features={domAnimation}>
      <section className="bg-[#faf7f4] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SaillyHowItWorksSection
            badge={howItWorks.badge ?? "Funktionsweise"}
            title={howItWorks.title ?? "Wie Sailly funktioniert"}
            subtitle={
              howItWorks.subtitle ??
              "Vom Klingeln bis zur Buchung — in einem Gespräch, ohne Warteschleife."
            }
            steps={steps}
            variant="homepage"
            asideCaption={
              howItWorks.try_subtitle ??
              "Sehen Sie, wie ein echtes Gespräch mit Sailly aussieht."
            }
            aside={<SaillyConversationPreview dict={dict} />}
          />
        </div>
      </section>
    </LazyMotion>
  );
}
