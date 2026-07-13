"use client";

import React from "react";
import { motion } from "framer-motion";

export function SoundWaveSeparator() {
  return (
    <div className="w-full h-24 relative overflow-hidden">
      {/* Container for the waves */}
      <div className="absolute inset-0 flex items-end justify-center">
        {/* Multiple layers of waves for depth */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 w-full h-full opacity-30"
            style={{
              background: `linear-gradient(to top, rgba(255, 155, 138, ${0.2 + i * 0.1}), transparent)`,
              zIndex: i,
            }}
            animate={{
              scaleY: [1, 1.5, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            {/* SVG Wave Shape */}
            <svg
              viewBox="0 0 1440 100"
              className="absolute bottom-0 w-full h-full preserve-3d"
              preserveAspectRatio="none"
            >
              <path
                fill={`rgba(255, 155, 138, ${0.4 + i * 0.2})`}
                d="M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,100 L0,100 Z"
              >
                <animate
                  attributeName="d"
                  dur={`${10 + i * 2}s`}
                  repeatCount="indefinite"
                  values="
                    M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,100 L0,100 Z;
                    M0,50 C240,0 480,100 720,50 C960,0 1200,100 1440,50 L1440,100 L0,100 Z;
                    M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,100 L0,100 Z
                  "
                />
              </path>
            </svg>
          </motion.div>
        ))}
        
        {/* Glow Line on Top */}
        <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF9B8A] to-transparent opacity-50" />
      </div>
    </div>
  );
}
