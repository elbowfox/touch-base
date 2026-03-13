const stripTrailingSlash = (value: string) =>
  value.endsWith("/") ? value.slice(0, -1) : value;

const ensureLeadingSlash = (value: string) =>
  value.startsWith("/") ? value : `/${value}`;

const appUrl = stripTrailingSlash(
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
);
const miniAppPath = ensureLeadingSlash(
  process.env.NEXT_PUBLIC_BASE_MINIAPP_PATH ?? "/miniapp",
);
const miniAppUrl = `${appUrl}${miniAppPath}`;

const builderCode = process.env.NEXT_PUBLIC_BASE_BUILDER_CODE ?? "";
const payoutAddress = process.env.NEXT_PUBLIC_BASE_PAYOUT_ADDRESS ?? "";

export const baseIntegration = {
  appName: "Touch Base",
  description:
    "A Farcaster-first mini-app on Base with Builder Code attribution baked in.",
  appUrl,
  miniAppPath,
  miniAppUrl,
  builderCode,
  payoutAddress,
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@touch-base.app",
  docsUrl: "https://docs.base.org/llms.txt",
  builderCodeDocs: "https://docs.base.org/base-chain/builder-codes/app-developers",
};

export type MiniAppManifest = {
  name: string;
  description: string;
  homepageUrl: string;
  miniAppUrl: string;
  builderCode: string | null;
  payoutAddress: string | null;
  contactEmail: string;
  docs: {
    index: string;
    builderCodes: string;
  };
  updatedAt: string;
};

export const buildMiniAppManifest = (): MiniAppManifest => ({
  name: baseIntegration.appName,
  description: baseIntegration.description,
  homepageUrl: baseIntegration.appUrl,
  miniAppUrl: baseIntegration.miniAppUrl,
  builderCode: baseIntegration.builderCode || null,
  payoutAddress: baseIntegration.payoutAddress || null,
  contactEmail: baseIntegration.supportEmail,
  docs: {
    index: baseIntegration.docsUrl,
    builderCodes: baseIntegration.builderCodeDocs,
  },
  updatedAt: new Date().toISOString(),
});
