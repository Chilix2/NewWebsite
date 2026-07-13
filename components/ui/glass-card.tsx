"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark" | "frosted";
  intensity?: "sm" | "md" | "lg";
  hoverEffect?: boolean;
}

export function GlassCard({ 
  className, 
  variant = "light", 
  intensity = "md",
  hoverEffect = false,
  children,
  ...props 
}: GlassCardProps) {
  
  const variants = {
    light: "bg-white/60 border-white/40",
    dark: "bg-black/20 border-white/10 text-white",
    frosted: "bg-white/30 border-white/20"
  };

  const intensities = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-xl"
  };

  return (
    <div 
      className={cn(
        "rounded-2xl border shadow-sm transition-all duration-300",
        variants[variant],
        intensities[intensity],
        hoverEffect && "hover:bg-white/70 hover:shadow-lg hover:-translate-y-1 hover:border-white/60",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
