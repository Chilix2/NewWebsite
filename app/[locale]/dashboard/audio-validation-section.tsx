"use client";

import { useEffect, useState } from "react";

interface AudioValidationTest {
  id: string;
  timestamp: string;
  persona: string;
  scenario: string;
  difficulty: number;
  outcome: "passed" | "failed" | "abandoned";
  turns: number;
  callerAudioUrl: string;
  agentAudioUrl: string;
  summary: string;
}

export default function AudioValidationSection() {
  const [tests, setTests] = useState<AudioValidationTest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch("/api/audio-validation/tests");
        if (response.ok) {
          const data = await response.json();
          setTests(data.tests || []);
        }
      } catch (error) {
        console.error("Failed to fetch audio validation tests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Audio-Validierungstests</h3>
        <div className="flex items-center justify-center py-8 text-center">
          <p className="text-sm text-slate-500">Wird geladen...</p>
        </div>
      </div>
    );
  }

  if (tests.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Audio-Validierungstests</h3>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3">
            <span className="text-xl">🎤</span>
          </div>
          <p className="text-sm text-slate-500">
            Noch keine Validierungstests durchgeführt.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <h3 className="font-semibold text-slate-900 mb-4">Audio-Validierungstests</h3>
      <div className="space-y-3">
        {tests.map((test) => (
          <div
            key={test.id}
            className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-medium text-sm text-slate-900">{test.scenario}</p>
                <p className="text-xs text-slate-500">
                  {test.persona} · Schwierigkeit {test.difficulty} · {test.turns} Turns
                </p>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  test.outcome === "passed"
                    ? "bg-emerald-50 text-emerald-700"
                    : test.outcome === "failed"
                    ? "bg-red-50 text-red-700"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {test.outcome}
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-2">{test.summary}</p>
            <div className="text-xs text-slate-500">
              {new Date(test.timestamp).toLocaleString("de-DE")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
