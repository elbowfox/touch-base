// Core type definitions for TouchBase

export interface User {
  id: string;
  fid: string;
  username: string;
  displayName?: string;
  avatar?: string;
  karmaPoints: number;
  createdAt: Date;
}

export interface Vent {
  id: string;
  userId: string;
  content: string;
  isAnonymous: boolean;
  category?: VentCategory;
  moderationStatus: ModerationStatus;
  supportCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export type VentCategory =
  | 'stress'
  | 'anxiety'
  | 'relationships'
  | 'work'
  | 'health'
  | 'general';

export type ModerationStatus =
  | 'pending'
  | 'approved'
  | 'flagged'
  | 'rejected';

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  url?: string;
  icon: string;
  karmaPointsCost?: number;
}

export type ResourceCategory =
  | 'meditation'
  | 'mindfulness'
  | 'therapy'
  | 'support-groups'
  | 'crisis-hotlines'
  | 'reading';

export interface ReachOut {
  id: string;
  ventId: string;
  senderId: string;
  recipientId: string;
  message: string;
  status: ReachOutStatus;
  createdAt: Date;
}

export type ReachOutStatus = 'pending' | 'accepted' | 'declined';

export interface ModerationEvent {
  id: string;
  contentId: string;
  contentType: 'vent' | 'comment' | 'reach-out';
  action: ModerationAction;
  reason?: string;
  agentDecision: boolean;
  timestamp: Date;
}

export type ModerationAction =
  | 'approve'
  | 'flag'
  | 'reject'
  | 'warn-user'
  | 'reward-user';

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  description: string;
  status: TransactionStatus;
  createdAt: Date;
}

export type TransactionType =
  | 'reward'
  | 'redemption'
  | 'donation'
  | 'moderator-bonus';

export type TransactionStatus = 'pending' | 'completed' | 'failed';

export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}
