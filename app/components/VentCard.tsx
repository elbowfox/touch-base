"use client";

import { useState } from "react";
import { Vent, UserProfile } from "@/lib/types";
import ResourceCard from "./ResourceCard";
import ReachOutModal from "./ReachOutModal";

interface Props {
  vent: Vent;
  currentUserId?: string;
  onHelpful?: (ventId: string) => void;
  onReply?: (ventId: string, content: string, anonymous: boolean) => void;
  profile?: UserProfile;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function VentCard({
  vent,
  currentUserId,
  onHelpful,
  onReply,
  profile,
}: Props) {
  const [showResources, setShowResources] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyAnon, setReplyAnon] = useState(profile?.anonymous ?? true);
  const [showReachOut, setShowReachOut] = useState(false);
  const [helpfulClicked, setHelpfulClicked] = useState(false);

  const isOwn = currentUserId === vent.authorId;
  const authorLabel = vent.isAnonymous
    ? `Anonymous #${vent.authorId.slice(-4)}`
    : (vent.authorName ?? "Someone");

  function handleHelpful() {
    if (helpfulClicked || isOwn) return;
    setHelpfulClicked(true);
    onHelpful?.(vent.id);
  }

  function handleSendReply() {
    if (!replyText.trim()) return;
    onReply?.(vent.id, replyText.trim(), replyAnon);
    setReplyText("");
    setShowReply(false);
  }

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow transition-shadow">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {vent.isAnonymous ? "?" : (vent.authorName?.[0] ?? "U")}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{authorLabel}</p>
              <p className="text-xs text-gray-400">{timeAgo(vent.createdAt)}</p>
            </div>
          </div>
          {vent.tags.length > 0 && (
            <div className="flex gap-1 flex-wrap justify-end">
              {vent.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <p className="text-gray-800 text-sm leading-relaxed mb-4">
          {vent.content}
        </p>

        {/* Action bar */}
        <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
          {/* Helpful */}
          <button
            onClick={handleHelpful}
            disabled={isOwn || helpfulClicked}
            className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
              helpfulClicked
                ? "text-indigo-600"
                : "text-gray-500 hover:text-indigo-600"
            } disabled:cursor-not-allowed`}
          >
            <svg
              className="w-4 h-4"
              fill={helpfulClicked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {vent.helpfulVotes + (helpfulClicked ? 1 : 0)}
          </button>

          {/* Reply */}
          <button
            onClick={() => setShowReply(!showReply)}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            {vent.responses.length > 0 ? vent.responses.length : "Reply"}
          </button>

          {/* Resources */}
          {vent.resources && vent.resources.length > 0 && (
            <button
              onClick={() => setShowResources(!showResources)}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-indigo-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {vent.resources.length} nearby
            </button>
          )}

          {/* Reach out */}
          {!isOwn && (
            <button
              onClick={() => setShowReachOut(true)}
              className="ml-auto flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Reach out
            </button>
          )}
        </div>

        {/* Resources panel */}
        {showResources && vent.resources && vent.resources.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Nearby resources
            </p>
            <div className="space-y-2">
              {vent.resources.map((r) => (
                <ResourceCard key={r.id} resource={r} compact />
              ))}
            </div>
          </div>
        )}

        {/* Reply composer */}
        {showReply && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            {/* Existing responses */}
            {vent.responses.length > 0 && (
              <div className="space-y-2 mb-3">
                {vent.responses.map((resp) => (
                  <div key={resp.id} className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">
                        {resp.isAnonymous ? "?" : resp.authorName?.[0] ?? "U"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-700">
                        {resp.isAnonymous
                          ? `Anonymous #${resp.authorId.slice(-4)}`
                          : resp.authorName ?? "Someone"}
                        {resp.identityRevealed && (
                          <span className="ml-1 text-indigo-500 text-xs">
                            ✓ verified
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">{resp.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reply input */}
            <div className="flex gap-2">
              <textarea
                className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                rows={2}
                placeholder="Share something supportive…"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded"
                  checked={replyAnon}
                  onChange={(e) => setReplyAnon(e.target.checked)}
                />
                Post anonymously
              </label>
              <button
                onClick={handleSendReply}
                disabled={!replyText.trim()}
                className="text-xs bg-indigo-600 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reach out modal */}
      {showReachOut && (
        <ReachOutModal
          targetId={vent.authorId}
          targetLabel={authorLabel}
          onClose={() => setShowReachOut(false)}
          onSend={
            // TODO: replace stub with Farcaster encrypted DM API call
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (_message, _revealIdentity, _displayName) => {
              setShowReachOut(false);
            }
          }
        />
      )}
    </>
  );
}
