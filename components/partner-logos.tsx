/**
 * Hamming-style brand lockups for the strategic-partners film strip:
 * icon + wordmark, horizontally spaced, scrolling infinitely.
 */

import type { ReactNode } from "react";

type LogoProps = { className?: string };

function Lockup({
  children,
  label,
  color = "#0D0D0D",
  className,
}: {
  children: ReactNode;
  label: string;
  color?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2.5 whitespace-nowrap ${className ?? ""}`}>
      <span className="shrink-0 w-7 h-7 flex items-center justify-center">{children}</span>
      <span className="text-[15px] font-semibold tracking-tight" style={{ color }}>
        {label}
      </span>
    </div>
  );
}

export function OpenAILogo({ className }: LogoProps) {
  return (
    <Lockup label="OpenAI" className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logos/partners/openai.svg" alt="" className="w-6 h-6" />
    </Lockup>
  );
}

export function SynthflowLogo({ className }: LogoProps) {
  return (
    <Lockup label="Synthflow" color="#7C5CFC" className={className}>
      <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
        <path
          fill="#7C5CFC"
          d="M7.5 3C11 3 13.5 5 13.5 8.2c0 2.4-1.4 4.1-4 5.2L6 15.2c-1.6.7-2.5 1.5-2.5 3 0 1.9 1.7 3.2 4.2 3.2 2.8 0 4.7-1.3 5.7-3.4l2.6 1.4C14.5 22.5 11.5 25 7.5 25 2.5 25 0 22.2 0 17.8c0-3 1.6-5.1 4.8-6.5l4-1.8c2-.8 2.8-1.5 2.8-2.8 0-1.5-1.1-2.4-3-2.4-2.1 0-3.6 1.1-4.4 2.9L1.5 6C2.9 3.8 4.9 3 7.5 3zm9 0C20 3 22.5 5 22.5 8.2c0 2.4-1.4 4.1-4 5.2L15 15.2c-1.6.7-2.5 1.5-2.5 3 0 1.9 1.7 3.2 4.2 3.2 2.8 0 4.7-1.3 5.7-3.4l2.6 1.4C23.5 22.5 20.5 25 16.5 25 11.5 25 9 22.2 9 17.8c0-3 1.6-5.1 4.8-6.5l4-1.8c2-.8 2.8-1.5 2.8-2.8 0-1.5-1.1-2.4-3-2.4-2.1 0-3.6 1.1-4.4 2.9L10.5 6C11.9 3.8 13.9 3 16.5 3z"
          transform="scale(0.9) translate(0.5 -1)"
        />
      </svg>
    </Lockup>
  );
}

export function DailyLogo({ className }: LogoProps) {
  return (
    <Lockup label="daily" className={className}>
      <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
        <path
          fill="#0D0D0D"
          d="M3 2h7.2c4.6 0 7.5 2.8 7.5 7.2S14.8 16.4 10.2 16.4H6.8V22H3V2zm3.8 3.2v7.8h3.2c2.6 0 4.2-1.4 4.2-4s-1.6-3.8-4.2-3.8H6.8z"
          transform="skewX(-10)"
        />
      </svg>
    </Lockup>
  );
}

export function ElevenLabsLogo({ className }: LogoProps) {
  return (
    <Lockup label="ElevenLabs" className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logos/partners/elevenlabs.svg" alt="" className="w-5 h-5" />
    </Lockup>
  );
}

export function LiveKitLogo({ className }: LogoProps) {
  return (
    <Lockup label="LiveKit" className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logos/partners/livekit.svg" alt="" className="w-6 h-6" />
    </Lockup>
  );
}

export function VapiLogo({ className }: LogoProps) {
  return (
    <div className={`flex items-center whitespace-nowrap ${className ?? ""}`}>
      <svg viewBox="0 0 90 24" className="h-6 w-auto" aria-hidden="true">
        <g fill="#5B9A8B">
          <path d="M2 4 L9 20 L16 4 H12.2 L9 13 L5.8 4 Z" />
          <rect x="20" y="4" width="3.5" height="16" rx="1.75" />
          <path d="M30 4 L37 20 L44 4 H40.2 L37 13 L33.8 4 Z" />
          <path d="M50 4h4.5L60 20h-4.5l-1-3H51l-1 3H45.5L50 4zm1 8.5h3.5L52.75 8 51 12.5z" />
          <path d="M64 4h4v11h7v5H64V4z" />
        </g>
      </svg>
    </div>
  );
}

export function RetellLogo({ className }: LogoProps) {
  return (
    <Lockup label="Retell AI" className={className}>
      <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
        <g fill="#0D0D0D">
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => (
              <circle key={`${row}-${col}`} cx={5 + col * 7} cy={5 + row * 7} r="2.2" />
            ))
          )}
        </g>
      </svg>
    </Lockup>
  );
}

export function PipecatLogo({ className }: LogoProps) {
  return (
    <Lockup label="Pipecat" color="#6B7280" className={className}>
      <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
        <g fill="none" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 20 C4 10 8 4 12 4 C16 4 20 10 20 20" />
          <path d="M8 7 L5 2" />
          <path d="M16 7 L19 2" />
          <circle cx="9" cy="12" r="1.3" fill="#6B7280" stroke="none" />
          <circle cx="15" cy="12" r="1.3" fill="#6B7280" stroke="none" />
        </g>
      </svg>
    </Lockup>
  );
}

export function ClaudeLogo({ className }: LogoProps) {
  return (
    <Lockup label="Claude" color="#D97757" className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logos/partners/anthropic.svg" alt="" className="w-6 h-6" />
    </Lockup>
  );
}

export function GeminiLogo({ className }: LogoProps) {
  return (
    <Lockup label="Gemini" color="#4285F4" className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logos/partners/googlegemini.svg" alt="" className="w-6 h-6" />
    </Lockup>
  );
}

export function GrokLogo({ className }: LogoProps) {
  return (
    <Lockup label="xAI" className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logos/partners/xai.svg" alt="" className="w-7 h-5 object-contain" />
    </Lockup>
  );
}

export function DeepgramLogo({ className }: LogoProps) {
  return (
    <Lockup label="Deepgram" className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logos/partners/deepgram.svg" alt="" className="w-6 h-6" />
    </Lockup>
  );
}

export const PARTNER_LOGOS = [
  { name: "OpenAI", Logo: OpenAILogo },
  { name: "Synthflow", Logo: SynthflowLogo },
  { name: "daily", Logo: DailyLogo },
  { name: "ElevenLabs", Logo: ElevenLabsLogo },
  { name: "LiveKit", Logo: LiveKitLogo },
  { name: "Vapi", Logo: VapiLogo },
  { name: "Retell AI", Logo: RetellLogo },
  { name: "Pipecat", Logo: PipecatLogo },
  { name: "Claude", Logo: ClaudeLogo },
  { name: "Gemini", Logo: GeminiLogo },
  { name: "xAI", Logo: GrokLogo },
  { name: "Deepgram", Logo: DeepgramLogo },
] as const;
