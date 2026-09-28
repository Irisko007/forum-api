import * as postRepository from "../repositories/post.repository.js";
import type { CreatePostDto, PostDto } from "../dto/post.dto.js";

export function getAllPosts(category?: string, take?: number): PostDto[] {
  return postRepository.getAll(category, take);
}

export function getPostById(id: number): PostDto | undefined {
  return postRepository.getById(id);
}

export function createPost(post: CreatePostDto): Promise<PostDto> {
  return postRepository.addPost(post);
}
