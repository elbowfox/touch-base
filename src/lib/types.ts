// ─── Vent & Reactions ────────────────────────────────────────────────────────

export type KindnessReaction = "heart" | "hug" | "light" | "solidarity";

export interface Vent {
  id: string;
  content: string;
  anonymous: boolean;
  authorHandle?: string;   // Farcaster handle, only when not anonymous
  authorFid?: number;      // Farcaster ID, only when not anonymous
  authorName?: string;     // display name fallback
  createdAt: string;       // ISO timestamp
  reactions: Record<KindnessReaction, number>;
  tags?: string[];
  resources?: Resource[];
  helpfulVotes?: number;
  responses?: VentResponse[];
}

export interface VentResponse {
  id: string;
  content: string;
  authorId?: string;
  authorName?: string;
  isAnonymous: boolean;
  identityRevealed?: boolean;
  createdAt: string;
  helpfulVotes: number;
}

export interface ReactPayload {
  ventId: string;
  reaction: KindnessReaction;
}

export interface CreateVentPayload {
  content: string;
  anonymous: boolean;
  authorHandle?: string;
  authorFid?: number;
}

// ─── User Profile ────────────────────────────────────────────────────────────

export type OnboardingStep = "welcome" | "location" | "profile";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface UserProfile {
  displayName?: string;
  doomSpiralRemedies: [string, string, string];
  naturalSkills: [string, string, string];
  comfortFood: string;
  hobbies: string[];
  locationEnabled: boolean;
  locationRadius: number;
  coordinates?: Coordinates;
  customLocation?: string;
  anonymous: boolean;
  rewardsBalance: number;
  engagementStreak: number;
  farcasterId?: number;
  farcasterHandle?: string;
  // Sanctuary Premium
  isPremium?: boolean;
  premiumExpiry?: string; // ISO date string
  // Referral tracking (Elvis bot / Telegram)
  referralSource?: string;   // e.g. "elvis"
  telegramUserId?: string;
  referralToken?: string;
}

// ─── Resources ───────────────────────────────────────────────────────────────

export type ResourceCategory =
  | "crisis"
  | "mental_health"
  | "financial"
  | "grief"
  | "community"
  | "spiritual"
  | "physical"
  | "substance";

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  url?: string;
  phone?: string;
  isLocal?: boolean;
  distance?: number;
}

// ─── BASE Chain / Kindness Points ────────────────────────────────────────────

export interface KindnessPointsLedger {
  balance: number;
  streak: number;
  milestones: KPMilestone[];
}

export interface KPMilestone {
  label: string;
  threshold: number;
  reward: string;
  reached: boolean;
}

// ─── Elvis (Telegram Bot) Integration ────────────────────────────────────────

export interface ElvisReferral {
  /** Unique referral token for tracking */
  token: string;
  /** Telegram user ID */
  telegramUserId: string;
  /** Telegram display name (first_name) */
  telegramName?: string;
  /** Telegram username (without @) */
  telegramUsername?: string;
  /** ISO timestamp when the referral was created */
  createdAt: string;
  /** Whether the user has completed onboarding */
  onboardingComplete: boolean;
  /** ISO timestamp when onboarding was completed */
  onboardingCompletedAt?: string;
}

// ─── Mini-app Manifest ───────────────────────────────────────────────────────

export interface MiniAppManifest {
  name: string;
  description: string;  
  iconUrl: string;
  splashUrl: string;
  homeUrl: string;
  version: string;
  chainId: number;
}
