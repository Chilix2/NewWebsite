import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

const COOKIE = "sailly_demo_used";
const LEADS = globalThis as typeof globalThis & {
  __saillyDemoLeads?: Map<string, { status: string; purpose: string; phone: string; createdAt: number }>;
};

function leads() {
  if (!LEADS.__saillyDemoLeads) LEADS.__saillyDemoLeads = new Map();
  return LEADS.__saillyDemoLeads;
}

/**
 * Start outbound call (demo or contact_intake).
 * Stub mode queues the lead when DEMO_LIVE_CALLS is not enabled.
 * Set DEMO_API_PROXY to forward to an external backend if available.
 */
export async function POST(req: Request) {
  const jar = await cookies();
  if (jar.get(COOKIE)?.value === "1") {
    return NextResponse.json({ error: "already_used" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const phoneNumber = String(body.phoneNumber || "").trim();
  if (!phoneNumber || !/^\+[1-9]\d{6,14}$/.test(phoneNumber.replace(/\s/g, ""))) {
    return NextResponse.json({ error: "invalid_phone" }, { status: 400 });
  }

  const purpose = String(body.purpose || "demo");
  const proxy = process.env.DEMO_API_PROXY;

  if (proxy) {
    try {
      const upstream = await fetch(`${proxy.replace(/\/$/, "")}/api/demo/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json", cookie: req.headers.get("cookie") || "" },
        body: JSON.stringify(body),
      });
      const data = await upstream.json().catch(() => ({}));
      const res = NextResponse.json(data, { status: upstream.status });
      if (upstream.ok) {
        res.cookies.set(COOKIE, "1", { path: "/", maxAge: 60 * 60 * 24 * 30, httpOnly: true, sameSite: "lax" });
      }
      return res;
    } catch (e) {
      console.error("[demo/initiate] proxy failed", e);
    }
  }

  const live = process.env.DEMO_LIVE_CALLS === "true";
  const leadId = randomUUID();
  const status = live ? "initiated" : "queued";

  leads().set(leadId, {
    status: live ? "ringing" : "queued",
    purpose,
    phone: phoneNumber,
    createdAt: Date.now(),
  });

  console.info("[demo/initiate]", { leadId, purpose, phoneNumber, status, industry: body.industry });

  const res = NextResponse.json({ leadId, status });
  res.cookies.set(COOKIE, "1", { path: "/", maxAge: 60 * 60 * 24 * 30, httpOnly: true, sameSite: "lax" });
  return res;
}
