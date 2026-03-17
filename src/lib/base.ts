// BASE chain utilities (from PR4)
import { base, baseSepolia } from "wagmi/chains";

export const CHAIN =
  process.env.NEXT_PUBLIC_NETWORK === "mainnet" ? base : baseSepolia;

export const KINDNESS_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_KINDNESS_CONTRACT_ADDRESS ?? "";

// Minimal ABI for Kindness Points contract (ERC-20 style)
export const KINDNESS_ABI = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "awardPoints",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "reason", type: "string" },
    ],
    outputs: [],
  },
] as const;

// Builder Score API — check user's BASE contribution score
export async function fetchBuilderScore(address: string): Promise<number | null> {
  try {
    const res = await fetch(
      `https://api.talentprotocol.com/api/v2/passports/${address}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.passport?.score ?? null;
  } catch {
    return null;
  }
}
