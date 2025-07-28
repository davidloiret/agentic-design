'use client';

import { Sparkles, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserMenu } from './UserMenu';
import Link from 'next/link';

export const Header = () => {
  const { user, loading } = useAuth();

  return (
    <div className="z-50 relative bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 border-b border-gray-700/50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-purple-900/10"></div>
      
      <div className="relative mx-auto px-4 sm:px-6 py-2">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left side - Logo and Title */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Agentic Design
                </h1>
                <span className="hidden lg:inline text-xs text-gray-400 font-medium">
                  • Learn how to build reliable and secure AI systems
                </span>
              </div>
            </div>
          </div>

          {/* Middle - Search Bar */}
          <div className="flex-1 max-w-md mx-4 lg:mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:border-blue-500/50 focus:bg-gray-800/70 transition-all duration-200 text-gray-200 placeholder-gray-400 text-sm"
              />
            </div>
          </div>

          {/* Right side - Status and User menu */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Status indicator */}
            <div className="hidden lg:flex items-center space-x-2 px-2.5 py-1 bg-gray-800/50 rounded-full border border-gray-700/50">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-gray-300">Live</span>
            </div>
            
            {/* Auth section - Last item on the right */}
            {loading ? (
              <div className="flex items-center space-x-2 p-1.5">
                <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-gray-700 rounded animate-pulse"></div>
              </div>
            ) : user ? (
              <UserMenu />
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/auth/login"
                  className="flex items-center h-[44px] px-3 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/register"
                  className="flex items-center h-[44px] px-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <h1 className="text-base font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Agentic Design
              </h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              {loading ? (
                <div className="flex items-center space-x-2 p-1.5">
                  <div className="w-6 h-6 bg-gray-700 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-gray-700 rounded animate-pulse"></div>
                </div>
              ) : user ? (
                <UserMenu />
              ) : (
                <Link
                  href="/auth/login"
                  className="flex items-center h-[44px] px-2 text-xs font-medium text-blue-400 hover:text-blue-300"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};