import React from 'react';

interface UsageGuideSectionProps {
  useWhen: string[];
  avoidWhen: string[];
}

const UsageGuideSection: React.FC<UsageGuideSectionProps> = ({
  useWhen,
  avoidWhen
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">🚦 When to Use</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-900/20 p-4 rounded-lg border border-green-800/30">
          <h4 className="font-medium text-green-300 mb-2">Use When</h4>
          <ul className="text-sm space-y-1 text-gray-300">
            {useWhen.map((item, idx) => (
              <li key={idx}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="bg-red-900/20 p-4 rounded-lg border border-red-800/30">
          <h4 className="font-medium text-red-300 mb-2">Avoid When</h4>
          <ul className="text-sm space-y-1 text-gray-300">
            {avoidWhen.map((item, idx) => (
              <li key={idx}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UsageGuideSection;