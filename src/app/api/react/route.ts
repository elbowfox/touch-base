import { NextRequest, NextResponse } from "next/server";
import { addReaction } from "@/lib/store";
import { KindnessReaction, ReactPayload } from "@/lib/types";
import { REACTIONS } from "@/lib/utils";

const validReactions = REACTIONS.map((r) => r.key);

export async function POST(request: NextRequest) {
  let body: ReactPayload;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  if (!body.ventId || typeof body.ventId !== "string") {
    return NextResponse.json({ error: "ventId is required" }, { status: 400 });
  }

  if (!validReactions.includes(body.reaction as KindnessReaction)) {
    return NextResponse.json({ error: "Invalid reaction" }, { status: 400 });
  }

  const success = addReaction(body.ventId, body.reaction);
  if (!success) {
    return NextResponse.json({ error: "Vent not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
