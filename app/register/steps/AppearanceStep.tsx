"use client";

import { AppDetails } from "@/lib/types";

interface Props {
  details: AppDetails;
  onChange: (details: AppDetails) => void;
  onNext: () => void;
  onBack: () => void;
}

const CATEGORY_OPTIONS = [
  "social",
  "defi",
  "gaming",
  "nft",
  "utility",
  "analytics",
  "payments",
  "identity",
  "developer-tools",
  "other",
];

const inputClass =
  "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow";

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

export default function AppearanceStep({ details, onChange, onNext, onBack }: Props) {
  function update(key: keyof AppDetails, value: string | string[]) {
    onChange({ ...details, [key]: value });
  }

  function toggleCategory(cat: string) {
    const current = details.categories;
    if (current.includes(cat)) {
      update("categories", current.filter((c) => c !== cat));
    } else {
      update("categories", [...current, cat]);
    }
  }

  function handleTagsChange(value: string) {
    const tags = value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    update("tags", tags);
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Appearance</h2>
        <p className="text-sm text-gray-600">
          Customize how your Mini App looks in Farcaster clients.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Splash Image URL"
          hint="200×200px image shown while your app loads."
        >
          <input
            type="url"
            className={inputClass}
            value={details.splashImageUrl}
            onChange={(e) => update("splashImageUrl", e.target.value)}
            placeholder="https://myapp.example.com/splash.png"
          />
        </Field>

        <Field
          label="Splash Background Color"
          hint="Hex color for the splash screen background (e.g. #0000FF)."
        >
          <div className="flex items-center gap-2">
            <input
              type="color"
              className="w-10 h-10 rounded border border-gray-300 cursor-pointer p-0.5"
              value={details.splashBackgroundColor}
              onChange={(e) => update("splashBackgroundColor", e.target.value)}
            />
            <input
              type="text"
              className={inputClass}
              value={details.splashBackgroundColor}
              onChange={(e) => update("splashBackgroundColor", e.target.value)}
              placeholder="#ffffff"
              pattern="^#[0-9A-Fa-f]{6}$"
            />
          </div>
        </Field>

        <div className="sm:col-span-2">
          <Field
            label="Hero Image URL"
            hint="1200×630px image for social previews and rich embeds."
          >
            <input
              type="url"
              className={inputClass}
              value={details.heroImageUrl}
              onChange={(e) => update("heroImageUrl", e.target.value)}
              placeholder="https://myapp.example.com/hero.png"
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field
            label="Tags"
            hint="Comma-separated tags to help users discover your app (e.g. social, defi, nft)."
          >
            <input
              type="text"
              className={inputClass}
              value={details.tags.join(", ")}
              onChange={(e) => handleTagsChange(e.target.value)}
              placeholder="social, defi, nft"
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-gray-700 block mb-2">Categories</label>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  details.categories.includes(cat)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1.5">Select all that apply.</p>
        </div>
      </div>

      {/* Preview */}
      {(details.splashBackgroundColor || details.iconUrl) && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">
            Splash Screen Preview
          </p>
          <div
            className="w-40 h-40 rounded-2xl mx-auto flex items-center justify-center shadow-md"
            style={{ backgroundColor: details.splashBackgroundColor || "#ffffff" }}
          >
            {details.splashImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={details.splashImageUrl}
                alt="Splash"
                className="w-20 h-20 rounded-xl object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : details.iconUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={details.iconUrl}
                alt="Icon"
                className="w-20 h-20 rounded-xl object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <div className="w-20 h-20 rounded-xl bg-white/30 flex items-center justify-center">
                <span className="text-2xl">🖼️</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Next: Verify Domain →
        </button>
      </div>
    </div>
  );
}
