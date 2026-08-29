import { NextResponse } from "next/server";
import { processProviderOutreachBatch } from "@/lib/provider-outreach";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const authorization = request.headers.get("authorization");

  if (!secret || authorization !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  try {
    const result = await processProviderOutreachBatch(20);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Provider outreach failed.";
    console.error("provider_outreach_failed", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
