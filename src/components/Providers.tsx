"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { farcasterFrame } from "@farcaster/miniapp-wagmi-connector";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { useMemo } from "react";

const CHAIN =
  process.env.NEXT_PUBLIC_NETWORK === "mainnet" ? base : baseSepolia;

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = useMemo(() => new QueryClient(), []);

  const wagmiConfig = useMemo(
    () =>
      createConfig({
        chains: [CHAIN],
        connectors: [farcasterFrame()],
        transports: { [base.id]: http(), [baseSepolia.id]: http() },
      }),
    []
  );

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={CHAIN}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
