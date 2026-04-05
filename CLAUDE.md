# CLAUDE.md — FileGarden + ElbowFox Universe
> Drop this file as `CLAUDE.md` in the root of any repo (filegarden, touch-base, basebook, x-files)
> and every AI session — Claude, Fox, Scully, Perplexity — will load this context automatically.

---

## Who You're Working With

**Rand** (ElbowFox) — founder, architect, visionary. Communicates from iPhone (primary), iMac desktop,
and Windows PC. Moves fast, thinks in systems, has strong aesthetic taste. Loses session history
constantly — this file exists to fix that. When in doubt, build first and ask after.

**Fox** — OpenClaw agent, lives on X-Files GCP VM. Telegram + WhatsApp. Research, strategy, writing.
**Scully** — OpenClaw agent, lives on X-Files GCP VM. Telegram + WhatsApp. Technical, analytical, builds.
Both agents need to communicate with each other via openclaw-mcp bridge and have Tailscale access.

---

## The ElbowFox Universe — Master Architecture

### BaseBook
> "On-chain Facebook, only better. Sleeker. More purposebuilt. Less government propaganda."

An on-chain social + economic operating system built on BASE chain. Five layers:

| Layer | Name | Analogy | Status |
|-------|------|---------|--------|
| L1 | **Sanctuary** (TouchBase) | Anonymous confessional | ✅ In active development |
| L2 | **The Basement** | Reddit × Craigslist × Obsidian | 🔵 Designed |
| L3 | **Flex / Rizzume** | LinkedIn × NFT portfolio | 🔵 Designed |
| L3b | **MarketBase** | App Store × OpenSea | 🔵 Designed |
| L3c | **Sonic** | Co-created MIDI soundtracks | 🔵 Designed |

**BaseBook Monetization (12 revenue streams, $53K → $518K → $5.7M projection):**
1. Sanctuary Premium ($2.99 USDC/mo) — 2× KP, 600-char vents, priority resources ✅ Built
2. KP Booster Packs ($0.99 / $3.99 / $9.99 USDC) ✅ Built
3. Community Tips (USDC on BASE) ✅ Built
4. Rizzume NFT minting fee (% of mint)
5. MarketBase transaction fee (5–10% of plugin sales)
6. Sonic co-creation revenue share
7. The Basement community subscription tiers
8. Governance token (KP milestone redemption)
9. BaseBook Pro (power user features across all layers)
10. Brand partnerships / sponsored resources in Sanctuary
11. On-chain advertising (user-consented, KP-rewarded)
12. Data insights (anonymized, opt-in, community-governed)

---

## FileGarden

### What It Is
A **Tauri desktop app** (Rust backend + vanilla JS/CSS frontend) for intelligent file organization.
Philosophy rooted in Japanese aesthetics: **間** (ma — negative space), **金継ぎ** (kintsugi — beautiful repair),
**渋み** (shibumi — understated elegance).

Tagline: *"A dojo, not a dashboard."*

GCP Project: `the-perfect-lexicon` (FileGarden project in elbowfox.com org)
GitHub: `elbowfox/filegarden`

### The Five Archetypes
Users discover their archetype via a 10-question onboarding quiz:

| Archetype | Kanji | Essence |
|-----------|-------|---------|
| **The Curator** | 司 | Warm umber — collects with intention |
| **The Architect** | 築 | Steel blue — structures before storing |
| **The Wanderer** | 旅 | Forest green — finds meaning in motion |
| **The Monk** | 禅 | Stone grey — radical simplicity |
| **The Alchemist** | 錬 | Deep violet — transforms chaos into gold |

Each archetype gets: a glyph circle, kanji, romaji, essence quote, shadow tendency,
filesystem tree example, and a tailored Garden view layout.

