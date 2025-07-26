import React, { useState } from 'react';
import { Player } from '@remotion/player';
import { ChainOfThoughtVideo } from '../remotion/compositions/ChainOfThoughtVideo';
import { ChainOfThoughtVideoWithAudio } from '../remotion/compositions/ChainOfThoughtVideoWithAudio';

interface RemotionPlayerContentProps {
  compositionId: string;
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

const RemotionPlayerContent: React.FC<RemotionPlayerContentProps> = ({ compositionId }) => {
  const [hasError, setHasError] = useState(false);
  
  if (hasError) {
    return <ErrorFallback />;
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
          durationInFrames={2300}
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

export default RemotionPlayerContent; 