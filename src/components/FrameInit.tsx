"use client";

import { useEffect } from "react";
import sdk from "@farcaster/miniapp-sdk";

/**
 * Calls sdk.actions.ready() once the app mounts so the Farcaster host knows
 * the mini-app has finished loading and can hide its splash screen.
 */
export default function FrameInit() {
  useEffect(() => {
    sdk.actions.ready().catch(() => {
      // Not running inside a Farcaster host — silently ignore.
    });
  }, []);

  return null;
}
