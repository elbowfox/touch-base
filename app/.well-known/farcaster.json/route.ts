import { NextResponse } from "next/server";
import { BASE_MAINNET_CHAIN } from "@/lib/types";

/**
 * Serves the Farcaster manifest at /.well-known/farcaster.json
 *
 * The manifest values are read from environment variables so they can be
 * configured at deploy time without changing code.
 *
 * Required env vars:
 *   NEXT_PUBLIC_APP_NAME          - App name (max 32 chars)
 *   NEXT_PUBLIC_APP_HOME_URL      - Entry URL for the Mini App (https)
 *   NEXT_PUBLIC_APP_ICON_URL      - 1024x1024 PNG icon URL (https)
 *   NEXT_PUBLIC_CANONICAL_DOMAIN  - Domain without https:// (e.g. myapp.com)
 *
 * Optional env vars:
 *   NEXT_PUBLIC_APP_DESCRIPTION         - Short description
 *   NEXT_PUBLIC_APP_TAGLINE             - Tagline
 *   NEXT_PUBLIC_APP_SPLASH_IMAGE_URL    - 200x200 splash image URL
 *   NEXT_PUBLIC_APP_SPLASH_BG_COLOR     - Splash background HEX color
 *   NEXT_PUBLIC_APP_HERO_IMAGE_URL      - 1200x630 hero image URL
 *   NEXT_PUBLIC_APP_WEBHOOK_URL         - Webhook URL for events
 *
 * Account association (required for a valid manifest):
 *   FARCASTER_ACCOUNT_ASSOCIATION_HEADER    - JWT header from Warpcast signing
 *   FARCASTER_ACCOUNT_ASSOCIATION_PAYLOAD   - JWT payload from Warpcast signing
 *   FARCASTER_ACCOUNT_ASSOCIATION_SIGNATURE - Signature from Warpcast signing
 */
export async function GET() {
  const name = process.env.NEXT_PUBLIC_APP_NAME ?? "";
  const homeUrl = process.env.NEXT_PUBLIC_APP_HOME_URL ?? "";
  const iconUrl = process.env.NEXT_PUBLIC_APP_ICON_URL ?? "";
  const canonicalDomain = process.env.NEXT_PUBLIC_CANONICAL_DOMAIN ?? "";

  const manifest = {
    accountAssociation: {
      header: process.env.FARCASTER_ACCOUNT_ASSOCIATION_HEADER ?? "",
      payload: process.env.FARCASTER_ACCOUNT_ASSOCIATION_PAYLOAD ?? "",
      signature: process.env.FARCASTER_ACCOUNT_ASSOCIATION_SIGNATURE ?? "",
    },
    miniapp: {
      version: "1",
      name,
      ...(process.env.NEXT_PUBLIC_APP_DESCRIPTION && {
        description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
      }),
      ...(process.env.NEXT_PUBLIC_APP_TAGLINE && {
        tagline: process.env.NEXT_PUBLIC_APP_TAGLINE,
      }),
      iconUrl,
      homeUrl,
      ...(canonicalDomain && { canonicalDomain }),
      ...(process.env.NEXT_PUBLIC_APP_SPLASH_IMAGE_URL && {
        splashImageUrl: process.env.NEXT_PUBLIC_APP_SPLASH_IMAGE_URL,
      }),
      ...(process.env.NEXT_PUBLIC_APP_SPLASH_BG_COLOR && {
        splashBackgroundColor: process.env.NEXT_PUBLIC_APP_SPLASH_BG_COLOR,
      }),
      ...(process.env.NEXT_PUBLIC_APP_HERO_IMAGE_URL && {
        heroImageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE_URL,
      }),
      ...(process.env.NEXT_PUBLIC_APP_WEBHOOK_URL && {
        webhookUrl: process.env.NEXT_PUBLIC_APP_WEBHOOK_URL,
      }),
      requiredChains: [BASE_MAINNET_CHAIN],
    },
  };

  return NextResponse.json(manifest, {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
