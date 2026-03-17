"use client";

import { useEffect } from "react";
import sdk from "@farcaster/miniapp-sdk";

/**
 * Signals to the Farcaster host that the mini-app has finished loading,
 * allowing it to hide the splash screen. Safe to use outside Farcaster.
 */
export default function FrameInit() {
  useEffect(() => {
    sdk.actions.ready().catch(() => {
      // Not running inside a Farcaster host — silently ignore.
    });
  }, []);

  return null;
}
