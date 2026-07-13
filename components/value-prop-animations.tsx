"use client";

import React, { useEffect, useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import {
  Mail,
  MessageCircle,
  Phone,
  Star,
  ThumbsUp,
  Heart,
  Headphones,
  Calendar,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Animation: cycling brand chat bubbles ── */
function ChatBrandsAnimation() {
  const brands = [
    {
      name: "Hotel Alpenblick",
      color: "from-emerald-600/90 to-emerald-700/90",
      guest: "Haben Sie am Freitag noch ein Zimmer frei?",
      reply: "Ja — Doppelzimmer mit Gartenblick ist frei.",
    },
    {
      name: "Trattoria Milano",
      color: "from-rose-600/90 to-rose-700/90",
      guest: "Tisch für vier, Samstag 19 Uhr?",
      reply: "Gerne. Ich reserviere für Sie.",
    },
    {
      name: "Praxis Dr. Weber",
      color: "from-sky-600/90 to-sky-700/90",
      guest: "Können wir morgen früh kommen?",
      reply: "08:30 Uhr ist noch frei.",
    },
  ];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % brands.length), 2800);
    return () => clearInterval(t);
  }, [brands.length]);

  const b = brands[idx];

  return (
    <div className="w-full max-w-[280px] mx-auto" aria-hidden="true">
      <AnimatePresence mode="wait">
        <m.div
          key={b.name}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="space-y-2"
        >
          <div
            className={cn(
              "rounded-xl px-3 py-2 bg-gradient-to-br shadow-lg",
              b.color
            )}
          >
            <p className="text-[10px] font-semibold text-white/70 mb-1">{b.name}</p>
            <p className="text-xs text-white/90 bg-white/15 rounded-lg px-2.5 py-1.5">
              {b.guest}
            </p>
          </div>
          <div className="rounded-xl px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/20">
            <p className="text-[10px] font-semibold text-white/60 mb-1">Sailly</p>
            <p className="text-xs text-white">{b.reply}</p>
          </div>
        </m.div>
      </AnimatePresence>
    </div>
  );
}

/* ── Animation: calendar + booking widget ── */
function WidgetAnimation() {
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setShowBooking((v) => !v), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full max-w-[260px] mx-auto" aria-hidden="true">
      <AnimatePresence mode="wait">
        {!showBooking ? (
          <m.div
            key="cal"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="rounded-xl bg-white/20 backdrop-blur-sm border border-white/25 p-3"
          >
            <p className="text-[10px] font-semibold text-white/70 mb-2 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Fr, 11. Jul
            </p>
            <div className="flex gap-1.5 flex-wrap">
              {["08:00", "08:30", "09:00", "09:30"].map((t, i) => (
                <span
                  key={t}
                  className={cn(
                    "px-2 py-1 rounded-md text-[10px] font-semibold",
                    i === 1 ? "bg-white text-slate-800" : "bg-white/15 text-white/80"
                  )}
                >
                  {t}
                </span>
              ))}
            </div>
          </m.div>
        ) : (
          <m.div
            key="book"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="rounded-xl bg-white/95 px-3 py-2.5 flex items-center gap-2 shadow-lg"
          >
            <span className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            </span>
            <span>
              <span className="block text-xs font-bold text-slate-900">Termin eingetragen</span>
              <span className="block text-[10px] text-slate-500">Fr 08:30 · Praxis</span>
            </span>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Animation: channel icon grid (Sierra-style) ── */
function ChannelsAnimation() {
  const icons = [
    { Icon: Phone, label: "Telefon" },
    { Icon: MessageCircle, label: "Chat" },
    { Icon: Mail, label: "E-Mail" },
    { Icon: Headphones, label: "Voice" },
    { Icon: MessageCircle, label: "SMS" },
    { Icon: Phone, label: "WhatsApp" },
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % icons.length), 900);
    return () => clearInterval(t);
  }, [icons.length]);

  return (
    <div className="grid grid-cols-3 gap-2.5 max-w-[200px] mx-auto" aria-hidden="true">
      {icons.map(({ Icon }, i) => (
        <m.div
          key={i}
          animate={{
            scale: active === i ? 1.08 : 1,
            opacity: active === i ? 1 : 0.45,
          }}
          transition={{ duration: 0.35 }}
          className="aspect-square rounded-xl bg-white/15 border border-white/25 flex items-center justify-center"
        >
          <Icon className="w-5 h-5 text-white" />
        </m.div>
      ))}
    </div>
  );
}

/* ── Animation: rating loop ── */
function RatingsAnimation() {
  const items = [
    { Icon: Star, label: "5 Sterne" },
    { Icon: ThumbsUp, label: "Zufrieden" },
    { Icon: Heart, label: "Empfohlen" },
    { Icon: Check, label: "Gebucht" },
  ];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 1400);
    return () => clearInterval(t);
  }, [items.length]);

  const { Icon } = items[idx];

  return (
    <div className="flex items-center justify-center" aria-hidden="true">
      <AnimatePresence mode="wait">
        <m.div
          key={idx}
          initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.7, rotate: 8 }}
          transition={{ duration: 0.35 }}
          className="w-20 h-20 rounded-full bg-white/15 border border-white/30 flex items-center justify-center"
        >
          <Icon className="w-9 h-9 text-white" />
        </m.div>
      </AnimatePresence>
    </div>
  );
}

const ANIMATIONS = {
  chat: ChatBrandsAnimation,
  widgets: WidgetAnimation,
  channels: ChannelsAnimation,
  ratings: RatingsAnimation,
} as const;

export type PillarAnimation = keyof typeof ANIMATIONS;

export function PillarAnimationView({ kind }: { kind: PillarAnimation }) {
  const Comp = ANIMATIONS[kind];
  return <Comp />;
}
