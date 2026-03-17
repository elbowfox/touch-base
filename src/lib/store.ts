import { Vent, KindnessReaction } from "./types";

// ─── In-Memory Store ─────────────────────────────────────────────────────────
// NOTE: This is intentionally in-memory for demo/development purposes.
// For production, replace with a persistent database (e.g. Vercel KV, Postgres).
// Data resets on every deploy or process restart.

const vents: Vent[] = [
  {
    id: "seed-1",
    content:
      "Some days the weight of everything feels unbearable. But I'm still here, still breathing. That has to count for something.",
    anonymous: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 47).toISOString(),
    reactions: { heart: 14, hug: 9, light: 6, solidarity: 11 },
    tags: ["overwhelmed"],
    helpfulVotes: 14,
    responses: [],
  },
  {
    id: "seed-2",
    content:
      "Finally left a situation that was slowly draining me. Scared and hopeful at the same time. Just needed to say it out loud somewhere.",
    anonymous: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
    reactions: { heart: 22, hug: 18, light: 15, solidarity: 20 },
    tags: ["courage", "change"],
    helpfulVotes: 22,
    responses: [],
  },
  {
    id: "seed-3",
    content:
      "Grateful for small things today: a warm cup of tea, sunlight through the window, the fact that tomorrow is another chance.",
    anonymous: false,
    authorHandle: "morninglight",
    createdAt: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
    reactions: { heart: 31, hug: 12, light: 27, solidarity: 8 },
    tags: ["gratitude"],
    helpfulVotes: 31,
    responses: [],
  },
  {
    id: "seed-4",
    content:
      "I lost my grandmother last week. She was my person. I don't know who I am without her. Grief like this is love with nowhere to go.",
    anonymous: false,
    authorHandle: "marisol",
    authorName: "Marisol",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    reactions: { heart: 41, hug: 35, light: 22, solidarity: 18 },
    tags: ["grief", "loss"],
    helpfulVotes: 41,
    responses: [
      {
        id: "resp-4-1",
        content: "Sending you so much warmth. She sounds irreplaceable.",
        isAnonymous: false,
        authorName: "Dev",
        identityRevealed: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
        helpfulVotes: 7,
      },
    ],
  },
];

export function getVents(): Vent[] {
  return [...vents].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function addVent(vent: Vent): void {
  vents.unshift(vent);
}

export function addReaction(
  ventId: string,
  reaction: KindnessReaction
): boolean {
  const vent = vents.find((v) => v.id === ventId);
  if (!vent) return false;
  vent.reactions[reaction] += 1;
  return true;
}

export function getVentById(id: string): Vent | undefined {
  return vents.find((v) => v.id === id);
}
