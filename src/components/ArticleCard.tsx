"use client";

import Link from "next/link";
import { Article } from "@/types/article";
import { useTheme } from "@/contexts/ThemeContext";

interface ArticleCardProps {
  article: Article;
}

const typeColors: Record<Article["type"], string> = {
  poem: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  prose: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  essay: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  writing: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
};

export function ArticleCard({ article }: ArticleCardProps) {
  const { theme } = useTheme();

  const id = (article as any)._id || (article as any).id;

  return (
    <Link href={`/articles/${id}`}>
      <div className={`rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full cursor-pointer transform hover:-translate-y-1 ${theme === "dark" ? "bg-gray-800 text-white border border-gray-700" : "bg-white"}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${typeColors[article.type]}`}
            >
              {article.type}
            </span>
            {article.featured && (
              <span className="text-yellow-400 text-xl">⭐</span>
            )}
          </div>
          <h2 className={`text-xl font-bold mb-2 line-clamp-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            {article.title}
          </h2>
          <p className={`text-sm mb-4 line-clamp-3 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              {new Date(article.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className={`font-semibold text-sm ${theme === "dark" ? "text-indigo-300" : "text-indigo-600"}`}>
              Read more →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
