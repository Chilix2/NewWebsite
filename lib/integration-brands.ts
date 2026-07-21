export type IntegrationBrand = { name: string; domain: string };

export const INDUSTRY_BRANDS: Record<string, IntegrationBrand[]> = {
  legal: [
    { name: "RA-MICRO", domain: "ra-micro.de" },
    { name: "Advoware", domain: "advoware.de" },
    { name: "Actaport", domain: "actaport.de" },
    { name: "AdvoSoft", domain: "advosoft.de" },
    { name: "Anwalt.de", domain: "anwalt.de" },
    { name: "ReNoStar", domain: "renostar.de" },
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

export const BUSINESS_BRANDS: IntegrationBrand[] = [
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

/** Interleaved unique brands across industries + business tools for the homepage orbit. */
export function getAllIntegrationBrands(): IntegrationBrand[] {
  const lists = [
    INDUSTRY_BRANDS.legal,
    INDUSTRY_BRANDS.hotels,
    INDUSTRY_BRANDS.restaurants,
    INDUSTRY_BRANDS.healthcare,
    BUSINESS_BRANDS,
  ];
  const seen = new Set<string>();
  const out: IntegrationBrand[] = [];
  const maxLen = Math.max(...lists.map((l) => l.length));

  for (let i = 0; i < maxLen; i++) {
    for (const list of lists) {
      const brand = list[i];
      if (!brand || seen.has(brand.domain)) continue;
      seen.add(brand.domain);
      out.push(brand);
    }
  }
  return out;
}
