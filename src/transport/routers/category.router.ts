import { Router } from "express";
import type { createCategoryHandlers } from "../handlers/category.handler.js";

export function createCategoryRouter(handlers: ReturnType<typeof createCategoryHandlers>) {
  const router = Router();

  router.get("/", handlers.getCategories);
  router.get("/:id", handlers.getCategoryById);
  router.post("/", handlers.createCategory);

  return router;
}
