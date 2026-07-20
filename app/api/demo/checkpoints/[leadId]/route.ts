import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ leadId: string }> }
) {
  const { leadId } = await ctx.params;
  return NextResponse.json({
    leadId,
    checkpoints: {
      answered: true,
      messageTaken: false,
      contactCaptured: false,
    },
  });
}
