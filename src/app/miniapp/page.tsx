import type { Metadata } from "next";
import Link from "next/link";
import { baseIntegration } from "@/lib/base";

export const metadata: Metadata = {
  title: "Mini-app registration | Touch Base",
  description:
    "Share this mini-app URL with BASE.dev to register Touch Base for Builder Code attribution.",
};

export default function MiniAppPage() {
  const { miniAppUrl, builderCode, payoutAddress, appName } = baseIntegration;

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-16 lg:px-10">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
            BASE.dev ready
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
            {appName} mini-app URL
          </h1>
          <p className="max-w-2xl text-base text-slate-600">
            Provide this URL to BASE.dev when registering the project. It is
            stable across environments and backed by the JSON manifest at{" "}
            <Link href="/api/miniapp" className="text-blue-700 underline">
              /api/miniapp
            </Link>
            .
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Registration URL</p>
          <code className="mt-2 block overflow-hidden text-ellipsis whitespace-pre-wrap rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-base font-mono text-slate-900">
            {miniAppUrl}
          </code>
          <p className="mt-3 text-sm text-slate-500">
            Paste this URL into the BASE.dev registration form to link your
            mini-app and Builder Code attribution.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
              Builder code
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {builderCode || "Not set yet"}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Set <code className="font-mono">NEXT_PUBLIC_BASE_BUILDER_CODE</code>{" "}
              to surface your issued Builder Code here.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
              Payout address
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {payoutAddress || "Not set yet"}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Configure{" "}
              <code className="font-mono">
                NEXT_PUBLIC_BASE_PAYOUT_ADDRESS
              </code>{" "}
              to publish the reward destination alongside your mini-app.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-900">
            Need to validate attribution?
          </p>
          <p className="mt-2 text-sm text-slate-600">
            After registering, use the Builder Code Validation tool or Basescan
            to confirm that the ERC-8021 suffix includes your code. BASE.dev
            metrics will surface attributed transactions automatically.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link
              href="https://builder-code-checker.vercel.app/"
              className="inline-flex items-center rounded-full bg-blue-700 px-4 py-2 font-medium text-white transition hover:bg-blue-800"
            >
              Open validation tool
            </Link>
            <Link
              href="https://docs.base.org/base-chain/builder-codes/app-developers"
              className="inline-flex items-center rounded-full border border-blue-200 px-4 py-2 font-medium text-blue-800 transition hover:border-blue-400 hover:text-blue-900"
            >
              Read Builder Code guide
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
