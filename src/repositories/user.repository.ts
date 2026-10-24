import type { UserRepository } from "../domain/user/repository.js";
import type { db as prismaDb } from "../prisma/db.js";

export function createUserRepository(db: typeof prismaDb): UserRepository {
  return {
    async getByEmail(email) {
      const user = await db.orm.public.User.where({ email }).first();
      return user ?? undefined;
    },

    async addUser(user) {
      try {
        return await db.orm.public.User.create(user);
      } catch (error) {
        if (error instanceof Error && "sqlState" in error && error.sqlState === "23505") {
          throw new Error("USER_ALREADY_EXISTS");
        }
        throw error;
      }
    },
  };
}
