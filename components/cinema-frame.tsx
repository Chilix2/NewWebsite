"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { SaillyLogoLockup } from "./sailly-signal-logo";

interface CinemaFrameProps {
  /** Video source (mp4). Lazy-loaded: playback starts when scrolled into view. */
  src?: string;
  /** Multiple sources — plays as a playlist (advances on ended). Takes precedence over `src`. */
  srcs?: string[];
  poster?: string;
  /** Message the Sailly agent "speaks" — rendered as large text over the footage. */
  overlayText?: string;
  /** Optional second line; when set, plays line1 → line2 → Sailly logo sequence. */
  overlayText2?: string;
  className?: string;
  /** Landscape on desktop, taller crop on small screens (Sierra pattern). */
  aspect?: "video" | "adaptive";
  children?: React.ReactNode;
  priority?: boolean;
}

type Phase =
  | "idle"
  | "line1-in"
  | "line1-hold"
  | "line1-out"
  | "line2-in"
  | "line2-hold"
  | "line2-out"
  | "logo-in"
  | "logo-hold"
  | "logo-out";

const OVERLAY_TEXT_CLASS =
  "text-center text-white font-bold tracking-tight leading-[1.05] text-3xl sm:text-5xl lg:text-6xl max-w-4xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Rounded cinematic media container in the Sierra style:
 * full-bleed footage inside a rounded-3xl frame, optional agent message
 * overlaid in large type, optional slotted content (e.g. chat card).
 */
