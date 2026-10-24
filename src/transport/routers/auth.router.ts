import { Router } from "express";
import type { createAuthHandlers } from "../handlers/auth.handler.js";

export function createAuthRouter(handlers: ReturnType<typeof createAuthHandlers>) {
  const router = Router();
  router.post("/register", handlers.register);
  router.post("/login", handlers.login);
  return router;
}
