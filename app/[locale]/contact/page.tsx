import { getDictionary } from "@/lib/dictionary";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: `${dict?.footer?.contact || "Kontakt"} – Sailly`,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const labels = {
    title: dict?.footer?.contact || "Kontakt",
    subtitle:
      locale === "de"
        ? "Nehmen Sie Kontakt auf. Wir freuen uns auf Ihre Nachricht."
        : "Get in touch. We look forward to hearing from you.",
    name: locale === "de" ? "Name" : "Name",
    email: "E-Mail",
    message: locale === "de" ? "Nachricht" : "Message",
    send: locale === "de" ? "Nachricht senden" : "Send message",
    emailLabel: "E-Mail",
    emailValue: "hallo@sailly.de",
    hoursLabel: locale === "de" ? "Geschäftszeiten" : "Business hours",
    hoursValue:
      locale === "de"
        ? "Mo–Fr: 09:00–18:00 Uhr"
        : "Mon–Fri: 9:00 AM – 6:00 PM CET",
    demoLabel: locale === "de" ? "Demo anfragen" : "Request a demo",
  };

  return (
    <main className="min-h-dvh bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12 space-y-3">
          <span className="text-pink-400 font-bold uppercase tracking-wider text-sm">
            {labels.title}
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            {labels.subtitle}
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <form
              className="space-y-5"
              action="mailto:hallo@sailly.de"
              method="POST"
              encType="text/plain"
            >
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  {labels.name}
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  {labels.email}
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  {labels.message}
                </label>
                <textarea
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-all duration-300"
              >
                {labels.send}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {labels.emailLabel}
              </h3>
              <a
                href="mailto:hallo@sailly.de"
                className="text-pink-300 hover:underline"
              >
                {labels.emailValue}
              </a>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {labels.hoursLabel}
              </h3>
              <p className="text-white/70">{labels.hoursValue}</p>
            </div>
            <div className="pt-4 border-t border-white/10">
              <Link
                href={`/${locale}/demo`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
              >
                {labels.demoLabel} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
