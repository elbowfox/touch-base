// Application constants

// Karma Points configuration
export const KP_REWARDS = {
  POST_VENT: 5,
  RECEIVE_SUPPORT: 2,
  OFFER_SUPPORT: 3,
  DAILY_CHECK_IN: 1,
  COMPLETE_ONBOARDING: 10,
  HELPFUL_RESOURCE_SHARE: 5,
} as const;

export const KP_COSTS = {
  UNLOCK_PREMIUM_RESOURCE: 50,
  REACH_OUT_ANONYMOUS: 10,
  BOOST_VENT: 20,
} as const;

// Moderation thresholds
export const MODERATION = {
  AUTO_FLAG_KEYWORDS: [
    'suicide',
    'self-harm',
    'violence',
    'abuse',
    // Add more as needed
  ],
  SENTIMENT_THRESHOLD: -0.7, // Threshold for automatic flagging
  REVIEW_TIMEOUT_MS: 5000, // Time before human review is requested
} as const;

// BASE chain configuration
export const BASE_CONFIG = {
  CHAIN_ID: 8453, // BASE mainnet
  TOKEN_SYMBOL: 'ETH',
  REWARD_CONTRACT: process.env.NEXT_PUBLIC_REWARD_CONTRACT_ADDRESS || '',
} as const;

// Farcaster configuration
export const FARCASTER_CONFIG = {
  APP_ID: process.env.NEXT_PUBLIC_FARCASTER_APP_ID || '',
  API_URL: process.env.NEXT_PUBLIC_FARCASTER_API_URL || '',
} as const;

// App routes
export const ROUTES = {
  HOME: '/',
  ONBOARDING: '/onboarding',
  FEED: '/feed',
  REGISTER: '/register',
} as const;

// Resource categories and metadata
export const RESOURCE_CATEGORIES = {
  meditation: {
    name: 'Meditation',
    icon: '🧘',
    color: 'zen-moss',
  },
  mindfulness: {
    name: 'Mindfulness',
    icon: '🌸',
    color: 'zen-water',
  },
  therapy: {
    name: 'Therapy',
    icon: '💚',
    color: 'zen-stone',
  },
  'support-groups': {
    name: 'Support Groups',
    icon: '🤝',
    color: 'zen-sand',
  },
  'crisis-hotlines': {
    name: 'Crisis Hotlines',
    icon: '📞',
    color: 'meditation-dawn',
  },
  reading: {
    name: 'Reading',
    icon: '📚',
    color: 'meditation-dusk',
  },
} as const;
