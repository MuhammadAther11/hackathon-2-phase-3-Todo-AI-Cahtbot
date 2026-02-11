"use client";
import { AuthForm } from "@/components/AuthForm";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 dark:opacity-10 animate-blob" />
        <div className="absolute top-40 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 right-1/3 w-72 h-72 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 animate-fade-in-up">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 dark:bg-purple-500 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300 mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Create Account</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">Join us to start managing your tasks</p>
        </div>

        <Suspense fallback={
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin" />
          </div>
        }>
          <AuthForm type="signup" />
        </Suspense>
      </div>
    </main>
  );
}
