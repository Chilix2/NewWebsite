import { getDictionary } from "@/lib/dictionary";
import {
  SierraHero,
  Section,
  SectionHead,
  CtaBand,
  Reveal,
} from "@/components/sierra/page-kit";
import { cn } from "@/lib/utils";
import { getIndustryTheme } from "@/lib/industry-themes";
import { BrandOrbit, type OrbitVariant } from "@/components/brand-orbit";

const INDUSTRY_BRANDS: Record<string, { name: string; domain: string }[]> = {
  legal: [
    // Top 6 Anwaltskanzlei
    { name: "RA-MICRO", domain: "ra-micro.de" },
    { name: "Advoware", domain: "advoware.de" },
    { name: "Actaport", domain: "actaport.de" },
    { name: "AdvoSoft", domain: "advosoft.de" },
    { name: "Anwalt.de", domain: "anwalt.de" },
    { name: "ReNoStar", domain: "renostar.de" },
    // Top 6 Steuerberatung
    { name: "DATEV", domain: "datev.de" },
    { name: "ADDISON", domain: "addison.de" },
    { name: "Agenda", domain: "agenda-software.de" },
    { name: "Simba", domain: "simba.de" },
    { name: "Stotax", domain: "stotax.de" },
    { name: "Lexware", domain: "lexware.de" },
  ],
  hotels: [
    { name: "Opera PMS", domain: "oracle.com" },
    { name: "Mews", domain: "mews.com" },
    { name: "SiteMinder", domain: "siteminder.com" },
    { name: "Protel", domain: "protel.net" },
    { name: "Cloudbeds", domain: "cloudbeds.com" },
    { name: "Apaleo", domain: "apaleo.com" },
    { name: "Hotelkit", domain: "hotelkit.net" },
    { name: "RoomRaccoon", domain: "roomraccoon.com" },
    { name: "Clock PMS+", domain: "clock-software.com" },
    { name: "Guestline", domain: "guestline.com" },
    { name: "Sirvoy", domain: "sirvoy.com" },
    { name: "Little Hotelier", domain: "littlehotelier.com" },
    { name: "Amadeus", domain: "amadeus.com" },
    { name: "Shiji", domain: "shiji.com" },
    { name: "D-EDGE", domain: "d-edge.com" },
    { name: "StayNTouch", domain: "stayntouch.com" },
  ],
  restaurants: [
    { name: "SevenRooms", domain: "sevenrooms.com" },
    { name: "OpenTable", domain: "opentable.com" },
    { name: "TheFork", domain: "thefork.com" },
    { name: "Gastrofix", domain: "gastrofix.com" },
    { name: "Amadeus360", domain: "amadeus-hospitality.com" },
    { name: "Resmio", domain: "resmio.com" },
    { name: "Resy", domain: "resy.com" },
    { name: "Toast", domain: "toasttab.com" },
    { name: "Orderbird", domain: "orderbird.com" },
    { name: "Lightspeed", domain: "lightspeedhq.com" },
    { name: "Deliverect", domain: "deliverect.com" },
    { name: "Lieferando", domain: "lieferando.de" },
    { name: "Square", domain: "squareup.com" },
    { name: "Formitable", domain: "formitable.com" },
    { name: "CoverManager", domain: "covermanager.com" },
    { name: "Bookatable", domain: "bookatable.com" },
  ],
  healthcare: [
    { name: "CGM", domain: "cgm.com" },
    { name: "Medatixx", domain: "medatixx.de" },
    { name: "doctolib", domain: "doctolib.de" },
    { name: "SAM", domain: "sam-system.de" },
    { name: "Tomedo", domain: "tomedo.de" },
    { name: "RED Medical", domain: "redmedical.de" },
    { name: "jameda", domain: "jameda.de" },
    { name: "Samedi", domain: "samedi.de" },
    { name: "ALBIS", domain: "albis-online.de" },
    { name: "Charly", domain: "solutio.de" },
    { name: "Epikur", domain: "epikur.de" },
    { name: "TeleClinic", domain: "teleclinic.com" },
    { name: "Ada Health", domain: "ada.com" },
    { name: "Zava", domain: "zavamed.com" },
    { name: "Medikit", domain: "medikit.de" },
    { name: "IVENA", domain: "ivena.de" },
  ],
};

/** One orbit style per industry so we can pick a winner */
const INDUSTRY_ORBIT: Record<string, OrbitVariant> = {
  legal: "tilt3d",
  hotels: "spiralTilt",
  restaurants: "spiral",
  healthcare: "tilt3d",
};

