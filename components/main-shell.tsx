"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface MainShellProps {
  children: React.ReactNode;
  locale: string;
}

/** Homepage hero is full-bleed under the transparent header — no top padding there. */
export function MainShell({ children, locale }: MainShellProps) {
  const pathname = usePathname();
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  return (
    <main
      className={cn("flex-1 relative z-10", !isHome && "pt-20")}
      suppressHydrationWarning
    >
      {children}
    </main>
  );
}
