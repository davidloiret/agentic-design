'use client';

import React from 'react';
import { RemotionPlayer } from '../../../components/RemotionPlayer';

interface VideoExplanationSectionProps {
  techniqueId: string;
}

const videoMapping = {
  'cot': {
    compositionId: "ChainOfThoughtWithAudio",
    audioPath: "/audio/cot/"
  },
  'sequential-chaining': {
    compositionId: "ProfessionalSequentialChaining",
    audioPath: "/audio/sequential-chaining/"
  }
};

export const VideoExplanationSection: React.FC<VideoExplanationSectionProps> = ({ techniqueId }) => {
  const videoConfig = videoMapping[techniqueId as keyof typeof videoMapping];
  
  if (!videoConfig) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
        Video Explanation
      </h2>
      <div className="mb-8">
        <RemotionPlayer 
          key={techniqueId}
          compositionId={videoConfig.compositionId}
          className="w-full"
          audioPath={videoConfig.audioPath}
        />
      </div>
    </section>
  );
};

export default VideoExplanationSection;