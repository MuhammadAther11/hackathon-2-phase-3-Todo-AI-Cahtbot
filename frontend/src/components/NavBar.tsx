"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut, CheckSquare, User, MessageCircle } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./theme/ThemeToggle";

export function NavBar() {
  const { data: session, isLoading } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700/50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <CheckSquare className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">TaskFlow</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/chat"
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                Chat
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {session ? (
              <>
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                  <User className="h-4 w-4" />
                  <span>{session.user?.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none transition duration-150 ease-in-out"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Sign out</span>
                  <span className="sm:hidden">Exit</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 px-3 py-2 rounded-md transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
