"use client";

import type { CSSProperties } from "react";
import { SaillySignalLogo } from "@/components/sailly-signal-logo";
import { cn } from "@/lib/utils";

export type OrbitVariant = "counter" | "tilt3d" | "spiral" | "chaos" | "spiralTilt";

const VARIANT_META: Record<OrbitVariant, { label: string }> = {
  counter: { label: "B · Counter" },
  tilt3d: { label: "A · Tilt3D" },
  spiral: { label: "C · Spiral" },
  chaos: { label: "D · Chaos" },
  spiralTilt: { label: "B · Spiral+Tilt" },
};

/** Design-size reference for converting orbitExtraPx → translate %. */
const ORBIT_DESIGN_PX = 380;

/**
 * Verified high-resolution logo URLs from working CDN endpoints.
 * Each URL was tested (HTTP 200 + valid image content).
 * All other brands use logo.pubrio.com → Google favicon fallback.
 */
const VERIFIED_LOGO_URLS: Record<string, string> = {
  // Wikimedia Commons (SVG, infinite resolution) — tested OK
  "datev.de":
    "https://upload.wikimedia.org/wikipedia/commons/c/c7/Datev.svg",
  "lexware.de":
    "https://upload.wikimedia.org/wikipedia/commons/3/30/Lexware_logo.svg",
  "sevenrooms.com":
    "https://upload.wikimedia.org/wikipedia/commons/9/9c/SevenRooms_Logo.png",

  // worldvectorlogo.com (SVG) — tested OK
  "addison.de":
    "https://cdn.worldvectorlogo.com/logos/addison.svg",
  "protel.net":
    "https://cdn.worldvectorlogo.com/logos/protel.svg",

  // cdnlogo.com (SVG) — tested OK
  "thefork.com":
    "https://static.cdnlogo.com/logos/t/20/thefork.svg",

  // BIMI official record (SVG) — tested OK
  "lieferando.de":
    "https://bimi.entrust.net/lieferando.de/logo.svg",

  // jsDelivr Simple Icons (SVG) — tested OK
  "calendly.com":
    "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/calendly.svg",
};

/**
 * Domains where Pubrio returns solid-color rectangles or corrupt images.
 * For these, skip Pubrio and use GStatic (200x200) → Google favicon fallback.
 * Source: CDN probe (tested all 72 domains against Pubrio/GStatic/Google).
 */
const SKIP_PUBRIO = new Set([
  // Solid color blocks from Pubrio
  "ra-micro.de", "actaport.de", "renostar.de", "simba.de",
  "resmio.com", "squareup.com", "solutio.de",
  "teleclinic.com", "apple.com",
  // Corrupt/broken images from Pubrio
  "shiji.com", "medikit.de", "albis-online.de", "sam-system.de",
]);

function getBrandLogoSrc(domain: string): { src: string; fallback: string } {
  const realUrl = VERIFIED_LOGO_URLS[domain];
  if (realUrl) {
    return {
      src: realUrl,
      fallback: `https://logo.pubrio.com/${domain}`,
    };
  }
  const enc = encodeURIComponent(domain);
  if (SKIP_PUBRIO.has(domain)) {
    return {
      src: `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${domain}&size=256`,
      fallback: `https://www.google.com/s2/favicons?domain=${enc}&sz=256`,
    };
  }
  return {
    src: `https://logo.pubrio.com/${domain}`,
    fallback: `https://www.google.com/s2/favicons?domain=${enc}&sz=256`,
  };
}

interface BrandOrbitProps {
  brands: { name: string; domain: string }[];
  variant: OrbitVariant;
  showLabel?: boolean;
  /** Max planets to render (default 12). */
  maxPlanets?: number;
  /** Extra hub→planet distance in px (at 380px design size). */
  orbitExtraPx?: number;
  /** When true, planets stagger-in at 70ms intervals. */
  staggerEnabled?: boolean;
  className?: string;
  /** Applied to the satellite ring only (hub / Sailly stays unaffected). */
  satellitesClassName?: string;
  /** Applied to the center Sailly hub. */
  hubClassName?: string;
}

function PlanetFace({
  brand,
  className,
  style,
  staggerIndex,
}: {
  brand: { name: string; domain: string };
  className?: string;
  style?: CSSProperties;
  staggerIndex?: number;
}) {
  const logo = getBrandLogoSrc(brand.domain);

  return (
    <div
      className={cn(
        "w-full h-full rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.16)] ring-1 ring-black/[0.06] overflow-hidden flex items-center justify-center will-change-transform",
        staggerIndex !== undefined && "animate-[brand-orbit-stagger-in_0.45s_ease-out_both]",
        className
      )}
      style={
        staggerIndex !== undefined
          ? { ...style, animationDelay: `${staggerIndex * 0.07}s` }
          : style
      }
      title={brand.name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.src}
        alt={brand.name}
        width={64}
        height={64}
        className="w-[55%] h-[55%] object-contain"
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).src = logo.fallback;
        }}
      />
    </div>
  );
}

