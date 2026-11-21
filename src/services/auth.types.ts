import type { NewUser, PublicUser } from "../domain/user/entity.js";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthService {
  register(user: NewUser): Promise<PublicUser>;
  login(user: NewUser): Promise<{ user: PublicUser } & AuthTokens>;
  refresh(refreshToken: string): Promise<AuthTokens>;
  logout(refreshToken: string): Promise<void>;
}
