import * as postRepository from "../repositories/post.js";

export function getAllPosts(category, take) {
  return postRepository.getAll(category, take);
}

export function getPostById(id) {
  return postRepository.getById(id);
}

export function createPost(post) {
  return postRepository.addPost(post);
}
