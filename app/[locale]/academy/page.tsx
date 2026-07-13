import { getDictionary } from "@/lib/dictionary";
import AcademyClient from "./AcademyClient";

export default async function AcademyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return <AcademyClient />;
}
