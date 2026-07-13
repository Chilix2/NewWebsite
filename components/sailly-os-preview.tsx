"use client";

import React from "react";
import {
  BarChart3,
  Calendar,
  LayoutDashboard,
  Phone,
  Settings,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SaillySignalLogo } from "./sailly-signal-logo";

interface SaillyOsPreviewProps {
  dict?: Record<string, unknown>;
  locale?: string;
}

/**
 * Product dashboard shell — sidebar navigation + today's overview.
 */
export function SaillyOsPreview({ dict, locale = "de" }: SaillyOsPreviewProps) {
  const t = (dict?.dashboard_preview ?? {}) as Record<string, string | string[]>;
  const os = (dict?.platform_os ?? {}) as Record<string, string>;

  const todayLabel = new Date().toLocaleDateString(
    locale === "en" ? "en-GB" : "de-DE",
    { day: "numeric", month: "long" }
  );

  const nav = [
    { label: os.nav_overview ?? "Übersicht", icon: LayoutDashboard, active: true },
    { label: os.nav_calls ?? "Anrufe", icon: Phone, active: false },
    { label: os.nav_appointments ?? "Termine", icon: Calendar, active: false },
    { label: os.nav_insights ?? "Auswertungen", icon: BarChart3, active: false },
  ];

  const manageNav = [
    { label: os.nav_setup ?? "Einrichtung", icon: SlidersHorizontal, active: false },
    { label: os.nav_settings ?? "Einstellungen", icon: Settings, active: false },
  ];

  const activities = (t.activities as string[]) ?? [
    "Tisch für 4 Personen — Samstag 19:00",
    "Zimmeranfrage: Doppelzimmer Fr–So",
    "Termin eingetragen — Fr 08:30",
  ];

  const chartHeights = [32, 48, 41, 55, 50, 62, 58];

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="flex min-h-[400px] sm:min-h-[440px]">
        <aside className="hidden sm:flex w-[188px] lg:w-[208px] shrink-0 flex-col border-r border-slate-100 bg-slate-50 px-3 py-5">
          <div className="flex items-center gap-2 mb-7 px-1">
            <SaillySignalLogo size="sm" animated={false} />
            <span className="font-logo text-base text-[#f97e70] leading-none">Sailly</span>
          </div>

          <p className="px-2 mb-1.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
            {os.group_overview ?? "Überblick"}
          </p>
          <nav className="space-y-0.5 mb-5">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={cn(
                    "flex items-center gap-2 px-2.5 py-2 rounded-md text-[13px] font-medium",
                    item.active
                      ? "bg-white text-slate-900 border border-slate-200"
                      : "text-slate-500"
                  )}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  {item.label}
                </div>
              );
            })}
          </nav>

          <p className="px-2 mb-1.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
            {os.group_manage ?? "Verwalten"}
          </p>
          <nav className="space-y-0.5 mt-auto">
            {manageNav.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-md text-[13px] font-medium text-slate-500"
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  {item.label}
                </div>
              );
            })}
          </nav>
        </aside>

        <div className="flex-1 min-w-0 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                {t.title ?? "Live Übersicht"}
              </h3>
              <p className="text-sm text-slate-500 mt-0.5">
                {t.today ?? "Heute,"} {todayLabel}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-xs font-medium text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {t.systemActive ?? "Online"}
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
            {[
              { label: t.calls ?? "Anrufe", value: "47", note: "8 mehr als gestern", icon: Phone },
              {
                label: t.timeSaved ?? "Gesparte Zeit",
                value: "12h",
                note: "2h mehr als gestern",
                icon: TrendingUp,
              },
              {
                label: os.stat_bookings ?? "Buchungen",
                value: "18",
                note: "3 mehr als gestern",
                icon: Calendar,
                wide: true,
              },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={cn(
                    "rounded-lg border border-slate-100 p-3",
                    stat.wide && "col-span-2 lg:col-span-1"
                  )}
                >
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium">{stat.label}</span>
                  </div>
                  <div className="text-xl font-semibold text-slate-900 tabular-nums">{stat.value}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{stat.note}</div>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-5 gap-3">
            <div className="lg:col-span-3 rounded-lg border border-slate-100 p-3.5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-slate-700">
                  {t.callVolume ?? "Anrufvolumen"}
                </h4>
                <span className="text-[10px] text-slate-400">heute</span>
              </div>
              <div className="h-20 sm:h-24 flex items-end justify-between gap-1">
                {chartHeights.map((h, i) => (
                  <div key={i} className="flex-1 h-full flex items-end">
                    <div
                      className={cn(
                        "w-full rounded-sm",
                        i === chartHeights.length - 2 ? "bg-primary" : "bg-slate-200"
                      )}
                      style={{ height: `${h}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 rounded-lg border border-slate-100 p-3.5">
              <h4 className="text-sm font-medium text-slate-700 mb-3">
                {t.lastActivity ?? "Letzte Aktivitäten"}
              </h4>
              <ul className="space-y-2.5">
                {activities.map((text, i) => (
                  <li key={i} className="text-[13px] text-slate-600 leading-snug border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
