export default function PatternsLayout({
  children,
  sidebar,
  content,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="mx-auto px-6 py-8 h-[calc(100vh-5rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full overflow-hidden">
          {sidebar}
          {content}
        </div>
      </div>
    </div>
  );
}