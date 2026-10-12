import express from "express";
import { db } from "./prisma/db.js";
import { createPostRepository } from "./repositories/post.repository.js";
import { createPostService } from "./services/post.service.js";
import { createPostHandlers } from "./transport/handlers/post.handler.js";
import { createPostRouter } from "./transport/routers/post.router.js";

const postRepository = createPostRepository(db);
const postService = createPostService(postRepository);
const postHandlers = createPostHandlers(postService);
const postRouter = createPostRouter(postHandlers);

const app = express();

app.use(express.json());
app.use("/posts", postRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Маршрут не знайдено" });
});

export default app;
