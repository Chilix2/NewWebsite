import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const COOKIE = "sailly_demo_used";

/** One free outbound call per browser session (cookie). */
export async function GET() {
  const jar = await cookies();
  const used = jar.get(COOKIE)?.value === "1";
  return NextResponse.json({ allowed: !used });
}
