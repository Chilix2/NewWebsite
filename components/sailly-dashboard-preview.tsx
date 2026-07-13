"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import { cn } from "@/lib/utils";
import { 
  Users, 
  Clock, 
  TrendingUp, 
  BarChart3,
  Smile,
  PhoneCall,
  ArrowUpRight
} from "lucide-react";

interface SaillyDashboardPreviewProps {
  className?: string;
  dict?: any;
  locale?: string;
}

export function SaillyDashboardPreview({ className, dict, locale = "de" }: SaillyDashboardPreviewProps) {
  const t = dict?.dashboard_preview || {
    title: "Live Overview",
    today: "Today,",
    systemActive: "System Active",
    calls: "Calls",
    timeSaved: "Time Saved",
    vsYesterday: "vs yesterday",
    callVolume: "Call Volume",
    callsUnit: "calls",
    lastActivity: "Recent Activity",
    liveAgent: "Live Agent",
    activities: ["Appointment confirmed for tomorrow", "Customer inquiry answered", "Knowledge base updated"]
  };

  const todayLabel = new Date().toLocaleDateString(locale === "en" ? "en-GB" : "de-DE", { weekday: undefined, day: "numeric", month: "short" });

  // Using simple CSS bars instead of recharts for lighter weight and pure CSS control
  const dailyStats = [45, 60, 75, 50, 80, 95, 85];
  
  return (
    <div className={cn("relative overflow-hidden sm:overflow-visible", className)}>
      {/* Main Dashboard Card */}
      <GlassCard 
        intensity="xl" 
        className="w-full p-4 sm:p-6 relative z-10 bg-white/80 border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-8 gap-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{t.title}</h3>
            <p className="text-sm text-gray-500">{t.today} {todayLabel}</p>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm">
            <span className="relative flex h-3 w-3 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="font-medium text-green-600">{t.systemActive}</span>
          </div>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-8">
          <div className="bg-pink-50/50 rounded-xl p-2 sm:p-4 border border-pink-100">
            <div className="flex items-center gap-2 text-pink-600 mb-2">
              <PhoneCall className="w-4 h-4" />
              <span className="text-[9px] sm:text-xs font-semibold uppercase">{t.calls}</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">1,248</div>
            <div className="text-[9px] sm:text-xs text-green-600 flex items-center gap-1 mt-1 whitespace-nowrap">
              <ArrowUpRight className="w-3 h-3" />
              +12% {t.vsYesterday}
            </div>
          </div>
          
          <div className="bg-purple-50/50 rounded-xl p-2 sm:p-4 border border-purple-100">
             <div className="flex items-center gap-2 text-purple-600 mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-[9px] sm:text-xs font-semibold uppercase">{t.timeSaved}</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">84h</div>
            <div className="text-[9px] sm:text-xs text-green-600 flex items-center gap-1 mt-1 whitespace-nowrap">
              <ArrowUpRight className="w-3 h-3" />
              +5h {t.vsYesterday}
            </div>
          </div>
        </div>

        {/* Activity Chart Visualization */}
        <div className="mb-4 sm:mb-8">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
             <h4 className="font-semibold text-gray-700 text-sm">{t.callVolume}</h4>
             <BarChart3 className="w-4 h-4 text-gray-400" />
          </div>
          <div className="h-32 flex items-end justify-between gap-2">
            <LazyMotion features={domAnimation}>
            {dailyStats.map((height, i) => (
              <div key={i} className="w-full bg-gray-100 rounded-t-lg relative group overflow-hidden h-full flex items-end">
                <m.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: `${height}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                  className="w-full bg-gradient-to-t from-pink-500 to-purple-500 opacity-80 group-hover:opacity-100 transition-opacity rounded-t-lg relative"
                >
                   {/* Tooltip on hover */}
                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                     {height} {t.callsUnit}
                   </div>
                </m.div>
              </div>
            ))}
            </LazyMotion>
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-medium">
             <span>08:00</span>
             <span>10:00</span>
             <span>12:00</span>
             <span>14:00</span>
             <span>16:00</span>
             <span>18:00</span>
             <span>20:00</span>
          </div>
        </div>

        {/* Recent Actions List */}
        <div>
           <h4 className="font-semibold text-gray-700 text-sm mb-4">{t.lastActivity}</h4>
           <div className="space-y-3">
             {[
               { icon: Smile, color: "text-green-500", bg: "bg-green-100", text: t.activities[0], time: "2 min" },
               { icon: PhoneCall, color: "text-blue-500", bg: "bg-blue-100", text: t.activities[1], time: "5 min" },
               { icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-100", text: t.activities[2], time: "12 min" }
             ].map((item, i) => (
               <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                 <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", item.bg, item.color)}>
                   <item.icon className="w-4 h-4" />
                 </div>
                 <div className="flex-1 min-w-0">
                   <div className="text-sm font-medium text-gray-900 truncate">{item.text}</div>
                 </div>
                 <div className="text-xs text-gray-400">{item.time}</div>
               </div>
             ))}
           </div>
        </div>

      </GlassCard>

      {/* Decorative Elements — hidden on mobile to prevent overflow */}
      <div className="hidden sm:block absolute sm:-top-10 sm:-right-10 w-40 h-40 bg-pink-300 rounded-full blur-[50px] opacity-30 z-0 animate-pulse" />
      <div className="hidden sm:block absolute sm:-bottom-10 sm:-left-10 w-40 h-40 bg-purple-300 rounded-full blur-[50px] opacity-30 z-0 animate-pulse" style={{ animationDelay: "1s" }} />
      
      {/* Floating Glass Badge — hidden on mobile */}
      <div className="hidden sm:block absolute sm:-right-8 sm:top-20 z-20 animate-[float_4s_ease-in-out_infinite]">
        <GlassCard intensity="md" className="px-4 py-2 flex items-center gap-2 bg-white/90">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           <span className="text-xs font-bold text-gray-700">{t.liveAgent}</span>
        </GlassCard>
      </div>
    </div>
  );
}
