import { NextRequest, NextResponse } from "next/server";
import { getReferral, getReferralByTelegramId } from "@/lib/elvis";

/**
 * GET /api/elvis/status?token=xxx  OR  ?telegram_user_id=xxx
 *
 * Called by Elvis to check if a referred user completed onboarding.
 * Elvis can poll this after sending a deep-link to know when the user
 * has finished setting up their TouchBase profile.
 *
 * Query params (one required):
 *   - token: referral token from the deeplink response
 *   - telegram_user_id: Telegram user ID to look up
 *
 * Response: {
 *   found: boolean
 *   onboarding_complete: boolean
 *   onboarding_completed_at?: string  (ISO timestamp)
 *   telegram_user_id: string
 *   telegram_name?: string
 * }
 */
export async function GET(request: NextRequest) {
  // Verify bot API key if configured
  const apiKey = request.headers.get("x-elvis-api-key");
  const expectedKey = process.env.ELVIS_BOT_API_KEY;
  if (expectedKey && apiKey !== expectedKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const telegramUserId = searchParams.get("telegram_user_id");

  if (!token && !telegramUserId) {
    return NextResponse.json(
      { error: "Provide ?token= or ?telegram_user_id=" },
      { status: 400 }
    );
  }

  const referral = token
    ? getReferral(token)
    : getReferralByTelegramId(telegramUserId!);

  if (!referral) {
    return NextResponse.json({ found: false, onboarding_complete: false });
  }

  return NextResponse.json({
    found: true,
    onboarding_complete: referral.onboardingComplete,
    onboarding_completed_at: referral.onboardingCompletedAt ?? null,
    telegram_user_id: referral.telegramUserId,
    telegram_name: referral.telegramName ?? null,
  });
}
