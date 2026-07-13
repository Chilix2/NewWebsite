"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { HeroChatOverlay } from "./hero-chat-overlay";
import { HeroSloganSequence } from "./hero-slogan-sequence";

interface HeroV2Props {
  dict: any;
  locale: string;
}

type HeroPhase = "slogan" | "chat";

/**
 * Cinematic footage playlist — plays in order, then loops back to the start.
 * 1. hero-call.mp4        (original)
 * 2. hero-call-2.mp4      (Pexels 6963826 — woman on a call, warm bokeh)
 * 3. hero-call-3.mp4      (Pexels 7189796 — hands + smartphone at the window)
 */
const HERO_VIDEOS = [
  "/videos/hero-call.mp4?v=2",
  "/videos/hero-call-2.mp4?v=1",
  "/videos/hero-call-3.mp4?v=1",
] as const;

const CROSSFADE_MS = 900;

/**
 * Sierra-style hero: cinematic footage sequence, centered slogan loop,
 * then chat bottom-right. Two stacked <video> layers crossfade between clips.
 */
export function HeroV2({ dict }: HeroV2Props) {
  const hero = dict.hero ?? {};
  const layerRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
  const [layerSrc, setLayerSrc] = useState<[string, string]>([HERO_VIDEOS[0], HERO_VIDEOS[1]]);
  const videoIdxRef = useRef(0); // index (in HERO_VIDEOS) of the clip on the active layer
  const [reducedMotion, setReducedMotion] = useState(false);
  const [phase, setPhase] = useState<HeroPhase>("slogan");
  const [loopKey, setLoopKey] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const el = layerRefs[0].current;
    if (!el) return;
    if (mq.matches) {
      el.pause();
      return;
    }
    el.play().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Advance to the next clip: play the pre-loaded standby layer, fade, preload the following clip. */
  const advance = useCallback(() => {
    if (reducedMotion) return;
    const nextIdx = (videoIdxRef.current + 1) % HERO_VIDEOS.length;
    const standby = (activeLayer === 0 ? 1 : 0) as 0 | 1;
    const standbyEl = layerRefs[standby].current;
    if (!standbyEl) return;

    const startNext = () => {
      standbyEl.play().catch(() => {});
      videoIdxRef.current = nextIdx;
      setActiveLayer(standby);
      // After the crossfade, load the clip after next into the (now hidden) old layer.
      window.setTimeout(() => {
        const followIdx = (nextIdx + 1) % HERO_VIDEOS.length;
        setLayerSrc((prev) => {
          const copy: [string, string] = [...prev] as [string, string];
          copy[activeLayer] = HERO_VIDEOS[followIdx];
          return copy;
        });
      }, CROSSFADE_MS + 100);
    };

    // If the standby layer isn't ready yet (e.g. slow connection), wait for it.
    if (standbyEl.readyState >= 3) {
      startNext();
    } else {
      const onReady = () => {
        standbyEl.removeEventListener("canplay", onReady);
        startNext();
      };
      standbyEl.addEventListener("canplay", onReady);
      standbyEl.load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLayer, reducedMotion]);

  const handleSloganComplete = () => setPhase("chat");

  const handleChatCycleComplete = () => {
    setPhase("slogan");
    setLoopKey((k) => k + 1);
  };

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative min-h-[92svh] overflow-hidden bg-slate-900">
        {[0, 1].map((layer) => (
          <video
            key={layer}
            ref={layerRefs[layer]}
            className="absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out"
            style={{
              opacity: activeLayer === layer ? 1 : 0,
              transitionDuration: `${CROSSFADE_MS}ms`,
            }}
            src={layerSrc[layer as 0 | 1]}
            poster={layer === 0 ? "/images/hero-hotel.jpg" : undefined}
            autoPlay={layer === 0}
            muted
            loop={reducedMotion}
            playsInline
            preload="auto"
            onEnded={activeLayer === layer ? advance : undefined}
            onError={activeLayer === layer ? advance : undefined}
            aria-hidden="true"
          />
        ))}
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
