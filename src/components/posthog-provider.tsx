"use client";

import { useEffect } from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    import("posthog-js")
      .then(({ default: posthog }) => {
        console.log("[PostHog] loaded, initializing...");
        if (!posthog.__loaded) {
          posthog.init("phc_AR4Qu7buS3g26ZMhhB6SGDdsNhNeVCSuz6ozv3sFrMat", {
            api_host: "https://eu.i.posthog.com",
            capture_pageview: true,
            capture_pageleave: true,
            autocapture: true,
            disable_session_recording: true,
            loaded: () => console.log("[PostHog] initialized OK"),
          });
        }
      })
      .catch((err) => console.error("[PostHog] failed to load:", err));
  }, []);

  return <>{children}</>;
}
