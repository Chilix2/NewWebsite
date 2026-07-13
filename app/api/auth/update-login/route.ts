import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    await supabase
      .from("customer_profiles")
      .update({ last_login_at: new Date().toISOString() })
      .eq("id", user.id);
  }

  return NextResponse.json({ ok: true });
}
