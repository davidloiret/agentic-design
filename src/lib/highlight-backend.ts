// Backend error tracking with Highlight.io
// Apache 2.0 License
// Note: This file should only be imported in server-side code (API routes, server actions)

import { H } from '@highlight-run/node';

let isInitialized = false;

export function initHighlightBackend() {
  if (isInitialized) {
    return;
  }

  const projectId = process.env.HIGHLIGHT_PROJECT_ID;

  if (!projectId || projectId === 'your_highlight_project_id') {
    console.log('Highlight.io backend tracking not initialized: Missing HIGHLIGHT_PROJECT_ID');
    return;
  }

  try {
    H.init({
      projectID: projectId,
      serviceName: 'agentic-design-backend',
      serviceVersion: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    });
    isInitialized = true;
    console.log('Highlight.io backend initialized');
  } catch (error) {
    console.error('Failed to initialize Highlight.io backend:', error);
  }
}

// Helper to track server-side errors
export function trackBackendError(
  error: Error | string,
  metadata?: Record<string, any>
) {
  try {
    if (typeof error === 'string') {
      H.consumeError(new Error(error), metadata);
    } else {
      H.consumeError(error, metadata);
    }
  } catch (err) {
    console.error('Failed to track error with Highlight:', err);
  }
}

// Helper for Next.js API routes
export function withHighlight<T>(handler: T): T {
  return handler;
}

// Export H for advanced use cases
export { H };
