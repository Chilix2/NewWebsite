"use client";

import React from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { HeroV2 } from "./hero-v2";
import { ProofBandV2 } from "./proof-band-v2";
import { ValuePropV2 } from "./value-prop-v2";
import { IndustriesV2 } from "./industries-v2";
import { SocialProofV2 } from "./social-proof-v2";
import { DemoV2 } from "./demo-v2";
import { TrustV2 } from "./trust-v2";
import { FinalCtaV2 } from "./final-cta-v2";

interface SaillyLandingV2Props {
  dict: any;
  locale: string;
}

/**
 * Homepage in the Sierra rhythm:
 * cinematic hero → credibility band → outcome pillars → industry doorways →
 * named testimonials → live demo → trust → CTA.
 */
export function SaillyLandingV2({ dict, locale }: SaillyLandingV2Props) {
  return (
    <LazyMotion features={domAnimation}>
      <div className="flex flex-col min-h-dvh text-slate-900 relative overflow-hidden bg-white">
        <HeroV2 dict={dict} locale={locale} />
        <ProofBandV2 dict={dict} />
        <ValuePropV2 dict={dict} />
        <IndustriesV2 dict={dict} locale={locale} />
        <SocialProofV2 dict={dict} />
        <DemoV2 dict={dict} locale={locale} />
        <TrustV2 dict={dict} />
        <FinalCtaV2 dict={dict} locale={locale} />
      </div>
    </LazyMotion>
  );
}
