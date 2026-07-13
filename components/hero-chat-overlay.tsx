"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

const GUEST_BUBBLE =
  "self-start w-full max-w-[94%] mr-4 rounded-[20px] bg-black/40 backdrop-blur-2xl border border-white/10 px-4 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.32)]";
const AGENT_BUBBLE =
  "self-end w-full max-w-[94%] ml-4 rounded-[20px] bg-[#6b5348]/55 backdrop-blur-2xl border border-white/10 px-4 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.28)]";
const WIDGET_BUBBLE =
  "self-end w-full max-w-[94%] ml-4 rounded-[20px] bg-[#6b5348]/50 backdrop-blur-2xl border border-white/10 px-4 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.28)]";

function AgentRow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <svg
        viewBox="9 23 76 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 shrink-0"
        aria-hidden="true"
      >
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
      <span className="text-[13px] text-white/75 font-medium tracking-tight">{label}</span>
    </div>
  );
}

type ScenarioWidget =
  | { type: "booking"; title: string; detail: string }
  | { type: "slots"; date: string; times: string[]; selected: string; confirmed: string }
  | { type: "status"; icon: "wifi"; label: string; detail: string };

interface ChatScenario {
  id: string;
  guestName: string;
  guestAvatar: string;
  guest: string;
  agentGreeting?: string;
  agent: string;
  widget: ScenarioWidget;
}

interface HeroChatOverlayProps {
  dict: any;
  active?: boolean;
  onCycleComplete?: () => void;
}

const DEFAULT_SCENARIOS: ChatScenario[] = [
  {
    id: "hotel",
    guestName: "Thomas",
    guestAvatar: "/images/avatars/guest-hotel.jpg",
    guest: "Guten Abend! Haben Sie am Freitag noch ein Zimmer für zwei Nächte frei?",
    agentGreeting: "Guten Abend! Wie kann ich Ihnen helfen?",
    agent: "Gerne! Ein Doppelzimmer mit Gartenblick ist frei. Soll ich es für Sie reservieren?",
    widget: {
      type: "booking",
      title: "Buchung bestätigt",
      detail: "Doppelzimmer · Fr–So · 2 Gäste",
    },
  },
  {
    id: "restaurant",
    guestName: "Anna",
    guestAvatar: "/images/avatars/guest-restaurant.jpg",
    guest: "Haben Sie am Samstag um 19 Uhr noch einen Tisch für vier?",
    agent: "Ja, wir haben noch Plätze frei. Soll ich den Tisch für Sie reservieren?",
    widget: {
      type: "slots",
      date: "Sa, 12. Jul",
      times: ["18:30", "19:00", "19:30", "20:00"],
      selected: "19:00",
      confirmed: "Tisch reserviert",
    },
  },
  {
    id: "praxis",
    guestName: "Sabine",
    guestAvatar: "/images/avatars/guest-praxis.jpg",
    guest: "Können wir morgen früh zum Arzt kommen?",
    agent: "Ja, morgen früh sind noch Termine frei. Welche Uhrzeit passt Ihnen?",
    widget: {
      type: "slots",
      date: "Fr, 11. Jul",
      times: ["08:00", "08:30", "09:00", "09:30"],
      selected: "08:30",
      confirmed: "Termin eingetragen",
    },
  },
];

function buildScenarios(chat: Record<string, unknown>): ChatScenario[] {
  const scenarios = chat.scenarios as ChatScenario[] | undefined;
  if (scenarios?.length) return scenarios;

  const base = DEFAULT_SCENARIOS[0];
  const fallbackDetail =
    base.widget.type === "booking" ? base.widget.detail : "Doppelzimmer · Fr–So · 2 Gäste";
  return [
    {
      ...base,
      guest: (chat.guest as string) ?? base.guest,
      agent: (chat.agent as string) ?? base.agent,
      widget: {
        type: "booking",
        title: (chat.widget_title as string) ?? "Buchung bestätigt",
        detail: (chat.widget_detail as string) ?? fallbackDetail,
      },
    },
    DEFAULT_SCENARIOS[1],
    DEFAULT_SCENARIOS[2],
  ];
}

function GuestRow({ name, avatar }: { name: string; avatar: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-2">
      <Image
        src={avatar}
        alt=""
        width={28}
        height={28}
        className="w-7 h-7 rounded-full object-cover ring-1 ring-white/20"
      />
      <span className="text-[13px] text-white/75 font-medium tracking-tight">{name}</span>
    </div>
  );
}

