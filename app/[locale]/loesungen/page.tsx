import { redirect } from "next/navigation";

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/loesungen/hotels`);
}
