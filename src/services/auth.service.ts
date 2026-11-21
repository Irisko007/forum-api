import { createHash, createHmac, randomUUID } from "node:crypto";
import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import type { PublicUser } from "../domain/user/entity.js";
import type { UserRepository } from "../domain/user/repository.js";
import type { AuthService } from "./auth.types.js";
import type { RefreshSessionRepository } from "../repositories/refresh-session.repository.js";

function hashRefreshToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function createAuthService(
  repository: UserRepository,
  sessions: RefreshSessionRepository,
  jwtSecret: string,
): AuthService {
  if (!jwtSecret) {
    throw new Error("JWT_SECRET must be set");
  }

  const refreshSecret = createHmac("sha256", jwtSecret).update("refresh").digest("hex");

  function createTokens(userId: number) {
    const subject = String(userId);
    const accessToken = jwt.sign({}, jwtSecret, { subject, expiresIn: "1h" });
    const refreshToken = jwt.sign({}, refreshSecret, { subject, expiresIn: "7d", jwtid: randomUUID() });
    return { accessToken, refreshToken };
  }

  return {
    async register({ email, password }) {
      const user = await repository.addUser({ email, password: await hash(password, 12) });
      return { id: user.id, email: user.email, name: user.name };
    },

    async login({ email, password }) {
      const user = await repository.getByEmail(email);
      if (!user || !(await compare(password, user.password))) {
        throw new Error("INVALID_CREDENTIALS");
      }

      const publicUser: PublicUser = { id: user.id, email: user.email, name: user.name };
      const tokens = createTokens(user.id);
      await sessions.addSession(user.id, hashRefreshToken(tokens.refreshToken));
      return { user: publicUser, ...tokens };
    },

    async refresh(refreshToken) {
      let userId: number;
      try {
        const payload = jwt.verify(refreshToken, refreshSecret);
        if (typeof payload === "string" || !payload.sub || !payload.jti) {
          throw new Error("INVALID_REFRESH_TOKEN");
        }
        userId = Number(payload.sub);
      } catch {
        throw new Error("INVALID_REFRESH_TOKEN");
      }

      const tokens = createTokens(userId);
      const rotated = await sessions.rotateSession(
        hashRefreshToken(refreshToken),
        hashRefreshToken(tokens.refreshToken),
      );
      if (!rotated) throw new Error("INVALID_REFRESH_TOKEN");
      return tokens;
    },

    async logout(refreshToken) {
      if (refreshToken) await sessions.deleteSession(hashRefreshToken(refreshToken));
    },
  };
}
