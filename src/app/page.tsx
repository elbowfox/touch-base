import Link from "next/link";
import { baseIntegration } from "@/lib/base";

export default function Home() {
  const fields = [
    {
      label: "Mini-app URL",
      value: baseIntegration.miniAppUrl,
      helper: "Submit this when registering on BASE.dev.",
      href: "/miniapp",
    },
    {
      label: "Builder Code",
      value: baseIntegration.builderCode || "Set NEXT_PUBLIC_BASE_BUILDER_CODE",
      helper: "Pull your issued code from base.dev → Settings.",
      href: "https://base.dev/settings",
    },
    {
      label: "Payout address",
      value: baseIntegration.payoutAddress || "Set NEXT_PUBLIC_BASE_PAYOUT_ADDRESS",
      helper: "Where BASE will route future rewards.",
    },
  ];

  const steps = [
    {
      title: "1) Share the mini-app URL",
      detail:
        "Copy the mini-app URL below (or /miniapp) into the BASE.dev registration form.",
    },
    {
      title: "2) Attach your Builder Code",
      detail:
        "Use NEXT_PUBLIC_BASE_BUILDER_CODE so attribution flows to your app and payout address.",
    },
    {
      title: "3) Verify attribution",
      detail:
        "Use the validation tool or Basescan to confirm the ERC-8021 suffix includes your code.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16 lg:px-12">
        <div className="flex flex-col gap-3">
          <span className="w-fit rounded-full bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-800">
            Base.dev integration
          </span>
          <h1 className="text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
            Touch Base is ready for Builder Code attribution
          </h1>
          <p className="max-w-3xl text-lg text-slate-600">
            Use the surfaced mini-app URL to register this project on BASE.dev.
            The JSON manifest and builder code fields keep the integration
            self-serve for the BASE team.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link
              href="/miniapp"
              className="inline-flex items-center rounded-full bg-blue-700 px-4 py-2 font-medium text-white transition hover:bg-blue-800"
            >
              View registration URL
            </Link>
            <Link
              href="/api/miniapp"
              className="inline-flex items-center rounded-full border border-blue-200 px-4 py-2 font-medium text-blue-800 transition hover:border-blue-400 hover:text-blue-900"
            >
              Open mini-app JSON
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {fields.map((field) => (
            <div
              key={field.label}
              className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                {field.label}
              </p>
              <p className="mt-2 line-clamp-2 break-words text-base font-semibold text-slate-900">
                {field.value}
              </p>
              <p className="mt-2 text-sm text-slate-500">{field.helper}</p>
              {field.href ? (
                <Link
                  href={field.href}
                  className="mt-3 text-sm font-semibold text-blue-700 hover:text-blue-800"
                >
                  Open {field.label.toLowerCase()}
                </Link>
              ) : null}
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">
              How to register on BASE.dev
            </h2>
            <div className="mt-4 space-y-3">
              {steps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                >
                  <p className="text-sm font-semibold text-slate-800">
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-blue-900">
                Builder Code snippet
              </h3>
              <p className="text-sm text-blue-900/80">
                Attach your code via the ERC-8021 dataSuffix when sending
                transactions.
              </p>
            </div>
            <pre className="rounded-lg bg-blue-900/90 p-4 text-sm text-blue-50">
{`await wallet.sendCalls({
  calls: [/* your calls */],
  capabilities: {
    dataSuffix: {
      value: "0x...8021",
      optional: true,
    },
  },
});`}
            </pre>
            <p className="text-xs text-blue-900/70">
              Aligns with the BASE Builder Codes guide. Update{" "}
              <span className="font-semibold">NEXT_PUBLIC_BASE_BUILDER_CODE</span>{" "}
              once your code is issued.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
