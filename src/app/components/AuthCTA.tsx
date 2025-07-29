"use client"

import React from 'react';
import { Sparkles, LogIn, UserPlus, X } from 'lucide-react';
import Link from 'next/link';

interface AuthCTAProps {
  onClose: () => void;
  variant?: 'overlay' | 'replacement';
}

export const AuthCTA = ({ onClose, variant = 'overlay' }: AuthCTAProps) => {
  const content = (
    <div className="p-8 text-center">
      <div className="mb-6">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto flex items-center justify-center mb-4 animate-pulse">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Unlock AI Assistant
        </h2>
        <p className="text-gray-300 text-lg">
          Sign in to enjoy the complete experience with our intelligent assistant
        </p>
      </div>

      <div className="space-y-3">
        <Link
          href="/auth/login"
          className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
        >
          <LogIn className="w-5 h-5" />
          Sign In
        </Link>

        <Link
          href="/auth/register"
          className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg border border-gray-600 transition-all transform hover:scale-105"
        >
          <UserPlus className="w-5 h-5" />
          Create Account
        </Link>
      </div>

      <div className="mt-6 text-sm text-gray-400">
        <p>Join our community and discover</p>
        <ul className="mt-2 space-y-1">
          <li>✨ Personalized recommendations</li>
          <li>🚀 Unlimited assistant access</li>
          <li>📚 Progress tracking</li>
          <li>🏆 Achievements and rewards</li>
        </ul>
      </div>
    </div>
  );

  if (variant === 'replacement') {
    return (
      <div className="bg-gray-900 h-full flex flex-col items-center justify-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
        {content}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 bg-gray-800 rounded-full p-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        {content}
      </div>
    </div>
  );
};