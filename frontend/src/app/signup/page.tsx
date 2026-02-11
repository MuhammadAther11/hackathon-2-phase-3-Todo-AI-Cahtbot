"use client";
import { AuthForm } from "@/components/AuthForm";
import { Suspense } from "react";
import { motion } from "framer-motion";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row-reverse relative overflow-hidden auth-gradient-mesh noise-overlay transition-colors">
      {/* Right branding panel - hidden on mobile, visible on lg+ */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center bg-gradient-to-bl from-emerald-500 via-teal-600 to-indigo-600 dark:from-emerald-900 dark:via-teal-900 dark:to-indigo-900 overflow-hidden">
        {/* Animated geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[15%] right-[10%] w-28 h-28 border-2 border-white/20 rounded-full animate-float" />
          <div className="absolute top-[55%] right-[20%] w-24 h-24 border-2 border-white/15 rounded-2xl animate-float-delayed rotate-45" />
          <div className="absolute top-[25%] left-[10%] w-20 h-20 border-2 border-white/10 rounded-lg animate-float-slow rotate-12" />
          <div className="absolute bottom-[25%] left-[15%] w-16 h-16 bg-white/10 rounded-full animate-float" />
          <div className="absolute top-[40%] right-[40%] w-36 h-36 border border-white/10 rounded-2xl animate-rotate-slow rotate-45" />
          <div className="absolute bottom-[15%] right-[25%] w-32 h-32 bg-white/5 animate-morph" />
        </div>

        {/* Branding content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 px-12 max-w-lg"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <span className="text-white/90 font-display text-xl font-bold tracking-tight">TaskFlow</span>
          </div>

          <h2 className="text-4xl xl:text-5xl font-display font-bold text-white leading-tight mb-6">
            Start your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-emerald-200">
              productivity journey
            </span>
          </h2>

          <p className="text-white/70 text-lg leading-relaxed mb-10">
            Join thousands who organize their lives through conversation. Set up in seconds, benefit forever.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3">
            {["Free to Start", "No Credit Card", "Instant Setup"].map((feature, i) => (
              <motion.span
                key={feature}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium border border-white/10"
              >
                {feature}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Left form panel */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        {/* Mobile branding - visible on small screens only */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:hidden mb-8 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-emerald-600 dark:bg-emerald-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <span className="font-display text-xl font-bold text-gray-900 dark:text-white">TaskFlow</span>
          </div>
        </motion.div>

        <div className="w-full max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
              Create account
            </h1>
            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Get started with your free account today
            </p>
          </motion.div>

          <Suspense fallback={
            <div className="flex justify-center items-center py-12">
              <div className="w-10 h-10 border-4 border-emerald-100 dark:border-emerald-900 border-t-emerald-600 dark:border-t-emerald-400 rounded-full animate-spin" />
            </div>
          }>
            <AuthForm type="signup" />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
