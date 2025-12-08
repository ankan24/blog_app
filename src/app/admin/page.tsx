"use client";

import { Navigation } from "@/components/Navigation";
import { Article } from "@/types/article";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { downloadArticleAsText } from "@/lib/downloadArticle";

export default function AdminPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();

  const [articles, setArticles] = useState<Article[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
      return;
    }

    let mounted = true;
    setLoading(true);
    fetch("/api/articles", { credentials: "include" })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch articles");
        return res.json();
      })
      .then((data) => {
        if (mounted) setArticles(data || []);
      })
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, [isAuthenticated, authLoading, router]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete");
      // refresh list
      const dataRes = await fetch("/api/articles", { credentials: "include" });
      const data = await dataRes.json();
      setArticles(data || []);
      setDeleteConfirm(null);
    } catch (err) {
      alert("Failed to delete article");
    }
  };

  const typeColors: Record<Article["type"], string> = {
    poem: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    prose: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    essay: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    writing: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  };

  return (
    <>
      <Navigation />
      <main className={theme === "dark" ? "min-h-screen bg-gray-900 py-12" : "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12"}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className={theme === "dark" ? "text-4xl font-bold text-gray-100" : "text-4xl font-bold text-gray-900"}>Admin Dashboard</h1>
            <Link
              href="/admin/create"
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              + New Article
            </Link>
          </div>

          {/* Articles List */}
          {loading ? (
            <div className="text-center py-12">
              <p className={theme === "dark" ? "text-gray-200" : "text-gray-600"}>Loading articles…</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : articles.length > 0 ? (
            <div className={theme === "dark" ? "bg-gray-800 rounded-lg shadow-md overflow-hidden" : "bg-white rounded-lg shadow-md overflow-hidden"}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={theme === "dark" ? "bg-gray-700 border-b" : "bg-gray-50 border-b"}>
                    <tr>
                      <th className={theme === "dark" ? "px-6 py-3 text-left text-sm font-semibold text-gray-100" : "px-6 py-3 text-left text-sm font-semibold text-gray-900"}>
                        Title
                      </th>
                      <th className={theme === "dark" ? "px-6 py-3 text-left text-sm font-semibold text-gray-100" : "px-6 py-3 text-left text-sm font-semibold text-gray-900"}>
                        Type
                      </th>
                      <th className={theme === "dark" ? "px-6 py-3 text-left text-sm font-semibold text-gray-100" : "px-6 py-3 text-left text-sm font-semibold text-gray-900"}>
                        Created
                      </th>
                      <th className={theme === "dark" ? "px-6 py-3 text-left text-sm font-semibold text-gray-100" : "px-6 py-3 text-left text-sm font-semibold text-gray-900"}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map((article) => (
                      <tr key={(article as any)._id || (article as any).id} className={theme === "dark" ? "border-b hover:bg-gray-900" : "border-b hover:bg-gray-50"}>
                        <td className="px-6 py-4">
                          <p className={theme === "dark" ? "font-medium text-gray-100" : "font-medium text-gray-900"}>
                            {article.title}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${typeColors[article.type]}`}
                          >
                            {article.type}
                          </span>
                        </td>
                        <td className={theme === "dark" ? "px-6 py-4 text-sm text-gray-300" : "px-6 py-4 text-sm text-gray-600"}>
                          {new Date(article.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Link
                              href={`/admin/edit/${(article as any)._id || (article as any).id}`}
                              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => downloadArticleAsText(article.title, article.content, article.type)}
                              className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition"
                              title="Download as .txt file"
                            >
                              Download
                            </button>
                            {deleteConfirm === ((article as any)._id || (article as any).id) ? (
                              <>
                                <button
                                  onClick={() => handleDelete((article as any)._id || (article as any).id)}
                                  className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(null)}
                                  className="px-4 py-2 bg-gray-400 text-white text-sm font-medium rounded hover:bg-gray-500 transition"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirm((article as any)._id || (article as any).id)}
                                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className={theme === "dark" ? "text-center py-12 bg-gray-800 rounded-lg" : "text-center py-12 bg-white rounded-lg"}>
              <p className={theme === "dark" ? "text-gray-300 text-lg mb-4" : "text-gray-500 text-lg mb-4"}>No articles yet.</p>
              <Link
                href="/admin/create"
                className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
              >
                Create Your First Article
              </Link>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>Admin Dashboard - Manage your articles here</p>
        </div>
      </footer>
    </>
  );
}
