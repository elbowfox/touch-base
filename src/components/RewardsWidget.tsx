'use client';

import { useState, useEffect } from 'react';

interface RewardsWidgetProps {
  karmaPoints: number;
  onClaimReward?: () => void;
}

export default function RewardsWidget({ karmaPoints, onClaimReward }: RewardsWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Trigger animation when points change
    setShowAnimation(true);
    const timer = setTimeout(() => setShowAnimation(false), 1000);
    return () => clearTimeout(timer);
  }, [karmaPoints]);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Main Widget */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={`bg-gradient-to-br from-zen-moss-400 to-zen-moss-600 text-white rounded-zen shadow-zen cursor-pointer transition-all duration-300 ${
          showAnimation ? 'animate-breathe' : ''
        } ${isExpanded ? 'w-64' : 'w-auto'}`}
      >
        {/* Collapsed View */}
        {!isExpanded && (
          <div className="px-5 py-3 flex items-center gap-3">
            <span className="text-2xl animate-float">✨</span>
            <div>
              <p className="text-xs opacity-90">Karma Points</p>
              <p className="text-xl font-bold">{karmaPoints}</p>
            </div>
          </div>
        )}

        {/* Expanded View */}
        {isExpanded && (
          <div className="p-5 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-zen font-semibold">Your Karma</h3>
              <span className="text-2xl">✨</span>
            </div>

            <div className="bg-white/20 rounded-lg p-4 mb-4">
              <p className="text-3xl font-bold text-center mb-1">{karmaPoints}</p>
              <p className="text-xs text-center opacity-90">Karma Points</p>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="opacity-90">Daily check-in</span>
                <span className="font-medium">+1 KP</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="opacity-90">Share support</span>
                <span className="font-medium">+3 KP</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="opacity-90">Post vent</span>
                <span className="font-medium">+5 KP</span>
              </div>
            </div>

            {onClaimReward && karmaPoints >= 50 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClaimReward();
                }}
                className="w-full bg-white text-zen-moss-600 px-4 py-2 rounded-full font-medium hover:bg-zen-sand-50 transition-colors"
              >
                Claim Reward
              </button>
            )}
          </div>
        )}
      </div>

      {/* Ripple effect when points increase */}
      {showAnimation && (
        <div className="absolute inset-0 rounded-zen border-4 border-zen-moss-400 animate-ripple pointer-events-none" />
      )}
    </div>
  );
}
