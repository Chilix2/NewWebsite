import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { WebVitalsReporter } from "@/components/web-vitals-reporter";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sailly.de"),
  title: "Sailly – We Handle the Calls. You Run Your Business.",
  description: "90% Standardanfragen. 100% automatisiert. Die KI-Telefonzentrale für Hotels, Praxen und Restaurants.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Sailly",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "m-sHk7eqrUJnPziDPiNHqRIM1KONu74OcM_KcaQvrgM",
  },
  openGraph: {
    type: "website",
    siteName: "Sailly",
    title: "Sailly – We Handle the Calls. You Run Your Business.",
    description: "Die KI-Telefonzentrale für Hotels, Praxen und Restaurants. 90% Standardanfragen automatisiert – 24/7.",
    url: "https://www.sailly.de",
    images: [
      {
        url: "https://www.sailly.de/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Sailly – AI Voice Front Desk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sailly – We Handle the Calls. You Run Your Business.",
    description: "Die KI-Telefonzentrale für Hotels, Praxen und Restaurants. 90% Standardanfragen automatisiert – 24/7.",
    images: ["https://www.sailly.de/opengraph-image.png"],
    creator: "@sailly_de",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Sailly",
    description: "Die KI-Telefonzentrale für Hotels, Praxen und Restaurants",
    url: "https://www.sailly.de",
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      url: "https://www.sailly.de/pricing",
      priceCurrency: "EUR",
      price: "0",
      priceValidUntil: "2026-12-31",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "142",
    },
    author: {
      "@type": "Organization",
      name: "Sailly",
      url: "https://www.sailly.de",
    },
    inLanguage: ["de", "en", "tr", "es", "ar", "zh", "ru", "pl", "fr", "el", "ko", "vi", "th"],
  };

  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Sailly" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`} suppressHydrationWarning>
        {children}
        <WebVitalsReporter />
      </body>
    </html>
  );
}
