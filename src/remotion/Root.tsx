import React from 'react';
import { Composition } from 'remotion';
import { ChainOfThoughtVideo } from './compositions/ChainOfThoughtVideo';
import { ChainOfThoughtVideoWithAudio } from './compositions/ChainOfThoughtVideoWithAudio';
import { ChainOfThoughtVideoDebug } from './compositions/ChainOfThoughtVideoDebug';
import { ChainOfDebatesVideoWithAudio } from './compositions/ChainOfDebatesVideoWithAudio';
import { SequentialChainingVideoWithAudio } from './compositions/SequentialChainingVideoWithAudio';
import { ProfessionalSequentialChainingVideo } from './compositions/ProfessionalSequentialChainingVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ChainOfThought"
        component={ChainOfThoughtVideo}
        durationInFrames={450} // 15 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ChainOfThoughtWithAudio"
        component={ChainOfThoughtVideoWithAudio}
        durationInFrames={450} // 15 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ChainOfThoughtDebug"
        component={ChainOfThoughtVideoDebug}
        durationInFrames={200} // Shorter for testing
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ChainOfDebatesWithAudio"
        component={ChainOfDebatesVideoWithAudio}
        durationInFrames={2400} // 80 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="SequentialChainingWithAudio"
        component={SequentialChainingVideoWithAudio}
        durationInFrames={2000} // 66.7 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ProfessionalSequentialChaining"
        component={ProfessionalSequentialChainingVideo}
        durationInFrames={1515} // Auto-calculated duration from TTS script
        fps={30}
        width={1080} // Mobile portrait format (9:16 aspect ratio)
        height={1920}
      />
    </>
  );
}; 