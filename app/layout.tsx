import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "touch-base | Register with BASE Dev Platform",
  description:
    "Register your Farcaster Mini App on the BASE developer platform. Generate your manifest, verify your domain, and publish your app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900 font-sans">
        {children}
      </body>
    </html>
  );
}
