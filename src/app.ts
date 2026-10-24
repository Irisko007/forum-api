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
import { createUserRepository } from "./repositories/user.repository.js";
import { createAuthService } from "./services/auth.service.js";
import { createAuthHandlers } from "./transport/handlers/auth.handler.js";
import { createAuthRouter } from "./transport/routers/auth.router.js";

const postRepository = createPostRepository(db);
const postService = createPostService(postRepository);
const postHandlers = createPostHandlers(postService);
const postRouter = createPostRouter(postHandlers);

const categoryRepository = createCategoryRepository(db);
const categoryService = createCategoryService(categoryRepository);
const categoryHandlers = createCategoryHandlers(categoryService);
const categoryRouter = createCategoryRouter(categoryHandlers);

const userRepository = createUserRepository(db);
const authService = createAuthService(userRepository, process.env.JWT_SECRET ?? "");
const authHandlers = createAuthHandlers(authService);
const authRouter = createAuthRouter(authHandlers);

const app = express();

app.use(express.json());
app.use("/posts", postRouter);
app.use("/categories", categoryRouter);
app.use("/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Маршрут не знайдено" });
});

app.use(errorHandler);

export default app;
