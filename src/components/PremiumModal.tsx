"use client";

import { useCallback } from "react";
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusLabel,
  TransactionStatusAction,
} from "@coinbase/onchainkit/transaction";
import { BASE_CHAIN_ID, BASE_SEPOLIA_CHAIN_ID } from "@/lib/constants";
import {
  buildUsdcTransfer,
  TREASURY_ADDRESS,
  PREMIUM_MONTHLY_PRICE_USD,
  PREMIUM_FEATURES,
} from "@/lib/payments";
import { UserProfile } from "@/lib/types";

const CHAIN_ID =
  process.env.NEXT_PUBLIC_NETWORK === "mainnet"
    ? BASE_CHAIN_ID
    : BASE_SEPOLIA_CHAIN_ID;

interface Props {
  profile: UserProfile;
  onSuccess: (updatedProfile: UserProfile) => void;
  onClose: () => void;
}

export default function PremiumModal({ profile, onSuccess, onClose }: Props) {
  const calls = useCallback(
    () => [buildUsdcTransfer(TREASURY_ADDRESS, PREMIUM_MONTHLY_PRICE_USD)],
    []
  );

  function handleSuccess() {
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + 1);
    onSuccess({
      ...profile,
      isPremium: true,
      premiumExpiry: expiry.toISOString(),
    });
  }

  const isAlreadyPremium =
    profile.isPremium &&
    profile.premiumExpiry &&
    new Date(profile.premiumExpiry) > new Date();

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md rounded-t-3xl bg-white dark:bg-stone-900 p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">🏅</span>
              <h2 className="text-lg font-bold text-stone-800 dark:text-stone-100">
                Sanctuary Premium
              </h2>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Support the community · Unlock premium features
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 text-xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Price */}
        <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 p-4 mb-4">
          <p className="text-3xl font-bold text-amber-800 dark:text-amber-300">
            ${PREMIUM_MONTHLY_PRICE_USD}
            <span className="text-sm font-normal text-amber-600 dark:text-amber-500">
              {" "}USDC / month
            </span>
          </p>
          <p className="text-xs text-amber-600 dark:text-amber-500 mt-1">
            Paid on BASE chain · Cancel any time by not renewing
          </p>
        </div>

        {/* Features list */}
        <ul className="space-y-2.5 mb-5">
          {PREMIUM_FEATURES.map((f) => (
            <li key={f.label} className="flex items-center gap-3 text-sm text-stone-700 dark:text-stone-300">
              <span className="text-base">{f.emoji}</span>
              {f.label}
            </li>
          ))}
        </ul>

        {/* CTA */}
        {isAlreadyPremium ? (
          <div className="rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3 text-center">
            <p className="text-sm font-semibold text-green-700 dark:text-green-400">
              ✅ You&apos;re a Sanctuary Member!
            </p>
            <p className="text-xs text-green-600 dark:text-green-500 mt-0.5">
              Active until {new Date(profile.premiumExpiry!).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <Transaction
            chainId={CHAIN_ID}
            calls={calls}
            onSuccess={handleSuccess}
          >
            <TransactionButton
              text={`Upgrade for $${PREMIUM_MONTHLY_PRICE_USD} USDC`}
              className="w-full rounded-full bg-amber-500 hover:bg-amber-400 text-white font-semibold py-3 text-sm transition-colors"
            />
            <TransactionStatus>
              <TransactionStatusLabel className="text-xs text-stone-500 text-center mt-2" />
              <TransactionStatusAction className="text-xs text-center mt-1" />
            </TransactionStatus>
          </Transaction>
        )}

        <p className="text-xs text-stone-400 dark:text-stone-600 text-center mt-3">
          Revenue funds platform hosting and on-chain USDC milestone rewards
        </p>
      </div>
    </div>
  );
}
