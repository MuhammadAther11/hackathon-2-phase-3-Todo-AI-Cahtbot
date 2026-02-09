'use client';

import { useSession } from "@/lib/auth-client"; 
import { ChatInterface } from '@/components/chat/ChatInterface';
import { TaskDashboard } from '@/components/TaskDashboard';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ChatPage() {
  // 1. Add mounted state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  const { data: session, isLoading } = useSession();
  const router = useRouter();

  // 2. Set mounted to true once we reach the client
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only redirect if we are mounted and definitely not loading
    if (mounted && !isLoading && !session?.user) {
      router.push('/login');
    }
  }, [session, isLoading, router, mounted]);

  // 3. Keep the UI consistent during the Server-side pass
  if (!mounted || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Final check to ensure session exists before rendering children
  if (!session?.user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-1">
          {/* Passing the validated user ID */}
          <ChatInterface userId={session.user.id} />
        </div>
        <div className="lg:col-span-1">
          <TaskDashboard />
        </div>
      </div>
    </div>
  );
}