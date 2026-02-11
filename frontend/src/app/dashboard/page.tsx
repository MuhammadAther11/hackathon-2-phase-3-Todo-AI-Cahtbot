"use client";
import { TaskDashboard } from "@/components/TaskDashboard";
import { NavBar } from "@/components/NavBar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden transition-colors">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-20 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 dark:opacity-5 animate-blob" />
        <div className="absolute top-1/2 -left-20 w-96 h-96 bg-indigo-200 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 dark:opacity-5 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 right-1/3 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 dark:opacity-5 animate-blob animation-delay-4000" />
      </div>

      <NavBar />
      <main className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-12 animate-fade-in-down">
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent tracking-tight">
                Your Dashboard
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Keep track of your projects and daily goals. Stay organized and productive.
              </p>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-4 rounded-xl border border-white/20 dark:border-gray-700/30 transform hover:scale-105 transition-transform duration-300 animate-fade-in-up">
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Tasks Created</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">&mdash;</p>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-4 rounded-xl border border-white/20 dark:border-gray-700/30 transform hover:scale-105 transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">&mdash;</p>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-4 rounded-xl border border-white/20 dark:border-gray-700/30 transform hover:scale-105 transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">In Progress</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mt-1">&mdash;</p>
              </div>
            </div>
          </header>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <TaskDashboard />
          </div>
        </div>
      </main>
    </div>
  );
}
