'use client';

import { plausible } from '@/components/PlausibleAnalytics';

export class AnalyticsTracker {
  private static instance: AnalyticsTracker;
  private pageLoadTime: number = 0;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.initializeTracking();
    }
  }

  public static getInstance(): AnalyticsTracker {
    if (!AnalyticsTracker.instance) {
      AnalyticsTracker.instance = new AnalyticsTracker();
    }
    return AnalyticsTracker.instance;
  }

  private initializeTracking() {
    // Track page load performance
    this.trackPageLoad();

    // Track JavaScript errors
    this.trackErrors();

    // Track navigation performance
    this.trackNavigation();

    // Track user engagement
    this.trackEngagement();
  }

  private trackPageLoad() {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paintEntries = performance.getEntriesByType('paint');

        if (navigation) {
          this.pageLoadTime = navigation.loadEventEnd - navigation.loadEventStart;

          plausible('Page Performance', {
            props: {
              load_time: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
              dom_content_loaded: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
              first_byte: Math.round(navigation.responseStart - navigation.requestStart),
              dns_lookup: Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
              connection_time: Math.round(navigation.connectEnd - navigation.connectStart)
            }
          });
        }

        // Track paint metrics
        paintEntries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            plausible('Paint Metrics', {
              props: {
                metric: 'first_contentful_paint',
                value: Math.round(entry.startTime)
              }
            });
          }
        });
      });
    }
  }

  private trackErrors() {
    if (typeof window !== 'undefined') {
      // Track JavaScript errors
      window.addEventListener('error', (event) => {
        plausible('JavaScript Error', {
          props: {
            message: event.message,
            filename: event.filename,
            line: event.lineno,
            column: event.colno,
            stack: event.error?.stack?.substring(0, 500) || 'No stack trace'
          }
        });
      });

      // Track unhandled promise rejections
      window.addEventListener('unhandledrejection', (event) => {
        plausible('Unhandled Promise Rejection', {
          props: {
            reason: String(event.reason).substring(0, 500)
          }
        });
      });
    }
  }

  private trackNavigation() {
    if (typeof window !== 'undefined') {
      // Track route changes (for SPA navigation)
      let currentPath = window.location.pathname;

      const observer = new MutationObserver(() => {
        if (window.location.pathname !== currentPath) {
          const previousPath = currentPath;
          currentPath = window.location.pathname;

          plausible('Route Change', {
            props: {
              from: previousPath,
              to: currentPath,
              timestamp: Date.now()
            }
          });
        }
      });

      observer.observe(document, { subtree: true, childList: true });
    }
  }

  private trackEngagement() {
    if (typeof window !== 'undefined') {
      let startTime = Date.now();
      let isVisible = !document.hidden;
      let engagementTime = 0;

      // Track page visibility changes
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          if (isVisible) {
            engagementTime += Date.now() - startTime;
            isVisible = false;
          }
        } else {
          startTime = Date.now();
          isVisible = true;
        }
      });

      // Track engagement on page unload
      window.addEventListener('beforeunload', () => {
        if (isVisible) {
          engagementTime += Date.now() - startTime;
        }

        if (engagementTime > 5000) { // Only track if user spent more than 5 seconds
          plausible('Page Engagement', {
            props: {
              time_on_page: Math.round(engagementTime / 1000),
              page: window.location.pathname
            }
          });
        }
      });

      // Track scroll depth
      let maxScrollDepth = 0;

      const trackScrollDepth = () => {
        const scrollDepth = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
        if (scrollDepth > maxScrollDepth) {
          maxScrollDepth = scrollDepth;
        }
      };

      window.addEventListener('scroll', trackScrollDepth, { passive: true });

      // Send scroll depth on page unload
      window.addEventListener('beforeunload', () => {
        if (maxScrollDepth > 25) { // Only track meaningful scroll
          plausible('Scroll Depth', {
            props: {
              max_depth: Math.min(maxScrollDepth, 100),
              page: window.location.pathname
            }
          });
        }
      });
    }
  }

  // Public methods for custom tracking
  public trackError(error: Error, context?: string) {
    plausible('Custom Error', {
      props: {
        message: error.message,
        context: context || 'Unknown',
        stack: error.stack?.substring(0, 500) || 'No stack trace'
      }
    });
  }

  public trackAPICall(endpoint: string, duration: number, status: number) {
    plausible('API Call', {
      props: {
        endpoint,
        duration: Math.round(duration),
        status,
        success: status >= 200 && status < 300
      }
    });
  }

  public trackUserAction(action: string, properties?: Record<string, any>) {
    plausible('User Action', {
      props: {
        action,
        ...properties
      }
    });
  }
}

// Initialize the singleton instance
export const analytics = AnalyticsTracker.getInstance();