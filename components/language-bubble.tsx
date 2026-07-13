"use client";

import { motion } from "framer-motion";

interface LanguageBubbleProps {
  locale: string;
}

export function LanguageBubble({ locale }: LanguageBubbleProps) {
  const isGerman = locale === "de";
  
  return (
    <motion.div
      layoutId="language-bubble"
      className="absolute top-1.5 left-2 w-10 h-8 -z-10"
      initial={{ x: isGerman ? 0 : 44 }}
      animate={{ x: isGerman ? 0 : 44 }}
      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
    >
      <svg
        viewBox="0 0 40 32"
        className="w-full h-full drop-shadow-lg"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="blur-bubble" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feOffset dx="0" dy="1" result="offsetblur" />
            <feFlood floodColor="#0C8BE9" floodOpacity="0.2" />
            <feComposite in2="offsetblur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient
            id="bubbleGrad"
            cx="50%"
            cy="40%"
            r="50%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="0.3" stopColor="#fcfefe" stopOpacity="0.75" />
            <stop offset="0.46" stopColor="#f4fafc" stopOpacity="0.7" />
            <stop offset="0.58" stopColor="#e5f3f9" stopOpacity="0.65" />
            <stop offset="0.69" stopColor="#d0eaf4" stopOpacity="0.6" />
            <stop offset="0.79" stopColor="#b5ddee" stopOpacity="0.55" />
            <stop offset="0.88" stopColor="#94cee6" stopOpacity="0.5" />
            <stop offset="0.97" stopColor="#6dbcdd" stopOpacity="0.4" />
            <stop offset="1" stopColor="#5cb4d9" stopOpacity="0.35" />
          </radialGradient>
        </defs>
        <g filter="url(#blur-bubble)">
          <circle cx="20" cy="16" r="15" fill="url(#bubbleGrad)" />
          <ellipse
            cx="14"
            cy="10"
            rx="5"
            ry="3"
            transform="rotate(-45 14 10)"
            fill="#fff"
            opacity="0.5"
          />
        </g>
      </svg>
    </motion.div>
  );
}
