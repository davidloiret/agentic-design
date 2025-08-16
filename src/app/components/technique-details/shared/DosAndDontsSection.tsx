import React from 'react';

interface DoOrDont {
  type: string;
  text: string;
  icon?: string;
}

interface DosAndDontsSectionProps {
  items: DoOrDont[];
}

const DosAndDontsSection: React.FC<DosAndDontsSectionProps> = ({ items }) => {
  const dos = items.filter(item => item.type === 'do');
  const donts = items.filter(item => item.type === 'dont');

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">📋 Do's & Don'ts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          {dos.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 mb-2">
              <span>{item.icon || '✅'}</span>
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </div>
        <div>
          {donts.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 mb-2">
              <span>{item.icon || '❌'}</span>
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DosAndDontsSection;