"use client";

import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";

export function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, email, logout, isLoading } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Koko's World
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium"
            >
              Home
            </Link>
            <Link
              href="/admin"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              Admin
            </Link>

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition"
            >
              {theme === "light" ? "☀️" : "🌙"}
            </button>

            {isAuthenticated && (
              <>
                <span className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                  {email}
                </span>
                <button
                  onClick={() => logout()}
                  disabled={isLoading}
                  className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
