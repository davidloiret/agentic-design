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
let trackerReady: boolean = false;

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

      // Store the tracker instance immediately
      trackerInstance = tracker;

      // Start the tracker and wait for it to be ready
      tracker.start().then((result) => {
        trackerReady = true;
        console.log('OpenReplay started successfully:', {
          projectKey,
          ingestPoint,
          assistEnabled,
          sessionID: 'sessionID' in result ? result.sessionID : undefined,
        });
      }).catch((error) => {
        console.error('OpenReplay failed to start:', error);
        trackerReady = false;
      });

      initialized.current = true;
    } catch (error) {
      console.error('Failed to initialize OpenReplay:', error);
    }

    return () => {
      if (trackerInstance) {
        trackerInstance.stop();
        trackerInstance = null;
        trackerReady = false;
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
export function identifyUser(userId: string, metadata?: Record<string, any>, retryCount = 0) {
  if (!trackerInstance) {
    console.warn('[OpenReplay] Cannot identify user - tracker not initialized yet.');
    if (retryCount < 10) {
      setTimeout(() => identifyUser(userId, metadata, retryCount + 1), 500);
    } else {
      console.error('[OpenReplay] Failed to identify user after 10 retries');
    }
    return;
  }

  if (!trackerReady) {
    console.warn('[OpenReplay] Tracker not ready yet. Waiting...');
    if (retryCount < 10) {
      setTimeout(() => identifyUser(userId, metadata, retryCount + 1), 500);
    } else {
      console.error('[OpenReplay] Tracker not ready after 10 retries');
    }
    return;
  }

  try {
    console.log('[OpenReplay] Setting user ID:', userId);
    trackerInstance.setUserID(userId);

    if (metadata) {
      console.log('[OpenReplay] Setting user metadata:', metadata);
    }

    console.log('[OpenReplay] User identified successfully');
  } catch (error) {
    console.error('[OpenReplay] Failed to identify user:', error);
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
