import { CookieOptions } from 'express';

/**
 * Get cookie configuration based on environment
 * Handles domain configuration properly for development and production
 */
export function getCookieConfig(): CookieOptions {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = process.env.NODE_ENV === 'development' || !isProduction;

  // Base configuration that's always used
  const baseConfig: CookieOptions = {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
  };

  // Production-specific settings
  if (isProduction) {
    return {
      ...baseConfig,
      secure: true,
      domain: '.agentic-design.ai', // Cookie will work for all subdomains
    };
  }

  // Development settings
  // In development, don't set domain to allow localhost to work properly
  return {
    ...baseConfig,
    secure: false, // Allow HTTP in development
    // Don't set domain in development - browser will use current domain
  };
}

/**
 * Get cookie options for access token
 */
export function getAccessTokenCookieOptions(): CookieOptions {
  return {
    ...getCookieConfig(),
    maxAge: 60 * 60 * 1000, // 1 hour
  };
}

/**
 * Get cookie options for refresh token
 */
export function getRefreshTokenCookieOptions(): CookieOptions {
  return {
    ...getCookieConfig(),
    maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
  };
}

/**
 * Log cookie configuration for debugging
 */
export function logCookieConfig(context: string) {
  const config = getCookieConfig();
  console.log(`[CookieConfig] ${context}:`, {
    environment: process.env.NODE_ENV || 'development',
    httpOnly: config.httpOnly,
    secure: config.secure,
    sameSite: config.sameSite,
    domain: config.domain || 'not set (uses current domain)',
    path: config.path,
  });
}