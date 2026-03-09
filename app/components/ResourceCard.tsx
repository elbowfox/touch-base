"use client";

import { LocalResource } from "@/lib/types";
import {
  RESOURCE_TYPE_COLORS,
  RESOURCE_TYPE_LABELS,
} from "@/lib/resources";

interface Props {
  resource: LocalResource;
  compact?: boolean;
}

export default function ResourceCard({ resource, compact = false }: Props) {
  const typeColor = RESOURCE_TYPE_COLORS[resource.type];
  const typeLabel = RESOURCE_TYPE_LABELS[resource.type];

  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl hover:border-indigo-200 hover:shadow-sm transition-all ${
        compact ? "p-3" : "p-4"
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColor}`}>
              {typeLabel}
            </span>
            {resource.isVerified && (
              <span className="text-xs text-green-700 flex items-center gap-0.5">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Verified
              </span>
            )}
            {resource.distance !== undefined && (
              <span className="text-xs text-gray-500">
                {resource.distance.toFixed(1)} mi away
              </span>
            )}
          </div>
          <h4 className={`font-semibold text-gray-900 ${compact ? "text-sm" : ""}`}>
            {resource.name}
          </h4>
        </div>
      </div>

      {!compact && (
        <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
      )}

      <div className={`flex flex-wrap gap-3 ${compact ? "text-xs" : "text-sm"}`}>
        {resource.phone && (
          <a
            href={`tel:${resource.phone.replace(/\D/g, "")}`}
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            {resource.phone}
          </a>
        )}
        {resource.website && (
          <a
            href={resource.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Website
          </a>
        )}
        {resource.hours && (
          <span className="flex items-center gap-1 text-gray-500">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {resource.hours}
          </span>
        )}
      </div>
    </div>
  );
}
