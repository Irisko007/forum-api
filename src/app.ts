import express from "express";
import { db } from "./prisma/db.js";
import { createPostRepository } from "./repositories/post.repository.js";
import { createPostService } from "./services/post.service.js";
import { createPostHandlers } from "./transport/handlers/post.handler.js";
import { createPostRouter } from "./transport/routers/post.router.js";
import { createCategoryRepository } from "./repositories/category.repository.js";
import { createCategoryService } from "./services/category.service.js";
import { createCategoryHandlers } from "./transport/handlers/category.handler.js";
import { createCategoryRouter } from "./transport/routers/category.router.js";
import { errorHandler } from "./transport/middleware/error.handler.js";

const postRepository = createPostRepository(db);
const postService = createPostService(postRepository);
const postHandlers = createPostHandlers(postService);
const postRouter = createPostRouter(postHandlers);

const categoryRepository = createCategoryRepository(db);
const categoryService = createCategoryService(categoryRepository);
const categoryHandlers = createCategoryHandlers(categoryService);
const categoryRouter = createCategoryRouter(categoryHandlers);

const app = express();

app.use(express.json());
app.use("/posts", postRouter);
app.use("/categories", categoryRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Маршрут не знайдено" });
});

app.use(errorHandler);

export default app;
