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

interface IndustryCard {
  key: string;
  video: string;
  title: string;
  label: string;
  desc: string;
  href: string;
}

/**
 * Sierra industries-overview pattern: cinematic footage in rounded frames,
 * caption below the media (never overlaid), each card a doorway to a subpage.
 *
 * Layout (all five industries):
 *   Row 1 — two large square frames (Hotels, Restaurants)
 *   Row 2 — three landscape 4:3 frames (Praxen, Kanzleien, Dienstleister)
 */
export function IndustriesV2({ dict, locale }: IndustriesV2Props) {
  const industries = dict.industries ?? {};
  const navItems = dict.nav?.solutions?.items ?? {};

  const firstChallenge = (key: string, fallback: string) =>
    industries[key]?.challenges?.items?.[0]?.desc ?? fallback;

  const squareCards: IndustryCard[] = [
    {
      key: "hotels",
      video: "/videos/hotel-homepage-v2.mp4",
      title: industries.hotels?.hero?.title ?? "Hotellerie",
      label: navItems.hotels ?? "Hotels",
      desc: firstChallenge(
        "hotels",
        "Ihr Rezeptionsteam bleibt beim Gast — Sailly übernimmt das Telefon."
      ),
      href: `/${locale}/loesungen/hotels`,
    },
    {
      key: "restaurants",
      video: "/videos/restaurant-guests.mp4?v=1",
      title: industries.restaurants?.hero?.title ?? "Gastronomie",
      label: navItems.restaurants ?? "Restaurants",
      desc: firstChallenge(
        "restaurants",
        "Reservierungen ohne Klingeln im Gastraum — Sie bleiben der Gastgeber."
      ),
      href: `/${locale}/loesungen/restaurants`,
    },
  ];

  const wideCards: IndustryCard[] = [
    {
      key: "medical",
      video: "/videos/praxis-reception.mp4?v=2",
      title: industries.medical?.hero?.title ?? "Praxen",
      label: navItems.medical ?? "Praxen",
      desc: firstChallenge(
        "medical",
        "Ihre MFAs sind für die Menschen in der Praxis da. Das Telefon übernimmt Sailly."
      ),
      href: `/${locale}/loesungen/medical`,
    },
    {
      key: "legal",
      video: "/videos/legal-justice.mp4",
      title: industries.legal?.hero?.title ?? "Kanzleien & Steuerberatung",
      label: navItems.legal ?? "Kanzleien & Steuerberatung",
      desc: firstChallenge(
        "legal",
        "Wenn das Telefon klingelt, unterbricht es die Aktenarbeit. Sailly nimmt Anfragen auf."
      ),
      href: `/${locale}/loesungen/legal`,
    },
    {
      key: "services",
      video: "/videos/services-2.mp4",
      title: industries.services?.hero?.title ?? "Dienstleister & KMU",
      label: navItems.services ?? "Dienstleister",
      desc: firstChallenge(
        "services",
        "Studios, Handwerk und Dienstleister: Jeder Anruf wird angenommen — auch mitten im Termin."
      ),
      href: `/${locale}/loesungen/services`,
    },
  ];

  const renderCard = (card: IndustryCard, i: number, frameClass: string) => (
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
          className={`${frameClass} group-hover:opacity-95 transition-opacity`}
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
  );

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

          {/* Row 1 — two square doorways */}
          <div className="grid gap-10 lg:gap-8 sm:grid-cols-2">
            {squareCards.map((card, i) =>
              renderCard(card, i, "aspect-[4/5] sm:aspect-square lg:aspect-square")
            )}
          </div>

          {/* Row 2 — three 4:3 doorways */}
          <div className="mt-12 lg:mt-14 grid gap-10 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {wideCards.map((card, i) =>
              renderCard(card, i + 2, "aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/3]")
            )}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
