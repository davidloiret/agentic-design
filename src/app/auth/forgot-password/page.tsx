'use client';

import { useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/api/v1/auth/forgot-password', { email });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to send reset email');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Forgot password error:', err);
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-950">
        <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-8 shadow-2xl">
          <div className="text-center space-y-2 mb-6">
            <h1 className="text-2xl font-semibold text-gray-100">Check your email</h1>
            <p className="text-sm text-gray-400">
              If an account exists with {email}, we've sent a password reset link.
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-center text-gray-400">
              Please check your email and follow the instructions to reset your password.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => router.push('/auth/login')}
                className="w-full py-3 px-4 border border-gray-700 rounded-lg shadow-sm bg-gray-800/50 text-base font-medium text-gray-100 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                Back to login
              </button>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setEmail('');
                }}
                className="w-full py-3 px-4 text-gray-400 hover:text-gray-300 transition-colors"
              >
                Try another email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-950">
      <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-8 shadow-2xl">
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-2xl font-semibold text-gray-100">Reset your password</h1>
          <p className="text-sm text-gray-400">
            Enter your email address and we'll send you a reset link
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
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
            {loading ? 'Sending...' : 'Send reset link'}
          </button>

          <div className="text-center text-sm">
            <span className="text-gray-400">Remember your password? </span>
            <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 transition-colors">
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}