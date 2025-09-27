'use client';

import { useAuth } from '@/contexts/AuthContext';
import { SystemBuilder } from '@/app/components/SystemBuilder';
import { SystemBuilderAuthPrompt } from '@/app/components/SystemBuilderAuthPrompt';
import { UnderConstructionOverlay } from '@/app/components/UnderConstructionOverlay';
import { techniques } from '@/app/techniques';

const categories = [
  { id: 'reasoning', name: 'Reasoning', color: 'blue' },
  { id: 'memory', name: 'Memory', color: 'purple' },
  { id: 'orchestration', name: 'Orchestration', color: 'green' },
  { id: 'planning', name: 'Planning', color: 'orange' },
  { id: 'tool-use', name: 'Tool Use', color: 'red' },
  { id: 'security', name: 'Security', color: 'yellow' },
];

const useCases = [
  { id: 'web-app', name: 'Web Application', description: 'Build a scalable web application with frontend and backend' },
  { id: 'ml-pipeline', name: 'ML Pipeline', description: 'Create a machine learning data processing pipeline' },
  { id: 'microservices', name: 'Microservices', description: 'Design a distributed microservices architecture' },
  { id: 'chatbot', name: 'Chatbot System', description: 'Build an intelligent conversational AI system' },
];

export default function SystemBuilderPage() {
  const { user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show authentication prompt page if user is not authenticated
  if (!user) {
    return (
      <SystemBuilderAuthPrompt
        feature="System Builder"
        description="Design and architect agentic systems with our interactive builder tool"
      />
    );
  }

  // Flatten all techniques from all categories
  const allTechniques = Object.values(techniques).flat().map(technique => ({
    ...technique,
    icon: technique.icon || '🤖',
  }));

  return (
    <div className="min-h-screen bg-gray-950 relative">
      <UnderConstructionOverlay />
      <div className="filter blur-sm pointer-events-none">
        <SystemBuilder
          techniques={allTechniques}
          categories={categories}
          useCases={useCases}
        />
      </div>
    </div>
  );
}