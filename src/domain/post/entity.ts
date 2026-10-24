import type { Category } from "../category/entity.js";
import type { PublicUser } from "../user/entity.js";

export interface NewPost {
  title: string;
  content: string;
  authorId: number;
  categoryId: number;
}

export interface Post extends NewPost {
  id: number;
  category: Category;
  author: PublicUser;
}
