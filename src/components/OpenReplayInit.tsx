'use client';

import { useEffect, useRef } from 'react';
import Tracker from '@openreplay/tracker';
import trackerAssist from '@openreplay/tracker-assist';

interface OpenReplayInitProps {
  projectKey: string;
  ingestPoint: string;
  enabled?: boolean;
  assistEnabled?: boolean;
}

let trackerInstance: Tracker | null = null;

export default function OpenReplayInit({
  projectKey,
  ingestPoint,
  enabled = true,
  assistEnabled = true,
}: OpenReplayInitProps) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!enabled || !projectKey || initialized.current || typeof window === 'undefined') {
      return;
    }

    try {
      const tracker = new Tracker({
        projectKey,
        ingestPoint,
        __DISABLE_SECURE_MODE: process.env.NODE_ENV === 'development',
      });

      if (assistEnabled) {
        // @ts-ignore - OpenReplay type mismatch between CJS and ESM builds
        tracker.use(trackerAssist({
          callConfirm: {
            style: {
              backgroundColor: '#0066FF',
              color: 'white',
            },
          },
        }));
      }

      tracker.start();
      trackerInstance = tracker;
      initialized.current = true;

      console.log('OpenReplay initialized:', {
        projectKey,
        ingestPoint,
        assistEnabled,
      });
    } catch (error) {
      console.error('Failed to initialize OpenReplay:', error);
    }

    return () => {
      if (trackerInstance) {
        trackerInstance.stop();
        trackerInstance = null;
        initialized.current = false;
      }
    };
  }, [projectKey, ingestPoint, enabled, assistEnabled]);

  return null;
}

// Export tracker instance for manual tracking
export function getTracker(): Tracker | null {
  return trackerInstance;
}

// Helper functions for manual tracking
export function identifyUser(userId: string, metadata?: Record<string, any>) {
  if (trackerInstance) {
    trackerInstance.setUserID(userId);
    if (metadata) {
      trackerInstance.setMetadata('user', JSON.stringify(metadata));
    }
  }
}

export function trackEvent(event: string, metadata?: Record<string, any>) {
  if (trackerInstance) {
    trackerInstance.event(event, metadata);
  }
}

export function trackIssue(message: string, severity?: 'info' | 'warning' | 'error') {
  if (trackerInstance) {
    trackerInstance.issue(message, severity);
  }
}
