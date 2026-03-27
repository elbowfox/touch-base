"use client";

import { useState } from "react";
import { KP_MILESTONES } from "@/lib/constants";
import { UserProfile } from "@/lib/types";
import PremiumModal from "./PremiumModal";
import BoosterPacksModal from "./BoosterPacksModal";

interface Props {
  profile: UserProfile;
  onProfileUpdate: (updated: UserProfile) => void;
}

export default function RewardsWidget({ profile, onProfileUpdate }: Props) {
  const { rewardsBalance: balance, engagementStreak: streak } = profile;
  const [showPremium, setShowPremium] = useState(false);
  const [showBoosters, setShowBoosters] = useState(false);

  const nextMilestone = KP_MILESTONES.find((m) => balance < m.threshold);
  const progressPct = nextMilestone
    ? Math.round((balance / nextMilestone.threshold) * 100)
    : 100;

  const isPremiumActive =
    profile.isPremium &&
    profile.premiumExpiry &&
    new Date(profile.premiumExpiry) > new Date();

  return (
    <>
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
        {/* Balance + streak row */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                Kindness Points
              </p>
              {isPremiumActive && (
                <span className="rounded-full bg-amber-400/30 dark:bg-amber-700/40 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:text-amber-300">
                  🏅 Sanctuary
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-amber-800 dark:text-amber-300 tabular-nums">
              {balance.toLocaleString()} KP
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-amber-600 dark:text-amber-500">Streak</p>
            <p className="text-lg font-bold text-amber-700 dark:text-amber-400">
              🔥 {streak}d
            </p>
          </div>
        </div>

        {/* Progress bar */}
        {nextMilestone && (
          <>
            <div className="h-2 rounded-full bg-amber-200 dark:bg-amber-900 overflow-hidden mb-1">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-amber-600 dark:text-amber-500">
              <span>{progressPct}% to next milestone</span>
              <span>{nextMilestone.reward}</span>
            </div>
          </>
        )}

        {/* Milestones list */}
        <div className="mt-3 space-y-1.5">
          {KP_MILESTONES.map((m) => (
            <div
              key={m.threshold}
              className={`flex items-center justify-between text-xs rounded-lg px-3 py-1.5 ${
                balance >= m.threshold
                  ? "bg-amber-200/60 text-amber-800 dark:bg-amber-800/30 dark:text-amber-300"
                  : "text-amber-600/70 dark:text-amber-600"
              }`}
            >
              <span>{balance >= m.threshold ? "✅" : "○"} {m.label}</span>
              <span className="font-medium">{m.reward}</span>
            </div>
          ))}
        </div>

        {/* Monetization CTAs */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => setShowBoosters(true)}
            className="rounded-xl border border-amber-300 dark:border-amber-700 bg-white dark:bg-stone-800 px-3 py-2 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-stone-700 transition-colors"
          >
            ⚡ Boost KP
          </button>
          {isPremiumActive ? (
            <div className="rounded-xl border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20 px-3 py-2 text-xs font-semibold text-green-700 dark:text-green-400 text-center">
              🏅 Premium Active
            </div>
          ) : (
            <button
              onClick={() => setShowPremium(true)}
              className="rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 px-3 py-2 text-xs font-semibold text-white hover:from-amber-300 hover:to-orange-300 transition-colors shadow-sm"
            >
              🏅 Go Sanctuary
            </button>
          )}
        </div>

        <p className="text-xs text-amber-500 dark:text-amber-600 mt-3 text-center">
          Points earned on BASE chain · Redeemable for real on-chain value
        </p>
      </div>

      {showPremium && (
        <PremiumModal
          profile={profile}
          onSuccess={(updated) => {
            onProfileUpdate(updated);
            setShowPremium(false);
          }}
          onClose={() => setShowPremium(false)}
        />
      )}

      {showBoosters && (
        <BoosterPacksModal
          profile={profile}
          onSuccess={(updated) => {
            onProfileUpdate(updated);
            setShowBoosters(false);
          }}
          onClose={() => setShowBoosters(false)}
        />
      )}
    </>
  );
}
