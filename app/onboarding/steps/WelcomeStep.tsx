"use client";

import Link from "next/link";

interface Props {
  onNext: () => void;
}

export default function WelcomeStep({ onNext }: Props) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Icon */}
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg">
        <span className="text-4xl">🤝</span>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        Welcome to touch-base
      </h2>
      <p className="text-gray-600 max-w-md mb-8 leading-relaxed">
        A safe, supportive community on the BASE chain where you can vent
        honestly, discover local resources, and connect with people who
        genuinely care — anonymously if you prefer.
      </p>

      {/* What to expect */}
      <div className="w-full max-w-md space-y-3 mb-8 text-left">
        {[
          {
            emoji: "📍",
            title: "Local resources, on demand",
            body: "Opt in to location services and we'll surface nearby mental-health services, support groups, events, and community spaces relevant to what you're going through.",
          },
          {
            emoji: "🎭",
            title: "Your privacy, your choice",
            body: "Post anonymously by default. Reveal your identity only when you feel comfortable — through an encrypted direct message.",
          },
          {
            emoji: "💙",
            title: "Rewarded for kindness",
            body: "Consistent engagement and meaningful support earn BASE-chain kindness points redeemable for real value on-chain.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100"
          >
            <span className="text-2xl flex-shrink-0">{item.emoji}</span>
            <div>
              <p className="text-sm font-semibold text-gray-900">{item.title}</p>
              <p className="text-xs text-gray-600 mt-0.5">{item.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Privacy note */}
      <p className="text-xs text-gray-500 max-w-xs mb-8">
        Your answers are stored locally in your browser and never sold.
        Location data is only sent when you actively request nearby resources.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        <button
          onClick={onNext}
          className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-md"
        >
          Let&apos;s get started →
        </button>
        <Link
          href="/feed"
          className="flex-1 text-center border border-gray-300 text-gray-600 py-3 px-6 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm"
        >
          Skip for now
        </Link>
      </div>
    </div>
  );
}
