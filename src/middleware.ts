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
  
  // Only validate token when accessing auth pages or landing page to avoid slowing down all requests
  if (hasAccessToken && (authRoutes.includes(pathname) || publicRoutes.includes(pathname))) {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
      const response = await fetch(`${backendUrl}/api/v1/auth/me`, {
        headers: {
          'Cookie': request.headers.get('cookie') || '',
        },
      });
      
      if (response.ok) {
        // Token is valid, redirect to learning hub
        return NextResponse.redirect(new URL('/learning-hub', request.url));
      } else {
        // Token is invalid, clear it and allow access to auth pages
        const nextResponse = NextResponse.next();
        nextResponse.cookies.delete('access_token');
        return nextResponse;
      }
    } catch (error) {
      // If verification fails, clear invalid cookie and allow access to auth pages
      const nextResponse = NextResponse.next();
      nextResponse.cookies.delete('access_token');
      return nextResponse;
    }
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