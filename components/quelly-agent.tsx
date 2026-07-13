"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Mic } from "lucide-react";

interface QuellyAgentProps {
  text?: string;
  className?: string;
  size?: "sm" | "lg";
  mode?: "icon-only" | "full";
}

export function QuellyAgent({ 
  text = "Hi, I'm Quelly!", 
  className,
  size = "lg",
  mode = "full"
}: QuellyAgentProps) {
  const [isHovered, setIsHovered] = useState(false);

  // WhatsApp link with pre-filled message
  const whatsappLink = "https://wa.me/4915100000000?text=Hi%20Quelly,%20I'm%20interested%20in%20Qortex!";

  return (
    <a 
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative inline-flex items-center gap-4 transition-all duration-300 z-[60]",
        mode === "full" ? "glass-panel-ultimate pr-6 pl-2 py-2 rounded-full hover:bg-white/20" : "",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        "relative flex items-center justify-center transition-transform duration-500",
        size === "lg" ? "w-20 h-20" : "w-10 h-10",
        isHovered ? "scale-110" : "animate-float"
      )}>
        {/* Quelly PNG Icon - Clean transparent background, no artificial glows */}
        <div className={cn(
          "relative z-10 transition-all duration-200 w-full h-full",
          isHovered ? "animate-talk" : ""
        )}>
          <Image 
            src="/quelly-icon.png" 
            alt="Quelly AI Agent" 
            width={size === "lg" ? 80 : 40}
            height={size === "lg" ? 80 : 40}
            className="object-contain w-full h-full"
            priority
            onError={(e) => {
              // Fallback for development
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        {/* Status Indicator - Floating near icon */}
        <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-[#0a0c12] rounded-full z-20 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
      </div>

      {mode === "full" && (
        <div className="flex flex-col">
          <span className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors text-shadow-sm">
            {text}
          </span>
          <span className="text-xs text-amber-200 flex items-center gap-1.5 group-hover:text-white transition-colors font-medium">
            <Mic className="w-3 h-3" /> Voice Agent Ready
          </span>
        </div>
      )}
    </a>
  );
}
