'use client';

import React from 'react';
import { MindMap } from '../MindMap';
import { categories } from '../categories';
import { techniques } from '../techniques';
import { useCases } from '../use-cases';
import { Technique } from '../techniques/types';

export default function MindMapPage() {
  const handleTechniqueSelect = (technique: any) => {
    // Handle technique selection (could navigate to technique detail page)
    console.log('Selected technique:', technique);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <MindMap
        techniques={techniques}
        categories={categories}
        useCases={useCases}
        onTechniqueSelect={handleTechniqueSelect}
      />
    </div>
  );
}