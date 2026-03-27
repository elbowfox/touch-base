import { NextRequest, NextResponse } from "next/server";
import { addVent } from "@/lib/store";
import { generateId } from "@/lib/utils";
import { ImportPayload, Vent } from "@/lib/types";
import { getResourcesForVent } from "@/lib/resources";
import { moderateContent } from "@/lib/moderation";

const MAX_IMPORT_BATCH = 100;

export async function POST(request: NextRequest) {
  let body: ImportPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.vents || !Array.isArray(body.vents)) {
    return NextResponse.json({ error: 'Expected a "vents" array' }, { status: 400 });
  }

  if (body.vents.length === 0) {
    return NextResponse.json({ error: "No vents to import" }, { status: 400 });
  }

  if (body.vents.length > MAX_IMPORT_BATCH) {
    return NextResponse.json(
      { error: `Cannot import more than ${MAX_IMPORT_BATCH} vents at once` },
      { status: 400 }
    );
  }

  let imported = 0;
  const errors: string[] = [];

  for (const [index, raw] of body.vents.entries()) {
    if (!raw.content || typeof raw.content !== "string") {
      errors.push(`Vent at index ${index}: missing or invalid "content"`);
      continue;
    }

    const content = raw.content.trim();
    if (content.length === 0 || content.length > 280) {
      errors.push(`Vent at index ${index}: content must be 1–280 characters`);
      continue;
    }

    const modResult = moderateContent(content);
    const anonymous = raw.anonymous ?? true;
    const resources = getResourcesForVent(content);

    const vent: Vent = {
      id: generateId(),
      content,
      anonymous,
      authorHandle: anonymous ? undefined : raw.authorHandle,
      authorFid: anonymous ? undefined : raw.authorFid,
      createdAt: raw.createdAt ?? new Date().toISOString(),
      reactions: { heart: 0, hug: 0, light: 0, solidarity: 0 },
      helpfulVotes: 0,
      responses: [],
      resources: modResult.suggestResources ? resources : [],
      tags: raw.tags ?? [],
    };

    addVent(vent);
    imported++;
  }

  return NextResponse.json({ imported, errors }, { status: 201 });
}
