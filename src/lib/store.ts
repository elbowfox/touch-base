import { Vent, KindnessReaction } from "./types";

// In-memory store for vents. Data is kept only in this server process and:
// - is NOT shared across serverless/function instances or replicas
// - will reset on redeploy/restart or when the process is recycled
//
// This is intended only for local demos/development. For any production or
// serverless deployment (e.g. Vercel), replace this with a persistent
// backing store (database or key-value store).
const vents: Vent[] = [
  {
    id: "seed-1",
    content:
      "Some days the weight of everything feels unbearable. But I'm still here, still breathing. That has to count for something.",
    anonymous: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 47).toISOString(),
    reactions: { heart: 14, hug: 9, light: 6, solidarity: 11 },
  },
  {
    id: "seed-2",
    content:
      "Finally left a situation that was slowly draining me. Scared and hopeful at the same time. Just needed to say it out loud somewhere.",
    anonymous: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
    reactions: { heart: 22, hug: 18, light: 15, solidarity: 20 },
  },
  {
    id: "seed-3",
    content:
      "Grateful for small things today: a warm cup of tea, sunlight through the window, the fact that tomorrow is another chance.",
    anonymous: false,
    authorHandle: "morninglight",
    createdAt: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
    reactions: { heart: 31, hug: 12, light: 27, solidarity: 8 },
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

export function addReaction(ventId: string, reaction: KindnessReaction): boolean {
  const vent = vents.find((v) => v.id === ventId);
  if (!vent) return false;
  vent.reactions[reaction] += 1;
  return true;
}
