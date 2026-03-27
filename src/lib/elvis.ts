// ─── Elvis Bot Integration ───────────────────────────────────────────────────
// Telegram bot "Elvis" funnels users to TouchBase.
// This module manages referral tokens so Elvis can:
//   1. Generate deep-link URLs for Telegram users
//   2. Check whether a referred user completed onboarding
//
// NOTE: In-memory store for demo. Replace with persistent DB in production.

import { ElvisReferral } from "./types";

// ─── In-Memory Referral Store ────────────────────────────────────────────────

const referrals = new Map<string, ElvisReferral>();

// Index by Telegram user ID for quick lookup
const byTelegramId = new Map<string, string>(); // telegramUserId → token

/** Generate a URL-safe referral token. */
function generateToken(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(36).padStart(2, "0"))
    .join("")
    .slice(0, 24);
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Create a referral for a Telegram user. If a referral already exists for this
 * Telegram user, return the existing one (idempotent).
 */
export function createReferral(
  telegramUserId: string,
  telegramName?: string,
  telegramUsername?: string
): ElvisReferral {
  // Return existing referral if one exists for this Telegram user
  const existingToken = byTelegramId.get(telegramUserId);
  if (existingToken) {
    const existing = referrals.get(existingToken);
    if (existing) return existing;
  }

  const token = generateToken();
  const referral: ElvisReferral = {
    token,
    telegramUserId,
    telegramName,
    telegramUsername,
    createdAt: new Date().toISOString(),
    onboardingComplete: false,
  };

  referrals.set(token, referral);
  byTelegramId.set(telegramUserId, token);
  return referral;
}

/** Look up a referral by its token. */
export function getReferral(token: string): ElvisReferral | undefined {
  return referrals.get(token);
}

/** Look up a referral by Telegram user ID. */
export function getReferralByTelegramId(
  telegramUserId: string
): ElvisReferral | undefined {
  const token = byTelegramId.get(telegramUserId);
  return token ? referrals.get(token) : undefined;
}

/** Mark a referral as onboarding-complete. */
export function completeOnboarding(token: string): boolean {
  const referral = referrals.get(token);
  if (!referral) return false;
  referral.onboardingComplete = true;
  referral.onboardingCompletedAt = new Date().toISOString();
  return true;
}
