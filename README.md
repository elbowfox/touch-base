# TouchBase 🌸

**Your Personal Virtual Zen Garden**

A beautiful marriage of form and function — TouchBase is a community support mini-app built on the BASE blockchain, optimized for Farcaster. This zen-inspired platform provides a safe space for mental wellness, peer support, and mindful community engagement.

## ✨ Features

### 🧘 Zen-Inspired Design
- Calming color palette with earth tones (sand, stone, moss, water)
- Smooth animations and transitions for a peaceful user experience
- Beautiful typography and thoughtful spacing
- Mobile-responsive design

### 🤝 Community Support
- **Vent Safely**: Share thoughts anonymously or publicly
- **Reach Out**: Send supportive messages to community members
- **Karma Points**: Earn rewards for positive engagement
- **Resource Library**: Access mental health and wellness resources

### 🤖 Agentic Moderation
- AI-powered content moderation for community safety
- Automatic sentiment analysis
- Crisis detection with resource recommendations
- Reward facilitation for positive contributions
- Transaction monitoring for karma points

### 📚 Inspirational Wisdom
- Loading screen with rotating quotes from:
  - Dao De Jing (Lao Tzu)
  - Buddhist philosophy and teachings
- Quote of the Day feature
- Mindful reflections throughout the experience

### ⛓️ Blockchain Integration
- Built on BASE (Coinbase Layer 2)
- Farcaster identity integration
- On-chain karma point rewards
- Secure and transparent transactions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## 🏗️ Project Structure

```
touch-base/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx        # Home page
│   │   ├── feed/           # Community feed
│   │   ├── onboarding/     # User onboarding flow
│   │   ├── register/       # BASE/Farcaster registration
│   │   ├── layout.tsx      # Root layout
│   │   └── globals.css     # Global styles with Tailwind v4
│   ├── components/          # React components
│   │   ├── VentCard.tsx    # Vent display component
│   │   ├── ResourceCard.tsx # Resource card component
│   │   ├── ReachOutModal.tsx # Support message modal
│   │   ├── RewardsWidget.tsx # Karma points widget
│   │   └── ZenLoading.tsx  # Loading screen with quotes
│   └── lib/                 # Utilities and logic
│       ├── quotes.ts       # Inspirational quote engine
│       ├── moderation.ts   # Agentic moderation system
│       ├── types.ts        # TypeScript definitions
│       ├── constants.ts    # App constants
│       └── resources.ts    # Mental health resources
├── public/                  # Static assets
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Blockchain**: BASE (Ethereum L2)
- **Identity**: Farcaster SDK
- **Web3**: OnchainKit, wagmi, viem
- **State**: React hooks

## 💡 Key Concepts

### Karma Points (KP)
Users earn karma points through positive engagement:
- Post a vent: +5 KP
- Offer support: +3 KP
- Receive support: +2 KP
- Daily check-in: +1 KP
- Complete onboarding: +10 KP

Karma points can be used to:
- Unlock premium resources
- Send anonymous reach-outs
- Boost visibility of vents

### Agentic Moderation
Our AI moderation system:
- Analyzes sentiment in real-time
- Detects crisis situations and provides resources
- Rewards constructive engagement
- Flags inappropriate content for review
- Maintains a supportive, zen-like atmosphere

### Zen Design Philosophy
- **Simplicity**: Clean, uncluttered interfaces
- **Harmony**: Balanced colors and spacing
- **Mindfulness**: Thoughtful animations and transitions
- **Nature**: Earth-tone color palette
- **Peace**: Calming user experience

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🤝 Contributing

We welcome contributions that align with TouchBase's mission of creating a supportive, zen-like community platform.

## 📝 License

MIT License - see [LICENSE](LICENSE) for details

## 🙏 Acknowledgments

- Inspired by Dao De Jing and Buddhist philosophy
- Built with love for the Farcaster and BASE communities
- Designed for those seeking support and connection

## 🌸 Philosophy

> "The journey of a thousand miles begins with a single step." — Lao Tzu

TouchBase is more than an app — it's a digital sanctuary where users can find support, share burdens, and grow together. Every interaction is an opportunity for compassion, every connection a step toward healing.

---

**Built with 💚 on BASE**

