import { LocalResource, ResourceType, UserProfile } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Sample resource database
// In production these would come from 211.org, Google Places API, or a custom
// partnerships database.  The schema is intentionally generic so a real data
// source can be swapped in without changing callers.
// ─────────────────────────────────────────────────────────────────────────────

export const SAMPLE_RESOURCES: LocalResource[] = [
  {
    id: "r1",
    name: "Crisis Text Line",
    type: "crisis_line",
    description:
      "Free, 24/7 support for people in crisis. Text HOME to 741741.",
    phone: "741741",
    website: "https://www.crisistextline.org",
    hours: "24/7",
    tags: ["crisis", "depression", "anxiety", "stress", "suicide", "mental health"],
    isVerified: true,
  },
  {
    id: "r2",
    name: "SAMHSA National Helpline",
    type: "crisis_line",
    description:
      "Free, confidential, 24/7 treatment referral and information for mental health and substance use.",
    phone: "1-800-662-4357",
    website: "https://www.samhsa.gov/find-help/national-helpline",
    hours: "24/7",
    tags: [
      "substance use",
      "addiction",
      "mental health",
      "treatment",
      "counseling",
    ],
    isVerified: true,
  },
  {
    id: "r3",
    name: "NAMI HelpLine",
    type: "mental_health",
    description:
      "National Alliance on Mental Illness helpline for information, referrals, and support.",
    phone: "1-800-950-NAMI",
    website: "https://www.nami.org/help",
    hours: "Mon–Fri 10am–10pm ET",
    tags: [
      "mental health",
      "bipolar",
      "schizophrenia",
      "depression",
      "anxiety",
      "family",
    ],
    isVerified: true,
  },
  {
    id: "r4",
    name: "Community Wellness Center",
    type: "wellness",
    description:
      "Local drop-in wellness space offering meditation, yoga, and peer support circles.",
    address: "Near you",
    distance: 1.2,
    hours: "Mon–Sat 8am–8pm",
    tags: ["meditation", "yoga", "wellness", "peer support", "community"],
    isVerified: false,
  },
  {
    id: "r5",
    name: "Open Mic Night — Community Café",
    type: "event",
    description:
      "Weekly open mic for creative expression — poetry, music, spoken word. All welcome.",
    address: "Near you",
    distance: 0.8,
    hours: "Thursdays 7pm",
    tags: ["creative", "music", "art", "poetry", "social", "performance"],
    isVerified: false,
  },
  {
    id: "r6",
    name: "Neighbourhood Food Pantry",
    type: "food_assistance",
    description:
      "Free fresh food every Tuesday and Friday. No ID or proof of need required.",
    address: "Near you",
    distance: 0.5,
    hours: "Tue & Fri 10am–2pm",
    tags: ["food", "hunger", "financial stress", "basic needs"],
    isVerified: true,
  },
  {
    id: "r7",
    name: "Free Job Skills Workshop",
    type: "social_service",
    description:
      "Resume writing, interview prep, and LinkedIn coaching at no cost.",
    address: "Near you",
    distance: 1.5,
    hours: "Wednesdays 1pm–4pm",
    tags: ["job", "work", "career", "unemployment", "financial stress"],
    isVerified: false,
  },
  {
    id: "r8",
    name: "Peer Support Group — Anxiety & Depression",
    type: "support_group",
    description:
      "Facilitated weekly peer group for adults living with anxiety or depression.",
    address: "Near you",
    distance: 2.1,
    hours: "Mondays 6pm",
    tags: ["anxiety", "depression", "peer support", "mental health", "group"],
    isVerified: true,
  },
  {
    id: "r9",
    name: "Community Maker Space",
    type: "community_space",
    description:
      "Drop-in creative studio with woodworking, 3D printing, sewing, and art supplies.",
    address: "Near you",
    distance: 1.8,
    hours: "Daily 10am–9pm",
    tags: [
      "creative",
      "art",
      "making",
      "DIY",
      "hobbies",
      "community",
      "boredom",
    ],
    isVerified: false,
  },
  {
    id: "r10",
    name: "Veterans Support Network",
    type: "support_group",
    description:
      "Peer-led support network for veterans and active service members.",
    phone: "1-800-273-8255",
    website: "https://www.veteranscrisisline.net",
    hours: "24/7",
    tags: ["veteran", "military", "PTSD", "trauma", "crisis", "depression"],
    isVerified: true,
  },
  {
    id: "r11",
    name: "Grief Support Circle",
    type: "support_group",
    description:
      "Monthly gathering for those processing loss — facilitated by a licensed counsellor.",
    address: "Near you",
    distance: 3.0,
    hours: "First Sunday of the month, 2pm",
    tags: ["grief", "loss", "bereavement", "death", "mourning", "loneliness"],
    isVerified: true,
  },
  {
    id: "r12",
    name: "Free Counselling Clinic",
    type: "mental_health",
    description:
      "Sliding-scale and pro-bono individual therapy sessions with licensed therapists.",
    address: "Near you",
    distance: 2.4,
    hours: "By appointment",
    tags: ["therapy", "counseling", "mental health", "depression", "trauma"],
    isVerified: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Keyword maps
// ─────────────────────────────────────────────────────────────────────────────

/** Maps vent content keywords → resource tag keywords that should be surfaced. */
const KEYWORD_MAP: Record<string, string[]> = {
  sad: ["depression", "mental health", "peer support"],
  depressed: ["depression", "mental health", "counseling"],
  anxious: ["anxiety", "mental health", "peer support"],
  anxiety: ["anxiety", "mental health", "counseling"],
  stressed: ["stress", "wellness", "peer support"],
  lonely: ["peer support", "community", "loneliness", "social"],
  lost: ["mental health", "peer support", "counseling"],
  hopeless: ["crisis", "depression", "mental health"],
  suicidal: ["crisis", "suicide", "mental health"],
  "want to die": ["crisis", "suicide", "mental health"],
  panic: ["anxiety", "mental health", "crisis"],
  overwhelmed: ["mental health", "wellness", "peer support"],
  grief: ["grief", "loss", "bereavement"],
  loss: ["grief", "bereavement", "loneliness"],
  trauma: ["trauma", "PTSD", "mental health"],
  abuse: ["mental health", "trauma", "social_service"],
  addiction: ["substance use", "addiction", "treatment"],
  drinking: ["substance use", "addiction"],
  drugs: ["substance use", "addiction"],
  broke: ["financial stress", "food", "basic needs"],
  money: ["financial stress", "job"],
  unemployed: ["unemployment", "job", "career"],
  fired: ["job", "career", "financial stress"],
  hungry: ["food", "hunger", "basic needs"],
  bored: ["community", "hobbies", "creative"],
  creative: ["creative", "art", "making"],
  music: ["music", "creative", "performance"],
  art: ["art", "creative", "making"],
  veteran: ["veteran", "military", "PTSD"],
};

// ─────────────────────────────────────────────────────────────────────────────
// Matching helpers
// ─────────────────────────────────────────────────────────────────────────────

function scoreResource(
  resource: LocalResource,
  targetTags: string[]
): number {
  const resourceTagSet = new Set(resource.tags.map((t) => t.toLowerCase()));
  return targetTags.reduce(
    (acc, tag) => acc + (resourceTagSet.has(tag.toLowerCase()) ? 1 : 0),
    0
  );
}

/**
 * Extract content-relevant resource tags from free-text vent content.
 */
export function extractTagsFromContent(content: string): string[] {
  const lower = content.toLowerCase();
  const tags = new Set<string>();
  for (const [keyword, mappedTags] of Object.entries(KEYWORD_MAP)) {
    if (lower.includes(keyword)) {
      mappedTags.forEach((t) => tags.add(t));
    }
  }
  return [...tags];
}

/**
 * Derive resource tags from a user's onboarding profile.
 * Used for secondary (profile-based) resource recommendations.
 */
export function extractTagsFromProfile(profile: UserProfile): string[] {
  const tags = new Set<string>();
  // Map hobbies and remedies to resource tags
  const allTerms = [
    ...profile.hobbies,
    ...profile.doomSpiralRemedies,
    ...profile.naturalSkills,
    profile.comfortFood,
  ]
    .join(" ")
    .toLowerCase();

  if (
    allTerms.includes("music") ||
    allTerms.includes("sing") ||
    allTerms.includes("play")
  )
    tags.add("music");
  if (
    allTerms.includes("art") ||
    allTerms.includes("paint") ||
    allTerms.includes("draw")
  )
    tags.add("art");
  if (allTerms.includes("creative") || allTerms.includes("make"))
    tags.add("creative");
  if (allTerms.includes("yoga") || allTerms.includes("meditat"))
    tags.add("wellness");
  if (
    allTerms.includes("cook") ||
    allTerms.includes("food") ||
    allTerms.includes("bake")
  )
    tags.add("food");
  if (allTerms.includes("social") || allTerms.includes("friend"))
    tags.add("community");
  if (allTerms.includes("exercise") || allTerms.includes("run"))
    tags.add("wellness");

  return [...tags];
}

/**
 * Return resources ranked by relevance to the given tags.
 * Always includes verified crisis lines as the first results when any crisis
 * keywords are present.
 */
export function getRecommendedResources(
  targetTags: string[],
  maxResults = 4,
  userRadius?: number
): LocalResource[] {
  const hasCrisis = targetTags.some((t) =>
    ["crisis", "suicide", "hopeless"].includes(t)
  );

  const radiusFilter = (r: LocalResource) =>
    !r.distance || r.distance <= (userRadius ?? 10);

  // Score every resource
  const scored = SAMPLE_RESOURCES.filter(radiusFilter).map((r) => ({
    resource: r,
    score: scoreResource(r, targetTags),
  }));

  // Sort: crisis lines first if needed, then by score desc, then by distance
  scored.sort((a, b) => {
    if (hasCrisis) {
      const aIsCrisis = a.resource.type === "crisis_line" ? 1 : 0;
      const bIsCrisis = b.resource.type === "crisis_line" ? 1 : 0;
      if (aIsCrisis !== bIsCrisis) return bIsCrisis - aIsCrisis;
    }
    if (b.score !== a.score) return b.score - a.score;
    const aDist = a.resource.distance ?? 999;
    const bDist = b.resource.distance ?? 999;
    return aDist - bDist;
  });

  return scored.slice(0, maxResults).map((s) => s.resource);
}

/**
 * Get resources for a vent post — combines content tags with profile tags.
 */
export function getResourcesForVent(
  ventContent: string,
  profile?: UserProfile
): LocalResource[] {
  const contentTags = extractTagsFromContent(ventContent);
  const profileTags = profile ? extractTagsFromProfile(profile) : [];
  const allTags = [...new Set([...contentTags, ...profileTags])];

  if (allTags.length === 0) {
    // Fall back to generic wellness + community resources
    return getRecommendedResources(["mental health", "wellness", "community"]);
  }

  return getRecommendedResources(allTags, 4, profile?.locationRadius);
}

export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  mental_health: "Mental Health",
  support_group: "Support Group",
  crisis_line: "Crisis Line",
  community_space: "Community Space",
  event: "Event",
  wellness: "Wellness",
  food_assistance: "Food Assistance",
  social_service: "Social Service",
};

export const RESOURCE_TYPE_COLORS: Record<ResourceType, string> = {
  mental_health: "bg-purple-100 text-purple-700",
  support_group: "bg-blue-100 text-blue-700",
  crisis_line: "bg-red-100 text-red-700",
  community_space: "bg-green-100 text-green-700",
  event: "bg-orange-100 text-orange-700",
  wellness: "bg-teal-100 text-teal-700",
  food_assistance: "bg-yellow-100 text-yellow-700",
  social_service: "bg-indigo-100 text-indigo-700",
};
