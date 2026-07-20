"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";
import { assignGuestAvatars } from "@/lib/guest-avatars";

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

export type ScenarioWidget =
  | { type: "booking"; title: string; detail: string }
  | { type: "slots"; date: string; times: string[]; selected: string; confirmed: string }
  | { type: "status"; icon?: "wifi" | "maps"; label: string; detail: string };

export interface ChatScenario {
  id: string;
  guestName: string;
  guestAvatar?: string;
  guest: string;
  agentGreeting?: string;
  agent: string;
  guestFollowUp?: string;
  agentFollowUp?: string;
  widget: ScenarioWidget;
}

interface HeroChatOverlayProps {
  dict: any;
  scenario?: ChatScenario | null;
  videoDurationSec?: number;
  finishEarlySec?: number;
  active?: boolean;
}

/** Simplified Google Maps pin mark for live location status widgets. */
function GoogleMapsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#34A853"
        d="M24 4c-7.7 0-14 6.3-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.7-6.3-14-14-14z"
      />
      <path
        fill="#FBBC04"
        d="M24 4c-2.4 0-4.6.6-6.6 1.7L24 18l6.6-12.3C28.6 4.6 26.4 4 24 4z"
      />
      <path
        fill="#EA4335"
        d="M17.4 5.7C13.1 8 10 12.6 10 18c0 3.6 1.7 8.1 4.2 12.5L24 18 17.4 5.7z"
      />
      <path
        fill="#4285F4"
        d="M30.6 5.7 24 18l9.8 12.5C36.3 26.1 38 21.6 38 18c0-5.4-3.1-10-7.4-12.3z"
      />
      <circle fill="#fff" cx="24" cy="18" r="6.5" />
      <circle fill="#1A73E8" cx="24" cy="18" r="3.2" />
    </svg>
  );
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
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 shrink-0 overflow-hidden">
          {widget.icon === "maps" ? (
            <GoogleMapsIcon className="w-5 h-5" />
          ) : (
            <Wifi className="w-4 h-4 text-white/90" />
          )}
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

type Beat =
  | "greeting"
  | "guest"
  | "agent"
  | "guestFollowUp"
  | "agentFollowUp"
  | "widget";

function buildStepPlan(scenario: ChatScenario): Beat[] {
  const beats: Beat[] = [];
  if (scenario.agentGreeting) beats.push("greeting");
  beats.push("guest", "agent");
  if (scenario.guestFollowUp) {
    beats.push("guestFollowUp");
    if (scenario.agentFollowUp) beats.push("agentFollowUp");
  }
  beats.push("widget");
  return beats;
}

/**
 * Hero chat locked to one video scenario; timing scales so the conversation
 * finishes ~finishEarlySec before the clip ends.
 */
export function HeroChatOverlay({
  dict,
  scenario: scenarioProp,
  videoDurationSec = 12,
  finishEarlySec = 2,
  active = true,
}: HeroChatOverlayProps) {
  const chat = dict.hero?.chat ?? dict.chat ?? {};
  const agentLabel = chat.agent_label ?? "Sailly";
  const scenario = useMemo(() => {
    const fromDict = (chat.scenarios as ChatScenario[] | undefined)?.[0];
    const resolved = scenarioProp ?? fromDict;
    if (!resolved) return null;
    return assignGuestAvatars([resolved])[0] ?? null;
  }, [scenarioProp, chat.scenarios]);

  const [step, setStep] = useState(0);
  const beats = useMemo(
    () => (scenario ? buildStepPlan(scenario) : []),
    [scenario]
  );
  const maxStep = beats.length;

  useEffect(() => {
    if (!active || !scenario || maxStep === 0) {
      setStep(0);
      return;
    }

    setStep(0);
    const budgetMs = Math.max(
      3200,
      (Math.max(videoDurationSec, 4) - finishEarlySec) * 1000
    );
    const interval = Math.floor(budgetMs / maxStep);
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 1; i <= maxStep; i++) {
      timers.push(setTimeout(() => setStep(i), interval * i));
    }

    return () => timers.forEach(clearTimeout);
  }, [active, scenario?.id, videoDurationSec, finishEarlySec, maxStep]);

  if (!scenario) return null;

  const beatIndex = (name: Beat) => {
    const i = beats.indexOf(name);
    return i === -1 ? 999 : i + 1;
  };

  const greetingStep = beatIndex("greeting");
  const guestStep = beatIndex("guest");
  const agentStep = beatIndex("agent");
  const guestFollowStep = beatIndex("guestFollowUp");
  const agentFollowStep = beatIndex("agentFollowUp");
  const widgetStep = beatIndex("widget");

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
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={AGENT_BUBBLE}
              >
                <AgentRow label={agentLabel} />
                <p className="text-[15px] text-white font-medium leading-snug">
                  {scenario.agentGreeting}
                </p>
              </m.div>
            )}

            <m.div
              initial={false}
              animate={
                step >= guestStep
                  ? {
                      opacity: step >= agentStep ? 0.55 : 1,
                      y: 0,
                      scale: 1,
                    }
                  : { opacity: 0, y: 14, scale: 0.98 }
              }
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={GUEST_BUBBLE}
            >
              <GuestRow
                name={scenario.guestName}
                avatar={scenario.guestAvatar ?? "/images/avatars/guest-hotel.jpg"}
              />
              <p className="text-[15px] text-white leading-snug">{scenario.guest}</p>
            </m.div>

            <m.div
              initial={false}
              animate={
                step >= agentStep
                  ? {
                      opacity:
                        step >= guestFollowStep && scenario.guestFollowUp
                          ? 0.5
                          : 1,
                      y: 0,
                      scale: 1,
                    }
                  : { opacity: 0, y: 14, scale: 0.98 }
              }
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={AGENT_BUBBLE}
            >
              <AgentRow label={agentLabel} />
              <p className="text-[15px] text-white font-medium leading-snug">
                {scenario.agent}
              </p>
            </m.div>

            {scenario.guestFollowUp && (
              <m.div
                initial={false}
                animate={
                  step >= guestFollowStep
                    ? {
                        opacity: step >= agentFollowStep ? 0.55 : 1,
                        y: 0,
                        scale: 1,
                      }
                    : { opacity: 0, y: 14, scale: 0.98 }
                }
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={GUEST_BUBBLE}
              >
                <GuestRow
                  name={scenario.guestName}
                  avatar={
                    scenario.guestAvatar ?? "/images/avatars/guest-hotel.jpg"
                  }
                />
                <p className="text-[15px] text-white leading-snug">
                  {scenario.guestFollowUp}
                </p>
              </m.div>
            )}

            {scenario.agentFollowUp && (
              <m.div
                initial={false}
                animate={
                  step >= agentFollowStep
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 14, scale: 0.98 }
                }
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={AGENT_BUBBLE}
              >
                <AgentRow label={agentLabel} />
                <p className="text-[15px] text-white font-medium leading-snug">
                  {scenario.agentFollowUp}
                </p>
              </m.div>
            )}

            <m.div
              initial={false}
              animate={
                step >= widgetStep
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 14, scale: 0.98 }
              }
              transition={{ duration: 0.25, ease: "easeOut" }}
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
