"use client";

import { useState } from "react";
import Link from "next/link";
import { Vent, UserProfile } from "@/lib/types";
import { getResourcesForVent } from "@/lib/resources";
import { KP_REWARDS } from "@/lib/constants";
import VentCard from "@/app/components/VentCard";
import RewardsWidget from "@/app/components/RewardsWidget";

// ─────────────────────────────────────────────────────────────────────────────
// Sample seed data (simulates a live community feed)
// ─────────────────────────────────────────────────────────────────────────────
const SEED_VENTS: Vent[] = [
  {
    id: "v1",
    content:
      "I've been feeling really overwhelmed lately. Every morning I wake up with this heavy dread that won't lift no matter what I do. I don't know how to explain it to anyone around me.",
    authorId: "user_a1b2",
    isAnonymous: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    responses: [
      {
        id: "r1",
        content:
          "That heavy dread is so real, and it's exhausting. You put words to something a lot of us feel. You're not alone.",
        authorId: "user_c3d4",
        isAnonymous: true,
        identityRevealed: false,
        createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
        helpfulVotes: 4,
      },
    ],
    helpfulVotes: 12,
    tags: ["overwhelmed", "anxiety"],
  },
  {
    id: "v2",
    content:
      "Just got laid off. Third time in two years. I'm trying to stay positive but it's hard. The job market feels impossible right now.",
    authorId: "user_e5f6",
    isAnonymous: true,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    responses: [],
    helpfulVotes: 8,
    tags: ["unemployed", "financial stress"],
  },
  {
    id: "v3",
    content:
      "I lost my grandmother last week. She was my person. I don't know who I am without her.",
    authorId: "user_g7h8",
    isAnonymous: false,
    authorName: "Marisol",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    responses: [
      {
        id: "r2",
        content:
          "Grief like this is love with nowhere to go. I'm so sorry, Marisol. Sending you so much warmth.",
        authorId: "user_i9j0",
        isAnonymous: false,
        authorName: "Dev",
        identityRevealed: true,
        createdAt: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
        helpfulVotes: 7,
      },
    ],
    helpfulVotes: 21,
    tags: ["grief", "loss"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────

const CURRENT_USER_ID = "user_me_0000";

function isValidUserProfile(obj: unknown): obj is UserProfile {
  if (!obj || typeof obj !== "object") return false;
  const p = obj as Record<string, unknown>;
  return (
    typeof p.rewardsBalance === "number" &&
    typeof p.engagementStreak === "number" &&
    typeof p.locationEnabled === "boolean" &&
    typeof p.anonymous === "boolean" &&
    typeof p.locationRadius === "number" &&
    Array.isArray(p.doomSpiralRemedies) &&
    Array.isArray(p.naturalSkills) &&
    Array.isArray(p.hobbies)
  );
}

function loadProfile(): UserProfile | null {
  try {
    const raw = localStorage.getItem("tb_profile");
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isValidUserProfile(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function saveProfile(p: UserProfile) {
  try {
    localStorage.setItem("tb_profile", JSON.stringify(p));
  } catch {
    // ignore
  }
}

export default function FeedPage() {
  // Lazy initialisers read from localStorage once (avoids useEffect setState cascade)
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    if (typeof window === "undefined") return null;
    return loadProfile();
  });
  const [vents, setVents] = useState<Vent[]>(() => {
    const p = typeof window === "undefined" ? null : loadProfile();
    return SEED_VENTS.map((v) => ({
      ...v,
      resources: getResourcesForVent(v.content, p ?? undefined),
    }));
  });
  const [ventText, setVentText] = useState("");
  const [postAnon, setPostAnon] = useState(() => {
    if (typeof window === "undefined") return true;
    const p = loadProfile();
    return p?.anonymous ?? true;
  });
  const [showRewards, setShowRewards] = useState(false);

  function handlePost() {
    if (!ventText.trim()) return;

    const newVent: Vent = {
      id: `v_${Date.now()}`,
      content: ventText.trim(),
      authorId: CURRENT_USER_ID,
      authorName: postAnon ? undefined : (profile?.displayName ?? undefined),
      isAnonymous: postAnon,
      createdAt: new Date().toISOString(),
      responses: [],
      resources: getResourcesForVent(ventText.trim(), profile ?? undefined),
      helpfulVotes: 0,
      tags: [],
    };

    setVents((prev) => [newVent, ...prev]);
    setVentText("");

    // Award kindness points for posting
    if (profile) {
      const updated = { ...profile, rewardsBalance: profile.rewardsBalance + KP_REWARDS.POST_VENT };
      setProfile(updated);
      saveProfile(updated);
    }
  }

  function handleHelpful(ventId: string) {
    setVents((prev) =>
      prev.map((v) =>
        v.id === ventId ? { ...v, helpfulVotes: v.helpfulVotes + 1 } : v
      )
    );
    // Award for giving a helpful vote
    if (profile) {
      const updated = { ...profile, rewardsBalance: profile.rewardsBalance + KP_REWARDS.GIVE_HELPFUL_VOTE };
      setProfile(updated);
      saveProfile(updated);
    }
  }

  function handleReply(ventId: string, content: string, anonymous: boolean) {
    setVents((prev) =>
      prev.map((v) => {
        if (v.id !== ventId) return v;
        const resp = {
          id: `resp_${Date.now()}`,
          content,
          authorId: CURRENT_USER_ID,
          authorName: anonymous ? undefined : (profile?.displayName ?? undefined),
          isAnonymous: anonymous,
          identityRevealed: false,
          createdAt: new Date().toISOString(),
          helpfulVotes: 0,
        };
        return { ...v, responses: [...v.responses, resp] };
      })
    );
    // Award for supportive response
    if (profile) {
      const updated = { ...profile, rewardsBalance: profile.rewardsBalance + KP_REWARDS.POST_REPLY };
      setProfile(updated);
      saveProfile(updated);
    }
  }

  const rewardsBalance = profile?.rewardsBalance ?? 0;
  const streak = profile?.engagementStreak ?? 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">TB</span>
            </div>
            <span className="font-semibold text-gray-900">touch-base</span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Compact rewards badge */}
            <button
              onClick={() => setShowRewards(!showRewards)}
              className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full hover:bg-amber-100 transition-colors"
            >
              <span className="text-sm">💛</span>
              <span className="text-xs font-semibold text-amber-700">
                {rewardsBalance.toLocaleString()} KP
              </span>
            </button>

            {/* Profile / settings */}
            <Link
              href="/onboarding"
              className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center"
              title="Edit profile"
            >
              <span className="text-white text-xs font-bold">
                {profile?.displayName?.[0] ?? "?"}
              </span>
            </Link>
          </div>
        </div>

        {/* Location indicator */}
        {profile?.locationEnabled && (
          <div className="max-w-2xl mx-auto px-4 pb-2">
            <div className="flex items-center gap-1.5 text-xs text-indigo-600">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                Showing resources within {profile.locationRadius} mi
                {profile.customLocation ? ` of ${profile.customLocation}` : ""}
              </span>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Rewards panel (toggleable) */}
        {showRewards && (
          <RewardsWidget balance={rewardsBalance} streak={streak} />
        )}

        {/* Vent composer */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">
                {postAnon ? "?" : (profile?.displayName?.[0] ?? "Y")}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">
                {postAnon
                  ? "Posting anonymously"
                  : `Posting as ${profile?.displayName ?? "yourself"}`}
              </p>
            </div>
          </div>

          <textarea
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none bg-gray-50 placeholder-gray-400"
            rows={3}
            placeholder="What's on your mind? Vent freely — this is a safe space."
            value={ventText}
            onChange={(e) => setVentText(e.target.value)}
            maxLength={1000}
          />
          <div className="flex items-center justify-between mt-3">
            <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
              <div
                onClick={() => setPostAnon(!postAnon)}
                className={`relative w-8 h-5 rounded-full transition-colors ${
                  postAnon ? "bg-indigo-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                    postAnon ? "translate-x-3.5" : "translate-x-0.5"
                  }`}
                />
              </div>
              Anonymous
            </label>

            <div className="flex items-center gap-3">
              {ventText.length > 0 && (
                <span className="text-xs text-gray-400">
                  {ventText.length}/1000
                </span>
              )}
              <button
                onClick={handlePost}
                disabled={!ventText.trim()}
                className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Post
              </button>
            </div>
          </div>
        </div>

        {/* No profile nudge */}
        {!profile && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 flex items-start gap-3">
            <span className="text-2xl">👋</span>
            <div>
              <p className="text-sm font-semibold text-indigo-900">
                Get personalised resource recommendations
              </p>
              <p className="text-xs text-indigo-700 mt-0.5">
                Complete the quick onboarding to enable location-based support
                and tailored suggestions.
              </p>
              <Link
                href="/onboarding"
                className="inline-block mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline"
              >
                Set up my profile →
              </Link>
            </div>
          </div>
        )}

        {/* Feed */}
        <div className="space-y-4">
          {vents.length === 0 && (
            <p className="text-center text-sm text-gray-500 py-12">
              Be the first to share. This is a safe space.
            </p>
          )}
          {vents.map((vent) => (
            <VentCard
              key={vent.id}
              vent={vent}
              currentUserId={CURRENT_USER_ID}
              onHelpful={handleHelpful}
              onReply={handleReply}
              profile={profile ?? undefined}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