export function CinemaFrame({
  src,
  srcs,
  poster,
  overlayText,
  overlayText2,
  className,
  aspect = "adaptive",
  children,
  priority = false,
}: CinemaFrameProps) {
  const playlist = srcs?.length ? srcs : src ? [src] : [];
  const multi = playlist.length > 1;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(priority);
  const [clipIn, setClipIn] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [cycle, setCycle] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const sequenced = Boolean(overlayText && overlayText2);
  const activeSrc = playlist[videoIndex % Math.max(playlist.length, 1)];
  /** In playlists, overlay text only plays on the first clip. */
  const overlayActive = sequenced && (!multi || videoIndex === 0);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (priority) return;
    const el = videoRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !inView) return;
    if (reducedMotion) return;
    el.play().catch(() => {
      /* Autoplay can be blocked; the poster stays visible. */
    });
  }, [inView, reducedMotion, activeSrc]);

  const advancePlaylist = () => {
    if (!multi) return;
    setVideoIndex((i) => (i + 1) % playlist.length);
  };

  // Single-line clip-reveal (non-sequenced)
  useEffect(() => {
    if (sequenced || !overlayText || !inView) {
      setClipIn(false);
      return;
    }
    if (reducedMotion) {
      setClipIn(true);
      return;
    }
    const t = setTimeout(() => setClipIn(true), 120);
    return () => clearTimeout(t);
  }, [overlayText, inView, sequenced, reducedMotion]);

  // Three-part sequence once per first-clip play: line1 → line2 → logo → idle
  useEffect(() => {
    if (!overlayActive || !inView) {
      setPhase("idle");
      return;
    }

    if (reducedMotion) {
      setPhase("line1-hold");
      return;
    }

    setPhase("line1-in");
    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = (next: Phase, ms: number) => {
      timers.push(setTimeout(() => setPhase(next), ms));
    };

    // 10% faster than original segment timings
    const s = (ms: number) => Math.round(ms * 0.9);
    const line1In = s(1400);
    const line1Hold = s(1850);
    const line1Out = s(900);
    const gap1 = s(520);
    const line2In = s(1350);
    const line2Hold = s(1850);
    const line2Out = s(900);
    const gap2 = s(550);
    const logoIn = s(700);
    const logoHold = s(2100);
    const logoOut = s(450);

    let t = 0;
    t += line1In;
    schedule("line1-hold", t);
    t += line1Hold;
    schedule("line1-out", t);
    t += line1Out + gap1;
    schedule("line2-in", t);
    t += line2In;
    schedule("line2-hold", t);
    t += line2Hold;
    schedule("line2-out", t);
    t += line2Out + gap2;
    schedule("logo-in", t);
    t += logoIn;
    schedule("logo-hold", t);
    t += logoHold;
    schedule("logo-out", t);
    t += logoOut;
    schedule("idle", t);

    return () => timers.forEach(clearTimeout);
  }, [overlayActive, inView, cycle, reducedMotion]);

  // Restart text sequence when the looping video seeks back to the start (single-src only)
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !sequenced || !inView || reducedMotion || multi) return;

    let lastTime = el.currentTime;
    const onTimeUpdate = () => {
      const t = el.currentTime;
      // Loop detect: time jumped backward near the start after playing past ~1s
      if (t < 0.35 && lastTime > 1) {
        setCycle((c) => c + 1);
      }
      lastTime = t;
    };

    el.addEventListener("timeupdate", onTimeUpdate);
    return () => el.removeEventListener("timeupdate", onTimeUpdate);
  }, [sequenced, inView, reducedMotion, multi]);

  const showLine1 = ["line1-in", "line1-hold", "line1-out"].includes(phase);
  const showLine2 = ["line2-in", "line2-hold", "line2-out"].includes(phase);
  const showLogo = ["logo-in", "logo-hold", "logo-out"].includes(phase);

  const line1Anim =
    phase === "line1-in"
      ? "hero-clip-in"
      : phase === "line1-out"
        ? "hero-clip-out"
        : "";

  const line2Anim =
    phase === "line2-in"
      ? "hero-clip-in"
      : phase === "line2-out"
        ? "hero-clip-out"
        : "";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl bg-slate-900",
        aspect === "video"
          ? "aspect-video"
          : "aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/10]",
        className
      )}
    >
      <video
        key={activeSrc}
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover rounded-[inherit]"
        src={inView ? activeSrc : undefined}
        poster={poster}
        muted
        loop={!multi}
        playsInline
        preload={priority ? "auto" : "none"}
        aria-hidden="true"
        onEnded={advancePlaylist}
      />

      {overlayActive && overlayText && overlayText2 && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center px-6 sm:px-12 pointer-events-none"
          aria-live="polite"
        >
          {reducedMotion ? (
            <p className={OVERLAY_TEXT_CLASS}>
              {overlayText}
              <br />
              {overlayText2}
            </p>
          ) : (
            <>
              <p
                className={cn(
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-6 sm:px-12",
                  OVERLAY_TEXT_CLASS,
                  "hero-clip-text",
                  line1Anim
                )}
                style={{
                  opacity: showLine1 ? 1 : 0,
                  clipPath: phase === "line1-hold" ? "inset(0 0 0 0)" : undefined,
                }}
              >
                {overlayText}
              </p>
              <p
                className={cn(
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-6 sm:px-12",
                  OVERLAY_TEXT_CLASS,
                  "hero-clip-text",
                  line2Anim
                )}
                style={{
                  opacity: showLine2 ? 1 : 0,
                  clipPath: phase === "line2-hold" ? "inset(0 0 0 0)" : undefined,
                }}
              >
                {overlayText2}
              </p>
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-opacity duration-[405ms]"
                style={{
                  opacity: showLogo ? (phase === "logo-out" ? 0 : 1) : 0,
                }}
              >
                {showLogo && (
                  <div className={phase === "logo-in" ? "hero-logo-reveal" : ""}>
                    <SaillyLogoLockup
                      tone="light"
                      animated
                      wordmarkClass="text-3xl sm:text-5xl lg:text-6xl"
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {!sequenced && overlayText && (
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 sm:px-12 pointer-events-none">
          <p
            className={cn(
              OVERLAY_TEXT_CLASS,
              "hero-clip-text",
              clipIn && "hero-clip-in"
            )}
          >
            {overlayText}
          </p>
        </div>
      )}

      {children}
    </div>
  );
}
