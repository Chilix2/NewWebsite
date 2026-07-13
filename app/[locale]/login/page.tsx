import { Suspense } from "react";
import type { Metadata } from "next";
import LoginClient from "./login-client";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Anmelden – Sailly",
    description:
      "Melden Sie sich bei Ihrem Sailly-Konto an oder erstellen Sie ein neues Konto.",
    robots: { index: false },
  };
}

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center min-h-[calc(100dvh-5rem)]">
          <div className="w-8 h-8 rounded-full border-2 border-[#f97e70] border-t-transparent animate-spin" />
        </div>
      }
    >
      <LoginClient locale={locale} />
    </Suspense>
  );
}
