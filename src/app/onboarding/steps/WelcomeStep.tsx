"use client";

import Link from "next/link";

interface Props {
  onNext: () => void;
}

export default function WelcomeStep({ onNext }: Props) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-5xl mb-6">🤝</div>

      <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-3">
        Welcome to TouchBase
      </h2>
      <p className="text-sm text-stone-500 dark:text-stone-400 max-w-sm mb-8 leading-relaxed">
        A safe, supportive community on the BASE chain where you can vent
        honestly, discover local resources, and connect with people who
        genuinely care — anonymously if you prefer.
      </p>

      <div className="w-full space-y-3 mb-8 text-left">
        {[
          {
            emoji: "📍",
            title: "Local resources, on demand",
            body: "Opt in to location services and get nearby mental-health services, support groups, and community spaces matched to what you're going through.",
          },
          {
            emoji: "🎭",
            title: "Your privacy, your choice",
            body: "Post anonymously by default. Reveal your identity only when you feel comfortable.",
          },
          {
            emoji: "💛",
            title: "Rewarded for kindness",
            body: "Consistent engagement earns BASE-chain Kindness Points redeemable for real on-chain value.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex gap-3 p-4 bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-100 dark:border-stone-700"
          >
            <span className="text-2xl flex-shrink-0">{item.emoji}</span>
            <div>
              <p className="text-sm font-semibold text-stone-800 dark:text-stone-100">{item.title}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{item.body}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-stone-400 mb-6">
        Your answers are stored locally in your browser and never sold.
      </p>

      <div className="flex flex-col gap-3 w-full">
        <button
          onClick={onNext}
          className="bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 py-3 px-6 rounded-full font-semibold text-sm hover:bg-stone-700 dark:hover:bg-stone-100 transition-colors"
        >
          Let&apos;s get started →
        </button>
        <Link
          href="/feed"
          className="text-center text-sm text-stone-400 hover:text-stone-600 py-2"
        >
          Skip for now
        </Link>
      </div>
    </div>
  );
}
