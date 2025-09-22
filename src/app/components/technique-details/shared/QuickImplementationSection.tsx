import React from 'react';

interface ImplementationStep {
  num: string;
  action: string;
  detail: string;
}

interface QuickImplementationSectionProps {
  steps: ImplementationStep[];
  example?: string;
}

const QuickImplementationSection: React.FC<QuickImplementationSectionProps> = ({
  steps,
  example
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">⚡ Quick Implementation</h3>
      <div className="space-y-2">
        {steps.map((step) => (
          <div key={step.num} className="flex items-center gap-3">
            <span className="font-mono bg-blue-900 text-blue-200 px-2 py-1 rounded text-sm">
              {step.num}
            </span>
            <span className="font-medium text-gray-200">{step.action}:</span>
            <span className="text-gray-400">{step.detail}</span>
          </div>
        ))}
      </div>
      {example && (
        <div className="mt-3 p-3 bg-gray-800 rounded font-mono text-sm text-gray-300">
          Example: {example}
        </div>
      )}
    </div>
  );
};

export default QuickImplementationSection;