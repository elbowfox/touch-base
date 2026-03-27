# TouchBase — Project Blueprint

> Your home base — a safe, supportive place to get back in touch with yourself and your humanity.

## Vision

TouchBase is a Farcaster mini-app and BASE chain application that provides a safe, moderated space for emotional expression, community support, and on-chain kindness rewards.

## Core Features

### 1. Vent Feed (`/feed`)
- Community feed of anonymous and attributed vents
- Kindness reactions: heart ❤️, hug 🤗, light 🕯️, solidarity ✊
- Reply threads with anonymous option
- Helpful vote system

### 2. Compose (`/compose`)
- Live content moderation preview
- Anonymous by default, opt-in attribution
- Auto-tagging of content themes
- Resource suggestions for sensitive content

### 3. Onboarding (`/onboarding`)
- 3-step wizard: Welcome → Location → Profile
- Location-aware resource matching
- Personal profile: doom spiral remedies, comfort food, hobbies
- Stored locally in `localStorage`

### 4. Import Your Data (`/import`)
- Upload a `.json` file with a `vents` array to bulk-import past entries
- Each vent: `content` (required, ≤ 280 chars), `anonymous`, `tags`, `createdAt`
- Content moderation applied to each imported vent
- Preview before committing the import
- Up to 100 vents per batch

### 5. Kindness Points (BASE chain)
- On-chain rewards for engagement (post, reply, react, streak)
- Milestones with badge and USDC donation credits
- RewardsWidget in the feed header

## API Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/vent` | List all vents |
| POST | `/api/vent` | Create a new vent |
| POST | `/api/react` | Add a reaction to a vent |
| POST | `/api/import` | Bulk-import vents from JSON |
| GET | `/api/miniapp` | Farcaster mini-app manifest |
| GET | `/.well-known/farcaster.json` | Farcaster domain association |

## Import File Format

```json
{
  "vents": [
    {
      "content": "Feeling overwhelmed today but I'm still here.",
      "anonymous": true,
      "createdAt": "2024-06-01T12:00:00.000Z",
      "tags": ["overwhelmed"]
    }
  ]
}
```

## Deployment

### Vercel (default)
```bash
vercel deploy
```

### Firebase App Hosting
See `apphosting.yaml` for configuration. Deploy via the Firebase CLI:
```bash
firebase deploy --only hosting
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Chain | BASE (chain ID 8453) |
| Wallet | OnchainKit + wagmi + viem |
| Social | Farcaster Mini App SDK |
| State | TanStack Query + localStorage |
| Moderation | Rule-based agentic system |

## Data Model

### Vent
```ts
{
  id: string;
  content: string;
  anonymous: boolean;
  authorHandle?: string;
  authorFid?: number;
  createdAt: string;        // ISO 8601
  reactions: { heart: number; hug: number; light: number; solidarity: number };
  tags?: string[];
  resources?: Resource[];
  helpfulVotes?: number;
  responses?: VentResponse[];
}
```

### UserProfile (localStorage `tb_profile`)
```ts
{
  displayName?: string;
  doomSpiralRemedies: [string, string, string];
  naturalSkills: [string, string, string];
  comfortFood: string;
  hobbies: string[];
  locationEnabled: boolean;
  locationRadius: number;
  coordinates?: { lat: number; lng: number };
  anonymous: boolean;
  rewardsBalance: number;
  engagementStreak: number;
}
```

## Production Checklist

- [ ] Replace in-memory store (`src/lib/store.ts`) with Vercel KV / Postgres / Supabase
- [ ] Generate Farcaster domain association in Warpcast Developer Console
- [ ] Deploy Kindness Points ERC-20 contract on BASE mainnet
- [ ] Set `NEXT_PUBLIC_KINDNESS_CONTRACT_ADDRESS` env var
- [ ] Configure `NEXT_PUBLIC_APP_URL` for production domain
- [ ] Set `NEXT_PUBLIC_ONCHAINKIT_API_KEY` from Coinbase Developer Platform
