import type { Category } from "../category/entity.js";

export interface NewPost {
  title: string;
  content: string;
  author: string;
  categoryId: number;
}

export interface Post extends NewPost {
  id: number;
  category: Category;
}
