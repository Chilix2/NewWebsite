import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();
  const phone = String(body.phone || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  // Stub: log lead. Wire to CRM / email when CONTACT_WEBHOOK_URL is set.
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, source: "contact_form" }),
      });
    } catch (e) {
      console.error("[contact] webhook failed", e);
      return NextResponse.json({ error: "webhook_failed" }, { status: 502 });
    }
  } else {
    console.info("[contact] form submission", { name, email, phone, messageLen: message.length });
  }

  return NextResponse.json({ ok: true });
}
