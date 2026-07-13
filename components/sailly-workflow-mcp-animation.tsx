"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { SaillySignalLogo } from "./sailly-signal-logo";
import {
  PhoneAnswerIcon,
  UnderstandActIcon,
  TeamNotifyIcon,
} from "./workflow-step-icons";

const NODE_CONFIG = [
  {
    y: 52,
    bg: "#ff9b8a",
    ring: "none",
    Icon: PhoneAnswerIcon,
    path: "M 88 52 C 140 52, 200 100, 280 140",
  },
  {
    y: 140,
    bg: "#ffffff",
    ring: "#ff9b8a",
    Icon: UnderstandActIcon,
    path: "M 88 140 C 160 140, 210 140, 280 140",
  },
  {
    y: 228,
    bg: "#4f46e5",
    ring: "none",
    Icon: TeamNotifyIcon,
    path: "M 88 228 C 140 228, 200 180, 280 140",
  },
] as const;

const STEP_DURATION_MS = 1600;
const TOTAL_STEPS = 3;

interface SaillyWorkflowMcpAnimationProps {
  className?: string;
  onActiveStepChange?: (step: number) => void;
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Swishy MCP-style workflow: 3 source nodes → Sailly hub with animated dashed paths.
 */
export function SaillyWorkflowMcpAnimation({
  className,
  onActiveStepChange,
}: SaillyWorkflowMcpAnimationProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [hubPulse, setHubPulse] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const onActiveStepChangeRef = useRef(onActiveStepChange);
  onActiveStepChangeRef.current = onActiveStepChange;

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      onActiveStepChangeRef.current?.(0);
      return;
    }

    let step = 0;
    onActiveStepChangeRef.current?.(0);

    const tick = () => {
      setActiveStep(step);
      setHubPulse(true);
      onActiveStepChangeRef.current?.(step);
      setTimeout(() => setHubPulse(false), STEP_DURATION_MS * 0.7);
      step = (step + 1) % TOTAL_STEPS;
    };

    tick();
    const interval = setInterval(tick, STEP_DURATION_MS);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  const displayStep = reducedMotion ? 0 : activeStep;

  return (
    <div
      className={cn(
        "rounded-3xl bg-[#f8f9fa] border border-slate-100 p-6 lg:p-10 shadow-sm w-full",
        className
      )}
    >
      <svg
        viewBox="0 0 400 280"
        className="w-full h-auto max-h-[280px]"
        aria-hidden="true"
      >
        {/* Connector paths */}
        {NODE_CONFIG.map((node, i) => {
          const isActive = displayStep === i;
          return (
            <path
              key={`path-${i}`}
              d={node.path}
              fill="none"
              stroke={isActive ? "#2563eb" : "#e2e4e9"}
              strokeWidth={isActive ? 2.5 : 2}
              strokeDasharray="6 6"
              strokeLinecap="round"
              className={isActive && !reducedMotion ? "mcp-dash-active" : ""}
              style={{
                transition: "stroke 0.35s ease",
              }}
            />
          );
        })}

        {/* Source nodes */}
        {NODE_CONFIG.map((node, i) => {
          const isActive = displayStep === i;
          const Icon = node.Icon;
          return (
            <g key={`node-${i}`} transform={`translate(52, ${node.y})`}>
              <circle
                r="28"
                fill={node.bg}
                stroke={node.ring !== "none" ? node.ring : "transparent"}
                strokeWidth={node.ring !== "none" ? 2.5 : 0}
                opacity={isActive ? 1 : 0.55}
                style={{ transition: "opacity 0.35s ease" }}
              />
              <foreignObject x="-14" y="-14" width="28" height="28">
                <div className="flex items-center justify-center w-full h-full">
                  <Icon />
                </div>
              </foreignObject>
            </g>
          );
        })}

        {/* Hub — Sailly */}
        <g transform="translate(310, 140)">
          <rect
            x="-36"
            y="-36"
            width="72"
            height="72"
            rx="18"
            fill="#2563eb"
            className={hubPulse && !reducedMotion ? "mcp-hub-active" : ""}
            style={{ transformOrigin: "0px 0px" }}
          />
          <rect
            x="-42"
            y="-42"
            width="84"
            height="84"
            rx="22"
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
            strokeDasharray="6 4"
            opacity={hubPulse ? 0.8 : 0.35}
            className={hubPulse && !reducedMotion ? "mcp-hub-active" : ""}
            style={{ transformOrigin: "0px 0px" }}
          />
          <foreignObject x="-24" y="-24" width="48" height="48">
            <div className="flex items-center justify-center w-full h-full">
              <SaillySignalLogo size="md" animated={!reducedMotion} className="w-12 h-12" />
            </div>
          </foreignObject>
        </g>
      </svg>
    </div>
  );
}
