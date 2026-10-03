import type { NewPost, Post } from "../domain/post/entity.js";

export interface PostService {
  getAllPosts(category?: string, take?: number): Post[];
  getPostById(id: number): Post | undefined;
  createPost(post: NewPost): Promise<Post>;
}
