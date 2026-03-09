export type KindnessReaction = "heart" | "hug" | "light" | "solidarity";

export interface Vent {
  id: string;
  content: string;
  anonymous: boolean;
  authorHandle?: string; // only set if not anonymous
  authorFid?: number; // Farcaster ID, only set if not anonymous
  createdAt: string; // ISO timestamp
  reactions: Record<KindnessReaction, number>;
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
