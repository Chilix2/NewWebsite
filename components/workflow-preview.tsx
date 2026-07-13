"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { 
  Zap, 
  Bot, 
  Database, 
  LayoutGrid, 
  CheckCircle2,
  GitBranch,
  Shield,
  Send
} from "lucide-react";

export function WorkflowPreview() {
  return (
    <div className="relative w-full aspect-square max-w-[600px] mx-auto perspective-[2000px]">
      {/* Instrument Panel Container */}
      <div className="instrument-panel w-full h-full p-8 relative transform rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out shadow-2xl">
        
        {/* Header UI */}
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="text-xs font-mono text-slate-500">WORKFLOW_ID: QTX-8821</div>
        </div>

        {/* Workflow Visualization */}
        <div className="relative h-[80%] w-full flex flex-col justify-between">
          
          {/* Node 1: Trigger */}
          <div className="flex justify-center">
            <div className="bg-[#1e1e24] border border-green-500/30 p-4 rounded-xl flex items-center gap-3 shadow-[0_0_30px_rgba(34,197,94,0.1)] animate-pulse-slow">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="text-xs text-green-400 font-mono mb-1">TRIGGER</div>
                <div className="text-sm font-bold text-white">New Request</div>
              </div>
            </div>
          </div>

          <div className="h-12 w-[2px] bg-white/10 mx-auto my-2" />

          {/* Node 2: AI Processing */}
          <div className="flex justify-center gap-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -z-10" />
            
            <div className="bg-[#1e1e24] border border-amber-500/30 p-4 rounded-xl flex items-center gap-3 w-48 hover:scale-105 transition-transform">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-xs text-amber-400 font-mono mb-1">AI AGENT</div>
                <div className="text-sm font-bold text-white">Analyze</div>
              </div>
            </div>

            <div className="bg-[#1e1e24] border border-purple-500/30 p-4 rounded-xl flex items-center gap-3 w-48 hover:scale-105 transition-transform">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Database className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-xs text-purple-400 font-mono mb-1">VECTOR DB</div>
                <div className="text-sm font-bold text-white">Retrieve</div>
              </div>
            </div>
          </div>

          <div className="h-12 w-[2px] bg-white/10 mx-auto my-2" />

          {/* Node 3: Decision */}
          <div className="flex justify-center">
            <div className="bg-[#1e1e24] border border-orange-500/30 p-4 rounded-xl flex items-center gap-3 min-w-[200px] hover:scale-105 transition-transform">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <GitBranch className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <div className="text-xs text-orange-400 font-mono mb-1">LOGIC</div>
                <div className="text-sm font-bold text-white">Route & Execute</div>
              </div>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className="absolute bottom-0 right-0">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono uppercase tracking-widest animate-pulse">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                System Active
             </div>
          </div>

        </div>

        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none" />
      </div>
      
      {/* Background Glow */}
      <div className="absolute -inset-10 bg-amber-500/20 blur-[100px] -z-10 pointer-events-none" />
    </div>
  );
}






