"use client";

import { Article } from "@/types/article";
import { useTheme } from "@/contexts/ThemeContext";

interface ArticleDisplayProps {
  article: Article;
}

const typeColors: Record<Article["type"], string> = {
  poem: "from-blue-500 to-blue-600",
  prose: "from-purple-500 to-purple-600",
  essay: "from-green-500 to-green-600",
  writing: "from-orange-500 to-orange-600",
};

export function ArticleDisplay({ article }: ArticleDisplayProps) {
  const { theme } = useTheme();

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div
        className={`bg-gradient-to-r ${typeColors[article.type]} rounded-lg p-8 mb-8 ${theme === "dark" ? "dark:from-gray-800 dark:to-gray-900" : ""}`}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="inline-block px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-semibold">
            {article.type}
          </span>
          {article.featured && <span className="text-3xl">⭐</span>}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">{article.title}</h1>
        <p className="text-white text-opacity-90">
          Published on{" "}
          {new Date(article.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className={`rounded-lg shadow-md p-8 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <div className={`whitespace-pre-wrap leading-relaxed font-serif text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            {article.content}
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} text-sm`}>
          {article.updatedAt !== article.createdAt &&
            `Last updated on ${new Date(article.updatedAt).toLocaleDateString()}`}
        </p>
      </div>
    </article>
  );
}
