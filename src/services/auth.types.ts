import type { NewUser, PublicUser } from "../domain/user/entity.js";

export interface AuthService {
  register(user: NewUser): Promise<PublicUser>;
  login(user: NewUser): Promise<{ user: PublicUser; accessToken: string }>;
}
