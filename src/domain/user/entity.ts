export interface User {
  id: number;
  email: string;
  password: string;
  name: string | null;
}

export type PublicUser = Pick<User, "id" | "email" | "name">;

export interface NewUser {
  email: string;
  password: string;
}
