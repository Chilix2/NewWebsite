"use client";

import React, { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

interface LanguageAudioButtonProps {
  langCode: string;
  label: string;
}

export function LanguageAudioButton({ langCode, label }: LanguageAudioButtonProps) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handlePlay}
        className="flex items-center gap-2 px-3 py-1 text-blue-600 hover:text-blue-700 text-sm font-medium hover:bg-blue-50 rounded transition"
      >
        {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        {label}
      </button>
      <audio
        ref={audioRef}
        src={`/audio/demos/${langCode}-sample.mp3`}
        onEnded={() => setPlaying(false)}
        style={{ display: "none" }}
      />
    </div>
  );
}
