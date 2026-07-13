"use client";

import React, { useState, useEffect } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { SaillyIcon } from "./sailly-icon";
import { cn } from "@/lib/utils";
import { GlassCard } from "./ui/glass-card";
import { 
  Phone,
  Database,
  MessageSquare,
  Zap,
  Activity
} from "lucide-react";

interface WorkflowStep {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
}

interface WorkflowAnimationSequenceProps {
  className?: string;
  steps?: WorkflowStep[];
}

export function WorkflowAnimationSequence({ className, steps: customSteps }: WorkflowAnimationSequenceProps) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4); // 0, 1, 2, 3 (3 is reset/pause)
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  // Default steps in German (for backward compatibility)
  const defaultSteps: WorkflowStep[] = [
    {
      id: "input",
      label: "Kundenanruf",
      icon: Phone,
      description: "Empfängt Anruf oder Nachricht"
    },
    {
      id: "rag",
      label: "Wissensdatenbank",
      icon: Database,
      description: "Findet die richtige Antwort"
    },
    {
      id: "output",
      label: "Sailly antwortet",
      icon: MessageSquare,
      description: "Natürliche, menschliche Antwort"
    }
  ];

  const steps = customSteps || defaultSteps;

  return (
    <LazyMotion features={domAnimation}>
      <div data-testid="workflow" className={cn("w-full py-16 relative overflow-hidden", className)}>
      {/* Background Dot Pattern */}
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{
             backgroundImage: 'radial-gradient(circle, #ec4899 1px, transparent 1px)',
             backgroundSize: '24px 24px'
           }}
      />

      <div className="relative max-w-5xl mx-auto px-4 z-10">
        
        {/* Connection Line with Pulse — inset-x-4 aligns track with grid left/right edges */}
        <div className="hidden sm:block absolute top-1/2 inset-x-4 h-1.5 bg-gray-100/50 -translate-y-1/2 z-0 rounded-full overflow-hidden backdrop-blur-sm">
          <m.div 
            className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
            animate={{ 
              width: activeStep === 0 ? "16%" : activeStep === 1 ? "50%" : activeStep === 2 ? "84%" : "84%",
              opacity: activeStep === 3 ? 0 : 1
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </div>

        {/* Nodes */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-16">
          {steps.map((step, index) => {
            const isActive = activeStep >= index && activeStep !== 3;
            const isCurrent = activeStep === index;

            return (
              <div key={step.id} className="flex flex-col items-center group">
                {/* Glass Node */}
                <div className="relative flex items-center justify-center mb-8 transition-all duration-500 w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40">
                  <GlassCard 
                    variant="light"
                    intensity="lg"
                    className={cn(
                      "absolute inset-0 rounded-3xl border-2 transition-all duration-500",
                      isActive 
                        ? "border-pink-300 shadow-[0_0_30px_rgba(236,72,153,0.3)] bg-white/80" 
                        : "border-white/50 bg-white/40 grayscale opacity-70"
                    )}
                  />
                  
                  {/* Icon or Sailly */}
                  {index === 2 ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <SaillyIcon 
                        size="lg" 
                        state={isCurrent ? "speaking" : "idle"} 
                        animated={isActive}
                      />
                    </div>
                  ) : (
                    <div className={cn(
                      "relative w-full h-full flex items-center justify-center p-4 rounded-2xl transition-colors duration-500",
                      isActive ? "bg-pink-50" : "bg-transparent"
                    )}>
                      {(() => {
                        const Icon = step.icon;
                        return (
                          <Icon 
                            className={cn(
                              "w-10 h-10 sm:w-14 sm:h-14 transition-colors duration-500",
                              isActive 
                                ? (index === 0 ? "text-blue-500" : "text-purple-500") 
                                : "text-gray-400"
                            )} 
                          />
                        );
                      })()}
                    </div>
                  )}


                  {/* Active Ring Pulse */}
                  {isCurrent && (
                    <m.div
                      className="absolute inset-0 rounded-3xl border-2 border-pink-400 pointer-events-none"
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: 1.2, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </div>

                {/* Label */}
                <m.div
                  animate={{ opacity: isActive ? 1 : 0.6, y: isActive ? 0 : 5 }}
                  className="text-center"
                >
                  <h3 className={cn(
                    "text-lg sm:text-xl font-bold mb-2 transition-colors",
                    isActive ? "text-gray-900" : "text-gray-500"
                  )}>
                    {step.label}
                  </h3>
                  <GlassCard variant="frosted" intensity="sm" className="px-4 py-2 rounded-full inline-block">
                    <p className="text-sm text-gray-600">
                      {step.description}
                    </p>
                  </GlassCard>
                </m.div>
              </div>
            );
          })}
        </div>

        {/* ── DESKTOP: horizontal dots (sm+) ── */}
        {steps.map((step, index) => {
          const isActive = activeStep >= index && activeStep !== 3;
          const leftPct = ["16%", "50%", "84%"][index];
          return (
            <div
              key={`stop-${step.id}`}
              className={cn(
                "hidden sm:block absolute top-1/2 w-5 h-5 rounded-full border-2 border-white shadow-md pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-500",
                isActive ? "bg-green-400 scale-125" : "bg-gray-300 opacity-60"
              )}
              style={{ left: leftPct, zIndex: 25 }}
            />
          );
        })}

        {/* ── DESKTOP: moving data packet (sm+) ── */}
        {activeStep < 3 && (
          <m.div
            className="hidden sm:block absolute top-1/2 w-12 h-12 z-20 pointer-events-none -translate-y-1/2 -translate-x-1/2"
            animate={{ 
              left: activeStep === 0 ? "16%" : activeStep === 1 ? "50%" : "84%",
              opacity: activeStep === 3 ? 0 : 1
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
               <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)] z-10" />
               <div className="absolute inset-0 bg-pink-400 rounded-full animate-ping opacity-50" />
            </div>
          </m.div>
        )}

        {/* ── MOBILE: vertical progress line (< sm) ──
            Runs through the horizontal center of stacked containers.
            stop positions = bottom edge of each node box (h-20=80px):
            C1=14% (80/576), C2=49% (280/576), C3=83% (480/576) */}
        <div className="sm:hidden absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1.5 bg-gray-100/50 z-0 rounded-full overflow-hidden">
          <m.div
            className="w-full bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400"
            animate={{
              height: activeStep === 0 ? "14%" : activeStep === 1 ? "49%" : activeStep === 2 ? "83%" : "83%",
              opacity: activeStep === 3 ? 0 : 1
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </div>

        {/* ── MOBILE: green stop dots at bottom edge of each container (< sm) ── */}
        {steps.map((step, index) => {
          const isActive = activeStep >= index && activeStep !== 3;
          const topPct = ["14%", "49%", "83%"][index];
          return (
            <div
              key={`mob-stop-${step.id}`}
              className={cn(
                "sm:hidden absolute left-1/2 w-5 h-5 rounded-full border-2 border-white shadow-md pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-500",
                isActive ? "bg-green-400 scale-125" : "bg-gray-300 opacity-60"
              )}
              style={{ top: topPct, zIndex: 25 }}
            />
          );
        })}

        {/* ── MOBILE: blinking data packet (< sm) ── */}
        {activeStep < 3 && (
          <m.div
            className="sm:hidden absolute left-1/2 w-12 h-12 z-20 pointer-events-none -translate-x-1/2 -translate-y-1/2"
            animate={{
              top: activeStep === 0 ? "14%" : activeStep === 1 ? "49%" : "83%",
              opacity: activeStep === 3 ? 0 : 1
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)] z-10" />
              <div className="absolute inset-0 bg-pink-400 rounded-full animate-ping opacity-50" />
            </div>
          </m.div>
        )}
      </div>
    </div>
    </LazyMotion>
  );
}
