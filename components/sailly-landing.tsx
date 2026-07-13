"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { 
  ArrowRight, 
  PhoneOff, 
  Clock, 
  Euro, 
  CheckCircle2, 
  Calendar, 
  Building2,
  Utensils,
  Stethoscope,
  Briefcase,
  Scale,
  TrendingUp,
  Heart,
  ShieldCheck,
  Star,
  Quote,
  Activity,
  Plus,
  Phone,
  Database,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FluidBackground } from "./fluid-background";
import { GlassCard } from "./ui/glass-card";
import { SaillyConversationPreview } from "./sailly-conversation-preview";
import { WorkflowAnimationSequence } from "./workflow-animation-sequence";
import { SaillyDashboardPreview } from "./sailly-dashboard-preview";
import { AudioDemoCard } from "./audio-demo-card";

interface LandingProps {
  dict: any;
  locale: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function SaillyLanding({ dict, locale }: LandingProps) {
  const audioElements = useRef<(HTMLAudioElement | null)[]>([]);

  const industries = [
    { key: 'hotels', icon: Building2, label: dict.nav.solutions.items.hotels, href: `/${locale}/loesungen/hotels` },
    { key: 'restaurants', icon: Utensils, label: dict.nav.solutions.items.restaurants, href: `/${locale}/loesungen/restaurants` },
    { key: 'medical', icon: Stethoscope, label: dict.nav.solutions.items.medical, href: `/${locale}/loesungen/medical` },
    { key: 'legal', icon: Scale, label: dict.nav.solutions.items.legal, href: `/${locale}/loesungen/legal` },
    { key: 'services', icon: Briefcase, label: dict.nav.solutions.items.services, href: `/${locale}/loesungen/services` },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <div className="flex flex-col min-h-dvh text-slate-900 relative overflow-hidden">
      <FluidBackground />
      
      {/* HERO SECTION */}
      <section data-testid="morph" className="relative pt-20 pb-12 lg:pt-48 lg:pb-32">
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 text-pink-600 font-bold text-sm tracking-wide uppercase shadow-sm">
                {dict.hero.eyebrow}
              </div>
              
              <h1 className="text-fluid-hero font-bold tracking-tight text-slate-900 leading-[1.1]">
                {dict.hero.title.split(',').map((part: string, i: number) => (
                  <span key={i} className="block">
                    {i === 0 ? part + ',' : <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">{part}</span>}
                  </span>
                ))}
              </h1>
              
              <p className="text-fluid-subtitle text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {dict.hero.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link href={`/${locale}/demo`}>
                  <button data-testid="cta" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-[0_10px_40px_-10px_rgba(236,72,153,0.5)] hover:scale-105 transition-all flex items-center justify-center gap-2">
                    {dict.hero.primary_cta} <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href={`/${locale}/produkt`}>
                  <button className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-700 border border-white/50 rounded-2xl font-bold text-lg hover:bg-white transition-all flex items-center justify-center">
                    {dict.hero.secondary_cta}
                  </button>
                </Link>
              </div>

              <div className="pt-8 flex flex-wrap justify-center lg:justify-start gap-4 text-sm font-medium text-slate-600">
                {Object.entries(dict.hero.badges).map(([key, label]: [string, any]) => (
                  <GlassCard key={key} intensity="sm" className="flex items-center gap-2 px-4 py-2 rounded-full">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {label}
                  </GlassCard>
                ))}
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-200 to-purple-200 blur-[80px] opacity-40 rounded-full scale-110 z-0" />
              <SaillyConversationPreview dict={dict} className="relative z-10 sm:scale-100 max-w-sm" />
            </m.div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 sm:py-24">
        <div className="container px-4 mx-auto">
          <GlassCard className="p-8 md:p-12 rounded-[2rem] bg-white/40 border-white/60">
            <p className="text-center text-slate-500 font-medium mb-10 uppercase tracking-widest text-xs">
              {dict.hero.stats.title}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
              {Object.entries(dict.hero.stats.items).map(([key, stat]: [string, any]) => (
                <div key={key} className="text-center">
                  <div className="text-fluid-h2 font-bold bg-clip-text text-transparent bg-gradient-to-br from-pink-600 to-purple-600 mb-2">{stat.value}</div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* INDUSTRIES GRID */}
      <section className="py-12 sm:py-24">
        <div className="container px-4 mx-auto">
          <p className="text-center text-slate-500 font-medium mb-8 uppercase tracking-widest text-xs">
            {dict.industries_eyebrow}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
            {industries.map((item) => (
              <Link key={item.key} href={item.href} className="group block text-center">
                <GlassCard hoverEffect className="p-6 flex flex-col items-center justify-center h-full bg-white/50">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm text-slate-400 group-hover:text-pink-500 transition-colors">
                    {(() => {
                      const IconComponent = item.icon;
                      return <IconComponent className="w-7 h-7" />;
                    })()}
                  </div>
                  <span className="font-bold text-slate-700 group-hover:text-pink-600 transition-colors">{item.label}</span>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEMS SECTION */}
      <section className="py-16 lg:py-24">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <div className="text-center mb-10 lg:mb-16 space-y-4">
            <span className="text-pink-600 font-bold uppercase tracking-wider text-sm">{dict.problems.badge}</span>
            <h2 className="text-fluid-h2 font-bold text-slate-900">{dict.problems.title}</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">{dict.problems.subtitle}</p>
          </div>

          <m.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { key: 'missed', icon: PhoneOff, color: 'text-orange-500', bg: 'bg-orange-50' },
              { key: 'stress', icon: Clock, color: 'text-red-500', bg: 'bg-red-50' },
              { key: 'cost', icon: Euro, color: 'text-amber-500', bg: 'bg-amber-50' },
            ].map((item) => (
              <m.div key={item.key} variants={fadeInUp}>
                <GlassCard hoverEffect className="p-8 h-full bg-white/60">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm", item.bg)}>
                    {(() => {
                      const IconComponent = item.icon;
                      return <IconComponent className={cn("w-7 h-7", item.color)} />;
                    })()}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{dict.problems.cards[item.key]?.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {dict.problems.cards[item.key]?.desc}
                  </p>
                </GlassCard>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-16 lg:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 lg:mb-16 space-y-4">
            <span className="text-pink-600 font-bold uppercase tracking-wider text-sm">{dict.howItWorks.badge}</span>
            <h2 className="text-fluid-h2 font-bold text-slate-900">{dict.howItWorks.title}</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">{dict.howItWorks.subtitle}</p>
          </div>
          
          <WorkflowAnimationSequence 
            steps={[
              {
                id: "answer",
                label: dict.howItWorks.steps.answer.title,
                icon: Phone,
                description: dict.howItWorks.steps.answer.desc
              },
              {
                id: "understand",
                label: dict.howItWorks.steps.understand.title,
                icon: Database,
                description: dict.howItWorks.steps.understand.desc
              },
              {
                id: "execute",
                label: dict.howItWorks.steps.execute.title,
                icon: MessageSquare,
                description: dict.howItWorks.steps.execute.desc
              }
            ]}
          />
        </div>
      </section>

      {/* VALUE PROPS SECTION */}
      <section className="py-12 sm:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <GlassCard variant="light" intensity="lg" className="p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-[2.5rem] bg-white/40 border-white/60">
            <div className="inline-block p-3 rounded-2xl bg-purple-100 text-purple-600 mb-4 sm:mb-6">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h2 className="text-fluid-h3 font-bold mb-4 sm:mb-6">{dict.value_props.title}</h2>
            <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 leading-relaxed max-w-3xl">
              {dict.value_props.subtitle}
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {Object.entries(dict.value_props.cards).map(([key, card]: [string, any]) => (
                <div key={key} className="flex gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-green-500 flex items-center justify-center shrink-0 shadow-sm text-white">
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">{card.title}</h4>
                    <p className="text-slate-500 text-xs sm:text-sm">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* LIVE DASHBOARD PREVIEW */}
      <section className="py-12 sm:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <GlassCard variant="light" intensity="lg" className="p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-[2.5rem] bg-white/40 border-white/60 overflow-hidden">
            <SaillyDashboardPreview dict={dict} />
          </GlassCard>
        </div>
      </section>

      {/* AUDIO SAMPLES SECTION */}
      <section className="py-16 lg:py-24">
        <div className="container px-4 md:px-6 mx-auto max-w-5xl">
          <GlassCard className="p-8 md:p-12 bg-white/30 border-white/40 rounded-[2.5rem] text-center">
            <div className="mb-10 lg:mb-12 space-y-4">
              <span className="text-pink-600 font-bold uppercase tracking-wider text-sm">{dict.audio_demo.badge}</span>
              <h2 className="text-fluid-h2 font-bold text-slate-900">{dict.audio_demo.title}</h2>
              <p className="text-slate-600 text-xl max-w-2xl mx-auto">
                {dict.audio_demo.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {dict.audio_demo.samples.map((sample: any, i: number) => {
                const scenarioKey = i === 0 ? "restaurant" : "medical";
                return (
                  <AudioDemoCard
                    key={i}
                    label={sample.label}
                    desc={sample.desc}
                    languageLabel={dict.audio_demo.language_label}
                    audioPath={`/audio/demos/${locale}-${scenarioKey}.mp3`}
                    onRegisterRef={(el) => { audioElements.current[i] = el; }}
                    onPauseOthers={() => {
                      audioElements.current.forEach((ref, idx) => {
                        if (idx !== i && ref) ref.pause();
                      });
                    }}
                  />
                );
              })}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* SECURITY & TRUST SECTION */}
      <section className="py-16 lg:py-24">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <div className="text-center mb-10 lg:mb-16 space-y-4">
            <span className="text-pink-600 font-bold uppercase tracking-wider text-sm">{dict.security_trust.badge}</span>
            <h2 className="text-fluid-h2 font-bold text-slate-900">{dict.security_trust.title}</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">{dict.security_trust.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dict.security_trust.features.map((feature: any, i: number) => (
              <GlassCard key={i} className="text-center p-6 bg-white/50">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-white to-pink-50 border border-white shadow-sm rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-8 h-8 text-pink-500" />
                </div>
                <h3 className="font-bold text-lg mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-16 lg:py-24">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <div className="text-center mb-10 lg:mb-16 space-y-4">
            <span className="text-pink-600 font-bold uppercase tracking-wider text-sm">{dict.testimonials.badge}</span>
            <h2 className="text-fluid-h2 font-bold text-slate-900">{dict.testimonials.title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {dict.testimonials.items.map((testimonial: any, i: number) => (
              <GlassCard key={i} className="p-8 bg-white/60 relative">
                <Quote className="w-8 h-8 text-pink-200 mb-4" />
                <p className="text-slate-700 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{testimonial.author}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                  <div className="text-xs text-slate-400">{testimonial.location}</div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-fluid-h2 font-bold text-slate-900 mb-6 leading-tight">
            {dict.cta_section.title}
          </h2>
          <p className="text-fluid-subtitle text-slate-600 mb-10">
            {dict.cta_section.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
             <Link href={`/${locale}/demo`}>
                <button className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-bold text-xl hover:shadow-[0_10px_40px_-10px_rgba(236,72,153,0.5)] hover:-translate-y-1 transition-all">
                  {dict.cta_section.demo}
                </button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <button className="w-full sm:w-auto px-10 py-5 bg-white/80 backdrop-blur-sm text-slate-700 border border-white/60 rounded-2xl font-bold text-xl hover:bg-white transition-all">
                  {dict.cta_section.contact}
                </button>
              </Link>
          </div>
          <p className="text-sm text-slate-500 font-medium">
            <CheckCircle2 className="w-4 h-4 inline me-2 text-green-500" />
            {dict.cta_section.guarantee}
          </p>
        </div>
      </section>
    </div>
    </LazyMotion>
  );
}
