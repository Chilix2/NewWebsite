"use client";

import type { CSSProperties } from "react";
import { SaillySignalLogo } from "@/components/sailly-signal-logo";
import { cn } from "@/lib/utils";
import type { IntegrationBrand } from "@/lib/integration-brands";

interface IntegrationOrbitBandProps {
  brands: IntegrationBrand[];
  className?: string;
}

const CYCLE_SEC = 56;
const LANES = 5;

/**
 * Verified high-resolution logo URLs from working CDN endpoints.
 * Each URL was tested (HTTP 200 + valid image content).
 * All other brands use logo.pubrio.com → Google favicon fallback.
 */
const LOGO_URLS: Record<string, string> = {
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

/** Domains where Pubrio returns solid-color rectangles or corrupt images. */
const SKIP_PUBRIO = new Set([
  "ra-micro.de", "actaport.de", "renostar.de", "simba.de",
  "resmio.com", "squareup.com", "solutio.de",
  "teleclinic.com", "apple.com",
  "shiji.com", "medikit.de", "albis-online.de", "sam-system.de",
]);

function getBrandLogoSrc(domain: string): { src: string; fallback: string } {
  const realUrl = LOGO_URLS[domain];
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

function PlanetFace({
  brand,
  sizePx,
}: {
  brand: IntegrationBrand;
  sizePx: number;
}) {
  const logo = getBrandLogoSrc(brand.domain);
  return (
    <div
      className="rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.16)] ring-1 ring-black/[0.06] overflow-hidden flex items-center justify-center shrink-0"
      style={{ width: sizePx, height: sizePx }}
      title={brand.name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.src}
        alt={brand.name}
        width={64}
        height={64}
        className="w-[55%] h-[55%] object-contain"
        loading="eager"
        decoding="async"
        onError={(e) => {
          (e.target as HTMLImageElement).src = logo.fallback;
        }}
      />
    </div>
  );
}

/**
 * Full-loop proof band:
 * wave-lines in from left/right → slow orbit around Sailly → resolve → restart.
 *
 * IMPORTANT: keyframe names must appear in className (animate-[...]) so
 * Tailwind v4 keeps @keyframes brand-proof-* in the compiled CSS.
 */
export function IntegrationOrbitBand({ brands, className }: IntegrationOrbitBandProps) {
  const all = brands.filter((b) => b?.domain);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/80 border border-slate-200/80 flex items-center justify-center shadow-md">
        <SaillySignalLogo
          size="md"
          animated
          tone="brand"
          className="w-[70%] h-[70%]"
          instanceId="proof-orbit"
        />
      </div>

      {all.map((brand, i) => {
        const fromLeft = i % 2 === 0;
        const lane = i % LANES;
        const laneY = `${((lane / (LANES - 1)) - 0.5) * 62}%`;
        const angle = (i / Math.max(all.length, 1)) * 360 - 90;
        const radiusPx = 140 + (i % 4) * 64;
        const size = 68 + (i % 3) * 8;
        const delay = -((i / Math.max(all.length, 1)) * CYCLE_SEC);

        return (
          <div
            key={brand.domain}
            className={cn(
              "absolute left-1/2 top-1/2 will-change-transform pointer-events-none motion-reduce:animate-none",
              // Full literal class strings — required for Tailwind keyframe retention
              fromLeft
                ? "animate-[brand-proof-left_56s_linear_infinite]"
                : "animate-[brand-proof-right_56s_linear_infinite]"
            )}
            style={
              {
                width: size,
                height: size,
                marginLeft: -size / 2,
                marginTop: -size / 2,
                ["--lane-y" as string]: laneY,
                ["--a" as string]: `${angle}deg`,
                ["--r" as string]: `${radiusPx}px`,
                animationDelay: `${delay}s`,
              } as CSSProperties
            }
          >
            <PlanetFace brand={brand} sizePx={size} />
          </div>
        );
      })}
    </div>
  );
}
