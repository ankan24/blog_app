"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors ${
        theme === "dark" ? "bg-gray-900" : "bg-gradient-to-br from-slate-50 to-slate-100"
      }`}
    >
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`absolute top-4 right-4 p-2 rounded-lg transition ${
          theme === "dark"
            ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
            : "bg-white text-gray-800 hover:bg-gray-100"
        }`}
        title="Toggle dark/light mode"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>

      <div className="w-full max-w-md px-4">
        <div
          className={`rounded-lg shadow-xl p-8 transition-colors ${
            theme === "dark"
              ? "bg-gray-800 border border-gray-700"
              : "bg-white"
          }`}
        >
          {/* Header */}
          <div className="mb-8">
            <Link href="/" className="block mb-6">
              <h1
                className={`text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-center`}
              >
                Koko's World
              </h1>
            </Link>
            <h2
              className={`text-center text-xl font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Admin Login
            </h2>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="emily@gmail.com"
                className={`w-full px-4 py-2 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                }`}
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full px-4 py-2 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                }`}
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-lg"
              } bg-gradient-to-r from-indigo-600 to-purple-600 text-white`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Demo Credentials */}
          <div
            className={`mt-6 p-4 rounded-lg ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <p
              className={`text-sm font-semibold mb-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Demo Credentials:
            </p>
            <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Email: emily@gmail.com
              <br />
              Password: emily123
            </p>
          </div>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className={`text-sm transition ${
                theme === "dark"
                  ? "text-indigo-400 hover:text-indigo-300"
                  : "text-indigo-600 hover:text-indigo-700"
              }`}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
