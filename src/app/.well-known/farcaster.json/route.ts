import { NextResponse } from "next/server";
import { APP_URL, APP_NAME } from "@/lib/constants";

// Farcaster well-known manifest for mini-app verification
export async function GET() {
  return NextResponse.json({
    accountAssociation: {
      // TODO: Replace with actual signed domain association from Farcaster Developer Console
      header: process.env.FARCASTER_HEADER ?? "",
      payload: process.env.FARCASTER_PAYLOAD ?? "",
      signature: process.env.FARCASTER_SIGNATURE ?? "",
    },
    frame: {
      version: "1",
      name: APP_NAME,
      iconUrl: `${APP_URL}/icon.png`,
      splashImageUrl: `${APP_URL}/splash.png`,
      splashBackgroundColor: "#f5f0eb",
      homeUrl: APP_URL,
      webhookUrl: `${APP_URL}/api/webhook`,
    },
  });
}
