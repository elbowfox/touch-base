"use client";

import { useState } from "react";
import { Coordinates } from "@/lib/types";

interface Props {
  locationEnabled: boolean;
  coordinates?: Coordinates;
  customLocation?: string;
  locationRadius: number;
  onChange: (patch: {
    locationEnabled: boolean;
    coordinates?: Coordinates;
    customLocation?: string;
    locationRadius: number;
  }) => void;
  onNext: () => void;
  onBack: () => void;
}

const RADIUS_OPTIONS = [5, 10, 25, 50];

export default function LocationStep({
  locationEnabled,
  coordinates,
  customLocation,
  locationRadius,
  onChange,
  onNext,
  onBack,
}: Props) {
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState(customLocation ?? "");

  function requestGeolocation() {
    if (!navigator.geolocation) {
      setLocError("Geolocation is not supported by your browser.");
      return;
    }
    setLocating(true);
    setLocError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        onChange({
          locationEnabled: true,
          coordinates: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          },
          customLocation: undefined,
          locationRadius,
        });
      },
      (err) => {
        setLocating(false);
        setLocError(
          err.code === 1
            ? "Permission denied. Please allow location access or enter your area below."
            : "Could not determine your location. Please enter it manually below."
        );
      },
      { timeout: 15_000 }
    );
  }

  function handleManualSubmit() {
    if (!manualInput.trim()) return;
    onChange({
      locationEnabled: true,
      coordinates: undefined,
      customLocation: manualInput.trim(),
      locationRadius,
    });
  }

  function handleDecline() {
    onChange({
      locationEnabled: false,
      coordinates: undefined,
      customLocation: undefined,
      locationRadius,
    });
  }

  const hasLocation = locationEnabled && (coordinates || customLocation);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          📍 Location Services
        </h2>
        <p className="text-sm text-gray-600">
          Allow touch-base to surface support resources, community spaces, and
          events near you. You can change this any time.
        </p>
      </div>

      {/* Enable / disable toggle */}
      {!hasLocation ? (
        <div className="space-y-4">
          {/* Primary CTA */}
          <button
            onClick={requestGeolocation}
            disabled={locating}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-60 transition-colors"
          >
            {locating ? (
              <>
                <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                Locating…
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Use my current location
              </>
            )}
          </button>

          {locError && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg p-3">
              {locError}
            </p>
          )}

          {/* Manual location fallback */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs text-gray-500">
              <span className="bg-white px-2">or enter your area</span>
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="City, ZIP, or neighbourhood…"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleManualSubmit()}
            />
            <button
              onClick={handleManualSubmit}
              disabled={!manualInput.trim()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              Set
            </button>
          </div>
        </div>
      ) : (
        /* Location confirmed */
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl mb-4">
          <div className="flex items-center gap-2 mb-1">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm font-semibold text-green-800">
              Location set
            </span>
          </div>
          <p className="text-xs text-green-700">
            {coordinates
              ? `Coordinates: ${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`
              : customLocation}
          </p>
          <button
            onClick={handleDecline}
            className="mt-2 text-xs text-green-700 underline hover:text-green-900"
          >
            Remove location
          </button>
        </div>
      )}

      {/* Radius picker — shown whenever location is enabled */}
      {hasLocation && (
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Search radius
          </label>
          <div className="flex gap-2">
            {RADIUS_OPTIONS.map((r) => (
              <button
                key={r}
                onClick={() =>
                  onChange({
                    locationEnabled,
                    coordinates,
                    customLocation,
                    locationRadius: r,
                  })
                }
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  locationRadius === r
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"
                }`}
              >
                {r} mi
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Decline option */}
      {!hasLocation && (
        <button
          onClick={handleDecline}
          className="w-full mt-3 text-sm text-gray-500 hover:text-gray-700 py-2 transition-colors"
        >
          Skip — I&apos;d prefer not to share my location
        </button>
      )}

      {/* Privacy assurance */}
      <p className="text-xs text-gray-400 mt-4">
        Location data is used only to find nearby resources and is never stored
        on our servers.
      </p>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
