import { redirect } from "next/navigation";

// Root /contact always redirects to the default locale version
export default function ContactRootPage() {
  redirect("/de/contact");
}