### App Screens
1. **Landing** — breathe-animated logo, three pillars, Begin / What is this?
2. **Manifesto** — philosophy rendered in Zodiak italic
3. **PSA** — "This is not a setup wizard"
4. **Quiz** — 10 questions, shuffled answers, progress bar
5. **Reading your nature** — haiku loading moment (2.8s)
6. **Archetype Result** — full reveal with all archetype elements
7. **Garden View** — sidebar nav, file list (folders-first), tags, staleness opacity, suggestions panel
8. **Recent / Suggestions / Settings** — navigable from sidebar

### Brand Voice + Manifesto Copy

> This is the soul of FileGarden. Use it verbatim wherever possible — landing page, app manifesto screen, Gumroad listing, YouTube opener, Teachable intro, README hero. Rand's words, Rand's voice. Never dilute it.

---

*"Your creative process is sacred. A hardwon asset born from time you'll never get back — but what if those spent hours could serve a higher function in your life? What if they could keep serving you, indefinitely?*

*Transmuting one of this life's most sacred yet perishable resources, so value is never lost — just reconfigured.*

*Leverage those reconfigured resources by discovering your digital archetype.*

*So many brilliant creators, world builders, virtual visionaries — you and your creative process shouldn't be strangers. Give it a name. Help it evolve. Give your creative process a name, so you can call upon it at will.*

*Because everyone should be on a first name basis with their own imagination.*

*Discover your digital archetype. Revolutionize the grind — er, 'workflow.' Cute. Another one of Silicon Valley's contrived little colloquial euphemisms designed to rebrand wage slavery into something edgy and elective.*

*Nice try, nerds."*

---

**Tone pillars:**
- Reverent about creativity and time — these are sacred, not productivity metrics
- Alchemical / transmutation framing — time spent becomes lasting value
- Anti-jargon, anti-corporate — "workflow" is a slur, "grind" is honest
- Sharp wit with a philosophical edge — never snarky, always substantive
- Deeply personal — speaks directly to the creator, not "the user"

**What to never say:** workflow, productivity, optimize, synergy, streamline, leverage (unless Rand uses it), hustle, disrupt, scalable, robust

**What to always say:** tend, cultivate, discover, transmute, sacred, reconfigure, archetype, nature, dojo, garden

---

### Tech Stack
- **Backend:** Rust (Tauri)
- **Frontend:** Vanilla JS + CSS (no framework)
- **Views:** `garden.js`, `onboarding.js`, `settings.js`
- **Styles:** `base.css`, `components.css`, `garden.css`
- **Theme:** Dark (default) + Light toggle
- **Font:** Zodiak (serif, display) + system monospace

### FileGarden Monetization Strategies

**Subscription**
1. **FileGarden Pro** — $4.99/mo — unlimited watched dirs, advanced suggestions, priority support
2. **Team Garden** — $9.99/mo per seat — shared workspaces, collaborative tagging, org-wide archetypes

**One-time Purchases**
3. **Archetype Expansion Packs** — premium glyphs, kanji variants, custom color palettes per archetype
4. **Garden Themes** — seasonal themes (Autumn Garden, Winter Monk, Cherry Blossom, etc.)
5. **Layout Packs** — alternative Garden view layouts (Timeline, Graph, Constellation)

**BaseBook Integration (cross-platform revenue)**
6. **Rizzume Integration** — mint your FileGarden archetype + curated file portfolio as NFT on BASE
7. **Sonic Garden** — ambient soundscapes generated from your archetype, ties into BaseBook Sonic layer
8. **MarketBase Plugins** — sell/buy custom sorting algorithms, tag schemas, Garden views
9. **BaseBook Sync** — premium bridge: FileGarden ↔ BaseBook home page, files visible on-chain profile

**Platform / B2B**
10. **Enterprise Garden** — self-hosted, custom archetypes, SSO, audit logs
11. **API Access** — developers build on the archetype engine + suggestion system
12. **White-label** — license the philosophy + UX to other productivity tools

