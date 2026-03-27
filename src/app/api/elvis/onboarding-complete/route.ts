import { NextRequest, NextResponse } from "next/server";
import { completeOnboarding, getReferral } from "@/lib/elvis";

/**
 * POST /api/elvis/onboarding-complete
 *
 * Called by the onboarding page when a user who arrived via Elvis
 * completes their profile setup. Updates the referral record so
 * Elvis can see the user finished onboarding when polling /api/elvis/status.
 *
 * Body: { token: string }
 */
export async function POST(request: NextRequest) {
  let body: { token?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.token || typeof body.token !== "string") {
    return NextResponse.json(
      { error: "token is required" },
      { status: 400 }
    );
  }

  const referral = getReferral(body.token);
  if (!referral) {
    return NextResponse.json({ error: "Unknown referral token" }, { status: 404 });
  }

  completeOnboarding(body.token);

  return NextResponse.json({
    ok: true,
    telegram_user_id: referral.telegramUserId,
  });
}
