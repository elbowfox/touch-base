import { NextRequest, NextResponse } from "next/server";
import { createReferral } from "@/lib/elvis";
import { APP_URL } from "@/lib/constants";

/**
 * POST /api/elvis/deeplink
 *
 * Called by Elvis (Telegram bot) to generate a deep-link URL for a user.
 * Elvis sends this link inside Telegram so the user can tap it and land
 * on the real TouchBase platform with their referral tracked.
 *
 * Body: {
 *   telegram_user_id: string   — required
 *   telegram_name?: string     — first_name from Telegram
 *   telegram_username?: string — username (without @)
 * }
 *
 * Response: {
 *   url: string       — deep-link URL to share with user
 *   token: string     — referral token (for status checks)
 *   existing: boolean — whether this user already had a referral
 * }
 */
export async function POST(request: NextRequest) {
  // Verify bot API key if configured
  const apiKey = request.headers.get("x-elvis-api-key");
  const expectedKey = process.env.ELVIS_BOT_API_KEY;
  if (expectedKey && apiKey !== expectedKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    telegram_user_id?: string;
    telegram_name?: string;
    telegram_username?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.telegram_user_id || typeof body.telegram_user_id !== "string") {
    return NextResponse.json(
      { error: "telegram_user_id is required" },
      { status: 400 }
    );
  }

  const referral = createReferral(
    body.telegram_user_id,
    body.telegram_name,
    body.telegram_username
  );

  const url = `${APP_URL}/join?ref=${referral.token}`;

  return NextResponse.json({
    url,
    token: referral.token,
  });
}
