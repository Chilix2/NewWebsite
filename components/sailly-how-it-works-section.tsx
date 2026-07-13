"use client";

import React, { useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { cn } from "@/lib/utils";
import { SaillyWorkflowMcpAnimation } from "./sailly-workflow-mcp-animation";
import { WORKFLOW_STEP_ICONS } from "./workflow-step-icons";

export interface HowItWorksStep {
  title: string;
  desc: string;
}

interface SaillyHowItWorksSectionProps {
  badge?: string;
  title: string;
  subtitle: string;
  steps: HowItWorksStep[];
  variant?: "homepage" | "product";
  className?: string;
  aside?: React.ReactNode;
  asideCaption?: string;
}

/**
 * Shared "Wie Sailly funktioniert" section with MCP-style animation + synced step cards.
 */
export function SaillyHowItWorksSection({
  badge,
  title,
  subtitle,
  steps,
  variant = "homepage",
  className,
  aside,
  asideCaption,
}: SaillyHowItWorksSectionProps) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <LazyMotion features={domAnimation}>
      <div className={cn("w-full", className)}>
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 lg:mb-12"
        >
          {badge && (
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              {badge}
            </p>
          )}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </m.div>

        <div
          className={cn(
            aside ? "grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-12 items-start" : ""
          )}
        >
          <div
            className={cn(
              "grid gap-10 lg:gap-14 items-start",
              variant === "homepage" && !aside ? "lg:grid-cols-2" : "lg:grid-cols-[1.1fr_1fr]"
            )}
          >
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <SaillyWorkflowMcpAnimation onActiveStepChange={setActiveStep} />
            </m.div>

            <div className="space-y-4">
              {steps.map((step, i) => {
                const Icon = WORKFLOW_STEP_ICONS[i] ?? WORKFLOW_STEP_ICONS[0];
                const isActive = activeStep === i;
                return (
                  <m.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    className={cn(
                      "rounded-3xl border p-5 sm:p-6 shadow-sm transition-all duration-350",
                      isActive
                        ? "bg-white border-primary/30 shadow-md ring-1 ring-primary/15"
                        : "bg-white/70 border-slate-100 opacity-75"
                    )}
                  >
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center gap-2 shrink-0">
                        <span
                          className={cn(
                            "flex items-center justify-center w-11 h-11 rounded-2xl transition-colors duration-350",
                            isActive ? "bg-primary/15 text-primary" : "bg-slate-100 text-slate-400"
                          )}
                        >
                          <Icon className="w-5 h-5" />
                        </span>
                        <span
                          className={cn(
                            "text-xs font-bold transition-colors duration-350",
                            isActive ? "text-primary" : "text-slate-300"
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="pt-0.5">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
                          {step.title}
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </m.div>
                );
              })}
            </div>
          </div>

          {aside && (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="flex flex-col items-center lg:sticky lg:top-24"
            >
              {asideCaption && (
                <p className="text-sm font-medium text-slate-500 mb-6 text-center max-w-xs">
                  {asideCaption}
                </p>
              )}
              {aside}
            </m.div>
          )}
        </div>
      </div>
    </LazyMotion>
  );
}
