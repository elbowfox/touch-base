"use client";

import { useState, useRef } from "react";
import { MAX_VENT_LENGTH, PREMIUM_MAX_VENT_LENGTH } from "@/lib/utils";
import { Vent } from "@/lib/types";
import { moderateContent } from "@/lib/moderation";
import ResourceCard from "./ResourceCard";
import { DEFAULT_RESOURCES } from "@/lib/resources";

interface ComposeFormProps {
  authorHandle?: string;
  authorFid?: number;
  isPremium?: boolean;
  onCreated: (vent: Vent) => void;
}

export default function ComposeForm({
  authorHandle,
  authorFid,
  isPremium = false,
  onCreated,
}: ComposeFormProps) {
  const [content, setContent] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const maxLength = isPremium ? PREMIUM_MAX_VENT_LENGTH : MAX_VENT_LENGTH;
  const remaining = maxLength - content.length;
  const canSubmit = content.trim().length > 0 && remaining >= 0 && !submitting;

  // Live content moderation check
  const modResult = content.trim().length > 10
    ? moderateContent(content)
    : { level: "ok" as const };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/vent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content.trim(),
          anonymous,
          authorHandle: anonymous ? undefined : authorHandle,
          authorFid: anonymous ? undefined : authorFid,
          isPremium,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Something went wrong");
        return;
      }
      const vent: Vent = await res.json();
      setContent("");
      onCreated(vent);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Crisis banner */}
      {modResult.level === "crisis" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3">
          <p className="text-xs font-semibold text-red-700 mb-1">
            🆘 If you&apos;re in crisis, help is available right now
          </p>
          <ResourceCard resource={DEFAULT_RESOURCES[0]} />
        </div>
      )}

      {isPremium && (
        <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
          🏅 Sanctuary — up to {PREMIUM_MAX_VENT_LENGTH} characters
        </p>
      )}

      <label className="sr-only" htmlFor="vent-content">
        What&apos;s on your mind?
      </label>
      <textarea
        id="vent-content"
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Let it out… this space is safe."
        rows={5}
        maxLength={maxLength + 1}
        className="w-full resize-none rounded-2xl border border-stone-200 bg-white p-4 text-sm leading-relaxed text-stone-700 placeholder-stone-400 outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:placeholder-stone-600 dark:focus:border-stone-500 dark:focus:ring-stone-800"
        aria-describedby="char-count"
      />

      <div className="flex items-center justify-between gap-4">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            className="h-4 w-4 rounded border-stone-300 accent-stone-600"
          />
          Stay anonymous
        </label>

        <span
          id="char-count"
          aria-live="polite"
          className={`text-xs tabular-nums ${
            remaining < 20 ? "text-rose-500" : "text-stone-400"
          }`}
        >
          {remaining}
        </span>
      </div>

      {error && (
        <p role="alert" className="text-xs text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="rounded-full bg-stone-800 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-stone-200 dark:text-stone-900 dark:hover:bg-stone-100"
      >
        {submitting ? "Sending…" : "Release it ✦"}
      </button>
    </form>
  );
}
