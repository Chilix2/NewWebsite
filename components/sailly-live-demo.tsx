"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { SaillyIcon } from "./sailly-icon";
import { cn } from "@/lib/utils";
import { GlassCard } from "./ui/glass-card";
import {
  Phone,
  PhoneCall,
  PhoneOff,
  UtensilsCrossed,
  Hotel,
  Stethoscope,
  HelpCircle,
  ArrowRight,
  Mail,
  Send,
  Loader2,
  CheckCircle2,
} from "lucide-react";

function WhatsAppLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

type DemoStep = "select-industry" | "enter-phone" | "calling" | "post-call";

interface SaillyLiveDemoProps {
  className?: string;
  locale: string;
  dict: any;
}

const INDUSTRIES = [
  { key: "restaurant", icon: UtensilsCrossed, labelDe: "Restaurant", labelEn: "Restaurant" },
  { key: "hotel", icon: Hotel, labelDe: "Hotel", labelEn: "Hotel" },
  { key: "medical", icon: Stethoscope, labelDe: "Arztpraxis", labelEn: "Medical Practice" },
  { key: "other", icon: HelpCircle, labelDe: "Andere Branche", labelEn: "Other Industry" },
];

const LABELS: Record<string, Record<string, string>> = {
  de: {
    title: "Testen Sie Sailly live",
    subtitle: "Wählen Sie eine Branche und erleben Sie Sailly am Telefon.",
    phonePlaceholder: "+49 170 1234567",
    phoneLabel: "Ihre Telefonnummer",
    phoneHint: "Geben Sie Ihre Nummer ein — wir rufen Sie sofort an!",
    privacyNote: "Ihre Nummer wird nur für diesen Testanruf verwendet.",
    startCall: "Jetzt anrufen lassen",
    calling: "Wir rufen Sie an...",
    ringing: "Es klingelt...",
    connected: "Verbunden",
    ended: "Gespräch beendet",
    duration: "Dauer",
    whatsapp: "Via WhatsApp verbinden",
    sms: "SMS senden",
    email: "E-Mail schreiben",
    alreadyUsed: "Sie haben Ihren kostenlosen Testanruf bereits genutzt.",
    contactUs: "Kontaktieren Sie uns direkt für eine persönliche Demo.",
    otherPlaceholder: "Ihre Branche / Unternehmen",
    back: "Zurück",
    errorGeneric: "Der Anruf konnte nicht gestartet werden. Bitte versuchen Sie es später.",
    weiter: "Weiter",
    requestReceived: "Anfrage erhalten!",
    requestReceivedDetail: "Vielen Dank! Wir werden uns in Kürze telefonisch bei Ihnen melden, um Ihnen eine personalisierte Demo vorzuführen.",
    requestSent: "Demo anfordern",
  },
  en: {
    title: "Try Sailly Live",
    subtitle: "Choose an industry and experience Sailly on your phone.",
    phonePlaceholder: "+49 170 1234567",
    phoneLabel: "Your phone number",
    phoneHint: "Enter your number — we'll call you right away!",
    privacyNote: "Your number is only used for this test call.",
    startCall: "Call me now",
    calling: "Calling you...",
    ringing: "Ringing...",
    connected: "Connected",
    ended: "Call ended",
    duration: "Duration",
    whatsapp: "Connect via WhatsApp",
    sms: "Send SMS",
    email: "Send Email",
    alreadyUsed: "You've already used your free test call.",
    contactUs: "Contact us directly for a personalised demo.",
    otherPlaceholder: "Your industry / company",
    back: "Back",
    errorGeneric: "The call could not be started. Please try again later.",
    weiter: "Continue",
    requestReceived: "Request received!",
    requestReceivedDetail: "Thank you! We will call you shortly to give you a personalised demo.",
    requestSent: "Request demo",
  },
};

function getLabels(locale: string) {
  return LABELS[locale] || LABELS["en"];
}

