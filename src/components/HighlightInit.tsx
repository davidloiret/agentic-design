'use client';

import { H } from '@highlight-run/next/client';
import { useEffect } from 'react';

interface HighlightInitProps {
  projectId: string;
  enabled?: boolean;
  serviceName?: string;
  environment?: string;
  backendUrl?: string;
}

export default function HighlightInit({
  projectId,
  enabled = true,
  serviceName = 'agentic-design-frontend',
  environment = process.env.NODE_ENV || 'development',
  backendUrl,
}: HighlightInitProps) {
  useEffect(() => {
    if (!enabled || !projectId) {
      return;
    }

    H.init(projectId, {
      serviceName,
      environment,
      ...(backendUrl && { backendUrl }),
      tracingOrigins: true,
      networkRecording: {
        enabled: true,
        recordHeadersAndBody: true,
        urlBlocklist: [],
      },
    });

    console.log('Highlight.io initialized:', {
      projectId,
      serviceName,
      environment,
      backendUrl: backendUrl || 'default',
    });
  }, [projectId, enabled, serviceName, environment, backendUrl]);

  if (!enabled || !projectId) {
    return null;
  }

  return null;
}

// Export H for manual tracking
export { H };

// Helper functions for manual error tracking
export function trackError(error: Error, metadata?: Record<string, any>) {
  if (typeof window !== 'undefined' && H) {
    H.consumeError(error, metadata);
  }
}

export function identifyUser(userId: string, metadata?: Record<string, any>) {
  if (typeof window !== 'undefined' && H) {
    H.identify(userId, metadata);
  }
}

export function trackEvent(event: string, metadata?: Record<string, any>) {
  if (typeof window !== 'undefined' && H) {
    H.track(event, metadata);
  }
}
