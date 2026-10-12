import type { NewPost, Post } from "../domain/post/entity.js";
import type { Repository } from "../domain/post/repository.js";
import type { db as prismaDb } from "../prisma/db.js";

export function createPostRepository(db: typeof prismaDb): Repository {
  return {
    async getAll(category?: string, take?: number): Promise<Post[]> {
      const posts = db.orm.public.Post;

      if (category) {
        const filteredPosts = posts.where({ category });
        return take
          ? filteredPosts.orderBy((post) => post.id.asc()).limit(take).all()
          : filteredPosts.orderBy((post) => post.id.asc()).all();
      }

      return take
        ? posts.orderBy((post) => post.id.asc()).limit(take).all()
        : posts.orderBy((post) => post.id.asc()).all();
    },

    async getById(id: number): Promise<Post | undefined> {
      const post = await db.orm.public.Post.where({ id }).first();
      return post ?? undefined;
    },

    async addPost(post: NewPost): Promise<Post> {
      return db.orm.public.Post.create(post);
    },
  };
}
