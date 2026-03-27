"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ImportPayload, ImportResult } from "@/lib/types";

export default function ImportPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<ImportPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);

  const parseFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const data = JSON.parse(text) as ImportPayload;
        if (!data.vents || !Array.isArray(data.vents)) {
          setError('Invalid format: expected a JSON object with a "vents" array.');
          return;
        }
        setPreview(data);
        setError(null);
      } catch {
        setError("Could not parse file. Please upload a valid JSON file.");
      }
    };
    reader.readAsText(file);
  }, []);

  const handleFile = useCallback((file: File) => {
    if (!file.name.endsWith(".json")) {
      setError("Only .json files are supported.");
      return;
    }
    setError(null);
    setPreview(null);
    parseFile(file);
  }, [parseFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  async function handleImport() {
    if (!preview) return;
    setImporting(true);
    setError(null);
    try {
      const res = await fetch("/api/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preview),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Import failed. Please try again.");
        return;
      }
      setResult(json as ImportResult);
      setPreview(null);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setImporting(false);
    }
  }

  if (result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center">
        <span className="text-5xl mb-4">✅</span>
        <h1 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-2">
          Import complete
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-2">
          {result.imported} {result.imported === 1 ? "vent" : "vents"} imported successfully.
        </p>
        {result.errors.length > 0 && (
          <p className="text-xs text-amber-600 dark:text-amber-400 mb-2">
            {result.errors.length} {result.errors.length === 1 ? "entry" : "entries"} skipped.
          </p>
        )}
        <div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
          <button
            onClick={() => router.push("/feed")}
            className="bg-stone-800 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-stone-700 transition-colors dark:bg-stone-200 dark:text-stone-900"
          >
            View feed →
          </button>
          <button
            onClick={() => { setResult(null); setError(null); }}
            className="border border-stone-300 text-stone-600 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-stone-100 transition-colors dark:border-stone-700 dark:text-stone-400"
          >
            Import more
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/90 px-5 py-4 backdrop-blur-sm dark:border-stone-800 dark:bg-stone-950/90">
        <h1 className="text-base font-semibold tracking-tight text-stone-800 dark:text-stone-100">
          Import your data
        </h1>
        <p className="text-xs text-stone-400">Bring your vents with you.</p>
      </header>

      <main className="flex flex-col gap-4 p-4 max-w-lg mx-auto">
        {/* Info card */}
        <div className="rounded-2xl border border-stone-200 bg-stone-50 dark:bg-stone-900 dark:border-stone-700 p-4">
          <h2 className="text-sm font-semibold text-stone-700 dark:text-stone-200 mb-1">
            What can I import?
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
            Upload a <strong>.json</strong> file with a{" "}
            <code className="px-1 py-0.5 bg-stone-200 dark:bg-stone-700 rounded text-[10px]">vents</code>{" "}
            array. Each entry needs a{" "}
            <code className="px-1 py-0.5 bg-stone-200 dark:bg-stone-700 rounded text-[10px]">content</code>{" "}
            field (up to 280 characters).
          </p>
          <pre className="mt-3 text-[10px] bg-stone-100 dark:bg-stone-800 p-3 rounded-xl overflow-x-auto text-stone-600 dark:text-stone-300 leading-relaxed">
{`{
  "vents": [
    {
      "content": "Your vent text here",
      "anonymous": true,
      "tags": ["overwhelmed"]
    }
  ]
}`}
          </pre>
        </div>

        {/* Drop zone */}
        {!preview && (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-colors ${
              dragging
                ? "border-stone-500 bg-stone-100 dark:bg-stone-800"
                : "border-stone-300 dark:border-stone-600 hover:border-stone-400 dark:hover:border-stone-500"
            }`}
          >
            <span className="text-4xl block mb-3">📂</span>
            <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
              Drop your JSON file here
            </p>
            <p className="text-xs text-stone-400 mt-1">or click to browse</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </div>
        )}

        {/* Error */}
        {error && (
          <p role="alert" className="text-xs text-rose-500 text-center">
            {error}
          </p>
        )}

        {/* Preview */}
        {preview?.vents && (
          <div className="rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden">
            <div className="px-4 py-3 border-b border-stone-200 dark:border-stone-700 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-stone-700 dark:text-stone-200">
                Preview — {preview.vents.length}{" "}
                {preview.vents.length === 1 ? "vent" : "vents"}
              </h2>
              <button
                onClick={() => { setPreview(null); setError(null); }}
                className="text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
              >
                Clear
              </button>
            </div>

            <ul className="divide-y divide-stone-100 dark:divide-stone-800 max-h-64 overflow-y-auto">
              {preview.vents.slice(0, 10).map((v, i) => (
                <li key={i} className="px-4 py-3">
                  <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2">
                    {v.content}
                  </p>
                  {v.tags && v.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {v.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-1.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              ))}
              {preview.vents.length > 10 && (
                <li className="px-4 py-3 text-center text-xs text-stone-400">
                  +{preview.vents.length - 10} more
                </li>
              )}
            </ul>

            <div className="px-4 py-3 border-t border-stone-200 dark:border-stone-700">
              <button
                onClick={handleImport}
                disabled={importing}
                className="w-full bg-stone-800 text-white py-2.5 rounded-full text-sm font-medium hover:bg-stone-700 disabled:opacity-50 transition-colors dark:bg-stone-200 dark:text-stone-900"
              >
                {importing
                  ? "Importing…"
                  : `Import ${preview.vents.length} ${preview.vents.length === 1 ? "vent" : "vents"}`}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
