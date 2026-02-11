"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { CheckCircle2, Zap, Shield, Smartphone, MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

export default function HomePage() {
  const { data: session, isLoading } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">TaskFlow</span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {!isLoading && session ? (
                <Link href="/dashboard" className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/login" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                    Login
                  </Link>
                  <Link href="/signup" className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-300 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 dark:opacity-10 animate-blob" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000" />
      </div>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
              <span className="text-gray-900 dark:text-white">Manage Tasks </span>
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Effortlessly
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              TaskFlow helps you organize, prioritize, and complete your tasks with AI-powered natural language commands. Just chat and get things done.
            </p>
            <div className="flex flex-wrap gap-4">
              {!isLoading && !session && (
                <>
                  <Link href="/signup" className="group px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all font-semibold shadow-lg shadow-indigo-600/25 dark:shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-600/30 flex items-center gap-2">
                    Get Started Free
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/login" className="px-6 py-3 border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-all font-semibold">
                    Sign In
                  </Link>
                </>
              )}
              {session && (
                <Link href="/dashboard" className="group px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all font-semibold shadow-lg shadow-indigo-600/25 flex items-center gap-2">
                  Open Dashboard
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </motion.div>

          {/* Hero illustration - animated task checklist */}
          <motion.div
            className="hidden md:block"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 rounded-2xl p-8 text-white shadow-2xl shadow-indigo-600/20 dark:shadow-indigo-500/10">
              <div className="space-y-4">
                {[
                  { text: "Create and organize tasks", delay: 0 },
                  { text: "Chat with AI to manage todos", delay: 0.1 },
                  { text: "Track progress in real-time", delay: 0.2 },
                  { text: "Never miss a deadline", delay: 0.3 },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center space-x-3 bg-white/10 rounded-lg px-4 py-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + item.delay }}
                  >
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2 text-white/70 text-xs">
                <MessageCircle className="h-4 w-4" />
                <span>Powered by AI natural language processing</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          {[
            {
              icon: Zap,
              title: "Quick & Easy",
              description: "Create tasks in seconds. Intuitive interface designed for productivity.",
              gradient: "from-amber-400 to-orange-500",
            },
            {
              icon: Shield,
              title: "Secure",
              description: "Your data is encrypted and protected. Only you can access your tasks.",
              gradient: "from-emerald-400 to-teal-500",
            },
            {
              icon: Smartphone,
              title: "Responsive",
              description: "Works perfectly on desktop, tablet, and mobile devices.",
              gradient: "from-violet-400 to-purple-500",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="group bg-white dark:bg-gray-800/50 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700/50 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800 transition-all hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-5`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-24 py-16 bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to boost your productivity?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
            Start managing your tasks with AI today. It&apos;s free and takes less than a minute.
          </p>
          {!isLoading && !session && (
            <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all font-semibold text-lg shadow-lg shadow-indigo-600/25 hover:shadow-xl hover:shadow-indigo-600/30">
              Create Free Account
              <ArrowRight className="h-5 w-5" />
            </Link>
          )}
          {session && (
            <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all font-semibold text-lg shadow-lg shadow-indigo-600/25 hover:shadow-xl hover:shadow-indigo-600/30">
              Go to Dashboard
              <ArrowRight className="h-5 w-5" />
            </Link>
          )}
        </motion.div>
      </main>
    </div>
  );
}
