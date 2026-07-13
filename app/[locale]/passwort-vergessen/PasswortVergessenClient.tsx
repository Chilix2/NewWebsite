"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  locale: string;
}

export default function PasswortVergessenClient({ locale }: Props) {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Bitte E-Mail-Adresse eingeben.");
      return;
    }
    setLoading(true);
    try {
      const { error: supabaseError } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${window.location.origin}/auth/callback?next=/${locale}/konto/passwort-aendern`,
        }
      );
      if (supabaseError) {
        setError("Fehler beim Senden. Bitte erneut versuchen.");
      } else {
        setSent(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100dvh-5rem)] flex flex-col items-center justify-center px-4 py-12 bg-gradient-soft">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        <Link
          href={`/${locale}/login`}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden />
          Zurück zur Anmeldung
        </Link>

        {sent ? (
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-green-600" aria-hidden />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">E-Mail gesendet</h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Wir haben einen Link zum Zurücksetzen Ihres Passworts an{" "}
              <strong className="text-slate-900">{email}</strong> gesendet.
              Bitte prüfen Sie auch Ihren Spam-Ordner.
            </p>
            <button
              onClick={() => { setSent(false); setEmail(""); }}
              className="text-sm text-primary hover:underline"
            >
              Andere E-Mail-Adresse verwenden
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Passwort zurücksetzen</h1>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Geben Sie Ihre E-Mail-Adresse ein. Wir senden Ihnen einen Link,
              mit dem Sie ein neues Passwort festlegen können.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {error && (
                <div role="alert" className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="reset-email" className="text-sm font-medium text-slate-900">
                  E-Mail-Adresse
                </label>
                <input
                  id="reset-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="max@firma.de"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" aria-hidden />Wird gesendet…</>
                ) : "Reset-Link anfordern"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
