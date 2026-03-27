"use client";

import { useState } from "react";
import { Vent, KindnessReaction, UserProfile } from "@/lib/types";
import { REACTIONS, timeAgo } from "@/lib/utils";
import ResourceCard from "./ResourceCard";
import ReachOutModal from "./ReachOutModal";
import TipModal from "./TipModal";

interface VentCardProps {
  vent: Vent;
  currentUserId?: string;
  profile?: Partial<UserProfile>;
  onReact?: (ventId: string, reaction: KindnessReaction) => Promise<void>;
  onHelpful?: (ventId: string) => void;
  onReply?: (ventId: string, content: string, anonymous: boolean) => void;
  onTip?: (ventId: string, amountUsd: number) => void;
}

export default function VentCard({
  vent,
  currentUserId,
  profile,
  onReact,
  onHelpful,
  onReply,
  onTip,
}: VentCardProps) {
  const [reactions, setReactions] = useState(vent.reactions);
  const [reacting, setReacting] = useState<KindnessReaction | null>(null);
  const [reacted, setReacted] = useState<KindnessReaction | null>(null);
  const [showResources, setShowResources] = useState(false);
  const [showReachOut, setShowReachOut] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [tipCount, setTipCount] = useState(0);
  const [replyText, setReplyText] = useState("");
  const [replyAnon, setReplyAnon] = useState(true);

  async function handleReact(key: KindnessReaction) {
    if (reacting || reacted || !onReact) return;
    setReacting(key);
    try {
      await onReact(vent.id, key);
      setReactions((prev) => ({ ...prev, [key]: prev[key] + 1 }));
      setReacted(key);
    } finally {
      setReacting(null);
    }
  }

  function handleReplySubmit() {
    if (!replyText.trim() || !onReply) return;
    onReply(vent.id, replyText.trim(), replyAnon);
    setReplyText("");
    setShowReply(false);
  }

  return (
    <article className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-900">
      {/* author / time */}
      <div className="mb-3 flex items-center justify-between text-xs text-stone-400">
        <span className="font-medium">
          {vent.anonymous
            ? "🌿 Anonymous"
            : `@${vent.authorHandle ?? vent.authorName ?? "someone"}`}
        </span>
        <time dateTime={vent.createdAt}>{timeAgo(vent.createdAt)}</time>
      </div>

      {/* content */}
      <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
        {vent.content}
      </p>

      {/* tags */}
      {vent.tags && vent.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {vent.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs text-stone-500 dark:bg-stone-800 dark:text-stone-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* reactions */}
      <div className="mt-4 flex flex-wrap gap-2">
        {REACTIONS.map(({ key, emoji, label }) => {
          const isChosen = reacted === key;
          return (
            <button
              key={key}
              onClick={() => handleReact(key)}
              disabled={!!reacted || !!reacting || !onReact}
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

      {/* action row */}
      <div className="mt-3 flex items-center gap-3 border-t border-stone-100 pt-3 dark:border-stone-800">
        {onHelpful && (
          <button
            onClick={() => onHelpful(vent.id)}
            className="text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
          >
            💛 Helpful {vent.helpfulVotes ? `(${vent.helpfulVotes})` : ""}
          </button>
        )}
        {onReply && (
          <button
            onClick={() => setShowReply(!showReply)}
            className="text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
          >
            💬 Reply
          </button>
        )}
        {onTip && (
          <button
            onClick={() => setShowTip(true)}
            className="text-xs text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 transition-colors"
          >
            💸 Tip{tipCount > 0 ? ` (${tipCount})` : ""}
          </button>
        )}
        {vent.resources && vent.resources.length > 0 && (
          <button
            onClick={() => setShowResources(!showResources)}
            className="text-xs text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors ml-auto"
          >
            📍 Resources
          </button>
        )}
        <button
          onClick={() => setShowReachOut(true)}
          className="text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
        >
          ✉️ Reach out
        </button>
      </div>

      {/* inline reply box */}
      {showReply && (
        <div className="mt-3 space-y-2">
          <textarea
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-700 placeholder-stone-400 focus:border-stone-400 focus:outline-none dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
            rows={2}
            placeholder="Write a supportive reply…"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-xs text-stone-500 cursor-pointer">
              <input
                type="checkbox"
                checked={replyAnon}
                onChange={(e) => setReplyAnon(e.target.checked)}
                className="h-3.5 w-3.5 rounded accent-stone-600"
              />
              Anonymous
            </label>
            <button
              onClick={handleReplySubmit}
              disabled={!replyText.trim()}
              className="rounded-full bg-stone-800 px-4 py-1 text-xs font-medium text-white hover:bg-stone-700 disabled:opacity-40"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* resources panel */}
      {showResources && vent.resources && (
        <div className="mt-4 space-y-2">
          {vent.resources.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>
      )}

      {/* responses */}
      {vent.responses && vent.responses.length > 0 && (
        <div className="mt-4 space-y-2 border-t border-stone-100 pt-3 dark:border-stone-800">
          {vent.responses.map((r) => (
            <div key={r.id} className="rounded-xl bg-stone-50 px-4 py-3 text-xs text-stone-600 dark:bg-stone-800 dark:text-stone-400">
              <div className="mb-1 flex justify-between">
                <span className="font-medium">
                  {r.isAnonymous ? "🌿 Anonymous" : r.authorName ?? "someone"}
                </span>
                <time>{timeAgo(r.createdAt)}</time>
              </div>
              <p>{r.content}</p>
            </div>
          ))}
        </div>
      )}

      {showReachOut && (
        <ReachOutModal
          vent={vent}
          onClose={() => setShowReachOut(false)}
        />
      )}

      {showTip && (
        <TipModal
          ventPreview={vent.content.slice(0, 120)}
          onSuccess={(amountUsd) => {
            setTipCount((n) => n + 1);
            setShowTip(false);
            onTip?.(vent.id, amountUsd);
          }}
          onClose={() => setShowTip(false)}
        />
      )}
    </article>
  );
}
