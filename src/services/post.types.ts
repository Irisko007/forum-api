import type { NewPost, Post } from "../domain/post/entity.js";

export interface PostService {
  getAllPosts(category?: string, take?: number): Promise<Post[]>;
  getPostById(id: number): Promise<Post | undefined>;
  createPost(post: NewPost): Promise<Post>;
}
