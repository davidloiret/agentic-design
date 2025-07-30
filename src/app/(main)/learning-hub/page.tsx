'use client';

import { useAuth } from '@/contexts/AuthContext';
import { LearningHubJourney } from '../../components/LearningHubJourney';
import { AuthPromptPage } from '../../components/AuthPromptPage';

export default function LearningHubPage() {
  const { user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  // Show authentication prompt page if user is not authenticated
  if (!user) {
    return (
      <AuthPromptPage
        feature="Learning Hub"
        description="Master AI engineering through three comprehensive learning journeys"
      />
    );
  }

  // Show the actual Learning Hub content for authenticated users
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <LearningHubJourney />
    </div>
  );
}