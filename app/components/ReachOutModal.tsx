"use client";

import { useState } from "react";

interface Props {
  /** ID of the user/vent being reached out to */
  targetId: string;
  /** Optional anonymised label, e.g. "Anonymous #42" */
  targetLabel?: string;
  onClose: () => void;
  onSend: (message: string, revealIdentity: boolean, displayName?: string) => void;
}

export default function ReachOutModal({
  targetLabel,
  onClose,
  onSend,
}: Props) {
  const [message, setMessage] = useState("");
  const [revealIdentity, setRevealIdentity] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [sent, setSent] = useState(false);

  function handleSend() {
    if (!message.trim()) return;
    onSend(message.trim(), revealIdentity, revealIdentity ? displayName : undefined);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
        <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center">
          <div className="text-5xl mb-4">💌</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Message sent
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Your message has been delivered via an encrypted channel.
            {revealIdentity
              ? " The recipient can see your display name."
              : " You remain anonymous unless they respond and you choose to reveal yourself."}
          </p>
          <button
            onClick={onClose}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">Reach out</h3>
            {targetLabel && (
              <p className="text-xs text-gray-500">To: {targetLabel}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Identity reveal toggle */}
        <div className="mb-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
          <label className="flex items-start gap-3 cursor-pointer">
            <div
              onClick={() => setRevealIdentity(!revealIdentity)}
              className={`relative mt-0.5 w-10 h-6 rounded-full transition-colors flex-shrink-0 ${
                revealIdentity ? "bg-indigo-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                  revealIdentity ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                Reveal my identity
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {revealIdentity
                  ? "Your display name will be visible to the recipient."
                  : "Your message is sent anonymously via encrypted channel. The recipient cannot identify you."}
              </p>
            </div>
          </label>

          {revealIdentity && (
            <div className="mt-3">
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your display name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Encryption notice */}
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <p className="text-xs text-gray-500">
            Messages are end-to-end encrypted via Farcaster&apos;s secure DM protocol.
          </p>
        </div>

        {/* Message textarea */}
        <textarea
          className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          rows={4}
          placeholder="Share something supportive…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
        />
        <div className="flex justify-end mb-4">
          <span className="text-xs text-gray-400">{message.length}/500</span>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send message
          </button>
        </div>
      </div>
    </div>
  );
}
