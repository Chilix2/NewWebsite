import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "ClaudeBot",
          "Claude-User",
          "Claude-SearchBot",
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "PerplexityBot",
          "CopilotBot",
        ],
        allow: "/",
      },
      {
        userAgent: ["AhrefsBot", "SemrushBot", "MJ12bot"],
        disallow: "/",
      },
    ],
    sitemap: [
      "https://www.sailly.de/sitemap.xml",
      "https://www.sailly.de/de/sitemap.xml",
      "https://www.sailly.de/en/sitemap.xml",
    ],
    host: "https://www.sailly.de",
  };
}
