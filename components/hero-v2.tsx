"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { HeroChatOverlay, type ChatScenario } from "./hero-chat-overlay";
import { HeroSloganSequence } from "./hero-slogan-sequence";

interface HeroV2Props {
  dict: any;
  locale: string;
}

type HeroClip = {
  src: string;
  scenarioId: string | null;
  objectPosition?: string;
};

/**
 * 1. woman-phone-laptop-desk — no chat (slogan)
 * 2. spa-hot-stone-massage — Sundays?
 * 3. older-couple-looking-at-smartphone — doctor confirmed
 * 4. young-woman-on-phone-striped-shirt — food delivery
 * 5. restaurant-overhead-globe-lights — reservation + parking
 * 6. hairstylist-cutting-grey-hair — color / Sandra
 */
const HERO_CLIPS: HeroClip[] = [
  {
    src: "/videos/hero-call.mp4?v=3",
    scenarioId: null,
    objectPosition: "center 30%",
  },
  {
    src: "/videos/hero-call-2.mp4?v=1",
    scenarioId: "spa",
    objectPosition: "center center",
  },
  {
    src: "/videos/praxis-reception.mp4?v=2",
    scenarioId: "praxis",
    objectPosition: "center 25%",
  },
  {
    src: "/videos/hero-call-3.mp4?v=1",
    scenarioId: "delivery",
    objectPosition: "center 18%",
  },
  {
    src: "/videos/restaurant-guests.mp4?v=1",
    scenarioId: "restaurant",
    objectPosition: "center center",
  },
  {
    src: "/videos/services-3.mp4",
    scenarioId: "salon",
    objectPosition: "center 28%",
  },
];

const CROSSFADE_MS = 900;

export function HeroV2({ dict }: HeroV2Props) {
  const hero = dict.hero ?? {};
  const layerRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
  const [layerSrc, setLayerSrc] = useState<[string, string]>([
    HERO_CLIPS[0].src,
    HERO_CLIPS[1].src,
  ]);
  const [videoIndex, setVideoIndex] = useState(0);
  const videoIdxRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [sloganDone, setSloganDone] = useState(false);
  const [videoDurationSec, setVideoDurationSec] = useState(12);

  const scenarios: ChatScenario[] = hero.chat?.scenarios ?? [];
  const activeClip = HERO_CLIPS[videoIndex];
  const activeScenario = useMemo(() => {
    if (!activeClip.scenarioId) return null;
    return (
      scenarios.find((s) => s.id === activeClip.scenarioId) ?? null
    );
  }, [activeClip.scenarioId, scenarios]);

  const showSlogan = videoIndex === 0 && !sloganDone;
  const showChat = videoIndex >= 1 && Boolean(activeScenario);

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

  const syncDuration = useCallback((el: HTMLVideoElement | null) => {
    if (!el) return;
    const d = el.duration;
    if (Number.isFinite(d) && d > 0) setVideoDurationSec(d);
  }, []);

  useEffect(() => {
    const el = layerRefs[activeLayer].current;
    syncDuration(el);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLayer, layerSrc, syncDuration]);

  const advance = useCallback(() => {
    if (reducedMotion) return;
    const nextIdx = (videoIdxRef.current + 1) % HERO_CLIPS.length;
    const standby = (activeLayer === 0 ? 1 : 0) as 0 | 1;
    const standbyEl = layerRefs[standby].current;
    if (!standbyEl) return;

    const startNext = () => {
      standbyEl.currentTime = 0;
      standbyEl.play().catch(() => {});
      videoIdxRef.current = nextIdx;
      setVideoIndex(nextIdx);
      setActiveLayer(standby);
      if (nextIdx === 0) setSloganDone(false);
      syncDuration(standbyEl);

      window.setTimeout(() => {
        const followIdx = (nextIdx + 1) % HERO_CLIPS.length;
        setLayerSrc((prev) => {
          const copy: [string, string] = [...prev] as [string, string];
          copy[activeLayer] = HERO_CLIPS[followIdx].src;
          return copy;
        });
      }, CROSSFADE_MS + 100);
    };

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
  }, [activeLayer, reducedMotion, syncDuration]);

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative min-h-[92svh] overflow-hidden bg-slate-900">
        {[0, 1].map((layer) => {
          const clipForLayer =
            HERO_CLIPS.find((c) => c.src === layerSrc[layer as 0 | 1]) ??
            activeClip;
          return (
            <video
              key={layer}
              ref={layerRefs[layer]}
              className="absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out"
              style={{
                opacity: activeLayer === layer ? 1 : 0,
                transitionDuration: `${CROSSFADE_MS}ms`,
                objectPosition:
                  (activeLayer === layer
                    ? activeClip.objectPosition
                    : clipForLayer.objectPosition) ?? "center center",
              }}
              src={layerSrc[layer as 0 | 1]}
              poster={layer === 0 ? "/images/hero-hotel.jpg" : undefined}
              autoPlay={layer === 0}
              muted
              loop={reducedMotion}
              playsInline
              preload="auto"
              onLoadedMetadata={(e) => {
                if (activeLayer === layer) syncDuration(e.currentTarget);
              }}
              onEnded={activeLayer === layer ? advance : undefined}
              onError={activeLayer === layer ? advance : undefined}
              aria-hidden="true"
            />
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/15 to-slate-950/70" />

        <div
          className={`absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6 transition-opacity duration-[400ms] ${
            showSlogan ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <HeroSloganSequence
            line1={hero.title_line1 ?? "You handle your business."}
            line2={hero.title_line2 ?? "Sailly the calls."}
            active={showSlogan}
            restartKey={videoIndex === 0 ? 0 : 1}
            onComplete={() => setSloganDone(true)}
          />
        </div>

        {showChat && activeScenario && (
          <div className="absolute inset-x-0 bottom-0 z-10 w-full pb-8 sm:pb-12 lg:pb-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-end">
              <m.div
                key={activeScenario.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-[400px] shrink-0"
              >
                <HeroChatOverlay
                  dict={dict}
                  scenario={activeScenario}
                  videoDurationSec={videoDurationSec}
                  finishEarlySec={2}
                  active
                />
              </m.div>
            </div>
          </div>
        )}
      </section>
    </LazyMotion>
  );
}
