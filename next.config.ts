import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow cross-origin requests when running inside Farcaster/Base mini-app frames
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          { key: "Content-Security-Policy", value: "frame-ancestors *" },
        ],
      },
    ];
  },
};

export default nextConfig;
