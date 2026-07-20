"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
}

/**
 * Crisp step icons for "Wie Sailly funktioniert".
 * Phone / notify are full-bleed circular marks; calendar is a JUL 17 squircle.
 */

/** Green filled pickup-phone mark — step 01 "Anruf annehmen". */
export function PhoneAnswerIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-full", className)}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="16" fill="#22c55e" />
      <path
        d="M28 22.6v3.2a2.1 2.1 0 0 1-2.3 2.1 21.3 21.3 0 0 1-9.3-3.3 21 21 0 0 1-6.5-6.5A21.3 21.3 0 0 1 6.6 8.7 2.1 2.1 0 0 1 8.7 6.4h3.2c1.05 0 1.95.77 2.1 1.8.2 1.24.55 2.45 1.05 3.6a2.1 2.1 0 0 1-.47 2.22l-1.36 1.36a16.8 16.8 0 0 0 6.5 6.5l1.36-1.36a2.1 2.1 0 0 1 2.22-.47c1.15.5 2.36.85 3.6 1.05 1.04.16 1.8 1.06 1.8 2.11Z"
        fill="white"
      />
      <path
        d="M20.5 6.5c1.7.45 3 1.75 3.45 3.45"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M21.5 2.8c3.35.85 5.9 3.4 6.75 6.75"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

/** JUL 17 calendar squircle — step 02 "Verstehen & handeln". */
export function UnderstandActIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-full", className)}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="7" fill="#ffffff" />
      <path
        d="M0 7C0 3.134 3.134 0 7 0h18c3.866 0 7 3.134 7 7v5H0V7Z"
        fill="#E5252A"
      />
      <text
        x="16"
        y="9.5"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="6.5"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, Segoe UI, sans-serif"
        letterSpacing="0.08em"
      >
        JUL
      </text>
      <text
        x="16"
        y="25.5"
        textAnchor="middle"
        fill="#1f2937"
        fontSize="14"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, Segoe UI, sans-serif"
      >
        17
      </text>
    </svg>
  );
}

/** Blue filled send mark — step 03 "Ihr Team informieren". */
export function TeamNotifyIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-full", className)}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="16" fill="#3b82f6" />
      <path d="M26 6 16 16" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M26 6l-8 20-4-8-8-4L26 6Z"
        fill="white"
        stroke="white"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="2.2" fill="white" opacity="0.85" />
      <circle cx="28" cy="28" r="1.5" fill="white" opacity="0.55" />
    </svg>
  );
}

export const WORKFLOW_STEP_ICONS = [PhoneAnswerIcon, UnderstandActIcon, TeamNotifyIcon] as const;
