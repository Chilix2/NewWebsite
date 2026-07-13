"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
}

/**
 * Crisp, stroke-based step icons for "Wie Sailly funktioniert".
 * All icons inherit `currentColor`, so they adapt to any surface —
 * white on colored MCP nodes, coral/slate inside the step cards.
 */

/** Handset with incoming signal waves — step 01 "Anruf annehmen" */
export function PhoneAnswerIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-7 h-7", className)}
      aria-hidden="true"
    >
      <path d="M28 22.6v3.2a2.1 2.1 0 0 1-2.3 2.1 21.3 21.3 0 0 1-9.3-3.3 21 21 0 0 1-6.5-6.5A21.3 21.3 0 0 1 6.6 8.7 2.1 2.1 0 0 1 8.7 6.4h3.2c1.05 0 1.95.77 2.1 1.8.2 1.24.55 2.45 1.05 3.6a2.1 2.1 0 0 1-.47 2.22l-1.36 1.36a16.8 16.8 0 0 0 6.5 6.5l1.36-1.36a2.1 2.1 0 0 1 2.22-.47c1.15.5 2.36.85 3.6 1.05 1.04.16 1.8 1.06 1.8 2.11Z" />
      <path d="M20.5 6.5c1.7.45 3 1.75 3.45 3.45" opacity="0.85" />
      <path d="M21.5 2.8c3.35.85 5.9 3.4 6.75 6.75" opacity="0.55" />
    </svg>
  );
}

/** Calendar with confirmation check — step 02 "Verstehen & handeln" */
export function UnderstandActIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-7 h-7", className)}
      aria-hidden="true"
    >
      <rect x="4.5" y="6.5" width="23" height="21" rx="3.5" />
      <path d="M4.5 12.5h23" />
      <path d="M10.5 3.5v5M21.5 3.5v5" />
      <path d="M11.5 20.5l3.2 3.2 6-6.4" />
    </svg>
  );
}

/** Handover to the team — paper plane reaching two teammates — step 03 "Ihr Team informieren" */
export function TeamNotifyIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-7 h-7", className)}
      aria-hidden="true"
    >
      <path d="M27.5 4.5 14 18" />
      <path d="M27.5 4.5 19 27l-5-9-9-5 22.5-8.5Z" />
      <circle cx="25.5" cy="24.5" r="2.6" opacity="0.85" />
      <circle cx="29.2" cy="28.6" r="1.9" opacity="0.55" />
    </svg>
  );
}

export const WORKFLOW_STEP_ICONS = [PhoneAnswerIcon, UnderstandActIcon, TeamNotifyIcon] as const;
