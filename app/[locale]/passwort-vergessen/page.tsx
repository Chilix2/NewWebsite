import type { Metadata } from "next";
import PasswortVergessenClient from "./PasswortVergessenClient";

export const metadata: Metadata = {
  title: "Passwort vergessen – Sailly",
  robots: { index: false },
};

export default async function PasswortVergessenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <PasswortVergessenClient locale={locale} />;
}
