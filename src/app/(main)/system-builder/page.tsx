'use client';

import { SystemBuilder } from '@/app/components/SystemBuilder';
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
  // Flatten all techniques from all categories
  const allTechniques = Object.values(techniques).flat().map(technique => ({
    ...technique,
    icon: technique.icon || '🤖',
  }));

  return (
    <div className="min-h-screen bg-gray-950">
      <SystemBuilder 
        techniques={allTechniques}
        categories={categories}
        useCases={useCases}
      />
    </div>
  );
}