export function BrandOrbit({
  brands,
  variant,
  showLabel = true,
  maxPlanets = 12,
  orbitExtraPx = 0,
  staggerEnabled,
  className,
  satellitesClassName,
  hubClassName,
}: BrandOrbitProps) {
  const satellites = brands.slice(0, maxPlanets);
  const meta = VARIANT_META[variant];
  const planetPct = satellites.length > 16 ? 10 : satellites.length > 12 ? 12 : 14;
  const planetHalf = planetPct / 2;
  const baseTranslatePct = satellites.length > 16 ? 265 : 235;
  const extraTranslatePct =
    orbitExtraPx === 0
      ? 0
      : (orbitExtraPx / ((ORBIT_DESIGN_PX * planetPct) / 100)) * 100;
  const orbitTranslate = `${baseTranslatePct + extraTranslatePct}%`;

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
        (variant === "tilt3d" || variant === "spiralTilt") && "[perspective:900px]",
        className
      )}
    >
      {showLabel && (
        <p className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 text-[10px] font-bold uppercase tracking-widest text-white/70 whitespace-nowrap pointer-events-none">
          {meta.label}
        </p>
      )}

      <div
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 border border-white/50 flex items-center justify-center z-10",
          hubClassName
        )}
        style={{ width: "26%", height: "26%" }}
      >
        <SaillySignalLogo
          size="md"
          animated
          tone="brand"
          className="w-[70%] h-[70%]"
        />
      </div>

      {variant === "counter" && (
        <div
          className={cn(
            "absolute inset-0 will-change-transform [transform-origin:center] animate-[brand-orbit-spin_32s_linear_infinite_reverse] motion-reduce:animate-none",
            satellitesClassName
          )}
        >
          {satellites.map((b, i) => {
            const angle = (i / satellites.length) * 360 - 90;
            return (
              <div key={b.domain} className="absolute left-1/2 top-1/2" style={planetBox(angle)}>
                <PlanetFace
                  brand={b}
                  className="animate-[brand-orbit-spin_32s_linear_infinite] motion-reduce:animate-none"
                  staggerIndex={staggerEnabled ? i : undefined}
                />
              </div>
            );
          })}
        </div>
      )}

      {variant === "tilt3d" && (
        <div
          className={cn(
            "absolute inset-0 will-change-transform [transform-style:preserve-3d] [transform-origin:center] animate-[brand-orbit-tilt3d_36s_linear_infinite] motion-reduce:animate-none",
            satellitesClassName
          )}
        >
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
                  staggerIndex={staggerEnabled ? i : undefined}
                />
              </div>
            );
          })}
        </div>
      )}

      {variant === "spiral" && (
        <div
          className={cn(
            "absolute inset-0 will-change-transform [transform-origin:center] animate-[brand-orbit-spiral_28s_ease-in-out_infinite] motion-reduce:animate-none",
            satellitesClassName
          )}
        >
          {satellites.map((b, i) => {
            const angle = (i / satellites.length) * 360 - 90;
            return (
              <div key={b.domain} className="absolute left-1/2 top-1/2" style={planetBox(angle)}>
                <PlanetFace
                  brand={b}
                  className="animate-[brand-orbit-spiral-face_28s_ease-in-out_infinite] motion-reduce:animate-none"
                  staggerIndex={staggerEnabled ? i : undefined}
                />
              </div>
            );
          })}
        </div>
      )}

      {variant === "spiralTilt" && (
        <div
          className={cn(
            "absolute inset-0 will-change-transform [transform-style:preserve-3d] [transform-origin:center] animate-[brand-orbit-spiral-tilt_32s_ease-in-out_infinite] motion-reduce:animate-none",
            satellitesClassName
          )}
        >
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
                  staggerIndex={staggerEnabled ? i : undefined}
                />
              </div>
            );
          })}
        </div>
      )}

      {variant === "chaos" && (
        <div className={cn("absolute inset-0", satellitesClassName)}>
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
                  animationDelay: `${-i * (duration / Math.max(satellites.length, 1))}s`,
                }}
              >
                <PlanetFace
                  brand={b}
                  className="motion-reduce:animate-none"
                  staggerIndex={staggerEnabled ? i : undefined}
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
