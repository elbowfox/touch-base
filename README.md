# TouchBase 🌿

> Your home base — a safe, supportive place to get back in touch with yourself and your humanity.

**Tagline:** Unconditional truth, safety, and love. On BASE.

## What it is

TouchBase is a Farcaster mini-app and BASE chain application where people can:

- **Vent** honestly — anonymously or not — in a safe, moderated space
- **Receive kindness** — heart, hug, light, and solidarity reactions from the community
- **Discover local resources** — nearby mental health services, crisis lines, and support groups matched to their situation
- **Connect privately** — reach out via encrypted Farcaster DM without revealing identity
- **Earn Kindness Points** — on-chain rewards on BASE for consistent, meaningful engagement

## Tech Stack

- **Next.js 16** — App Router, TypeScript
- **Tailwind CSS v4** — Zen garden aesthetic (stone/warm palette, dark mode)
- **Farcaster Mini App SDK** — `@farcaster/miniapp-sdk`, `@farcaster/miniapp-wagmi-connector`
- **OnchainKit** — `@coinbase/onchainkit` — wallet connection, BASE chain UI
- **wagmi + viem** — BASE chain interactions
- **TanStack Query** — async state management

## Getting Started

```bash
cp .env.example .env.local
# Fill in your keys

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── feed/page.tsx         # Community feed (main view)
│   ├── compose/page.tsx      # Vent composer
│   ├── onboarding/           # 3-step onboarding flow
│   │   └── steps/            # WelcomeStep, LocationStep, ProfileStep
│   ├── miniapp/page.tsx      # BASE.dev mini-app entry
│   ├── api/
│   │   ├── vent/route.ts     # POST/GET vents
│   │   ├── react/route.ts    # POST reactions
│   │   └── miniapp/route.ts  # Mini-app manifest
│   └── .well-known/
│       └── farcaster.json/   # Farcaster domain association
├── components/
│   ├── VentCard.tsx          # Full vent card with reactions, replies, resources
│   ├── ComposeForm.tsx       # Vent composer with live moderation
│   ├── ResourceCard.tsx      # Support resource display
│   ├── ReachOutModal.tsx     # Encrypted DM modal
│   ├── RewardsWidget.tsx     # Kindness Points dashboard
│   ├── ZenLoading.tsx        # Inspirational quote loader
│   ├── Navigation.tsx        # Bottom tab nav
│   ├── Providers.tsx         # wagmi + OnchainKit providers
│   └── FrameInit.tsx         # Farcaster frame initialization
└── lib/
    ├── types.ts              # All TypeScript types
    ├── utils.ts              # Helpers, reactions config
    ├── constants.ts          # KP rewards, milestones, app config
    ├── store.ts              # In-memory vent store (replace with DB for prod)
    ├── resources.ts          # Support resource matching logic
    ├── moderation.ts         # Agentic content moderation
    ├── quotes.ts             # Inspirational quotes
    └── base.ts               # BASE chain utilities
```

## Deployment

### Vercel (recommended)

```bash
vercel deploy
```

Set environment variables in the Vercel dashboard. See `.env.example`.

### What to replace for production

- **`src/lib/store.ts`** — Replace in-memory store with Vercel KV, Postgres, or Supabase
- **Farcaster domain association** — Generate in [Warpcast Developer Console](https://warpcast.com/~/developers)
- **Kindness Points contract** — Deploy ERC-20 contract on BASE, set `NEXT_PUBLIC_KINDNESS_CONTRACT_ADDRESS`

## What came from each PR

| Source | What we kept |
|--------|-------------|
| `copilot/create-native-base-mini-app` | Foundation structure, API routes, Providers, FrameInit, ComposeForm core |
| `copilot/create-domain-register-base` | Landing page, full onboarding flow, location step, resource matching, RewardsWidget, KP rewards logic |
| `claude/refine-ui-ux-design` | Zen design language, ZenLoading, content moderation, inspirational quotes |
| `codex/optimize-app-integration-base-dev` | BASE.dev mini-app page, manifest route, base.ts chain utils, frame headers in next.config |

## License

MIT
