import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prompt Optimizer | Agentic Design',
  description: 'Optimize your AI prompts using DSPy and advanced optimization techniques to improve performance, accuracy, and consistency',
};

export default function PromptOptimizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {children}
    </div>
  );
}