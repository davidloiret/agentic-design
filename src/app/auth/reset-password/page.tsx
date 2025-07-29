'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api-client';

function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [codeExchanged, setCodeExchanged] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Exchange reset code for access token (stored in cookies)
  useEffect(() => {
    const exchangeCode = async () => {
      const code = searchParams.get('code');
      if (code && !codeExchanged) {
        try {
          const response = await api.post('/api/v1/auth/exchange-reset-code', { code });
          if (response.ok) {
            setCodeExchanged(true);
            // Access token is now stored in cookies by the backend
          } else {
            setError('Invalid or expired reset link. Please request a new one.');
          }
        } catch (err) {
          console.error('Failed to exchange code:', err);
          setError('Invalid or expired reset link. Please request a new one.');
        }
      }
    };
    
    exchangeCode();
  }, [searchParams, codeExchanged]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      // Access token is already in cookies, no need to send it in body
      const response = await api.post('/api/v1/auth/reset-password', {
        password
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to reset password');
      }
      
      setSuccess(true);
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    } catch (err) {
      console.error('Reset password error:', err);
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-950">
        <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-8 shadow-2xl">
          <div className="text-center space-y-2 mb-6">
            <h1 className="text-2xl font-semibold text-gray-100">Password reset successful</h1>
            <p className="text-sm text-gray-400">
              Your password has been reset successfully.
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-center text-gray-400">
              Redirecting you to login...
            </p>
            <button
              onClick={() => router.push('/auth/login')}
              className="w-full py-3 px-4 border border-gray-700 rounded-lg shadow-sm bg-gray-800/50 text-base font-medium text-gray-100 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              Go to login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-950">
      <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-8 shadow-2xl">
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-2xl font-semibold text-gray-100">Set new password</h1>
          <p className="text-sm text-gray-400">
            Enter your new password below
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">New Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              minLength={6}
              className="block w-full px-3 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              minLength={6}
              className="block w-full px-3 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {error && (
            <div className="text-sm text-red-400 bg-red-900/20 border border-red-800/50 rounded-lg p-4">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset password'}
          </button>

          <div className="text-center text-sm">
            <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 transition-colors">
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-gray-400">Loading...</div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}