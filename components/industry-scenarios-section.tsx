"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface IndustryTheme {
  container: string;
  blobA: string;
  blobB: string;
  agentCard: string;
  guestCard: string;
  widgetCard: string;
  accent: string;
}

const THEMES: Record<string, IndustryTheme> = {
  hotels: {
    container: "from-[#e8dcc8] via-[#d9c9a8] to-[#c4ad82]",
    blobA: "bg-[#b8956a]/25",
    blobB: "bg-[#8b6914]/15",
    agentCard: "bg-[#5c4a3a]/60",
    guestCard: "bg-black/40",
    widgetCard: "bg-[#5c4a3a]/50",
    accent: "#8b6914",
  },
  restaurants: {
    container: "from-[#fde8df] via-[#f5c4b0] to-[#e8957a]",
    blobA: "bg-[#e07a5f]/20",
    blobB: "bg-[#c45c3e]/15",
    agentCard: "bg-[#6b3d32]/55",
    guestCard: "bg-black/38",
    widgetCard: "bg-[#6b3d32]/48",
    accent: "#c45c3e",
  },
  medical: {
    container: "from-[#dcefe8] via-[#b8ddd0] to-[#8ec4b0]",
    blobA: "bg-[#4a9b8e]/20",
    blobB: "bg-[#2d6f63]/12",
    agentCard: "bg-[#2d5a52]/58",
    guestCard: "bg-black/36",
    widgetCard: "bg-[#2d5a52]/48",
    accent: "#2d6f63",
  },
  legal: {
    container: "from-[#dde3f0] via-[#b8c4dc] to-[#8a9bc4]",
    blobA: "bg-[#4c5c8a]/18",
    blobB: "bg-[#2e3a5c]/12",
    agentCard: "bg-[#2e3a5c]/58",
    guestCard: "bg-black/38",
    widgetCard: "bg-[#2e3a5c]/48",
    accent: "#2e3a5c",
  },
  services: {
    container: "from-[#e2e8ef] via-[#c5d0dc] to-[#9aafc4]",
    blobA: "bg-[#5b6b7a]/18",
    blobB: "bg-[#3d4f5f]/12",
    agentCard: "bg-[#3d4f5f]/58",
    guestCard: "bg-black/38",
    widgetCard: "bg-[#3d4f5f]/48",
    accent: "#3d4f5f",
  },
};

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

function VoiceWaveform({ active }: { active: boolean }) {
  const heights = [40, 70, 55, 90, 60, 75, 45];
  return (
    <div className="flex items-end gap-[3px] h-4 ml-auto">
      {heights.map((h, i) => (
        <span
          key={i}
          className={cn(
            "w-[3px] rounded-full bg-white/75 transition-all duration-300",
            active && "animate-[wave_0.9s_ease-in-out_infinite]"
          )}
          style={{
            height: `${h}%`,
            animationDelay: active ? `${i * 80}ms` : undefined,
          }}
        />
      ))}
    </div>
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
            <VoiceWaveform active={step === guestStep} />
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
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.45 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const shouldPlay = isActive || inView;

  return (
    <article
      ref={ref}
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
          play={shouldPlay}
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
 */
export function IndustryScenariosSection({ scenarios, industryKey }: IndustryScenariosSectionProps) {
  const theme = THEMES[industryKey] ?? THEMES.services;
  const agentLabel = scenarios.agent_label ?? "Sailly";
  const items = scenarios.items?.slice(0, 5) ?? [];
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIdx((i) => {
        const next = (i + 1) % items.length;
        const el = scrollRef.current?.children[next] as HTMLElement | undefined;
        el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        return next;
      });
    }, 9000);
    return () => clearInterval(timer);
  }, [items.length]);

  if (!items.length) return null;

  return (
    <LazyMotion features={domAnimation}>
      <section className="py-16 lg:py-24 bg-white overflow-hidden">
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
            className="flex gap-6 lg:gap-8 overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
