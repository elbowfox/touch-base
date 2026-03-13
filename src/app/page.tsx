'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ZenLoading from '@/components/ZenLoading';
import { getQuoteOfTheDay } from '@/lib/quotes';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const quote = getQuoteOfTheDay();

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <ZenLoading onLoadComplete={() => setIsLoading(false)} minimumLoadTime={3000} />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-zen-sand-50 via-meditation-dawn to-zen-sand-100">
      {/* Header */}
      <header className="container-zen py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌸</span>
            <h1 className="text-2xl font-zen font-bold text-zen-stone-800">TouchBase</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/feed"
              className="text-zen-stone-700 hover:text-zen-moss-600 transition-colors font-medium"
            >
              Feed
            </Link>
            <Link
              href="/register"
              className="btn-zen"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container-zen py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="inline-block relative mb-6">
              <div className="w-32 h-32 mx-auto">
                <div className="absolute inset-0 border-4 border-zen-moss-300 rounded-full animate-ripple" />
                <div className="absolute inset-0 bg-zen-moss-500 rounded-full flex items-center justify-center animate-breathe">
                  <span className="text-5xl">🏯</span>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl font-zen font-bold text-zen-stone-800 mb-6 animate-slide-up">
            Your Personal Virtual Zen Garden
          </h2>

          <p className="text-xl md:text-2xl text-zen-stone-600 mb-8 leading-relaxed animate-slide-up font-serif">
            A beautiful marriage of form and function. Find peace, support, and community in your wellness journey.
          </p>

          {/* Quote of the Day */}
          <div className="card-zen max-w-2xl mx-auto mb-12 animate-slide-up">
            <p className="text-xs uppercase tracking-wide text-zen-moss-600 mb-3 font-medium">
              Quote of the Day
            </p>
            <blockquote className="text-lg text-zen-stone-700 font-serif italic mb-2">
              "{quote.text}"
            </blockquote>
            <cite className="text-sm text-zen-stone-500 not-italic">
              — {quote.source}
            </cite>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
            <Link
              href="/onboarding"
              className="btn-zen text-lg px-8 py-4"
            >
              Begin Your Journey 🌸
            </Link>
            <Link
              href="/feed"
              className="btn-zen-outline text-lg px-8 py-4"
            >
              Explore Community
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-zen py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="card-zen text-center animate-slide-up">
            <div className="text-5xl mb-4">🤝</div>
            <h3 className="text-xl font-zen font-semibold text-zen-stone-800 mb-2">
              Share & Support
            </h3>
            <p className="text-zen-stone-600">
              Express yourself safely and receive compassionate support from the community.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="card-zen text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-xl font-zen font-semibold text-zen-stone-800 mb-2">
              Earn Karma Points
            </h3>
            <p className="text-zen-stone-600">
              Get rewarded for positive engagement and unlock premium wellness resources.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="card-zen text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-5xl mb-4">🧘</div>
            <h3 className="text-xl font-zen font-semibold text-zen-stone-800 mb-2">
              Mindful Moderation
            </h3>
            <p className="text-zen-stone-600">
              AI-powered agent ensures a safe, supportive, and uplifting environment.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container-zen py-12 mt-20 border-t border-zen-sand-200">
        <div className="text-center text-zen-stone-500 text-sm">
          <p className="mb-2">Built on BASE • Powered by Farcaster</p>
          <p>A space for healing, growth, and community 🌸</p>
        </div>
      </footer>
    </main>
  );
}
