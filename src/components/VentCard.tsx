'use client';

import { useState } from 'react';
import type { Vent } from '@/lib/types';

interface VentCardProps {
  vent: {
    id: string;
    content: string;
    category?: string;
    isAnonymous: boolean;
    supportCount: number;
  };
  onSupport?: (id: string) => void;
  onReachOut?: (id: string) => void;
}

export default function VentCard({ vent, onSupport, onReachOut }: VentCardProps) {
  const [hasSupported, setHasSupported] = useState(false);
  const [supportCount, setSupportCount] = useState(vent.supportCount);

  const handleSupport = () => {
    if (!hasSupported) {
      setHasSupported(true);
      setSupportCount(prev => prev + 1);
      onSupport?.(vent.id);
    }
  };

  const getCategoryColor = (category?: string) => {
    const colors = {
      stress: 'bg-zen-moss-100 text-zen-moss-700',
      anxiety: 'bg-zen-water-100 text-zen-water-700',
      relationships: 'bg-meditation-dawn text-zen-sand-700',
      work: 'bg-zen-stone-100 text-zen-stone-700',
      health: 'bg-zen-sand-100 text-zen-sand-700',
      general: 'bg-zen-sand-50 text-zen-stone-600',
    };
    return colors[category as keyof typeof colors] || colors.general;
  };

  return (
    <div className="bg-white rounded-zen shadow-zen p-6 mb-4 hover:shadow-zen-soft transition-all duration-300 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-zen-sand-200 rounded-full flex items-center justify-center">
            <span className="text-zen-stone-600">
              {vent.isAnonymous ? '🎭' : '🌸'}
            </span>
          </div>
          <div>
            <p className="text-sm text-zen-stone-600 font-medium">
              {vent.isAnonymous ? 'Anonymous' : 'Community Member'}
            </p>
          </div>
        </div>
        {vent.category && (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(vent.category)}`}>
            {vent.category}
          </span>
        )}
      </div>

      {/* Content */}
      <p className="text-zen-stone-800 leading-relaxed mb-4 font-serif">
        {vent.content}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-3 border-t border-zen-sand-100">
        <button
          onClick={handleSupport}
          disabled={hasSupported}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
            hasSupported
              ? 'bg-zen-moss-100 text-zen-moss-700'
              : 'bg-zen-sand-100 text-zen-stone-700 hover:bg-zen-moss-200 hover:scale-105'
          }`}
        >
          <span>{hasSupported ? '💚' : '🤍'}</span>
          <span className="text-sm font-medium">
            {supportCount} {supportCount === 1 ? 'support' : 'supports'}
          </span>
        </button>

        {onReachOut && (
          <button
            onClick={() => onReachOut(vent.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-zen-water-100 text-zen-water-700 hover:bg-zen-water-200 transition-all duration-200 hover:scale-105"
          >
            <span>🤝</span>
            <span className="text-sm font-medium">Reach out</span>
          </button>
        )}
      </div>
    </div>
  );
}