function WidgetContent({ widget }: { widget: ScenarioWidget }) {
  if (widget.type === "booking") {
    return (
      <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl w-full">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 shrink-0">
          <Check className="w-4 h-4 text-white" strokeWidth={3} />
        </span>
        <span>
          <span className="block text-sm font-semibold text-slate-900">{widget.title}</span>
          <span className="block text-xs text-slate-500 mt-0.5">{widget.detail}</span>
        </span>
      </div>
    );
  }

  if (widget.type === "status") {
    return (
      <div className="flex items-center gap-3 px-1 py-1">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 shrink-0">
          <Wifi className="w-4 h-4 text-white/90" />
        </span>
        <span>
          <span className="block text-sm font-medium text-white">{widget.label}</span>
          <span className="block text-xs text-white/60 mt-0.5">{widget.detail}</span>
        </span>
      </div>
    );
  }

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
              time === widget.selected
                ? "bg-emerald-500 text-white"
                : "bg-white/10 text-white/80"
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

/**
 * Sierra-style hero chat: stacked frosted-glass cards with round guest avatars,
 * white Sailly agent mark, and cycling conversation scenarios.
 */
export function HeroChatOverlay({
  dict,
  active = true,
  onCycleComplete,
}: HeroChatOverlayProps) {
  const chat = dict.hero?.chat ?? dict.chat ?? {};
  const agentLabel = chat.agent_label ?? "Sailly";
  const scenarios = buildScenarios(chat);

  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [step, setStep] = useState(0);
  const onCycleCompleteRef = useRef(onCycleComplete);
  onCycleCompleteRef.current = onCycleComplete;

  const scenario = scenarios[scenarioIdx];

  useEffect(() => {
    if (!active) {
      setStep(0);
      setScenarioIdx(0);
      return;
    }

    setStep(0);
    const maxStep = scenario.agentGreeting ? 4 : 3;
    const delays = scenario.agentGreeting
      ? [500, 1800, 2200, 2800, 4500]
      : [500, 2000, 2800, 4500];

    let currentStep = 0;
    let timer: ReturnType<typeof setTimeout>;

    const showNext = () => {
      currentStep += 1;
      if (currentStep > maxStep) {
        setScenarioIdx((s) => {
          const next = (s + 1) % scenarios.length;
          if (next === 0 && s === scenarios.length - 1) {
            setTimeout(() => onCycleCompleteRef.current?.(), 800);
          }
          return next;
        });
        return;
      }
      setStep(currentStep);
      timer = setTimeout(showNext, delays[currentStep] ?? 4000);
    };

    timer = setTimeout(showNext, delays[0]);
    return () => clearTimeout(timer);
  }, [scenarioIdx, scenarios.length, scenario.agentGreeting, active]);

  const greetingStep = scenario.agentGreeting ? 1 : 0;
  const guestStep = greetingStep + 1;
  const agentStep = guestStep + 1;
  const widgetStep = agentStep + 1;

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative w-full max-w-[400px] pointer-events-none">
        <AnimatePresence mode="wait">
          <m.div
            key={scenario.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col gap-3 w-full"
          >
            {scenario.agentGreeting && (
              <m.div
                initial={false}
                animate={
                  step >= greetingStep
                    ? { opacity: step >= guestStep ? 0.45 : 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 12, scale: 0.98 }
                }
                transition={{ duration: 0.45, ease: "easeOut" }}
                className={AGENT_BUBBLE}
              >
                <AgentRow label={agentLabel} />
                <p className="text-[15px] text-white font-medium leading-snug">
                  {scenario.agentGreeting}
                </p>
              </m.div>
            )}

            {/* Guest message — dark glass */}
            <m.div
              initial={false}
              animate={
                step >= guestStep
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 14, scale: 0.98 }
              }
              transition={{ duration: 0.45, ease: "easeOut" }}
              className={GUEST_BUBBLE}
            >
              <GuestRow name={scenario.guestName} avatar={scenario.guestAvatar} />
              <p className="text-[15px] text-white leading-snug">{scenario.guest}</p>
            </m.div>

            {/* Agent reply — warm glass */}
            <m.div
              initial={false}
              animate={
                step >= agentStep
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 14, scale: 0.98 }
              }
              transition={{ duration: 0.45, ease: "easeOut" }}
              className={AGENT_BUBBLE}
            >
              <AgentRow label={agentLabel} />
              <p className="text-[15px] text-white font-medium leading-snug">{scenario.agent}</p>
            </m.div>

            <m.div
              initial={false}
              animate={
                step >= widgetStep
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 14, scale: 0.98 }
              }
              transition={{ duration: 0.45, ease: "easeOut" }}
              className={WIDGET_BUBBLE}
            >
              <WidgetContent widget={scenario.widget} />
            </m.div>
          </m.div>
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}
