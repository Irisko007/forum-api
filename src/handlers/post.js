import * as postService from "../services/post.js";

export function getPosts(req, res) {
  const category = req.query.category;
  const takeValue = req.query.take;
  let take;

  if (category !== undefined && (typeof category !== "string" || category.trim() === "")) {
    return res.status(422).json({ message: "category має бути текстом" });
  }

  if (takeValue !== undefined) {
    if (
      typeof takeValue !== "string" ||
      takeValue.trim() === "" ||
      !Number.isInteger(Number(takeValue)) ||
      Number(takeValue) < 1
    ) {
      return res.status(422).json({ message: "take має бути цілим числом більше 0" });
    }

    take = Number(takeValue);
  }

  const posts = postService.getAllPosts(category, take);
  return res.status(200).json(posts);
}

export function getPostById(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(422).json({ message: "id має бути цілим числом більше 0" });
  }

  const post = postService.getPostById(id);

  if (!post) {
    return res.status(404).json({ message: "Пост не знайдено" });
  }

  return res.status(200).json(post);
}

export async function createPost(req, res) {
  const { title, content, author, category } = req.body || {};

  if (
    typeof title !== "string" || title.trim() === "" ||
    typeof content !== "string" || content.trim() === "" ||
    typeof author !== "string" || author.trim() === "" ||
    typeof category !== "string" || category.trim() === ""
  ) {
    return res.status(422).json({
      message: "Потрібно передати title, content, author і category",
    });
  }

  const newPost = await postService.createPost({
    title: title.trim(),
    content: content.trim(),
    author: author.trim(),
    category: category.trim(),
  });

  return res.status(201).json(newPost);
}
