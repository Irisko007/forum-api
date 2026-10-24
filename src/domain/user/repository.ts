import type { NewUser, User } from "./entity.js";

export interface UserRepository {
  getByEmail(email: string): Promise<User | undefined>;
  addUser(user: NewUser): Promise<User>;
}
