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

const RADIUS_OPTIONS = [5, 10, 25, 50] as const;

export default function LocationStep({
  locationEnabled, coordinates, customLocation, locationRadius,
  onChange, onNext, onBack,
}: Props) {
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState(customLocation ?? "");

  function requestGeolocation() {
    if (!navigator.geolocation) { setLocError("Geolocation not supported."); return; }
    setLocating(true); setLocError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        onChange({ locationEnabled: true, coordinates: { lat: pos.coords.latitude, lng: pos.coords.longitude }, customLocation: undefined, locationRadius });
      },
      (err) => {
        setLocating(false);
        setLocError(err.code === 1 ? "Permission denied. Enter your area below." : "Could not locate you. Enter it manually below.");
      },
      { timeout: 15_000 }
    );
  }

  function handleManualSubmit() {
    if (!manualInput.trim()) return;
    onChange({ locationEnabled: true, coordinates: undefined, customLocation: manualInput.trim(), locationRadius });
  }

  const hasLocation = locationEnabled && (coordinates || customLocation);

  return (
    <div>
      <h2 className="text-lg font-bold text-stone-800 dark:text-stone-100 mb-1">📍 Location Services</h2>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-5">
        Allow TouchBase to surface support resources, community spaces, and events near you.
      </p>

      {!hasLocation ? (
        <div className="space-y-4">
          <button
            onClick={requestGeolocation}
            disabled={locating}
            className="w-full flex items-center justify-center gap-2 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 py-3 rounded-full font-semibold text-sm hover:bg-stone-700 disabled:opacity-60 transition-colors"
          >
            {locating ? (
              <><span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />Locating…</>
            ) : "Use my current location"}
          </button>

          {locError && <p className="text-xs text-red-600 bg-red-50 rounded-lg p-3">{locError}</p>}

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-200 dark:border-stone-700" /></div>
            <div className="relative flex justify-center text-xs text-stone-400"><span className="bg-white dark:bg-stone-900 px-2">or enter your area</span></div>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 px-3 py-2 border border-stone-300 dark:border-stone-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 bg-white dark:bg-stone-800 dark:text-stone-200"
              placeholder="City, ZIP, or neighbourhood…"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleManualSubmit()}
            />
            <button
              onClick={handleManualSubmit}
              disabled={!manualInput.trim()}
              className="px-4 py-2 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 rounded-xl text-sm font-medium hover:bg-stone-700 disabled:opacity-50 transition-colors"
            >Set</button>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl mb-4">
          <p className="text-sm font-semibold text-green-800 dark:text-green-300 flex items-center gap-1.5">
            ✅ Location set
          </p>
          <p className="text-xs text-green-700 dark:text-green-400 mt-0.5">
            {coordinates ? `Coordinates: ${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}` : customLocation}
          </p>
          <button
            onClick={() => onChange({ locationEnabled: false, coordinates: undefined, customLocation: undefined, locationRadius })}
            className="mt-1.5 text-xs text-green-700 dark:text-green-400 underline"
          >Remove</button>
        </div>
      )}

      {hasLocation && (
        <div className="mt-4">
          <label className="text-sm font-medium text-stone-700 dark:text-stone-300 block mb-2">Search radius</label>
          <div className="flex gap-2">
            {RADIUS_OPTIONS.map((r) => (
              <button
                key={r}
                onClick={() => onChange({ locationEnabled, coordinates, customLocation, locationRadius: r })}
                className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${
                  locationRadius === r
                    ? "bg-stone-800 text-white border-stone-800 dark:bg-stone-200 dark:text-stone-900"
                    : "bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-300 dark:border-stone-600"
                }`}
              >{r} mi</button>
            ))}
          </div>
        </div>
      )}

      {!hasLocation && (
        <button
          onClick={() => onChange({ locationEnabled: false, coordinates: undefined, customLocation: undefined, locationRadius })}
          className="w-full mt-3 text-sm text-stone-400 hover:text-stone-600 py-2"
        >Skip — I&apos;d prefer not to share my location</button>
      )}

      <p className="text-xs text-stone-400 mt-4">Location data is never stored on our servers.</p>

      <div className="mt-6 flex justify-between">
        <button onClick={onBack} className="border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 px-5 py-2.5 rounded-xl font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">← Back</button>
        <button onClick={onNext} className="bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 px-6 py-2.5 rounded-xl font-semibold hover:bg-stone-700 transition-colors">Next →</button>
      </div>
    </div>
  );
}
