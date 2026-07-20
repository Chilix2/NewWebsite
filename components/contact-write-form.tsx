"use client";

import React, { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

export type ContactFormCopy = {
  form_title: string;
  form_desc: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  send: string;
  form_success: string;
  form_error: string;
  email_label: string;
  email_value: string;
  hours_label: string;
  hours_value: string;
};

export function ContactWriteForm({ copy }: { copy: ContactFormCopy }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          message: fd.get("message"),
        }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("ok");
      e.currentTarget.reset();
    } catch {
      setStatus("err");
    }
  };

  return (
    <div className="rounded-[28px] bg-[#f7f4ee] p-6 sm:p-8 h-full flex flex-col">
      <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">{copy.form_title}</h3>
      <p className="mt-2 text-sm text-slate-500 leading-relaxed mb-6">{copy.form_desc}</p>

      {status === "ok" ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center py-8">
          <CheckCircle2 className="w-10 h-10 text-primary" />
          <p className="font-semibold text-slate-900">{copy.form_success}</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4 flex-1 flex flex-col">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{copy.name}</label>
            <input
              name="name"
              required
              className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40 touch-manipulation"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{copy.email}</label>
            <input
              name="email"
              type="email"
              required
              className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40 touch-manipulation"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{copy.phone}</label>
            <input
              name="phone"
              type="tel"
              className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40 touch-manipulation"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-1">{copy.message}</label>
            <textarea
              name="message"
              required
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40 touch-manipulation resize-y min-h-[100px]"
            />
          </div>
          {status === "err" && <p className="text-sm text-red-600">{copy.form_error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all touch-manipulation disabled:opacity-60"
          >
            {status === "sending" && <Loader2 className="w-4 h-4 animate-spin" />}
            {copy.send}
          </button>
        </form>
      )}

      <div className="mt-8 pt-6 border-t border-slate-900/10 grid sm:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="font-semibold text-slate-900">{copy.email_label}</p>
          <a href={`mailto:${copy.email_value}`} className="text-primary hover:underline">
            {copy.email_value}
          </a>
        </div>
        <div>
          <p className="font-semibold text-slate-900">{copy.hours_label}</p>
          <p className="text-slate-500">{copy.hours_value}</p>
        </div>
      </div>
    </div>
  );
}
