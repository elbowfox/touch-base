'use client';

import type { Resource } from '@/lib/types';
import { RESOURCE_CATEGORIES } from '@/lib/constants';

interface ResourceCardProps {
  resource: Resource;
  onAccess?: (id: string) => void;
}

export default function ResourceCard({ resource, onAccess }: ResourceCardProps) {
  const category = RESOURCE_CATEGORIES[resource.category];

  return (
    <div className="bg-white rounded-zen shadow-zen-soft p-5 hover:shadow-zen transition-all duration-300 animate-slide-up group">
      {/* Icon and Category */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-zen-sand-100 rounded-full flex items-center justify-center text-2xl group-hover:animate-float">
          {resource.icon}
        </div>
        <span className="text-xs font-medium text-zen-stone-500 uppercase tracking-wide">
          {category.name}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-zen-stone-800 mb-2 font-zen">
        {resource.title}
      </h3>
      <p className="text-sm text-zen-stone-600 leading-relaxed mb-4">
        {resource.description}
      </p>

      {/* Action */}
      <div className="flex items-center justify-between">
        {resource.url ? (
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-zen-moss-500 text-white rounded-full hover:bg-zen-moss-600 transition-all duration-200 text-sm font-medium hover:scale-105"
          >
            <span>Access</span>
            <span>→</span>
          </a>
        ) : (
          <button
            onClick={() => onAccess?.(resource.id)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-zen-moss-500 text-white rounded-full hover:bg-zen-moss-600 transition-all duration-200 text-sm font-medium hover:scale-105"
          >
            <span>Learn more</span>
          </button>
        )}

        {resource.karmaPointsCost !== undefined && resource.karmaPointsCost > 0 && (
          <span className="text-xs text-zen-stone-500 flex items-center gap-1">
            <span>✨</span>
            <span>{resource.karmaPointsCost} KP</span>
          </span>
        )}
      </div>
    </div>
  );
}
