import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if user has access_token cookie
  const accessToken = request.cookies.get('access_token');
  const hasAccessToken = !!accessToken?.value;
  
  // Define routes that should redirect authenticated users
  const authRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password', '/auth/reset-password'];
  const publicRoutes = ['/'];
  
  // Redirect authenticated users away from auth pages without token validation
  if (hasAccessToken && (authRoutes.includes(pathname) || publicRoutes.includes(pathname))) {
    // Token exists, redirect to learning hub
    return NextResponse.redirect(new URL('/learning-hub', request.url));
  }
  
  // Allow all other requests to proceed without validation
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    // Match auth routes and landing page
    '/',
    '/auth/login',
    '/auth/register', 
    '/auth/forgot-password',
    '/auth/reset-password'
    // Note: /auth/callback is intentionally excluded as it needs to complete the OAuth flow
  ]
};