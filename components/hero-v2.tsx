"use client";

import React, { useEffect, useRef, useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { HeroChatOverlay } from "./hero-chat-overlay";
import { HeroSloganSequence } from "./hero-slogan-sequence";

interface HeroV2Props {
  dict: any;
  locale: string;
}

type HeroPhase = "slogan" | "chat";

/**
 * Sierra-style hero: cinematic footage, centered slogan loop, then chat bottom-right.
 */
export function HeroV2({ dict }: HeroV2Props) {
  const hero = dict.hero ?? {};
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<HeroPhase>("slogan");
  const [loopKey, setLoopKey] = useState(0);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.pause();
      return;
    }
    el.play().catch(() => {});
  }, []);

  const handleSloganComplete = () => setPhase("chat");

  const handleChatCycleComplete = () => {
    setPhase("slogan");
    setLoopKey((k) => k + 1);
  };

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative min-h-[92svh] overflow-hidden bg-slate-900">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/hero-call.mp4?v=1"
          poster="/images/hero-hotel.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/15 to-slate-950/70" />

        {/* Centered slogan sequence */}
        <div
          className={`absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6 transition-opacity duration-[400ms] ${
            phase === "slogan" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <HeroSloganSequence
            line1={hero.title_line1 ?? "You handle your business."}
            line2={hero.title_line2 ?? "Sailly the calls."}
            active={phase === "slogan"}
            restartKey={loopKey}
            onComplete={handleSloganComplete}
          />
        </div>

        {/* Chat — only mounted during chat phase (no leftover bottom-left slot) */}
        {phase === "chat" && (
          <div className="absolute inset-x-0 bottom-0 z-10 w-full pb-8 sm:pb-12 lg:pb-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-end">
              <m.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-[400px] shrink-0"
              >
                <HeroChatOverlay
                  dict={dict}
                  active
                  onCycleComplete={handleChatCycleComplete}
                />
              </m.div>
            </div>
          </div>
        )}
      </section>
    </LazyMotion>
  );
}
