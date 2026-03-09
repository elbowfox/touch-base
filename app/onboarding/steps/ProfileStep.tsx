"use client";

import { UserProfile } from "@/lib/types";

type ProfilePatch = Partial<
  Pick<
    UserProfile,
    | "doomSpiralRemedies"
    | "naturalSkills"
    | "comfortFood"
    | "hobbies"
    | "displayName"
    | "anonymous"
  >
>;

interface Props {
  profile: Pick<
    UserProfile,
    | "doomSpiralRemedies"
    | "naturalSkills"
    | "comfortFood"
    | "hobbies"
    | "displayName"
    | "anonymous"
  >;
  onChange: (patch: ProfilePatch) => void;
  onFinish: () => void;
  onBack: () => void;
}

function TripleInput({
  label,
  hint,
  values,
  placeholder,
  onChange,
}: {
  label: string;
  hint: string;
  values: [string, string, string];
  placeholder: [string, string, string];
  onChange: (v: [string, string, string]) => void;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-800 block mb-0.5">
        {label}
      </label>
      <p className="text-xs text-gray-500 mb-2">{hint}</p>
      <div className="space-y-2">
        {([0, 1, 2] as const).map((i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
              {i + 1}
            </span>
            <input
              type="text"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder={placeholder[i]}
              value={values[i]}
              onChange={(e) => {
                const next: [string, string, string] = [...values] as [
                  string,
                  string,
                  string,
                ];
                next[i] = e.target.value;
                onChange(next);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProfileStep({
  profile,
  onChange,
  onFinish,
  onBack,
}: Props) {
  const canFinish =
    profile.doomSpiralRemedies.some((v) => v.trim()) ||
    profile.naturalSkills.some((v) => v.trim()) ||
    profile.comfortFood.trim() ||
    profile.hobbies.length > 0;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          🌱 Tell us a bit about you
        </h2>
        <p className="text-sm text-gray-600">
          These answers help us surface resources and content that actually
          resonate with you. They&apos;re stored locally — never shared without
          your permission.
        </p>
      </div>

      <div className="space-y-6">
        {/* Doom spiral remedies */}
        <TripleInput
          label="What pulls you out of a doom spiral?"
          hint="Three things that help — no matter how far gone you feel."
          values={profile.doomSpiralRemedies}
          placeholder={["A long walk", "Calling a friend", "Cooking something"]}
          onChange={(v) => onChange({ doomSpiralRemedies: v })}
        />

        {/* Natural skills */}
        <TripleInput
          label="Three things you've always had a knack for"
          hint="Skills, talents, or things people compliment you on."
          values={profile.naturalSkills}
          placeholder={["Listening", "Fixing things", "Making people laugh"]}
          onChange={(v) => onChange({ naturalSkills: v })}
        />

        {/* Comfort food */}
        <div>
          <label className="text-sm font-semibold text-gray-800 block mb-0.5">
            What&apos;s your favourite comfort food?
          </label>
          <p className="text-xs text-gray-500 mb-2">
            We use this to find food-related community events near you.
          </p>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. pasta, tacos, soup…"
            value={profile.comfortFood}
            onChange={(e) => onChange({ comfortFood: e.target.value })}
          />
        </div>

        {/* Hobbies */}
        <div>
          <label className="text-sm font-semibold text-gray-800 block mb-0.5">
            Hobbies &amp; interests
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Comma-separated — we&apos;ll match you with local activities and
            spaces.
          </p>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. hiking, painting, board games, coding…"
            value={profile.hobbies.join(", ")}
            onChange={(e) =>
              onChange({
                hobbies: e.target.value
                  .split(",")
                  .map((h) => h.trim())
                  .filter(Boolean),
              })
            }
          />
        </div>

        {/* Display name / anonymity */}
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
          <label className="text-sm font-semibold text-gray-800 block mb-1">
            Identity &amp; privacy
          </label>
          <p className="text-xs text-gray-500 mb-3">
            You can always post anonymously. Set a display name for moments
            when you choose to reveal yourself.
          </p>

          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
            placeholder="Display name (optional)"
            value={profile.displayName ?? ""}
            onChange={(e) =>
              onChange({ displayName: e.target.value || undefined })
            }
          />

          <label className="flex items-center gap-2 cursor-pointer">
            <div
              onClick={() => onChange({ anonymous: !profile.anonymous })}
              className={`relative w-10 h-6 rounded-full transition-colors ${
                profile.anonymous ? "bg-indigo-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                  profile.anonymous ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </div>
            <span className="text-sm text-gray-700">
              Post anonymously by default
            </span>
          </label>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onFinish}
          className={`px-6 py-2.5 rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors${canFinish ? "" : " opacity-90"}`}
        >
          {canFinish ? "All done — take me in 🎉" : "Skip — take me in →"}
        </button>
      </div>
    </div>
  );
}
