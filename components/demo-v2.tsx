"use client";



import React, { useRef } from "react";

import { LazyMotion, domAnimation, m } from "framer-motion";

import { SaillyConversationPreview } from "./sailly-conversation-preview";

import { AudioDemoCard } from "./audio-demo-card";

import { SaillyHowItWorksSection } from "./sailly-how-it-works-section";



interface DemoV2Props {

  dict: any;

  locale: string;

}



const STEP_KEYS = ["answer", "understand", "execute"] as const;



export function DemoV2({ dict, locale }: DemoV2Props) {

  const audioElements = useRef<(HTMLAudioElement | null)[]>([]);

  const howItWorks = dict.howItWorks ?? {};

  const audioDemo = dict.audio_demo ?? {};



  const steps = STEP_KEYS.map((key) => ({

    title: howItWorks.steps?.[key]?.title ?? key,

    desc: howItWorks.steps?.[key]?.desc ?? "",

  }));



  return (

    <LazyMotion features={domAnimation}>

      <section className="bg-[#faf7f4] py-20 lg:py-28">

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <SaillyHowItWorksSection

            badge={howItWorks.badge ?? "Funktionsweise"}

            title={howItWorks.title ?? "Wie Sailly funktioniert"}

            subtitle={

              howItWorks.subtitle ??

              "Vom Klingeln bis zur Buchung — in einem Gespräch, ohne Warteschleife."

            }

            steps={steps}

            variant="homepage"

            asideCaption={

              howItWorks.try_subtitle ??

              "Sehen Sie, wie ein echtes Gespräch mit Sailly aussieht."

            }

            aside={<SaillyConversationPreview dict={dict} />}

          />

        </div>

      </section>



      {audioDemo.samples && audioDemo.samples.length > 0 && (

        <section className="bg-white py-20 lg:py-28">

          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            <m.div

              initial={{ opacity: 0, y: 20 }}

              whileInView={{ opacity: 1, y: 0 }}

              viewport={{ once: true }}

              className="text-center mb-10"

            >

              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">

                {audioDemo.badge ?? "Audio Demo"}

              </p>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">

                {audioDemo.title ?? "Hören Sie den Unterschied"}

              </h3>

              {audioDemo.subtitle && (

                <p className="mt-2 text-slate-500">{audioDemo.subtitle}</p>

              )}

            </m.div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">

              {audioDemo.samples.map((sample: any, i: number) => {

                const scenarioKey = i === 0 ? "restaurant" : "hotel";

                return (

                  <AudioDemoCard

                    key={i}

                    label={sample.label}

                    desc={sample.desc}

                    languageLabel={audioDemo.language_label}

                    audioPath={`/audio/demos/${locale}-${scenarioKey}.mp3`}

                    onRegisterRef={(el) => {

                      audioElements.current[i] = el;

                    }}

                    onPauseOthers={() => {

                      audioElements.current.forEach((ref, idx) => {

                        if (idx !== i && ref) ref.pause();

                      });

                    }}

                  />

                );

              })}

            </div>

          </div>

        </section>

      )}

    </LazyMotion>

  );

}

