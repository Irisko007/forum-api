import type { ParsedQs } from "qs";
import type { NewPost, Post } from "../domain/post/entity.js";

export type PostDto = Post;

export type CreatePostDto = NewPost;

export interface GetPostsQueryDto extends ParsedQs {
  category?: ParsedQs[string];
  categoryId?: ParsedQs[string];
  take?: ParsedQs[string];
}

export interface GetPostParamsDto {
  id: string;
}
