"use client";

import React, { useState, useEffect } from "react";
import { SaillyOrb, OrbState, useAudioAnalyzer } from "@/components/sailly-orb";

export default function TestOrbPage() {
  const [manualState, setManualState] = useState<OrbState>("idle");
  const [manualLevel, setManualLevel] = useState(0);
  const [useMicrophone, setUseMicrophone] = useState(false);
  const [simulating, setSimulating] = useState(false);

  const { startListening, stopListening, isListening, audioLevel: micLevel } = useAudioAnalyzer();

  // Handle Microphone Toggle
  useEffect(() => {
    if (useMicrophone) {
      startListening();
      setManualState("listening");
    } else {
      stopListening();
      setManualState("idle");
    }
  }, [useMicrophone]);

  // Handle Simulation
  useEffect(() => {
    if (!simulating) return;

    const interval = setInterval(() => {
        // Randomly fluctuate level to simulate speech
        const noise = Math.random() * 0.5 + 0.2;
        setManualLevel(noise);
    }, 100);

    return () => clearInterval(interval);
  }, [simulating]);

  const currentLevel = useMicrophone ? micLevel : manualLevel;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 gap-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">Sailly Presence Orb</h1>
        <p className="text-slate-400">Procedural, Audio-Reactive 3D Voice Agent</p>
      </div>

      {/* The Orb Container */}
      <div className="relative flex items-center justify-center">
        {/* Background glow for context */}
        <div className="absolute inset-0 bg-[#FF9B8A] opacity-5 blur-3xl rounded-full scale-150"></div>
        
        <SaillyOrb 
          state={manualState} 
          audioLevel={currentLevel} 
          className="w-[500px] h-[500px]" 
        />
      </div>

      {/* Controls */}
      <div className="w-full max-w-md p-6 bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-800 space-y-6">
        
        {/* State Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">State</label>
          <div className="flex gap-2">
            {(["idle", "listening", "speaking"] as OrbState[]).map((s) => (
              <button
                key={s}
                onClick={() => {
                    setManualState(s);
                    setUseMicrophone(false);
                    setSimulating(s === "speaking"); // Auto-sim for speaking
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  manualState === s
                    ? "bg-[#FF9B8A] text-slate-900"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Audio Level Simulation Slider */}
        <div className="space-y-2">
            <div className="flex justify-between">
                <label className="text-sm font-medium text-slate-300">Audio Level (Simulation)</label>
                <span className="text-xs text-slate-500 font-mono">{currentLevel.toFixed(2)}</span>
            </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={manualLevel}
            disabled={useMicrophone || simulating}
            onChange={(e) => setManualLevel(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#FF9B8A]"
          />
        </div>

        {/* Microphone Toggle */}
        <div className="pt-4 border-t border-slate-800">
            <button
                onClick={() => {
                    setUseMicrophone(!useMicrophone);
                    setSimulating(false);
                }}
                className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                    useMicrophone 
                    ? "bg-red-500/10 text-red-400 border border-red-500/50" 
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
            >
                {useMicrophone ? (
                    <>
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        Stop Microphone
                    </>
                ) : (
                    "Test with Microphone"
                )}
            </button>
        </div>

        <div className="text-xs text-slate-500 text-center">
            Microphone data is processed locally in browser.
        </div>
      </div>
    </div>
  );
}