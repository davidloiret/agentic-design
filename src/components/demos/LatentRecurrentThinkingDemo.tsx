import React, { useState, useEffect } from 'react';

interface LRTState {
  step: number;
  latentState: string;
  reasoning: string;
  confidence: number;
}

export const LatentRecurrentThinkingDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [states, setStates] = useState<LRTState[]>([]);
  
  const problem = "Optimize logistics network for 50 distribution centers";
  
  const lrtSteps: LRTState[] = [
    {
      step: 0,
      latentState: "Initial Encoding",
      reasoning: "Converting problem into 1024-dimensional latent vector z₀",
      confidence: 0.3
    },
    {
      step: 1,  
      latentState: "Constraint Mapping",
      reasoning: "Identifying constraints: capacity, distance, cost, time windows",
      confidence: 0.5
    },
    {
      step: 2,
      latentState: "Route Optimization", 
      reasoning: "Exploring optimal routing patterns in latent space",
      confidence: 0.7
    },
    {
      step: 3,
      latentState: "Risk Assessment",
      reasoning: "Incorporating demand uncertainty and supply chain risks",
      confidence: 0.85
    },
    {
      step: 4,
      latentState: "Final Solution",
      reasoning: "Hub-spoke model with 3 regional centers, 23% cost reduction",
      confidence: 0.95
    }
  ];

  useEffect(() => {
    if (isRunning && currentStep < lrtSteps.length) {
      const timer = setTimeout(() => {
        setStates(prev => [...prev, lrtSteps[currentStep]]);
        setCurrentStep(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (currentStep >= lrtSteps.length) {
      setIsRunning(false);
    }
  }, [isRunning, currentStep]);

  const handleStart = () => {
    setCurrentStep(0);
    setStates([]);
    setIsRunning(true);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setStates([]);
    setIsRunning(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Latent Recurrent Thinking Demo
      </h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Problem:</h3>
        <p className="text-gray-700 bg-gray-100 p-3 rounded">{problem}</p>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 disabled:opacity-50"
        >
          {isRunning ? 'Running...' : 'Start LRT Process'}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Reset
        </button>
      </div>

      <div className="space-y-4">
        {states.map((state, index) => (
          <div
            key={index}
            className="border border-violet-200 rounded-lg p-4 bg-gradient-to-r from-violet-50 to-purple-50"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-violet-800">
                Iteration {state.step}: {state.latentState}
              </h4>
              <div className="text-sm text-gray-600">
                Confidence: {(state.confidence * 100).toFixed(0)}%
              </div>
            </div>
            
            <div className="mb-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-violet-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${state.confidence * 100}%` }}
                />
              </div>
            </div>
            
            <p className="text-gray-700">{state.reasoning}</p>
            
            {state.step === 4 && (
              <div className="mt-4 p-3 bg-green-100 rounded border-l-4 border-green-500">
                <strong className="text-green-800">Solution Decoded:</strong>
                <p className="text-green-700 mt-1">
                  Optimal network design with minimal tokens generated, 60% less computation than traditional CoT reasoning.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {!isRunning && states.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Click "Start LRT Process" to see how Latent Recurrent Thinking works
        </div>
      )}

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Key Advantages:</h4>
        <ul className="text-blue-700 space-y-1 text-sm">
          <li>• No intermediate token generation (60% computation reduction)</li>
          <li>• Dynamic reasoning depth based on problem complexity</li>
          <li>• Parallel pathway exploration in latent space</li>
          <li>• Scales efficiently to trillion-parameter models</li>
        </ul>
      </div>
    </div>
  );
}; 