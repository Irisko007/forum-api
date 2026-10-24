import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import type { PublicUser } from "../domain/user/entity.js";
import type { UserRepository } from "../domain/user/repository.js";
import type { AuthService } from "./auth.types.js";

export function createAuthService(repository: UserRepository, jwtSecret: string): AuthService {
  if (!jwtSecret) {
    throw new Error("JWT_SECRET must be set");
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
      const accessToken = jwt.sign({}, jwtSecret, { subject: String(user.id), expiresIn: "1h" });
      return { user: publicUser, accessToken };
    },
  };
}
