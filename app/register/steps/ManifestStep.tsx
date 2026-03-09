"use client";

import { useState } from "react";
import Link from "next/link";
import { FarcasterManifest } from "@/lib/types";

interface Props {
  manifest: FarcasterManifest;
  onBack: () => void;
}

export default function ManifestStep({ manifest, onBack }: Props) {
  const [copied, setCopied] = useState(false);
  const [downloadClicked, setDownloadClicked] = useState(false);

  const manifestJson = JSON.stringify(manifest, null, 2);

  async function handleCopy() {
    await navigator.clipboard.writeText(manifestJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([manifestJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "farcaster.json";
    a.click();
    URL.revokeObjectURL(url);
    setDownloadClicked(true);
    setTimeout(() => setDownloadClicked(false), 2000);
  }

  const hasAccountAssociation =
    manifest.accountAssociation.header.trim().length > 0 &&
    manifest.accountAssociation.payload.trim().length > 0 &&
    manifest.accountAssociation.signature.trim().length > 0;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Your Farcaster Manifest
        </h2>
        <p className="text-sm text-gray-600">
          Copy or download your{" "}
          <code className="bg-gray-100 px-1 rounded text-xs">farcaster.json</code>{" "}
          and host it at{" "}
          <code className="bg-gray-100 px-1 rounded text-xs">
            https://{manifest.miniapp.canonicalDomain || "your-domain.com"}
            /.well-known/farcaster.json
          </code>
        </p>
      </div>

      {!hasAccountAssociation && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex gap-2">
          <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-xs text-amber-800">
            <span className="font-semibold">Missing account association.</span> Go back
            and complete the domain verification step to make your manifest valid.
          </p>
        </div>
      )}

      {/* JSON preview */}
      <div className="relative">
        <div className="flex items-center justify-between bg-gray-800 rounded-t-xl px-4 py-2">
          <span className="text-xs text-gray-400 font-mono">
            .well-known/farcaster.json
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition-colors bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition-colors bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
            >
              {downloadClicked ? (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Downloaded!
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </>
              )}
            </button>
          </div>
        </div>
        <pre className="bg-gray-900 text-gray-100 rounded-b-xl p-4 text-xs overflow-x-auto max-h-96 overflow-y-auto font-mono leading-relaxed">
          {manifestJson}
        </pre>
      </div>

      {/* Deployment instructions */}
      <div className="mt-6 space-y-4">
        <h3 className="text-base font-semibold text-gray-900">Next Steps</h3>

        <div className="space-y-3">
          <div className="flex gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
              1
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Host the manifest file
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                Upload{" "}
                <code className="bg-gray-100 px-1 rounded">farcaster.json</code> to your
                server so it&apos;s accessible at{" "}
                <code className="bg-gray-100 px-1 rounded text-xs">
                  https://{manifest.miniapp.canonicalDomain || "your-domain.com"}
                  /.well-known/farcaster.json
                </code>
              </p>
              {manifest.miniapp.canonicalDomain && (
                <a
                  href={`https://${manifest.miniapp.canonicalDomain}/.well-known/farcaster.json`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                >
                  Verify your manifest →
                </a>
              )}
            </div>
          </div>

          {!hasAccountAssociation && (
            <div className="flex gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Complete domain verification
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  Go back and add your{" "}
                  <code className="bg-gray-100 px-1 rounded">accountAssociation</code>{" "}
                  values from Warpcast Developer Tools to make your manifest valid.
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
              {hasAccountAssociation ? "2" : "3"}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Configure CORS headers
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                Make sure your server returns{" "}
                <code className="bg-gray-100 px-1 rounded">
                  Content-Type: application/json
                </code>{" "}
                for the manifest endpoint.
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
              {hasAccountAssociation ? "3" : "4"}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Your app is live! 🎉
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                Once deployed, your Mini App will be discoverable in Farcaster clients
                and the BASE app store. Share your app URL to let users try it!
              </p>
              <a
                href="https://miniapps.farcaster.xyz/docs/guides/publishing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline mt-1 inline-block"
              >
                Publishing guide →
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={onBack}
          className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          ← Back
        </button>
        <Link
          href="/"
          className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Done 🎉
        </Link>
      </div>
    </div>
  );
}
