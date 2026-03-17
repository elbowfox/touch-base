"use client";

import { Resource } from "@/lib/types";

interface Props {
  resource: Resource;
}

const CATEGORY_STYLES: Record<string, { bg: string; border: string; emoji: string }> = {
  crisis:       { bg: "bg-red-50",    border: "border-red-200",    emoji: "🆘" },
  mental_health:{ bg: "bg-blue-50",   border: "border-blue-200",   emoji: "🧠" },
  financial:    { bg: "bg-green-50",  border: "border-green-200",  emoji: "💚" },
  grief:        { bg: "bg-purple-50", border: "border-purple-200", emoji: "🕊️" },
  community:    { bg: "bg-amber-50",  border: "border-amber-200",  emoji: "🤝" },
  spiritual:    { bg: "bg-indigo-50", border: "border-indigo-200", emoji: "✨" },
  physical:     { bg: "bg-teal-50",   border: "border-teal-200",   emoji: "💪" },
  substance:    { bg: "bg-orange-50", border: "border-orange-200", emoji: "🌱" },
};

export default function ResourceCard({ resource }: Props) {
  const style = CATEGORY_STYLES[resource.category] ?? CATEGORY_STYLES.community;

  return (
    <div className={`rounded-xl border ${style.bg} ${style.border} p-3`}>
      <div className="flex items-start gap-2">
        <span className="text-lg flex-shrink-0">{style.emoji}</span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-stone-800">{resource.title}</p>
          <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{resource.description}</p>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {resource.phone && (
              <a
                href={`tel:${resource.phone}`}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
              >
                📞 {resource.phone}
              </a>
            )}
            {resource.url && (
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
              >
                🔗 Learn more
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
