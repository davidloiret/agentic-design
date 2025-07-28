'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles } from 'lucide-react';

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      console.log('[Frontend OAuth] Callback page loaded');
      
      const error = searchParams.get('error');
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');
      
      console.log('[Frontend OAuth] URL params:', {
        error: error || 'none',
        hasAccessToken: !!accessToken,
        hasRefreshToken: !!refreshToken,
        accessTokenLength: accessToken?.length,
      });
      
      if (error) {
        // Handle OAuth errors
        console.error('[Frontend OAuth] Error from backend:', error);
        router.push('/auth/login?error=oauth_failed');
        return;
      }

      if (accessToken) {
        try {
          console.log('[Frontend OAuth] Sending tokens to backend to set cookies...');
          
          // Make a POST request to set cookies
          const response = await fetch('/api/v1/auth/callback/complete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              access_token: accessToken,
              refresh_token: refreshToken,
            }),
          });

          console.log('[Frontend OAuth] Response status:', response.status);
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error('[Frontend OAuth] Response error:', errorText);
            throw new Error('Failed to complete authentication');
          }

          const data = await response.json();
          console.log('[Frontend OAuth] Authentication completed:', data);
          
          // Check if cookies were set
          console.log('[Frontend OAuth] Document cookies:', document.cookie);
          
          // Refresh user data to get the newly authenticated user
          console.log('[Frontend OAuth] Refreshing user data...');
          await refreshUser();
          
          // Redirect to learning hub on successful authentication
          console.log('[Frontend OAuth] Redirecting to learning hub...');
          router.push('/learning-hub');
        } catch (error) {
          console.error('[Frontend OAuth] Failed to complete OAuth callback:', error);
          router.push('/auth/login?error=oauth_failed');
        }
      } else {
        // No tokens, redirect to login
        console.log('[Frontend OAuth] No access token found, redirecting to login');
        router.push('/auth/login');
      }
    };

    handleCallback();
  }, [searchParams, router, refreshUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-purple-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent"></div>
      
      <div className="relative z-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl mb-4">
          <Sparkles className="w-8 h-8 text-white animate-pulse" />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Completing sign in...
        </h1>
        <p className="text-gray-400">Please wait while we redirect you.</p>
        
        {/* Loading spinner */}
        <div className="mt-6 flex justify-center">
          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}