import type { RequestHandler } from "express";
import type {
  CreatePostDto,
  GetPostParamsDto,
  GetPostsQueryDto,
  PostDto,
} from "../../dto/post.dto.js";
import type { ErrorDto } from "../../dto/error.dto.js";
import type { PostService } from "../../services/post.types.js";
import { isValidId } from "../validation.js";

export function createPostHandlers(postService: PostService) {
  const getPosts: RequestHandler<
    {},
    PostDto[] | ErrorDto,
    unknown,
    GetPostsQueryDto
  > = async (req, res) => {
    const category = req.query.category;
    const categoryIdValue = req.query.categoryId;
    const takeValue = req.query.take;
    let categoryId: number | undefined;
    let take: number | undefined;

    if (Object.keys(req.query).some((field) => !["category", "categoryId", "take"].includes(field))) {
      res.status(422).json({ message: "Дозволено лише category, categoryId і take" });
      return;
    }

    if (category !== undefined && (typeof category !== "string" || category.trim() === "")) {
      res.status(422).json({ message: "category має бути непорожнім текстом" });
      return;
    }

    if (categoryIdValue !== undefined) {
      if (!isValidId(categoryIdValue)) {
        res.status(400).json({ message: "categoryId має бути цілим числом більше 0" });
        return;
      }

      categoryId = Number(categoryIdValue);
    }

    if (takeValue !== undefined) {
      if (!isValidId(takeValue)) {
        res.status(422).json({ message: "take має бути цілим числом більше 0" });
        return;
      }

      take = Number(takeValue);
    }

    const posts = await postService.getAllPosts(category?.trim(), take, categoryId);
    res.status(200).json(posts);
  };

  const getPostById: RequestHandler<
    GetPostParamsDto,
    PostDto | ErrorDto
  > = async (req, res) => {
    if (!isValidId(req.params.id)) {
      res.status(400).json({ message: "id має бути цілим числом більше 0" });
      return;
    }

    const post = await postService.getPostById(Number(req.params.id));
    res.status(200).json(post);
  };

  const createPost: RequestHandler<
    {},
    PostDto | ErrorDto,
    Partial<CreatePostDto>
  > = async (req, res) => {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      res.status(422).json({ message: "Потрібно передати об'єкт допису" });
      return;
    }

    if (Object.keys(req.body).some((field) => !["title", "content", "authorId", "categoryId"].includes(field))) {
      res.status(422).json({ message: "Дозволено лише title, content, authorId і categoryId" });
      return;
    }

    const { title, content, authorId, categoryId } = req.body;

    if (typeof categoryId !== "number" || !isValidId(categoryId)) {
      res.status(400).json({ message: "categoryId має бути цілим числом більше 0" });
      return;
    }

    if (typeof authorId !== "number" || !isValidId(authorId)) {
      res.status(400).json({ message: "authorId має бути цілим числом більше 0" });
      return;
    }

    if (
      typeof title !== "string" || title.trim() === "" ||
      typeof content !== "string" || content.trim() === ""
    ) {
      res.status(422).json({ message: "Потрібно передати непорожні title і content" });
      return;
    }

    const newPost = await postService.createPost({
      title: title.trim(),
      content: content.trim(),
      authorId,
      categoryId,
    });

    res.status(201).json(newPost);
  };

  return { getPosts, getPostById, createPost };
}
