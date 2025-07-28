'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '@/lib/api-client';

interface User {
  id: string;
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
      console.error('[AuthContext] Error refreshing user:', error);
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
    setUser(data.user);
  };

  const signInWithGoogle = () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    window.location.href = `${backendUrl}/api/v1/auth/google`;
  };

  const signInWithGitHub = () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    window.location.href = `${backendUrl}/api/v1/auth/github`;
  };

  const signOut = async () => {
    await api.post('/api/v1/auth/logout', {});
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithGoogle, signInWithGitHub, signOut, refreshUser }}>
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