"use client";

import { AppDetails } from "@/lib/types";

interface AccountAssociation {
  header: string;
  payload: string;
  signature: string;
}

interface Props {
  details: AppDetails;
  accountAssociation: AccountAssociation;
  onChange: (association: AccountAssociation) => void;
  onNext: () => void;
  onBack: () => void;
}

const inputClass =
  "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow";

function InstructionStep({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
        {number}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-1">{title}</h4>
        <div className="text-sm text-gray-600">{children}</div>
      </div>
    </div>
  );
}

export default function VerifyStep({
  details,
  accountAssociation,
  onChange,
  onNext,
  onBack,
}: Props) {
  function update(key: keyof AccountAssociation, value: string) {
    onChange({ ...accountAssociation, [key]: value });
  }

  const isVerified =
    accountAssociation.header.trim().length > 0 &&
    accountAssociation.payload.trim().length > 0 &&
    accountAssociation.signature.trim().length > 0;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Verify Domain Ownership
        </h2>
        <p className="text-sm text-gray-600">
          Prove that you own{" "}
          <strong className="text-gray-900">
            {details.canonicalDomain || "your domain"}
          </strong>{" "}
          by signing it with your Farcaster account.
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
        <h3 className="text-sm font-semibold text-blue-900 mb-4 uppercase tracking-wide">
          How to get your Account Association
        </h3>
        <div className="space-y-4">
          <InstructionStep number="1" title="Open Warpcast on your mobile device">
            Download Warpcast from the App Store or Google Play if you haven&apos;t
            already.
          </InstructionStep>
          <InstructionStep number="2" title="Enable Developer Mode">
            Go to{" "}
            <span className="font-medium">Settings → Advanced → Developer Mode</span>{" "}
            and toggle it on.
          </InstructionStep>
          <InstructionStep number="3" title="Navigate to Domains">
            Go to{" "}
            <span className="font-medium">Settings → Developer → Domains</span>.
          </InstructionStep>
          <InstructionStep number="4" title="Enter your domain and sign">
            Enter{" "}
            <code className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-xs font-mono">
              {details.canonicalDomain || "your-domain.com"}
            </code>{" "}
            and tap <span className="font-medium">Generate</span>. Warpcast will sign
            the domain with your Farcaster custody wallet.
          </InstructionStep>
          <InstructionStep number="5" title="Copy the generated values">
            Copy the <strong>header</strong>, <strong>payload</strong>, and{" "}
            <strong>signature</strong> values shown and paste them below.
          </InstructionStep>
        </div>
      </div>

      {/* Alternative: BASE Developer Tools */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Alternative:</span> Use the{" "}
          <a
            href="https://docs.base.org/mini-apps/technical-guides/sign-manifest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            BASE Manifest Signing Tool
          </a>{" "}
          at{" "}
          <a
            href="https://build.top/manifest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-mono text-xs"
          >
            build.top/manifest
          </a>{" "}
          to generate your account association values.
        </p>
      </div>

      {/* Input fields */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            Header
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            className={inputClass}
            value={accountAssociation.header}
            onChange={(e) => update("header", e.target.value)}
            placeholder="eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Base64-encoded JWT header from Warpcast domain signing.
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            Payload
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            className={inputClass}
            value={accountAssociation.payload}
            onChange={(e) => update("payload", e.target.value)}
            placeholder="eyJkb21haW4iOiJteWFwcC5leGFtcGxlLmNvbSJ9..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Base64-encoded payload containing your domain.
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            Signature
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            className={inputClass}
            value={accountAssociation.signature}
            onChange={(e) => update("signature", e.target.value)}
            placeholder="0x1234abcd..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Cryptographic signature proving domain ownership.
          </p>
        </div>
      </div>

      {/* Skip option */}
      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-xs text-amber-800">
          <span className="font-semibold">Don&apos;t have these yet?</span> You can
          proceed with placeholder values and fill them in before deploying your
          manifest. The manifest won&apos;t be valid until you add the real values.
        </p>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          ← Back
        </button>
        <div className="flex gap-3">
          <button
            onClick={onNext}
            className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Skip for now
          </button>
          <button
            onClick={onNext}
            disabled={!isVerified}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next: Get Manifest →
          </button>
        </div>
      </div>
    </div>
  );
}