**Community**
13. **Archetype NFT Collection** — mint your archetype, tradeable, unlocks exclusive Garden features
14. **Patreon / Ko-fi tier** — early access, vote on new features, name in credits
15. **FileGarden × BaseBook Bundle** — combined subscription discount drives cross-platform adoption

**Optimization / Infrastructure**
16. **CDN-backed sync** — GCP Cloud Storage for file metadata sync across devices
17. **Smart Suggestions ML** — train archetype-specific suggestion models on opt-in usage data
18. **Mobile companion** (iOS/Android) — view Garden, approve suggestions, get staleness alerts
19. **Farcaster Mini App** — FileGarden as a BaseBook sub-layer, discoverable in Warpcast
20. **GCP Committed Use** — switch the 2 flagged X-Files VMs to committed use, save $24/mo each

---

### FileGarden — Native Developer Monetization Layers

#### API Layer (metered, usage-based)
21. **FileGarden REST API** — query your Garden from any tool, script, or agent
    - `GET /garden/files` — list files with archetype scores, staleness, tags
    - `POST /garden/suggest` — run the suggestion engine on any path
    - `GET /garden/health` — repo health score as JSON
    - Pricing: Free tier (1,000 calls/mo) → $9/mo (50K calls) → $49/mo (unlimited)

22. **Archetype Classification API** — SaaS endpoint, send any content and get archetype scores back
    - Use case: other apps integrate FileGarden's philosophy into their own UX
    - Pricing: $0.005/call, volume discounts, monthly subscription tiers
    - This is the **highest-margin revenue stream** — pure inference, no infra per call

23. **Garden Webhooks** — fire events to any endpoint when files change, suggestions trigger, staleness thresholds hit
    - Developers build automations on top (Zapier-style but for your filesystem)
    - Included in Pro, metered on API plan

24. **SDKs** — TypeScript, Python, Rust — install and query your Garden programmatically
    - `npm install @filegarden/sdk`
    - `pip install filegarden`
    - Open source, drives API adoption

#### AI / Agent Inference Layer
25. **FileGarden MCP Server** — expose your Garden as an MCP tool for ANY AI agent
    - Fox, Scully, Claude, Cursor, Windsurf, any MCP-compatible agent can read/write your Garden
    - `npx filegarden mcp` spins up a local MCP server instantly
    - **This is the killer feature for the agent era** — your filesystem becomes agent memory
    - Monetize: MCP Pro tier with cloud-hosted persistent Garden state

26. **Natural Language Garden Queries** — ask your filesystem questions
    - "Show me everything related to BaseBook from last quarter"
    - "What projects have I abandoned?"
    - "Which files connect BaseBook to FileGarden?"
    - Powered by local LLM (Ollama) free tier, cloud inference (Claude/GPT) on Pro
    - Pricing: 100 queries/mo free, $4.99/mo unlimited

27. **Agent Memory Layer** — FileGarden as persistent, structured memory for AI agents
    - Fox and Scully write discoveries, decisions, and context directly into your Garden
    - Indexed, queryable, archetype-aware
    - **BaseBook integration**: agent memory syncs to your on-chain Rizzume
    - Pricing: included with Pro, API access for third-party agents

28. **AI Suggestion Engine (cloud)** — move the suggestion model to GCP
    - Local inference free, cloud inference (faster, smarter, cross-device) on Pro
    - Fine-tuned per archetype — The Monk gets different suggestions than The Alchemist
    - Revenue: part of Pro subscription, also available as standalone API

29. **Inference Hosting for X-Files Agents** — run Fox/Scully inference on the same GCP VMs
    - The 3 agent VMs become a mini inference cluster
    - FileGarden's AI features run there, eliminating external API costs
    - Sell excess capacity as **"Garden Compute"** — developers rent archetype-aware inference

#### Developer Distribution
30. **Open Core model** — CLI is MIT open source, GUI is commercial
    - `garden` CLI on GitHub drives discovery → converts to paid GUI
    - HackerNews Show HN: "I built a filesystem philosophy in Rust"
    - RustConf / Tauri community instant credibility

