"use client";

import { Navigation } from "@/components/Navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";

const types = ["poem", "prose", "essay", "writing"] as const;

export default function Home() {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mainClass =
    theme === "dark"
      ? "min-h-screen bg-gray-900 py-12"
      : "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12";

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("/api/articles")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch articles");
        return res.json();
      })
      .then((data) => {
        if (mounted) setArticles(data || []);
      })
      .catch((err) => {
        setError(String(err));
      })
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, [isAuthenticated]);

  const filteredArticles =
    selectedType === "all"
      ? articles
      : articles.filter((a) => a.type === selectedType);

  return (
    <>
      <Navigation />
      <main className={mainClass}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Koko's World
            </h1>
            <p className={`text-xl mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-600"}`}>
              A collection of my poems, prose, essays, and writings
            </p>
            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              Poems about myself, the world as I see it, and the worlds that I've created and imagined.
            </p>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedType("all")}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedType === "all"
                  ? "bg-indigo-600 text-white"
                  : `bg-white text-gray-700 border border-gray-300 hover:border-indigo-600 ${theme === "dark" ? "dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600" : ""}`
              }`}
            >
              All ({articles.length})
            </button>
            {types.map((type) => {
              const count = articles.filter((a) => a.type === type).length;
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-6 py-2 rounded-full font-semibold transition capitalize ${
                    selectedType === type
                      ? "bg-indigo-600 text-white"
                      : `bg-white text-gray-700 border border-gray-300 hover:border-indigo-600 ${theme === "dark" ? "dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600" : ""}`
                  }`}
                >
                  {type} ({count})
                </button>
              );
            })}
          </div>

          {/* Articles Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className={`${theme === "dark" ? "text-gray-200" : "text-gray-600"}`}>Loading articles…</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard key={article._id || article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-500"} text-lg`}>No articles found in this category.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>
            Website by AG • 2025 • Poem content and all text by Koyel Mondal
          </p>
        </div>
      </footer>
    </>
  );
}
