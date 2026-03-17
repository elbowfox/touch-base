"use client";

import { KP_MILESTONES } from "@/lib/constants";

interface Props {
  balance: number;
  streak: number;
}

export default function RewardsWidget({ balance, streak }: Props) {
  const nextMilestone = KP_MILESTONES.find((m) => balance < m.threshold);
  const progressPct = nextMilestone
    ? Math.round((balance / nextMilestone.threshold) * 100)
    : 100;

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
            Kindness Points
          </p>
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

      <p className="text-xs text-amber-500 dark:text-amber-600 mt-3 text-center">
        Points earned on BASE chain · Redeemable for real on-chain value
      </p>
    </div>
  );
}
