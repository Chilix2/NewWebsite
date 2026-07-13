"use client";

import React, { useEffect, useRef, useState } from "react";
import { SaillyLogoLockup } from "./sailly-signal-logo";
import { cn } from "@/lib/utils";

interface HeroSloganSequenceProps {
  line1: string;
  line2: string;
  active: boolean;
  restartKey: number;
  onComplete: () => void;
}

type Phase = "idle" | "line1-in" | "line1-hold" | "line1-out" | "line2-in" | "line2-hold" | "line2-out" | "logo-in" | "logo-hold" | "logo-out";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const SLOGAN_TEXT_SIZE = "text-5xl md:text-6xl";
/** Match logo wordmark typography (Sys Falso + same scale). */
const SLOGAN_TEXT_CLASS = cn("font-bold tracking-tight text-white leading-[1.05]", SLOGAN_TEXT_SIZE);

/**
 * Centered 3-part hero slogan: clip-reveal line 1 → line 2 → brand logo lockup.
 */
export function HeroSloganSequence({
  line1,
  line2,
  active,
  restartKey,
  onComplete,
}: HeroSloganSequenceProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [reducedMotion, setReducedMotion] = useState(false);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const headlineClass = cn(
    "section-header absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap hero-clip-text",
    SLOGAN_TEXT_CLASS
  );

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (!active) {
      setPhase("idle");
      return;
    }

    if (reducedMotion) {
      const t = setTimeout(() => onCompleteRef.current(), 400);
      return () => clearTimeout(t);
    }

    setPhase("line1-in");

    const timers: ReturnType<typeof setTimeout>[] = [];

    const schedule = (next: Phase, ms: number) => {
      timers.push(setTimeout(() => setPhase(next), ms));
    };

    schedule("line1-hold", 1400);
    schedule("line1-out", 1400 + 1850);
    schedule("line2-in", 1400 + 1850 + 900 + 520);
    schedule("line2-hold", 1400 + 1850 + 900 + 520 + 1350);
    schedule("line2-out", 1400 + 1850 + 900 + 520 + 1350 + 1850);
    schedule("logo-in", 1400 + 1850 + 900 + 520 + 1350 + 1850 + 900 + 550);
    schedule("logo-hold", 1400 + 1850 + 900 + 520 + 1350 + 1850 + 900 + 550 + 700);
    schedule("logo-out", 1400 + 1850 + 900 + 520 + 1350 + 1850 + 900 + 550 + 700 + 2100);
    timers.push(
      setTimeout(() => {
        onCompleteRef.current();
      }, 1400 + 1850 + 900 + 520 + 1350 + 1850 + 900 + 550 + 700 + 2100 + 450)
    );

    return () => timers.forEach(clearTimeout);
  }, [active, restartKey, reducedMotion]);

  const showLine1 = ["line1-in", "line1-hold", "line1-out"].includes(phase);
  const showLine2 = ["line2-in", "line2-hold", "line2-out"].includes(phase);
  const showLogo = ["logo-in", "logo-hold", "logo-out"].includes(phase);

  const line1Anim =
    phase === "line1-in"
      ? "hero-clip-in"
      : phase === "line1-out"
        ? "hero-clip-out"
        : phase === "line1-hold"
          ? ""
          : "";

  const line2Anim =
    phase === "line2-in"
      ? "hero-clip-in"
      : phase === "line2-out"
        ? "hero-clip-out"
        : "";

  if (!active && phase === "idle") return null;

  if (reducedMotion && active) {
    return (
      <div className="relative h-[140px] md:h-[180px] flex items-center justify-center w-full max-w-5xl mx-auto text-center">
        <h1 className={cn(SLOGAN_TEXT_CLASS, "text-center")}>
          {line1}
          <br />
          {line2}
        </h1>
      </div>
    );
  }

  return (
    <div
      className="relative h-[140px] md:h-[180px] flex items-center justify-center mx-auto w-full max-w-5xl"
      aria-live="polite"
    >
      <h1
        ref={line1Ref}
        className={`${headlineClass} ${line1Anim}`}
        style={{
          opacity: showLine1 ? 1 : 0,
          clipPath: phase === "line1-hold" ? "inset(0 0 0 0)" : undefined,
        }}
      >
        {line1}
      </h1>

      <h2
        ref={line2Ref}
        className={`${headlineClass} ${line2Anim}`}
        style={{
          opacity: showLine2 ? 1 : 0,
          clipPath: phase === "line2-hold" ? "inset(0 0 0 0)" : undefined,
        }}
      >
        {line2}
      </h2>

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] flex items-center justify-center transition-opacity duration-[450ms]"
        style={{
          opacity: showLogo ? (phase === "logo-out" ? 0 : 1) : 0,
          pointerEvents: "none",
        }}
      >
        {showLogo && (
          <div className={phase === "logo-in" ? "hero-logo-reveal" : ""}>
            <SaillyLogoLockup
              tone="brand"
              animated
              wordmarkClass={SLOGAN_TEXT_SIZE}
            />
          </div>
        )}
      </div>
    </div>
  );
}
