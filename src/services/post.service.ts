import type { Repository } from "../domain/post/repository.js";
import type { PostService } from "./post.types.js";

export function createPostService(repository: Repository): PostService {
  return {
    getAllPosts(category, take) {
      return repository.getAll(category, take);
    },

    getPostById(id) {
      return repository.getById(id);
    },

    createPost(post) {
      return repository.addPost(post);
    },
  };
}
