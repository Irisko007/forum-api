import type { ParsedQs } from "qs";

export interface PostDto {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
}

export interface CreatePostDto {
  title: string;
  content: string;
  author: string;
  category: string;
}

export interface GetPostsQueryDto extends ParsedQs {
  category?: ParsedQs[string];
  take?: ParsedQs[string];
}

export interface GetPostParamsDto {
  id: string;
}

export interface ErrorDto {
  message: string;
}
