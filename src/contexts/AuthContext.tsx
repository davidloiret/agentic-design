'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import { plausible } from '@/components/PlausibleAnalytics';

interface User {
  id: string; // Supabase ID
  userId?: string; // Local database ID
  email: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signInWithGoogle: () => void;
  signInWithGitHub: () => void;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    console.log('[AuthContext] Refreshing user...');
    try {
      const response = await api.get('/api/v1/auth/me');
      console.log('[AuthContext] /me response status:', response.status);
      
      // Handle 401 gracefully
      if (response.status === 401) {
        console.log('[AuthContext] User not authenticated (401)');
        setUser(null);
        setLoading(false);
        return;
      }
      
      const data = await response.json();
      console.log('[AuthContext] /me response data:', data);
      
      if (data && data.id) {
        console.log('[AuthContext] User authenticated:', data.email);
        setUser(data);
      } else {
        console.log('[AuthContext] No user data received');
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if user is logged in on mount
    refreshUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    const response = await api.post('/api/v1/auth/login', { email, password });
    const data = await response.json();
    setUser(data.user);
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await api.post('/api/v1/auth/register', { email, password, firstName, lastName });
    const data = await response.json();
    // Don't set user immediately - they need to validate their email first
    // setUser(data.user);
  };

  const signInWithGoogle = () => {
    // Track Google sign-in attempt
    plausible('Auth', { props: { action: 'google_signin' } });

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    console.log('[AuthContext] Signing in with Google...', backendUrl);
    window.location.href = `${backendUrl}/api/v1/auth/google`;
  };

  const signInWithGitHub = () => {
    // Track GitHub sign-in attempt
    plausible('Auth', { props: { action: 'github_signin' } });

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    window.location.href = `${backendUrl}/api/v1/auth/github`;
  };

  const signOut = async () => {
    // Track logout
    plausible('Auth', { props: { action: 'logout' } });

    await api.post('/api/v1/auth/logout', {});
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    const response = await api.post('/api/v1/auth/forgot-password', { email });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to send reset email');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithGoogle, signInWithGitHub, signOut, refreshUser, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};