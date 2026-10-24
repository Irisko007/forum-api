import { isStructuredError } from "@prisma/orm-postgres/utils";
import type { NewPost, Post } from "../domain/post/entity.js";
import type { Repository } from "../domain/post/repository.js";
import type { db as prismaDb } from "../prisma/db.js";

function withoutPassword<T extends { author: { id: number; email: string; password: string; name: string | null } }>(post: T): Omit<T, "author"> & { author: { id: number; email: string; name: string | null } } {
  const { password: _password, ...author } = post.author;
  return { ...post, author };
}

export function createPostRepository(db: typeof prismaDb): Repository {
  return {
    async getAll(category?: string, take?: number, categoryId?: number): Promise<Post[]> {
      let query = db.orm.public.Post
        .include("category")
        .include("author")
        .orderBy((post) => post.id.asc());

      if (category !== undefined) {
        const foundCategory = await db.orm.public.Category.where({ name: category }).first();

        if (!foundCategory) {
          return [];
        }

        query = query.where({ categoryId: foundCategory.id });
      }

      if (categoryId !== undefined) {
        query = query.where({ categoryId });
      }

      const posts = await (take ? query.limit(take).all() : query.all());
      return posts.map(withoutPassword);
    },

    async getById(id: number): Promise<Post | undefined> {
      const post = await db.orm.public.Post.where({ id }).include("category").include("author").first();
      return post ? withoutPassword(post) : undefined;
    },

    async addPost(post: NewPost): Promise<Post> {
      const { categoryId, title, content, authorId } = post;

      try {
        const created = await db.orm.public.Post.include("category").include("author").create({
          title,
          content,
          author: (author) => author.connect({ id: authorId }),
          category: (category) => category.connect({ id: categoryId }),
        });
        return withoutPassword(created);
      } catch (error) {
        if (isStructuredError(error) && error.code === "ORM.RELATION_ROW_MISSING") {
          // Resolve which supplied relation is absent, while preserving the existing category response.
          const category = await db.orm.public.Category.where({ id: categoryId }).first();
          throw new Error(category ? "AUTHOR_NOT_FOUND" : "CATEGORY_NOT_FOUND");
        }

        throw error;
      }
    },
  };
}
