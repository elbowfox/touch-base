"use client";

import { KP_REWARDS } from "@/lib/constants";

interface Props {
  balance: number;
  streak: number;
  compact?: boolean;
}

export default function RewardsWidget({ balance, streak, compact = false }: Props) {
  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
          <span className="text-sm">💛</span>
          <span className="text-xs font-semibold text-amber-700">
            {balance.toLocaleString()} KP
          </span>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-1 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full">
            <span className="text-sm">🔥</span>
            <span className="text-xs font-semibold text-orange-700">
              {streak}d streak
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5">
      <h3 className="text-sm font-bold text-amber-900 mb-3">
        💛 Kindness Points
      </h3>

      <div className="flex items-end gap-2 mb-4">
        <span className="text-3xl font-bold text-amber-700">
          {balance.toLocaleString()}
        </span>
        <span className="text-sm text-amber-600 mb-1">KP</span>
      </div>

      {streak > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🔥</span>
          <div>
            <p className="text-sm font-semibold text-orange-700">
              {streak}-day streak
            </p>
            <p className="text-xs text-orange-600">Keep it up!</p>
          </div>
        </div>
      )}

      {/* How to earn */}
      <div className="space-y-1.5">
        <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide">
          How to earn
        </p>
        {[
          { action: "Post a vent",                kp: `+${KP_REWARDS.POST_VENT} KP` },
          { action: "Receive a helpful vote",     kp: `+${KP_REWARDS.GIVE_HELPFUL_VOTE} KP` },
          { action: "Respond supportively",       kp: `+${KP_REWARDS.POST_REPLY} KP` },
          { action: "Daily engagement streak",    kp: `+${KP_REWARDS.DAILY_STREAK} KP/day` },
          { action: "Reach out to someone in need", kp: `+${KP_REWARDS.REACH_OUT} KP` },
        ].map((row) => (
          <div
            key={row.action}
            className="flex justify-between items-center text-xs"
          >
            <span className="text-amber-700">{row.action}</span>
            <span className="font-semibold text-amber-800">{row.kp}</span>
          </div>
        ))}
      </div>

      {/* BASE chain note */}
      <div className="mt-4 pt-3 border-t border-amber-200">
        <p className="text-xs text-amber-700">
          Kindness Points are recorded on the{" "}
          <span className="font-semibold">BASE chain</span>. At milestone
          thresholds they convert to on-chain rewards — USDC donations to
          verified mental-health charities or redeemable tokens.
        </p>
      </div>
    </div>
  );
}
