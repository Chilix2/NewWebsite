"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NewsItem {
  category: string
  title: string
  summary: string
  impact: string
  icon: LucideIcon | React.FC<any>
}

interface NewsScrollShowcaseProps {
  items: NewsItem[]
}

export default function NewsScrollShowcase({ items }: NewsScrollShowcaseProps) {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  // Transform scroll progress to horizontal translation
  // Moves from 0% to -100% + screen width (so the last card is visible)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"])

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-background">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Left Side - Static Content */}
        <div className="w-[40%] flex-shrink-0 px-12 md:px-20 z-10 bg-background/95 backdrop-blur-sm h-full flex flex-col justify-center border-r border-white/10">
          <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-4">
            Success Stories
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Few successes
            <br />
            <span className="text-muted-foreground">among many</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mb-8">
            See how leading companies are transforming their workflows and achieving unprecedented growth with QORTEX.
          </p>
          <div className="flex items-center gap-2 text-primary font-medium cursor-pointer hover:gap-4 transition-all group">
            <span>View all cases</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>

        {/* Right Side - Horizontal Scroll */}
        <div className="w-[60%] h-full flex items-center overflow-hidden bg-background/50">
          <motion.div style={{ x }} className="flex gap-8 px-12">
            {items.map((item, index) => (
              <div
                key={index}
                className="relative h-[450px] w-[350px] flex-shrink-0 overflow-hidden rounded-2xl bg-secondary/30 border border-white/10 p-8 flex flex-col justify-between group hover:border-primary/50 transition-colors duration-300"
              >
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background/80 text-primary shadow-sm border border-white/5">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-background/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                      {item.category}
                    </span>
                  </div>
                  
                  <h3 className="mb-4 text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Impact
                    </span>
                    <span className="text-lg font-bold text-emerald-500">
                      {item.impact}
                    </span>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <ArrowRight className="h-4 w-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            ))}
            {/* Spacer at the end to ensure last card isn't cut off too abruptly */}
            <div className="w-20 flex-shrink-0" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}












