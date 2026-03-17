import { NextResponse } from "next/server";
import { APP_URL, APP_NAME } from "@/lib/constants";

// Farcaster well-known manifest — signed domain association for touchbase.thevisualbrand.us
export async function GET() {
  return NextResponse.json({
    accountAssociation: {
      header:
        process.env.FARCASTER_HEADER ??
        "eyJmaWQiOjM3MzU5MSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweERhOTI2ODMxMzdjREQzRGVDNzFEZkQxMkE4NzY3YjRkMzM3MDI0NWMifQ",
      payload:
        process.env.FARCASTER_PAYLOAD ??
        "eyJkb21haW4iOiJ0b3VjaGJhc2UudGhldmlzdWFsYnJhbmQudXMifQ",
      signature:
        process.env.FARCASTER_SIGNATURE ??
        "ojYj1jRpRl60oni08GurVgvg9F58ZRPVfG0szspwhsFpCGxe3a9Modi2XKUknvaJzRWbCvSFxicUJGh+kbq0dRs=",
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
