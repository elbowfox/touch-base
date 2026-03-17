// Agentic content moderation (from PR3)
// Flags content that may need human review or crisis resources

export type ModerationLevel = "ok" | "sensitive" | "crisis";

export interface ModerationResult {
  level: ModerationLevel;
  reason?: string;
  suggestResources?: boolean;
}

// Crisis keywords — triggers crisis resource surfacing
const CRISIS_PATTERNS = [
  /\b(suicide|suicidal|end my life|kill myself|want to die|don't want to be here)\b/i,
  /\b(self.?harm|cutting myself|hurting myself)\b/i,
  /\b(overdose|od'ing)\b/i,
  /\b(can't go on|no reason to live|better off dead)\b/i,
];

// Sensitive keywords — soft flag, suggest resources
const SENSITIVE_PATTERNS = [
  /\b(depressed|depression|anxiety|panic attack|breakdown)\b/i,
  /\b(abuse|abused|trauma|ptsd)\b/i,
  /\b(homeless|eviction|can't afford|no money|starving)\b/i,
  /\b(addiction|relapse|sober|withdrawal)\b/i,
  /\b(grief|grieving|lost my|died|funeral)\b/i,
];

export function moderateContent(content: string): ModerationResult {
  const lower = content.toLowerCase();

  for (const pattern of CRISIS_PATTERNS) {
    if (pattern.test(lower)) {
      return {
        level: "crisis",
        reason: "Content may indicate a crisis situation",
        suggestResources: true,
      };
    }
  }

  for (const pattern of SENSITIVE_PATTERNS) {
    if (pattern.test(lower)) {
      return {
        level: "sensitive",
        reason: "Content may benefit from support resources",
        suggestResources: true,
      };
    }
  }

  return { level: "ok" };
}
