import React from 'react';

interface TopUseCasesSectionProps {
  useCases: string[];
}

const TopUseCasesSection: React.FC<TopUseCasesSectionProps> = ({ useCases }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">💡 Top Use Cases</h3>
      <div className="space-y-2">
        {useCases.map((useCase, idx) => (
          <div key={idx} className="text-sm p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
            {useCase}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopUseCasesSection;