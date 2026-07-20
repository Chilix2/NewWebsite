import { NextResponse } from "next/server";

const LEADS = globalThis as typeof globalThis & {
  __saillyDemoLeads?: Map<
    string,
    { status: string; purpose: string; phone: string; createdAt: number; duration?: number }
  >;
};

function leads() {
  if (!LEADS.__saillyDemoLeads) LEADS.__saillyDemoLeads = new Map();
  return LEADS.__saillyDemoLeads;
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ leadId: string }> }
) {
  const { leadId } = await ctx.params;
  const lead = leads().get(leadId);

  if (!lead) {
    return NextResponse.json({ status: "completed", duration: 0 });
  }

  const age = Date.now() - lead.createdAt;
  if (lead.status === "queued") {
    return NextResponse.json({ status: "queued" });
  }
  if (age > 45_000) {
    lead.status = "completed";
    lead.duration = Math.floor(age / 1000);
  } else if (age > 8_000) {
    lead.status = "in-progress";
  } else {
    lead.status = "ringing";
  }

  return NextResponse.json({ status: lead.status, duration: lead.duration });
}
