// TouchBase payment utilities — USDC on BASE
import { encodeFunctionData } from "viem";

// USDC contract addresses on BASE
export const USDC_ADDRESS_MAINNET =
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as `0x${string}`;
export const USDC_ADDRESS_SEPOLIA =
  "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as `0x${string}`;

export const USDC_ADDRESS: `0x${string}` =
  process.env.NEXT_PUBLIC_NETWORK === "mainnet"
    ? USDC_ADDRESS_MAINNET
    : USDC_ADDRESS_SEPOLIA;

// Treasury address (receives all platform payments)
export const TREASURY_ADDRESS: `0x${string}` =
  (process.env.NEXT_PUBLIC_TREASURY_ADDRESS as `0x${string}`) ??
  "0x0000000000000000000000000000000000000001";

// USDC uses 6 decimal places
export const USDC_DECIMALS = 6;

// Minimal ERC-20 ABI for transfer only
export const ERC20_TRANSFER_ABI = [
  {
    name: "transfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

/** Convert a dollar USDC amount to the uint256 representation (6 decimals). */
export function usdcUnits(dollars: number): bigint {
  return BigInt(Math.round(dollars * 10 ** USDC_DECIMALS));
}

/** Build a USDC transfer call suitable for OnchainKit Transaction `calls` array. */
export function buildUsdcTransfer(to: `0x${string}`, amountUsd: number) {
  return {
    to: USDC_ADDRESS,
    data: encodeFunctionData({
      abi: ERC20_TRANSFER_ABI,
      functionName: "transfer",
      args: [to, usdcUnits(amountUsd)],
    }),
    value: BigInt(0),
  };
}

// ─── Sanctuary Premium ────────────────────────────────────────────────────────

export const PREMIUM_MONTHLY_PRICE_USD = 2.99;

export const PREMIUM_FEATURES = [
  { emoji: "✍️", label: "600-char vents (2× standard)" },
  { emoji: "💛", label: "2× Kindness Points on all actions" },
  { emoji: "🏅", label: "Sanctuary Member badge" },
  { emoji: "📍", label: "Priority resource matching" },
  { emoji: "🚀", label: "Early access to new features" },
];

// ─── KP Booster Packs ────────────────────────────────────────────────────────

export interface BoosterPack {
  id: string;
  label: string;
  kp: number;
  priceUsd: number;
  emoji: string;
  badge?: string;
}

export const KP_BOOSTER_PACKS: BoosterPack[] = [
  {
    id: "starter",
    label: "Starter Pack",
    kp: 500,
    priceUsd: 0.99,
    emoji: "🌱",
  },
  {
    id: "growth",
    label: "Growth Pack",
    kp: 2500,
    priceUsd: 3.99,
    emoji: "🌊",
    badge: "Best Value",
  },
  {
    id: "power",
    label: "Power Pack",
    kp: 10_000,
    priceUsd: 9.99,
    emoji: "⚡",
    badge: "Most KP",
  },
];

// ─── Tip amounts ─────────────────────────────────────────────────────────────

export const TIP_AMOUNTS_USD = [0.5, 1, 2] as const;

/** KP awarded to the tipper when they send a USDC tip. */
export const TIP_SENDER_KP = 20;
/** KP awarded to the vent author when their vent is tipped. */
export const TIP_AUTHOR_KP = 50;
