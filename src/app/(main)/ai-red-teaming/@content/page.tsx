import { Shield } from 'lucide-react';

export default function ContentPage() {
  return (
    <div className="lg:col-span-3 flex items-center justify-center">
      <div className="text-center text-gray-400">
        <Shield className="w-16 h-16 mx-auto mb-4 text-red-400" />
        <h3 className="text-xl font-semibold mb-2">Select a Red Teaming Category or Technique</h3>
        <p>Choose a security category or technique from the left to view detailed information, defensive strategies, and testing methodologies.</p>
      </div>
    </div>
  );
}