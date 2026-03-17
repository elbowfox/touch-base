"use client";

import { UserProfile } from "@/lib/types";

interface Props {
  profile: UserProfile;
  onChange: (patch: Partial<UserProfile>) => void;
  onFinish: () => void;
  onBack: () => void;
}

function TripleInput({
  label, hint, values, placeholder, onChange,
}: {
  label: string;
  hint: string;
  values: [string, string, string];
  placeholder: [string, string, string];
  onChange: (v: [string, string, string]) => void;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-stone-800 dark:text-stone-100 block mb-0.5">{label}</label>
      <p className="text-xs text-stone-400 mb-2">{hint}</p>
      <div className="space-y-2">
        {([0, 1, 2] as const).map((i) => (
          <input
            key={i}
            type="text"
            className="w-full px-3 py-2 border border-stone-200 dark:border-stone-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 bg-white dark:bg-stone-800 dark:text-stone-200 placeholder-stone-400"
            placeholder={placeholder[i]}
            value={values[i]}
            onChange={(e) => {
              const next = [...values] as [string, string, string];
              next[i] = e.target.value;
              onChange(next);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProfileStep({ profile, onChange, onFinish, onBack }: Props) {
  return (
    <div>
      <h2 className="text-lg font-bold text-stone-800 dark:text-stone-100 mb-1">🌿 Your Profile</h2>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-5">
        These answers shape your resource recommendations. All stored locally.
      </p>

      <div className="space-y-5">
        {/* Display name */}
        <div>
          <label className="text-sm font-semibold text-stone-800 dark:text-stone-100 block mb-0.5">
            Display name <span className="text-stone-400 font-normal">(optional)</span>
          </label>
          <p className="text-xs text-stone-400 mb-2">Used when you choose not to post anonymously.</p>
          <input
            type="text"
            className="w-full px-3 py-2 border border-stone-200 dark:border-stone-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 bg-white dark:bg-stone-800 dark:text-stone-200 placeholder-stone-400"
            placeholder="How should we call you?"
            value={profile.displayName ?? ""}
            onChange={(e) => onChange({ displayName: e.target.value || undefined })}
          />
        </div>

        <TripleInput
          label="What pulls you out of a doom spiral?"
          hint="3 things that genuinely help when you're struggling"
          values={profile.doomSpiralRemedies as [string, string, string]}
          placeholder={["a long walk", "calling a friend", "hot shower"]}
          onChange={(v) => onChange({ doomSpiralRemedies: v })}
        />

        <TripleInput
          label="Your natural skills"
          hint="What do you do naturally well?"
          values={profile.naturalSkills as [string, string, string]}
          placeholder={["listening", "problem-solving", "creativity"]}
          onChange={(v) => onChange({ naturalSkills: v })}
        />

        <div>
          <label className="text-sm font-semibold text-stone-800 dark:text-stone-100 block mb-0.5">Comfort food</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-stone-200 dark:border-stone-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 bg-white dark:bg-stone-800 dark:text-stone-200 placeholder-stone-400"
            placeholder="Soup, pasta, ice cream…"
            value={profile.comfortFood}
            onChange={(e) => onChange({ comfortFood: e.target.value })}
          />
        </div>

        {/* Anonymous default */}
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            onClick={() => onChange({ anonymous: !profile.anonymous })}
            className={`relative w-10 h-6 rounded-full transition-colors ${profile.anonymous ? "bg-stone-700" : "bg-stone-300"}`}
          >
            <div
              className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${profile.anonymous ? "translate-x-5" : "translate-x-1"}`}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-800 dark:text-stone-100">Post anonymously by default</p>
            <p className="text-xs text-stone-400">You can change this per-post any time.</p>
          </div>
        </label>
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 px-5 py-2.5 rounded-xl font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">← Back</button>
        <button onClick={onFinish} className="bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 px-6 py-2.5 rounded-xl font-semibold hover:bg-stone-700 transition-colors">Let&apos;s go ✦</button>
      </div>
    </div>
  );
}
