"use client";

import React from "react";
import { Navigation } from "@/components/Navigation";
import { ArticleDisplay } from "@/components/ArticleDisplay";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { useParams } from "next/navigation";
import { downloadArticleAsText } from "@/lib/downloadArticle";

export default function ArticlePage() {
  const params = useParams() as { id?: string } | null;
  const id = params?.id;
  const { theme } = useTheme();

  const [article, setArticle] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!id) {
      setError("Invalid article id");
      setLoading(false);
      return;
    }

    let mounted = true;
    setLoading(true);
    fetch(`/api/articles/${id}`)
      .then(async (res) => {
        if (res.status === 404) throw new Error("Not found");
        if (!res.ok) throw new Error("Failed to fetch article");
        return res.json();
      })
      .then((data) => {
        if (mounted) setArticle(data);
      })
      .catch((err) => {
        setError(String(err));
      })
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <>
      <Navigation />
      <main className={theme === "dark" ? "min-h-screen bg-gray-900" : "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100"}>
        {loading ? (
          <div className="text-center py-12">
            <p className={theme === "dark" ? "text-gray-200" : "text-gray-600"}>Loading article…</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <div className="mt-4">
              <Link href="/" className="text-indigo-600">← Back to Articles</Link>
            </div>
          </div>
        ) : article ? (
          <>
            <ArticleDisplay article={article} />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex gap-4">
                <button
                  onClick={() => downloadArticleAsText(article.title, article.content, article.type)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                  title="Download as .txt file"
                >
                  ⬇ Download
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
                >
                  ← Back to Articles
                </Link>
              </div>
            </div>
          </>
        ) : null}
      </main>

      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>
            Website by Emily Lau • 2025 • Poem content and all text by Emily
            Lau 2018-2025
          </p>
        </div>
      </footer>
    </>
  );
}
