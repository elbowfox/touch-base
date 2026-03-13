'use client';

import { useState, useEffect } from 'react';
import { getRandomQuote, type Quote } from '@/lib/quotes';

interface ZenLoadingProps {
  onLoadComplete?: () => void;
  minimumLoadTime?: number;
}

export default function ZenLoading({ onLoadComplete, minimumLoadTime = 2000 }: ZenLoadingProps) {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Set initial quote
    setQuote(getRandomQuote());

    // Rotate quotes every 3 seconds
    const quoteInterval = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setQuote(getRandomQuote());
        setOpacity(1);
      }, 500);
    }, 3000);

    // Handle load completion
    const timer = setTimeout(() => {
      setOpacity(0);
      setTimeout(() => {
        onLoadComplete?.();
      }, 500);
    }, minimumLoadTime);

    return () => {
      clearInterval(quoteInterval);
      clearTimeout(timer);
    };
  }, [onLoadComplete, minimumLoadTime]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-zen-sand-50 via-meditation-dawn to-zen-sand-100 flex items-center justify-center z-50">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Zen Circle Animation */}
        <div className="relative mb-12">
          <div className="w-24 h-24 mx-auto">
            {/* Outer ripple */}
            <div className="absolute inset-0 border-4 border-zen-moss-300 rounded-full animate-ripple" />
            {/* Middle ripple */}
            <div className="absolute inset-0 border-4 border-zen-moss-400 rounded-full animate-ripple" style={{ animationDelay: '0.5s' }} />
            {/* Inner circle */}
            <div className="absolute inset-0 bg-zen-moss-500 rounded-full flex items-center justify-center animate-breathe">
              <span className="text-3xl">🌸</span>
            </div>
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-4xl md:text-5xl font-zen text-zen-stone-800 mb-8 animate-fade-in">
          TouchBase
        </h1>

        {/* Quote Display */}
        {quote && (
          <div
            className="transition-opacity duration-500"
            style={{ opacity }}
          >
            <blockquote className="text-xl md:text-2xl text-zen-stone-700 font-serif italic mb-4 leading-relaxed">
              "{quote.text}"
            </blockquote>
            <cite className="text-sm text-zen-stone-500 not-italic">
              — {quote.source}
              {quote.chapter && `, ${quote.chapter}`}
            </cite>
          </div>
        )}

        {/* Loading Indicator */}
        <div className="mt-12">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-zen-moss-500 rounded-full animate-float" />
            <div className="w-2 h-2 bg-zen-moss-500 rounded-full animate-float" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-zen-moss-500 rounded-full animate-float" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
