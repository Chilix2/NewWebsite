"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { assignGuestAvatars } from "@/lib/guest-avatars";
import { getIndustryTheme, type IndustryTheme } from "@/lib/industry-themes";

type ScenarioWidget =
  | { type: "booking"; title: string; detail: string }
  | { type: "slots"; date: string; times: string[]; selected: string; confirmed: string }
  | { type: "status"; label: string; detail: string }
  | { type: "info"; title: string; detail: string };

export interface IndustryScenario {
  id: string;
  title: string;
  desc: string;
  guestName: string;
  guestAvatar?: string;
  guest: string;
  agentGreeting?: string;
  agent: string;
  widget: ScenarioWidget;
}

function AgentMark() {
  return (
    <svg viewBox="9 23 76 54" fill="none" className="w-5 h-5 shrink-0" aria-hidden="true">
      <path
        d="M80 56 C71 33 59 33 50 56 C41 73 33 73 24 56"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="18" cy="44" r="5.5" fill="white" />
    </svg>
  );
}

function GuestAvatar({ name, src }: { name: string; src?: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (src) {
    return (
      <Image
        src={src}
        alt=""
        width={28}
        height={28}
        className="w-7 h-7 rounded-full object-cover ring-1 ring-white/25 shrink-0"
      />
    );
  }

  return (
    <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
      {initials}
    </span>
  );
}

function WidgetContent({ widget }: { widget: ScenarioWidget }) {
  if (widget.type === "slots") {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between text-white/80 text-sm font-medium px-1">
          <ChevronLeft className="w-4 h-4 opacity-50" />
          <span>{widget.date}</span>
          <ChevronRight className="w-4 h-4 opacity-50" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {widget.times.map((time) => (
            <span
              key={time}
              className={cn(
                "shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold",
                time === widget.selected ? "bg-emerald-500 text-white" : "bg-white/10 text-white/80"
              )}
            >
              {time}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl w-full">
          <span className="text-sm font-semibold text-slate-900">{widget.confirmed}</span>
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500">
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl w-full">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 shrink-0">
        <Check className="w-4 h-4 text-white" strokeWidth={3} />
      </span>
      <span>
        <span className="block text-sm font-semibold text-slate-900">
          {widget.type === "booking" || widget.type === "info" ? widget.title : widget.label}
        </span>
        <span className="block text-xs text-slate-500 mt-0.5">{widget.detail}</span>
      </span>
    </div>
  );
}

function ScenarioChat({
  scenario,
  theme,
  agentLabel,
  play,
}: {
  scenario: IndustryScenario;
  theme: IndustryTheme;
  agentLabel: string;
  play: boolean;
}) {
  const [step, setStep] = useState(0);
  const greetingStep = scenario.agentGreeting ? 1 : 0;
  const guestStep = greetingStep + 1;
  const agentStep = guestStep + 1;
  const widgetStep = agentStep + 1;

  useEffect(() => {
    if (!play) {
      setStep(0);
      return;
    }
    setStep(0);
    const maxStep = scenario.agentGreeting ? 4 : 3;
    const delays = scenario.agentGreeting
      ? [400, 1600, 2000, 2600, 4200]
      : [400, 1800, 2600, 4200];

    let current = 0;
    let timer: ReturnType<typeof setTimeout>;
    const showNext = () => {
      current += 1;
      if (current > maxStep) return;
      setStep(current);
      timer = setTimeout(showNext, delays[current] ?? 3500);
    };
    timer = setTimeout(showNext, delays[0]);
    return () => clearTimeout(timer);
  }, [play, scenario.id, scenario.agentGreeting]);

  return (
    <AnimatePresence mode="wait">
      <m.div
        key={`${scenario.id}-${play}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-3 w-full relative z-10"
      >
        {scenario.agentGreeting && (
          <m.div
            initial={false}
            animate={
              step >= greetingStep
                ? { opacity: step >= guestStep ? 0.5 : 1, y: 0 }
                : { opacity: 0, y: 10 }
            }
            transition={{ duration: 0.4 }}
            className={cn(
              "self-end w-full max-w-[94%] ml-3 rounded-[18px] backdrop-blur-2xl border border-white/12 px-4 py-3 shadow-lg",
              theme.agentCard
            )}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <AgentMark />
              <span className="text-[12px] text-white/75 font-medium">{agentLabel}</span>
            </div>
            <p className="text-[14px] text-white font-medium leading-snug">{scenario.agentGreeting}</p>
          </m.div>
        )}

        <m.div
          initial={false}
          animate={step >= guestStep ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4 }}
          className={cn(
            "self-start w-full max-w-[94%] mr-3 rounded-[18px] backdrop-blur-2xl border border-white/12 px-4 py-3 shadow-lg",
            theme.guestCard
          )}
        >
          <div className="flex items-center gap-2.5 mb-2">
            <GuestAvatar name={scenario.guestName} src={scenario.guestAvatar} />
            <span className="text-[12px] text-white/75 font-medium">{scenario.guestName}</span>
          </div>
          <p className="text-[14px] text-white leading-snug">{scenario.guest}</p>
        </m.div>

        <m.div
          initial={false}
          animate={step >= agentStep ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4 }}
          className={cn(
            "self-end w-full max-w-[94%] ml-3 rounded-[18px] backdrop-blur-2xl border border-white/12 px-4 py-3 shadow-lg",
            theme.agentCard
          )}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <AgentMark />
            <span className="text-[12px] text-white/75 font-medium">{agentLabel}</span>
          </div>
          <p className="text-[14px] text-white font-medium leading-snug">{scenario.agent}</p>
        </m.div>

        <m.div
          initial={false}
          animate={step >= widgetStep ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4 }}
          className={cn(
            "self-end w-full max-w-[94%] ml-3 rounded-[18px] backdrop-blur-2xl border border-white/12 px-3 py-3 shadow-lg",
            theme.widgetCard
          )}
        >
          <WidgetContent widget={scenario.widget} />
        </m.div>
      </m.div>
    </AnimatePresence>
  );
}

function ScenarioCard({
  scenario,
  theme,
  agentLabel,
  isActive,
}: {
  scenario: IndustryScenario;
  theme: IndustryTheme;
  agentLabel: string;
  isActive: boolean;
}) {
  return (
    <article
      className={cn(
        "snap-center shrink-0 w-[min(88vw,360px)] sm:w-[340px] lg:w-[380px] transition-opacity duration-300",
        isActive ? "opacity-100" : "opacity-80 lg:opacity-70"
      )}
    >
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{scenario.title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-5 min-h-[3.5rem]">{scenario.desc}</p>

      <div
        className={cn(
          "relative overflow-hidden rounded-[28px] p-5 sm:p-6 min-h-[420px] bg-gradient-to-br shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]",
          theme.container
        )}
      >
        <div className={cn("absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl", theme.blobA)} />
        <div className={cn("absolute -bottom-12 -left-8 w-48 h-48 rounded-full blur-3xl", theme.blobB)} />
        <ScenarioChat
          scenario={scenario}
          theme={theme}
          agentLabel={agentLabel}
          play={isActive}
        />
      </div>
    </article>
  );
}

interface IndustryScenariosSectionProps {
  scenarios: {
    title: string;
    subtitle: string;
    agent_label?: string;
    items: IndustryScenario[];
  };
  industryKey: string;
}

/**
 * Sierra "agents in real-world scenarios" pattern: headline + horizontal cards
 * with industry-colored containers and animated voice-agent chat dialogs.
 * Horizontal auto-advance only — never scrolls the page vertically.
 */
export function IndustryScenariosSection({ scenarios, industryKey }: IndustryScenariosSectionProps) {
  const theme = getIndustryTheme(industryKey);
  const agentLabel = scenarios.agent_label ?? "Sailly";
  const items = useMemo(
    () => assignGuestAvatars(scenarios.items?.slice(0, 5) ?? []),
    [scenarios.items]
  );
  const [activeIdx, setActiveIdx] = useState(0);
  const [sectionInView, setSectionInView] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);
  const syncingRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setSectionInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => setSectionInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const pauseAutoAdvance = (resumeAfterMs = 5000) => {
    pausedRef.current = true;
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    if (resumeAfterMs > 0) {
      resumeTimerRef.current = window.setTimeout(() => {
        pausedRef.current = false;
      }, resumeAfterMs);
    }
  };

  // Horizontal-only: keep the active card centered in the carousel (no page jump)
  useEffect(() => {
    if (!sectionInView || !items.length) return;
    const container = scrollRef.current;
    const el = container?.children[activeIdx] as HTMLElement | undefined;
    if (!container || !el) return;
    const left = el.offsetLeft - (container.clientWidth - el.clientWidth) / 2;
    syncingRef.current = true;
    container.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
    const t = window.setTimeout(() => {
      syncingRef.current = false;
    }, 600);
    return () => window.clearTimeout(t);
  }, [activeIdx, sectionInView, items.length]);

  // Auto-advance cards every 9s while section is visible
  useEffect(() => {
    if (!sectionInView || items.length <= 1) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = setInterval(() => {
      if (pausedRef.current) return;
      setActiveIdx((i) => (i + 1) % items.length);
    }, 9000);

    return () => clearInterval(timer);
  }, [sectionInView, items.length]);

  // Manual scroll → pick nearest card as active; pause auto-advance briefly
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      if (syncingRef.current) return;
      pauseAutoAdvance(5000);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const center = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        Array.from(el.children).forEach((child, i) => {
          const node = child as HTMLElement;
          const mid = node.offsetLeft + node.clientWidth / 2;
          const dist = Math.abs(mid - center);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        });
        setActiveIdx((prev) => (prev === best ? prev : best));
      });
    };

    const stop = () => pauseAutoAdvance(5000);
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("touchstart", stop, { passive: true });
    el.addEventListener("wheel", stop, { passive: true });
    el.addEventListener("pointerdown", stop);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("touchstart", stop);
      el.removeEventListener("wheel", stop);
      el.removeEventListener("pointerdown", stop);
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };
  }, []);

  if (!items.length) return null;

  return (
    <LazyMotion features={domAnimation}>
      <section ref={sectionRef} className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mb-10 lg:mb-14"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
              {scenarios.title}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-500 leading-relaxed">
              {scenarios.subtitle}
            </p>
          </m.div>

          <div
            ref={scrollRef}
            className="flex gap-6 lg:gap-8 overflow-x-auto overscroll-x-contain pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((scenario, i) => (
              <ScenarioCard
                key={scenario.id}
                scenario={scenario}
                theme={theme}
                agentLabel={agentLabel}
                isActive={i === activeIdx}
              />
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
