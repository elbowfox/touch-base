"use client";

import { AppDetails } from "@/lib/types";

interface Props {
  details: AppDetails;
  onChange: (details: AppDetails) => void;
  onNext: () => void;
}

const MAX_NAME_LENGTH = 32;
const NAME_CHAR_WARNING_THRESHOLD = MAX_NAME_LENGTH - 4;

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

const inputClass =
  "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow";

export default function DetailsStep({ details, onChange, onNext }: Props) {
  function update(key: keyof AppDetails, value: string) {
    onChange({ ...details, [key]: value });
  }

  function isValid() {
    return (
      details.name.trim().length > 0 &&
      details.name.trim().length <= MAX_NAME_LENGTH &&
      details.homeUrl.trim().length > 0 &&
      details.iconUrl.trim().length > 0 &&
      details.canonicalDomain.trim().length > 0
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">App Details</h2>
        <p className="text-sm text-gray-600">
          Enter the basic information about your Farcaster Mini App.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="App Name"
          required
          hint="Max 32 characters. This is how your app appears in Farcaster."
        >
          <input
            type="text"
            className={inputClass}
            value={details.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="My Cool App"
            maxLength={MAX_NAME_LENGTH}
          />
          <span className={`text-xs self-end ${details.name.length > NAME_CHAR_WARNING_THRESHOLD ? "text-orange-500" : "text-gray-400"}`}>
            {details.name.length}/{MAX_NAME_LENGTH}
          </span>
        </Field>

        <Field
          label="Canonical Domain"
          required
          hint="Your app's domain without https:// (e.g. myapp.example.com)"
        >
          <input
            type="text"
            className={inputClass}
            value={details.canonicalDomain}
            onChange={(e) => update("canonicalDomain", e.target.value)}
            placeholder="myapp.example.com"
          />
        </Field>

        <div className="sm:col-span-2">
          <Field
            label="Description"
            hint="A short description of what your app does."
          >
            <textarea
              className={inputClass + " resize-none"}
              value={details.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="A decentralized app on the BASE chain that..."
              rows={3}
              maxLength={200}
            />
          </Field>
        </div>

        <Field
          label="Tagline"
          hint="A short, catchy phrase for your app."
        >
          <input
            type="text"
            className={inputClass}
            value={details.tagline}
            onChange={(e) => update("tagline", e.target.value)}
            placeholder="The best way to..."
            maxLength={80}
          />
        </Field>

        <Field
          label="Home URL"
          required
          hint="The entry point for your Mini App (must be HTTPS)."
        >
          <input
            type="url"
            className={inputClass}
            value={details.homeUrl}
            onChange={(e) => update("homeUrl", e.target.value)}
            placeholder="https://myapp.example.com"
          />
        </Field>

        <Field
          label="Icon URL"
          required
          hint="1024×1024px PNG, no alpha channel. Must be publicly accessible."
        >
          <input
            type="url"
            className={inputClass}
            value={details.iconUrl}
            onChange={(e) => update("iconUrl", e.target.value)}
            placeholder="https://myapp.example.com/icon.png"
          />
        </Field>

        <Field
          label="Webhook URL"
          hint="Optional. Receive notifications about Mini App events."
        >
          <input
            type="url"
            className={inputClass}
            value={details.webhookUrl}
            onChange={(e) => update("webhookUrl", e.target.value)}
            placeholder="https://myapp.example.com/api/webhook"
          />
        </Field>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          disabled={!isValid()}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next: Appearance →
        </button>
      </div>
    </div>
  );
}
