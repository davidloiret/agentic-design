import React from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  Audio,
  Sequence,
  staticFile
} from 'remotion';

// Simple debug version to test audio loading
export const ChainOfThoughtVideoDebug: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Test just one audio file first
  const testAudioSrc = staticFile('audio/cot/cot-intro.wav');
  
  return (
    <AbsoluteFill style={{ 
      background: '#1a1a1a',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px'
    }}>
      <div style={{ color: 'white', fontSize: '24px', marginBottom: '20px' }}>
        Audio Debug Test
      </div>
      
      <div style={{ color: '#888', fontSize: '16px', marginBottom: '20px' }}>
        Frame: {frame}
      </div>
      
      <div style={{ color: '#888', fontSize: '14px', marginBottom: '40px' }}>
        Testing audio file: {testAudioSrc}
      </div>
      
      {/* Test single audio sequence */}
      <Sequence from={30} durationInFrames={120}>
        <Audio 
          src={testAudioSrc}
          volume={0.8}
        />
        <div style={{ 
          color: 'lime', 
          fontSize: '18px',
          textAlign: 'center'
        }}>
          🎵 Audio should be playing now
          <br />
          <small>Frames 30-150</small>
        </div>
      </Sequence>
      
      {frame < 30 && (
        <div style={{ color: '#666', fontSize: '16px' }}>
          Audio will start at frame 30...
        </div>
      )}
      
      {frame > 150 && (
        <div style={{ color: '#666', fontSize: '16px' }}>
          Audio test completed.
        </div>
      )}
    </AbsoluteFill>
  );
}; 