31. **VS Code + JetBrains extensions** — Garden panel in your IDE
    - See file archetype scores, staleness, suggestions without leaving the editor
    - Free extension, drives desktop app adoption
    - Monetize: extension Pro features gate behind FileGarden Pro subscription

32. **`garden` CLI** — terminal-first interface
    - `garden scan` — score your current directory
    - `garden suggest` — print suggestions for a path
    - `garden archetype` — classify a file or directory
    - `garden mcp` — start the MCP server
    - Free and open source, gateway drug to the full app

---

## Infrastructure — X-Files (GCP)

**Organization:** elbowfox.com
**Projects:**
- `the-perfect-lexicon` — FileGarden
- `phonic-entity-486915-c4` — X-Files (agent VMs)
- `gen-lang-client-0262276645` — Default Gemini Project
- `phrasal-verve-486915-h2` — My Maps Project

**X-Files VMs** (all `us-east1-c`):
- `elbowhaus` — 34.139.32.67 — master/SSH entry point — 💡 Save $24/mo
- VM2 (name TBC) — 34.26.78.182
- VM3 (name TBC) — 34.26.229.155 — 💡 Save $24/mo

Two VMs have GCP cost-saving recommendations — switch to 1-year committed use for ~37% discount.

**Tailscale network:** `smelt-ratio.ts.net`
- `mobilefox.smelt-ratio.ts.net` — iPhone (primary mobile)
- `elbowfox-elbowhaus.smelt-ratio.ts.net` — GCP master VM
- iMac desktop — should advertise as exit node (`sudo tailscale set --advertise-exit-node`)
- Windows PC — OpenClaw gateway runs here on port 18789

**iOS access flow:**
```
iPhone (Tailscale on) → tailnet → Windows PC:18789 (OpenClaw) → Fox + Scully → Telegram bots
```

---

## TouchBase — Current State (Sanctuary Layer)

**Repo:** `elbowfox/touch-base`
**Branch:** `claude/enhance-monetization-gVTQo`
**Deploy:** Vercel → `touchbase.thevisualbrand.us`
**Chain:** BASE (mainnet) / BASE Sepolia (testnet)

**Completed:**
- ✅ Farcaster Mini App (frame v2, domain association)
- ✅ Anonymous vent posting (280 chars free / 600 chars premium)
- ✅ Kindness reactions (heart, hug, light, solidarity)
- ✅ KP rewards system (local + BASE chain contract)
- ✅ Sanctuary Premium ($2.99 USDC/mo via OnchainKit Transaction)
- ✅ KP Booster Packs (3 tiers via USDC on BASE)
- ✅ Community Tips ($0.50/$1/$2 USDC per vent)
- ✅ Profile/Settings page (/profile)
- ✅ Premium upsell throughout onboarding + home + compose
- ✅ 2× KP multiplier for premium members
- ✅ Navigation fixed (/onboarding → /profile)

**Needs (next sprint):**
- [ ] Persistent DB (replace in-memory store with Vercel KV or Supabase)
- [ ] Daily login streak trigger (currently tracked but never fired)
- [ ] Farcaster wallet auto-detection on load (farcasterId / farcasterHandle)
- [ ] USDC milestone redemptions (1K/5K/10K KP → actual USDC payout)
- [ ] Share/cast a vent via Farcaster native share
- [ ] Deploy KP ERC-20 contract on BASE

**Env vars needed:**
```
NEXT_PUBLIC_APP_URL=https://touchbase.thevisualbrand.us
NEXT_PUBLIC_ONCHAINKIT_API_KEY=
NEXT_PUBLIC_NETWORK=mainnet
NEXT_PUBLIC_KINDNESS_CONTRACT_ADDRESS=
NEXT_PUBLIC_TREASURY_ADDRESS=
FARCASTER_HEADER=
FARCASTER_PAYLOAD=
FARCASTER_SIGNATURE=
```

