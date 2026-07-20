/**
 * Industry scenario chat-container themes.
 * Single source for loesungen scenario cards + produkt/integrationen cards.
 */
export interface IndustryTheme {
  container: string;
  blobA: string;
  blobB: string;
  agentCard: string;
  guestCard: string;
  widgetCard: string;
  accent: string;
  /** Soft fill for challenges / benefits / ROI panels */
  panel: string;
}

export const INDUSTRY_THEMES: Record<string, IndustryTheme> = {
  hotels: {
    container: "from-[#e8dcc8] via-[#d9c9a8] to-[#c4ad82]",
    blobA: "bg-[#b8956a]/25",
    blobB: "bg-[#8b6914]/15",
    agentCard: "bg-[#5c4a3a]/60",
    guestCard: "bg-black/40",
    widgetCard: "bg-[#5c4a3a]/50",
    accent: "#8b6914",
    panel: "bg-[#e8dcc8]",
  },
  restaurants: {
    container: "from-[#fde8df] via-[#f5c4b0] to-[#e8957a]",
    blobA: "bg-[#e07a5f]/20",
    blobB: "bg-[#c45c3e]/15",
    agentCard: "bg-[#6b3d32]/55",
    guestCard: "bg-black/38",
    widgetCard: "bg-[#6b3d32]/48",
    accent: "#c45c3e",
    panel: "bg-[#fde8df]",
  },
  medical: {
    container: "from-[#dcefe8] via-[#b8ddd0] to-[#8ec4b0]",
    blobA: "bg-[#4a9b8e]/20",
    blobB: "bg-[#2d6f63]/12",
    agentCard: "bg-[#2d5a52]/58",
    guestCard: "bg-black/36",
    widgetCard: "bg-[#2d5a52]/48",
    accent: "#2d6f63",
    panel: "bg-[#dcefe8]",
  },
  /** Alias used on integrations page */
  healthcare: {
    container: "from-[#dcefe8] via-[#b8ddd0] to-[#8ec4b0]",
    blobA: "bg-[#4a9b8e]/20",
    blobB: "bg-[#2d6f63]/12",
    agentCard: "bg-[#2d5a52]/58",
    guestCard: "bg-black/36",
    widgetCard: "bg-[#2d5a52]/48",
    accent: "#2d6f63",
    panel: "bg-[#dcefe8]",
  },
  legal: {
    container: "from-[#dde3f0] via-[#b8c4dc] to-[#8a9bc4]",
    blobA: "bg-[#4c5c8a]/18",
    blobB: "bg-[#2e3a5c]/12",
    agentCard: "bg-[#2e3a5c]/58",
    guestCard: "bg-black/38",
    widgetCard: "bg-[#2e3a5c]/48",
    accent: "#2e3a5c",
    panel: "bg-[#dde3f0]",
  },
  services: {
    container: "from-[#ebe4f7] via-[#c9b6e8] to-[#9b7fd4]",
    blobA: "bg-[#7c5cbf]/20",
    blobB: "bg-[#5b3d9a]/12",
    agentCard: "bg-[#5b3d9a]/55",
    guestCard: "bg-black/38",
    widgetCard: "bg-[#5b3d9a]/48",
    accent: "#5b3d9a",
    panel: "bg-[#ebe4f7]",
  },
};

export function getIndustryTheme(industryKey: string): IndustryTheme {
  return INDUSTRY_THEMES[industryKey] ?? INDUSTRY_THEMES.services;
}
