"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CinemaFrameProps {
  /** Video source (mp4). Lazy-loaded: playback starts when scrolled into view. */
  src: string;
  poster?: string;
  /** Message the Sailly agent "speaks" — rendered as large text over the footage. */
  overlayText?: string;
  className?: string;
  /** Landscape on desktop, taller crop on small screens (Sierra pattern). */
  aspect?: "video" | "adaptive";
  children?: React.ReactNode;
  priority?: boolean;
}

/**
 * Rounded cinematic media container in the Sierra style:
 * full-bleed footage inside a rounded-3xl frame, optional agent message
 * overlaid in large type, optional slotted content (e.g. chat card).
 */
export function CinemaFrame({
  src,
  poster,
  overlayText,
  className,
  aspect = "adaptive",
  children,
  priority = false,
}: CinemaFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(priority);

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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.play().catch(() => {
      /* Autoplay can be blocked; the poster stays visible. */
    });
  }, [inView]);

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
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={inView ? src : undefined}
        poster={poster}
        muted
        loop
        playsInline
        preload={priority ? "auto" : "none"}
        aria-hidden="true"
      />

      {overlayText && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 sm:px-12 pointer-events-none">
          <p className="text-white/85 text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] max-w-3xl">
            {overlayText}
          </p>
        </div>
      )}

      {children}
    </div>
  );
}
