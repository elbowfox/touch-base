import { KindnessReaction } from "./types";

export function generateId(): string {
  return crypto.randomUUID();
}

export const REACTIONS: {
  key: KindnessReaction;
  emoji: string;
  label: string;
}[] = [
  { key: "heart", emoji: "❤️", label: "Love" },
  { key: "hug", emoji: "🤗", label: "Hug" },
  { key: "light", emoji: "🕯️", label: "Light" },
  { key: "solidarity", emoji: "✊", label: "Solidarity" },
];

export function timeAgo(isoString: string): string {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffHours / 24)}d ago`;
}

export const MAX_VENT_LENGTH = 280;

export function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
