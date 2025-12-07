"use client";

import { useState } from "react";
import { ArticleFormData, Article } from "@/types/article";
import { useTheme } from "@/contexts/ThemeContext";

interface ArticleFormProps {
  onSubmit: (data: ArticleFormData) => void;
  initialData?: Article;
  isLoading?: boolean;
}

export function ArticleForm({
  onSubmit,
  initialData,
  isLoading,
}: ArticleFormProps) {
  const { theme } = useTheme();

  const [formData, setFormData] = useState<ArticleFormData>({
    title: initialData?.title || "",
    type: initialData?.type || "poem",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.excerpt) {
      alert("Please fill in all required fields");
      return;
    }
    onSubmit(formData);
  };

  const labelClass = theme === "dark" ? "block text-sm font-medium text-gray-200 mb-2" : "block text-sm font-medium text-gray-700 mb-2";
  const inputClass = `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"}`;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className={labelClass}
          >
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={inputClass}
            placeholder="Enter article title"
          />
        </div>

        <div>
          <label
            htmlFor="type"
            className={labelClass}
          >
            Type *
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="poem">Poem</option>
            <option value="prose">Prose</option>
            <option value="essay">Essay</option>
            <option value="writing">Writing</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="excerpt"
            className={labelClass}
          >
            Excerpt *
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows={2}
            className={inputClass}
            placeholder="Short preview of your article"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className={labelClass}
          >
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={12}
            className={`${inputClass} font-mono text-sm`}
            placeholder="Write your article content here..."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed ${theme === "dark" ? "dark:bg-indigo-500" : ""}`}
        >
          {isLoading ? "Saving..." : initialData ? "Update Article" : "Create Article"}
        </button>
      </div>
    </form>
  );
}
