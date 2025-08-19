export default function PromptOptimizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {children}
      </div>
    </div>
  );
}