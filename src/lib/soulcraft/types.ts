export interface WizardAnswers {
  // Chapter I: The Soul
  agentName: string;
  archetype: string;
  personalityTraits: string[];
  voiceTone: string[];
  coreValues: string[];
  shadowSide: string;
  philosophicalLean: string;
  humorStyle: string;

  // Chapter II: The Bond
  relationship: string;
  relationshipDynamic: string;
  userName: string;
  userNeeds: string[];
  communicationStyle: string;
  brightLines: string[];
  whenStruggling: string;

  // Chapter III: The Mind
  memoryPriority: string[];
  learningStyle: string;
  currentContext: string;
  longTermGoals: string;
  cognitiveStyle: string;

  // Chapter IV: The Arsenal
  primaryCapabilities: string[];
  specialtyDomains: string[];
  toolAccess: string[];
  guardrails: string[];

  // Chapter V: The Pulse
  checkInRhythm: string;
  openingRitual: string;
  attentionTriggers: string[];
  growthTracking: string;
  closingRitual: string;
  oneThingEssence: string;
}

export interface GeneratedFiles {
  soul: string;
  user: string;
  memory: string;
  tools: string;
  heartbeat: string;
  agentName: string;
  archetype: string;
  tier: 'free' | 'pro' | 'genesis';
}

export type WizardChapter = 'soul' | 'bond' | 'mind' | 'arsenal' | 'pulse' | 'review';

export interface ChapterMeta {
  id: WizardChapter;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  gradient: string;
}

export interface PricingTier {
  id: 'spark' | 'forge' | 'genesis' | 'studio';
  name: string;
  price: number;
  period: 'month' | 'one-time' | 'free';
  tagline: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  stripePriceId?: string;
}

export type QuestionType = 'single' | 'multi' | 'text' | 'textarea';

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
  emoji?: string;
}

export interface Question {
  id: keyof WizardAnswers;
  type: QuestionType;
  title: string;
  subtitle?: string;
  options?: QuestionOption[];
  placeholder?: string;
  maxSelect?: number;
  minSelect?: number;
  required?: boolean;
  freeOnly?: boolean; // hidden on free tier
}

export interface WizardChapterData {
  meta: ChapterMeta;
  questions: Question[];
}
