import { Resource, ResourceCategory, UserProfile } from "./types";

// Default national/global resources
export const DEFAULT_RESOURCES: Resource[] = [
  {
    id: "r-crisis-1",
    title: "988 Suicide & Crisis Lifeline",
    description: "Call or text 988 anytime for free, confidential support.",
    category: "crisis",
    phone: "988",
    url: "https://988lifeline.org",
  },
  {
    id: "r-crisis-2",
    title: "Crisis Text Line",
    description: "Text HOME to 741741 for free crisis support via text.",
    category: "crisis",
    phone: "741741",
    url: "https://www.crisistextline.org",
  },
  {
    id: "r-mental-1",
    title: "NAMI Helpline",
    description: "National Alliance on Mental Illness — information and referrals.",
    category: "mental_health",
    phone: "1-800-950-6264",
    url: "https://www.nami.org/help",
  },
  {
    id: "r-financial-1",
    title: "211 Helpline",
    description: "Connect with local social services, food banks, and financial aid.",
    category: "financial",
    phone: "211",
    url: "https://www.211.org",
  },
  {
    id: "r-grief-1",
    title: "GriefShare",
    description: "Grief support groups, online and in-person.",
    category: "grief",
    url: "https://www.griefshare.org",
  },
  {
    id: "r-substance-1",
    title: "SAMHSA Helpline",
    description: "Substance abuse and mental health treatment referral.",
    category: "substance",
    phone: "1-800-662-4357",
    url: "https://www.samhsa.gov/find-help/national-helpline",
  },
];

// Keyword → resource category mapping for smart matching
const CONTENT_TO_CATEGORY: Array<{ patterns: RegExp[]; category: ResourceCategory }> = [
  {
    patterns: [/\b(suicide|suicidal|kill myself|want to die|end my life)\b/i],
    category: "crisis",
  },
  {
    patterns: [/\b(depressed|depression|anxiety|panic|mental health|breakdown)\b/i],
    category: "mental_health",
  },
  {
    patterns: [/\b(money|rent|food|homeless|eviction|broke|debt|afford|unemployed|job)\b/i],
    category: "financial",
  },
  {
    patterns: [/\b(grief|grieving|died|death|lost|funeral|miss them)\b/i],
    category: "grief",
  },
  {
    patterns: [/\b(addict|addiction|relapse|sober|drugs|alcohol|withdrawal)\b/i],
    category: "substance",
  },
];

export function getResourcesForVent(
  content: string,
  profile?: Partial<UserProfile>
): Resource[] {
  const matched = new Set<ResourceCategory>();

  for (const { patterns, category } of CONTENT_TO_CATEGORY) {
    if (patterns.some((p) => p.test(content))) {
      matched.add(category);
    }
  }

  // Always include crisis if matched
  if (matched.has("crisis")) {
    return DEFAULT_RESOURCES.filter(
      (r) => r.category === "crisis" || matched.has(r.category)
    );
  }

  const results = DEFAULT_RESOURCES.filter((r) => matched.has(r.category));

  // If nothing matched, return a generic set
  if (results.length === 0) {
    return DEFAULT_RESOURCES.filter((r) =>
      ["mental_health", "community"].includes(r.category)
    );
  }

  return results;
}
