'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  UserCircle,
  CreditCard,
  Bell,
  HelpCircle
} from 'lucide-react';

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  const { user, signOut } = useAuth();
  const router = useRouter();

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update dropdown position
  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updateDropdownPosition();
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/auth/login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const getInitials = () => {
    if (!user) return 'U';
    const firstInitial = user.firstName?.[0] || '';
    const lastInitial = user.lastName?.[0] || '';
    return (firstInitial + lastInitial).toUpperCase() || user.email[0].toUpperCase();
  };

  const getDisplayName = () => {
    if (!user) return 'User';
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.email;
  };

  return (
    <div className="relative">
      {/* Avatar Button */}
      <button
        ref={buttonRef}
        onClick={() => {
          if (!isOpen) {
            updateDropdownPosition();
          }
          setIsOpen(!isOpen);
        }}
        className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-800/50 transition-colors duration-200 group cursor-pointer"
        aria-label="User menu"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
          {getInitials()}
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {mounted && isOpen && createPortal(
        <div 
          ref={dropdownRef}
          className="fixed w-64 bg-gray-900 border border-gray-700/50 rounded-lg shadow-xl overflow-hidden z-[9999] transition-opacity duration-150"
          style={{ 
            top: `${dropdownPosition.top}px`, 
            right: `${dropdownPosition.right}px`,
            opacity: dropdownPosition.top > 0 ? 1 : 0,
            pointerEvents: dropdownPosition.top > 0 ? 'auto' : 'none'
          }}
        >
          {/* User Info Section */}
          <div className="px-4 py-3 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {getInitials()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-200 truncate">
                  {getDisplayName()}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link
              href="/profile"
              className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors duration-150"
              onClick={() => setIsOpen(false)}
            >
              <UserCircle className="w-4 h-4" />
              <span>Your Profile</span>
            </Link>
            
            <Link
              href="/settings"
              className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors duration-150"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>

            <Link
              href="/billing"
              className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors duration-150"
              onClick={() => setIsOpen(false)}
            >
              <CreditCard className="w-4 h-4" />
              <span>Billing</span>
            </Link>

            <Link
              href="/notifications"
              className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors duration-150"
              onClick={() => setIsOpen(false)}
            >
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </Link>

            <div className="border-t border-gray-700/50 my-1"></div>

            <Link
              href="/help"
              className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors duration-150"
              onClick={() => setIsOpen(false)}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Help & Support</span>
            </Link>

            <div className="border-t border-gray-700/50 my-1"></div>

            <button
              onClick={handleSignOut}
              className="cursor-pointer flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-red-400 transition-colors duration-150 w-full text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};