"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init("phc_AR4Qu7buS3g26ZMhhB6SGDdsNhNeVCSuz6ozv3sFrMat", {
      api_host: "https://eu.i.posthog.com",
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true, // clicks, inputs, forms
      disable_session_recording: true,
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
