"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Phone, PhoneCall, Loader2, CheckCircle2 } from "lucide-react";
import { SaillySignalLogo } from "@/components/sailly-signal-logo";
import { cn } from "@/lib/utils";
import {
  COUNTRY_DIAL_OPTIONS,
  dialOptionForLocale,
  flagUrl,
  toE164,
  type CountryDialOption,
} from "@/lib/country-dial-options";

type Step = "idle" | "calling" | "done";

export type ContactVoiceCopy = {
  voice_title: string;
  voice_desc: string;
  phone_label: string;
  phone_placeholder: string;
  phone_hint: string;
  privacy_note: string;
  start_call: string;
  calling: string;
  ringing: string;
  connected: string;
  ended: string;
  error: string;
  success_title: string;
  success_detail: string;
  cta_back: string;
};

export function ContactVoiceIntake({
  locale,
  copy,
}: {
  locale: string;
  copy: ContactVoiceCopy;
}) {
  const defaultCountry = useMemo(() => dialOptionForLocale(locale), [locale]);
  const [country, setCountry] = useState<CountryDialOption>(defaultCountry);
  const [national, setNational] = useState("");
  const [dialOpen, setDialOpen] = useState(false);
  const [step, setStep] = useState<Step>("idle");
  const [status, setStatus] = useState("initiating");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dialRef = useRef<HTMLDivElement>(null);

  const ready = national.replace(/\D/g, "").replace(/^0/, "").length >= 6;
  const e164 = toE164(country.dial, national);

  useEffect(() => {
    setCountry(dialOptionForLocale(locale));
  }, [locale]);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  useEffect(() => {
    if (!dialOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (dialRef.current && !dialRef.current.contains(e.target as Node)) {
        setDialOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [dialOpen]);

  const pollStatus = useCallback((id: string) => {
    const TERMINAL = ["completed", "failed", "no-answer", "busy", "canceled", "queued"];
    let n = 0;
    pollRef.current = setInterval(async () => {
      n++;
      try {
        const res = await fetch(`/api/demo/status/${id}`);
        if (!res.ok) return;
        const data = await res.json();
        setStatus(data.status);
        if (TERMINAL.includes(data.status) || n > 60) {
          if (pollRef.current) clearInterval(pollRef.current);
          setStep("done");
        }
      } catch {
        /* retry */
      }
    }, 3000);
  }, []);

  const startCall = async () => {
    if (!ready) return;
    setSubmitting(true);
    setError(null);

    try {
      const dryRes = await fetch("/api/demo/dry-run");
      const dryData = await dryRes.json();
      if (dryData.overall !== "PASS") {
        setError(copy.error);
        setSubmitting(false);
        return;
      }

      const res = await fetch("/api/demo/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          purpose: "contact_intake",
          industry: "contact",
          phoneNumber: e164,
          locale,
        }),
      });

      if (res.status === 429) {
        setStep("done");
        setSubmitting(false);
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error === "invalid_phone" ? copy.error : data.error || copy.error);
        setSubmitting(false);
        return;
      }

      const data = await res.json();
      setStatus(data.status || "initiated");

      if (data.status === "queued") {
        setStep("done");
      } else {
        setStep("calling");
        pollStatus(data.leadId);
      }
    } catch {
      setError(copy.error);
    } finally {
      setSubmitting(false);
    }
  };

  const statusLabel =
    status === "in-progress"
      ? copy.connected
      : status === "ringing" || status === "initiated"
        ? copy.ringing
        : copy.calling;

  return (
    <div className="rounded-[28px] bg-gradient-to-tl from-[#ebe4f7] via-[#c9b6e8] to-[#9b7fd4] p-6 sm:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] h-full flex flex-col min-h-[420px]">
      <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight text-center sm:text-left">
        {copy.voice_title}
      </h3>
      <p className="mt-2 text-white/90 text-sm sm:text-base leading-relaxed text-center sm:text-left">
        {copy.voice_desc}
      </p>

      {/* Centered Sailly mark */}
      <div className="flex-1 flex items-center justify-center py-8 min-h-[120px]">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/35 border border-white/50 flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
          <SaillySignalLogo size="lg" animated tone="brand" className="w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem]" />
        </div>
      </div>

      {step === "idle" && (
        <div className="mt-auto space-y-4">
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-1.5">{copy.phone_label}</label>
            <div className="flex items-stretch rounded-2xl bg-white overflow-hidden border border-white/40 focus-within:ring-2 focus-within:ring-white/60">
              <div className="relative shrink-0" ref={dialRef}>
                <button
                  type="button"
                  onClick={() => setDialOpen((o) => !o)}
                  className="h-full min-h-[48px] min-w-[44px] pl-3 pr-2 flex items-center gap-1.5 border-r border-slate-200 hover:bg-slate-50 touch-manipulation"
                  aria-label="Country code"
                  aria-expanded={dialOpen}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={flagUrl(country.cc, 40)}
                    srcSet={`${flagUrl(country.cc, 40)} 1x, ${flagUrl(country.cc, 80)} 2x`}
                    width={28}
                    height={20}
                    alt=""
                    className="w-7 h-5 rounded object-cover"
                  />
                  <span className="text-sm font-semibold text-slate-800 tabular-nums">{country.dial}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
                {dialOpen && (
                  <div className="absolute left-0 bottom-full mb-2 z-30 w-[min(100vw-3rem,280px)] max-h-56 overflow-y-auto overscroll-contain rounded-2xl bg-white shadow-xl border border-slate-200 py-1">
                    {COUNTRY_DIAL_OPTIONS.map((opt) => (
                      <button
                        key={opt.cc}
                        type="button"
                        onClick={() => {
                          setCountry(opt);
                          setDialOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-2.5 px-3 py-2.5 min-h-[44px] text-left hover:bg-slate-50 touch-manipulation",
                          opt.cc === country.cc && "bg-slate-100"
                        )}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={flagUrl(opt.cc, 40)}
                          alt=""
                          width={24}
                          height={18}
                          className="w-6 h-[18px] rounded object-cover shrink-0"
                          loading="lazy"
                        />
                        <span className="text-sm text-slate-800 flex-1 truncate">{opt.name}</span>
                        <span className="text-xs font-semibold text-slate-500 tabular-nums">{opt.dial}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                value={national}
                onChange={(e) => setNational(e.target.value.replace(/[^\d\s]/g, ""))}
                placeholder={copy.phone_placeholder}
                className="flex-1 min-w-0 min-h-[48px] px-4 py-3 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none touch-manipulation"
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-100 bg-red-900/30 rounded-xl px-3 py-2">{error}</p>}
          <button
            type="button"
            onClick={startCall}
            disabled={submitting || !ready}
            className={cn(
              "w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 rounded-full font-semibold transition-all touch-manipulation shadow-lg disabled:opacity-50 disabled:pointer-events-none",
              ready
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "bg-white text-slate-900 hover:bg-white/90"
            )}
          >
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Phone className="w-5 h-5" />}
            {copy.start_call}
          </button>
          <p className="text-[11px] text-white/65 text-center">{copy.privacy_note}</p>
        </div>
      )}

      {step === "calling" && (
        <div className="mt-auto flex flex-col items-center justify-center py-6 gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center animate-pulse">
            <PhoneCall className="w-8 h-8 text-white" />
          </div>
          <p className="text-lg font-semibold text-white">{statusLabel}</p>
          <p className="text-sm text-white/80">{e164}</p>
        </div>
      )}

      {step === "done" && (
        <div className="mt-auto flex flex-col items-center justify-center py-6 gap-3 text-center">
          <CheckCircle2 className="w-12 h-12 text-white" />
          <p className="text-xl font-semibold text-white">{copy.success_title}</p>
          <p className="text-sm text-white/85 max-w-sm">{copy.success_detail}</p>
          <button
            type="button"
            onClick={() => {
              setStep("idle");
              setError(null);
            }}
            className="mt-2 text-sm font-semibold text-white underline underline-offset-2 min-h-[44px] px-4 touch-manipulation"
          >
            {copy.cta_back}
          </button>
        </div>
      )}
    </div>
  );
}
