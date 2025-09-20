'use client';

import { useCallback } from 'react';
import { analytics } from '@/lib/analytics';

export function usePlausible() {
  const trackEvent = useCallback((eventName: string, props?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible(eventName, { props });
    }
  }, []);

  // Common event trackers for your site
  const trackPatternView = useCallback((patternId: string, category: string) => {
    trackEvent('Pattern View', { pattern: patternId, category });
  }, [trackEvent]);

  const trackTechniqueView = useCallback((techniqueId: string, category: string) => {
    trackEvent('Technique View', { technique: techniqueId, category });
  }, [trackEvent]);

  const trackSearch = useCallback((query: string, results: number) => {
    trackEvent('Search', { query, results });
  }, [trackEvent]);

  const trackDemo = useCallback((demoType: string, action: string, props?: Record<string, any>) => {
    trackEvent('Demo Interaction', { demo: demoType, action, ...props });
  }, [trackEvent]);

  const trackCodePlayground = useCallback((language: string, action: string, props?: Record<string, any>) => {
    trackEvent('Code Playground', { language, action, ...props });
  }, [trackEvent]);

  const trackAuth = useCallback((action: 'login' | 'register' | 'logout') => {
    trackEvent('Auth', { action });
  }, [trackEvent]);

  const trackLearningHub = useCallback((action: string, content?: string) => {
    trackEvent('Learning Hub', { action, content });
  }, [trackEvent]);

  // Error and performance tracking
  const trackError = useCallback((error: Error, context?: string) => {
    analytics.trackError(error, context);
  }, []);

  const trackAPICall = useCallback((endpoint: string, duration: number, status: number) => {
    analytics.trackAPICall(endpoint, duration, status);
  }, []);

  const trackUserAction = useCallback((action: string, properties?: Record<string, any>) => {
    analytics.trackUserAction(action, properties);
  }, []);

  return {
    trackEvent,
    trackPatternView,
    trackTechniqueView,
    trackSearch,
    trackDemo,
    trackCodePlayground,
    trackAuth,
    trackLearningHub,
    trackError,
    trackAPICall,
    trackUserAction,
  };
}