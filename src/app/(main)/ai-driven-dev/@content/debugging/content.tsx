"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DebuggingRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/ai-driven-dev/bug-hunting-production');
  }, [router]);
  
  return <div className="min-h-screen bg-gray-950 flex items-center justify-center">
    <p className="text-gray-400">Redirecting...</p>
  </div>;
}
