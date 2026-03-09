export interface AppDetails {
  name: string;
  description: string;
  tagline: string;
  homeUrl: string;
  iconUrl: string;
  splashImageUrl: string;
  splashBackgroundColor: string;
  heroImageUrl: string;
  canonicalDomain: string;
  webhookUrl: string;
  requiredChains: string[];
  tags: string[];
  categories: string[];
}

export interface AccountAssociation {
  header: string;
  payload: string;
  signature: string;
}

export interface FarcasterManifest {
  accountAssociation: AccountAssociation;
  miniapp: {
    version: string;
    name: string;
    description?: string;
    iconUrl: string;
    homeUrl: string;
    canonicalDomain?: string;
    splashImageUrl?: string;
    splashBackgroundColor?: string;
    heroImageUrl?: string;
    tagline?: string;
    webhookUrl?: string;
    requiredChains?: string[];
    tags?: string[];
    categories?: string[];
  };
}

export type RegistrationStep = "details" | "appearance" | "verify" | "manifest";

/** EIP-155 chain ID for BASE mainnet (chain ID 8453). */
export const BASE_MAINNET_CHAIN = "eip155:8453";

// ─────────────────────────────────────────────────────────────────────────────
// User-facing app types
// ─────────────────────────────────────────────────────────────────────────────

/** Geolocation coordinates. */
export interface Coordinates {
  lat: number;
  lng: number;
}

/** User profile collected during onboarding. */
export interface UserProfile {
  /** Three things that pull the user out of a doom spiral, no matter how far gone. */
  doomSpiralRemedies: [string, string, string];
  /** Three things the user has always had a natural knack for. */
  naturalSkills: [string, string, string];
  /** Favourite comfort food. */
  comfortFood: string;
  /** Hobbies (free-text, comma-separated stored as array). */
  hobbies: string[];
  /** Whether the user has opted in to location services. */
  locationEnabled: boolean;
  /** Browser-obtained coordinates (only present when locationEnabled). */
  coordinates?: Coordinates;
  /** User-supplied location label when precise geolocation is unavailable/declined. */
  customLocation?: string;
  /** Search radius in miles (default 10). */
  locationRadius: number;
  /** Whether the user posts anonymously by default. */
  anonymous: boolean;
  /** Optional display name shown when identity is revealed. */
  displayName?: string;
  /** Accumulated BASE-chain kindness points (display units, not wei). */
  rewardsBalance: number;
  /** Consecutive days of positive engagement for streak rewards. */
  engagementStreak: number;
}

export type ResourceType =
  | "mental_health"
  | "support_group"
  | "crisis_line"
  | "community_space"
  | "event"
  | "wellness"
  | "food_assistance"
  | "social_service";

/** A local support resource recommended to a user. */
export interface LocalResource {
  id: string;
  name: string;
  type: ResourceType;
  description: string;
  address?: string;
  /** Distance from user in miles (populated after location match). */
  distance?: number;
  phone?: string;
  website?: string;
  hours?: string;
  /** Keywords / categories used for relevance matching. */
  tags: string[];
  isVerified?: boolean;
}

/** A reply to a Vent post. */
export interface VentResponse {
  id: string;
  content: string;
  authorId: string;
  /** Display name – only populated when identityRevealed is true. */
  authorName?: string;
  isAnonymous: boolean;
  /** Whether the responder has revealed their identity via encrypted DM. */
  identityRevealed: boolean;
  createdAt: string;
  helpfulVotes: number;
}

/** A user-posted vent in the community feed. */
export interface Vent {
  id: string;
  content: string;
  authorId: string;
  /** Display name – only populated when isAnonymous is false. */
  authorName?: string;
  isAnonymous: boolean;
  createdAt: string;
  responses: VentResponse[];
  /** Resources surfaced by the recommendation engine. */
  resources?: LocalResource[];
  helpfulVotes: number;
  /** Content-derived tags used for resource matching. */
  tags: string[];
}

export type OnboardingStep = "welcome" | "location" | "profile";

