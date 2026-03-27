"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function JoinContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Store the referral token so onboarding can pick it up
    if (ref) {
      try {
        localStorage.setItem("tb_referral_token", ref);
        localStorage.setItem("tb_referral_source", "elvis");
      } catch {
        /* localStorage not available */
      }
    }
    setReady(true);
  }, [ref]);

  function handleGetStarted() {
    router.push("/onboarding");
  }

  function handleBrowse() {
    router.push("/feed");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      {/* Elvis greeting */}
      <div className="mb-6 text-5xl">🎸</div>
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-stone-800 dark:text-stone-100">
        Elvis sent you!
      </h1>
      <p className="mb-1 text-base text-stone-600 dark:text-stone-400">
        Welcome to <span className="font-semibold text-stone-800 dark:text-stone-200">TouchBase</span> — your safe, supportive home base.
      </p>
      <p className="mb-8 text-sm text-stone-500 dark:text-stone-500">
        A community where it&apos;s okay to not be okay.
      </p>

      {/* Feature highlights */}
      <div className="mb-8 grid max-w-sm gap-3">
        {[
          { emoji: "🎭", text: "Share anonymously — no judgment, just support" },
          { emoji: "💛", text: "Earn Kindness Points for every act of compassion" },
          { emoji: "📍", text: "Get matched with local resources near you" },
          { emoji: "🏅", text: "Unlock Sanctuary Premium for 2× rewards" },
        ].map((f) => (
          <div
            key={f.text}
            className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white p-3 text-left dark:border-stone-700 dark:bg-stone-800"
          >
            <span className="text-lg">{f.emoji}</span>
            <span className="text-sm text-stone-700 dark:text-stone-300">{f.text}</span>
          </div>
        ))}
      </div>

      {/* CTAs */}
      {ready && (
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            onClick={handleGetStarted}
            className="w-full rounded-full bg-stone-800 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-700 dark:bg-stone-200 dark:text-stone-900 dark:hover:bg-stone-300"
          >
            Set up your profile ✦
          </button>
          <button
            onClick={handleBrowse}
            className="w-full rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 dark:border-stone-600 dark:text-stone-400 dark:hover:bg-stone-800"
          >
            Browse the feed first
          </button>
        </div>
      )}

      <p className="mt-6 text-xs text-stone-400 dark:text-stone-600">
        Powered by BASE chain · Built with love and kindness
      </p>
    </main>
  );
}

export default function JoinPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <span className="animate-pulse text-3xl">🌿</span>
        </main>
      }
    >
      <JoinContent />
    </Suspense>
  );
}
