'use client';

import { useSession } from "@/lib/auth-client";
import { ChatInterface } from '@/components/chat/ChatInterface';
import { TaskDashboard } from '@/components/TaskDashboard';
import { NavBar } from '@/components/NavBar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function ChatPage() {
  const [mounted, setMounted] = useState(false);
  const { data: session, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && !session?.user) {
      router.push('/login');
    }
  }, [session, isLoading, router, mounted]);

  if (!mounted || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#0a0a1a] auth-gradient-mesh">
        <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center">
          <Loader2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400 animate-spin" />
        </div>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 font-medium">Loading chat...</p>
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a1a] auth-gradient-mesh noise-overlay transition-colors">
      <NavBar />
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
              AI Chat
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage tasks with natural language commands
            </p>
          </motion.div>

          {/* Two-panel layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Chat panel - takes more space */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <ChatInterface userId={session.user.id} className="h-[calc(100vh-220px)] sm:h-[calc(100vh-240px)]" />
            </motion.div>

            {/* Task panel - sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="glass-card rounded-2xl p-5 h-[calc(100vh-220px)] sm:h-[calc(100vh-240px)] overflow-y-auto auth-scrollbar">
                <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-200/60 dark:border-white/[0.06]">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h2 className="text-sm font-display font-semibold text-gray-900 dark:text-white">Your Tasks</h2>
                </div>
                <TaskDashboard />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
