"use client";

import { useState } from "react";
import { Vent, KindnessReaction } from "@/lib/types";
import { REACTIONS, timeAgo } from "@/lib/utils";

interface VentCardProps {
  vent: Vent;
  onReact: (ventId: string, reaction: KindnessReaction) => Promise<void>;
}

export default function VentCard({ vent, onReact }: VentCardProps) {
  const [reactions, setReactions] = useState(vent.reactions);
  const [reacting, setReacting] = useState<KindnessReaction | null>(null);
  const [reacted, setReacted] = useState<KindnessReaction | null>(null);

  async function handleReact(key: KindnessReaction) {
    if (reacting || reacted) return;
    setReacting(key);
    try {
      await onReact(vent.id, key);
      setReactions((prev) => ({ ...prev, [key]: prev[key] + 1 }));
      setReacted(key);
    } finally {
      setReacting(null);
    }
  }

  return (
    <article className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-900">
      {/* author / time */}
      <div className="mb-3 flex items-center justify-between text-xs text-stone-400">
        <span className="font-medium">
          {vent.anonymous ? "🌿 Anonymous" : `@${vent.authorHandle ?? "someone"}`}
        </span>
        <time dateTime={vent.createdAt}>{timeAgo(vent.createdAt)}</time>
      </div>

      {/* content */}
      <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
        {vent.content}
      </p>

      {/* reactions */}
      <div className="mt-4 flex flex-wrap gap-2">
        {REACTIONS.map(({ key, emoji, label }) => {
          const isChosen = reacted === key;
          return (
            <button
              key={key}
              onClick={() => handleReact(key)}
              disabled={!!reacted || !!reacting}
              aria-label={`Send ${label}`}
              className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs transition-colors
                ${
                  isChosen
                    ? "border-rose-300 bg-rose-50 text-rose-600 dark:border-rose-600 dark:bg-rose-950 dark:text-rose-300"
                    : "border-stone-200 bg-stone-50 text-stone-500 hover:border-stone-300 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-400"
                }
                disabled:cursor-default`}
            >
              <span aria-hidden="true">{emoji}</span>
              <span>{reactions[key]}</span>
            </button>
          );
        })}
      </div>
    </article>
  );
}
