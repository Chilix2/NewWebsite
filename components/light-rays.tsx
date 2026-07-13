"use client";

import React from "react";

interface LightRaysProps {
  variant?: "landing" | "subpage";
  className?: string;
}

export function LightRays({ variant = "landing", className = "" }: LightRaysProps) {
  // Generate 32 rays as specified in the design
  const rays = Array.from({ length: 32 }, (_, index) => (
    <li key={index}></li>
  ));

  return (
    <ul className={`light-rays ${variant === "landing" ? "light-rays-landing" : "light-rays-subpage"} ${className}`}>
      {rays}
    </ul>
  );
}