"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ComposeForm from "@/components/ComposeForm";
import { Vent } from "@/lib/types";

export default function ComposePage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  function handleCreated(_: Vent) {
    setSubmitted(true);
    setTimeout(() => router.push("/feed"), 1500);
  }

  return (
    <main>
      <header className="border-b border-stone-200 px-5 py-4 dark:border-stone-800">
        <h1 className="text-base font-semibold tracking-tight text-stone-800 dark:text-stone-100">
          Let it out
        </h1>
        <p className="text-xs text-stone-400">
          This space is safe. You can remain anonymous.
        </p>
      </header>

      <div className="p-5">
        {submitted ? (
          <div className="py-12 text-center">
            <p className="text-3xl">🕊️</p>
            <p className="mt-3 text-sm font-medium text-stone-700 dark:text-stone-300">
              Released. Taking you back…
            </p>
          </div>
        ) : (
          <>
            <ComposeForm onCreated={handleCreated} />

            <aside className="mt-6 rounded-xl border border-stone-200 bg-stone-100 p-4 text-xs leading-relaxed text-stone-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-400">
              <p className="font-medium text-stone-700 dark:text-stone-300">
                🌿 A note on anonymity
              </p>
              <p className="mt-1">
                When you choose to stay anonymous, no identifying information is
                stored. Your vent is not linked to your wallet, your Farcaster
                account, or any device fingerprint. You are truly invisible here.
              </p>
            </aside>
          </>
        )}
      </div>
    </main>
  );
}
