import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (error instanceof Error) {
    if (error.message === "POST_NOT_FOUND") {
      res.status(404).json({ message: "Пост не знайдено" });
      return;
    }

    if (error.message === "CATEGORY_NOT_FOUND") {
      res.status(404).json({ message: "Категорію не знайдено" });
      return;
    }

    if (error.message === "AUTHOR_NOT_FOUND") {
      res.status(404).json({ message: "Автора не знайдено" });
      return;
    }

    if (error.message === "USER_ALREADY_EXISTS") {
      res.status(409).json({ message: "Користувач із такою адресою вже існує" });
      return;
    }

    if (error.message === "INVALID_CREDENTIALS") {
      res.status(401).json({ message: "Неправильний email або пароль" });
      return;
    }

    if (error.message === "CATEGORY_ALREADY_EXISTS") {
      res.status(409).json({ message: "Категорія з такою назвою вже існує" });
      return;
    }

    if ("type" in error && error.type === "entity.parse.failed") {
      res.status(400).json({ message: "Некоректний JSON" });
      return;
    }

    if ("type" in error && error.type === "entity.too.large") {
      res.status(413).json({ message: "Тіло запиту занадто велике" });
      return;
    }
  }

  console.error(error);
  res.status(500).json({ message: "Внутрішня помилка сервера" });
};
