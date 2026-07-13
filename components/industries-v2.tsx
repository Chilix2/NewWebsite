"use client";

import React from "react";
import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CinemaFrame } from "./cinema-frame";

interface IndustriesV2Props {
  dict: any;
  locale: string;
}

/**
 * Sierra industries-overview pattern: cinematic footage in rounded frames,
 * caption below the media (never overlaid), each card a doorway to a subpage.
 */
export function IndustriesV2({ dict, locale }: IndustriesV2Props) {
  const industries = dict.industries ?? {};

  const cards = [
    {
      key: "hotels",
      video: "/videos/hotel-team.mp4?v=1",
      title: industries.hotels?.hero?.title ?? "Hotellerie",
      label: dict.nav?.solutions?.items?.hotels ?? "Hotels",
      desc:
        industries.hotels?.challenges?.items?.[0]?.desc ??
        "Ihr Rezeptionsteam bleibt beim Gast — Sailly übernimmt das Telefon.",
      href: `/${locale}/loesungen/hotels`,
    },
    {
      key: "restaurants",
      video: "/videos/restaurant-guests.mp4?v=1",
      title: industries.restaurants?.hero?.title ?? "Gastronomie",
      label: dict.nav?.solutions?.items?.restaurants ?? "Restaurants",
      desc:
        industries.restaurants?.challenges?.items?.[0]?.desc ??
        "Reservierungen ohne Klingeln im Gastraum — Sie bleiben der Gastgeber.",
      href: `/${locale}/loesungen/restaurants`,
    },
    {
      key: "medical",
      video: "/videos/praxis-reception.mp4?v=1",
      title: industries.medical?.hero?.title ?? "Praxen",
      label: dict.nav?.solutions?.items?.medical ?? "Praxen",
      desc:
        industries.medical?.challenges?.items?.[0]?.desc ??
        "Ihre MFAs sind für die Menschen in der Praxis da. Das Telefon übernimmt Sailly.",
      href: `/${locale}/loesungen/medical`,
    },
    {
      key: "legal",
      video: "/videos/legal-office.mp4?v=1",
      title: industries.legal?.hero?.title ?? "Kanzleien & Steuerberatung",
      label: dict.nav?.solutions?.items?.legal ?? "Kanzleien & Steuerberatung",
      desc:
        industries.legal?.challenges?.items?.[0]?.desc ??
        "Wenn das Telefon klingelt, unterbricht es die Aktenarbeit. Sailly nimmt Anfragen auf.",
      href: `/${locale}/loesungen/legal`,
    },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              {dict.industries_section_title ?? "Für Betriebe, in denen das Telefon nie stillsteht."}
            </h2>
          </m.div>

          <div className="grid gap-10 lg:gap-8 sm:grid-cols-2">
            {cards.map((card, i) => (
              <m.div
                key={card.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
              >
                <Link href={card.href} className="group block" data-testid={`industry-card-${card.key}`}>
                  <CinemaFrame
                    src={card.video}
                    className="aspect-[4/5] sm:aspect-[4/5] lg:aspect-[4/5] group-hover:opacity-95 transition-opacity"
                    aspect="adaptive"
                  />
                  <div className="mt-5">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      {card.label}
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{card.desc}</p>
                  </div>
                </Link>
              </m.div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href={`/${locale}/loesungen/services`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-primary transition-colors min-h-[44px]"
            >
              {dict.industries_more_label ?? "Auch für Handwerk, Studios und Dienstleister"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
