"use client"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface GlassIconProps {
  icon: LucideIcon
  className?: string
  color?: "blue" | "purple" | "orange" | "green" | "red" | "cyan"
  size?: "sm" | "md" | "lg" | "xl"
}

export function GlassIcon({ icon: Icon, className, color = "blue", size = "md" }: GlassIconProps) {
  const gradients = {
    blue: "from-amber-400 to-amber-600",
    purple: "from-purple-400 to-indigo-600",
    orange: "from-orange-400 to-red-600",
    green: "from-emerald-400 to-teal-600",
    red: "from-red-400 to-rose-600",
    cyan: "from-amber-300 to-amber-500",
  }

  const shadows = {
    blue: "shadow-amber-500/30",
    purple: "shadow-purple-500/30",
    orange: "shadow-orange-500/30",
    green: "shadow-emerald-500/30",
    red: "shadow-red-500/30",
    cyan: "shadow-cyan-500/30",
  }

  const sizes = {
    sm: "w-8 h-8 p-1.5",
    md: "w-12 h-12 p-2.5",
    lg: "w-16 h-16 p-3.5",
    xl: "w-20 h-20 p-4.5",
  }

  const iconSizes = {
    sm: "w-full h-full",
    md: "w-full h-full",
    lg: "w-full h-full",
    xl: "w-full h-full",
  }

  return (
    <div
      className={cn(
        "relative rounded-2xl flex items-center justify-center transition-transform hover:scale-105 duration-300",
        "bg-gradient-to-br border border-white/20",
        "shadow-lg backdrop-blur-sm",
        gradients[color],
        shadows[color],
        sizes[size],
        className
      )}
    >
      {/* Top highlight for glass effect */}
      <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl" />
      
      {/* Bottom reflection */}
      <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-black/10 to-transparent rounded-b-2xl" />

      {/* The Icon */}
      <Icon className={cn("text-white relative z-10 drop-shadow-md", iconSizes[size])} strokeWidth={2} />
    </div>
  )
}












