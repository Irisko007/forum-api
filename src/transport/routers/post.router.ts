import { Router } from "express";
import type { createPostHandlers } from "../handlers/post.handler.js";

export function createPostRouter(handlers: ReturnType<typeof createPostHandlers>) {
  const router = Router();

  router.get("/", handlers.getPosts);
  router.get("/:id", handlers.getPostById);
  router.post("/", handlers.createPost);

  return router;
}
