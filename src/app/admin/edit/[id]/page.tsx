"use client";

import React from "react";
import { Navigation } from "@/components/Navigation";
import { ArticleForm } from "@/components/ArticleForm";
import { ArticleFormData } from "@/types/article";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useParams } from "next/navigation";

export default function EditArticlePage() {
  const params = useParams() as { id?: string } | null;
  const id = params?.id;
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { theme } = useTheme();

  const [article, setArticle] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingArticle, setLoadingArticle] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!id) {
      setError("Invalid article id");
      setLoadingArticle(false);
      return;
    }

    let mounted = true;
    setLoadingArticle(true);
    fetch(`/api/articles/${id}`, { credentials: "include" })
      .then(async (res) => {
        if (res.status === 404) throw new Error("Not found");
        if (!res.ok) throw new Error("Failed to fetch article");
        return res.json();
      })
      .then((data) => {
        if (mounted) setArticle(data);
      })
      .catch((err) => setError(String(err)))
      .finally(() => setLoadingArticle(false));

    return () => { mounted = false; };
  }, [id, isAuthenticated, authLoading, router]);

  const handleSubmit = async (data: ArticleFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update article");
      router.push("/admin");
    } catch (error) {
      console.error("Error updating article:", error);
      alert("Failed to update article");
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingArticle) {
    return (
      <>
        <Navigation />
        <main className={theme === "dark" ? "min-h-screen bg-gray-900" : "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100"}>
          <div className="text-center py-12">
            <p className={theme === "dark" ? "text-gray-200" : "text-gray-600"}>Loading article…</p>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navigation />
        <main className={theme === "dark" ? "min-h-screen bg-gray-900" : "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100"}>
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <Link href="/admin" className="text-indigo-600">← Back to Admin</Link>
          </div>
        </main>
      </>
    );
  }

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
              Edit Article
            </h1>
            {article && (
              <ArticleForm
                onSubmit={handleSubmit}
                initialData={article}
                isLoading={isLoading}
              />
            )}
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
