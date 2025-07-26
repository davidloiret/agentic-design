import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import dynamic from 'next/dynamic';

interface RemotionPlayerProps {
  compositionId: string;
  className?: string;
  audioPath?: string;
}

const LoadingFallback = () => (
  <div className="bg-gray-900/50 rounded-xl border border-gray-700/30 flex items-center justify-center h-96">
    <div className="text-center">
      <Play className="w-12 h-12 mx-auto text-gray-500 mb-4 animate-pulse" />
      <div className="text-gray-400">Loading video explanation...</div>
    </div>
  </div>
);

const ErrorFallback = () => (
  <div className="bg-gray-900/50 rounded-xl border border-gray-700/30 p-6">
    <div className="text-center">
      <div className="text-orange-400 mb-2">📹</div>
      <h3 className="text-lg font-medium text-gray-300 mb-2">Video Player Unavailable</h3>
      <p className="text-gray-400 text-sm">
        The interactive video explanation is currently unavailable. 
        Please refer to the text explanation below.
      </p>
    </div>
  </div>
);

// Dynamic import with automatic timing configuration
const DynamicRemotionPlayerContent = dynamic(
  () => import('./DynamicRemotionPlayer'),
  {
    ssr: false,
    loading: () => <LoadingFallback />
  }
);

export const RemotionPlayer: React.FC<RemotionPlayerProps> = ({ 
  compositionId, 
  className,
  audioPath = '/audio/cot/' 
}) => {
  return (
    <div className={`bg-gray-900/50 rounded-xl border border-gray-700/30 overflow-hidden ${className}`}>
      <DynamicRemotionPlayerContent 
        compositionId={compositionId} 
        audioPath={audioPath}
      />
    </div>
  );
}; 