"use client";

import React, { useEffect, useRef } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { cn } from "@/lib/utils";
import { PillarAnimationView, type PillarAnimation } from "./value-prop-animations";

interface ValuePropV2Props {
  dict: Record<string, unknown>;
}

interface PillarConfig {
  key: string;
  cardClass: string;
  animation: PillarAnimation;
  fallbackTitle: string;
  fallbackDesc: string;
}

interface TagConfig {
  label: string;
  desc: string;
  cardClass: string;
}

const PILLARS: PillarConfig[] = [
  {
    key: "always_on",
    cardClass: "bg-gradient-to-br from-[#5a7a52] to-[#4a6b42]",
    animation: "chat",
    fallbackTitle: "Kein Anruf geht verloren",
    fallbackDesc: "Gäste erreichen Sie — auch abends, am Wochenende und in Stoßzeiten.",
  },
  {
    key: "instant_scale",
    cardClass: "bg-gradient-to-br from-[#3b6ea8] to-[#2d5a8f]",
    animation: "widgets",
    fallbackTitle: "Termine landen im System",
    fallbackDesc: "Reservierungen und Termine werden direkt eingetragen — kein Zettel, kein Rückruf.",
  },
  {
    key: "multilingual",
    cardClass: "bg-gradient-to-br from-[#8b4a62] to-[#6e3a4f]",
    animation: "channels",
    fallbackTitle: "Ein Assistent, alle Kanäle",
    fallbackDesc: "Telefon, E-Mail und Messaging — ein Gesprächsverlauf, ein Team-Überblick.",
  },
  {
    key: "integration",
    cardClass: "bg-gradient-to-br from-[#b85c38] to-[#9a4a2c]",
    animation: "ratings",
    fallbackTitle: "Gäste bleiben zufrieden",
    fallbackDesc: "Keine Warteschleife, klare Antworten — und Buchungen, die wirklich ankommen.",
  },
];

const TAG_CARD_CLASSES = [
  "bg-slate-800",
  "bg-[#5a7a52]",
  "bg-[#3b6ea8]",
  "bg-[#8b4a62]",
  "bg-[#b85c38]",
  "bg-slate-700",
] as const;

const DEFAULT_TAGS: TagConfig[] = [
  { label: "#24/7", desc: "Auch nachts und am Sonntag", cardClass: TAG_CARD_CLASSES[0] },
  { label: "#50+Sprachen", desc: "Internationale Gäste willkommen", cardClass: TAG_CARD_CLASSES[1] },
  { label: "#DSGVO", desc: "Gehostet in Deutschland", cardClass: TAG_CARD_CLASSES[2] },
  { label: "#KeineWarteschleife", desc: "Sofortige Annahme", cardClass: TAG_CARD_CLASSES[3] },
  { label: "#PMS-Anbindung", desc: "Kalender & Reservierung", cardClass: TAG_CARD_CLASSES[4] },
  { label: "#4WochenLive", desc: "Schnell einsatzbereit", cardClass: TAG_CARD_CLASSES[5] },
];

export function ValuePropV2({ dict }: ValuePropV2Props) {
  const props = (dict.value_props ?? {}) as Record<string, unknown>;
  const cards = (props.cards ?? {}) as Record<string, { title?: string; desc?: string }>;
  const rawTags = (props.tags as Array<{ label?: string; desc?: string }> | undefined) ?? [];
  const tags: TagConfig[] =
    rawTags.length > 0
      ? rawTags.map((tag, i) => ({
          label: tag.label ?? DEFAULT_TAGS[i]?.label ?? "#Sailly",
          desc: tag.desc ?? DEFAULT_TAGS[i]?.desc ?? "",
          cardClass: TAG_CARD_CLASSES[i % TAG_CARD_CLASSES.length],
        }))
      : DEFAULT_TAGS;

  /** Duplicate strip for seamless infinite film-loop */
  const loopTags = [...tags, ...tags];
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  const title =
    (props.title as string) ??
    ((props.title_line1 || props.title_line2)
      ? `${props.title_line1 ?? ""} ${props.title_line2 ?? ""}`.trim()
      : "Mitarbeiter mit Mehrwert.");
  const subtitle =
    (props.subtitle as string) ??
    "Sailly nimmt Anrufe an, bucht Termine und hält Ihr Team aus dem Telefonstress raus.";

  /**
   * Continuous horizontal loop — starts on mount, no buttons.
   * Translates the track; when halfway (first copy scrolled out), resets.
   */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let lastTs = 0;
    let offset = 0;
    const SPEED = 28; // px/sec

    const tick = (ts: number) => {
      raf = requestAnimationFrame(tick);
      if (!lastTs) {
        lastTs = ts;
        return;
      }
      const dt = Math.min(ts - lastTs, 64);
      lastTs = ts;

      if (pausedRef.current) return;

      const half = track.scrollWidth / 2;
      if (half <= 1) return;

      offset += (SPEED * dt) / 1000;
      if (offset >= half) offset -= half;
      track.style.transform = `translate3d(${-offset}px,0,0)`;
    };

    raf = requestAnimationFrame(tick);

    const pause = () => {
      pausedRef.current = true;
    };
    const resume = () => {
      pausedRef.current = false;
    };

    track.addEventListener("pointerenter", pause);
    track.addEventListener("pointerleave", resume);
    track.addEventListener("touchstart", pause, { passive: true });
    track.addEventListener("touchend", resume, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("pointerenter", pause);
      track.removeEventListener("pointerleave", resume);
      track.removeEventListener("touchstart", pause);
      track.removeEventListener("touchend", resume);
    };
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-900 tracking-tight leading-[1.15]">
              {title}
            </h2>
            <p className="mt-5 text-base sm:text-lg text-slate-500 leading-relaxed">{subtitle}</p>
          </m.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 mb-8 lg:mb-10">
            {PILLARS.map((pillar, i) => {
              const card = cards[pillar.key] ?? {};
              const title = card.title ?? pillar.fallbackTitle;
              const desc = card.desc ?? pillar.fallbackDesc;

              return (
                <m.div
                  key={pillar.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className={cn(
                    "relative overflow-hidden rounded-3xl p-7 sm:p-9 min-h-[340px] sm:min-h-[380px] flex flex-col",
                    pillar.cardClass
                  )}
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight max-w-[90%]">
                    {title}
                  </h3>

                  <div className="flex-1 flex items-center justify-center py-6">
                    <PillarAnimationView kind={pillar.animation} />
                  </div>

                  <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-md">
                    {desc}
                  </p>
                </m.div>
              );
            })}
          </div>

          {/* Auto-looping hashtag film — no nav buttons */}
          <div className="overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0">
            <div
              ref={trackRef}
              className="flex gap-4 w-max will-change-transform motion-reduce:transform-none"
              style={{ transform: "translate3d(0,0,0)" }}
            >
              {loopTags.map((tag, i) => (
                <div
                  key={`${tag.label}-${i}`}
                  className={cn(
                    "shrink-0 w-[72vw] sm:w-[calc((100vw-3rem)/3.2)] lg:w-[380px] max-w-[380px] min-w-[220px] rounded-2xl p-5 sm:p-6 text-white",
                    tag.cardClass
                  )}
                >
                  <p className="text-lg sm:text-xl font-bold tracking-tight">{tag.label}</p>
                  <p className="mt-2 text-sm text-white/80 leading-snug">{tag.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
