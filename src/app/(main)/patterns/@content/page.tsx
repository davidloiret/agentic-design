import { Brain } from 'lucide-react';

export default function ContentPage() {
  return (
    <div className="lg:col-span-3 flex items-center justify-center">
      <div className="text-center text-gray-400">
        <Brain className="w-16 h-16 mx-auto mb-4 text-gray-600" />
        <h3 className="text-xl font-semibold mb-2">Select a Pattern or Technique</h3>
        <p>Choose a pattern or technique from the left to view detailed information, examples, and interactive demos.</p>
      </div>
    </div>
  );
}