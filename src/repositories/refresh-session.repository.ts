import type { db as prismaDb } from "../prisma/db.js";

export interface RefreshSessionRepository {
  addSession(userId: number, tokenHash: string): Promise<void>;
  rotateSession(tokenHash: string, newTokenHash: string): Promise<boolean>;
  deleteSession(tokenHash: string): Promise<void>;
}

export function createRefreshSessionRepository(db: typeof prismaDb): RefreshSessionRepository {
  const sessions = db.orm.public.RefreshSession;

  return {
    async addSession(userId, tokenHash) {
      await sessions.create({ tokenHash, user: (user) => user.connect({ id: userId }) });
    },

    async rotateSession(tokenHash, newTokenHash) {
      const plan = db.sql.public.RefreshSession
        .update({ tokenHash: newTokenHash })
        .where((session, sql) => sql.eq(session.tokenHash, tokenHash))
        .build();
      const { affectedRows } = await db.runtime().execute(plan);
      return affectedRows > 0;
    },

    async deleteSession(tokenHash) {
      const plan = db.sql.public.RefreshSession
        .delete()
        .where((session, sql) => sql.eq(session.tokenHash, tokenHash))
        .build();
      await db.runtime().execute(plan);
    },
  };
}
