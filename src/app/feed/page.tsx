"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Vent, KindnessReaction, UserProfile } from "@/lib/types";
import { KP_REWARDS, PREMIUM_KP_MULTIPLIER } from "@/lib/constants";
import { TIP_SENDER_KP } from "@/lib/payments";
import VentCard from "@/components/VentCard";
import RewardsWidget from "@/components/RewardsWidget";
import ZenLoading from "@/components/ZenLoading";

// ─── Profile helpers ──────────────────────────────────────────────────────────

function loadProfile(): UserProfile | null {
  try {
    const raw = typeof window !== "undefined" ? localStorage.getItem("tb_profile") : null;
    if (!raw) return null;
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

function saveProfile(p: UserProfile) {
  try { localStorage.setItem("tb_profile", JSON.stringify(p)); } catch { /* ignore */ }
}

function kpMultiplier(profile: UserProfile): number {
  const isPremiumActive =
    profile.isPremium &&
    profile.premiumExpiry &&
    new Date(profile.premiumExpiry) > new Date();
  return isPremiumActive ? PREMIUM_KP_MULTIPLIER : 1;
}

function addKp(profile: UserProfile, base: number): UserProfile {
  const earned = base * kpMultiplier(profile);
  return { ...profile, rewardsBalance: profile.rewardsBalance + earned };
}

// ─── Feed Page ────────────────────────────────────────────────────────────────

export default function FeedPage() {
  const [vents, setVents] = useState<Vent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showRewards, setShowRewards] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
    fetch("/api/vent")
      .then((r) => r.json())
      .then((data: Vent[]) => setVents(data))
      .catch(() => setError("Couldn't load the feed. Please refresh."))
      .finally(() => setLoading(false));
  }, []);

  function updateProfile(updated: UserProfile) {
    setProfile(updated);
    saveProfile(updated);
  }

  const handleReact = useCallback(
    async (ventId: string, reaction: KindnessReaction) => {
      await fetch("/api/react", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ventId, reaction }),
      });
      if (profile) {
        updateProfile(addKp(profile, KP_REWARDS.GIVE_HELPFUL_VOTE));
      }
    },
    [profile] // eslint-disable-line react-hooks/exhaustive-deps
  );

  function handleHelpful(ventId: string) {
    setVents((prev) =>
      prev.map((v) => v.id === ventId ? { ...v, helpfulVotes: (v.helpfulVotes ?? 0) + 1 } : v)
    );
    if (profile) {
      updateProfile(addKp(profile, KP_REWARDS.GIVE_HELPFUL_VOTE));
    }
  }

  function handleReply(ventId: string, content: string, anonymous: boolean) {
    setVents((prev) =>
      prev.map((v) => {
        if (v.id !== ventId) return v;
        return {
          ...v,
          responses: [...(v.responses ?? []), {
            id: `resp_${Date.now()}`,
            content,
            isAnonymous: anonymous,
            authorName: anonymous ? undefined : (profile?.displayName ?? undefined),
            identityRevealed: false,
            createdAt: new Date().toISOString(),
            helpfulVotes: 0,
          }],
        };
      })
    );
    if (profile) {
      updateProfile(addKp(profile, KP_REWARDS.POST_REPLY));
    }
  }

  function handleTip(_ventId: string, _amountUsd: number) {
    if (profile) {
      updateProfile(addKp(profile, TIP_SENDER_KP));
    }
  }

  const isPremiumActive =
    profile?.isPremium &&
    profile.premiumExpiry &&
    new Date(profile.premiumExpiry) > new Date();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/90 px-5 py-4 backdrop-blur-sm dark:border-stone-800 dark:bg-stone-950/90 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-semibold tracking-tight text-stone-800 dark:text-stone-100">
              TouchBase
            </h1>
            {isPremiumActive && (
              <span className="rounded-full bg-amber-100 dark:bg-amber-900/40 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
                🏅 Sanctuary
              </span>
            )}
          </div>
          <p className="text-xs text-stone-400">You are not alone.</p>
        </div>
        <div className="flex items-center gap-2">
          {profile && (
            <button
              onClick={() => setShowRewards(!showRewards)}
              className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full hover:bg-amber-100 transition-colors dark:bg-amber-950/30 dark:border-amber-800"
            >
              <span className="text-sm">💛</span>
              <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                {profile.rewardsBalance.toLocaleString()} KP
              </span>
            </button>
          )}
          <Link
            href="/compose"
            className="rounded-full bg-stone-800 px-4 py-1.5 text-xs font-medium text-white hover:bg-stone-700 dark:bg-stone-200 dark:text-stone-900"
          >
            + Vent
          </Link>
        </div>
      </header>

      <main className="flex flex-col gap-3 p-4">
        {showRewards && profile && (
          <RewardsWidget
            profile={profile}
            onProfileUpdate={updateProfile}
          />
        )}

        {!profile && (
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50 dark:bg-indigo-950/20 dark:border-indigo-900 p-4 flex gap-3">
            <span className="text-2xl">👋</span>
            <div>
              <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-300">
                Personalise your experience
              </p>
              <p className="text-xs text-indigo-700 dark:text-indigo-400 mt-0.5">
                Complete onboarding to get location-aware resources and earn Kindness Points.
              </p>
              <Link href="/onboarding" className="inline-block mt-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline">
                Set up my profile →
              </Link>
            </div>
          </div>
        )}

        {loading && <ZenLoading />}

        {error && (
          <p role="alert" className="py-12 text-center text-sm text-rose-500">
            {error}
          </p>
        )}

        {!loading && !error && vents.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-2xl">🌿</p>
            <p className="mt-2 text-sm text-stone-400">No vents yet. Be the first to share.</p>
          </div>
        )}

        {vents.map((vent) => (
          <VentCard
            key={vent.id}
            vent={vent}
            profile={profile ?? undefined}
            onReact={handleReact}
            onHelpful={handleHelpful}
            onReply={handleReply}
            onTip={handleTip}
          />
        ))}
      </main>
    </div>
  );
}
