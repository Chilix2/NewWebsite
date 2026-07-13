import React from "react";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
  align?: "center" | "left";
}

export function PageHero({ title, subtitle, badge, className, align = "center" }: PageHeroProps) {
  return (
    <section className={cn("relative py-20 lg:py-32 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-soft opacity-50 pointer-events-none" />
      <div className={cn("container px-4 md:px-6 mx-auto relative z-10", align === "center" ? "text-center" : "text-left")}>
        {badge && (
          <div className={cn("inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-6", align === "center" && "mx-auto")}>
            {badge}
          </div>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className={cn("text-xl text-slate-600 max-w-3xl leading-relaxed", align === "center" && "mx-auto")}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
