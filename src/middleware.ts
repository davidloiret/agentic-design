import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if user is authenticated by looking for access_token cookie
  const accessToken = request.cookies.get('access_token');
  const isAuthenticated = !!accessToken?.value;
  
  // Define routes that should redirect authenticated users
  const authRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password', '/auth/reset-password'];
  const publicRoutes = ['/'];
  
  // If user is authenticated and trying to access auth pages or landing page
  if (isAuthenticated && (authRoutes.includes(pathname) || publicRoutes.includes(pathname))) {
    return NextResponse.redirect(new URL('/learning-hub', request.url));
  }
  
  // Allow all other requests to proceed
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