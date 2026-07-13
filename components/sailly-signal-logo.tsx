"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Sailly brand wave — "Abstract Study Model 03 / The Signal".
 *
 * Geometry (from brand spec image_8cba02.png):
 *   wave  M80 56 C71 33 59 33 50 56 C41 73 33 73 24 56
 *   spark cx:18 cy:44 r:5.5
 *
 * Animation config (locked brand payload):
 *   waveThickness 7 / morphFactor 0.4 / oscillationSpeedHz 0.5
 */
const WAVE_THICKNESS = 7;
const MORPH = 0.4;
const SPEED_HZ = 0.5;

/* Brand gradient — warm orange to magenta */
const GRADIENT_STOPS = [
  { offset: "0%", color: "#ff7a3d" },
  { offset: "50%", color: "#ff4e6e" },
  { offset: "100%", color: "#dd2e7c" },
];

const LIGHT_GRADIENT_STOPS = [
  { offset: "0%", color: "#ffffff" },
  { offset: "50%", color: "#ffffff" },
  { offset: "100%", color: "#ffffff" },
];

/* viewBox cropped tightly to the animated wave bounds */
const VIEW_BOX = "9 23 76 54";

const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

function wavePath(theta: number, morph: number): string {
  const p0y = 56 + 4 * morph * Math.sin(theta);
  const cp1y = lerp(33, 56, morph) + 10 * morph * Math.sin(theta - 0.5);
  const cp2y = lerp(33, 56, morph) + 10 * morph * Math.sin(theta - 1.0);
  const p1y = 56 + 8 * morph * Math.sin(theta - 1.5);
  const cp3y = lerp(73, 56, morph) + 10 * morph * Math.sin(theta - 2.0);
  const cp4y = lerp(73, 56, morph) + 10 * morph * Math.sin(theta - 2.5);
  const p2y = 56 + 4 * morph * Math.sin(theta - 3.0);
  return `M80 ${p0y.toFixed(2)} C71 ${cp1y.toFixed(2)} 59 ${cp2y.toFixed(2)} 50 ${p1y.toFixed(2)} C41 ${cp3y.toFixed(2)} 33 ${cp4y.toFixed(2)} 24 ${p2y.toFixed(2)}`;
}

function useSignalAnimation(
  pathRef: React.RefObject<SVGPathElement | null>,
  sparkRef: React.RefObject<SVGCircleElement | null>,
  animated: boolean
) {
  useEffect(() => {
    if (!animated) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let running = true;
    const start = performance.now();

    const frame = (now: number) => {
      if (!running) return;
      const t = (now - start) / 1000;
      const theta = t * SPEED_HZ * 4.0;
      if (pathRef.current) {
        pathRef.current.setAttribute("d", wavePath(theta, MORPH));
      }
      if (sparkRef.current) {
        const r = 5.5 + MORPH * 1.6 * Math.sin(theta - 3.3);
        sparkRef.current.setAttribute("r", Math.max(2.5, r).toFixed(2));
      }
      raf = requestAnimationFrame(frame);
    };

    /* Only animate while visible */
    const host = pathRef.current?.ownerSVGElement;
    let observer: IntersectionObserver | undefined;
    if (host && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          running = true;
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(frame);
        } else {
          running = false;
          cancelAnimationFrame(raf);
        }
      });
      observer.observe(host);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [animated, pathRef, sparkRef]);
}

function SignalWaveSvg({
  animated,
  gradientId,
  className,
  tone = "brand",
}: {
  animated: boolean;
  gradientId: string;
  className?: string;
  tone?: "brand" | "light";
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const sparkRef = useRef<SVGCircleElement>(null);
  useSignalAnimation(pathRef, sparkRef, animated);

  const stops = tone === "light" ? LIGHT_GRADIENT_STOPS : GRADIENT_STOPS;

  return (
    <svg
      viewBox={VIEW_BOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="24"
          y1="50"
          x2="80"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          {stops.map((s) => (
            <stop key={s.offset} offset={s.offset} stopColor={s.color} />
          ))}
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        d={
          animated
            ? wavePath(0, MORPH)
            : "M80 56 C71 33 59 33 50 56 C41 73 33 73 24 56"
        }
        stroke={`url(#${gradientId})`}
        strokeWidth={WAVE_THICKNESS}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle ref={sparkRef} cx="18" cy="44" r="5.5" fill={`url(#${gradientId})`} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Icon-only variant (legacy API, kept for existing call sites)        */
/* ------------------------------------------------------------------ */

interface SaillySignalLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
}

const sizes: Record<string, string> = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-32 h-32",
};

export function SaillySignalLogo({
  className,
  size = "md",
  animated = true,
}: SaillySignalLogoProps) {
  const id = React.useId().replace(/:/g, "");
  return (
    <div
      className={cn(
        "relative flex items-center justify-center select-none",
        sizes[size],
        className
      )}
    >
      <SignalWaveSvg animated={animated} gradientId={`sgnl-${id}`} className="w-full h-full" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Vertical lockup — animated wave above the wordmark, equal width     */
/* ------------------------------------------------------------------ */

interface SaillyLogoLockupProps {
  className?: string;
  /** Tailwind text size class for the wordmark; the wave matches its width. */
  wordmarkClass?: string;
  animated?: boolean;
  /** White wave + wordmark for dark/video backgrounds (Sierra header style). */
  tone?: "brand" | "light";
}

export function SaillyLogoLockup({
  className,
  wordmarkClass = "text-2xl",
  animated = true,
  tone = "brand",
}: SaillyLogoLockupProps) {
  const id = React.useId().replace(/:/g, "");
  return (
    <span
      className={cn(
        "inline-flex flex-col items-stretch select-none leading-none",
        className
      )}
    >
      {/* The wordmark alone defines the lockup width. The wave sits in a
          padding-top aspect box (54/76 of the width) with the SVG absolutely
          positioned, so its 300px default intrinsic size can never leak into
          layout — wave and text are always exactly the same width. */}
      {/* w-0 + min-w-full: contributes no intrinsic width, then stretches
          to the container width that the wordmark alone established */}
      <span
        className="relative block w-0 min-w-full"
        style={{ paddingTop: `${(54 / 76) * 100}%` }}
        aria-hidden="true"
      >
        <SignalWaveSvg
          animated={animated}
          gradientId={`lkup-${id}`}
          tone={tone}
          className="absolute inset-0 w-full h-full"
        />
      </span>
      <span
        className={cn(
          "font-logo text-center -mt-[0.15em]",
          tone === "light" ? "text-white" : "text-[#f97e70]",
          wordmarkClass
        )}
      >
        Sailly
      </span>
    </span>
  );
}

/** Small white wave mark for agent bubbles (Sierra Agent icon pattern). */
export function SaillyAgentMark({ className }: { className?: string }) {
  const id = React.useId().replace(/:/g, "");
  return (
    <SignalWaveSvg
      animated={false}
      gradientId={`agent-${id}`}
      tone="light"
      className={cn("w-5 h-5 shrink-0", className)}
    />
  );
}
