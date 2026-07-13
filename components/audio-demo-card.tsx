"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { GlassCard } from "./ui/glass-card";

interface AudioDemoCardProps {
  label: string;
  desc: string;
  languageLabel: string;
  audioPath: string;
  onPauseOthers: () => void;
  onRegisterRef: (el: HTMLAudioElement | null) => void;
}

export function AudioDemoCard({
  label,
  desc,
  languageLabel,
  audioPath,
  onPauseOthers,
  onRegisterRef,
}: AudioDemoCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateDuration = () => {
      if (audio.duration && isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };

    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);
    audio.addEventListener("canplay", updateDuration);
    // Explicitly trigger metadata load
    audio.load();

    return () => {
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("canplay", updateDuration);
    };
  }, [audioPath]);

  const progress = duration > 0 ? currentTime / duration : 0;

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  const handlePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      onPauseOthers();
      audioRef.current.play();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audioRef.current.currentTime =
      ((e.clientX - rect.left) / rect.width) * duration;
  };

  return (
    <GlassCard hoverEffect className="p-6 text-left bg-white/70 overflow-hidden">
      <audio
        ref={(el) => {
          audioRef.current = el;
          onRegisterRef(el);
        }}
        src={audioPath}
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setCurrentTime(0);
        }}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
      />

      <div className="flex items-center gap-4 mb-4 overflow-hidden">
        <button
          onClick={handlePlay}
          aria-label={playing ? "Pause" : "Play"}
          className="w-14 h-14 md:w-12 md:h-12 shrink-0 rounded-full bg-gradient-to-br from-[#f97e70] to-[#ffb090] flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-primary/25 touch-manipulation"
          style={{ minWidth: 44, minHeight: 44 }}
        >
          {playing ? (
            <Pause className="fill-white text-white w-5 h-5" />
          ) : (
            <Play className="fill-white text-white w-5 h-5 ms-0.5" />
          )}
        </button>
        <div className="min-w-0 flex-1">
          <h4 className="font-bold text-lg text-slate-900 truncate">{label}</h4>
          <p className="text-sm text-slate-500 truncate">
            <span suppressHydrationWarning>
              {duration > 0
                ? playing
                  ? `${formatTime(currentTime)} / ${formatTime(duration)}`
                  : formatTime(duration)
                : "--:--"}
            </span>
            {" • "}
            {languageLabel}
          </p>
        </div>
      </div>

      <div
        className="h-2 bg-slate-100 rounded-full overflow-hidden cursor-pointer"
        onClick={handleSeek}
      >
        <div
          className="h-full bg-primary transition-all duration-100 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <p className="mt-4 text-slate-600 text-sm italic">"{desc}"</p>
    </GlassCard>
  );
}
