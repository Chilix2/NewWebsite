import { NextResponse } from "next/server";

/**
 * Pre-flight before spending Twilio credits.
 * When DEMO_LIVE_CALLS=true and Twilio env is set, reports PASS;
 * otherwise PASS with mode=stub so UI can still proceed in queued mode.
 */
export async function GET() {
  const live = process.env.DEMO_LIVE_CALLS === "true";
  const hasTwilio = Boolean(
    process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_PHONE_NUMBER
  );

  const checks = {
    env: { pass: true },
    twilio: { pass: !live || hasTwilio, detail: live && !hasTwilio ? "missing TWILIO_*" : "ok" },
  };

  const overall = Object.values(checks).every((c) => c.pass) ? "PASS" : "FAIL";

  return NextResponse.json({
    overall,
    mode: live && hasTwilio ? "live" : "stub",
    checks,
  });
}
