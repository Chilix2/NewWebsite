import { getDictionary } from "@/lib/dictionary";
// import { SaillyLanding } from "@/components/sailly-landing"; // OLD — keep for rollback
import { SaillyLandingV2 } from "@/components/sailly-landing-v2";

export default async function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <SaillyLandingV2 dict={dict} locale={locale} />;
}