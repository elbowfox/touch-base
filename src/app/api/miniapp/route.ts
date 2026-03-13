import { NextResponse } from "next/server";
import { baseIntegration, buildMiniAppManifest } from "@/lib/base";

export function GET() {
  const manifest = buildMiniAppManifest();

  return NextResponse.json(
    {
      ...manifest,
      registration: {
        submitTo: "https://base.dev/",
        miniAppUrl: baseIntegration.miniAppUrl,
        instructions:
          "Use the miniAppUrl when registering on BASE.dev so attribution flows to this project.",
      },
      status: {
        builderCode: baseIntegration.builderCode ? "configured" : "missing",
        payoutAddress: baseIntegration.payoutAddress ? "configured" : "missing",
      },
    },
    { headers: { "Cache-Control": "public, max-age=300" } },
  );
}
