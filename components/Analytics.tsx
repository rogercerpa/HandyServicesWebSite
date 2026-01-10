"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Generate or retrieve session ID
function getSessionId(): string {
  if (typeof window === "undefined") return "";
  
  let sessionId = sessionStorage.getItem("analytics_session");
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem("analytics_session", sessionId);
  }
  return sessionId;
}

// Track analytics event
export async function trackEvent(
  eventType: string,
  data?: {
    pagePath?: string;
    serviceId?: string;
    metadata?: Record<string, unknown>;
  }
) {
  try {
    const sessionId = getSessionId();
    
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType,
        pagePath: data?.pagePath,
        serviceId: data?.serviceId,
        metadata: data?.metadata,
        sessionId,
      }),
    });
  } catch (err) {
    // Silently fail for analytics
    console.debug("Analytics tracking failed:", err);
  }
}

// Analytics provider component for automatic page view tracking
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view on route change
    trackEvent("page_view", { pagePath: pathname });
  }, [pathname]);

  return null;
}

// Hook for manual event tracking
export function useAnalytics() {
  return {
    trackEvent,
    trackPageView: (path?: string) => trackEvent("page_view", { pagePath: path }),
    trackServiceView: (serviceId: string) => trackEvent("service_view", { serviceId }),
    trackQuoteStart: (serviceId?: string) => trackEvent("quote_start", { serviceId }),
    trackQuoteComplete: (serviceId?: string) => trackEvent("quote_complete", { serviceId }),
    trackContactSubmit: () => trackEvent("contact_submit"),
  };
}

