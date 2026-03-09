export interface AppDetails {
  name: string;
  description: string;
  tagline: string;
  homeUrl: string;
  iconUrl: string;
  splashImageUrl: string;
  splashBackgroundColor: string;
  heroImageUrl: string;
  canonicalDomain: string;
  webhookUrl: string;
  requiredChains: string[];
  tags: string[];
  categories: string[];
}

export interface AccountAssociation {
  header: string;
  payload: string;
  signature: string;
}

export interface FarcasterManifest {
  accountAssociation: AccountAssociation;
  miniapp: {
    version: string;
    name: string;
    description?: string;
    iconUrl: string;
    homeUrl: string;
    canonicalDomain?: string;
    splashImageUrl?: string;
    splashBackgroundColor?: string;
    heroImageUrl?: string;
    tagline?: string;
    webhookUrl?: string;
    requiredChains?: string[];
    tags?: string[];
    categories?: string[];
  };
}

export type RegistrationStep = "details" | "appearance" | "verify" | "manifest";

/** EIP-155 chain ID for BASE mainnet (chain ID 8453). */
export const BASE_MAINNET_CHAIN = "eip155:8453";

