"use client"

import { ArrowRight, LucideIcon, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassIcon } from "@/components/ui/glass-icon"
import { Button } from "@/components/ui/button"

interface ContentCardProps {
  category: string
  title: string
  description: string
  icon: LucideIcon
  color?: "blue" | "purple" | "orange" | "green" | "red" | "cyan"
  impact?: string
  impactLabel?: string
  features?: string[]
  className?: string
  ctaText?: string
  ctaLink?: string
}

export function ContentCard({
  category,
  title,
  description,
  icon,
  color = "blue",
  impact,
  impactLabel = "Impact",
  features,
  className,
  ctaText = "Mehr erfahren",
  ctaLink
}: ContentCardProps) {
  return (
    <div className={cn(
      "group relative flex flex-col justify-between p-8 rounded-2xl transition-all duration-300",
      "glass-panel-ultimate", // Updated to new enhanced glass style
      "hover:scale-[1.02]",
      className
    )}>
      <div>
        <div className="flex items-center justify-between mb-6">
          <GlassIcon icon={icon} color={color} size="md" />
          <span className={cn(
            "text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm border shadow-sm",
            color === "blue" && "bg-amber-100/20 text-amber-100 border-amber-200/30",
            color === "purple" && "bg-purple-100/20 text-purple-100 border-purple-200/30",
            color === "orange" && "bg-orange-100/20 text-orange-100 border-orange-200/30",
            color === "green" && "bg-emerald-100/20 text-emerald-100 border-emerald-200/30",
            color === "red" && "bg-red-100/20 text-red-100 border-red-200/30",
            color === "cyan" && "bg-cyan-100/20 text-cyan-100 border-cyan-200/30",
          )}>
            {category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors text-shadow-sm">
          {title}
        </h3>
        
        <p className="text-white/80 text-sm leading-relaxed mb-6 font-medium">
          {description}
        </p>

        {features && features.length > 0 && (
          <ul className="space-y-2 mb-6">
            {features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-start text-xs font-medium text-white/70">
                <Check className={cn(
                  "h-3.5 w-3.5 mr-2 shrink-0 mt-0.5",
                  color === "blue" && "text-amber-400",
                  color === "purple" && "text-purple-400",
                  color === "orange" && "text-orange-400",
                  color === "green" && "text-emerald-400",
                  color === "red" && "text-red-400",
                  color === "cyan" && "text-cyan-400",
                )} />
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
        {impact ? (
          <div>
            <div className="text-[10px] uppercase tracking-wider font-semibold text-white/50 mb-0.5">
              {impactLabel}
            </div>
            <div className={cn(
              "text-lg font-bold text-shadow-sm",
              color === "blue" && "text-amber-200",
              color === "purple" && "text-purple-200",
              color === "orange" && "text-orange-200",
              color === "green" && "text-emerald-200",
              color === "red" && "text-red-200",
              color === "cyan" && "text-cyan-200",
            )}>
              {impact}
            </div>
          </div>
        ) : (
          <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent text-white/80 hover:text-white font-medium group/btn">
            {ctaText}
            <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        )}
        
        {impact && (
          <div className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300",
            "bg-white/10 text-white/70 group-hover:text-white",
            color === "blue" && "group-hover:bg-amber-600",
            color === "purple" && "group-hover:bg-purple-600",
            color === "orange" && "group-hover:bg-orange-600",
            color === "green" && "group-hover:bg-emerald-600",
            color === "red" && "group-hover:bg-red-600",
            color === "cyan" && "group-hover:bg-cyan-600",
          )}>
            <ArrowRight className="h-4 w-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </div>
        )}
      </div>
    </div>
  )
}








