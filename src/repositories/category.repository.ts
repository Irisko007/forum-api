import type { Repository } from "../domain/category/repository.js";
import type { db as prismaDb } from "../prisma/db.js";

export function createCategoryRepository(db: typeof prismaDb): Repository {
  return {
    async getAll() {
      return db.orm.public.Category.orderBy((category) => category.id.asc()).all();
    },

    async getById(id) {
      const category = await db.orm.public.Category.where({ id }).first();
      return category ?? undefined;
    },

    async addCategory(category) {
      try {
        return await db.orm.public.Category.create(category);
      } catch (error) {
        // PostgreSQL: назва категорії вже існує.
        if (error instanceof Error && "sqlState" in error && error.sqlState === "23505") {
          throw new Error("CATEGORY_ALREADY_EXISTS");
        }

        throw error;
      }
    },
  };
}
