"use client";

import React, { useEffect, useMemo, useState } from "react";
import { BrandOrbit } from "@/components/brand-orbit";
import { getAllIntegrationBrands, type IntegrationBrand } from "@/lib/integration-brands";
import { cn } from "@/lib/utils";

interface ProofBandV2Props {
  dict: any;
}

const BATCH_SIZE = 12;
const LOOP_MS = 32_000;
const FADE_MS = 700;

function chunkBrands(brands: IntegrationBrand[], size: number): IntegrationBrand[][] {
  if (brands.length === 0) return [];
  const batches: IntegrationBrand[][] = [];
  for (let i = 0; i < brands.length; i += size) {
    batches.push(brands.slice(i, i + size));
  }
  const last = batches[batches.length - 1];
  if (batches.length > 1 && last.length < size) {
    batches[batches.length - 1] = [...last, ...brands.slice(0, size - last.length)];
  }
  return batches;
}

/**
 * Spiral+Tilt orbit clipped to the animation's visible bounds
 * (3D tilt makes the square read ~2:1 — crop empty top/bottom).
 */
export function ProofBandV2({ dict }: ProofBandV2Props) {
  const stats = dict.hero?.stats ?? {};
  const brands = useMemo(() => getAllIntegrationBrands(), []);
  const batches = useMemo(() => chunkBrands(brands, BATCH_SIZE), [brands]);

  const [batchIdx, setBatchIdx] = useState(0);
  const [staggerEnabled, setStaggerEnabled] = useState(true);

  useEffect(() => {
    if (batches.length <= 1) return;

    let switchTimer: ReturnType<typeof setTimeout> | undefined;
    let fadeInTimer: ReturnType<typeof setTimeout> | undefined;
    const loopTimer = setInterval(() => {
      // Phase 1: fade ring out (350ms)
      setStaggerEnabled(false);
      // Phase 2: switch batch while invisible
      switchTimer = setTimeout(() => {
        setBatchIdx((i) => (i + 1) % batches.length);
      }, 350);
      // Phase 3: stagger icons back in (starts at ~400ms, finishes ~1.2s)
      fadeInTimer = setTimeout(() => {
        setStaggerEnabled(true);
      }, 400);
    }, LOOP_MS);

    return () => {
      clearInterval(loopTimer);
      if (switchTimer) clearTimeout(switchTimer);
      if (fadeInTimer) clearTimeout(fadeInTimer);
    };
  }, [batches.length]);

  const active = batches[batchIdx] ?? brands.slice(0, BATCH_SIZE);

  return (
    <section className="bg-white py-[60px] border-b border-slate-100">
      <p className="text-center text-[20px] leading-[28px] font-bold text-slate-900 mb-3 px-4 sm:px-6">
        {stats.title ?? "Sailly funktioniert nahtlos mit"}
      </p>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-center">
        {/*
          Visible spiral-tilt bbox is ~2:1 (e.g. 478×233).
          Clip the square orbit to that so empty top/bottom aren't part of the layout.
          Wider aspect (2/1.4) prevents clipping with expanded orbitExtraPx=30.
        */}
        <div className="relative w-[min(92%,380px)] aspect-[2/1.4] overflow-hidden rounded-2xl">
          <div className="absolute left-1/2 top-1/2 w-full aspect-square -translate-x-1/2 -translate-y-1/2">
            <BrandOrbit
              brands={active}
              variant="spiralTilt"
              showLabel={false}
              maxPlanets={BATCH_SIZE}
              orbitExtraPx={30}
              staggerEnabled={staggerEnabled}
              className="w-full max-w-none translate-x-[2px] -translate-y-[12px]"
              hubClassName="bg-amber-100/40 border-amber-300/50"
              satellitesClassName={cn(
                "transition-opacity duration-300 ease-out motion-reduce:transition-none",
                staggerEnabled ? "opacity-100" : "opacity-0"
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
