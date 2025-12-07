import { Article } from "@/types/article";

// This is a mock database - in production, you'd use a real database
const ARTICLES: Article[] = [
  {
    id: "1",
    title: "I am total lost, heehee",
    type: "poem",
    excerpt: "There is a garden gnome in my stomach...",
    content: `There is a garden gnome
in my stomach
taking a pair of shears
up to the vines
He keeps a hut
made of thick sticks
with straw pushed into the walls
that keeps falling out
The garden gnome comes home
and is livid
He throws rocks
hurls them at the sky
They tumble down
shattering to dust
This happens almost every day
Why doesn't the garden gnome use
something else to build
his home`,
    createdAt: "2019-01-15",
    updatedAt: "2019-01-15",
    featured: true,
  },
  {
    id: "2",
    title: "Churning (Paper White)",
    type: "poem",
    excerpt: "A piece about introspection and change...",
    content: `This is a placeholder for the full content of Churning (Paper White).
You can edit this content from the admin dashboard.`,
    createdAt: "2020-06-10",
    updatedAt: "2020-06-10",
  },
  {
    id: "3",
    title: "Downtown Train",
    type: "poem",
    excerpt: "Urban poetry piece...",
    content: `This is a placeholder for the full content of Downtown Train.
You can edit this content from the admin dashboard.`,
    createdAt: "2019-11-20",
    updatedAt: "2019-11-20",
  },
  {
    id: "4",
    title: "Cardiovascular",
    type: "prose",
    excerpt: "A prose piece exploring emotions...",
    content: `This is a placeholder for the full content of Cardiovascular.
You can edit this content from the admin dashboard.`,
    createdAt: "2021-03-15",
    updatedAt: "2021-03-15",
  },
];

export class ArticleService {
  static getAll(): Article[] {
    return ARTICLES.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  static getById(id: string): Article | undefined {
    return ARTICLES.find((article) => article.id === id);
  }

  static getByType(type: Article["type"]): Article[] {
    return ARTICLES.filter((article) => article.type === type).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  static create(article: Omit<Article, "id" | "createdAt" | "updatedAt">): Article {
    const newArticle: Article = {
      ...article,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };
    ARTICLES.push(newArticle);
    return newArticle;
  }

  static update(id: string, updates: Partial<Article>): Article | undefined {
    const index = ARTICLES.findIndex((article) => article.id === id);
    if (index === -1) return undefined;

    ARTICLES[index] = {
      ...ARTICLES[index],
      ...updates,
      updatedAt: new Date().toISOString().split("T")[0],
    };
    return ARTICLES[index];
  }

  static delete(id: string): boolean {
    const index = ARTICLES.findIndex((article) => article.id === id);
    if (index === -1) return false;
    ARTICLES.splice(index, 1);
    return true;
  }
}
