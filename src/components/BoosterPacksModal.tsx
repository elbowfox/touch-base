"use client";

import { useCallback, useState } from "react";
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
  KP_BOOSTER_PACKS,
  BoosterPack,
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

export default function BoosterPacksModal({ profile, onSuccess, onClose }: Props) {
  const [selected, setSelected] = useState<BoosterPack | null>(null);
  const [purchased, setPurchased] = useState<string | null>(null);

  const calls = useCallback(
    async () =>
      selected
        ? [buildUsdcTransfer(TREASURY_ADDRESS, selected.priceUsd)]
        : [],
    [selected]
  );

  function handleSuccess() {
    if (!selected) return;
    setPurchased(selected.id);
    onSuccess({
      ...profile,
      rewardsBalance: profile.rewardsBalance + selected.kp,
    });
  }

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
              <span className="text-2xl">⚡</span>
              <h2 className="text-lg font-bold text-stone-800 dark:text-stone-100">
                KP Booster Packs
              </h2>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Instantly add Kindness Points to your balance
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

        {/* Pack list */}
        <div className="space-y-3 mb-5">
          {KP_BOOSTER_PACKS.map((pack) => {
            const isSelected = selected?.id === pack.id;
            const wasPurchased = purchased === pack.id;

            return (
              <button
                key={pack.id}
                onClick={() => !wasPurchased && setSelected(isSelected ? null : pack)}
                className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                  wasPurchased
                    ? "border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950/20"
                    : isSelected
                    ? "border-amber-400 bg-amber-50 dark:border-amber-600 dark:bg-amber-950/30"
                    : "border-stone-200 bg-stone-50 hover:border-stone-300 dark:border-stone-700 dark:bg-stone-800 dark:hover:border-stone-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{pack.emoji}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-stone-800 dark:text-stone-100">
                          {pack.label}
                        </p>
                        {pack.badge && (
                          <span className="rounded-full bg-amber-100 dark:bg-amber-900/40 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                            {pack.badge}
                          </span>
                        )}
                        {wasPurchased && (
                          <span className="text-green-600 dark:text-green-400 text-xs font-medium">
                            ✅ Purchased
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        {pack.kp.toLocaleString()} KP
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-stone-700 dark:text-stone-300">
                    ${pack.priceUsd} USDC
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Buy button */}
        {selected ? (
          <Transaction
            chainId={CHAIN_ID}
            calls={calls}
            onSuccess={handleSuccess}
          >
            <TransactionButton
              text={`Buy ${selected.label} — $${selected.priceUsd} USDC`}
              className="w-full rounded-full bg-amber-500 hover:bg-amber-400 text-white font-semibold py-3 text-sm transition-colors"
            />
            <TransactionStatus>
              <TransactionStatusLabel className="text-xs text-stone-500 text-center mt-2" />
              <TransactionStatusAction className="text-xs text-center mt-1" />
            </TransactionStatus>
          </Transaction>
        ) : (
          <button
            disabled
            className="w-full rounded-full bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-stone-500 font-semibold py-3 text-sm cursor-not-allowed"
          >
            Select a pack to continue
          </button>
        )}

        <p className="text-xs text-stone-400 dark:text-stone-600 text-center mt-3">
          KP credited instantly · Paid in USDC on BASE chain
        </p>
      </div>
    </div>
  );
}
