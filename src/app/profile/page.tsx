"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserProfile } from "@/lib/types";
import { PREMIUM_FEATURES, PREMIUM_MONTHLY_PRICE_USD } from "@/lib/payments";
import PremiumModal from "@/components/PremiumModal";
import BoosterPacksModal from "@/components/BoosterPacksModal";

function loadProfile(): UserProfile | null {
  try {
    const raw = typeof window !== "undefined" ? localStorage.getItem("tb_profile") : null;
    return raw ? (JSON.parse(raw) as UserProfile) : null;
  } catch {
    return null;
  }
}

function saveProfile(p: UserProfile) {
  try { localStorage.setItem("tb_profile", JSON.stringify(p)); } catch { /* ignore */ }
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showPremium, setShowPremium] = useState(false);
  const [showBoosters, setShowBoosters] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setProfile(loadProfile()); }, []);

  function updateProfile(patch: Partial<UserProfile>) {
    if (!profile) return;
    const updated = { ...profile, ...patch };
    setProfile(updated);
    saveProfile(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  if (!profile) {
    return (
      <main className="p-6 text-center">
        <p className="text-sm text-stone-500">No profile found.</p>
        <button
          onClick={() => router.push("/onboarding")}
          className="mt-4 rounded-full bg-stone-800 px-6 py-2.5 text-sm font-medium text-white dark:bg-stone-200 dark:text-stone-900"
        >
          Set up profile →
        </button>
      </main>
    );
  }

  const isPremiumActive =
    profile.isPremium &&
    profile.premiumExpiry &&
    new Date(profile.premiumExpiry) > new Date();

  return (
    <>
      <main className="pb-24">
        <header className="border-b border-stone-200 px-5 py-4 dark:border-stone-800">
          <h1 className="text-base font-semibold tracking-tight text-stone-800 dark:text-stone-100">
            Profile & Settings
          </h1>
          {saved && (
            <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">✓ Saved</p>
          )}
        </header>

        <div className="p-5 space-y-6">

          {/* ── Sanctuary Premium ── */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-3">
              Membership
            </h2>
            {isPremiumActive ? (
              <div className="rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🏅</span>
                    <p className="font-semibold text-amber-800 dark:text-amber-300">Sanctuary Member</p>
                  </div>
                  <span className="rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:text-green-400">
                    Active
                  </span>
                </div>
                <p className="text-xs text-amber-700 dark:text-amber-400 mb-3">
                  Renews {new Date(profile.premiumExpiry!).toLocaleDateString()} · ${PREMIUM_MONTHLY_PRICE_USD} USDC/mo
                </p>
                <ul className="space-y-1.5">
                  {PREMIUM_FEATURES.map((f) => (
                    <li key={f.label} className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400">
                      <span>{f.emoji}</span>{f.label}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-stone-800 dark:text-stone-100">Sanctuary Premium</p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">${PREMIUM_MONTHLY_PRICE_USD} USDC / month</p>
                  </div>
                  <button
                    onClick={() => setShowPremium(true)}
                    className="rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-4 py-1.5 text-xs font-semibold text-white hover:from-amber-300 hover:to-orange-300 transition-colors"
                  >
                    Upgrade
                  </button>
                </div>
                <ul className="space-y-1 mt-2">
                  {PREMIUM_FEATURES.map((f) => (
                    <li key={f.label} className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                      <span>{f.emoji}</span>{f.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* ── Kindness Points ── */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-3">
              Kindness Points
            </h2>
            <div className="rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/50 p-4 flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-amber-700 dark:text-amber-400 tabular-nums">
                  {profile.rewardsBalance.toLocaleString()} KP
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  🔥 {profile.engagementStreak}d streak
                  {isPremiumActive && " · 2× multiplier active"}
                </p>
              </div>
              <button
                onClick={() => setShowBoosters(true)}
                className="rounded-xl border border-amber-300 dark:border-amber-700 bg-white dark:bg-stone-800 px-4 py-2 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:bg-amber-50 transition-colors"
              >
                ⚡ Boost
              </button>
            </div>
          </section>

          {/* ── Display name ── */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-3">
              Identity
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-stone-700 dark:text-stone-300 block mb-1">
                  Display name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-stone-200 dark:border-stone-700 rounded-xl text-sm bg-white dark:bg-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-400"
                  value={profile.displayName ?? ""}
                  placeholder="Optional — shown when not anonymous"
                  onChange={(e) => updateProfile({ displayName: e.target.value || undefined })}
                />
              </div>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-stone-800 dark:text-stone-100">Post anonymously by default</p>
                  <p className="text-xs text-stone-400">Overridable per-post</p>
                </div>
                <div
                  onClick={() => updateProfile({ anonymous: !profile.anonymous })}
                  className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer ${profile.anonymous ? "bg-stone-700" : "bg-stone-300"}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${profile.anonymous ? "translate-x-5" : "translate-x-1"}`} />
                </div>
              </label>
            </div>
          </section>

          {/* ── Location ── */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-3">
              Location
            </h2>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium text-stone-800 dark:text-stone-100">Location-aware resources</p>
                <p className="text-xs text-stone-400">Matches nearby support services to your vents</p>
              </div>
              <div
                onClick={() => updateProfile({ locationEnabled: !profile.locationEnabled })}
                className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer ${profile.locationEnabled ? "bg-stone-700" : "bg-stone-300"}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${profile.locationEnabled ? "translate-x-5" : "translate-x-1"}`} />
              </div>
            </label>
          </section>

          {/* ── Danger zone ── */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-3">
              Account
            </h2>
            <button
              onClick={() => {
                if (confirm("Clear all local profile data? This cannot be undone.")) {
                  localStorage.removeItem("tb_profile");
                  router.push("/onboarding");
                }
              }}
              className="text-xs text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 transition-colors"
            >
              Clear profile data
            </button>
          </section>
        </div>
      </main>

      {showPremium && (
        <PremiumModal
          profile={profile}
          onSuccess={(updated) => { setProfile(updated); saveProfile(updated); setShowPremium(false); }}
          onClose={() => setShowPremium(false)}
        />
      )}
      {showBoosters && (
        <BoosterPacksModal
          profile={profile}
          onSuccess={(updated) => { setProfile(updated); saveProfile(updated); setShowBoosters(false); }}
          onClose={() => setShowBoosters(false)}
        />
      )}
    </>
  );
}
