"use client";

import { useEffect, useState, useCallback } from "react";
import VentCard from "@/components/VentCard";
import { Vent, KindnessReaction } from "@/lib/types";

export default function FeedPage() {
  const [vents, setVents] = useState<Vent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/vent")
      .then((r) => r.json())
      .then((data: Vent[]) => setVents(data))
      .catch(() => setError("Couldn't load the feed. Please refresh."))
      .finally(() => setLoading(false));
  }, []);

  const handleReact = useCallback(
    async (ventId: string, reaction: KindnessReaction) => {
      const res = await fetch("/api/react", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ventId, reaction }),
      });

      if (!res.ok) {
        throw new Error("Failed to send reaction");
      }
    },
    []
  );

  return (
    <main className="flex flex-col gap-0">
      {/* header */}
      <header className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/90 px-5 py-4 backdrop-blur-sm dark:border-stone-800 dark:bg-stone-950/90">
        <h1 className="text-base font-semibold tracking-tight text-stone-800 dark:text-stone-100">
          TouchBase
        </h1>
        <p className="text-xs text-stone-400">
          You are not alone. Reach out and touch someone.
        </p>
      </header>

      <div className="flex flex-col gap-3 p-4">
        {loading && (
          <p className="py-12 text-center text-sm text-stone-400">
            Loading…
          </p>
        )}

        {error && (
          <p
            role="alert"
            className="py-12 text-center text-sm text-rose-500"
          >
            {error}
          </p>
        )}

        {!loading && !error && vents.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-2xl">🌿</p>
            <p className="mt-2 text-sm text-stone-400">
              No vents yet. Be the first to share.
            </p>
          </div>
        )}

        {vents.map((vent) => (
          <VentCard key={vent.id} vent={vent} onReact={handleReact} />
        ))}
      </div>
    </main>
  );
}
