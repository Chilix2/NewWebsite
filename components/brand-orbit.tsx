"use client";

import type { CSSProperties } from "react";
import { SaillySignalLogo } from "@/components/sailly-signal-logo";
import { cn } from "@/lib/utils";

export type OrbitVariant = "counter" | "tilt3d" | "spiral" | "chaos" | "spiralTilt";

const VARIANT_META: Record<OrbitVariant, { label: string }> = {
  /** Kept winner candidate — clean counter-clockwise */
  counter: { label: "B · Counter" },
  /** Risky: 3D tilted solar-system ring */
  tilt3d: { label: "A · Tilt3D" },
  /** Risky: orbit radius breathes in/out hard */
  spiral: { label: "C · Spiral" },
  /** Risky: each planet own speed + tumble */
  chaos: { label: "D · Chaos" },
  /** Combo: Spiral + Tilt3D */
  spiralTilt: { label: "B · Spiral+Tilt" },
};

interface BrandOrbitProps {
  brands: { name: string; domain: string }[];
  variant: OrbitVariant;
  showLabel?: boolean;
}

function PlanetFace({
  brand,
  className,
  style,
}: {
  brand: { name: string; domain: string };
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        "w-full h-full rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.16)] ring-1 ring-black/[0.06] overflow-hidden flex items-center justify-center will-change-transform",
        className
      )}
      style={style}
      title={brand.name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(brand.domain)}&sz=128`}
        alt={brand.name}
        width={64}
        height={64}
        className="w-[55%] h-[55%] object-contain"
        loading="lazy"
      />
    </div>
  );
}

export function BrandOrbit({ brands, variant, showLabel = true }: BrandOrbitProps) {
  const satellites = brands.slice(0, 12);
  const meta = VARIANT_META[variant];
  const planetPct = 14;
  const planetHalf = planetPct / 2;
  const orbitTranslate = "235%";

  const planetBox = (angle: number, useZ = false): CSSProperties => ({
    width: `${planetPct}%`,
    height: `${planetPct}%`,
    marginLeft: `-${planetHalf}%`,
    marginTop: `-${planetHalf}%`,
    transform: useZ
      ? `rotateZ(${angle}deg) translateX(${orbitTranslate}) rotateZ(${-angle}deg)`
      : `rotate(${angle}deg) translate(${orbitTranslate}) rotate(${-angle}deg)`,
  });

  return (
    <div
      className={cn(
        "relative w-[min(92%,380px)] aspect-square mx-auto shrink-0",
        (variant === "tilt3d" || variant === "spiralTilt") && "[perspective:900px]"
      )}
    >
      {showLabel && (
        <p className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 text-[10px] font-bold uppercase tracking-widest text-white/70 whitespace-nowrap pointer-events-none">
          {meta.label}
        </p>
      )}

      {/* Hub stays fixed */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 border border-white/50 flex items-center justify-center z-10"
        style={{ width: "26%", height: "26%" }}
      >
        <SaillySignalLogo
          size="md"
          animated
          tone="brand"
          className="w-[70%] h-[70%]"
        />
      </div>

      {/* —— B · Counter (kept) —— */}
      {variant === "counter" && (
        <div className="absolute inset-0 will-change-transform [transform-origin:center] animate-[brand-orbit-spin_32s_linear_infinite_reverse] motion-reduce:animate-none">
          {satellites.map((b, i) => {
            const angle = (i / satellites.length) * 360 - 90;
            return (
              <div key={b.domain} className="absolute left-1/2 top-1/2" style={planetBox(angle)}>
                <PlanetFace
                  brand={b}
                  className="animate-[brand-orbit-spin_32s_linear_infinite] motion-reduce:animate-none"
                />
              </div>
            );
          })}
        </div>
      )}

      {/* —— A · Tilt3D — tilted disc spinning in perspective —— */}
      {variant === "tilt3d" && (
        <div className="absolute inset-0 will-change-transform [transform-style:preserve-3d] [transform-origin:center] animate-[brand-orbit-tilt3d_36s_linear_infinite] motion-reduce:animate-none">
          {satellites.map((b, i) => {
            const angle = (i / satellites.length) * 360 - 90;
            return (
              <div
                key={b.domain}
                className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
                style={planetBox(angle, true)}
              >
                <PlanetFace
                  brand={b}
                  className="animate-[brand-orbit-tilt3d-face_36s_linear_infinite] motion-reduce:animate-none"
                />
              </div>
            );
          })}
        </div>
      )}

      {/* —— C · Spiral — hard radius expand/contract while spinning —— */}
      {variant === "spiral" && (
        <div className="absolute inset-0 will-change-transform [transform-origin:center] animate-[brand-orbit-spiral_28s_ease-in-out_infinite] motion-reduce:animate-none">
          {satellites.map((b, i) => {
            const angle = (i / satellites.length) * 360 - 90;
            return (
              <div key={b.domain} className="absolute left-1/2 top-1/2" style={planetBox(angle)}>
                <PlanetFace
                  brand={b}
                  className="animate-[brand-orbit-spiral-face_28s_ease-in-out_infinite] motion-reduce:animate-none"
                />
              </div>
            );
          })}
        </div>
      )}

      {/* —— B · Spiral+Tilt — combo of C Spiral + A Tilt3D —— */}
      {variant === "spiralTilt" && (
        <div className="absolute inset-0 will-change-transform [transform-style:preserve-3d] [transform-origin:center] animate-[brand-orbit-spiral-tilt_32s_ease-in-out_infinite] motion-reduce:animate-none">
          {satellites.map((b, i) => {
            const angle = (i / satellites.length) * 360 - 90;
            return (
              <div
                key={b.domain}
                className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
                style={planetBox(angle, true)}
              >
                <PlanetFace
                  brand={b}
                  className="animate-[brand-orbit-spiral-tilt-face_32s_ease-in-out_infinite] motion-reduce:animate-none"
                />
              </div>
            );
          })}
        </div>
      )}

      {/* —— D · Chaos — each planet independent speed + tumble —— */}
      {variant === "chaos" && (
        <div className="absolute inset-0">
          {satellites.map((b, i) => {
            const start = (i / satellites.length) * 360 - 90;
            const duration = 18 + (i % 5) * 7;
            const reverse = i % 2 === 1;
            return (
              <div
                key={b.domain}
                className="absolute left-1/2 top-1/2 will-change-transform motion-reduce:animate-none"
                style={{
                  ...planetBox(0),
                  ["--chaos-start" as string]: `${start}deg`,
                  animation: `brand-orbit-chaos ${duration}s linear infinite ${reverse ? "reverse" : ""}`,
                  animationDelay: `${-i * (duration / 12)}s`,
                }}
              >
                <PlanetFace
                  brand={b}
                  className="motion-reduce:animate-none"
                  style={{
                    animation: `brand-orbit-tumble ${6 + (i % 3) * 2}s ease-in-out infinite`,
                    animationDelay: `${-i * 0.4}s`,
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
