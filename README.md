# TouchBase

A native BASE chain mini-app optimized for Farcaster.

> **"…a way for people to reach out and touch someone, no matter where they are or what they're doing."**

TouchBase is a *ventilation* platform — a safe space to exchange angst for catharsis, resentment for peace, chaos for clarity, and loneliness for solidarity. It is not a social network; it is a lifeline.

---

## Features

- **🌿 Anonymous by default** — users can opt out of any identity linkage, even to the platform itself
- **✦ Vent feed** — a stream of honest, unfiltered human expression
- **❤️ Kindness reactions** — respond to others with Love, Hug, Light, or Solidarity (no likes, no follower counts)
- **🔗 Native BASE chain mini-app** — integrates with Farcaster Frame v2 and OnchainKit
- **Minimal UI** — purpose-first design that stays out of the way

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Chain | BASE (via Wagmi + Viem) |
| Wallet | Farcaster Frame Wagmi Connector |
| UI Kit | Coinbase OnchainKit |

---

## Getting Started

```bash
cp .env.example .env.local
# fill in your values, then:
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploying

Deploy to [Vercel](https://vercel.com) and set the environment variables from `.env.example`. Update `NEXT_PUBLIC_APP_URL` to your production URL so the Farcaster Frame metadata is correct.

