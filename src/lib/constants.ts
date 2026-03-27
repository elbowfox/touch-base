// Kindness Points reward values (BASE chain)
export const KP_REWARDS = {
  POST_VENT: 10,
  POST_REPLY: 15,
  GIVE_HELPFUL_VOTE: 5,
  RECEIVE_HELPFUL_VOTE: 8,
  DAILY_LOGIN: 2,
  STREAK_BONUS_7D: 25,
  STREAK_BONUS_30D: 100,
  TIP_SENT: 20,
  TIP_RECEIVED: 50,
  ELVIS_REFERRAL_BONUS: 50,
} as const;

// Premium multiplier applied to all KP earnings for Sanctuary members
export const PREMIUM_KP_MULTIPLIER = 2;

// Milestones for Kindness Points
export const KP_MILESTONES = [
  { threshold: 100,   reward: "🌱 Seedling Badge",           label: "First Steps" },
  { threshold: 500,   reward: "🌊 Community Lifeline Badge", label: "Regular Contributor" },
  { threshold: 1000,  reward: "💛 1 USDC Donation Credit",   label: "1K Milestone" },
  { threshold: 5000,  reward: "✨ 5 USDC Donation Credit",   label: "5K Milestone" },
  { threshold: 10000, reward: "🏆 10 USDC + Governance Vote",label: "10K Milestone" },
] as const;

// App metadata
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://touchbase.thevisualbrand.us";
export const APP_NAME = "TouchBase";
export const APP_DESCRIPTION = "Your home base — a safe, supportive place to get back in touch with yourself and your humanity.";

// BASE chain
export const BASE_CHAIN_ID = 8453;
export const BASE_SEPOLIA_CHAIN_ID = 84532;

// Farcaster
export const FARCASTER_MINI_APP_VERSION = "1.0.0";
