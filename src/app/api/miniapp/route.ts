import { NextResponse } from "next/server";
import { APP_URL, APP_NAME, APP_DESCRIPTION, FARCASTER_MINI_APP_VERSION } from "@/lib/constants";
import { MiniAppManifest } from "@/lib/types";
import { base } from "wagmi/chains";

export async function GET() {
  const manifest: MiniAppManifest = {
    name: APP_NAME,
    description: APP_DESCRIPTION,
    iconUrl: `${APP_URL}/icon.png`,
    splashUrl: `${APP_URL}/splash.png`,
    homeUrl: APP_URL,
    version: FARCASTER_MINI_APP_VERSION,
    chainId: base.id,
  };

  return NextResponse.json(manifest, {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
