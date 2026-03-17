"use client";

import { useState } from "react";
import { Vent } from "@/lib/types";

interface Props {
  vent: Vent;
  onClose: () => void;
}

export default function ReachOutModal({ vent, onClose }: Props) {
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [sent, setSent] = useState(false);

  function handleSend() {
    if (!message.trim()) return;
    // In production: send encrypted DM via Farcaster protocol
    // For now, simulate the send
    setSent(true);
    setTimeout(onClose, 2000);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-2xl sm:rounded-2xl bg-white dark:bg-stone-900 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {sent ? (
          <div className="text-center py-6">
            <p className="text-3xl mb-3">✉️</p>
            <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
              Message sent. You reached out. That matters.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-base font-semibold text-stone-800 dark:text-stone-100 mb-1">
              Reach out privately
            </h3>
            <p className="text-xs text-stone-400 mb-4">
              Your message will be end-to-end encrypted via Farcaster DM.
            </p>

            <div className="bg-stone-50 dark:bg-stone-800 rounded-xl p-3 mb-4">
              <p className="text-xs text-stone-500 italic line-clamp-2">
                &ldquo;{vent.content}&rdquo;
              </p>
            </div>

            <textarea
              className="w-full rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 px-3 py-2 text-sm text-stone-700 dark:text-stone-300 placeholder-stone-400 focus:outline-none focus:border-stone-400 resize-none"
              rows={3}
              placeholder="Write something warm, honest, supportive…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="flex items-center justify-between mt-3">
              <label className="flex items-center gap-1.5 text-xs text-stone-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                  className="h-3.5 w-3.5 rounded accent-stone-600"
                />
                Send anonymously
              </label>

              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="text-xs text-stone-400 hover:text-stone-600 px-3 py-1.5"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="rounded-full bg-stone-800 dark:bg-stone-200 px-4 py-1.5 text-xs font-medium text-white dark:text-stone-900 hover:bg-stone-700 disabled:opacity-40"
                >
                  Send ✦
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
