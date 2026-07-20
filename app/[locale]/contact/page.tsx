import { getDictionary } from "@/lib/dictionary";
import type { Metadata } from "next";
import {
  SierraHero,
  Section,
  CtaBand,
  Reveal,
} from "@/components/sierra/page-kit";
import { ContactVoiceIntake } from "@/components/contact-voice-intake";
import { ContactWriteForm } from "@/components/contact-write-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = dict?.contact_page ?? {};
  return {
    title: `${t.badge || dict?.nav?.company?.items?.contact || "Kontakt"} – Sailly`,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = dict?.contact_page ?? {};

  return (
    <div className="bg-white min-h-screen text-slate-900">
      <SierraHero
        kicker={t.badge}
        title1={t.heading_part1 ?? "Kontakt"}
        title2={t.heading_part2}
        subtitle={t.subtitle}
        ctaLabel={t.hero_cta}
        ctaHref="#voice"
      />

      <Section>
        <div id="voice" className="grid md:grid-cols-2 gap-5 lg:gap-6 scroll-mt-28">
          <Reveal>
            <ContactVoiceIntake
              locale={locale}
              copy={{
                voice_title: t.voice_title ?? "Talk to Sailly",
                voice_desc: t.voice_desc ?? "",
                phone_label: t.phone_label ?? "Phone",
                phone_placeholder: t.phone_placeholder ?? "+49 …",
                phone_hint: t.phone_hint ?? "",
                privacy_note: t.privacy_note ?? "",
                start_call: t.start_call ?? "Call me",
                calling: t.calling ?? "Calling…",
                ringing: t.ringing ?? "Ringing…",
                connected: t.connected ?? "Connected",
                ended: t.ended ?? "Ended",
                error: t.error ?? "Error",
                success_title: t.success_title ?? "Thanks",
                success_detail: t.success_detail ?? "",
                cta_back: t.cta_back ?? "Back",
              }}
            />
          </Reveal>
          <Reveal delay={0.06}>
            <ContactWriteForm
              copy={{
                form_title: t.form_title ?? "Write to us",
                form_desc: t.form_desc ?? "",
                name: t.name ?? "Name",
                email: t.email ?? "Email",
                phone: t.phone ?? "Phone",
                message: t.message ?? "Message",
                send: t.send ?? "Send",
                form_success: t.form_success ?? "Sent",
                form_error: t.form_error ?? "Error",
                email_label: t.email_label ?? "Email",
                email_value: t.email_value ?? "hallo@sailly.de",
                hours_label: t.hours_label ?? "Hours",
                hours_value: t.hours_value ?? "",
              }}
            />
          </Reveal>
        </div>
      </Section>

      <Section>
        <CtaBand
          title={t.cta_title ?? "Live Demo"}
          subtitle={t.cta_subtitle}
          primaryLabel={t.cta_demo ?? "Live Demo"}
          primaryHref={`/${locale}/demo`}
        />
      </Section>
    </div>
  );
}