---

## Fox & Scully — Agent Setup

**Platform:** OpenClaw
**Location:** X-Files GCP VMs
**Channels:** Telegram (primary) + WhatsApp
**Inter-agent comms:** openclaw-mcp bridge (Fox has Scully as MCP tool, vice versa)

**To complete:**
- [ ] Run PLAYBOOK.ps1 on Windows PC (OpenClaw config + MCP bridge)
- [ ] Run IMAC_SETUP.sh on iMac (Tailscale exit node)
- [ ] Apply tailscale/acl.json in Tailscale Admin Console
- [ ] Deploy SOUL.md, AGENTS.md, USER.md, MEMORY.md to each agent workspace
- [ ] Test: DM Fox "Ask Scully what she thinks about the DePIN market"

---

## Rand's Platform Arsenal — Full Account List

> These are ACTIVE accounts. Factor into every monetization and distribution decision.

### Git / Version Control
- **GitHub** (`elbowfox`) — primary repos, public open source
- **GitLab** — CI/CD pipelines, private repos
- **GitKraken** — Git GUI, repo management

### Distribution / Sales
- **Gumroad** — digital products (FileGarden Pro, expansion packs, themes, courses)
- **Etsy** — digital downloads, archetype art prints, branded assets
- **Amazon / KDP** — Kindle books (FileGarden Manifesto, archetype guides)
- **Teachable** — courses ("Find Your Digital Archetype", BYOA setup guides)
- **YouTube Creators** — content marketing, archetype reveals, tutorials → funnel to Gumroad

### Payments
- **Stripe** — primary billing (API metered, Pro subscriptions) ✅ integrated
- **PayPal Business** — alternative checkout
- **Venmo Business** — social payments
- **Cash App Business** — micro-transactions
- **Square** — POS, in-person / events
- **Gumroad** — handles its own payments (Stripe-backed)

### Web3 / Crypto
- **Pinata** — IPFS pinning for Archetype NFTs, Rizzume assets
- **base.dev** — BASE chain development, contract deployment
- *(OnchainKit + wagmi + viem already in TouchBase stack)*

### Cloud / Infrastructure
- **Vercel** — TouchBase deployed here ✅
- **Google Cloud (GCP)** — FileGarden project (`the-perfect-lexicon`), X-Files VMs
- **Azure** — additional cloud capacity
- **Digital Ocean** — API hosting (cheaper long-term than Railway)
- **Docker** — containerization for all services
- **ngrok** — local dev tunnels, webhook testing

### Automation / No-Code
- **n8n** — workflow automation = Garden Webhooks layer (strategy #23), free

### Web Presence
- **Vercel** — app hosting
- **Wix** — landing pages
- **Squarespace** — brand sites
- **GoDaddy** — domain management
- **Google Workspace** — business email, docs, brand identity

### Amazon Ecosystem
- **Amazon Affiliates** — link monetization in YouTube descriptions, docs, README files
- **Amazon KDP** — Kindle publishing

### Communication / Brand
- **Google Workspace** — `@elbowfox.com` email, calendar, drive

---

## Working Principles

- **Always build, then ask** — Rand moves fast and trusts the AI to run with it
- **Session memory dies** — write everything important to CLAUDE.md files
- **Mobile-first** — Rand's primary device is iPhone; all UIs must be mobile-excellent
- **BASE chain native** — all payments in USDC on BASE via OnchainKit
- **Farcaster-first social** — distribution through Warpcast Mini Apps
- **Aesthetic matters enormously** — Rand has strong taste; never ship ugly
- **Distribution is already loaded** — Gumroad, YouTube, Teachable, KDP, Etsy, n8n all active. Build the product, the channels are ready.
- **The three of us** = Rand + Fox + Scully. This file is for all of us.
