"use client";

import React from "react";

export function FluidBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#faf9f8]">
      {/* Coral Blob — GPU-accelerated CSS animation */}
      <div
        className="absolute top-[-10%] right-[-10%] w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-[#FF9B8A]/30 rounded-full blur-[60px] sm:blur-[120px] will-change-transform animate-[blob-drift-1_20s_ease-in-out_infinite]"
        style={{ transform: "translate3d(0, 0, 0)" }}
      />

      {/* Yellow Blob */}
      <div
        className="absolute top-[40%] left-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#FCD34D]/20 rounded-full blur-[50px] sm:blur-[100px] will-change-transform animate-[blob-drift-2_25s_ease-in-out_infinite_2s]"
        style={{ transform: "translate3d(0, 0, 0)" }}
      />

      {/* Mint Blob */}
      <div
        className="absolute bottom-[-10%] right-[20%] w-[350px] sm:w-[700px] h-[350px] sm:h-[700px] bg-[#A8E6CF]/20 rounded-full blur-[55px] sm:blur-[110px] will-change-transform animate-[blob-drift-3_22s_ease-in-out_infinite_5s]"
        style={{ transform: "translate3d(0, 0, 0)" }}
      />

      {/* Pink Accent Blob */}
      <div
        className="absolute top-[20%] left-[30%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-pink-200/30 rounded-full blur-[45px] sm:blur-[90px] will-change-transform animate-[blob-drift-4_18s_ease-in-out_infinite_1s]"
        style={{ transform: "translate3d(0, 0, 0)" }}
      />
    </div>
  );
}
