"use client"

import { useEffect, useState, useRef } from "react"
import { CheckCircle2, Calendar, Users, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatItemProps {
  icon: React.ElementType
  value: number
  suffix?: string
  label: string
  isVisible: boolean
}

const StatItem = ({ icon: Icon, value, suffix = "", label, isVisible }: StatItemProps) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const duration = 2000 // 2 seconds animation
    const startValue = 0

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function: easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4)
      
      setCount(Math.floor(easeProgress * (value - startValue) + startValue))

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }, [isVisible, value])

  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-[var(--accent-purple)]/20 to-[var(--brand-primary)]/20 flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-6 w-6 text-[var(--brand-primary-light)]" />
      </div>
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-blue mb-2 tracking-tight">
        {count}
        {suffix}
      </div>
      <div className="text-sm sm:text-base text-[var(--text-dark-muted)] font-medium uppercase tracking-wider">
        {label}
      </div>
    </div>
  )
}

export default function QortexStats() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const stats = [
    {
      icon: CheckCircle2,
      value: 100,
      suffix: "%",
      label: "Abgeschlossene Projekte",
    },
    {
      icon: Calendar,
      value: 12,
      suffix: "+",
      label: "Jahre Erfahrung",
    },
    {
      icon: Users,
      value: 500,
      suffix: "+",
      label: "Globale Kunden",
    },
    {
      icon: Globe,
      value: 30,
      suffix: "",
      label: "Länder",
    },
  ]

  return (
    <section ref={sectionRef} className="py-12 sm:py-20 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="glass-card-neon-5 p-8 sm:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {stats.map((stat, index) => (
              <div key={index} className={cn("group", index > 1 ? "pt-8 sm:pt-0" : "")}>
                <StatItem
                  icon={stat.icon}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  isVisible={isVisible}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}












