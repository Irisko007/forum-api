import { isStructuredError } from "@prisma/orm-postgres/utils";
import type { NewPost, Post } from "../domain/post/entity.js";
import type { Repository } from "../domain/post/repository.js";
import type { db as prismaDb } from "../prisma/db.js";

export function createPostRepository(db: typeof prismaDb): Repository {
  return {
    async getAll(category?: string, take?: number, categoryId?: number): Promise<Post[]> {
      let query = db.orm.public.Post
        .include("category")
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

      return take ? query.limit(take).all() : query.all();
    },

    async getById(id: number): Promise<Post | undefined> {
      const post = await db.orm.public.Post.where({ id }).include("category").first();
      return post ?? undefined;
    },

    async addPost(post: NewPost): Promise<Post> {
      const { categoryId, title, content, author } = post;

      try {
        return await db.orm.public.Post.include("category").create({
          title,
          content,
          author,
          category: (category) => category.connect({ id: categoryId }),
        });
      } catch (error) {
        if (isStructuredError(error) && error.code === "ORM.RELATION_ROW_MISSING") {
          throw new Error("CATEGORY_NOT_FOUND");
        }

        throw error;
      }
    },
  };
}
