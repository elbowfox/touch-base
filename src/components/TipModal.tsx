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
  TIP_AMOUNTS_USD,
} from "@/lib/payments";

const CHAIN_ID =
  process.env.NEXT_PUBLIC_NETWORK === "mainnet"
    ? BASE_CHAIN_ID
    : BASE_SEPOLIA_CHAIN_ID;

interface Props {
  ventPreview: string;
  onSuccess: (amountUsd: number) => void;
  onClose: () => void;
}

export default function TipModal({ ventPreview, onSuccess, onClose }: Props) {
  const [amount, setAmount] = useState<number | null>(null);

  const calls = useCallback(
    () => (amount ? [buildUsdcTransfer(TREASURY_ADDRESS, amount)] : []),
    [amount]
  );

  function handleSuccess() {
    if (amount) onSuccess(amount);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md rounded-t-3xl bg-white dark:bg-stone-900 p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">💸</span>
              <h2 className="text-lg font-bold text-stone-800 dark:text-stone-100">
                Send a kindness tip
              </h2>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Your support matters — paid in USDC on BASE
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

        {/* Vent preview */}
        <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-4 py-3 mb-4">
          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 italic">
            "{ventPreview}"
          </p>
        </div>

        {/* Amount selector */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {TIP_AMOUNTS_USD.map((a) => (
            <button
              key={a}
              onClick={() => setAmount(amount === a ? null : a)}
              className={`rounded-xl border py-3 text-sm font-semibold transition-colors ${
                amount === a
                  ? "border-amber-400 bg-amber-50 dark:border-amber-600 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300"
                  : "border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300"
              }`}
            >
              ${a} USDC
            </button>
          ))}
        </div>

        {/* Send button */}
        {amount ? (
          <Transaction chainId={CHAIN_ID} calls={calls} onSuccess={handleSuccess}>
            <TransactionButton
              text={`Tip $${amount} USDC`}
              className="w-full rounded-full bg-rose-500 hover:bg-rose-400 text-white font-semibold py-3 text-sm transition-colors"
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
            Select an amount
          </button>
        )}

        <p className="text-xs text-stone-400 dark:text-stone-600 text-center mt-3">
          Tips support the platform and earn both parties Kindness Points
        </p>
      </div>
    </div>
  );
}
