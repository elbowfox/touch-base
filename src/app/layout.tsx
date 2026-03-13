import type { Metadata } from "next";
import "./globals.css";

const metadataBase =
  process.env.NEXT_PUBLIC_APP_URL &&
  process.env.NEXT_PUBLIC_APP_URL.startsWith("http")
    ? new URL(process.env.NEXT_PUBLIC_APP_URL)
    : undefined;

export const metadata: Metadata = {
  title: "Touch Base | BASE.dev mini-app",
  description:
    "Touch Base is ready for BASE.dev with a shareable mini-app URL and builder code manifest.",
  metadataBase,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
