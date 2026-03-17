"use client";

import { useEffect, useState } from "react";
import { getRandomQuote } from "@/lib/quotes";

export default function ZenLoading() {
  const [quote] = useState(getRandomQuote);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="text-4xl mb-6 animate-pulse">🌿</div>
      <blockquote className="text-sm italic text-stone-500 dark:text-stone-400 max-w-xs leading-relaxed">
        &ldquo;{quote.text}&rdquo;
      </blockquote>
      {quote.author !== "TouchBase" && (
        <cite className="text-xs text-stone-400 mt-2 not-italic">
          — {quote.author}
        </cite>
      )}
    </div>
  );
}
