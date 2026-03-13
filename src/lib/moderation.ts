import { MODERATION } from './constants';
import type { ModerationEvent, ModerationAction } from './types';

/**
 * Agentic Moderation System
 *
 * This agent monitors content, facilitates rewards, and maintains community health.
 * It uses sentiment analysis, keyword detection, and pattern recognition to automatically
 * moderate content while maintaining a zen-like supportive atmosphere.
 */

export interface ModerationResult {
  approved: boolean;
  action: ModerationAction;
  confidence: number;
  reason?: string;
  suggestedReward?: number;
}

/**
 * Analyze content sentiment
 * Returns a score from -1 (very negative) to 1 (very positive)
 */
function analyzeSentiment(content: string): { score: number; hasCrisisIndicators: boolean } {
  // Simple sentiment analysis (in production, use a proper NLP library)
  const positiveWords = [
    'grateful', 'thankful', 'better', 'improving', 'hopeful',
    'peaceful', 'calm', 'growing', 'healing', 'support',
    'love', 'kindness', 'compassion', 'understanding', 'progress'
  ];

  const negativeWords = [
    'hate', 'angry', 'furious', 'violent', 'harm',
    'worst', 'terrible', 'hopeless', 'useless'
  ];

  const crisisWords = [
    'suicide', 'kill myself', 'end it', 'self-harm',
    'want to die', 'no reason to live'
  ];

  const words = content.toLowerCase().split(/\s+/);
  let score = 0;
  let hasCrisisIndicators = false;

  words.forEach(word => {
    if (positiveWords.some(pw => word.includes(pw))) score += 0.1;
    if (negativeWords.some(nw => word.includes(nw))) score -= 0.1;
    if (crisisWords.some(cw => content.toLowerCase().includes(cw))) {
      hasCrisisIndicators = true;
      score -= 0.5;
    }
  });

  return { score: Math.max(-1, Math.min(1, score)), hasCrisisIndicators };
}

/**
 * Check for policy violations
 */
function checkPolicyViolations(content: string): string[] {
  const violations: string[] = [];
  const lowerContent = content.toLowerCase();

  // Check for auto-flag keywords
  MODERATION.AUTO_FLAG_KEYWORDS.forEach(keyword => {
    if (lowerContent.includes(keyword)) {
      violations.push(`Contains sensitive keyword: ${keyword}`);
    }
  });

  // Check for spam patterns
  if (content.length > 2000) {
    violations.push('Content exceeds maximum length');
  }

  // Check for excessive caps
  const capsRatio = (content.match(/[A-Z]/g) || []).length / content.length;
  if (capsRatio > 0.7 && content.length > 20) {
    violations.push('Excessive use of capital letters');
  }

  // Check for repeated characters (spam pattern)
  if (/(.)\1{10,}/.test(content)) {
    violations.push('Spam pattern detected');
  }

  return violations;
}

/**
 * Determine if content shows constructive engagement
 */
function isConstructiveEngagement(content: string): boolean {
  const constructivePatterns = [
    /how can I help/i,
    /here for you/i,
    /you('re| are) not alone/i,
    /sending (love|support|hugs)/i,
    /proud of you/i,
    /take care/i,
    /breathe/i,
    /one (day|step) at a time/i,
  ];

  return constructivePatterns.some(pattern => pattern.test(content));
}

/**
 * Main moderation function
 */
export async function moderateContent(
  content: string,
  contentType: 'vent' | 'comment' | 'reach-out'
): Promise<ModerationResult> {
  // Check for policy violations first
  const violations = checkPolicyViolations(content);

  if (violations.length > 0) {
    // Check if it's a crisis situation that needs resources
    const { hasCrisisIndicators } = analyzeSentiment(content);

    if (hasCrisisIndicators) {
      return {
        approved: true, // Allow through but flag for resources
        action: 'flag',
        confidence: 0.95,
        reason: 'Crisis indicators detected - providing support resources',
        suggestedReward: 0,
      };
    }

    return {
      approved: false,
      action: 'reject',
      confidence: 0.9,
      reason: violations.join('; '),
    };
  }

  // Analyze sentiment
  const { score: sentimentScore } = analyzeSentiment(content);

  // Check for constructive engagement (deserves reward)
  const isConstructive = isConstructiveEngagement(content);

  // Determine action based on analysis
  if (sentimentScore < MODERATION.SENTIMENT_THRESHOLD) {
    return {
      approved: true,
      action: 'flag',
      confidence: 0.7,
      reason: 'Content flagged for human review due to negative sentiment',
      suggestedReward: 0,
    };
  }

  if (isConstructive && contentType === 'comment') {
    return {
      approved: true,
      action: 'reward-user',
      confidence: 0.85,
      reason: 'Constructive and supportive engagement',
      suggestedReward: 5,
    };
  }

  // Default: approve with standard treatment
  return {
    approved: true,
    action: 'approve',
    confidence: 0.8,
    suggestedReward: contentType === 'vent' ? 5 : 3,
  };
}

/**
 * Create moderation event log
 */
export function createModerationEvent(
  contentId: string,
  contentType: 'vent' | 'comment' | 'reach-out',
  result: ModerationResult
): ModerationEvent {
  return {
    id: crypto.randomUUID(),
    contentId,
    contentType,
    action: result.action,
    reason: result.reason,
    agentDecision: true,
    timestamp: new Date(),
  };
}

/**
 * Agent function to process transactions and rewards
 */
export async function processReward(
  userId: string,
  amount: number,
  reason: string
): Promise<{ success: boolean; transactionId?: string }> {
  // In production, this would interact with the BASE blockchain
  // For now, we'll simulate the transaction

  try {
    const transactionId = crypto.randomUUID();

    // Log the reward event
    console.log(`[Moderation Agent] Rewarding user ${userId}: ${amount} KP for ${reason}`);

    return {
      success: true,
      transactionId,
    };
  } catch (error) {
    console.error('[Moderation Agent] Failed to process reward:', error);
    return {
      success: false,
    };
  }
}

/**
 * Monitor and facilitate monetization/transactions
 */
export async function facilitateTransaction(
  userId: string,
  type: 'reward' | 'redemption' | 'donation',
  amount: number
): Promise<{ success: boolean; message: string }> {
  try {
    // Validate transaction
    if (amount <= 0) {
      return {
        success: false,
        message: 'Invalid transaction amount',
      };
    }

    // In production, interact with BASE blockchain smart contracts
    console.log(`[Transaction Agent] Processing ${type} for user ${userId}: ${amount} KP`);

    return {
      success: true,
      message: `${type} processed successfully`,
    };
  } catch (error) {
    console.error('[Transaction Agent] Transaction failed:', error);
    return {
      success: false,
      message: 'Transaction failed',
    };
  }
}
