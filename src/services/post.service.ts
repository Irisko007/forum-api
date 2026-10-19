import type { Repository } from "../domain/post/repository.js";
import type { PostService } from "./post.types.js";

export function createPostService(repository: Repository): PostService {
  return {
    getAllPosts(category, take, categoryId) {
      return repository.getAll(category, take, categoryId);
    },

    async getPostById(id) {
      const post = await repository.getById(id);

      if (!post) {
        throw new Error("POST_NOT_FOUND");
      }

      return post;
    },

    createPost(post) {
      return repository.addPost(post);
    },
  };
}
