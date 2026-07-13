import React from "react";
import { getDictionary } from "@/lib/dictionary";
import { SaillyLiveDemo } from "@/components/sailly-live-demo";
import { FluidBackground } from "@/components/fluid-background";

export default async function DemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const p = dict?.demo_page;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FluidBackground />
      <div className="relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left: Text content */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 text-pink-600 font-bold text-sm tracking-wide uppercase">
                {p?.badge || "Kostenlos Testen"}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                {p?.title || (locale === "de" ? "Erleben Sie Sailly live" : "Experience Sailly Live")}
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                {p?.subtitle ||
                  (locale === "de"
                    ? "Wählen Sie eine Branche, geben Sie Ihre Nummer ein — und Sailly ruft Sie an. Kostenlos und unverbindlich."
                    : "Choose an industry, enter your number — and Sailly will call you. Free and no obligation.")}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-500 justify-center lg:justify-start">
                <span className="flex items-center gap-1.5">✓ {locale === "de" ? "Echte KI-Konversation" : "Real AI conversation"}</span>
                <span className="flex items-center gap-1.5">✓ {locale === "de" ? "Auf Ihrem Telefon" : "On your phone"}</span>
                <span className="flex items-center gap-1.5">✓ {locale === "de" ? "Keine Registrierung" : "No registration"}</span>
              </div>
            </div>

            {/* Right: Phone UI */}
            <div className="flex justify-center lg:justify-end">
              <SaillyLiveDemo locale={locale} dict={dict} className="relative z-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
