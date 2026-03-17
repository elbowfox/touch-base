import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Navigation from "@/components/Navigation";
import FrameInit from "@/components/FrameInit";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://touch-base.vercel.app";

export const metadata: Metadata = {
  title: "TouchBase",
  description:
    "Your home base — a safe, supportive place to get back in touch with yourself and your humanity.",
  openGraph: {
    title: "TouchBase",
    description: "Unconditional truth, safety, and love. On BASE.",
    url: APP_URL,
    siteName: "TouchBase",
    images: [{ url: `${APP_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  other: {
    // Farcaster Frame v2 metadata
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: `${APP_URL}/og-image.png`,
      button: {
        title: "Open TouchBase",
        action: {
          type: "launch_frame",
          name: "TouchBase",
          url: APP_URL,
          splashImageUrl: `${APP_URL}/splash.png`,
          splashBackgroundColor: "#f5f0eb",
        },
      },
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <FrameInit />
          <div className="mx-auto min-h-screen max-w-lg bg-stone-50 pb-20 dark:bg-stone-950">
            {children}
          </div>
          <Navigation />
        </Providers>
      </body>
    </html>
  );
}
