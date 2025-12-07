export interface Article {
  _id?: string;
  id?: string;
  title: string;
  type: "poem" | "prose" | "essay" | "writing";
  content: string;
  excerpt: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  featured?: boolean;
}

export interface ArticleFormData {
  title: string;
  type: "poem" | "prose" | "essay" | "writing";
  content: string;
  excerpt: string;
}
