import { AppDetails, FarcasterManifest, BASE_MAINNET_CHAIN } from "./types";

export function buildManifest(
  details: AppDetails,
  accountAssociation: { header: string; payload: string; signature: string }
): FarcasterManifest {
  const miniapp: FarcasterManifest["miniapp"] = {
    version: "1",
    name: details.name,
    iconUrl: details.iconUrl,
    homeUrl: details.homeUrl,
  };

  if (details.description) miniapp.description = details.description;
  if (details.tagline) miniapp.tagline = details.tagline;
  if (details.canonicalDomain) miniapp.canonicalDomain = details.canonicalDomain;
  if (details.splashImageUrl) miniapp.splashImageUrl = details.splashImageUrl;
  if (details.splashBackgroundColor)
    miniapp.splashBackgroundColor = details.splashBackgroundColor;
  if (details.heroImageUrl) miniapp.heroImageUrl = details.heroImageUrl;
  if (details.webhookUrl) miniapp.webhookUrl = details.webhookUrl;
  if (details.requiredChains && details.requiredChains.length > 0)
    miniapp.requiredChains = details.requiredChains;
  if (details.tags && details.tags.length > 0) miniapp.tags = details.tags;
  if (details.categories && details.categories.length > 0)
    miniapp.categories = details.categories;

  return {
    accountAssociation,
    miniapp,
  };
}

export function getDefaultAppDetails(): AppDetails {
  return {
    name: "",
    description: "",
    tagline: "",
    homeUrl: "",
    iconUrl: "",
    splashImageUrl: "",
    splashBackgroundColor: "#ffffff",
    heroImageUrl: "",
    canonicalDomain: "",
    webhookUrl: "",
    requiredChains: [BASE_MAINNET_CHAIN],
    tags: [],
    categories: [],
  };
}
