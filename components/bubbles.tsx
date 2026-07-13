"use client";

import React, { useEffect, useState } from "react";

// Bubbles Component - Rising from footer to Quelly icon
export const Bubbles = ({ className }: { className?: string }) => {
  const [bubbles, setBubbles] = useState<Array<{
    id: number;
    left: number;
    size: number;
    delay: number;
    duration: number;
    blur: number;
  }>>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    // Generate bubbles that rise from actual footer to Quelly icon
    const newBubbles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 90 + 5, // 5-95%
      size: Math.random() * 80 + 30, // 30-110px
      delay: Math.random() * 30, // 0-30s delay (longer stagger)
      duration: Math.random() * 15 + 20, // 20-35s duration (slower for full journey)
      blur: Math.random() * 2, // 0-2px variable blur
    }));
    setBubbles(newBubbles);
  }, [isMounted]);

  return (
    <div className={`absolute inset-0 w-full pointer-events-none z-0 ${className || ''}`} style={{ height: '100%' }}>
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="soap-bubble absolute rounded-full"
          style={{
            left: `${bubble.left}%`,
            top: 'calc(100% - 100px)', // Start from near the bottom of the full document
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            filter: `blur(${bubble.blur}px)`,
            animation: `bubble-rise-document ${bubble.duration}s infinite linear`,
            animationDelay: `-${bubble.delay}s`,
            background: `radial-gradient(130% 130% at 30% 30%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.01) 80%, rgba(255,255,255,0.05) 100%)`,
            boxShadow: `inset 0 0 20px rgba(255,255,255,0.2), 0 0 10px rgba(255,255,255,0.1)`,
            border: `1px solid rgba(255,255,255,0.3)`
          }}
        />
      ))}
    </div>
  );
};


