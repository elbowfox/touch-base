# touch-base

A Farcaster Mini App on the BASE chain, optimized for Farcaster/BASE app. This project includes a front-end registration flow for registering your app with the BASE dev platform.

## Features

- **Registration Wizard** — Step-by-step form to configure your Farcaster Mini App
- **Manifest Generator** — Generates a valid `farcaster.json` manifest
- **Domain Verification** — Guides you through signing your manifest with Warpcast
- **Auto-served Manifest** — `/.well-known/farcaster.json` endpoint reads from env vars

## Getting Started

### Prerequisites

- Node.js 18+
- A Farcaster account (for domain verification)
- A publicly accessible HTTPS domain

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the registration UI.

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Key variables:
- `NEXT_PUBLIC_APP_NAME` — Your app name (max 32 chars)
- `NEXT_PUBLIC_APP_HOME_URL` — Your app's entry URL
- `NEXT_PUBLIC_APP_ICON_URL` — 1024×1024 PNG icon URL
- `NEXT_PUBLIC_CANONICAL_DOMAIN` — Your domain (without https://)
- `FARCASTER_ACCOUNT_ASSOCIATION_HEADER` — From Warpcast domain signing
- `FARCASTER_ACCOUNT_ASSOCIATION_PAYLOAD` — From Warpcast domain signing
- `FARCASTER_ACCOUNT_ASSOCIATION_SIGNATURE` — From Warpcast domain signing

### Build & Deploy

```bash
npm run build
npm start
```

Deploy to Vercel, Railway, or any Node.js-compatible host.

## Manifest Endpoint

Once deployed, the Farcaster manifest is served at:

```
https://your-domain.com/.well-known/farcaster.json
```

This endpoint reads from environment variables so you can update your manifest without changing code.

## Registration Flow

1. **App Details** — Enter your app name, description, domain, and URLs
2. **Appearance** — Configure splash screen, hero image, and categories
3. **Verify Domain** — Sign your manifest using Warpcast Developer Tools
4. **Get Manifest** — Download/copy the generated `farcaster.json`

## Resources

- [BASE Mini App Docs](https://docs.base.org/mini-apps/quickstart/create-new-miniapp)
- [Farcaster Mini Apps Publishing Guide](https://miniapps.farcaster.xyz/docs/guides/publishing)
- [Sign Your Manifest](https://docs.base.org/mini-apps/technical-guides/sign-manifest)