const BUSINESS_BRANDS: { name: string; domain: string }[] = [
  { name: "Freshsales", domain: "freshworks.com" },
  { name: "HubSpot", domain: "hubspot.com" },
  { name: "Pipedrive", domain: "pipedrive.com" },
  { name: "Zoho", domain: "zoho.com" },
  { name: "Google Calendar", domain: "calendar.google.com" },
  { name: "Microsoft 365", domain: "microsoft.com" },
  { name: "Apple Calendar", domain: "apple.com" },
  { name: "Calendly", domain: "calendly.com" },
  { name: "Slack", domain: "slack.com" },
  { name: "Microsoft Teams", domain: "teams.microsoft.com" },
  { name: "WhatsApp Business", domain: "whatsapp.com" },
  { name: "Telegram", domain: "telegram.org" },
];

/** Lilac fill for the business-tools orbit card */
const BUSINESS_THEME = {
  container: "from-[#ebe4f7] via-[#c9b6e8] to-[#9b7fd4]",
  blobA: "bg-[#7c5cbf]/20",
  blobB: "bg-[#5b3d9a]/12",
};

export default async function IntegrationenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = dict?.integrationen_page ?? {};

  const industryCards = [
    { key: "legal", title: t.legal_title },
    { key: "hotels", title: t.hotels_title },
    { key: "restaurants", title: t.restaurants_title },
    { key: "healthcare", title: t.healthcare_title },
  ];

  return (
    <div className="bg-white min-h-screen text-slate-900">
      <SierraHero
        kicker={t.badge}
        title1={t.heading_part1 ?? t.title}
        title2={t.heading_part2}
        subtitle={t.subtitle}
        ctaLabel={t.cta}
        ctaHref={`/${locale}/demo`}
      />

      <Section>
        <SectionHead kicker={t.industry_badge} title={t.industry_title} subtitle={t.industry_subtitle} />
        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
          {industryCards.map((card, i) => {
            const theme = getIndustryTheme(card.key);
            return (
              <Reveal key={card.key} delay={i * 0.06}>
                <div
                  className={cn(
                    "relative overflow-hidden rounded-[28px] p-6 sm:p-8 w-full aspect-square bg-gradient-to-tl shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] flex flex-col",
                    theme.container
                  )}
                >
                  <div className={cn("absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl pointer-events-none", theme.blobA)} />
                  <div className={cn("absolute -bottom-12 -left-8 w-48 h-48 rounded-full blur-3xl pointer-events-none", theme.blobB)} />

                  <h3 className="relative text-2xl sm:text-3xl font-semibold tracking-tight text-white z-10">
                    {card.title}
                  </h3>

                  <div className="relative flex-1 flex items-center justify-center min-h-0 py-4">
                    <BrandOrbit
                      brands={INDUSTRY_BRANDS[card.key] ?? []}
                      variant={INDUSTRY_ORBIT[card.key] ?? "spiralTilt"}
                    />
                  </div>
                </div>
              </Reveal>
            );
          })}

          <Reveal delay={0.24} className="sm:col-span-2 w-full">
            <div
              className={cn(
                "relative overflow-hidden rounded-[28px] p-6 sm:p-8 w-full aspect-[4/1] min-h-[280px] bg-gradient-to-tl shadow-[0_20px_50px_rgba(91,61,154,0.18),inset_0_1px_0_rgba(255,255,255,0.35)] flex flex-col isolate",
                BUSINESS_THEME.container
              )}
            >
              <div className={cn("absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl pointer-events-none", BUSINESS_THEME.blobA)} />
              <div className={cn("absolute -bottom-12 -left-8 w-48 h-48 rounded-full blur-3xl pointer-events-none", BUSINESS_THEME.blobB)} />

              <h3 className="relative text-2xl sm:text-3xl font-semibold tracking-tight text-white z-10">
                {t.business_title ?? "Business-Tools"}
              </h3>

              <div className="relative flex-1 flex items-center justify-center min-h-0 py-4 z-10">
                <BrandOrbit
                  brands={BUSINESS_BRANDS}
                  variant="chaos"
                  showLabel={false}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHead title={t.api_title} subtitle={t.api_subtitle} />
        <CtaBand
          title={t.cta_title}
          subtitle={t.cta_subtitle}
          primaryLabel={t.cta_demo}
          primaryHref={`/${locale}/demo`}
          secondaryLabel={t.api_docs}
          secondaryHref={`/${locale}/contact`}
        />
      </Section>
    </div>
  );
}
