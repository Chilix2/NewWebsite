"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
}

/** Handset with soft depth — step 01 Anruf annehmen */
export function PhoneAnswerIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-7 h-7", className)}
      aria-hidden="true"
    >
      <rect x="4" y="2" width="24" height="28" rx="6" fill="white" fillOpacity="0.15" />
      <path
        d="M10 6h12a2 2 0 012 2v16a2 2 0 01-2 2H10a2 2 0 01-2-2V8a2 2 0 012-2z"
        fill="white"
        fillOpacity="0.9"
      />
      <circle cx="16" cy="24" r="1.5" fill="#ff9b8a" />
      <path
        d="M13 9c0-1.1.9-2 2-2h2a2 2 0 012 2"
        stroke="#ff9b8a"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M8 12c-2 2-2 6 0 8M24 12c2 2 2 6 0 8"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

/** Calendar + chat bubble — step 02 Verstehen & handeln */
export function UnderstandActIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-7 h-7", className)}
      aria-hidden="true"
    >
      <rect x="5" y="7" width="16" height="16" rx="3" fill="white" fillOpacity="0.95" />
      <path d="M5 12h16" stroke="#ff9b8a" strokeWidth="1.5" />
      <rect x="8" y="5" width="2" height="4" rx="1" fill="#ff9b8a" />
      <rect x="16" y="5" width="2" height="4" rx="1" fill="#ff9b8a" />
      <circle cx="10" cy="16" r="1.2" fill="#ff9b8a" />
      <circle cx="13" cy="16" r="1.2" fill="#ff9b8a" />
      <circle cx="16" cy="16" r="1.2" fill="#e2e4e9" />
      <path
        d="M18 18c3 0 6 1.5 6 4v2H18"
        fill="white"
        fillOpacity="0.9"
        stroke="#4f46e5"
        strokeWidth="1.2"
      />
      <circle cx="22" cy="20" r="0.8" fill="#4f46e5" />
      <circle cx="20" cy="22" r="0.8" fill="#4f46e5" />
    </svg>
  );
}

/** Bell + team dots — step 03 Ihr Team informieren */
export function TeamNotifyIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-7 h-7", className)}
      aria-hidden="true"
    >
      <path
        d="M16 6c-3.3 0-6 2.5-6 5.8V16l-2 3h16l-2-3v-4.2C22 8.5 19.3 6 16 6z"
        fill="white"
        fillOpacity="0.95"
      />
      <path
        d="M12 24a4 4 0 008 0"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="16" cy="5" r="2" fill="#facc15" />
      <circle cx="24" cy="22" r="3" fill="white" fillOpacity="0.9" stroke="#4f46e5" strokeWidth="1" />
      <circle cx="27" cy="22" r="2.5" fill="white" fillOpacity="0.85" stroke="#4f46e5" strokeWidth="0.8" />
      <circle cx="21" cy="22" r="2.5" fill="white" fillOpacity="0.85" stroke="#4f46e5" strokeWidth="0.8" />
    </svg>
  );
}

export const WORKFLOW_STEP_ICONS = [PhoneAnswerIcon, UnderstandActIcon, TeamNotifyIcon] as const;
