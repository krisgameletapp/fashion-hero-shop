"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
  posthog.init("phc_AR4Qu7buS3g26ZMhhB6SGDdsNhNeVCSuz6ozv3sFrMat", {
    api_host: "https://eu.i.posthog.com",
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
    disable_session_recording: true,
  });
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <PHProvider client={posthog}>{children}</PHProvider>;
}
