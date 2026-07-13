"use client";

import { usePathname } from "next/navigation";

interface ConditionalBackgroundProps {
  locale: string;
}

export function ConditionalBackground({ locale }: ConditionalBackgroundProps) {
  // All pages use the same landing page background
  return (
    <>
      <div className="absolute inset-0 landing-page-bg" />
    </>
  );
}

