import { NextRequest, NextResponse } from "next/server";
import { addVent, getVents } from "@/lib/store";
import { generateId } from "@/lib/utils";
import { CreateVentPayload, Vent } from "@/lib/types";

export function GET() {
  return NextResponse.json(getVents());
}

export async function POST(request: NextRequest) {
  const body: CreateVentPayload = await request.json();

  if (!body.content || typeof body.content !== "string") {
    return NextResponse.json({ error: "Content is required" }, { status: 400 });
  }

  const trimmed = body.content.trim();
  if (trimmed.length === 0 || trimmed.length > 280) {
    return NextResponse.json(
      { error: "Content must be between 1 and 280 characters" },
      { status: 400 }
    );
  }

  const vent: Vent = {
    id: generateId(),
    content: trimmed,
    anonymous: body.anonymous !== false,
    authorHandle: body.anonymous ? undefined : body.authorHandle,
    authorFid: body.anonymous ? undefined : body.authorFid,
    createdAt: new Date().toISOString(),
    reactions: { heart: 0, hug: 0, light: 0, solidarity: 0 },
  };

  addVent(vent);
  return NextResponse.json(vent, { status: 201 });
}
