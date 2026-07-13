"use client";

import React, { Suspense } from "react";
import { cn } from "@/lib/utils";
import { SaillyOrb, type OrbState } from "./sailly-orb";

// CSS-only orb fallback — eliminates Three.js WebGL overhead
function CSSOrb({ state }: { state: OrbState }) {
  return (
    <div 
      className="w-full h-full rounded-full bg-gradient-to-br from-[#ff9b8a] via-[#ffb6cb] to-[#ffc8b9] will-change-transform animate-[orb-pulse_3s_ease-in-out_infinite]"
      style={{ 
        transform: "translate3d(0, 0, 0)",
        filter: "blur(0.5px)"
      }}
    />
  );
}

interface SaillyIconProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  state?: "idle" | "listening" | "thinking" | "speaking" | "building" | "testing" | "deploying" | "inactive";
  animated?: boolean;
  showStatusIndicator?: boolean;
  audioLevel?: number;
}

// Map extended states to valid OrbState values
function mapState(state: string): OrbState {
  switch (state) {
    case "listening":
      return "listening";
    case "speaking":
      return "speaking";
    case "thinking":
      return "listening"; // Map thinking to listening (reactive mode)
    case "building":
      return "idle"; // Map building to idle (calm focus)
    case "testing":
      return "listening"; // Map testing to listening (watchful mode)
    case "deploying":
      return "speaking"; // Map deploying to speaking (active mode)
    case "inactive":
      return "idle";
    default:
      return "idle";
  }
}

export function SaillyIcon({ 
  className,
  size = "md",
  state = "idle",
  animated = true,
  showStatusIndicator = false,
  audioLevel = 0
}: SaillyIconProps) {
  // Size configurations
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-32 h-32"
  };

  const orbState = mapState(state);

  return (
    <div className={cn("relative flex items-center justify-center select-none overflow-visible", sizes[size], className)}>
      <Suspense fallback={<CSSOrb state={orbState} />}>
        <SaillyOrb 
          state={orbState} 
          audioLevel={audioLevel} 
          className={cn("w-full h-full", animated ? "" : "opacity-50")}
        />
      </Suspense>
      
      {/* Optional Status Indicator (legacy support) */}
      {showStatusIndicator && (
        <div
          className={cn(
            "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white shadow-lg",
            state === "listening" ? "bg-blue-500" :
            state === "speaking" ? "bg-green-500" :
            state === "thinking" ? "bg-purple-500" : 
            state === "inactive" ? "bg-gray-400" : "bg-transparent"
          )}
        />
      )}
    </div>
  );
}

// Preset configurations
export const SaillyStates = {
  Idle: (props: Omit<SaillyIconProps, 'state'>) => <SaillyIcon {...props} state="idle" />,
  Listening: (props: Omit<SaillyIconProps, 'state'>) => <SaillyIcon {...props} state="listening" />,
  Thinking: (props: Omit<SaillyIconProps, 'state'>) => <SaillyIcon {...props} state="thinking" />,
  Speaking: (props: Omit<SaillyIconProps, 'state'>) => <SaillyIcon {...props} state="speaking" />,
};
