"use client";

import { Navigation } from "@/components/Navigation";
import { ArticleForm } from "@/components/ArticleForm";
import { ArticleFormData } from "@/types/article";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function CreateArticlePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  const handleSubmit = async (data: ArticleFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to create article");
      router.push("/admin");
    } catch (error) {
      console.error("Error creating article:", error);
      alert("Failed to create article");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <main className={theme === "dark" ? "min-h-screen bg-gray-900 py-12" : "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12"}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/admin"
              className={theme === "dark" ? "text-indigo-300 hover:text-indigo-200 font-semibold" : "text-indigo-600 hover:text-indigo-700 font-semibold"}
            >
              ← Back to Admin
            </Link>
          </div>

          <div className={theme === "dark" ? "bg-gray-800 rounded-lg shadow-md p-8" : "bg-white rounded-lg shadow-md p-8"}>
            <h1 className={theme === "dark" ? "text-3xl font-bold text-gray-100 mb-8" : "text-3xl font-bold text-gray-900 mb-8"}>
              Create New Article
            </h1>
            <ArticleForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>Admin Dashboard</p>
        </div>
      </footer>
    </>
  );
}
