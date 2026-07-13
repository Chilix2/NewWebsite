import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "This endpoint is deprecated. Authentication is now handled client-side via Supabase." },
    { status: 410 }
  );
}
