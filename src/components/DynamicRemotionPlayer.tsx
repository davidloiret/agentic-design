import React, { useState, useEffect } from 'react';
import { Player } from '@remotion/player';
import { ChainOfThoughtVideo } from '../remotion/compositions/ChainOfThoughtVideo';
import { ChainOfThoughtVideoWithAudio } from '../remotion/compositions/ChainOfThoughtVideoWithAudio';
import DynamicTimingService from '../remotion/services/DynamicTimingService';

interface DynamicRemotionPlayerProps {
  compositionId: string;
  audioPath?: string;
}

const ErrorFallback = () => (
  <div className="p-6">
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

const DynamicRemotionPlayer: React.FC<DynamicRemotionPlayerProps> = ({ 
  compositionId, 
  audioPath = '/audio/cot/' 
}) => {
  const [hasError, setHasError] = useState(false);
  const [duration, setDuration] = useState(900); // Default fallback
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadDynamicTiming = async () => {
      try {
        const timingService = DynamicTimingService.getInstance();
        await timingService.loadTimingConfig(audioPath);
        const totalFrames = timingService.getTotalFrames();
        
        setDuration(totalFrames);
        setIsLoading(false);
        
        console.log(`📐 Dynamic video duration: ${totalFrames} frames (${(totalFrames/30).toFixed(2)}s)`);
      } catch (error) {
        console.warn('Could not load dynamic timing, using fallback duration:', error);
        setDuration(900); // Fallback
        setIsLoading(false);
      }
    };
    
    loadDynamicTiming();
  }, [audioPath]);
  
  if (hasError) {
    return <ErrorFallback />;
  }
  
  if (isLoading) {
    return (
      <div className="bg-gray-900/50 rounded-xl border border-gray-700/30 flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-gray-400">Loading dynamic timing...</div>
        </div>
      </div>
    );
  }
  
  const getComponent = () => {
    switch (compositionId) {
      case 'ChainOfThought':
        return ChainOfThoughtVideo;
      case 'ChainOfThoughtWithAudio':
        return ChainOfThoughtVideoWithAudio;
      default:
        return ChainOfThoughtVideoWithAudio; // Default to audio version
    }
  };
  
  try {
    return (
      <div style={{ aspectRatio: '16/9' }}>
        <Player
          component={getComponent()}
          durationInFrames={duration}
          compositionWidth={1920}
          compositionHeight={1080}
          fps={30}
          style={{
            width: '100%',
            height: '100%',
          }}
          controls
          autoPlay={false}
          loop={false}
        />
      </div>
    );
  } catch (error) {
    console.error('Remotion Player Error:', error);
    setHasError(true);
    return <ErrorFallback />;
  }
};

export default DynamicRemotionPlayer; 