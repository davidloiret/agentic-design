'use client';

import Script from 'next/script';

interface PlausibleAnalyticsProps {
  domain: string;
  src?: string;
  enabled?: boolean;
}

export default function PlausibleAnalytics({
  domain,
  src = '/js/script.js',
  enabled = true
}: PlausibleAnalyticsProps) {
  if (!enabled || !domain) {
    return null;
  }

  return (
    <Script
      defer
      data-domain={domain}
      src={src}
      strategy="afterInteractive"
    />
  );
}

// Plausible event tracking function
export function plausible(eventName: string, props?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, { props });
  }
}

// Type declaration for the global plausible function
declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, any> }) => void;
  }
}