export function SaillyLiveDemo({ className, locale }: SaillyLiveDemoProps) {
  const l = getLabels(locale);
  const [step, setStep] = useState<DemoStep>("select-industry");
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [customIndustry, setCustomIndustry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [leadId, setLeadId] = useState<string | null>(null);

  // Auto-format phone number to E.164 as user types
  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value;

    // Allow + at start and digits only elsewhere
    const digits = raw.replace(/[^\d]/g, "");

    // If user typed a leading 0 (German local), convert to +49
    if (digits.startsWith("0") && digits.length >= 2) {
      setPhoneNumber("+49" + digits.slice(1));
    } else if (digits.length > 0 && !raw.startsWith("+")) {
      // No leading + and no leading 0 — prepend + so it stays E.164
      setPhoneNumber("+" + digits);
    } else {
      // Keep as typed (user started with +)
      setPhoneNumber(raw);
    }
  }, []);
  const [callStatus, setCallStatus] = useState<string>("initiating");
  const [callDuration, setCallDuration] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [demoAllowed, setDemoAllowed] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkpoints, setCheckpoints] = useState<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    fetch("/api/demo/check", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        setDemoAllowed(data.allowed);
        if (!data.allowed) setStep("post-call");
      })
      .catch(() => setDemoAllowed(true));
  }, []);

  const startCallTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setCallDuration(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
  }, []);

  const stopCallTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const pollStatus = useCallback(
    (id: string) => {
      const TERMINAL = ["completed", "failed", "no-answer", "busy", "canceled", "queued"];
      let pollCount = 0;
      pollRef.current = setInterval(async () => {
        pollCount++;
        try {
          const res = await fetch(`/api/demo/status/${id}`);
          if (!res.ok) return;
          const data = await res.json();
          setCallStatus(data.status);
          
          // Fetch checkpoint status in parallel
          try {
            const checkpointRes = await fetch(`/api/demo/checkpoints/${id}`);
            if (checkpointRes.ok) {
              const checkpointData = await checkpointRes.json();
              setCheckpoints(checkpointData);
            }
          } catch { /* checkpoint fetch failed, continue anyway */ }
          
          if (data.status === "in-progress" && startTimeRef.current === 0) {
            startCallTimer();
          }
          if (TERMINAL.includes(data.status) || pollCount > 60) {
            if (data.duration) setCallDuration(data.duration);
            stopCallTimer();
            if (pollRef.current) clearInterval(pollRef.current);
            setStep("post-call");
          }
        } catch { /* retry on next tick */ }
      }, 3000);
    },
    [startCallTimer, stopCallTimer]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const handleInitiateCall = async () => {
    if (!phoneNumber.trim() || !selectedIndustry) return;
    setIsSubmitting(true);
    setError(null);

    try {
      // Pre-flight dry-run check before spending Twilio credits
      try {
        const dryRes = await fetch("/api/demo/dry-run");
        const dryData = await dryRes.json();
        if (dryData.overall !== "PASS") {
          const failedChecks = Object.entries(dryData.checks || {})
            .filter(([, v]: any) => !v.pass)
            .map(([k]: any) => k);
          console.error("[demo] Dry-run FAILED:", failedChecks, dryData);
          setError(l.errorGeneric);
          setIsSubmitting(false);
          return;
        }
      } catch (dryErr) {
        console.error("[demo] Dry-run check threw error:", dryErr);
        setError(l.errorGeneric);
        setIsSubmitting(false);
        return;
      }

      const res = await fetch("/api/demo/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          industry: selectedIndustry,
          customIndustry: selectedIndustry === "other" ? customIndustry : null,
          phoneNumber: phoneNumber.trim(),
          locale,
        }),
      });

      if (res.status === 429) {
        setDemoAllowed(false);
        setStep("post-call");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || l.errorGeneric);
        return;
      }

      const data = await res.json();
      setLeadId(data.leadId);
      setCallStatus(data.status || "initiated");

      // If backend queued the request (live calls off) → skip calling screen
      if (data.status === "queued") {
        setStep("post-call");
        return;
      }

      // Otherwise show calling animation and poll for real call status
      setStep("calling");
      pollStatus(data.leadId);
    } catch (err) {
      console.error("[demo] initiate error:", err);
      setError(l.errorGeneric);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const whatsappUrl = `https://wa.me/491634549834?text=${encodeURIComponent(
    locale === "de"
      ? "Hallo! Ich habe gerade die Sailly Demo getestet und bin interessiert."
      : "Hi! I just tried the Sailly demo and I'm interested."
  )}`;

  const smsUrl = `sms:+491634549834?body=${encodeURIComponent(
    locale === "de"
      ? "Sailly Demo getestet - bitte kontaktieren Sie mich."
      : "Tried Sailly demo - please contact me."
  )}`;

  const emailUrl = `mailto:info@sailly.de?subject=${encodeURIComponent(
    locale === "de" ? "Interesse an Sailly Demo" : "Interest in Sailly Demo"
  )}&body=${encodeURIComponent(
    locale === "de"
      ? "Hallo,\n\nich habe die Sailly Demo ausprobiert und bin interessiert. Bitte kontaktieren Sie mich für weitere Informationen.\n\nMit freundlichen Grüßen"
      : "Hello,\n\nI tried the Sailly demo and I'm interested. Please contact me for more information.\n\nBest regards"
  )}`;

  return (
    <LazyMotion features={domAnimation}>
      <div className={cn("w-full max-w-sm mx-auto", className)}>
        <GlassCard
          intensity="xl"
          className="w-full h-[580px] sm:h-[650px] bg-white/60 border-white/50 shadow-2xl overflow-hidden flex flex-col relative rounded-[2rem] sm:rounded-[3rem]"
        >
          {/* Phone Notch */}
          <div className="h-6 w-full flex justify-center items-center mt-2 z-20">
            <div className="w-20 h-5 bg-black/10 rounded-full backdrop-blur-md" />
          </div>

          {/* Header */}
          <div className="p-4 pt-2 border-b border-white/20 bg-white/30 backdrop-blur-md relative z-10">
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <m.div
                  className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden bg-white shadow-inner"
                  animate={step === "calling" ? { scale: [1, 1.15, 1] } : {}}
                  transition={step === "calling" ? { repeat: Infinity, duration: 2 } : {}}
                >
                  <SaillyIcon className="w-full h-full" state={step === "calling" ? "speaking" : "idle"} animated={step === "calling"} />
                </m.div>
                {step === "calling" && callStatus === "in-progress" && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
                )}
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-800 text-sm">Sailly</div>
                <div className="text-xs text-pink-600 font-medium">
                  {step === "calling"
                    ? callStatus === "in-progress"
                      ? `${l.connected} · ${formatDuration(callDuration)}`
                      : callStatus === "ringing"
                      ? l.ringing
                      : l.calling
                    : step === "post-call"
                    ? callDuration > 0
                      ? `${l.ended} · ${formatDuration(callDuration)}`
                      : ""
                    : "Live Demo"}
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle, #6b7280 1px, transparent 1px)", backgroundSize: "20px 20px" }}
            />

            <AnimatePresence mode="wait">
              {/* STEP 1: Select Industry */}
              {step === "select-industry" && (
                <m.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3 relative z-10">
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-3 text-sm text-slate-700 border border-pink-100">
                    <p className="font-semibold text-slate-800 mb-1">{l.title}</p>
                    <p className="text-xs text-slate-500">{l.subtitle}</p>
                  </div>

                  {INDUSTRIES.map((ind) => {
                    const Icon = ind.icon;
                    const label = locale === "de" ? ind.labelDe : ind.labelEn;
                    const isSelected = selectedIndustry === ind.key;
                    return (
                      <button
                        key={ind.key}
                        onClick={() => {
                          setSelectedIndustry(ind.key);
                          if (ind.key !== "other") setStep("enter-phone");
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left",
                          isSelected
                            ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                            : "bg-white/70 hover:bg-white/90 text-slate-700 border border-white/60 hover:border-pink-200"
                        )}
                      >
                        <Icon className="w-5 h-5 shrink-0" />
                        <span className="font-medium text-sm">{label}</span>
                        <ArrowRight className="w-4 h-4 ml-auto opacity-50" />
                      </button>
                    );
                  })}

                  {selectedIndustry === "other" && (
                    <m.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                      <input
                        type="text"
                        value={customIndustry}
                        onChange={(e) => setCustomIndustry(e.target.value)}
                        placeholder={l.otherPlaceholder}
                        className="w-full p-3 rounded-xl border border-pink-200 bg-white/80 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
                      />
                      {customIndustry.trim() && (
                        <button
                          onClick={() => setStep("enter-phone")}
                          className="w-full mt-2 p-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium text-sm flex items-center justify-center gap-2"
                        >
                          <ArrowRight className="w-4 h-4" /> {l.weiter}
                        </button>
                      )}
                    </m.div>
                  )}
                </m.div>
              )}

              {/* STEP 2: Enter Phone */}
              {step === "enter-phone" && (
                <m.div key="s2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4 relative z-10">
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-3 text-sm text-slate-700 border border-pink-100">
                    <p>{l.phoneHint}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">{l.phoneLabel}</label>
                    <input
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder={l.phonePlaceholder}
                      className="w-full p-4 rounded-xl border border-pink-200 bg-white/90 text-lg text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-pink-400 font-mono tracking-wider"
                      autoFocus
                    />
                    <p className="text-[10px] text-slate-400 text-center">{l.privacyNote}</p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-600">{error}</div>
                  )}

                  <button
                    onClick={() => { setStep("select-industry"); setError(null); }}
                    className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    ← {l.back}
                  </button>
                </m.div>
              )}

              {/* STEP 3: Calling */}
              {step === "calling" && (
                <m.div key="s3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center justify-center h-full gap-6 relative z-10">
                  <m.div
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <PhoneCall className="w-10 h-10 text-white" />
                  </m.div>
                  <div className="text-center space-y-1">
                    <p className="text-lg font-bold text-slate-800">
                      {callStatus === "in-progress" ? l.connected : callStatus === "ringing" ? l.ringing : l.calling}
                    </p>
                    {callStatus === "in-progress" && (
                      <p className="text-2xl font-mono text-pink-600">{formatDuration(callDuration)}</p>
                    )}
                    <p className="text-xs text-slate-400">{phoneNumber}</p>
                  </div>
                </m.div>
              )}

              {/* STEP 4: Post-Call */}
              {step === "post-call" && (
                <m.div key="s4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4 relative z-10">
                  {demoAllowed === false && callDuration === 0 && callStatus !== "queued" ? (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
                      <p className="text-sm font-medium text-amber-800">{l.alreadyUsed}</p>
                      <p className="text-xs text-amber-600 mt-1">{l.contactUs}</p>
                    </div>
                  ) : callStatus === "queued" ? (
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
                      <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <p className="text-sm font-medium text-green-800">{(l as any).requestReceived}</p>
                      <p className="text-xs text-green-600 mt-2">{(l as any).requestReceivedDetail}</p>
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
                      <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <p className="text-sm font-medium text-green-800">{l.ended}</p>
                      {callDuration > 0 && (
                        <p className="text-xs text-green-600 mt-1">{l.duration}: {formatDuration(callDuration)}</p>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#25D366] text-white font-medium text-sm hover:brightness-110 transition-all"
                    >
                      <WhatsAppLogo className="w-5 h-5" />
                      {l.whatsapp}
                    </a>
                    <a
                      href={emailUrl}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-700 text-white font-medium text-sm hover:brightness-110 transition-all"
                    >
                      <Mail className="w-5 h-5" />
                      {l.email}
                    </a>
                    <a
                      href={smsUrl}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-blue-500 text-white font-medium text-sm hover:brightness-110 transition-all"
                    >
                      <Send className="w-5 h-5" />
                      {l.sms}
                    </a>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Bar */}
          <div className="p-4 border-t border-white/20 bg-white/40 backdrop-blur-md flex justify-center items-center gap-6">
            {step === "enter-phone" ? (
              <button
                onClick={handleInitiateCall}
                disabled={!phoneNumber.trim() || isSubmitting}
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all",
                  phoneNumber.trim() && !isSubmitting
                    ? "bg-gradient-to-br from-green-400 to-emerald-500 hover:scale-110 hover:shadow-xl"
                    : "bg-gray-200 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                ) : (
                  <Phone className="w-6 h-6 text-white" />
                )}
              </button>
            ) : step === "calling" ? (
              <button
                onClick={() => {
                  if (pollRef.current) clearInterval(pollRef.current);
                  stopCallTimer();
                  setStep("post-call");
                }}
                className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center shadow-lg hover:scale-110 hover:bg-red-600 transition-all"
              >
                <PhoneOff className="w-6 h-6 text-white" />
              </button>
            ) : (
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                <Phone className="w-6 h-6 text-gray-300" />
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </LazyMotion>
  );
}
