import type { RequestHandler } from "express";
import type {
  CreatePostDto,
  ErrorDto,
  GetPostParamsDto,
  GetPostsQueryDto,
  PostDto,
} from "../../dto/post.dto.js";
import type { PostService } from "../../services/post.types.js";

export function createPostHandlers(postService: PostService) {
  const getPosts: RequestHandler<
    {},
    PostDto[] | ErrorDto,
    unknown,
    GetPostsQueryDto
  > = async (req, res) => {
    const category = req.query.category;
    const takeValue = req.query.take;
    let take: number | undefined;

    if (category !== undefined && (typeof category !== "string" || category.trim() === "")) {
      res.status(422).json({ message: "category має бути текстом" });
      return;
    }

    if (takeValue !== undefined) {
      if (
        typeof takeValue !== "string" ||
        takeValue.trim() === "" ||
        !Number.isInteger(Number(takeValue)) ||
        Number(takeValue) < 1
      ) {
        res.status(422).json({ message: "take має бути цілим числом більше 0" });
        return;
      }

      take = Number(takeValue);
    }

    const posts = await postService.getAllPosts(category, take);
    res.status(200).json(posts);
  };

  const getPostById: RequestHandler<
    GetPostParamsDto,
    PostDto | ErrorDto
  > = async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      res.status(422).json({ message: "id має бути цілим числом більше 0" });
      return;
    }

    const post = await postService.getPostById(id);

    if (!post) {
      res.status(404).json({ message: "Пост не знайдено" });
      return;
    }

    res.status(200).json(post);
  };

  const createPost: RequestHandler<
    {},
    PostDto | ErrorDto,
    Partial<CreatePostDto>
  > = async (req, res) => {
    const { title, content, author, category } = req.body || {};

    if (
      typeof title !== "string" || title.trim() === "" ||
      typeof content !== "string" || content.trim() === "" ||
      typeof author !== "string" || author.trim() === "" ||
      typeof category !== "string" || category.trim() === ""
    ) {
      res.status(422).json({
        message: "Потрібно передати title, content, author і category",
      });
      return;
    }

    const newPost = await postService.createPost({
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
      category: category.trim(),
    });

    res.status(201).json(newPost);
  };

  return { getPosts, getPostById, createPost };
}
