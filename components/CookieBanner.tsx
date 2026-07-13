"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const COOKIE_KEY = "sailly_cookie_notice_v1";

interface Props {
  locale?: string;
}

export default function CookieBanner({ locale = "de" }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(COOKIE_KEY);
      if (!dismissed) setVisible(true);
    } catch {
      // localStorage unavailable (private mode) — don't show
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(COOKIE_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie-Hinweis"
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pointer-events-none"
    >
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 p-5 pointer-events-auto">
        <div className="flex items-start gap-4">
          <div className="text-xl shrink-0 mt-0.5">🍪</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900">Hinweis zu Cookies</p>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Diese Website verwendet ausschließlich technisch notwendige Cookies für den Betrieb
              (z.B. Sitzungsverwaltung). Es werden keine Tracking- oder Analyse-Cookies gesetzt.
              Weitere Informationen finden Sie in unserer{" "}
              <Link
                href={`/${locale}/datenschutz`}
                className="text-primary hover:underline font-medium"
              >
                Datenschutzerklärung
              </Link>
              .
            </p>
          </div>
          <button
            onClick={dismiss}
            className="shrink-0 bg-primary text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
            aria-label="Cookie-Hinweis schließen"
          >
            Verstanden
          </button>
        </div>
      </div>
    </div>
  );
}
