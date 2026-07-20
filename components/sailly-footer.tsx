"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Twitter, Linkedin, Instagram, Facebook } from "lucide-react";
import { SoundWaveSeparator } from "./ui/sound-wave-separator";
import { SaillyLogoLockup } from "./sailly-signal-logo";

interface FooterProps {
  dict?: any;
  locale?: string;
}

export function SaillyFooter({ dict, locale }: FooterProps) {
  const [currentYear, setCurrentYear] = useState(2026);
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative mt-auto z-20">
      {/* Sound Wave Separator */}
      <SoundWaveSeparator />
      
      <div className="bg-white/40 backdrop-blur-md border-t border-white/50 text-slate-600 pb-16 pt-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <Link href={`/${locale || ""}`} className="inline-block relative group">
                <SaillyLogoLockup wordmarkClass="text-2xl" />
              </Link>
              <p className="text-slate-600 mb-8 max-w-sm mt-4">
                {dict?.footer?.tagline || "Die KI-Telefonzentrale für den deutschen Mittelstand. Beantwortet Anrufe, vereinbart Termine und entlastet Ihr Team – 24/7."}
              </p>
              <div className="flex gap-4">
                 {/* Social links with 48px touch targets */}
                 <a href="#" className="p-3 bg-white/60 border border-white/50 rounded-full hover:bg-white transition-colors text-[#ff9b8a] shadow-sm" aria-label="LinkedIn"><Linkedin size={20} /></a>
                 <a href="#" className="p-3 bg-white/60 border border-white/50 rounded-full hover:bg-white transition-colors text-[#ff9b8a] shadow-sm" aria-label="Twitter"><Twitter size={20} /></a>
                 <a href="#" className="p-3 bg-white/60 border border-white/50 rounded-full hover:bg-white transition-colors text-[#ff9b8a] shadow-sm" aria-label="Instagram"><Instagram size={20} /></a>
              </div>
            </div>

            <div>
              <h3 className="text-slate-900 font-bold mb-6">{dict?.nav?.product?.title || "Produkt"}</h3>
              <ul className="space-y-4">
                <li><Link href={`/${locale}/produkt`} className="hover:text-[#ff9b8a] transition-colors">{dict?.nav?.product?.items?.voice_agent || "Sailly Voice Agent"}</Link></li>
                <li><Link href={`/${locale}/produkt/integrationen`} className="hover:text-[#ff9b8a] transition-colors">{dict?.nav?.product?.items?.integrations || "Integrationen"}</Link></li>
                <li><Link href={`/${locale}/produkt/data-insights`} className="hover:text-[#ff9b8a] transition-colors">{dict?.nav?.product?.items?.data_insights || "Daten & Insights"}</Link></li>
                <li><Link href={`/${locale}/produkt/security-compliance`} className="hover:text-[#ff9b8a] transition-colors">{dict?.nav?.product?.items?.security || "Sicherheit & Compliance"}</Link></li>
                <li><Link href={`/${locale}/produkt/languages`} className="hover:text-[#ff9b8a] transition-colors">{dict?.nav?.product?.items?.languages || "Sprachen"}</Link></li>
                <li><Link href={`/${locale}/produkt/strategic-partners`} className="hover:text-[#ff9b8a] transition-colors">{dict?.nav?.product?.items?.partners || "Strategische Partner"}</Link></li>
                <li><Link href={`/${locale}/preise`} className="hover:text-[#ff9b8a] transition-colors">{dict?.nav?.pricing || "Preise"}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-slate-900 font-bold mb-6">{dict?.nav?.solutions?.title || "Lösungen"}</h3>
              <ul className="space-y-4">
                <li><Link href={`/${locale}/loesungen/hotels`} className="hover:text-[#ff9b8a] transition-colors">{dict?.nav?.solutions?.items?.hotels || "Hotellerie"}</Link></li>
                <li><Link href={`/${locale}/loesungen/medical`} className="hover:text-[#ff9b8a] transition-colors">{dict?.nav?.solutions?.items?.medical || "Arztpraxen"}</Link></li>
                <li><Link href={`/${locale}/loesungen/restaurants`} className="hover:text-[#ff9b8a] transition-colors">{dict?.nav?.solutions?.items?.restaurants || "Gastronomie"}</Link></li>
                <li><Link href={`/${locale}/loesungen/legal`} className="hover:text-[#ff9b8a] transition-colors">{dict?.nav?.solutions?.items?.legal || "Kanzleien & Steuerberatung"}</Link></li>
                <li><Link href={`/${locale}/loesungen/services`} className="hover:text-[#ff9b8a] transition-colors">{dict?.nav?.solutions?.items?.services || "Dienstleister & KMU"}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-slate-900 font-bold mb-6">{dict?.footer?.legal || "Rechtliches"}</h3>
              <ul className="space-y-4">
                <li><Link href={`/${locale}/impressum`} className="hover:text-[#ff9b8a] transition-colors">{dict?.footer?.imprint || "Impressum"}</Link></li>
                <li><Link href={`/${locale}/datenschutz`} className="hover:text-[#ff9b8a] transition-colors">{dict?.footer?.privacy || "Datenschutz"}</Link></li>
                <li><Link href={`/${locale}/agb`} className="hover:text-[#ff9b8a] transition-colors">{dict?.footer?.agb || "AGB"}</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/30 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
               {dict?.footer?.copyright || `© ${currentYear} Sailly. Alle Rechte vorbehalten.`}
            </p>
            <div className="flex gap-6 text-sm">
               <span className="text-slate-600">{dict?.footer?.made_in_germany || "Made in Germany 🇩🇪"}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
